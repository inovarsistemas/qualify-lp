import * as React from "react"

import { cn } from "@/lib/utils"

function Input({
  className,
  invalid = false,
  ...props
}: React.ComponentProps<"input"> & { invalid?: boolean }) {
  return (
    <input
      data-slot="ql-input"
      className={cn(
        "h-13 w-full rounded-[var(--ql-radius-lg)] border bg-[var(--ql-surface-input)] px-[18px] text-[15px] text-white outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[var(--ql-text-subtle)] focus:border-[var(--ql-border-brand)] focus:shadow-[var(--ql-focus-ring)]",
        invalid
          ? "border-[var(--ql-danger)]"
          : "border-[var(--ql-border-hairline)]",
        className
      )}
      {...props}
    />
  )
}

export { Input }
