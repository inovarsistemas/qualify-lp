# Lead Integration & Pricing Removal Specification

## Problem Statement

The qualify-lp landing page shows a fake success state on form submit without sending leads to CRM, and still displays self-serve pricing that conflicts with the demo-first sales motion. Production traffic at qualifyleads.pro requires working lead capture and pricing removal before launch.

## Goals

- [ ] Demo request submissions reach `{LEADS_API_URL}/customers/external-leads` via a server-side BFF
- [ ] Pricing section and nav link are removed; CTA copy reflects SDR IA positioning
- [ ] Form UX covers loading, validation, honeypot, masked phone, and recoverable errors

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
| ------- | ------ |
| GTM / analytics conversion events | Future consideration per TDD |
| E2E automated tests | No test runner in project yet |
| Hero "Ver demonstração" button change | Links to `#como`, not pricing — keep as-is |
| Popup / modal form pattern | qualify-lp uses single CTA section |
| Pricing / plans content anywhere on LP | Demo-first motion; grep before release |
| Client-side idempotency / dedup keys | Not in upstream V1 contract |
| App-level rate limiting | Infra-level concern for V1 |

---

## Assumptions & Open Questions

Every ambiguity is resolved or recorded here — nothing is left silently unclear.

| Assumption / decision | Chosen default | Rationale | Confirmed? |
| --------------------- | -------------- | --------- | ---------- |
| Validation library | react-hook-form + zod + @hookform/resolvers | TDD recommends parity with inovar; field-level errors and submit state | y |
| Name assembly | `contact.name` = trimmed `nome` + space + trimmed `sobrenome` | Both fields exist in form; TDD mapping | y |
| Phone validation | 10–11 digits after stripping non-digits | TDD: mirror inovar rules | y |
| Phone mask | BR mask while typing: `(XX) XXXXX-XXXX` (11 digits) or `(XX) XXXX-XXXX` (10 digits) | User requested mask; matches sample payload format | y |
| `page_url` | Always `https://qualifyleads.pro/` | TDD sample payload; stable CRM attribution | y |
| Honeypot field name | `website` (hidden off-screen input) | Common bot target; inovar uses honeypot pattern | y |
| Honeypot server behavior | IF honeypot non-empty THEN return 201 without calling upstream | Silent discard — bots see success, no CRM noise | y |
| Honeypot client behavior | Include field in DOM; real users never fill it | Standard anti-spam pattern | y |
| Duplicate submit after error | Allowed; may create duplicate upstream leads | No idempotency in V1 contract | y |
| Reference implementation | Port logic from inovar `app/api/leads/route.ts` when available | TDD reference; implement equivalent contract locally if repo unavailable | y |
| Env vars | `LEADS_API_URL`, `LEADS_API_KEY` server-only; document in `.env.example` | TDD security model | y |

**Open questions:** none — all resolved or logged above.

---

## User Stories

### P1: Lead capture via BFF ⭐ MVP

**User Story**: As a marketing prospect, I want to submit my demo request on qualify-lp so that the sales team receives my lead in CRM.

**Why P1**: Zero pipeline without working lead capture.

**Acceptance Criteria**:

1. WHEN the user submits the CTA form with valid data THEN the browser SHALL POST JSON to same-origin `/api/leads` with `data.event_type`, `data.contact`, `data.company`, and `data.form` matching the TDD contract (`form_name: "pedidodedemonstracaoqualify"`, `product: "qualify"`, `page_url: "https://qualifyleads.pro/"`).
2. WHEN `/api/leads` receives a valid body and env vars are set THEN the route SHALL forward the payload to `{LEADS_API_URL}/customers/external-leads` with header `x-api-key: {LEADS_API_KEY}`.
3. WHEN the upstream responds 201 THEN `/api/leads` SHALL return 201 with the upstream JSON body.
4. WHEN the upstream responds with an error THEN `/api/leads` SHALL return an appropriate status (502 for unreachable upstream; forward upstream errors with normalized `message`).
5. IF `LEADS_API_URL` or `LEADS_API_KEY` is missing THEN `/api/leads` SHALL return 500 with a message indicating misconfiguration.
6. IF the request body lacks a valid `data` object THEN `/api/leads` SHALL return 400.

**Independent Test**: POST valid payload to `/api/leads` with env configured → 201 and upstream receives lead with correct metadata.

---

### P1: Form submit UX ⭐ MVP

**User Story**: As a prospect filling the demo form, I want clear feedback while submitting and on failure so that I know whether my request was received.

**Why P1**: Required for production-ready form on a live LP.

**Acceptance Criteria**:

1. WHILE a submit request is in flight THEN the form SHALL remain visible, all inputs and the submit button SHALL be disabled, and the submit button label SHALL read `Enviando...`.
2. WHEN the API returns 201 THEN the form SHALL be replaced by the existing success card (`Recebido, obrigado!`) and SHALL NOT return to the form until a full page reload.
3. IF submit fails (network error, 4xx, or 5xx) THEN the form SHALL remain visible with field values preserved and SHALL display the banner `Não foi possível enviar. Tente novamente.` above the submit button.
4. WHEN the user clicks submit again after a failure THEN the system SHALL retry the POST to `/api/leads`.
5. IF client-side validation fails THEN the system SHALL NOT send the request and SHALL show field-level errors on invalid inputs.

**Independent Test**: Submit valid form → loading state → success card; simulate 502 → error banner → retry succeeds.

---

### P1: Client validation, phone mask, and honeypot ⭐ MVP

**User Story**: As the product owner, I want validated, masked phone input and bot filtering so that CRM receives clean leads and spam is reduced.

