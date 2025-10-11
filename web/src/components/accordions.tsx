import { Section } from "./section";

const faqs = [
  {
    title: "Can I upload from my phone?",
    body: "Yes! PlayWave works in mobile browsers. Upload any clip straight from your camera roll or paste a YouTube or Hudl link.",
  },
  {
    title: "Which sports are currently supported?",
    body: "Basketball and soccer are optimized today, with baseball and volleyball in beta. We prioritize leagues that sign up together.",
  },
  {
    title: "Is the AI voice customizable?",
    body: "Choose from four commentators with different energy levels and accents. Team packages include a custom voice tuning session.",
  },
  {
    title: "What does pricing look like?",
    body: "Single game packages start at $9. Families that upload 3+ games per month typically switch to the $29 unlimited plan.",
  },
];

export function Accordions() {
  return (
    <Section tone="sand" className="border-y border-line/70">
      <div className="mx-auto max-w-[780px] space-y-6">
        <div className="text-center">
          <h2
            className="text-3xl font-semibold leading-[1.2] text-ink-900 sm:text-[34px]"
            id="pricing"
          >
            Frequently asked questions
          </h2>
          <p className="mt-3 text-base leading-[1.6] text-ink-700">
            Everything you need to know about turning family footage into a
            broadcast everyone loves watching.
          </p>
        </div>
        <div className="divide-y divide-line/80 border border-line/80 rounded-[20px] bg-white/75">
          {faqs.map((faq) => (
            <details key={faq.title} className="group px-6 py-5">
              <summary className="marker:content-none flex cursor-pointer items-center justify-between gap-4 text-left text-[16px] font-semibold text-ink-900">
                <span>{faq.title}</span>
                <span className="text-2xl font-light text-sea-500 transition-transform duration-200 group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="pt-3 text-sm leading-[1.7] text-ink-700">
                {faq.body}
              </div>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
