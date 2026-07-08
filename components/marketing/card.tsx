import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const cardVariants = cva("", {
  variants: {
    variant: {
      raised:
        "bg-[var(--ql-surface-card)] shadow-[var(--ql-ring-inset),var(--ql-shadow-md)]",
      flat: "bg-[var(--ql-surface-raised)] shadow-[var(--ql-ring-inset)]",
      outline:
        "bg-transparent shadow-[inset_0_0_0_1px_var(--ql-border-subtle)]",
      tint: "bg-[var(--ql-flame-wash-08)] shadow-[inset_0_0_0_1px_var(--ql-border-brand)]",
      gradient:
        "bg-[image:var(--ql-gradient)] text-white shadow-[var(--ql-glow-brand)]",
    },
    padding: {
      none: "p-0",
      sm: "p-4",
      md: "p-6",
      lg: "p-7",
      xl: "p-9",
    },
    radius: {
      md: "rounded-[var(--ql-radius-md)]",
      lg: "rounded-[var(--ql-radius-lg)]",
      xl: "rounded-[var(--ql-radius-xl)]",
      "2xl": "rounded-[var(--ql-radius-2xl)]",
      "3xl": "rounded-[var(--ql-radius-3xl)]",
    },
  },
  defaultVariants: {
    variant: "raised",
    padding: "lg",
    radius: "xl",
  },
})

function Card({
  className,
  variant,
  padding,
  radius,
  glow = false,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof cardVariants> & { glow?: boolean }) {
  return (
    <div
      data-slot="ql-card"
      className={cn(
        cardVariants({ variant, padding, radius }),
        glow && "shadow-[var(--ql-glow-brand-soft)]",
        className
      )}
      {...props}
    />
  )
}

export { Card, cardVariants }