**Why P1**: User explicitly requested honeypot and phone mask for V1.

**Acceptance Criteria**:

1. WHEN the user types in the phone field THEN the input SHALL apply a Brazilian phone mask: `(XX) XXXXX-XXXX` for 11 digits or `(XX) XXXX-XXXX` for 10 digits.
2. IF the phone field has fewer than 10 or more than 11 digits (after stripping non-digits) on submit THEN the system SHALL show a field-level validation error and SHALL NOT POST.
3. IF email, nome, sobrenome, or empresa fail validation on submit THEN the system SHALL show field-level errors and SHALL NOT POST.
4. The form SHALL include a hidden honeypot field named `website` that is not visible to users (off-screen / aria-hidden, `tabIndex={-1}`, `autoComplete="off"`).
5. IF the honeypot field is non-empty on submit THEN the client SHALL NOT POST to `/api/leads` and SHALL show the success card (silent discard, same as bot-facing server behavior).
6. IF the honeypot field is non-empty in the POST body received by `/api/leads` THEN the route SHALL return 201 without calling the upstream API.

**Independent Test**: Type phone digits → mask formats live; fill honeypot → success UI with no network call; server honeypot POST → 201 without upstream hit.

---

### P1: Remove pricing and update copy ⭐ MVP

**User Story**: As a visitor, I want a demo-first page without self-serve pricing so that I am guided to request a demonstration.

**Why P1**: Misaligned pricing messaging blocks the intended buyer journey.

**Acceptance Criteria**:

1. The page SHALL NOT render the `Pricing` component or import `components/marketing/pricing.tsx`.
2. The file `components/marketing/pricing.tsx` SHALL be deleted.
3. The site header nav SHALL NOT include a link to `#precos`.
4. The CTA subtitle SHALL read: `Deixe seus dados e receba uma demonstração do agente de SDR IA.`
5. The page scroll flow SHALL remain: Hero → HowItWorks → Features → CTA (no broken `#precos` anchors).

**Independent Test**: Load page → no pricing section, no Preços nav link, updated subtitle, `npm run build` passes.

---

### P2: Environment and dependency setup

**User Story**: As an engineer deploying qualify-lp, I want documented env vars and form dependencies so that production lead capture can be configured safely.

**Why P2**: Required for deploy but not user-visible behavior.

**Acceptance Criteria**:

1. `package.json` SHALL include `react-hook-form`, `@hookform/resolvers`, and `zod`.
2. `.env.example` SHALL document `LEADS_API_URL` and `LEADS_API_KEY` without secret values.
3. Neither env var SHALL use a `NEXT_PUBLIC_` prefix.

**Independent Test**: Copy `.env.example`, set vars locally, form submits successfully.

---

## Edge Cases

- IF upstream is unreachable THEN `/api/leads` SHALL return 502 and the client SHALL show the retry banner.
- IF user pastes an unmasked phone number THEN the mask SHALL normalize on input/blur to the BR format.
- IF honeypot is filled THEN neither client nor server SHALL create a CRM lead.
- WHEN grepping for pricing copy before release THEN no `R$`, `#precos`, or `Preços` nav references SHALL remain outside deleted files.

---

## Requirement Traceability

| Requirement ID | Story | Phase | Status |
| -------------- | ----- | ----- | ------ |
| LEAD-01 | P1: Lead capture via BFF | Execute | Verified |
| LEAD-02 | P1: Lead capture via BFF | Execute | Verified |
| LEAD-03 | P1: Lead capture via BFF | Execute | Verified |
| LEAD-04 | P1: Lead capture via BFF | Execute | Verified |
| LEAD-05 | P1: Lead capture via BFF | Execute | Verified |
| LEAD-06 | P1: Lead capture via BFF | Execute | Verified |
| FORM-01 | P1: Form submit UX | Execute | Verified |
| FORM-02 | P1: Form submit UX | Execute | Verified |
| FORM-03 | P1: Form submit UX | Execute | Verified |
| FORM-04 | P1: Form submit UX | Execute | Verified |
| FORM-05 | P1: Form submit UX | Execute | Verified |
| VAL-01 | P1: Validation, mask, honeypot | Execute | Verified |
| VAL-02 | P1: Validation, mask, honeypot | Execute | Verified |
| VAL-03 | P1: Validation, mask, honeypot | Execute | Verified |
| VAL-04 | P1: Validation, mask, honeypot | Execute | Verified |
| VAL-05 | P1: Validation, mask, honeypot | Execute | Verified |
| VAL-06 | P1: Validation, mask, honeypot | Execute | Verified |
| COPY-01 | P1: Remove pricing | Execute | Verified |
| COPY-02 | P1: Remove pricing | Execute | Verified |
| COPY-03 | P1: Remove pricing | Execute | Verified |
| COPY-04 | P1: Remove pricing | Execute | Verified |
| COPY-05 | P1: Remove pricing | Execute | Verified |
| CFG-01 | P2: Env and deps | Execute | Verified |
| CFG-02 | P2: Env and deps | Execute | Verified |
| CFG-03 | P2: Env and deps | Execute | Verified |

**Coverage:** 25 total, 25 verified via build/typecheck/lint (no automated test runner)

---

## Success Criteria

- [ ] Valid demo submission reaches CRM with `form_name=pedidodedemonstracaoqualify` and `product=qualify`
- [ ] Honeypot submissions never reach upstream
- [ ] Phone field shows BR mask; invalid phones block submit with field error
- [ ] Pricing section and nav link removed; CTA copy updated
- [ ] `npm run build`, `npm run typecheck`, and `npm run lint` pass
