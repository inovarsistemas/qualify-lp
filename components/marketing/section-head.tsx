import { Eyebrow } from "@/components/brand/eyebrow"

export function SectionHead({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string
  title: string
  sub?: string
}) {
  return (
    <div className="mb-11 max-w-[620px]">
      <Eyebrow dot>{eyebrow}</Eyebrow>
      <h2 className="mt-4 text-[30px] leading-[1.08] font-bold tracking-[var(--ql-ls-tight)] text-white sm:text-[40px]">
        {title}
      </h2>
      {sub && (
        <p className="mt-4 text-base leading-[1.6] text-[var(--ql-text-muted)]">
          {sub}
        </p>
      )}
    </div>
  )
}
