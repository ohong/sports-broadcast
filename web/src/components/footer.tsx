import Link from "next/link";
import { Section } from "./section";

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Upload", href: "#upload" },
      { label: "Pricing", href: "#pricing" },
      { label: "Changelog", href: "#stories" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press kit", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help center", href: "#" },
      { label: "Community", href: "#" },
      { label: "Status", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <Section tone="sea-deep" bleed>
      <div className="mx-auto flex max-w-[1120px] flex-col gap-10 px-6 text-white">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-[320px] space-y-4">
            <div className="text-[18px] font-semibold">PlayWave</div>
            <p className="text-sm leading-relaxed text-white/80">
              AI commentary that feels handcrafted. We help families relive game
              days with professional energy and zero stress.
            </p>
          </div>
          <div className="grid gap-8 text-sm font-medium sm:grid-cols-2 md:grid-cols-3">
            {footerLinks.map((group) => (
              <div key={group.title}>
                <div className="text-[15px] font-semibold text-white">
                  {group.title}
                </div>
                <ul className="mt-3 space-y-2 text-white/80">
                  {group.links.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="transition-opacity hover:opacity-80"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 border-t border-white/20 pt-6 text-xs text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} PlayWave. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="transition-opacity hover:opacity-80">
              Privacy
            </Link>
            <Link href="#" className="transition-opacity hover:opacity-80">
              Terms
            </Link>
            <Link href="#" className="transition-opacity hover:opacity-80">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}

