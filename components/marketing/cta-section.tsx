"use client"

import * as React from "react"
import { ArrowRight, Check } from "lucide-react"

import { Logo } from "@/components/brand/logo"
import { Button } from "@/components/marketing/button"
import { Input } from "@/components/marketing/input"

export function CTASection() {
  const [sent, setSent] = React.useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSent(true)
  }

  return (
    <section id="cta" className="mx-auto max-w-[1280px] px-6 pt-8 pb-14 sm:px-10 sm:pb-[90px]">
      <div
        className="rounded-[28px] border border-[var(--ql-border-hairline)] bg-[var(--ql-ink-900)] px-5 py-10 text-center sm:rounded-[var(--ql-radius-3xl)] sm:px-12 sm:py-16"
        style={{
          backgroundImage:
            "radial-gradient(600px 300px at 50% 0%, rgba(251,92,36,0.18), transparent 70%)",
        }}
      >
        <Logo variant="stacked" height={64} className="mx-auto mb-7 sm:h-[88px] sm:w-auto" />
        <h2 className="text-[30px] leading-[1.05] font-bold tracking-[var(--ql-ls-tight)] text-white sm:text-[44px]">
          Pare de prospectar,
          <br />
          comece a fechar.
        </h2>
        <p className="mx-auto mt-[18px] max-w-[460px] text-base leading-[1.6] text-[var(--ql-text-muted)]">
          Deixe seus dados e receba uma demonstração do agente de IA no seu
          funil.
        </p>

        {!sent ? (
          <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-[760px] text-left">
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              <Input name="nome" placeholder="Nome" required />
              <Input name="sobrenome" placeholder="Sobrenome" required />
              <Input name="email" type="email" placeholder="E-mail corporativo" required />
              <Input name="empresa" placeholder="Nome da empresa" required />
              <Input
                name="telefone"
                type="tel"
                placeholder="Telefone"
                required
                className="sm:col-span-2"
              />
            </div>
            <Button type="submit" block size="lg" className="mt-4">
              Quero uma demonstração <ArrowRight className="size-4" />
            </Button>
            <p className="mt-3 text-center text-xs text-[var(--ql-text-faint)]">
              Sem spam. Seus dados são usados apenas para contato comercial.
            </p>
          </form>
        ) : (
          <div className="mx-auto mt-8 max-w-[520px] rounded-[var(--ql-radius-xl)] border border-[var(--ql-border-brand)] bg-[var(--ql-flame-wash-08)] p-7 text-left">
            <div className="flex items-center gap-2 text-xl font-semibold text-white">
              <Check className="size-5 text-[var(--ql-brand-flame)]" /> Recebido,
              obrigado!
            </div>
            <p className="mt-2.5 text-[15px] leading-[1.55] text-[var(--ql-text-muted)]">
              Nosso time entra em contato em até 1 dia útil para agendar a sua
              demonstração.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
