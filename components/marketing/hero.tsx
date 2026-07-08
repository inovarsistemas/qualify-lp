import { ArrowRight } from "lucide-react"

import { Eyebrow } from "@/components/brand/eyebrow"
import { GradientText } from "@/components/brand/gradient-text"
import { Button } from "@/components/marketing/button"
import { cn } from "@/lib/utils"

const BARS = [
  { w: "86%", align: "self-start" },
  { w: "68%", align: "self-end" },
  { w: "74%", align: "self-start" },
  { w: "52%", align: "self-end" },
]

function BubbleMotif() {
  return (
    <div className="relative flex h-[270px] w-[230px] shrink-0 flex-col justify-center gap-4 self-center rounded-[var(--ql-radius-3xl)] border-[1.5px] border-[rgba(244,68,26,0.55)] p-5 shadow-[inset_0_0_60px_rgba(244,68,26,0.12)] sm:h-[360px] sm:w-[300px] sm:gap-[22px] sm:self-auto sm:p-[26px]">
      {BARS.map((b, i) => (
        <div
          key={b.w + i}
          className={cn(
            "h-[46px] rounded-full bg-[image:var(--ql-gradient)] shadow-[0_6px_20px_rgba(244,68,26,0.35)]",
            b.align
          )}
          style={{ width: b.w, opacity: 1 - i * 0.14 }}
        />
      ))}
    </div>
  )
}

export function Hero() {
  return (
    <section className="mx-auto flex max-w-[1280px] flex-col items-start gap-10 px-6 py-14 sm:px-10 md:flex-row md:items-center md:gap-[70px] md:py-[90px]">
      <BubbleMotif />
      <div className="flex-1">
        <Eyebrow dot>SDR com inteligência artificial</Eyebrow>
        <h1 className="mt-5 text-[38px] leading-[1.04] font-bold tracking-[var(--ql-ls-tighter)] text-white sm:text-[60px] sm:leading-[1.02]">
          O gargalo do seu funil não é{" "}
          <GradientText italic>o fechamento</GradientText>
        </h1>
        <p className="mt-6 max-w-[520px] text-[17px] leading-[1.6] text-[var(--ql-text-muted)]">
          É o volume qualificado chegando para o closer. O QualifyLeads
          resolve o topo: prospecção, qualificação e agendamento, para o seu
          time focar em fechar.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3.5">
          <Button asChild size="lg">
            <a href="#cta">
              Começar agora <ArrowRight className="size-4" />
            </a>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <a href="#como">Ver demonstração</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
