'use client';

import { useState } from "react";
import Image from "next/image";
import UploadWidget from "./components/upload-widget";

type Tone = "sand" | "sea-shallow" | "sea-deep";

const featureCards = [
  {
    title: "AI play-by-play that understands kids",
    description:
      "Gemini tracks the ball, players, and crowd energy so every moment lands with the right level of excitement.",
  },
  {
    title: "Commentary in minutes, not weeks",
    description:
      "Upload your footage or paste a YouTube link. Our studio delivers the finished broadcast faster than your kid can text the group chat.",
  },
  {
    title: "Voices that feel like Saturday morning sports",
    description:
      "Youth-friendly announcers from ElevenLabs keep the hype big-league while staying encouraging and fun.",
  },
];

const statBlocks = [
  { stat: "92%", caption: "parents said their kids rewatched the game together" },
  { stat: "3.5 min", caption: "average turnaround per highlight reel" },
  { stat: "4.8 ★", caption: "beta rating from youth leagues & booster clubs" },
];

const workflow = [
  {
    step: "1",
    title: "Drop in your game footage",
    description:
      "Upload directly or share a link. We automatically detect camera shake, clip length, and sport type.",
  },
  {
    step: "2",
    title: "AI scouts the big plays",
    description:
      "Computer vision flags goals, assists, steals, and momentum swings so the script focuses on what matters.",
  },
  {
    step: "3",
    title: "Download the broadcast",
    description:
      "Polished narration, balanced audio, and chapter markers—perfect for grandparents, recruiting, or team socials.",
  },
];

const sports = ["Basketball", "Soccer", "Baseball", "Lacrosse", "Volleyball", "Hockey"];

const demoSubtitles = [
  { time: "00:06", speaker: "Play-by-Play", text: "Harper skies for the board, kicks to MJ—corner three on the way!" },
  { time: "00:11", speaker: "Analyst", text: "That’s six straight points for the Wolves. The Lions need a timeout soon." },
  { time: "00:18", speaker: "Play-by-Play", text: "Mia pokes it loose, streaks ahead—left-handed finish plus the foul!" },
  { time: "00:28", speaker: "Analyst", text: "Listen to that crowd. They know Mia just shifted the whole momentum." },
  { time: "00:39", speaker: "Play-by-Play", text: "Final seconds—kick-out to Harper… nails it! Ballgame, Wolves by two!" },
];

function Header() {
  return (
    <header className="sticky top-0 z-30 bg-[#fff7ee]/80 backdrop-blur supports-[backdrop-filter]:bg-[#fff7ee]/60">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2 text-[18px] font-semibold text-ink-900">
          <Image
            src="/logo.png"
            alt="PlayVoice logo"
            width={40}
            height={40}
            className="h-10 w-10"
            priority
          />
          <span className="sr-only">PlayVoice</span>
        </div>
        <nav className="hidden items-center gap-6 text-[14px] font-medium text-ink-700 sm:flex">
          <a className="hover:opacity-80" href="#features">
            How it works
          </a>
          <a className="hover:opacity-80" href="#highlights">
            Highlights
          </a>
          <a className="hover:opacity-80" href="#faq">
            FAQ
          </a>
          <a
            className="ml-2 inline-flex items-center rounded-xl bg-gradient-to-b from-[#ffd39a] to-[#ffab70] px-4 py-2 font-semibold text-ink-900 float"
            href="#cta"
          >
            Start a project
          </a>
        </nav>
      </div>
    </header>
  );
}

function Section({
  tone = "sand",
  className = "",
  children,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  const background = tone === "sand" ? "bg-sand" : tone === "sea-shallow" ? "bg-sea-shallow" : "bg-sea-deep";
  return (
    <section className={`${background} py-24 md:py-28 ${className}`}>
      {children}
    </section>
  );
}

function MascotBubbles() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -left-20 top-10 hidden h-72 w-72 rounded-full bg-sea-100/55 blur-3xl md:block lg:-left-32"
    />
  );
}

