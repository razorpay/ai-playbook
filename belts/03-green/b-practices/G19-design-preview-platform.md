---
title: "Branch-preview platform — branch → live URL"
slug: "belts/green/design-preview-platform"
section: "belts"
status: "drafted"
type: "chapter"
track: "green"
order: 19
time_minutes: 30
audience: "experienced-builder"
outcome: "Use branch-preview URLs to share work in progress with design and product reviewers without anyone having to check out your branch — and understand what the pattern needs to be reliable."
prev: "belts/green/daily-loop"
next: "belts/green/observability-with-ai"
pillar: "harness"
belt: "green"
tags: ["green-belt", "branch-preview", "preview-url", "design-review"]
updated: "2026-04-29"
---

# G.19 — Branch-preview platform

A branch-preview platform is infrastructure that turns every git branch into a live URL. Push your branch; a preview URL shows up in the PR within a minute or two; design and product partners click and see the change in their own browsers. No "can you screen-share?" — the URL is the screen share.

This chapter is the *pattern*, not a product walkthrough. The Razorpay-internal implementation lives in private docs; the pattern is generic and your team's CI may use Vercel, Netlify, Cloudflare Pages, or an internal static host. Once the pattern is clear, the implementation choice is mechanical.

---

## If you're short on time

- Push branch → CI builds → preview URL posted to the PR. The whole cycle should be under five minutes.
- The preview URL belongs in your PR description. Reviewers click; you stop scheduling screen-shares.
- The boss fight in Part C requires a preview URL on the product-repo PR. This is why it matters.

---

## The mental model

```
   ┌──────────────────────────────────────────────────┐
   │              BRANCH-PREVIEW FLOW                   │
   ├──────────────────────────────────────────────────┤
   │                                                    │
   │  1. push branch ──────────────────┐               │
   │                                     ▼               │
   │  2. CI builds the branch                           │
   │                                     │               │
   │                                     ▼               │
   │  3. Build artefact deploys to preview environment  │
   │                                     │               │
   │                                     ▼               │
   │  4. Preview URL posted to the PR                   │
   │                                     │               │
   │                                     ▼               │
   │  5. Reviewers click → see the change live          │
   │                                     │               │
   │                                     ▼               │
   │  6. PR merges → preview tears down (eventually)    │
   │                                                    │
   └──────────────────────────────────────────────────┘
```

