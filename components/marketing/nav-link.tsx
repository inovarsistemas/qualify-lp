import * as React from "react"

import { cn } from "@/lib/utils"

function NavLink({
  children,
  href = "#",
  active = false,
  className,
  ...rest
}: {
  children: React.ReactNode
  href?: string
  active?: boolean
  className?: string
} & React.ComponentProps<"a">) {
  return (
    <a
      href={href}
      className={cn(
        "group relative text-[15px] font-medium text-[var(--ql-text-muted)] no-underline transition-colors duration-200 hover:text-white",
        active && "text-[var(--ql-brand-flame)]",
        className
      )}
      {...rest}
    >
      {children}
      <span
        aria-hidden="true"
        className={cn(
          "absolute -bottom-1.5 left-0 right-0 h-0.5 origin-left scale-x-0 rounded-full bg-[image:var(--ql-gradient)] transition-transform duration-200 ease-out group-hover:scale-x-100",
          active && "scale-x-100"
        )}
      />
    </a>
  )
}

export { NavLink }
