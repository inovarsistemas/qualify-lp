import { ArrowRight } from "lucide-react"

import { Logo } from "@/components/brand/logo"
import { Button } from "@/components/marketing/button"
import { NavLink } from "@/components/marketing/nav-link"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-[var(--ql-border-hairline)] bg-black/55 backdrop-blur-[14px]">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-2.5 sm:px-10">
        <Logo variant="wordmark" height={26} priority />
        <nav className="hidden items-center gap-8 md:flex">
          <NavLink href="#como">Como funciona</NavLink>
          <NavLink href="#recursos">Recursos</NavLink>
          <NavLink href="#precos">Preços</NavLink>
        </nav>
        <Button asChild size="sm">
          <a href="#cta">
            Começar agora <ArrowRight className="hidden size-4 sm:inline" />
          </a>
        </Button>
      </div>
    </header>
  )
}
