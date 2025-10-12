'use client';

import { useCallback, useRef, useState, type ChangeEvent } from "react";

type UploadStatus = "idle" | "uploading" | "success" | "error";

export default function UploadWidget() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleButtonClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      return;
    }

    const file = files[0];
    event.target.value = "";

    setStatus("uploading");
    setError(null);
    setVideoUrl(null);

    const payload = new FormData();
    payload.append("video", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: payload,
      });

      const data = await response.json().catch(() => null);
      if (!response.ok || !data || typeof data.videoUrl !== "string") {
        const message =
          (data && typeof data.error === "string" && data.error) ||
          "We couldn't process that upload. Try again.";
        throw new Error(message);
      }

      setVideoUrl(data.videoUrl);
      setStatus("success");
    } catch (uploadError) {
      const message =
        uploadError instanceof Error
          ? uploadError.message
          : "Something went wrong during upload.";
      setError(message);
      setStatus("error");
    }
  }, []);

  return (
    <div className="w-full max-w-xl flex-1">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={handleButtonClick}
          disabled={status === "uploading"}
          className="float inline-flex items-center justify-center rounded-xl bg-gradient-to-b from-[#ffd39a] to-[#ffab70] px-6 py-3 text-base font-semibold text-ink-900 shadow-soft disabled:cursor-not-allowed disabled:opacity-80"
        >
          {status === "uploading" ? "Processing..." : "Upload a game"}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          hidden
          onChange={handleFileChange}
        />
      </div>

      {status === "uploading" && (
        <div className="mt-4 flex items-center gap-3 rounded-2xl border border-line bg-white/80 px-4 py-3 text-sm text-ink-700 shadow-soft">
          <span className="loader size-6" aria-hidden />
          <span>We’re generating the new broadcast. Hang tight!</span>
        </div>
      )}

      {status === "error" && error && (
        <div className="mt-4 rounded-2xl border border-coral/70 bg-white/85 px-4 py-3 text-sm font-medium text-coral shadow-soft">
          {error}
        </div>
      )}

      {videoUrl && (
        <div className="mt-6 rounded-3xl border border-line bg-white/85 p-4 shadow-soft">
          <p className="text-sm font-semibold text-ink-900">Your narrated game is ready</p>
          <video
            controls
            src={videoUrl}
            className="mt-3 w-full rounded-2xl"
            preload="metadata"
          />
        </div>
      )}
    </div>
  );
}
