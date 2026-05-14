---
title: "Template: CLAUDE.md (monorepo root)"
slug: "appendices/templates/claude-md-monorepo"
section: "appendices"
status: "drafted"
type: "template"
track: "templates"
order: 2
time_minutes: 5
audience: "engineer"
outcome: "Add a working root-level CLAUDE.md to a monorepo so Claude Code can navigate to the right package and read the right hierarchical CLAUDE.md."
prev: "appendices/templates/claude-md-service"
next: "appendices/templates/claude-local-md"
pillar: "context"
belt: null
tags: ["template", "claude-md", "monorepo"]
updated: "2026-05-08"
---

# Template: CLAUDE.md (monorepo root)

## What this template is for

The root-level CLAUDE.md template for a monorepo. Use it when your repository contains multiple packages or services, each with their own conventions, and you want Claude Code to navigate to the right package and read the right hierarchical CLAUDE.md.

The root CLAUDE.md is intentionally short. It does not duplicate package-level content; it points Claude at the right package CLAUDE.md and names the cross-package conventions that apply everywhere. Each package has its own CLAUDE.md (use the [service-level template](CLAUDE-md-service.md) for those).

The discipline is covered in [G.4 — Hierarchical CLAUDE.md in a monorepo](../../belts/03-green/a-craft/G04-hierarchical-claude-md.md).

## How to use it

1. Copy the template body below into a `CLAUDE.md` file at the root of your monorepo.
2. Replace each `<!-- replace this with ... -->` placeholder.
3. Add a CLAUDE.md to each major package using the [service-level template](CLAUDE-md-service.md).
4. Delete `<!-- DELETE -->` instructional comments before committing.

Target length for the root CLAUDE.md: 60 to 120 lines. The package-level CLAUDE.mds are where the depth lives.

---

## Template body

```markdown
# CLAUDE.md (monorepo root)

<!-- DELETE: This is the root CLAUDE.md for a monorepo. It is intentionally
     short. Each major package has its own CLAUDE.md. Update this when the
     package layout changes or when a cross-package convention shifts. -->

## What this monorepo is

<!-- replace this with two or three sentences describing what the monorepo
     contains and who owns it. Example: "This is the platform monorepo. It
     contains the shared backend services (api/, billing/, identity/), the
     shared web frontends (web/, dashboard/), and the shared design system
     (design/). The platform-team owns the shared layer; product teams own
     their respective packages." -->

## Package layout

<!-- replace this with the top-level layout. One line per major package
     with a one-line description and a pointer to its CLAUDE.md. Example:
     - api/ — public REST API. See api/CLAUDE.md.
     - billing/ — subscription billing service. See billing/CLAUDE.md.
     - web/ — customer-facing web frontend. See web/CLAUDE.md.
     - dashboard/ — admin dashboard. See dashboard/CLAUDE.md.
     - design/ — shared component library. See design/CLAUDE.md. -->

## Cross-package conventions

<!-- replace this with conventions that apply across all packages.
     Things every package should follow. Three to five bullets. Examples:
     - All money values are integer paise across all backend packages.
     - All error responses use the shape defined in shared/errors/.
     - All packages use pnpm; no npm or yarn.
     - All packages run their tests in CI; PRs do not merge with red CI. -->

## How to find your way

<!-- replace this with guidance on where Claude should look first when
     given a task. Two to four pointers. Examples:
     - For a task in a specific package, read that package's CLAUDE.md
       first, then this one for cross-package context.
     - For a cross-cutting change (e.g., a shared dependency bump), read
       this CLAUDE.md and check the affected packages' CLAUDE.mds.
     - For a question about overall architecture, the design docs in
       docs/architecture/ are the canonical reference. -->

## Do not touch (root level)

<!-- replace this with files at the root level that should never be
     edited without explicit approval. Examples:
     - pnpm-workspace.yaml — workspace configuration.
     - .github/workflows/ — CI definitions.
     - turbo.json (or equivalent) — build orchestration. -->

## Gotchas (cross-package)

<!-- replace this with non-obvious cross-package behaviours. Three to
     five entries. Examples:
     - Changes to design/ may break the web/ and dashboard/ frontends.
       Always run frontend tests after touching design/.
     - The shared/errors/ package's error shapes are versioned; do not
       break existing shapes without a migration plan. -->

## When you are stuck

<!-- replace this with where to look. The package's CLAUDE.md is the
     first stop; this CLAUDE.md is the second; the docs/architecture/
     directory is the third. -->
```

