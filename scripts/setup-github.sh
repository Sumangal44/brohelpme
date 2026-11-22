#!/usr/bin/env bash
# ==============================================================================
# BroHelpMe - GitHub Setup Script
# Creates recommended labels, milestones, and branch workflow for Sumangal44/brohelpme
# ==============================================================================

set -euo pipefail

REPO="Sumangal44/brohelpme"

echo "=========================================="
echo "  Setting up GitHub repository: $REPO"
echo "=========================================="

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
  echo "Error: GitHub CLI (gh) is not installed."
  echo "Install it via: brew install gh"
  exit 1
fi

# Check authentication
if ! gh auth status &> /dev/null; then
  echo "Error: GitHub CLI is not authenticated."
  echo "Run 'gh auth login' to authenticate with your GitHub account."
  exit 1
fi

echo "✓ GitHub CLI authenticated."

# ------------------------------------------------------------------------------
# 1. LABELS CONFIGURATION
# ------------------------------------------------------------------------------
echo ""
echo "--> Creating & syncing GitHub labels..."

create_label() {
  local name="$1"
  local color="$2"
  local description="$3"
  
  echo "  - Creating label: $name"
  gh label create "$name" \
    --repo "$REPO" \
    --color "$color" \
    --description "$description" \
    --force > /dev/null 2>&1 || true
}

# Type labels
create_label "type: cheatsheet"   "10b981" "New cheat sheet or additions to existing cheat sheet"
create_label "type: feature"      "38bdf8" "New website feature or capability"
create_label "type: bug"          "ef4444" "Something isn't working or broken"
create_label "type: enhancement"  "8b5cf6" "Improvement or polish to existing feature"
create_label "type: documentation""3b82f6" "Documentation, guides, or readme updates"
create_label "type: maintenance"  "f59e0b" "Chores, build tooling, dependencies, configs"
create_label "type: performance"  "ec4899" "Speed, memory, bundle size or SEO optimizations"

# Area labels
create_label "area: content"      "059669" "Markdown files under src/content/cheatsheets"
create_label "area: parser"       "6366f1" "Markdoc, Shiki, or card generation logic in src/lib"
create_label "area: ui"           "f43f5e" "Svelte components, CSS, navbar, card layouts, animations"
create_label "area: search"       "0284c7" "Command palette and quick search indexing"

# Priority labels
create_label "priority: critical" "b91c1c" "Blocks release, website down, or severe data loss"
create_label "priority: high"     "ea580c" "High priority, needed for current milestone"
create_label "priority: medium"   "d97706" "Standard priority feature or bugfix"
create_label "priority: low"      "64748b" "Nice-to-have or low impact issue"

# Status labels
create_label "status: in progress""2563eb" "Work is actively in progress"
create_label "status: needs review""eab308" "Awaiting review from maintainers"
create_label "status: blocked"    "6b7280" "Blocked by another issue or dependency"

# Community labels
create_label "good first issue"   "7c3aed" "Great starting issue for first-time open source contributors"
create_label "help wanted"        "0d9488" "Extra assistance is welcomed from the community"
create_label "hacktoberfest"      "ff7518" "Eligible for Hacktoberfest contributions"

echo "✓ All labels created successfully."

# ------------------------------------------------------------------------------
# 2. MILESTONES CONFIGURATION
# ------------------------------------------------------------------------------
echo ""
echo "--> Creating GitHub Milestones..."

create_milestone() {
  local title="$1"
  local description="$2"
  local due_date="${3:-}"

  echo "  - Creating milestone: $title"
  if [ -n "$due_date" ]; then
    gh api "repos/$REPO/milestones" \
      -f title="$title" \
      -f description="$description" \
      -f due_on="$due_date" > /dev/null 2>&1 || true
  else
    gh api "repos/$REPO/milestones" \
      -f title="$title" \
      -f description="$description" > /dev/null 2>&1 || true
  fi
}

create_milestone "v1.0.0 - Foundation & Stability" \
  "Initial launch with 216+ cheat sheets, verified card rendering, zero build/lint errors, and Command Palette search." \
  "2026-12-01T00:00:00Z"

create_milestone "v1.1.0 - Search & UX Polish" \
  "Enhanced search with fuzzy matching, tags filter, quick-jump cheatsheet table of contents, and print/export layout." \
  "2027-01-15T00:00:00Z"

create_milestone "v1.2.0 - Offline PWA & Bookmarks" \
  "Service worker PWA support for offline browsing, favorites/bookmarks stored locally, and bundle size reduction." \
  "2027-03-01T00:00:00Z"

create_milestone "v2.0.0 - Community Contribution Platform" \
  "Interactive cheatsheet live preview editor in browser, one-click contribution flow, and author profiles." \
  "2027-06-01T00:00:00Z"

echo "✓ Milestones created successfully."

# ------------------------------------------------------------------------------
# 3. BRANCH WORKFLOW
# ------------------------------------------------------------------------------
echo ""
echo "--> Branch Workflow Guidance:"
echo "  1. Main Branch:    'main' (Production, auto-deployed to Netlify)"
echo "  2. Staging Branch: 'develop' (Integration branch for upcoming releases)"
echo "  3. Feature branch: 'feat/<name>'"
echo "  4. Fix branch:     'fix/<issue-name>'"
echo "  5. Content branch: 'content/<cheatsheet-slug>'"
echo ""
echo "To create and push the develop branch now, run:"
echo "  git checkout -b develop"
echo "  git push -u origin develop"
echo ""
echo "=========================================="
echo "  GitHub setup complete!"
echo "=========================================="
