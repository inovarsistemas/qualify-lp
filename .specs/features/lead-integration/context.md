# Lead Integration Context

**Gathered:** 2026-09-04
**Spec:** `.specs/features/lead-integration/spec.md`
**Status:** Ready for design / execute

---

## Feature Boundary

Wire the qualify-lp CTA form to a server-side BFF at `POST /api/leads`, remove pricing UI, update CTA copy, add BR phone mask and honeypot anti-spam. No analytics, no E2E tests, no hero button changes.

---

## Implementation Decisions

### Submit UX (discussed)

- Form stays visible during submit; inputs and button disabled; button reads `Enviando...`
- Success (201): replace form with existing `Recebido, obrigado!` card; terminal until reload
- Failure: form and values preserved; banner `Não foi possível enviar. Tente novamente.` above submit button; retry via submit again
- Client validation blocks POST; field-level errors on invalid inputs

### Phone mask (user requested)

- Apply Brazilian mask while typing
- 11 digits → `(XX) XXXXX-XXXX`; 10 digits → `(XX) XXXX-XXXX`
- Validate 10–11 digits after stripping non-digits
- Send masked value in `contact.phone` (matches TDD sample)

### Honeypot (user requested)

- Hidden field named `website` — off-screen, `aria-hidden`, `tabIndex={-1}`, `autoComplete="off"`
- Client: if filled, skip POST and show success card (silent discard)
- Server: if `website` non-empty in body, return 201 without calling upstream

### Validation (assumed)

- react-hook-form + zod + @hookform/resolvers
- Required: nome, sobrenome, email, empresa, telefone
- `contact.name` = trimmed nome + space + trimmed sobrenome

### Payload metadata (assumed)

- `form_name`: `pedidodedemonstracaoqualify`
- `product`: `qualify`
- `page_url`: `https://qualifyleads.pro/` (fixed, not `window.location`)

### Agent's Discretion

- Exact zod error messages in Portuguese (match existing tone)
- Honeypot CSS positioning (standard visually-hidden pattern)
- Minor implementation details of mask handler (input vs controlled field)

### Declined / Undiscussed Gray Areas → Assumptions

- Duplicate submits after error: allowed (no idempotency key)
- Rate limiting: infra only, not app-level for V1

---

## Specific References

- TDD: `docs/TDD-qualify-lp-lead-integration.md`
- Upstream contract: `POST {LEADS_API_URL}/customers/external-leads` with `x-api-key`
- Reference implementation: inovar `app/api/leads/route.ts` (port when available)

---

## Deferred Ideas

- GTM `dataLayer.push` on successful submit
- E2E tests for form submission
- App-level rate limiting
