# Contributing to CheatSheets.zip

Thank you for your interest in contributing to **CheatSheets.zip**! This repository is a modern, high-fidelity developer quick reference platform featuring over 210+ technology cheat sheets with sub-second page loads, instant `⌘K` command palette search, and multi-language syntax highlighting.

---

## 🚀 Quick Start

### 1. Clone & Setup
```shell
git clone <repository-url>
cd needhelp
npm install
```

### 2. Run the Development Server
As per workspace guidelines, start the server in background mode:
```shell
npm run dev
# or: astro dev --background
```
View the live app at: `http://localhost:4321`

### 3. Manage the Background Server
```shell
astro dev status   # Check server health
astro dev logs     # View live logs
astro dev stop     # Stop server
```

---

## 📝 How to Add a New Cheat Sheet

Adding a cheat sheet requires adding a single Markdown file into `src/content/cheatsheets/<slug>.md`.

### 1. Create File
Create `src/content/cheatsheets/<slug>.md` (e.g. `bun.md` or `zig.md`).

### 2. Frontmatter Specification
```yaml
---
title: Bun
date: 2024-01-15 10:00:00
background: bg-[#fbf0df]
tags:
  - runtime
  - javascript
  - bundler
categories:
  - Programming
intro: Fast all-in-one JavaScript runtime, bundler, test runner, and package manager.
---
```

### 3. Content Structure
A cheat sheet is divided into **Sections (`##`)** and discrete **Cards (`###`)**:

````markdown
## Getting Started

### Installation
```shell
$ curl -fsSL https://bun.sh/install | bash
```

### Package Management
```shell
$ bun install
$ bun add <package>
$ bun remove <package>
```

## Command Reference

### CLI Flags {.col-span-2}
| Flag | Description |
| --- | --- |
| `--watch` | Automatically restart on file change |
| `--hot` | Enable hot module replacement |
| `--smol` | Optimize for low-memory environments |
````

#### Special Card Attributes
- `{.col-span-2}`: Expands the card to span 2 columns on desktop (ideal for wide reference tables).
- `{.row-span-2}`: Expands the card vertically.

---

## 🎨 Design & Theming Guidelines

1. **Light & Dark Theme Parity**:
   - All components use semantic CSS tokens (`var(--background)`, `var(--foreground)`, `var(--card)`, `var(--border)`, `var(--muted)`).
   - Never hardcode dark colors or light colors directly into card bodies.
2. **Syntax Highlighting**:
   - Powered by **Shiki** with dual themes (`github-light` and `github-dark`).
   - Use standard language identifiers (e.g., ```` ```bash ````, ```` ```python ````, ```` ```typescript ````, ```` ```sql ````).
3. **Icons & Badges**:
   - Technology SVG icons are located in `public/icons/<slug>.svg`.
   - If adding a new technology, place a clean vector SVG in `public/icons/<slug>.svg`.

---

## 🧪 Build & Verification

Before submitting your pull request, verify that the static pre-rendering passes with zero errors:

```shell
npm run build
```

This compiles all 217+ static HTML pages into `dist/` with full Shiki tokenization and sitemaps.

---

## 📋 Git Workflow

1. Create a feature branch:
   ```shell
   git checkout -b feat/add-<slug>-cheatsheet
   ```
2. Commit your changes with conventional commit messages:
   ```shell
   git commit -m "feat(cheatsheet): add <slug> cheat sheet"
   ```
3. Open a Pull Request!
