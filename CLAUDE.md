# Content Dashboard — CLAUDE.md

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui (Base UI primitives — `@base-ui/react`)
- **Icons**: lucide-react (bundled with shadcn)
- **AI**: Anthropic SDK (`@anthropic-ai/sdk`) — Claude Opus 4.6 with adaptive thinking + streaming

## Folder Structure

```
src/
├── app/                         # Next.js App Router pages
│   ├── api/
│   │   └── generate-content/
│   │       └── route.ts         # Streaming AI caption generator (POST)
│   ├── layout.tsx               # Root layout (sidebar + dark theme)
│   ├── page.tsx                 # Dashboard home
│   ├── instagram/page.tsx       # Instagram Manager (with AI generation)
│   ├── linkedin/page.tsx        # LinkedIn Manager (with AI drafting)
│   ├── analytics/page.tsx       # Analytics (Recharts)
│   ├── calendar/page.tsx        # Content Calendar
│   ├── competitors/page.tsx     # Competitor Tracker
│   └── news/page.tsx            # News Consolidator
├── components/
│   ├── ui/                      # shadcn/ui auto-generated components (do not edit)
│   ├── sidebar.tsx              # Shared sidebar navigation
│   └── ai-generate-panel.tsx    # Reusable AI generation UI panel
├── hooks/
│   └── useAIGenerate.ts         # Hook for streaming AI generation calls
└── lib/
    └── utils.ts                 # cn() utility from shadcn
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

## AI Content Generation

### Architecture
- **API route**: `POST /api/generate-content` — server-side, keeps API key secret
- **Model**: `claude-opus-4-6` with `thinking: { type: "adaptive" }` and streaming SSE
- **Hook**: `useAIGenerate()` in `src/hooks/useAIGenerate.ts` — handles fetch, streaming, JSON parsing
- **Component**: `<AIGeneratePanel>` in `src/components/ai-generate-panel.tsx` — drop-in UI

### Environment Variables
Add to `.env.local` (never commit this file):
```
ANTHROPIC_API_KEY=your_api_key_here
```

### How It Works
1. User types a topic (e.g. "RPM partnership with NCHA")
2. Panel calls `/api/generate-content` with brand, platform, postType, lang, topic
3. Route builds a brand-aware system prompt (EmmiTec.Health or PETJourney context) and streams Claude's response
4. Claude returns JSON with `{ caption, hashtags, tip }` — streamed token by token
5. User clicks "Apply to post" → caption + hashtags fill the form fields

### Adding AI to a New Page
```tsx
import { AIGeneratePanel } from "@/components/ai-generate-panel";
import type { GeneratedContent } from "@/hooks/useAIGenerate";

<AIGeneratePanel
  brand="EmmiTec.Health"       // or "PETJourney"
  platform="instagram"          // or "linkedin"
  postType="Reel"               // optional
  lang="EN"                     // or "PT"
  existingCaption={draft}       // optional — triggers "Improve" mode
  onApply={(result: GeneratedContent) => {
    setCaption(result.caption);
    setHashtags(result.hashtags);
  }}
/>
```

### shadcn/ui + Base UI Note
This project uses **Base UI** (`@base-ui/react`) — NOT Radix UI — for dialog primitives.
- ❌ Do NOT use `<DialogTrigger asChild>` (Radix pattern)
- ✅ Use `<DialogTrigger render={<Button />}>` (Base UI pattern)

## Key Decisions

- **App Router** chosen over Pages Router for future-compatibility with React Server Components.
- **`src/` directory** used to keep app code separate from config files.
- **Sidebar is a Client Component** because it uses `usePathname()` for active link highlighting.
- **Server Components by default** — pages are RSCs unless they need interactivity.
- **Tailwind CSS v4** — uses `@import "tailwindcss"` instead of `@tailwind` directives.
- **AI streaming via SSE** — the API route streams tokens as `data: {"text":"..."}` events; the hook accumulates them and parses the final JSON blob.
- **`suppressHydrationWarning` on `<html>`** — browser extensions inject attributes that cause hydration mismatches; this suppresses the warning safely.
