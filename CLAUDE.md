# Content Dashboard — CLAUDE.md

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui (Radix UI primitives)
- **Icons**: lucide-react (bundled with shadcn)

## Folder Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (sidebar + dark theme)
│   ├── page.tsx            # Dashboard home
│   ├── instagram/page.tsx  # Instagram Manager
│   ├── analytics/page.tsx  # Analytics
│   ├── calendar/page.tsx   # Content Calendar
│   ├── competitors/page.tsx # Competitor Tracker
│   └── news/page.tsx       # News Consolidator
├── components/
│   ├── ui/                 # shadcn/ui auto-generated components
│   └── sidebar.tsx         # Shared sidebar navigation
└── lib/
    └── utils.ts            # cn() utility from shadcn
```

## Component Conventions

- **shadcn/ui components** are in `src/components/ui/` — do not edit these manually; re-run `npx shadcn@latest add <component>` to update.
- **Custom components** live in `src/components/` (not in `ui/`).
- Use the `cn()` helper from `@/lib/utils` for conditional class merging.
- All icons come from `lucide-react`.
- Use `"use client"` directive only when client-side interactivity is needed (e.g., `usePathname` in Sidebar).

## Dark Theme

- Dark mode is set globally via `className="dark"` on the `<html>` element in `src/app/layout.tsx`.
- Colors use CSS variables defined by shadcn (`--background`, `--foreground`, `--muted`, etc.) in `globals.css`.
- Do not use hardcoded Tailwind color classes (e.g., `bg-gray-900`) — prefer semantic tokens (`bg-background`, `text-muted-foreground`).

## Navigation

The `Sidebar` component (`src/components/sidebar.tsx`) renders all nav links. To add a new section:
1. Add a new route under `src/app/<section>/page.tsx`.
2. Add the corresponding entry to the `navItems` array in `sidebar.tsx`.

## Key Decisions

- **App Router** chosen over Pages Router for future-compatibility with React Server Components.
- **`src/` directory** used to keep app code separate from config files.
- **No Turbopack** in dev to avoid potential compatibility issues with some shadcn components.
- **Sidebar is a Client Component** because it uses `usePathname()` for active link highlighting.
- **Server Components by default** — pages are RSCs unless they need interactivity.
- **Tailwind CSS v4** — installed by create-next-app; uses `@import "tailwindcss"` instead of `@tailwind` directives.
