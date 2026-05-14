---
title: "Template: CLAUDE.md (service-level)"
slug: "appendices/templates/claude-md-service"
section: "appendices"
status: "drafted"
type: "template"
track: "templates"
order: 1
time_minutes: 5
audience: "engineer"
outcome: "Add a working CLAUDE.md to a single service or repository so Claude Code has the context it needs to be useful."
prev: "appendices/templates"
next: "appendices/templates/claude-md-monorepo"
pillar: "context"
belt: null
tags: ["template", "claude-md", "service"]
updated: "2026-05-08"
---

# Template: CLAUDE.md (service-level)

## What this template is for

The default CLAUDE.md template for a single service or repository. Use it when you are adding a CLAUDE.md to a repo for the first time and the repo is not a monorepo. For a monorepo root, use [CLAUDE-md-monorepo](CLAUDE-md-monorepo.md) instead.

A good service-level CLAUDE.md gives Claude Code three things: orientation (what is this repo, what does it do), conventions (how does this team write code), and gotchas (what would Claude get wrong without explicit guidance). Target length: 100 to 200 lines. A CLAUDE.md that exceeds 300 lines is usually carrying content that should be elsewhere; a CLAUDE.md under 50 lines is usually missing something.

The discipline behind the template is covered in [G.3 — CLAUDE.md for a real service](../../belts/03-green/a-craft/G03-claude-md-real-service.md).

## How to use it

1. Copy the template body below into a `CLAUDE.md` file at the root of your repository.
2. Replace each `<!-- replace this with ... -->` placeholder with your content.
3. Delete any `<!-- DELETE -->` instructional comments before committing.
4. Commit and push. Claude Code reads CLAUDE.md automatically when invoked from the repo.

The worked example below shows what a populated template looks like for a typical backend service.

---

## Template body

```markdown
# CLAUDE.md

<!-- DELETE: This file gives Claude Code project-specific context.
     Keep it under 200 lines. Update it when conventions change. -->

## What this repo is

<!-- replace this with two or three sentences describing what the service
     does, who calls it, and what the team owns. Example: "This is the
     billing-api service. It produces invoices for customer subscriptions
     and is called by the subscription-management service. The billing
     team owns it." -->

## How the code is organised

<!-- replace this with the top-level directory layout and what lives
     where. Three to five lines is usually enough. Example:
     - src/handlers/ — HTTP route handlers
     - src/domain/ — invoice generation logic
     - src/storage/ — database access
     - tests/ — unit and integration tests -->

## Conventions

<!-- replace this with the team's specific conventions. Three to seven
     bullets. Things that would not be obvious from reading the code.
     Examples:
     - All money values are stored as integer paise (1 INR = 100 paise).
     - Database migrations live in db/migrations/ and are forward-only.
     - Errors returned to callers use the structured shape from
       src/errors/api-error.ts. -->

## Common workflows

<!-- replace this with the workflows Claude is most likely to be asked
     to do. Two to four. Each with a one-line summary of the right
     approach. Examples:
     - Adding a new API endpoint: route handler in src/handlers/, domain
       logic in src/domain/, integration test in tests/integration/.
     - Bumping a dependency: update package.json, run pnpm install, run
       the full test suite, check the changelog for breaking changes. -->

## Do not touch

<!-- replace this with files or directories that should never be edited
     by Claude. Each line is a path with a one-line reason. Examples:
     - db/migrations/ — past migrations are immutable; new migrations
       must be reviewed by the database admin role first.
     - .github/workflows/ — CI configuration; changes need infra approval. -->

## Gotchas

<!-- replace this with the things that would be wrong without the
     guidance. The non-obvious things. Three to five entries. Examples:
     - The /healthz endpoint is used by the load balancer; never
       authenticate it.
     - Tests use a real Postgres in CI; do not mock the database in
       integration tests. -->

## When you are stuck

<!-- replace this with where to look when something is unclear. Two or
     three pointers. Examples:
     - Past PRs in the repo for similar changes (use git log --oneline).
     - The team channel for clarification (named in the repo's README,
       not here). -->
```

---

## Worked example

A populated CLAUDE.md for a typical backend service. Names redacted; numbers illustrative.

```markdown
# CLAUDE.md

## What this repo is

This is the orders-api service. It accepts incoming customer orders, validates them against current pricing, and writes them to the orders database. It is called by the storefront-web frontend and the partner-integration service. The orders team owns it.

## How the code is organised

- src/handlers/ — HTTP route handlers, one file per resource
- src/domain/ — order validation, pricing lookup, idempotency
- src/storage/ — Postgres access through a thin repository layer
- src/errors/ — the structured error shape returned to callers
- tests/unit/ — unit tests, mocked storage
- tests/integration/ — integration tests against a real Postgres

## Conventions

- All money values are stored as integer paise (1 INR = 100 paise). Never use floats for money.
- Database migrations live in db/migrations/ and are forward-only. Rolling back is done with a new forward migration.
- Errors returned to callers use the structured shape from src/errors/api-error.ts. Never return raw error strings.
- Pricing lookup goes through src/domain/pricing-client.ts; never query the pricing service directly from a handler.
- New idempotency keys must use the helper in src/domain/idempotency.ts.

## Common workflows

- Adding a new endpoint: route handler in src/handlers/, domain logic in src/domain/, integration test in tests/integration/. The handler is thin; domain logic is testable.
- Adding a database column: write a migration in db/migrations/, update the storage layer, add tests for the new column path.
- Bumping a dependency: update package.json, run pnpm install, run the full test suite (pnpm test), check the dependency's changelog for breaking changes.

## Do not touch

- db/migrations/ for any past migration; past migrations are immutable.
- src/security/ unless the security review process has been started.
- .github/workflows/ unless CI infra approval is in hand.

## Gotchas

- The /healthz endpoint is used by the load balancer; never authenticate it.
- Tests use a real Postgres in CI; do not mock the database in integration tests.
- Pricing service calls are cached for 60 seconds; if you are debugging a pricing-related test, the cache may be the cause.
- The webhook signing secret is in env, not in the repo. Local dev uses a fixture secret defined in tests/fixtures/.

## When you are stuck

- Past PRs in this repo for similar changes (git log --oneline | head -50).
- The orders team channel for clarification, named in the repo's README.
- The pricing-service docs in the org wiki for pricing-flow questions.
```

This populated example is around 60 lines including spacing. A typical real CLAUDE.md is in the 80-to-150 range. The discipline is to be specific, not exhaustive.

---

## What this template is not

**Not a substitute for the chapter.** [G.3](../../belts/03-green/a-craft/G03-claude-md-real-service.md) covers the discipline behind a good CLAUDE.md: what to include, what to leave out, how to keep it under 200 lines without sacrificing usefulness. The template is the artefact; the chapter is the rationale.

**Not a one-time write.** A CLAUDE.md is a living document. When conventions change, the CLAUDE.md changes with them. Stale CLAUDE.md content is worse than a missing one because it actively misleads.

**Not a substitute for code comments.** Comments explain specific code; CLAUDE.md explains the team's working context. They cover different things. A repo benefits from both.

---

**Previous:** [← Appendix I README](README.md) · **Next:** [→ CLAUDE.md monorepo template](CLAUDE-md-monorepo.md)
