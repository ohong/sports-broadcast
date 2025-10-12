import argparse
import json
import os
import subprocess
from dataclasses import dataclass
from pathlib import Path
from tempfile import TemporaryDirectory
from typing import Any, Dict, Iterable, List, Optional, Sequence

from elevenlabs import ElevenLabs, VoiceSettings  # type: ignore
from google import genai
from google.genai import types
from moviepy.editor import AudioFileClip, CompositeAudioClip, VideoFileClip  # type: ignore


BASE_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = BASE_DIR.parent

DEFAULT_PROMPT_PATH = BASE_DIR / "prompts/soccer_kids.md"
DEFAULT_VIDEO_PATH = BASE_DIR / "box.MOV"
DEFAULT_OUTPUT_PATH = BASE_DIR / "box-commentated.mp4"


@dataclass
class CommentaryEvent:
    timestamp: str
    commentator: str
    call: str
    context: str
    interrupts: Optional[str] = None

    @property
    def start_seconds(self) -> float:
        return timestamp_to_seconds(self.timestamp)

    def to_dict(self) -> Dict[str, str]:
        data: Dict[str, str] = {
            "timestamp": self.timestamp,
            "commentator": self.commentator,
            "call": self.call,
            "context": self.context,
        }
        if self.interrupts:
            data["interrupts"] = self.interrupts
        return data


@dataclass
class Commentary:
    match_summary: str
    commentators: Dict[str, str]
    events: List[CommentaryEvent]

    def to_dict(self) -> Dict[str, Any]:
        return {
            "matchSummary": self.match_summary,
            "commentators": self.commentators,
            "events": [event.to_dict() for event in self.events],
        }

    @classmethod
    def from_dict(cls, payload: Dict[str, Any]) -> "Commentary":
        summary = payload.get("matchSummary")
        if not isinstance(summary, str):
            raise ValueError("Commentary JSON missing string `matchSummary`.")

        commentators_payload = payload.get("commentators", {})
        commentators: Dict[str, str] = {}
        if isinstance(commentators_payload, dict):
            for key in ("playByPlay", "analyst"):
                value = commentators_payload.get(key)
                if isinstance(value, str) and value.strip():
                    commentators[key] = value.strip()

        if not commentators:
            commentators = {
                "playByPlay": "Play-by-Play",
                "analyst": "Analyst",
            }

        events_payload = payload.get("events")
        if not isinstance(events_payload, Sequence):
            raise ValueError("Commentary JSON missing `events` list.")

        events: List[CommentaryEvent] = []
        for raw_event in events_payload:
            if not isinstance(raw_event, dict):
                continue
            timestamp = raw_event.get("timestamp")
            call = raw_event.get("call")
            context = raw_event.get("context", "")
            commentator = raw_event.get("commentator") or raw_event.get("speaker")
            interrupts = raw_event.get("interrupts") or raw_event.get("interrupt")
            if isinstance(timestamp, str) and isinstance(call, str):
                commentator_key = commentator if isinstance(commentator, str) else "playByPlay"
                commentator_key = commentator_key.strip() or "playByPlay"
                interrupts_key = interrupts.strip() if isinstance(interrupts, str) else None
                events.append(
                    CommentaryEvent(
                        timestamp=timestamp.strip(),
                        commentator=commentator_key,
                        call=call.strip(),
                        context=context.strip() if isinstance(context, str) else "",
                        interrupts=interrupts_key,
                    )
                )

        if not events:
            raise ValueError("Commentary JSON produced no valid events.")

        events.sort(key=lambda event: event.start_seconds)
        return cls(match_summary=summary.strip(), commentators=commentators, events=events)


def load_env_files(paths: Iterable[Path]) -> None:
    for path in paths:
        if not path.exists():
            continue
        for line in path.read_text().splitlines():
            if "=" not in line or line.strip().startswith("#"):
                continue
            key, _, value = line.partition("=")
            key = key.strip()
            value = value.strip()
            if key and key not in os.environ:
                os.environ[key] = value


def timestamp_to_seconds(value: str) -> float:
    parts = value.strip().split(":")
    if len(parts) != 2:
        raise ValueError(f"Invalid timestamp format: {value}")
    minutes = int(parts[0])
    seconds = float(parts[1])
    return minutes * 60 + seconds


def generate_commentary(
    video_path: Path,
    prompt_path: Path,
    api_key: str,
    model: str = "models/gemini-2.5-flash",
) -> Commentary:
    video_bytes = video_path.read_bytes()
    prompt_text = prompt_path.read_text()

    mime_type = "video/mp4"
    suffix = video_path.suffix.lower()
    if suffix in {".mov", ".qt"}:
        mime_type = "video/quicktime"
    elif suffix in {".webm"}:
        mime_type = "video/webm"

    client = genai.Client(api_key=api_key)
    response = client.models.generate_content(
        model=model,
        contents=types.Content(
            parts=[
                types.Part(
                    inline_data=types.Blob(
                        data=video_bytes,
                        mime_type=mime_type,
                    ),
                    video_metadata=types.VideoMetadata(fps=5),
                ),
                types.Part(text=prompt_text),
            ]
        ),
    )

    commentary_payload = extract_commentary_payload(response)
    return Commentary.from_dict(commentary_payload)


