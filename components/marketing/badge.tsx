import * as React from "react"

import { cn } from "@/lib/utils"

const TONE_RGB = {
  brand: "251,92,36",
  neutral: "255,255,255",
  success: "53,192,138",
  warning: "240,167,59",
  danger: "240,71,59",
  info: "91,155,255",
} as const

const TONE_COLOR = {
  brand: "#FF8A4D",
  neutral: "var(--ql-text-body)",
  success: "var(--ql-success)",
  warning: "var(--ql-warning)",
  danger: "var(--ql-danger)",
  info: "var(--ql-info)",
} as const

type Tone = keyof typeof TONE_RGB
type Variant = "soft" | "outline" | "solid"

function Badge({
  children,
  tone = "brand",
  variant = "soft",
  size = "md",
  dot = false,
  className,
  style,
  ...rest
}: {
  children: React.ReactNode
  tone?: Tone
  variant?: Variant
  size?: "sm" | "md"
  dot?: boolean
  className?: string
} & React.ComponentProps<"span">) {
  const rgb = TONE_RGB[tone]
  const color = TONE_COLOR[tone]

  const variantStyle: React.CSSProperties =
    variant === "solid"
      ? tone === "brand"
        ? {
            backgroundImage: "var(--ql-gradient)",
            color: "var(--ql-on-brand)",
            border: "1px solid transparent",
          }
        : { background: color, color: "#0A0A0A", border: "1px solid transparent" }
      : variant === "outline"
        ? { background: "transparent", color, border: `1px solid rgba(${rgb},0.5)` }
        : { background: `rgba(${rgb},0.14)`, color, border: "1px solid transparent" }

  return (
    <span
      data-slot="ql-badge"
      className={cn(
        "inline-flex items-center rounded-full font-semibold tracking-[0.03em] whitespace-nowrap",
        size === "sm" ? "gap-[5px] px-2 text-[10.5px]" : "gap-1.5 px-[11px] py-1 text-xs",
        className
      )}
      style={{ ...variantStyle, ...style }}
      {...rest}
    >
      {dot && (
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: variant === "solid" ? "currentColor" : color }}
        />
      )}
      {children}
    </span>
  )
}

export { Badge }