function Hero({ onVideoReady }: { onVideoReady: (videoUrl: string) => void }) {
  return (
    <Section tone="sand">
      <div className="relative mx-auto flex max-w-[1180px] flex-col gap-12 px-6 lg:flex-row lg:items-center">
        <MascotBubbles />
        <div className="relative z-10 max-w-xl space-y-7">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.18em] text-ink-700">
            youth commentators powered by AI
          </span>
          <h1 className="text-balance text-4xl font-bold leading-[1.1] text-ink-900 sm:text-5xl lg:text-[58px]">
            ESPN for kids
          </h1>
          <p className="text-lg leading-7 text-ink-700 sm:text-xl sm:leading-8">
            PlayVoice gives their highlights the big-league treatment. Upload the footage,
            and we turn every play into a broadcast-ready moment your family will keep forever.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <UploadWidget onProcessed={({ videoUrl }) => onVideoReady(videoUrl)} />
            <a
              href="#features"
              className="inline-flex items-center justify-center rounded-xl border border-line px-6 py-3 text-base font-semibold text-ink-700 hover:bg-white/70"
            >
              See how it works
            </a>
          </div>
          <div className="grid gap-x-6 gap-y-2 text-sm text-ink-700 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-xl border border-line bg-white/70 px-4 py-3">
              <PlayIcon />
              Multi-sport support to match your season schedule
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-line bg-white/70 px-4 py-3">
              <SparkleIcon />
              AI voices tuned for kids, parents, and grandparents
            </div>
          </div>
        </div>
        <div className="relative z-10 flex-1">
          <div className="glass relative overflow-hidden rounded-3xl border border-white/60 p-6 shadow-soft sm:p-8">
            <div className="flex items-start justify-between text-sm text-ink-900">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-ink-700">
                  Live replay
                </p>
                <p className="text-lg font-semibold text-ink-900">Wolves at Lions</p>
              </div>
              <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-ink-900">
                3rd QTR
              </span>
            </div>
            <div className="mt-6 rounded-2xl bg-gradient-to-br from-[#8fd4ff] via-[#57b6f7] to-[#178fff] p-5 text-white shadow-inner">
              <p className="text-sm uppercase tracking-[0.2em] text-white/80">Play-by-play</p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-white/95">
                <li className="rounded-xl bg-white/10 px-4 py-3">“Harper snags the rebound, kicks to MJ—corner three! Crowd goes wild!”</li>
                <li className="rounded-xl bg-white/10 px-4 py-3">“That’s the fifth steal for Mia tonight. Wolves keep the momentum rolling.”</li>
                <li className="rounded-xl bg-white/10 px-4 py-3">“Match point saved! Coach Rivera calls timeout with 47 seconds left.”</li>
              </ul>
            </div>
            <div className="mt-6 flex items-center justify-between rounded-2xl bg-white/75 px-5 py-4">
              <div>
                <p className="text-[13px] font-semibold text-ink-900">Energy Mix</p>
                <p className="text-[12px] text-ink-700">Commentary 65% • Crowd 35%</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sea-100 text-ink-900">
                <WaveIcon />
              </div>
            </div>
          </div>
          <div className="motion-safe:animate-[float_6s_ease-in-out_infinite] pointer-events-none absolute -right-6 -top-8 hidden w-32 rounded-2xl bg-white/60 p-4 text-sm text-ink-700 shadow-soft md:block">
            <p className="font-semibold text-ink-900">Beta coaches say:</p>
            <p className="mt-2 text-sm leading-5 text-ink-700">
              “Kids can’t stop watching their own highlight reels.”
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Features() {
  return (
    <Section tone="sea-shallow" className="text-white" >
      <div id="features" className="mx-auto max-w-[1180px] px-6">
        <div className="max-w-3xl text-balance">
          <h2 className="text-3xl font-semibold leading-tight sm:text-[36px]">
            Play-by-play commentary powered by ocean-smooth workflows
          </h2>
          <p className="mt-4 text-lg text-white/85">
            We put the production studio in your browser so every family gets pro-level storytelling without the editing headache.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {featureCards.map((feature) => (
            <div
              key={feature.title}
              className="glass float flex h-full flex-col rounded-3xl p-6 text-left text-ink-900 shadow-soft"
            >
              <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-sea-100 text-ink-900">
                <SparkleIcon />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-ink-900">{feature.title}</h3>
              <p className="mt-3 text-base text-ink-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Stats() {
  return (
    <Section tone="sand">
      <div className="mx-auto flex max-w-[960px] flex-col items-center gap-10 px-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-ink-700">
          loved by teams, boosters & super-fans
        </p>
        <div className="grid w-full gap-6 sm:grid-cols-3">
          {statBlocks.map((block) => (
            <div key={block.stat} className="rounded-3xl border border-line bg-white/70 px-6 py-10 shadow-soft">
              <p className="text-4xl font-bold text-ink-900 sm:text-5xl">{block.stat}</p>
              <p className="mt-3 text-sm leading-snug text-ink-700">{block.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Workflow() {
  return (
    <Section tone="sand" className="pt-0">
      <div
        id="highlights"
        className="mx-auto max-w-[1120px] rounded-[32px] border border-line bg-white/80 px-6 py-12 shadow-soft sm:px-10"
      >
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold text-ink-900 sm:text-[34px]">
            From shaky sideline clips to headline-ready broadcasts
          </h2>
          <p className="mt-4 text-lg text-ink-700">
            Parents upload, we handle the rest—no microphones, no editing software, no guesswork.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {workflow.map((item) => (
            <article
              key={item.step}
              className="rounded-3xl border border-line bg-white/70 p-6 shadow-soft"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex size-10 items-center justify-center rounded-2xl bg-sea-100 text-base font-semibold text-ink-900">
                  {item.step}
                </span>
                <h3 className="text-lg font-semibold text-ink-900">{item.title}</h3>
              </div>
              <p className="mt-4 text-sm leading-6 text-ink-700">{item.description}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-3 text-sm text-ink-700">
          <span className="rounded-full bg-sea-100/70 px-3 py-1 font-semibold text-ink-900">New</span>
          Personalized highlight intros, scoreboard overlays, and crowd-ducking audio mixing included in every render.
        </div>
      </div>
    </Section>
  );
}

function SportsGrid() {
  return (
    <Section tone="sea-shallow">
      <div className="mx-auto max-w-[1120px] px-6 text-white">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <h2 className="text-3xl font-semibold leading-tight sm:text-[36px]">
              Ready for every season on the calendar
            </h2>
            <p className="mt-3 text-white/85">
              Choose the sport, and we tune the commentary pacing and terminology so it feels authentic.
            </p>
          </div>
          <p className="text-sm uppercase tracking-[0.32em] text-white/70">growing monthly</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-3 md:grid-cols-6">
          {sports.map((sport) => (
            <div
              key={sport}
              className="flex items-center justify-center rounded-3xl border border-white/35 bg-white/15 px-4 py-6 text-center text-[15px] font-semibold backdrop-blur"
            >
              {sport}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function FAQ() {
  const rows = [
    {
      title: "Can we add our own coach notes or player names?",
      body: "Absolutely. Drop player pronunciations or custom shout-outs when you upload—our narration weaves them naturally into the script.",
    },
    {
      title: "Does the AI work with phone footage?",
      body: "Yes. We optimize for mobile clips and stabilize jittery frames before generating the commentary timeline.",
    },
    {
      title: "How do you handle background music or loud gyms?",
      body: "We auto-duck crowd noise so the commentary sits on top without losing atmosphere. You can tweak the mix before downloading.",
    },
  ];

  return (
    <Section tone="sand">
      <div id="faq" className="mx-auto max-w-[820px] px-6">
        <h2 className="text-center text-3xl font-semibold text-ink-900 sm:text-[34px]">
          Questions from the stands
        </h2>
        <div className="mt-10 divide-y divide-line/80 rounded-3xl border border-line bg-white/80">
          {rows.map((row) => (
            <details key={row.title} className="group px-6">
              <summary className="marker:content-none flex cursor-pointer items-center justify-between gap-4 py-6 text-left">
                <span className="text-lg font-semibold text-ink-900">{row.title}</span>
                <span className="transition-transform duration-200 group-open:rotate-180">⌄</span>
              </summary>
              <div className="pb-6 text-sm leading-6 text-ink-700">{row.body}</div>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}

function CTA() {
  return (
    <Section tone="sea-deep">
      <div
        id="cta"
        className="mx-auto flex max-w-[1020px] flex-col items-center gap-6 rounded-3xl border border-white/30 bg-white/15 px-8 py-14 text-center text-white backdrop-blur"
      >
        <h2 className="text-3xl font-semibold leading-tight sm:text-[36px]">
          Turn their hustle into a highlight tradition
        </h2>
        <p className="text-base text-white/85 sm:text-lg">
          Create an account, upload tonight’s game, and share the finished broadcast before bedtime.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <a
            href="#"
            className="float inline-flex items-center justify-center rounded-xl bg-gradient-to-b from-[#ffd39a] to-[#ffab70] px-6 py-3 text-base font-semibold text-ink-900"
          >
            Launch studio
          </a>
          <a
            href="#faq"
            className="inline-flex items-center justify-center rounded-xl border border-white/60 px-6 py-3 text-base font-semibold text-white hover:bg-white/10"
          >
            Watch a sample game
          </a>
        </div>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="bg-sea-deep py-10 text-white">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-8 px-6 md:flex-row md:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xl font-semibold">
            <Image
              src="/logo.png"
              alt="PlayVoice logo"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="sr-only">PlayVoice</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-white/80">
            PlayVoice delivers custom commentary for youth sports footage—because every game deserves a play-by-play.
          </p>
        </div>
        <div className="grid max-w-md grid-cols-2 gap-6 text-sm text-white/75 sm:grid-cols-3">
          <div>
            <p className="font-semibold text-white">Product</p>
            <ul className="mt-3 space-y-2">
              <li><a className="hover:text-white" href="#features">Features</a></li>
              <li><a className="hover:text-white" href="#highlights">Pipeline</a></li>
              <li><a className="hover:text-white" href="#faq">Pricing</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-white">Community</p>
            <ul className="mt-3 space-y-2">
              <li><a className="hover:text-white" href="#">Youth leagues</a></li>
              <li><a className="hover:text-white" href="#">Booster clubs</a></li>
              <li><a className="hover:text-white" href="#">Coaches</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-white">Support</p>
            <ul className="mt-3 space-y-2">
              <li><a className="hover:text-white" href="#">Help center</a></li>
              <li><a className="hover:text-white" href="#">Contact</a></li>
              <li><a className="hover:text-white" href="#">Status</a></li>
            </ul>
          </div>
        </div>
      </div>
      <p className="mt-10 text-center text-xs text-white/60">© {new Date().getFullYear()} PlayVoice. All rights reserved.</p>
    </footer>
  );
}

function PlayIcon() {
  return (
    <svg className="size-8 text-sea-500" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.5" opacity="0.65" />
      <path d="M10 8.5L16 12L10 15.5V8.5Z" fill="currentColor" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg className="size-6 text-sea-500" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 4L13.2 9.8L20 12L13.2 14.2L12 20L10.8 14.2L4 12L10.8 9.8L12 4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WaveIcon() {
  return (
    <svg className="size-6 text-ink-900" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 15c2.5 0 2.5-6 5-6s2.5 6 5 6 2.5-6 5-6 2.5 6 5 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Home() {
  const [processedVideoUrl, setProcessedVideoUrl] = useState<string | null>(null);

  if (processedVideoUrl) {
    return <BroadcastResult videoUrl={processedVideoUrl} onReset={() => setProcessedVideoUrl(null)} />;
  }

  return (
    <>
      <Header />
      <main className="flex flex-col">
        <Hero onVideoReady={setProcessedVideoUrl} />
        <Features />
        <Stats />
        <Workflow />
        <SportsGrid />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

function BroadcastResult({ videoUrl, onReset }: { videoUrl: string; onReset: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d1a2f] via-[#112f5f] to-[#0b1530] px-6 py-16 text-white">
      <div className="mx-auto flex max-w-[1080px] flex-col items-center gap-10 text-center">
        <div className="w-full space-y-4">
          <p className="text-sm uppercase tracking-[0.28em] text-white/70">Your broadcast is ready</p>
          <h1 className="text-balance text-4xl font-semibold leading-tight sm:text-5xl">Relive the highlight reel</h1>
        </div>
        <div className="w-full rounded-[36px] border border-white/25 bg-black/70 p-4 shadow-[0_24px_60px_rgba(13,57,115,0.45)]">
          <video
            controls
            autoPlay
            src={videoUrl}
            className="aspect-video w-full rounded-[28px] bg-black object-cover"
          />
        </div>
        <SubtitlesPanel />
        <button
          type="button"
          onClick={onReset}
          className="float mt-4 inline-flex items-center justify-center rounded-xl border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold tracking-wide text-white hover:bg-white/15"
        >
          Upload another game
        </button>
      </div>
    </div>
  );
}

function SubtitlesPanel() {
  return (
    <section className="w-full rounded-[32px] border border-white/20 bg-white/90 p-6 text-left text-ink-900 shadow-soft sm:p-8">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
        <h2 className="text-2xl font-semibold text-ink-900">Subtitles</h2>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-ink-700">
          Play-by-play transcript
        </p>
      </header>
      <ul className="mt-5 space-y-4 text-sm leading-6 text-ink-700 sm:text-base">
        {demoSubtitles.map((caption) => (
          <li key={caption.time} className="rounded-2xl border border-line bg-white/85 px-4 py-3 shadow-soft">
            <div className="flex items-center justify-between text-[13px] font-semibold uppercase tracking-[0.22em] text-ink-700">
              <span>{caption.time}</span>
              <span>{caption.speaker}</span>
            </div>
            <p className="mt-2 text-[15px] text-ink-900">{caption.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