---

## Worked example

A populated root CLAUDE.md for a typical platform monorepo.

```markdown
# CLAUDE.md (monorepo root)

## What this monorepo is

This is the platform monorepo for the Razorpay payments platform. It contains the shared backend services (api/, billing/, identity/), the shared web frontends (web/, dashboard/), and the shared component library (design/). The platform team owns the shared layer (api/, identity/, design/). Product teams own their package: billing-team owns billing/, web-team owns web/ and dashboard/.

## Package layout

- api/ — public REST API gateway. See api/CLAUDE.md.
- billing/ — subscription billing service. See billing/CLAUDE.md.
- identity/ — auth and identity service. See identity/CLAUDE.md.
- web/ — customer-facing web frontend. See web/CLAUDE.md.
- dashboard/ — admin dashboard frontend. See dashboard/CLAUDE.md.
- design/ — shared component library (Blade-based). See design/CLAUDE.md.
- shared/ — cross-package shared utilities. See shared/CLAUDE.md.

## Cross-package conventions

- All money values are integer paise across all backend packages. Never floats.
- All error responses use the shape in shared/errors/api-error.ts.
- All packages use pnpm; no npm, no yarn.
- All packages must have tests passing in CI before merge.
- Frontend packages use the design/ component library; do not import third-party UI components without design-team review.

## How to find your way

- For a task in a specific package, read that package's CLAUDE.md first, then this one for cross-package context.
- For a cross-cutting change (e.g., bumping a shared dependency), read this CLAUDE.md and the CLAUDE.mds of every affected package.
- For overall architecture questions, the design docs in docs/architecture/ are the canonical reference.

## Do not touch (root level)

- pnpm-workspace.yaml — workspace configuration; changes need platform-team approval.
- .github/workflows/ — CI definitions; changes need infra approval.
- turbo.json — build orchestration; changes can affect every package's CI time.

## Gotchas (cross-package)

- Changes to design/ may visually break web/ and dashboard/. Always run frontend tests after touching design/.
- The shared/errors/ shapes are versioned; breaking changes need a migration plan and a deprecation window.
- The shared/types/ package is consumed by every backend package; type changes propagate widely.
- Local dev requires running pnpm install at the root before any package will build.

## When you are stuck

- The relevant package's CLAUDE.md (always start there).
- This CLAUDE.md for cross-package context.
- docs/architecture/ for overall architecture questions.
- The platform-team channel for unresolved cross-cutting questions.
```

This populated example is around 50 lines. The root CLAUDE.md is short by design; depth lives in the package CLAUDE.mds.

---

## What this template is not

**Not a substitute for package-level CLAUDE.mds.** Each major package needs its own CLAUDE.md using the [service-level template](CLAUDE-md-service.md). The root CLAUDE.md points; the package CLAUDE.mds describe.

**Not the architecture document.** Architecture docs cover system-level design over time. CLAUDE.md covers operational context for AI-assisted work right now. They are complementary.

**Not the README.** The README is for humans landing in the repo for the first time. CLAUDE.md is for Claude Code reading the repo programmatically. The README explains *what*; CLAUDE.md explains *how to work in here*.

---

**Previous:** [← CLAUDE.md service template](CLAUDE-md-service.md) · **Next:** [→ CLAUDE.local.md template](CLAUDE-local-md.md)
