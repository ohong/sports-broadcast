import { Section } from "./section";

const partners = [
  "Newport Waves",
  "Metro Juniors",
  "Golden Hoops Club",
  "Pacific FC",
  "Riverside League",
  "Twin Pines AAU",
  "Future Stars Camp",
  "Altitude Volleyball",
];

export function PartnerWall() {
  return (
    <Section tone="sand">
      <div className="space-y-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-ink-700/70">
            Loved by youth programs nationwide
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {partners.map((partner) => (
            <div
              key={partner}
              className="flex items-center justify-center rounded-xl border border-line bg-white/65 px-4 py-5 text-center text-[13px] font-semibold uppercase tracking-[0.1em] text-ink-700/80"
            >
              {partner}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

