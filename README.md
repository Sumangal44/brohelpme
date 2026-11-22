# BroHelp.Me

[![Website](https://img.shields.io/badge/website-BroHelp.Me-059669?style=flat-square)](https://brohelpme.netlify.app/)
[![License: MIT](https://img.shields.io/badge/license-MIT-emerald?style=flat-square)](LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/Sumangal44/brohelpme?style=flat-square&logo=github&label=stars)](https://github.com/Sumangal44/brohelpme/stargazers)
[![Astro](https://img.shields.io/badge/Astro-7-static?style=flat-square&logo=astro&logoColor=white)](https://astro.build)
[![Svelte](https://img.shields.io/badge/Svelte-5-ff3e00?style=flat-square&logo=svelte&logoColor=white)](https://svelte.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

**BroHelpMe** is a fast, static quick-reference platform for developers:
**216 cheat sheets** across **13 categories**, with instant `⌘K` search, copyable code blocks and a
full light/dark theme.

> Live site: **[https://brohelpme.netlify.app/](https://brohelpme.netlify.app/)** ·
> Source: **[github.com/Sumangal44/brohelpme](https://github.com/Sumangal44/brohelpme)**

---

## Features

- **216 cheat sheets, 13 categories** — Keyboard Shortcuts (80), Programming (57), Linux Command (24),
  Other (19), Toolkit (12), AI (10), Database (5), Operating System (3), Python (3), Testing (2),
  Game (2), Productivity (1), Software (1)
- **Instant search** — `⌘K` / `Ctrl+K` command palette (also `/`) with fuzzy filtering and real-time category navigation
- **Light & dark theme** — class-based `.dark` toggle persisted in `localStorage`, with the `theme-color`
  meta kept in sync
- **Responsive navbar** — blurred sticky header, search pill, theme toggle, GitHub Star button and a
  hamburger panel on small screens
- **Contribute modal** — step-by-step guide for adding a sheet, with deep links that open the right file
  on GitHub
- **Copy-friendly code blocks** — sections (`##`) and cards (`###`) rendered from Markdown with copy buttons
- **222 tech icons** — resolved per sheet from `public/icons/<slug>.svg` with an alias map and a logo fallback
- **SEO & performance** — fully static output, sitemap, per-page meta, zero client-side rendering cost on
  the critical path

## Tech stack

| Layer      | Choice                                                                              |
| ---------- | ----------------------------------------------------------------------------------- |
| Framework  | [Astro 7](https://astro.build) — `output: 'static'`                                 |
| UI islands | [Svelte 5](https://svelte.dev)                                                      |
| Styling    | [Tailwind CSS 4](https://tailwindcss.com) (`@theme` tokens, `@custom-variant dark`) |
| Primitives | shadcn-svelte (`button`, `badge`) + bits-ui                                         |
| Content    | Markdown frontmatter → custom loader in `src/lib/cheatsheets.ts`                    |
| Tooling    | TypeScript, `@astrojs/sitemap`, GSAP, Shiki                                         |

## Quick start

Requires **Node.js ≥ 22**.

```bash
git clone https://github.com/Sumangal44/brohelpme.git
cd brohelpme
npm install

npm run dev       # dev server → http://localhost:4321
npm run build     # production build → dist/
npm run preview   # preview the production build
```

## Project structure

```
.
├── public/
│   ├── icons/                     # 222 tech SVG icons → /icons/<slug>.svg
│   ├── logo/                      # PWA logo PNGs (72px – 512px)
│   ├── logo.svg                   # site mark + fallback for sheets without an icon
│   └── favicon.svg / favicon.ico
│
├── src/
│   ├── components/
│   │   ├── Navbar.svelte          # sticky header, search pill, theme toggle, GitHub Star, mobile menu
│   │   ├── Footer.astro           # brand, repo/contribute/license links
│   │   ├── CheatList.svelte       # hero, sticky category filter bar, sheet cards
│   │   ├── SearchPage.svelte      # /search page (query + category filtering)
│   │   ├── CommandPalette.svelte  # ⌘K / "/" palette with keyboard navigation
│   │   └── ContributeModal.svelte # how to add or edit a sheet (view / edit / new on GitHub)
│   │
│   ├── layouts/
│   │   └── Layout.astro           # <head> meta, theme bootstrap script, island mounting
│   │
│   ├── pages/
│   │   ├── index.astro            # /            → CheatList
│   │   ├── [slug].astro           # /<slug>      → full cheat sheet + Edit Sheet buttons
│   │   └── search.astro           # /search      → SearchPage
│   │
│   ├── content/cheatsheets/       # 216 Markdown cheat sheets (<slug>.md)
│   │
│   ├── lib/
│   │   ├── cheatsheets.ts         # frontmatter loader, icon resolver, categories, Markdoc pipeline
│   │   ├── types.ts               # Sheet / SheetSection / Frontmatter types
│   │   ├── utils.ts               # cn() class helper
│   │   └── components/ui/         # shadcn-svelte primitives: badge/, button/
│   │
│   └── styles/
│       └── global.css             # Tailwind v4 @theme tokens, :root/.dark variables, base layer
│
├── astro.config.mjs               # site: https://cheatsheets.zip, static output + sitemap
├── svelte.config.js
├── tsconfig.json
├── components.json                # shadcn-svelte config
├── package.json                   # npm scripts: dev / build / preview / astro
│
├── CONTRIBUTING.md                # how to add a cheat sheet and open a PR
├── CODE_OF_CONDUCT.md
├── DESIGN.md                      # design tokens & brand guidelines
├── SKILL.md                       # design-system guidance
├── AGENTS.md                      # agent/dev workflow notes
│
└── LICENSE                        # MIT © 2026 Sumangal Karan
```

## Adding a cheat sheet

1. **Create the file** — `src/content/cheatsheets/<slug>.md` (the file name becomes the URL slug).
2. **Add an icon (optional)** — drop an SVG at `public/icons/<slug>.svg`.
   Missing icons fall back to `logo.svg`, with aliases handled in `src/lib/cheatsheets.ts`.
3. **Write the frontmatter:**

   ```yaml
   ---
   title: JavaScript
   date: 2020-12-24 17:12:25
   background: bg-[#ebd94e]
   tags:
     - js
     - web
   categories:
     - Programming
   intro: |
     A JavaScript cheat sheet with the most important concepts, functions, methods, and more.
   plugins:
     - copyCode
   ---
   ```

4. **Structure the body** — `##` starts a section, `###` starts a card; tables and code fences render as
   copyable blocks.
5. **Verify & submit** — run `npm run build`, then open a Pull Request.

Full details: **[CONTRIBUTING.md](CONTRIBUTING.md)**.

## Keyboard shortcuts

| Shortcut        | Action                                     |
| --------------- | ------------------------------------------ |
| `⌘K` / `Ctrl+K` | Open the command palette                   |
| `/`             | Open the command palette (when not typing) |
| `↑` / `↓`       | Move through results                       |
| `Enter`         | Open the highlighted result                |
| `Esc`           | Close the palette / mobile menu            |

## Documentation

- [CONTRIBUTING.md](CONTRIBUTING.md) — contribution workflow
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) — community guidelines
- [DESIGN.md](DESIGN.md) — design tokens, color palette, spacing scale
- [SKILL.md](SKILL.md) — design-system specification
- [Astro docs](https://docs.astro.build) — framework reference

## License

[MIT](LICENSE) © 2026 Sumangal Karan. Contributions welcome —
read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a PR.
