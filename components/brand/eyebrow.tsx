import * as React from "react"

import { cn } from "@/lib/utils"

const TONE_CLASSES = {
  brand: "text-[var(--ql-brand-flame)]",
  muted: "text-[var(--ql-text-subtle)]",
  white: "text-white",
} as const

export function Eyebrow({
  children,
  dot = false,
  tone = "brand",
  className,
}: {
  children: React.ReactNode
  dot?: boolean
  tone?: keyof typeof TONE_CLASSES
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-xs font-semibold tracking-[0.22em] uppercase",
        TONE_CLASSES[tone],
        className
      )}
    >
      {dot && (
        <span
          aria-hidden="true"
          className="h-[7px] w-[7px] shrink-0 rounded-full bg-[image:var(--ql-gradient)] shadow-[var(--ql-glow-brand-soft)]"
        />
      )}
      {children}
    </span>
  )
}
