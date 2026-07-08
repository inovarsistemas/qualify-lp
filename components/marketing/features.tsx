import { Badge } from "@/components/marketing/badge"
import { Card } from "@/components/marketing/card"
import { SectionHead } from "@/components/marketing/section-head"

const FEATURES = [
  {
    t: "Qualificação inteligente",
    d: "Pontuação automática por BANT com base em conversas reais.",
  },
  {
    t: "Integração com CRM",
    d: "Sincroniza leads, status e reuniões com o seu CRM favorito.",
  },
  { t: "Multicanal", d: "WhatsApp, Instagram e e-mail em um só agente." },
  {
    t: "Agenda automática",
    d: "Marca reuniões respeitando a disponibilidade do time.",
  },
  {
    t: "Relatórios em tempo real",
    d: "Acompanhe reuniões, taxa de resposta e conversão.",
  },
  {
    t: "Tom da sua marca",
    d: "A IA fala como o seu melhor SDR — no seu tom de voz.",
  },
]

export function Features() {
  return (
    <section id="recursos" className="mx-auto max-w-[1280px] px-6 py-14 sm:px-10">
      <SectionHead
        eyebrow="Recursos"
        title="Tudo que um SDR faz — sem escalar headcount"
      />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {FEATURES.map((f) => (
          <Card key={f.t} variant="outline">
            <Badge size="sm">IA</Badge>
            <h3 className="mt-3.5 mb-2 text-[19px] font-semibold text-white">
              {f.t}
            </h3>
            <p className="text-[14.5px] leading-[1.55] text-[var(--ql-text-muted)]">
              {f.d}
            </p>
          </Card>
        ))}
      </div>
    </section>
  )
}
