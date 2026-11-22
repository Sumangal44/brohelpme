# BroHelp.Me Design System & Specifications

## Mission

Create implementation-ready, token-driven UI guidance for BroHelp.Me that is optimized for consistency, accessibility, and fast delivery across a high-performance developer documentation and cheat sheet platform.

## Brand

- Product/brand: BroHelp.Me
- URL: [https://brohelpme.netlify.app/](https://brohelpme.netlify.app/)
- Source: [https://github.com/Sumangal44/brohelpme](https://github.com/Sumangal44/brohelpme)
- Audience: developers, engineers, system administrators, and technical teams
- Product surface: fast, static documentation and quick-reference cheat sheets site

## Brand Mascot & Logo System

- **Mascot**: Minimalist sleeping/lazy panda illustration resting on its belly, facing right with head on front paw.
- **Concept**: Effortless, approachable technical reference ("so simple and direct even a lazy panda gets it done").
- **Logo Assets**:
  - `public/logo.png`: Primary high-resolution transparent logo (1600×1024) in native 1.6:1 aspect ratio.
  - `public/logo.svg`: Primary scalable vector logo (`viewBox="0 0 633 405"`).
  - `public/favicon.ico`: Multi-resolution embedded ICO (`16×16`, `32×32`, `48×48`) for desktop/legacy browsers.
  - `public/favicon.svg`: Square vector favicon (`viewBox="-1.5 -116 640 640"`) for modern browsers.
  - `public/logo/logo.png`: Master square transparent icon (2048×2048).
  - `public/logo/logo.svg`: Master square vector asset (640×640).
  - `public/logo/icon-[size].png`: Complete responsive icon set (`16×16`, `32×32`, `48×48`, `72×72`, `96×96`, `128×128`, `144×144`, `152×152`, `192×192`, `384×384`, `512×512`).
- **Brand Rules for Mascot**:
  - **Only Panda**: Logo assets must contain only the panda illustration; do not embed text underneath the mascot.
  - **Opaque Fur on Transparent Canvas**: Exterior background must be 100% transparent. Inside fur must remain solid opaque `#ffffff` so the panda remains fully defined and visible on dark mode (`#070a12`), light mode, and emerald surfaces.
  - **Mascot Dark Accent**: `#1a1a1a` / `#242021` (warm charcoal black) for outlines, ears, eye patches, and limbs.
- **Brand Containers**:
  - **Navbar Badge**: `size-9` (36×36px) rounded-xl container with `p-1`, `border-emerald-500/20 bg-emerald-500/10 shadow-xs`.
  - **Footer Badge**: `w-6 h-6` (24×24px) rounded-lg container with `p-0.5`, `border-emerald-500/20 bg-emerald-500/10`.
  - **Inline Badges**: `w-3.5 h-3.5` object-contain inside hero and search header pills.

## Style Foundations

- Visual style: clean, functional, developer-focused, implementation-oriented
- Main font style: `font.family.primary=ui-sans-serif`, `font.family.stack=ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji`, `font.size.base=14px`, `font.weight.base=400`, `font.lineHeight.base=20px`
- Typography scale: `font.size.xs=12px`, `font.size.sm=14px`, `font.size.md=16px`, `font.size.lg=18px`, `font.size.xl=20px`, `font.size.2xl=24px`, `font.size.3xl=36px`, `font.size.4xl=60px`
- Color palette:
  - Brand Primary: `color.brand.primary=#10b981` (emerald-500)
  - Brand Hover: `color.brand.hover=#059669` (emerald-600)
  - Brand Dark Accent: `color.brand.accent=#34d399` (emerald-400)
  - Mascot Dark: `color.mascot.dark=#1a1a1a`
  - Mascot Fur: `color.mascot.white=#ffffff`
  - Text Primary: `color.text.primary=#cbd5e1` (dark) / `#0f172a` (light)
  - Text Secondary: `color.text.secondary=#ffffff`
  - Text Muted: `color.text.muted=#94a3b8`
  - Surface Base: `color.surface.base=#000000` / `#070a12` (dark) / `#f8fafc` (light)
  - Surface Raised: `color.surface.raised=#0f172a`
  - Border Default: `color.border.default=#e5e7eb` (light) / `rgba(255,255,255,0.1)` (dark)
- Spacing scale: `space.1=8px`, `space.2=12px`, `space.3=16px`, `space.4=24px`, `space.5=32px`, `space.6=48px`
- Radius/shadow/motion tokens: `radius.xs=8px`, `radius.sm=12px`, `radius.md=16px`, `radius.pill=9999px` | `motion.duration.instant=200ms`

## Accessibility

- Target: WCAG 2.2 AA
- Keyboard-first interactions required (including `⌘K` / `Ctrl+K` command palette and `/` search hotkey).
- Focus-visible rules required on all interactive elements.
- Minimum 4.5:1 contrast constraint required for all text.
- Image assets must include descriptive `alt` text (`alt="BroHelpMe Logo"`).

## Writing Tone

Concise, confident, developer-focused, implementation-first.

## Rules: Do

- Use semantic tokens, not raw hex values, in component guidance.
- Always use the official panda logo (`/logo.png` or `/logo.svg`) with appropriate container padding.
- Maintain high contrast and visibility across both dark and light modes.
- Every component must define states for default, hover, focus-visible, active, disabled, loading, and error.
- Component behavior should specify responsive and edge-case handling.
- Interactive components must document keyboard, pointer, and touch behavior.
- Accessibility acceptance criteria must be testable in implementation.

## Rules: Don't

- Do not introduce raw text inside logo graphic assets (mascot stands alone).
- Do not make the panda's white fur transparent; doing so breaks appearance in dark mode.
- Do not allow low-contrast text or hidden focus indicators.
- Do not introduce one-off spacing or typography exceptions.
- Do not use ambiguous labels or non-descriptive actions.
- Do not ship component guidance without explicit state rules.

## Guideline Authoring Workflow

1. Restate design intent in one sentence.
2. Define foundations, semantic tokens, and logo/brand guidelines.
3. Define component anatomy, variants, interactions, and state behavior.
4. Add accessibility acceptance criteria with pass/fail checks.
5. Add anti-patterns, migration notes, and edge-case handling.
6. End with a QA checklist.

## Required Output Structure

- Context and goals.
- Design tokens, brand identity, and logo specifications.
- Component-level rules (anatomy, variants, states, responsive behavior).
- Accessibility requirements and testable acceptance criteria.
- Content and tone standards with examples.
- Anti-patterns and prohibited implementations.
- QA checklist.

## Component Rule Expectations

- Include keyboard, pointer, and touch behavior.
- Include spacing and typography token requirements.
- Include long-content, overflow, and empty-state handling.
- Include known page component density: links (255), cards (220), buttons (15), inputs (1), navigation (1), lists (1).

## Quality Gates

- Every non-negotiable rule must use "must".
- Every recommendation should use "should".
- Every accessibility rule must be testable in implementation.
- Teams should prefer system consistency over local visual exceptions.
