"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight, Check } from "lucide-react"
import { useForm } from "react-hook-form"

import { Logo } from "@/components/brand/logo"
import { Button } from "@/components/marketing/button"
import { Input } from "@/components/marketing/input"
import {
  buildLeadPayload,
  leadFormSchema,
  type LeadFormValues,
} from "@/lib/lead-schema"
import { formatBrazilPhone } from "@/lib/phone"

const defaultValues: LeadFormValues = {
  nome: "",
  sobrenome: "",
  email: "",
  empresa: "",
  telefone: "",
  website: "",
}

export function CTASection() {
  const [sent, setSent] = React.useState(false)
  const [submitError, setSubmitError] = React.useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues,
  })

  async function onSubmit(values: LeadFormValues) {
    setSubmitError(null)

    if (values.website && values.website.trim().length > 0) {
      setSent(true)
      return
    }

    const payload = buildLeadPayload(values)

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ website: values.website ?? "", data: payload }),
      })

      if (!response.ok) {
        setSubmitError("Não foi possível enviar. Tente novamente.")
        return
      }

      setSent(true)
    } catch {
      setSubmitError("Não foi possível enviar. Tente novamente.")
    }
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
          Deixe seus dados e receba uma demonstração do agente de SDR IA.
        </p>

        {!sent ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto mt-8 max-w-[760px] text-left"
            noValidate
          >
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="pointer-events-none absolute -left-[9999px] h-px w-px opacity-0"
              {...register("website")}
            />
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              <div>
                <Input
                  placeholder="Nome"
                  disabled={isSubmitting}
                  invalid={Boolean(errors.nome)}
                  {...register("nome")}
                />
                {errors.nome ? (
                  <p className="mt-1.5 text-xs text-[var(--ql-danger)]">
                    {errors.nome.message}
                  </p>
                ) : null}
              </div>
              <div>
                <Input
                  placeholder="Sobrenome"
                  disabled={isSubmitting}
                  invalid={Boolean(errors.sobrenome)}
                  {...register("sobrenome")}
                />
                {errors.sobrenome ? (
                  <p className="mt-1.5 text-xs text-[var(--ql-danger)]">
                    {errors.sobrenome.message}
                  </p>
                ) : null}
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="E-mail corporativo"
                  disabled={isSubmitting}
                  invalid={Boolean(errors.email)}
                  {...register("email")}
                />
                {errors.email ? (
                  <p className="mt-1.5 text-xs text-[var(--ql-danger)]">
                    {errors.email.message}
                  </p>
                ) : null}
              </div>
              <div>
                <Input
                  placeholder="Nome da empresa"
                  disabled={isSubmitting}
                  invalid={Boolean(errors.empresa)}
                  {...register("empresa")}
                />
                {errors.empresa ? (
                  <p className="mt-1.5 text-xs text-[var(--ql-danger)]">
                    {errors.empresa.message}
                  </p>
                ) : null}
              </div>
              <div className="sm:col-span-2">
                <Input
                  type="tel"
                  placeholder="Telefone"
                  disabled={isSubmitting}
                  invalid={Boolean(errors.telefone)}
                  {...register("telefone", {
                    onChange: (event) => {
                      setValue(
                        "telefone",
                        formatBrazilPhone(event.target.value),
                        { shouldValidate: false }
                      )
                    },
                  })}
                />
                {errors.telefone ? (
                  <p className="mt-1.5 text-xs text-[var(--ql-danger)]">
                    {errors.telefone.message}
                  </p>
                ) : null}
              </div>
            </div>
            {submitError ? (
              <p className="mt-4 text-center text-sm text-[var(--ql-danger)]">
                {submitError}
              </p>
            ) : null}
            <Button type="submit" block size="lg" className="mt-4" disabled={isSubmitting}>
              {isSubmitting ? (
                "Enviando..."
              ) : (
                <>
                  Quero uma demonstração <ArrowRight className="size-4" />
                </>
              )}
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
