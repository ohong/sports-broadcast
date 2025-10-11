import Image from "next/image";
import Link from "next/link";
import { Section } from "./section";

const heroStats = [
  { value: "4.8★", label: "Parent rating" },
  { value: "12k+", label: "Games narrated" },
  { value: "97%", label: "Highlights shared" },
];

export function Hero() {
  return (
    <Section tone="sand" id="upload">
      <div className="relative grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center">
        <div className="relative z-10 space-y-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-4 py-2 text-[13px] font-semibold text-ink-700">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M8 1.5L9.90211 5.37514L14 6.02786L11 9.05874L11.8042 13.25L8 11.1457L4.19577 13.25L5 9.05874L2 6.02786L6.09789 5.37514L8 1.5Z"
                fill="#FF8A65"
              />
            </svg>
            Trusted by 4,200+ teams
          </span>
          <h1 className="text-balance text-4xl font-bold leading-[1.1] text-ink-900 sm:text-5xl lg:text-[56px]">
            Broadcast-ready commentary for{" "}
            <span className="bg-gradient-to-b from-sea-300 to-sea-500 bg-clip-text text-transparent">
              every youth game
            </span>
            .
          </h1>
          <p className="max-w-[540px] text-lg leading-[1.6] text-ink-700">
            PlayWave turns your sideline recordings into highlight reels with a
            pro announcer, synced sound effects, and shareable clips—all in just
            a few minutes.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="#upload"
              className="float inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#FFD39A] to-[#FFAB70] px-6 py-3 text-[15px] font-semibold text-ink-900 shadow-soft"
            >
              <span>Upload footage</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M5 10H15M15 10L10.8333 5.83333M15 10L10.8333 14.1667"
                  stroke="#2C2C2C"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <Link
              href="#demo"
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(23,143,255,0.35)] bg-white/60 px-6 py-3 text-[15px] font-semibold text-ink-900 transition-opacity hover:opacity-80"
            >
              <span>See sample</span>
              <span aria-hidden="true">▶</span>
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-4 text-left text-ink-700 sm:max-w-[420px]">
            {heroStats.map((stat) => (
              <div key={stat.label} className="rounded-xl border border-line bg-white/70 px-4 py-3">
                <div className="text-xl font-semibold text-ink-900">
                  {stat.value}
                </div>
                <div className="text-sm text-ink-700">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <Image
            src="/illustrations/bubble.svg"
            alt=""
            aria-hidden="true"
            width={220}
            height={220}
            className="pointer-events-none absolute -left-12 -top-14 hidden opacity-80 lg:block"
          />
          <div className="glass relative z-10 rounded-[24px] p-6 shadow-soft">
            <div className="flex items-center justify-between rounded-[20px] bg-white/80 px-4 py-3 text-sm font-semibold text-ink-700">
              <span>Spring League Finals</span>
              <span className="flex items-center gap-2 text-ink-500">
                6:45
                <span className="inline-flex h-2 w-2 rounded-full bg-coral/90" />
              </span>
            </div>
            <div className="relative mt-5 overflow-hidden rounded-[20px] border border-white/60 bg-gradient-to-br from-sea-100/70 via-white to-sea-300/50 p-6">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.18em] text-ink-700/70">
                <span>PlayWave Auto Cut</span>
                <span>Q3 · 00:21</span>
              </div>
              <div className="mt-6 grid gap-4 text-left">
                <div className="rounded-[18px] bg-white/85 p-4 shadow-soft">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-[15px] font-semibold text-ink-900">
                        Breakaway goal · Lily S.
                      </div>
                      <div className="mt-1 text-[13px] text-ink-700">
                        “She crosses midcourt—Lily accelerates, fakes left, and
                        sinks a silky right-hand layup!”
                      </div>
                    </div>
                    <span className="rounded-full bg-mint/50 px-2 py-1 text-[11px] font-semibold text-ink-900">
                      Auto
                    </span>
                  </div>
                </div>
                <div className="rounded-[18px] bg-white/70 p-4">
                  <div className="text-[14px] font-semibold text-ink-900">
                    Defensive stop · Owen R.
                  </div>
                  <div className="mt-1 text-[12px] text-ink-700">
                    Crowd mic ducked, commentary intensifies.
                  </div>
                </div>
                <div className="rounded-[18px] bg-white/60 p-4 text-[12px] text-ink-700">
                  Mix complete in 02:14 · Voice: “Horizon Hype”
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between rounded-[20px] border border-white/70 bg-white/80 px-5 py-4">
              <div>
                <div className="text-sm font-semibold text-ink-900">
                  AI crowd sweetening
                </div>
                <div className="text-xs text-ink-700">
                  Keeps the energy up without drowning coaches.
                </div>
              </div>
              <Image
                src="/mascots/whistle-friend.svg"
                alt=""
                aria-hidden="true"
                width={64}
                height={64}
                className="mascot-bob"
              />
            </div>
          </div>
          <Image
            src="/mascots/tide-buddy.svg"
            alt="PlayWave mascot cheering"
            width={120}
            height={120}
            className="pointer-events-none absolute -right-8 bottom-[-36px] hidden lg:block"
          />
        </div>
      </div>
    </Section>
  );
}
