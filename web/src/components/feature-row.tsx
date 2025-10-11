import { Section } from "./section";

const features = [
  {
    title: "Automatic play detection",
    body: "Gemini pinpoints goals, assists, and game-changing defense so the commentary always matches the action.",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="32" height="32" rx="12" fill="url(#gradAuto)" />
        <path
          d="M10.4 16.8L14 20.4L22 12.4"
          stroke="#0D4C7F"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient
            id="gradAuto"
            x1="2"
            y1="4"
            x2="30"
            y2="28"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#BEEAFF" />
            <stop offset="1" stopColor="#1FA4FF" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    title: "Authentic announcer voices",
    body: "Pick the energy level that fits your team—from local radio warmth to championship hype.",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="32" height="32" rx="12" fill="#FFE6C6" />
        <path
          d="M11 21.5V10.5L19 14.5V17.5L11 21.5Z"
          stroke="#2C2C2C"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M22 14.75C23.1046 15.1121 23.1046 16.8879 22 17.25"
          stroke="#2C2C2C"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M20.5 13C22.8094 13.7158 22.8094 18.2842 20.5 19"
          stroke="#2C2C2C"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "One-click sharing kit",
    body: "Generate vertical reels, download full broadcasts, and send private links to family in seconds.",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="32" height="32" rx="12" fill="#9BE7C4" />
        <path
          d="M15 10H11.5C10.6716 10 10 10.6716 10 11.5V20.5C10 21.3284 10.6716 22 11.5 22H20.5C21.3284 22 22 21.3284 22 20.5V17"
          stroke="#145747"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M21 10L22.5 11.5M23.5 12.5L22 11L23.5 12.5ZM17 14L22 9L24 11L19 16H17V14Z"
          stroke="#145747"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export function FeatureRow() {
  return (
    <Section tone="sea-shallow" className="text-white" bleed>
      <div className="mx-auto flex max-w-[1120px] flex-col gap-12 px-6">
        <div className="max-w-[720px]">
          <h2
            className="text-balance text-3xl font-semibold leading-[1.2] sm:text-4xl"
            id="features"
          >
            Built for busy parents who want highlight magic without the edit bay.
          </h2>
          <p className="mt-4 max-w-[560px] text-base/relaxed text-white/75">
            PlayWave handles the time-consuming parts—finding the best plays,
            writing the script, and mixing the final audio—so you can celebrate
            faster.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="glass flex h-full flex-col gap-4 rounded-[22px] border-white/50 p-6 text-ink-900"
            >
              <div className="w-fit rounded-2xl bg-white/70 p-2 shadow-soft">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-ink-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-[1.6] text-ink-700">
                  {feature.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