def extract_commentary_payload(response: Any) -> Dict[str, Any]:
    attempted_texts: List[str] = []
    candidates = getattr(response, "candidates", None) or []
    for candidate in candidates:
        content = getattr(candidate, "content", None)
        parts = getattr(content, "parts", None) if content else None
        for part in parts or []:
            text = getattr(part, "text", None)
            if not isinstance(text, str):
                continue
            attempted_texts.append(text)
            parsed = try_parse_commentary_text(text)
            if parsed is not None:
                return parsed

    text = getattr(response, "text", None)
    if isinstance(text, str):
        attempted_texts.append(text)
        parsed = try_parse_commentary_text(text)
        if parsed is not None:
            return parsed

    snippet = ""
    if attempted_texts:
        sample = attempted_texts[0].strip().replace("\n", " ")
        snippet = f" First candidate text snippet: {sample[:200]}..."
    raise ValueError(f"Gemini response did not contain valid JSON commentary.{snippet}")


def try_parse_commentary_text(text: str) -> Optional[Dict[str, Any]]:
    stripped = text.strip()
    if not stripped:
        return None

    if stripped.startswith("```"):
        stripped = strip_code_fence(stripped)

    for candidate in generate_json_candidates(stripped):
        try:
            return json.loads(candidate)
        except json.JSONDecodeError:
            continue
    return None


def generate_json_candidates(text: str) -> Iterable[str]:
    yield text
    start = text.find("{")
    end = text.rfind("}")
    if 0 <= start < end:
        yield text[start : end + 1]


def strip_code_fence(text: str) -> str:
    lines = text.splitlines()
    if not lines:
        return text

    start = 0
    end = len(lines)

    if lines and lines[0].startswith("```"):
        start = 1
    if len(lines) > 1 and lines[-1].startswith("```"):
        end = len(lines) - 1

    return "\n".join(lines[start:end]).strip()


def normalize_commentator_key(value: Optional[str]) -> str:
    if not value:
        return ""
    return (
        value.strip()
        .lower()
        .replace(" ", "")
        .replace("_", "")
        .replace("-", "")
    )


def resolve_voice_id(commentator_key: str, voice_map: Dict[str, str]) -> str:
    normalized = normalize_commentator_key(commentator_key)
    raw_key = commentator_key.strip() if commentator_key else ""
    candidate_keys = [
        raw_key,
        raw_key.lower(),
        normalized,
    ]

    for key in candidate_keys:
        if not key:
            continue
        voice = voice_map.get(key)
        if voice:
            return voice

    if normalized.startswith("analyst"):
        voice = voice_map.get("analyst") or voice_map.get("color")
        if voice:
            return voice
    if normalized.startswith("play"):
        voice = voice_map.get("playByPlay") or voice_map.get("playbyplay") or voice_map.get("pbp")
        if voice:
            return voice

    default_voice = voice_map.get("default")
    if default_voice:
        return default_voice

    if voice_map:
        return next(iter(voice_map.values()))

    raise ValueError("No voice IDs configured for commentary synthesis.")


def build_voice_map(primary_voice: str, secondary_voice: Optional[str]) -> Dict[str, str]:
    voice_map: Dict[str, str] = {}

    def add_voice(key: str, voice: str) -> None:
        norm_key = normalize_commentator_key(key)
        voice_map[key] = voice
        voice_map[norm_key] = voice

    if primary_voice:
        for key in ("playByPlay", "playbyplay", "pbp", "default"):
            add_voice(key, primary_voice)

    if secondary_voice:
        for key in ("analyst", "color", "analystcolor"):
            add_voice(key, secondary_voice)

    return voice_map


def compute_interrupt_cutoffs(events: Sequence[CommentaryEvent]) -> List[Optional[float]]:
    cutoffs: List[Optional[float]] = [None] * len(events)
    last_index_by_commentator: Dict[str, int] = {}

    for index, event in enumerate(events):
        commentator_key = normalize_commentator_key(event.commentator)
        if commentator_key:
            last_index_by_commentator[commentator_key] = index

        interrupt_target = normalize_commentator_key(event.interrupts)
        if interrupt_target:
            interrupted_index = last_index_by_commentator.get(interrupt_target)
            if interrupted_index is not None and interrupted_index < index:
                cutoff_time = event.start_seconds
                existing = cutoffs[interrupted_index]
                if existing is None or cutoff_time < existing:
                    cutoffs[interrupted_index] = cutoff_time

    return cutoffs


