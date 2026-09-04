# Lead Integration — Independent Verification Report

**Verifier:** Independent Verifier (author ≠ verifier)  
**Feature:** lead-integration  
**Diff range:** `7c88df6..c53d9e4` (4 commits)  
**Verified at:** 2026-09-04

## Validation

**Result:** PASS

**Diff range:** `7c88df6..c53d9e4` (4 commits)

---

## Quality Gates

| Gate | Result | Notes |
| ---- | ------ | ----- |
| `npm run typecheck` | PASS | Exit 0 |
| `npm run lint` | PASS | Exit 0 |
| `npm run build` | PASS | Exit 0; `/api/leads` route present |

---

## Commits in Range

| SHA | Message |
| --- | ------- |
| `7c88df6` | build(lead-integration): add form deps and env example |
| `ac154dd` | feat(api): add POST /api/leads BFF route |
| `3dac5c7` | feat(form): wire CTA with validation mask and honeypot |
| `c53d9e4` | feat(marketing): remove pricing section and update copy |

---

## Per-AC Evidence

### P1: Lead capture via BFF (LEAD-01 … LEAD-06)

| ID | Acceptance Criterion | Evidence | Status |
| -- | -------------------- | -------- | ------ |
| LEAD-01 | Valid submit POSTs JSON to same-origin `/api/leads` with TDD contract fields | Client: `components/marketing/cta-section.tsx:52-55` (`fetch("/api/leads", …)`). Payload builder: `lib/lead-schema.ts:52-68` (`event_type`, `contact.name` assembly, `form_name`, `page_url`, `product`). Schema literals: `lib/lead-schema.ts:32-36` | PASS |
| LEAD-02 | Route forwards to `{LEADS_API_URL}/customers/external-leads` with `x-api-key` | `app/api/leads/route.ts:40-51` | PASS |
| LEAD-03 | Upstream 201 → route returns 201 with upstream JSON | `app/api/leads/route.ts:84-86` | PASS |
| LEAD-04 | Upstream error → appropriate status; 502 if unreachable; normalized `message` | Unreachable: `app/api/leads/route.ts:53-58`. Upstream error forward: `app/api/leads/route.ts:69-81` | PASS |
| LEAD-05 | Missing env vars → 500 misconfiguration message | `app/api/leads/route.ts:32-37` | PASS |
| LEAD-06 | Invalid/missing `data` → 400 | Parse fail: `app/api/leads/route.ts:14-21`. Invalid JSON: `app/api/leads/route.ts:10-12` | PASS |

### P1: Form submit UX (FORM-01 … FORM-05)

| ID | Acceptance Criterion | Evidence | Status |
| -- | -------------------- | -------- | ------ |
| FORM-01 | In-flight: form visible, inputs/button disabled, label `Enviando...` | `isSubmitting` disables inputs: `components/marketing/cta-section.tsx:106,119,134,147,160,184`. Label: `components/marketing/cta-section.tsx:185-186` | PASS |
| FORM-02 | 201 → success card; no return to form until reload | `setSent(true)`: `components/marketing/cta-section.tsx:63`. Success UI: `components/marketing/cta-section.tsx:197-207`. Conditional render: `components/marketing/cta-section.tsx:88,197` | PASS |
| FORM-03 | Failure → form visible, values preserved, banner above submit | Error set: `components/marketing/cta-section.tsx:58-60,65`. Banner placement: `components/marketing/cta-section.tsx:179-184`. react-hook-form preserves values on error (no reset) | PASS |
| FORM-04 | Retry after failure re-POSTs | Form stays mounted; `handleSubmit(onSubmit)` on resubmit: `components/marketing/cta-section.tsx:89-90,41-66` | PASS |
| FORM-05 | Client validation failure → no POST, field errors | `zodResolver(leadFormSchema)`: `components/marketing/cta-section.tsx:37`. Field errors: `components/marketing/cta-section.tsx:110-176` | PASS |

### P1: Client validation, phone mask, honeypot (VAL-01 … VAL-06)

| ID | Acceptance Criterion | Evidence | Status |
| -- | -------------------- | -------- | ------ |
| VAL-01 | BR phone mask while typing (10- or 11-digit formats) | `lib/phone.ts:5-17` (`formatBrazilPhone`). Wired on change: `components/marketing/cta-section.tsx:162-169` | PASS |
| VAL-02 | Phone &lt;10 or &gt;11 digits → field error, no POST | `lib/lead-schema.ts:10-16` | PASS |
| VAL-03 | email/nome/sobrenome/empresa fail → field errors, no POST | `lib/lead-schema.ts:6-9` + resolver in `components/marketing/cta-section.tsx:37` | PASS |
| VAL-04 | Hidden honeypot `website` (off-screen, aria-hidden, tabIndex -1, autoComplete off) | `components/marketing/cta-section.tsx:94-101` | PASS |
| VAL-05 | Non-empty honeypot → no POST, show success card | `components/marketing/cta-section.tsx:44-46` (early return before `fetch`) | PASS |
| VAL-06 | Server honeypot in body → 201 without upstream call | `app/api/leads/route.ts:25-27` | PASS |

