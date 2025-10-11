Design Teardown: Oceanic Pastel UI (Kawaii‑LoFi Aesthetic)

Goal: Implement a playful, ocean‑themed landing page that pairs a professional product layout with warm, hand‑drawn/mascot illustrations. Visual language = soft gradients (sand ↔ sea), rounded geometric typography, glassy blue cards, and chubby, tactile buttons. No heavy shadows or neon; keep it creamy, friendly, and premium.

⸻

1) Project Setup (for a coding agent)
	•	Stack: Next.js (App Router) + Tailwind CSS.
	•	Assets: Vector/PNG mascots with soft pastel palettes; export @2x.
	•	Motion: Small, buoyant micro‑moves (translateY 2–4px; 200–300ms; ease‑out). No parallax unless added very lightly to bubbles.

⸻

2) Design Tokens

Colors
	•	Neutrals
	•	sand-50: #FFF7EE
	•	sand-100: #FCEAD6
	•	sand-200: #F9D8B5
	•	ink-900: #2C2C2C (warm dark for text)
	•	ink-700: #4A4A4A
	•	line: #EDE3D8 (hairline borders on sand)
	•	Ocean blues
	•	sea-100: #BEEAFF
	•	sea-300: #72C9FF
	•	sea-500: #1FA4FF
	•	sea-700: #178FFF
	•	Accents (sparingly)
	•	coral: #FF8A65
	•	pearl: #FFE6C6 (light highlight)
	•	mint: #9BE7C4

