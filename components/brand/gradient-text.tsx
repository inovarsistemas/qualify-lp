import * as React from "react"

import { cn } from "@/lib/utils"

export function GradientText({
  children,
  as: Tag = "span",
  italic = false,
  className,
}: {
  children: React.ReactNode
  as?: React.ElementType
  italic?: boolean
  className?: string
}) {
  return (
    <Tag
      className={cn(
        "bg-[image:var(--ql-gradient-text)] bg-clip-text text-transparent",
        italic && "italic",
        className
      )}
    >
      {children}
    </Tag>
  )
}