### P1: Remove pricing and update copy (COPY-01 … COPY-05)

| ID | Acceptance Criterion | Evidence | Status |
| -- | -------------------- | -------- | ------ |
| COPY-01 | No `Pricing` component render/import | `app/page.tsx:1-24` — no pricing import | PASS |
| COPY-02 | `components/marketing/pricing.tsx` deleted | File absent (glob 0 matches) | PASS |
| COPY-03 | Header nav has no `#precos` link | `components/marketing/site-header.tsx:13-14` | PASS |
| COPY-04 | CTA subtitle updated | `components/marketing/cta-section.tsx:84-85` | PASS |
| COPY-05 | Scroll flow Hero → HowItWorks → Features → CTA | `app/page.tsx:18-21` | PASS |

### P2: Environment and dependency setup (CFG-01 … CFG-03)

| ID | Acceptance Criterion | Evidence | Status |
| -- | -------------------- | -------- | ------ |
| CFG-01 | `react-hook-form`, `@hookform/resolvers`, `zod` in package.json | `package.json:15,24,28` | PASS |
| CFG-02 | `.env.example` documents `LEADS_API_URL`, `LEADS_API_KEY` | `.env.example:2-3` | PASS |
| CFG-03 | No `NEXT_PUBLIC_` prefix on env vars | `.env.example:1-3`; grep: no `NEXT_PUBLIC_LEADS` in repo | PASS |

---

## Edge Cases (code review)

| Edge case | Evidence | Status |
| --------- | -------- | ------ |
| Upstream unreachable → 502 + client retry banner | Server: `app/api/leads/route.ts:53-58`. Client banner: `components/marketing/cta-section.tsx:58-60,65,179-182` | PASS |
| Paste unmasked phone → normalize | `onChange` applies mask on paste: `components/marketing/cta-section.tsx:163-168`. **Spec-precision note:** spec mentions `input/blur`; implementation uses `onChange` only (paste still covered in browsers). | PASS (minor spec wording gap) |
| Honeypot never creates CRM lead | Client: `cta-section.tsx:44-46`. Server: `route.ts:25-27` | PASS |
| Pricing grep clean in LP source | Grep `R$`, `#precos`, `Preços` in `*.{tsx,ts,jsx,js,css,html}`: **0 matches**. References remain only in `.specs/` and `docs/` (expected). | PASS |

---

## Discrimination Sensor

**Method:** Git worktree scratch at `HEAD` (`c53d9e4`); two logic mutants applied; `npm run typecheck && npm run lint && npm run build` on mutated tree.

| Mutant | Mutation | Killed by automated tests? | Killed by quality gates? |
| ------ | -------- | -------------------------- | ------------------------ |
| M1 — honeypot bypass | Commented out server honeypot early-return in `app/api/leads/route.ts:25-27` | **No** — no test runner | **No** — typecheck/lint/build pass (ESLint unused-var warning only) |
| M2 — phone validation | `lead-schema.ts` phone refine replaced with always-true | **No** — no test runner | **No** — typecheck/lint/build pass (ESLint unused import warning only) |

**Sensor conclusion:** Critical anti-spam and validation logic is **not protected by automated tests**. Structural gates (typecheck/lint/build) cannot discriminate behavioral regressions. Manual/E2E verification required before production deploy.

Scratch worktree removed after sensor run.

---

## Pricing Remnant Grep

```
Pattern: R$ | #precos | Preços | Pricing | pricing
Scope:   application source (*.tsx, *.ts, components/)
Result:  CLEAN — zero matches in LP/components/app code
Notes:   References exist in .specs/ and docs/TDD (documentation only)
```

---

## Gaps Ranked by Severity

| Severity | Gap | Impact |
| -------- | --- | ------ |
| **High** | No automated tests; discrimination sensor mutants survive all gates | Honeypot bypass or phone validation removal could ship undetected |
| **Low** | Phone mask uses `onChange` only, not explicit `onBlur` | Paste/normalize still works via `onChange`; spec wording slightly broader than code |
| **Low** | No runtime verification against live upstream CRM | BFF contract verified statically; production env + upstream 201 not exercised in CI |
| **Info** | Next.js workspace-root warning during build (multiple lockfiles) | Non-blocking; unrelated to feature ACs |

---

## Summary

All 25 acceptance criteria have **code-level evidence** and pass static verification. Quality gates pass on clean tree. Pricing removal is complete in application source. **Result: PASS** with the documented **High** gap: behavioral correctness relies on code review and manual testing until a test runner is added.
