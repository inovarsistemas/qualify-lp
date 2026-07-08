import { Check } from "lucide-react"

import { Badge } from "@/components/marketing/badge"
import { Button } from "@/components/marketing/button"
import { Card } from "@/components/marketing/card"
import { SectionHead } from "@/components/marketing/section-head"
import { cn } from "@/lib/utils"

const PLANS = [
  {
    name: "Starter",
    price: "R$ 497",
    period: "/mês",
    feats: ["1 canal", "Até 500 leads/mês", "Agenda automática"],
    featured: false,
    cta: "Começar agora",
  },
  {
    name: "Growth",
    price: "R$ 997",
    period: "/mês",
    feats: [
      "3 canais",
      "Leads ilimitados",
      "Integração CRM",
      "Relatórios avançados",
    ],
    featured: true,
    cta: "Começar agora",
  },
  {
    name: "Scale",
    price: "Sob consulta",
    period: "",
    feats: ["Multi-time", "API dedicada", "Onboarding assistido"],
    featured: false,
    cta: "Falar com vendas",
  },
]

export function Pricing() {
  return (
    <section id="precos" className="mx-auto max-w-[1280px] px-6 py-14 sm:px-10">
      <SectionHead
        eyebrow="Preços"
        title="Pague pelo que fecha, não pelo que promete"
      />
      <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-3">
        {PLANS.map((p) => (
          <Card
            key={p.name}
            variant={p.featured ? "tint" : "raised"}
            glow={p.featured}
            className={cn(
              "flex flex-col gap-[18px]",
              p.featured && "border border-[var(--ql-border-brand)]"
            )}
          >
            <div className="flex items-center gap-2.5">
              <h3 className="text-xl font-semibold text-white">{p.name}</h3>
              {p.featured && (
                <Badge variant="solid" size="sm">
                  Popular
                </Badge>
              )}
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-[34px] font-bold tracking-[var(--ql-ls-tight)] text-white">
                {p.price}
              </span>
              {p.period && (
                <span className="text-[15px] text-[var(--ql-text-subtle)]">
                  {p.period}
                </span>
              )}
            </div>
            <div className="flex flex-1 flex-col gap-2.5">
              {p.feats.map((f) => (
                <div
                  key={f}
                  className="flex items-center gap-2.5 text-[14.5px] text-[var(--ql-text-body)]"
                >
                  <Check className="size-4 shrink-0 text-[var(--ql-brand-flame)]" />
                  {f}
                </div>
              ))}
            </div>
            <Button asChild block variant={p.featured ? "primary" : "secondary"}>
              <a href="#cta">{p.cta}</a>
            </Button>
          </Card>
        ))}
      </div>
    </section>
  )
}
