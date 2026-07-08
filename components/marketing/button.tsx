import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-all duration-200 select-none disabled:pointer-events-none disabled:opacity-45 active:scale-[0.985]",
  {
    variants: {
      variant: {
        primary:
          "bg-[image:var(--ql-gradient)] text-white shadow-[var(--ql-glow-brand-soft)] hover:-translate-y-px hover:shadow-[var(--ql-glow-brand)] hover:brightness-[1.06]",
        secondary:
          "border border-[var(--ql-border-strong)] text-white hover:border-[var(--ql-border-brand)] hover:text-[var(--ql-brand-orange)]",
        ghost:
          "text-[var(--ql-text-body)] hover:bg-white/[0.06] hover:text-white",
        subtle:
          "border border-[var(--ql-border-hairline)] bg-[var(--ql-ink-800)] text-white hover:bg-[var(--ql-ink-750)]",
      },
      size: {
        sm: "h-[38px] px-4 text-[13.5px]",
        md: "h-[46px] px-[22px] text-[15px]",
        lg: "h-14 px-[30px] text-[17px]",
      },
      block: {
        true: "flex w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      block: false,
    },
  }
)

function Button({
  className,
  variant,
  size,
  block,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="ql-button"
      className={cn(buttonVariants({ variant, size, block, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
