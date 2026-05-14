# Razorpay AI Playbook — Changelog

Version history for the playbook. Each entry covers what changed, why, and where to find the work.

The Master Index used to carry this changelog inline. As of v0.23 it lives here so the Master Index can be a navigation tool rather than a release log. See [INDEX.md](./INDEX.md) for the canonical table of contents.

---

## v0.23 — Readability & first-read experience (2026-05-13)

A targeted UX pass after a brutal fresh-eyes review surfaced three load-bearing problems: the front door was the wrong shape (Master Index opened with changelog noise), the action pages didn't contain their actions (W.5 and Quest W-0 told readers to "use the program-pinned setup path" without ever showing it), and the directory pages didn't contain the directory (Appendix F and Meet The People described purposes without naming channels or people).

**What changed.**

- **W.5 — Installing the stack** rewritten with the canonical two-step install (MyAccess + the `curl -fsSL https://get-claude.dev.razorpay.in/setup.sh | bash` script), the `~/.claude/settings.json` shape, the five-step verification, and the seven common failure modes drawn from `#claude-onboarding-support` thread analysis.
- **Quest W-0 — Turn GREEN** rewritten as a literal five-step verification sequence with the actual commands and per-step GREEN/YELLOW/RED conditions cross-referenced to W.5 failure modes.
- **Appendix F — Slack Channels** rewritten as a live directory with twenty-plus named channels organised by purpose (setup, AI community, design, platform/devex, wider product context, exploration). Each row has handle, purpose, owner, first-response expectation, dated.
- **§0.6 — Meet the people** rewritten with named role-holders dated 2026-05-13 — Bhanu Prakash as program lead, Kaushik Bhat as engineering co-lead, Prafulla as setup-script owner, RKV as quota escalation, Saurabh Soni as design transformation lead, Aravinth P K + Vaibhav Dhir as Compass plugin co-owners, Saurabh + Varun Achar as Blade leads, plus a new "playbook author / curator" role. Roles stay durable; named holders are refreshed quarterly.
- **Appendix H.7 — Day-1 quick reference** is a new printable card that consolidates the install commands, the top channels, the people to DM, the common failure modes, and the pinned URLs onto a single page. Back-linked from W.5, Quest W-0, and Appendix F.
- **Homepage** rewritten with one primary CTA ("Start the journey" → Prologue welcome) and one secondary text link ("Just want the TOC" → Master Index). Added a "Day 1 — three steps in this order" callout above the belt ladder pointing at self-assessment, Tech 101 chapter 1, and W.5.
- **404 page** is now a custom Starlight splash with three suggested entry-points (Tech 101 ch.1, Foundation, Master Index), the search bar, and a one-line apology.
- **Master Index** itself rewritten from a version-changelog-as-front-door into an intent-based jump table. The version history moved here.
- **`{#slug}` rendering bug** on the homepage fixed by removing the explicit heading-id syntax (Starlight's auto-slugger handles it).
- **Site-wide placeholder substitution sweep** — 18 references to "the program's flagship channel" / "the design-system channel" / "the infrastructure channel" / "the celebrations channel" replaced with real handles across Prologue, Foundation, Yellow Belt, Green Belt, Black Belt, and the setup-verify skill.

The Tier 1 plan that defined this pass is [V0.23-READABILITY-PASS-PLAN.md](./V0.23-READABILITY-PASS-PLAN.md).

## v0.22 — UX-tightening pass (2026-05-12)

A targeted UX pass after a real browse-through. Belt-ladder hero arrows now point UP (matching the progression direction). The pre-ship-check six-layer gate had a rotated callout that overlapped the GREEN-column status labels — removed; the subtitle and the footer key carry the meaning. The RFC state machine's "approver decides ACCEPT/REJECT" labels were drifting on top of their own paths — repositioned for clear separation. The homepage was collapsing on itself: Foundation and Council each appeared in two sections ("Find your starting point" plus "Above/Before the belts"). The two duplicate sections are gone; the curriculum is now one unified six-stop ladder (Foundation → White → Yellow → Green → Black → Council), each entry a single line so the sidebar does not get echoed beside it.

## v0.21b — Hand-drawn companion illustrations (2026-05-09)

Seven hand-drawn-style companion illustrations land in `excalidraw/` — the Tier-2 visual layer to the Tier-1 signature SVGs from v0.21. The illustrations cover the Origin Story (Prologue §0.2), the Boss Fight B-B month timeline, office hours (B.12), the embedded sprint week (B.13), inbox triage before/after (Ops 101 §0B.3), the White Belt first-day map (Quest W-0), and a 2×2 grid of RFC anti-patterns (B.14). The two-tier visual language (polished SVG for identity and reference; hand-drawn for narrative and walkthrough) is documented in `excalidraw/README.md`. The initial cut was generated by `scripts/generate-handdrawn-svg.py` (rough.js-inspired perturbations); each file can be replaced with a hand-drawn Excalidraw sketch later without changing any chapter reference.

## v0.21 — Signature diagrams (2026-05-08)

Nine theme-aware SVG diagrams ship with a shared design language (system font stack, `currentColor` primary geometry, five identity colours for belts, GREEN / YELLOW / RED status colours). The belt ladder is the new homepage hero. The 5-layer mental model and the 9-layer Enablement Stack were refreshed against the new language. New diagrams cover the three pillars (G.1), certification flow (Appendix L), design-to-code pipeline (G.15), memory layers (B.8), the RFC state machine (C.3), and the pre-ship-check six-layer gate (G.26). Each diagram lives in `diagrams/`; the design language is documented in `diagrams/README.md`. ASCII originals stay below the SVGs as fallbacks for Markdown viewers that don't render SVG.

## v0.20 — Polish pass (2026-05-06)

A targeted polish pass across pre-v0.16 chapters applied the v0.16 Council voice as the consistency anchor. Em-dash density dropped substantially in Foundation (26.8 → 16.4 per file), Prologue (24.8 → 19.4), Green Belt (19.6 → 15.6), Black Belt (25.4 → 19.8), and Appendices (20.6 → 13.1). Placeholder phrases of the "the program's primary X" shape were rewritten to cleaner role-language. Two polish scripts (`scripts/polish-detector.py` and `scripts/polish-substitute.py`) are committed so maintainers can re-run the sweep when new content lands. The chapters' substance is unchanged; the form is more consistent.

---

For pre-v0.20 history, see the version-prefixed plan files at the repository root (`V0.4-CLEANUP-PLAN.md` through `V0.19-HUB-IA-PLAN.md`). Each one captures the scope, the rationale, and the deliverables of its version.

---

*Cadence: changelog entry per release. Maintained by the playbook author — see [§0.6 Meet the people](./prologue/06-people-and-pocs.md).*
