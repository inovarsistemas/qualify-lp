import { Logo } from "@/components/brand/logo"

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--ql-border-hairline)]">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-3 px-6 py-6 text-center sm:flex-row sm:justify-between sm:px-10 sm:text-left">
        <Logo variant="stacked" height={40} />
        <span className="text-[13px] text-[var(--ql-text-subtle)]">
          © 2026 QualifyLeads · linktr.ee/qualifyleads
        </span>
      </div>
    </footer>
  )
}
