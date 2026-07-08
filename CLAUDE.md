# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Critical: Next.js version

This project uses **Next.js 16.2.6 with React 19** — a version with breaking changes from what you likely know. APIs, conventions, and file structure may differ from your training data. **Before writing any Next.js code, read the relevant guide in `node_modules/next/dist/docs/`** (`01-app/`, `02-pages/`, `03-architecture/`). Heed deprecation notices.

## Commands

```bash
npm run dev        # Start dev server
npm run build      # Production build
npm run start      # Serve production build
npm run lint       # ESLint (flat config, eslint-config-next core-web-vitals + typescript)
npm run typecheck  # tsc --noEmit — run this to check types; build does not
npm run format     # Prettier over **/*.{ts,tsx} (includes prettier-plugin-tailwindcss)
```

There is no test runner configured yet.

## Architecture

This is a Next.js **App Router** project (`app/`) using **shadcn/ui** components and **Tailwind CSS v4**. It's an early-stage landing page ("qualify-lp") built from a template — `app/page.tsx` is still the template placeholder.

- **`app/layout.tsx`** — root layout. Wires up fonts (Inter as `--font-sans`, Geist Mono as `--font-mono`) and wraps children in `ThemeProvider`. Uses `suppressHydrationWarning` because the theme class is set client-side.
- **`components/theme-provider.tsx`** — `next-themes` provider (`attribute="class"`, system default). Also registers a global **`d` keypress hotkey** that toggles dark/light mode (ignored while typing in inputs).
- **`lib/utils.ts`** — `cn()` helper (clsx + tailwind-merge) used everywhere for conditional class names.
- **`components/ui/`** — shadcn/ui primitives. Add more with `npx shadcn@latest add <name>` (do not hand-write these).

### Styling

- Tailwind v4 is configured entirely in **`app/globals.css`** via `@theme inline` and CSS custom properties — there is no `tailwind.config.js`. Theme tokens (colors, radii) are defined as `--*` variables under `:root` and `.dark`.
- Colors use the **oklch** color space. The shadcn style is `radix-mira` with `mauve` base color (see `components.json`).
- Dark mode is class-based (`.dark`), driven by `next-themes`.

### Conventions

- **Import alias:** `@/*` maps to the project root (e.g. `@/components/ui/button`, `@/lib/utils`).
- shadcn aliases (from `components.json`): `@/components`, `@/components/ui`, `@/lib`, `@/lib/utils`, `@/hooks`.
- Components are **RSC-enabled** (`rsc: true`); add `"use client"` only when a component needs browser APIs or hooks.
- Icons: **lucide-react**.
