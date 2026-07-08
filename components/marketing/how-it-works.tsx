import { Card } from "@/components/marketing/card"
import { SectionHead } from "@/components/marketing/section-head"

const STEPS = [
  {
    n: "01",
    t: "Prospecta",
    d: "A IA encontra e aborda leads no perfil ideal, 24/7, sem esforço manual do time.",
  },
  {
    n: "02",
    t: "Qualifica",
    d: "Conversas naturais que entendem dor, orçamento e urgência — e pontuam cada lead.",
  },
  {
    n: "03",
    t: "Agenda",
    d: "Reuniões marcadas direto na agenda do closer. Seu time entra só para fechar.",
  },
]

export function HowItWorks() {
  return (
    <section id="como" className="mx-auto max-w-[1280px] px-6 py-14 sm:px-10">
      <SectionHead
        eyebrow="Como funciona"
        title="Do primeiro contato à reunião agendada"
        sub="Um agente autônomo que cuida do topo do funil de ponta a ponta."
      />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {STEPS.map((s) => (
          <Card key={s.n} variant="raised">
            <div className="font-mono text-sm font-semibold tracking-[0.1em] text-[var(--ql-brand-flame)]">
              {s.n}
            </div>
            <h3 className="mt-3.5 mb-2 text-[22px] font-semibold text-white">
              {s.t}
            </h3>
            <p className="text-[15px] leading-[1.55] text-[var(--ql-text-muted)]">
              {s.d}
            </p>
          </Card>
        ))}
      </div>
    </section>
  )
}