Gradients
	•	Sand backdrop: linear-gradient(180deg, #FFF7EE 0%, #FCEAD6 60%, #F9D8B5 100%)
	•	Shallow sea: linear-gradient(180deg, #BEEAFF 0%, #72C9FF 60%, #1FA4FF 100%)
	•	Deep sea footer: linear-gradient(180deg, #72C9FF 0%, #1FA4FF 40%, #178FFF 100%)

Type
	•	Family: Rounded geometric sans (e.g., Plus Jakarta Sans or Poppins), fallback system sans.
	•	Weights: 700 (display/CTA), 600 (subheads), 400–500 (body).
	•	Sizes (desktop): Display 56–64px / 1.1, H2 28–32px / 1.2, H3 20–24px / 1.25, Body 16–18px / 1.6, Small/meta 13–14px / 1.4.

Radii & Elevation
	•	Radius: 12–16px for cards and buttons; avatars/mascots keep rounded corners.
	•	Shadow: minimal; prefer glass look via semi‑transparent fills + borders over heavy drop shadows.

Effects
	•	Glass card: background rgba(255,255,255,0.2) on sea; border rgba(255,255,255,0.6); backdrop‑blur 8–12px.
	•	Glow highlight (rare): inner gradient highlight using linear-gradient(180deg, rgba(255,255,255,0.45), rgba(255,255,255,0)) masked to top half.

⸻

3) Tailwind Theme Extension (conceptual)

// tailwind.config.ts (excerpt)
export default {
  theme: {
    extend: {
      colors: {
        sand: {50:'#FFF7EE',100:'#FCEAD6',200:'#F9D8B5'},
        ink: {700:'#4A4A4A',900:'#2C2C2C'},
        sea: {100:'#BEEAFF',300:'#72C9FF',500:'#1FA4FF',700:'#178FFF'},
        coral: '#FF8A65',
        pearl: '#FFE6C6',
        mint: '#9BE7C4',
        line: '#EDE3D8',
      },
      borderRadius: {xl: '16px'},
      boxShadow: {soft: '0 6px 18px rgba(31,164,255,0.08)'},
      backdropBlur: {xs: '6px'},
      fontFamily: {display: ['"Plus Jakarta Sans"','Poppins','ui-sans-serif','system-ui']},
    }
  }
}

Utility Classes (global CSS)

/* gradients */
.bg-sand { background: linear-gradient(180deg,#FFF7EE 0%,#FCEAD6 60%,#F9D8B5 100%); }
.bg-sea-shallow { background: linear-gradient(180deg,#BEEAFF 0%,#72C9FF 60%,#1FA4FF 100%); }
.bg-sea-deep { background: linear-gradient(180deg,#72C9FF 0%,#1FA4FF 40%,#178FFF 100%); }
/* glass card on sea */
.glass { background: rgba(255,255,255,0.2); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.6); }
/* hover float */
.float { transition: transform .25s ease-out, box-shadow .25s ease-out; }
.float:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,.06); }


⸻

4) Layout & Grid
	•	Max content width: 1120–1240px for full‑bleed bands; 720–780px for text blocks.
	•	Section rhythm: 88–120px vertical padding per section.
	•	Band alternation: Sand → Sea → Sand → Sea to create narrative flow; transitions are soft fades.

⸻

5) Components (React + Tailwind)

Header (minimal icons + CTA)

export function Header() {
  return (
    <header className="sticky top-0 z-30 bg-sand/70 backdrop-blur supports-[backdrop-filter]:bg-sand/60">
      <div className="mx-auto max-w-[1240px] px-6 py-4 flex items-center justify-between">
        <div className="text-[15px] font-semibold text-ink-900">Brand</div>
        <nav className="flex items-center gap-5 text-[14px] text-ink-700">
          <a className="hover:opacity-80" href="#">Docs</a>
          <a className="hover:opacity-80" href="#">Github</a>
          <a className="ml-1 inline-flex items-center rounded-xl bg-gradient-to-b from-[#FFD39A] to-[#FFAB70] px-4 py-2 text-ink-900 font-semibold float">Launch</a>
        </nav>
      </div>
    </header>
  );
}

Section Wrapper (sand/sea)

export function Section({ tone='sand', children }:{ tone?: 'sand'|'sea-shallow'|'sea-deep'; children: React.ReactNode }){
  const bg = tone==='sand' ? 'bg-sand' : tone==='sea-shallow' ? 'bg-sea-shallow' : 'bg-sea-deep';
  return <section className={`${bg} py-24 md:py-28`}>{children}</section>;
}

Hero Stack (illustrations optional)

export function Hero(){
  return (
    <Section tone="sand">
      <div className="mx-auto max-w-[1120px] px-6 grid md:grid-cols-2 items-center gap-8">
        <div>
          <h1 className="font-display text-[clamp(40px,6vw,64px)] leading-tight text-ink-900">Oceanic Pastel Landing</h1>
          <div className="mt-6 flex gap-3">
            <a className="inline-flex items-center rounded-xl bg-gradient-to-b from-[#FFD39A] to-[#FFAB70] px-5 py-3 text-ink-900 font-semibold float">Primary CTA</a>
            <a className="inline-flex items-center rounded-xl border border-line bg-pearl/60 px-5 py-3 text-ink-900 font-semibold hover:bg-pearl">Secondary</a>
          </div>
        </div>
        <div className="relative">
          {/* mascot placeholder */}
          <div className="aspect-[4/3] rounded-xl border border-line bg-pearl/50"></div>
        </div>
      </div>
    </Section>
  );
}

Feature Cards (glassy on sea)

export function FeatureRow(){
  return (
    <Section tone="sea-shallow">
      <div className="mx-auto max-w-[1120px] px-6 grid md:grid-cols-3 gap-6">
        {[0,1,2].map(i=> (
          <div key={i} className="glass rounded-xl p-5 text-white shadow-soft">
            <div className="h-16 w-16 rounded-xl bg-white/50 mb-4"></div>
            <h3 className="font-semibold text-[20px]">Card title</h3>
            <p className="mt-2 text-white/85 text-[15px]">Soft glass card over ocean gradient; hairline white border; rounded corners.</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

Stat Panel (numeric emphasis)

export function Stats(){
  const Item = ({label,value}:{label:string;value:string}) => (
    <div className="glass rounded-xl px-6 py-5 min-w-[260px]">
      <div className="text-white/70 text-sm">{label}</div>
      <div className="text-white font-semibold text-[28px] tracking-tight tabular-nums">{value}</div>
    </div>
  );
  return (
    <Section tone="sea-shallow">
      <div className="mx-auto max-w-[1120px] px-6 flex flex-wrap gap-4 items-stretch">
        <Item label="Metric A" value="$127,776,192.56" />
        <Item label="Metric B" value="$862,283.07" />
        <Item label="Rate" value="0.05%" />
      </div>
    </Section>
  );
}

Partner Badge Wall (monochrome on sand)

export function PartnerWall(){
  const logos = new Array(12).fill(0);
  return (
    <Section tone="sand">
      <div className="mx-auto max-w-[1120px] px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {logos.map((_,i)=> (
          <div key={i} className="rounded-xl border border-line bg-white/60 p-4 flex items-center justify-center text-ink-700">LOGO</div>
        ))}
      </div>
    </Section>
  );
}

Accordion (for dev/resources)

export function Accordions(){
  const Row = ({title}:{title:string}) => (
    <details className="group border-b border-line py-4">
      <summary className="marker:content-none flex items-center justify-between cursor-pointer">
        <span className="font-semibold text-ink-900">{title}</span>
        <span className="transition-transform group-open:rotate-180">⌄</span>
      </summary>
      <div className="pt-3 text-ink-700">Body content here.</div>
    </details>
  );
  return (
    <Section tone="sand">
      <div className="mx-auto max-w-[780px] px-6">
        <Row title="Documentation" />
        <Row title="Github" />
      </div>
    </Section>
  );
}

Footer (deep sea)

export function Footer(){
  return (
    <Section tone="sea-deep">
      <div className="mx-auto max-w-[1120px] px-6 grid md:grid-cols-3 gap-8 text-white">
        <div>
          <div className="font-semibold text-[18px]">Connect</div>
          <ul className="mt-3 space-y-2 text-white/85 text-[15px]">
            <li>Email</li><li>Twitter</li><li>Discord</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-[18px]">App</div>
          <ul className="mt-3 space-y-2 text-white/85 text-[15px]">
            <li>Launch</li><li>Updates</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-[18px]">Resources</div>
          <ul className="mt-3 space-y-2 text-white/85 text-[15px]">
            <li>Docs</li><li>Brand</li>
          </ul>
        </div>
      </div>
      <div className="mt-10 text-center text-white/70 text-sm">© Brand</div>
    </Section>
  );
}


⸻

6) Illustration & Icon Direction
	•	Mascots: Soft pastel fills, subtle inner highlights, thin vector outlines; export with safe transparent padding. Place as floating elements around headings and CTAs.
	•	Positioning: Use absolute with small bobbing animation (2–3px translateY loop at 3–4s).
	•	Icon set: Rounded line icons (Lucide/Feather). Keep stroke ~2px; recolor to sand‑beige on sand bands, white on sea bands.

⸻

7) Motion System
	•	Buttons/CTAs: .float class (translateY‑2px on hover). Active/click returns to 0 quickly (120ms).
	•	Cards: Fade/slide on scroll reveal: 220ms, translateY(8px), easing cubic-bezier(.22,.55,.25,.99); stagger 60–90ms.
	•	Bubbles (optional): Tiny SVGs with 6–10s vertical drift and 2–3s scale pulse at 0.98–1.02.

⸻

8) Accessibility & Semantics
	•	Contrast: ensure ≥ 4.5:1 on text within sea bands (white on blue). If needed, add a subtle text-shadow: 0 1px 0 rgba(0,0,0,.15) on white type.
	•	Use landmark elements: <header>, <nav>, <main>, <section>, <footer>.
	•	Provide alt for mascots (or alt="" if purely decorative with aria-hidden on wrappers).
	•	Respect prefers‑reduced‑motion: reduce parallax/bobbing.

⸻

9) Page Composition (example)

export default function Page(){
  return (
    <>
      <Header />
      <Hero />
      <FeatureRow />
      <Stats />
      <PartnerWall />
      <Accordions />
      <Footer />
    </>
  )
}


⸻

10) QA Checklist
	1.	Bands alternate sand ↔ sea with soft gradient fades; no hard separators.
	2.	Typography is rounded, friendly, and bold in headings; body 16–18px with warm dark ink.
	3.	Cards over sea are glassy (semi‑transparent white + blur + white 1px border).
	4.	Buttons are chubby rounded with gentle amber/coral vertical gradients.
	5.	Mascot illustrations float, modestly animated; not overused.
	6.	Partner logos recolored to beige monochrome on sand.
	7.	Footer uses deep‑sea gradient with white text and tidy 3‑column layout.
	8.	Hover effects = small float or glow; motion ≤ 300ms; nothing flashy.
	9.	All text passes contrast; reduced‑motion respected.
	10.	No heavy drop shadows; depth comes from blur/translucency and layering.

⸻

11) Deliverables for the Agent
	•	Tailwind theme + utility CSS above.
	•	Reusable components: Header, Section, Hero, FeatureRow, Stats, PartnerWall, Accordions, Footer.
	•	Placeholder mascot assets and bubble SVGs.
	•	A one‑page demo wired with the exact tokens and patterns.

Follow this teardown to reproduce the look/feel: creamy sand ↔ luminous sea bands, glass cards, rounded friendly type, soft gradients, buoyant micro‑interactions, and tasteful pastel mascots as the signature.
