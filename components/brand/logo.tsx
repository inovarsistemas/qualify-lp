import Image from "next/image"

import { GradientText } from "@/components/brand/gradient-text"
import { cn } from "@/lib/utils"

const IMAGE_SOURCES = {
  stacked: { src: "/assets/logo-stacked.png", ratio: 1369 / 393 },
  icon: { src: "/assets/logo-icon.png", ratio: 1 },
} as const

type LogoVariant = "stacked" | "wordmark" | "icon"

export function Logo({
  variant = "stacked",
  height = 32,
  alt = "QualifyLeads",
  priority = false,
  className,
}: {
  variant?: LogoVariant
  height?: number
  alt?: string
  priority?: boolean
  className?: string
}) {
  if (variant === "wordmark") {
    return (
      <span
        aria-label={alt}
        className={cn(
          "inline-flex items-baseline font-semibold tracking-[var(--ql-ls-tight)] text-white",
          className
        )}
        style={{ fontSize: `clamp(18px, 5vw, ${height}px)`, lineHeight: 1 }}
      >
        <span>Qualify</span>
        <GradientText italic>Leads</GradientText>
      </span>
    )
  }

  const { src, ratio } = IMAGE_SOURCES[variant]
  return (
    <Image
      src={src}
      alt={alt}
      width={Math.round(height * ratio)}
      height={height}
      priority={priority}
      className={cn("block", className)}
    />
  )
}
