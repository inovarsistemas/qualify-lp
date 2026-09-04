import { z } from "zod"

import { digitsOnly } from "@/lib/phone"

export const leadFormSchema = z.object({
  nome: z.string().trim().min(1, "Informe seu nome"),
  sobrenome: z.string().trim().min(1, "Informe seu sobrenome"),
  email: z.string().trim().email("Informe um e-mail válido"),
  empresa: z.string().trim().min(1, "Informe o nome da empresa"),
  telefone: z
    .string()
    .trim()
    .refine((value) => {
      const len = digitsOnly(value).length
      return len >= 10 && len <= 11
    }, "Informe um telefone válido com DDD"),
  website: z.string().optional(),
})

export type LeadFormValues = z.infer<typeof leadFormSchema>

const leadContactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
})

const leadCompanySchema = z.object({
  name: z.string().min(1),
})

const leadFormMetaSchema = z.object({
  form_name: z.literal("pedidodedemonstracaoqualify"),
  page_url: z.literal("https://qualifyleads.pro/"),
  product: z.literal("qualify"),
})

export const leadPayloadSchema = z.object({
  event_type: z.literal("lead.created"),
  contact: leadContactSchema,
  company: leadCompanySchema,
  form: leadFormMetaSchema,
})

export const leadRequestSchema = z.object({
  website: z.string().optional(),
  data: leadPayloadSchema,
})

export type LeadPayload = z.infer<typeof leadPayloadSchema>

export function buildLeadPayload(values: LeadFormValues): LeadPayload {
  return {
    event_type: "lead.created",
    contact: {
      name: `${values.nome.trim()} ${values.sobrenome.trim()}`,
      email: values.email.trim(),
      phone: values.telefone.trim(),
    },
    company: {
      name: values.empresa.trim(),
    },
    form: {
      form_name: "pedidodedemonstracaoqualify",
      page_url: "https://qualifyleads.pro/",
      product: "qualify",
    },
  }
}