The pattern hinges on three properties: the URL is *unique per branch*, *isolated per branch* (one branch's preview cannot pollute another), and *short-lived* (the preview tears down with the branch).

---

## Why this beats alternatives

Three alternatives the pattern replaces.

**Screen-shares.** "Can we hop on a call so I can show you the change?" The cost is a meeting on someone's calendar; the value is a 30-second look. Net cost: high.

**Screenshots.** "Here's what it looks like." Screenshots are stale by the next commit; they do not show interactivity; they cannot be tested across viewports.

**Pulling the branch.** "Can you check out my branch and run it?" Asking design and product partners to clone the repo and run `pnpm install` is an org-wide tax that nobody should pay.

A preview URL is none of these. It is a click. The reviewer sees the change in their browser, at any viewport, with full interactivity, without context-switching out of their day.

---

## What the pattern needs to be reliable

Five properties the pattern needs to actually work.

### Property 1 — Built from the same artefacts as production

The preview environment is not a separate code path. It is the same build, with the same configuration shape, deployed to a preview-sized environment. Different envs, same code.

Without this, "works on preview, breaks in prod" becomes a recurring incident pattern.

### Property 2 — Authenticated for internal-only viewing

Razorpay-internal previews are not public. The preview environment sits behind the same SSO that gates internal tools. Anyone with org SSO can click; nobody outside can.

Without this, your in-progress UI leaks to anyone with the URL.

### Property 3 — Real data shape, anonymised

The preview environment uses anonymised production-shape data, not synthetic toy data. Reviewers click and see a believable surface (real-looking transactions, real-looking dates, real-looking edge cases) with no actual customer data exposed.

Without this, reviewers spend half their review time pattern-matching against the wrong test data instead of judging the change.

### Property 4 — Per-PR URL, not "a staging environment"

Every branch gets its own URL. Two PRs in flight do not collide. A reviewer can switch between two preview URLs without redeploying anything.

Without this, "is the preview showing my change or yours?" becomes a recurring confusion.

### Property 5 — Posted to the PR automatically

The CI bot posts the preview URL as a PR comment as soon as the build completes. The reviewer does not have to look up the URL or remember the convention.

Without this, the preview exists but nobody clicks it.

---

## How a Green Belt builder uses it

The use is mechanical once the platform is in place:

1. Push your branch.
2. Wait for the CI bot to post the preview URL (usually 2–5 minutes).
3. Click it yourself first. Verify the change looks right.
4. Switch to mobile viewport. Verify it looks right there too. (G.18's reflex.)
5. Add the preview URL to the PR description with one line: "Preview: <URL>. Tested at desktop and 320px."
6. Tag your reviewers. They click; they comment; you iterate.

For design partners specifically: the preview URL is the *only* artefact they need. They do not need the diff; they do not need the codebase; they need the rendered surface in their own browser. The URL is the surface.

---

## When the preview is wrong but production would be right

Sometimes the preview shows a bug that is not in your change. The dev environment has stale data; the preview environment has a config drift; the build pipeline has a flake. Three habits.

**Habit 1.** Read the CI logs before assuming the change is wrong. If the build had a warning the dev server did not, that is a clue.

**Habit 2.** Compare to the main-branch preview. Many preview platforms keep a `main` URL alongside the per-branch URLs. If the bug is on `main` too, your branch is innocent.

**Habit 3.** Trust the preview only after a fresh build. If the preview was built ten hours ago against an older shape of the dependency graph, push an empty commit (`git commit --allow-empty -m "rebuild"`) to trigger a fresh deploy.

---

## What the agent does

A well-set-up agent:

- Reads CI logs when asked, surfaces the relevant lines.
- Drafts the PR description with the preview URL placeholder for you to fill in.
- Suggests adding "tested at desktop and 320px" to the PR description if the change touched UI.
- Flags when the build was older than the latest commit (stale preview risk).

What the agent does *not* do:

- Click the preview URL itself (the agent is not a browser; the design-system connector reads structure, not screenshots).
- Tell you whether the change "looks right" — visual judgement is yours.
- Auto-tag reviewers (who reviews is a human call).

---

## Cost considerations

A branch-preview platform costs real infrastructure budget — every PR provisions an environment, however briefly. Three habits to keep the cost sane.

**Habit 1 — Tear down on merge.** Preview environments outlive the PR by hours, not weeks. Auto-teardown on merge is the right default.

**Habit 2 — Time-box stale branches.** A branch that has not been pushed in a week probably does not need its preview running. Auto-teardown after N days of inactivity is reasonable.

**Habit 3 — Right-size the environment.** Preview environments do not need production capacity. Smaller compute, smaller DB, smaller cache — same code, smaller footprint.

These are platform-team decisions, not per-builder decisions. But a Green Belt builder who understands them is a useful voice when the platform team scopes its work.

---

## Common failure modes

**Forgetting to add the preview URL to the PR description.** Reviewers do not know to click. Fix: a PR template that prompts for it, or a hook (G.10) that adds it automatically.

**Reviewing your own change only at desktop.** The mobile-viewport regression ships. Fix: G.18's reflex, applied to the preview URL as well as the local dev server.

**Treating preview as production.** Latency is not the same; data is not the same; some edge cases differ. Fix: the preview catches *most* regressions; tests catch the rest; production observability catches the long tail.

**Sharing preview URLs externally.** They are internal-only by design. Fix: the SSO gate handles it; do not paste preview URLs into public forums.

**Forgetting to refresh after a rebuild.** A reviewer clicks an old build. Confusion. Fix: the CI bot's comment includes the build SHA; reviewers can verify they are on the latest.

---

## GREEN / YELLOW / RED self-check

- 🟢 GREEN: Every PR I open has a preview URL in the description, tested at desktop and 320px, and reviewers click rather than asking for screen-shares.
- 🟡 YELLOW — I use preview URLs but sometimes forget to add them to the PR description.
- 🔴 RED — I default to screen-shares or screenshots; preview URLs feel like extra work.

---

## What you can say after this module

> "I push branches and let the preview URL do the review-shape conversation — design and product partners click rather than schedule meetings."

---

## Where to go next

G.20 (*Observability with AI*) turns to the production side. Once your branch is merged, observability is what catches the regressions the preview did not.

**Previous:** [← G.18 The daily loop](G18-daily-loop.md) · **Next:** [→ G.20 Observability with AI](G20-observability-with-ai.md)

**Further reading**

- [G.18 — The daily loop](G18-daily-loop.md) — the cycle this chapter scales beyond your laptop
- [G.12 — E2E testing with Playwright](G12-playwright-and-claude-code.md) — the structural complement to manual preview review