def synthesize_events_to_disk(
    events: Sequence[CommentaryEvent],
    api_key: str,
    voice_map: Dict[str, str],
    model_id: str,
    output_dir: Path,
    stability: float = 0.5,
    similarity_boost: float = 0.65,
    output_format: str = "mp3_44100_128",
    use_speaker_boost: bool = True,
) -> List[Path]:
    output_dir.mkdir(parents=True, exist_ok=True)
    client = ElevenLabs(api_key=api_key)
    clip_paths: List[Path] = []

    total = len(events)
    for index, event in enumerate(events, start=1):
        print(f"Synthesizing clip {index}/{total} at {event.timestamp}: {event.call}")
        voice_id = resolve_voice_id(event.commentator, voice_map)
        stream = client.text_to_speech.convert(
            voice_id=voice_id,
            model_id=model_id,
            output_format=output_format,
            voice_settings=VoiceSettings(
                stability=stability,
                similarity_boost=similarity_boost,
                style=0.0,
                use_speaker_boost=use_speaker_boost,
            ),
            text=event.call,
        )

        audio_bytes = bytearray()
        for chunk in stream:
            if chunk:
                audio_bytes.extend(chunk)

        if not audio_bytes:
            raise RuntimeError(f"ElevenLabs returned no audio for event at {event.timestamp}.")

        commentator_slug = normalize_commentator_key(event.commentator) or "commentator"
        clip_path = output_dir / f"event_{index:02d}_{commentator_slug}.mp3"
        clip_path.write_bytes(bytes(audio_bytes))
        clip_paths.append(clip_path)

    return clip_paths


def mix_commentary_with_video(
    video_path: Path,
    clip_paths: Sequence[Path],
    events: Sequence[CommentaryEvent],
    output_path: Path,
    background_volume: float = 0.45,
    commentary_volume: float = 1.0,
) -> None:
    if len(clip_paths) != len(events):
        raise ValueError("Number of synthesized clips does not match commentary events.")

    temp_audio_path = output_path.with_suffix(".temp-commentary.wav")
    cutoffs = compute_interrupt_cutoffs(events)
    min_duration = 0.1

    with VideoFileClip(str(video_path)) as video:
        base_audio = video.audio.volumex(background_volume) if video.audio else None
        overlay_clips: List[AudioFileClip] = []
        composite_audio: Optional[CompositeAudioClip] = None

        try:
            for index, (event, clip_path) in enumerate(zip(events, clip_paths)):
                raw_clip = AudioFileClip(str(clip_path))
                try:
                    start_time = event.start_seconds
                    overlay = raw_clip.volumex(commentary_volume).set_start(start_time)
                    cutoff_time = cutoffs[index]
                    if cutoff_time is not None:
                        allowed_end = min(start_time + raw_clip.duration, cutoff_time)
                        if allowed_end <= start_time + min_duration:
                            raw_clip.close()
                            continue
                        overlay = overlay.set_end(allowed_end)
                    overlay_clips.append(overlay)
                except Exception:
                    raw_clip.close()
                    raise

            audio_clips = ([base_audio] if base_audio else []) + overlay_clips
            if not audio_clips:
                raise RuntimeError("No audio sources available to mix.")

            composite_audio = CompositeAudioClip(audio_clips)
            # Determine an appropriate sample rate for export
            audio_fps = None
            for clip in audio_clips:
                if getattr(clip, "fps", None):
                    audio_fps = int(clip.fps)
                    break
            if not audio_fps:
                audio_fps = 44100

            composite_audio.write_audiofile(
                str(temp_audio_path),
                fps=audio_fps,
                nbytes=2,
                codec="pcm_s16le",
                logger=None,
            )
        finally:
            for overlay in overlay_clips:
                overlay.close()
            if base_audio:
                base_audio.close()
            if composite_audio:
                composite_audio.close()

    ffmpeg_cmd = [
        "ffmpeg",
        "-y",
        "-i",
        str(video_path),
        "-i",
        str(temp_audio_path),
        "-map",
        "0:v:0",
        "-map",
        "1:a:0",
        "-c:v",
        "copy",
        "-c:a",
        "aac",
        "-shortest",
        str(output_path),
    ]

    result = subprocess.run(ffmpeg_cmd, capture_output=True, text=True)
    if result.returncode != 0:
        raise RuntimeError(f"ffmpeg failed: {result.stderr.strip()}")

    temp_audio_path.unlink(missing_ok=True)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Generate boxing commentary and overlay it onto a video.")
    parser.add_argument("--video", type=Path, default=DEFAULT_VIDEO_PATH, help="Input video path.")
    parser.add_argument("--prompt", type=Path, default=DEFAULT_PROMPT_PATH, help="Prompt file for Gemini.")
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT_PATH, help="Output video path.")
    parser.add_argument("--commentary-json", type=Path, help="Optional path to write the generated commentary JSON.")
    parser.add_argument("--skip-video", action="store_true", help="Generate narration only; requires --clips-dir to retain audio files.")
    parser.add_argument("--background-volume", type=float, default=0.45, help="Mix volume for the original video audio.")
    parser.add_argument("--commentary-volume", type=float, default=1.0, help="Mix volume for synthesized commentary.")
    parser.add_argument("--voice-id", type=str, default=os.getenv("ELEVENLABS_VOICE_ID"), help="ElevenLabs voice ID.")
    parser.add_argument(
        "--voice2-id",
        type=str,
        default=os.getenv("ELEVENLABS_VOICE2_ID"),
        help="Secondary ElevenLabs voice ID for analyst commentary (defaults to --voice-id).",
    )
    parser.add_argument("--model-id", type=str, default=os.getenv("ELEVENLABS_MODEL", "eleven_v3"), help="ElevenLabs TTS model ID.")
    parser.add_argument("--gemini-model", type=str, default="models/gemini-2.5-flash", help="Gemini model to use.")
    parser.add_argument("--stability", type=float, default=0.5, help="ElevenLabs stability parameter.")
    parser.add_argument("--similarity", type=float, default=0.65, help="ElevenLabs similarity boost parameter.")
    parser.add_argument("--clips-dir", type=Path, help="Optional directory to store synthesized clips.")
    parser.add_argument("--output-format", type=str, default="mp3_44100_128", help="ElevenLabs audio output format, e.g. mp3_44100_128.")
    parser.add_argument("--disable-speaker-boost", action="store_true", help="Disable ElevenLabs speaker boost.")
    return parser.parse_args()


