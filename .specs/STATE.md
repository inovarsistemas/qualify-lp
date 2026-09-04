# Project State

## Decisions

| ID | Date | Decision | Rationale |
| -- | ---- | -------- | --------- |
| AD-001 | 2026-09-04 | Submit UX: loading disables form; success replaces form; failure shows retry banner | User confirmed Quick pace for submit UX gray area |
| AD-002 | 2026-09-04 | BR phone mask while typing (10–11 digit validation) | User requested phone mask for V1 |
| AD-003 | 2026-09-04 | Honeypot field `website` with silent 201 discard client + server | User requested honeypot for V1 |
| AD-004 | 2026-09-04 | react-hook-form + zod for form validation | TDD recommendation; field-level errors |
| AD-005 | 2026-09-04 | Fixed `page_url` = `https://qualifyleads.pro/` | Stable CRM attribution per TDD |

## Handoff

**Feature:** lead-integration
**Branch:** main
**Phase:** Complete — Verifier PASS (`7c88df6..c53d9e4`)
**Done:** 4 commits; build/typecheck/lint pass; validation.md written
**Next:** Deploy with `LEADS_API_URL` + `LEADS_API_KEY`; manual smoke test against stage API
**Blockers:** none
