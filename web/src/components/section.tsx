import { cn } from "@/lib/cn";
import type { HTMLAttributes, ReactNode } from "react";

type SectionTone = "sand" | "sea-shallow" | "sea-deep";

const toneBackground: Record<SectionTone, string> = {
  sand: "bg-sand",
  "sea-shallow": "bg-sea-shallow",
  "sea-deep": "bg-sea-deep",
};

type SectionProps = {
  tone?: SectionTone;
  bleed?: boolean;
  className?: string;
  children: ReactNode;
} & Omit<HTMLAttributes<HTMLElement>, "className">;

export function Section({
  tone = "sand",
  bleed = false,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        toneBackground[tone],
        "py-24 md:py-28 transition-colors duration-500",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "mx-auto w-full px-6",
          bleed ? "max-w-none" : "max-w-[1120px]"
        )}
      >
        {children}
      </div>
    </section>
  );
}
