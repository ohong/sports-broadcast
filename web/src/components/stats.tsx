import { Section } from "./section";

const steps = [
  {
    title: "Upload",
    description: "Drag in a clip or paste a link. We clean the audio and prep it for AI commentary automatically.",
    duration: "45 sec",
  },
  {
    title: "Analyze",
    description: "Gemini spots key plays, crowd moments, and the story arc so the script feels truly live.",
    duration: "~3 min",
  },
  {
    title: "Deliver",
    description: "Pick your voice, get full-length and social cuts, and share instantly with the team.",
    duration: "Instant download",
  },
];

export function Stats() {
  return (
    <Section tone="sand" className="relative">
      <div className="flex flex-col gap-12 lg:flex-row lg:items-start">
        <div className="max-w-[360px]">
          <h2 className="text-3xl font-semibold leading-[1.2] text-ink-900 sm:text-[34px]" id="flow">
            From raw clip to ESPN-level hype in under five minutes.
          </h2>
          <p className="mt-4 text-base leading-[1.6] text-ink-700">
            No editing knowledge, no extra apps. PlayWave handles analysis,
            scripting, and mixing in one dashboard.
          </p>
        </div>
        <div className="flex-1 space-y-6">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="rounded-[22px] border border-line bg-white/80 p-6 shadow-soft"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sea-100 text-[16px] font-semibold text-ink-900">
                    {index + 1}
                  </span>
                  <div>
                    <div className="text-[18px] font-semibold text-ink-900">
                      {step.title}
                    </div>
                    <div className="text-[12px] text-ink-700/70">
                      {step.duration}
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm leading-[1.7] text-ink-700">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
