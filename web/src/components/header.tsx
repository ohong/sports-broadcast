import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";

const navigation = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#flow" },
  { label: "Pricing", href: "#pricing" },
  { label: "Stories", href: "#stories" },
];

export function Header({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-line/60 bg-[rgba(255,247,238,0.88)] backdrop-blur",
        "supports-[backdrop-filter]:bg-[rgba(255,247,238,0.76)]",
        className
      )}
    >
      <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3 text-ink-900">
          <Image
            src="/mascots/tide-buddy.svg"
            alt="PlayWave mascot"
            width={40}
            height={40}
            className="mascot-bob"
            priority
          />
          <span className="text-[17px] font-semibold tracking-[0.02em]">
            PlayWave
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-[14px] font-medium text-ink-700 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="transition-opacity hover:opacity-70"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="#demo"
            className="hidden text-[14px] font-semibold text-ink-900/80 transition-opacity hover:opacity-70 sm:inline-block"
          >
            Watch demo
          </Link>
          <Link
            href="#upload"
            className="float inline-flex items-center rounded-full bg-gradient-to-b from-[#FFD39A] to-[#FFAB70] px-5 py-2.5 text-[14px] font-semibold text-ink-900 shadow-soft"
          >
            Upload footage
          </Link>
        </div>
      </div>
    </header>
  );
}