def main() -> None:
    load_env_files([PROJECT_ROOT / ".env.local", BASE_DIR / ".env"])
    args = parse_args()

    gemini_api_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
    if not gemini_api_key:
        raise RuntimeError("Set GEMINI_API_KEY or GOOGLE_API_KEY for Gemini access.")

    eleven_api_key = os.getenv("ELEVENLABS_API_KEY")
    if not eleven_api_key:
        raise RuntimeError("Set ELEVENLABS_API_KEY for ElevenLabs access.")

    if not args.voice_id:
        raise RuntimeError("Provide an ElevenLabs voice via --voice-id or ELEVENLABS_VOICE_ID.")

    voice2_id = args.voice2_id or args.voice_id
    voice_map = build_voice_map(args.voice_id, voice2_id)

    commentary = generate_commentary(
        args.video,
        args.prompt,
        gemini_api_key,
        model=args.gemini_model,
    )

    if args.commentary_json:
        args.commentary_json.parent.mkdir(parents=True, exist_ok=True)
        args.commentary_json.write_text(json.dumps(commentary.to_dict(), indent=2))

    if args.skip_video and not args.clips_dir:
        raise RuntimeError("Provide --clips-dir when using --skip-video to retain generated clips.")

    play_by_play_name = commentary.commentators.get("playByPlay", "Play-by-Play")
    analyst_name = commentary.commentators.get("analyst", "Analyst")
    play_voice_id = resolve_voice_id("playByPlay", voice_map)
    analyst_voice_id = resolve_voice_id("analyst", voice_map)
    print(f"Play-by-play voice: {play_by_play_name} -> {play_voice_id}")
    print(f"Analyst voice: {analyst_name} -> {analyst_voice_id}")

    temp_clip_dir: Optional[TemporaryDirectory[str]] = None
    clips_dir = args.clips_dir
    if clips_dir:
        clips_dir.mkdir(parents=True, exist_ok=True)
    else:
        temp_clip_dir = TemporaryDirectory()
        clips_dir = Path(temp_clip_dir.name)

    try:
        clip_paths = synthesize_events_to_disk(
            commentary.events,
            eleven_api_key,
            voice_map,
            args.model_id,
            clips_dir,
            stability=args.stability,
            similarity_boost=args.similarity,
            output_format=args.output_format,
            use_speaker_boost=not args.disable_speaker_boost,
        )

        if args.skip_video:
            if args.commentary_json:
                print(f"Wrote commentary JSON to {args.commentary_json}")
            print(f"Synthesized {len(clip_paths)} clips in {clips_dir}")
            return

        mix_commentary_with_video(
            args.video,
            clip_paths,
            commentary.events,
            args.output,
            background_volume=args.background_volume,
            commentary_volume=args.commentary_volume,
        )
        print(f"Created narrated video at {args.output}")
    finally:
        if temp_clip_dir:
            temp_clip_dir.cleanup()


if __name__ == "__main__":
    main()
