# Razorpay AI Playbook — Changelog

Version history for the playbook. Each entry covers what changed, why, and where to find the work.

The Master Index used to carry this changelog inline. As of v0.23 it lives here so the Master Index can be a navigation tool rather than a release log. See [INDEX.md](./INDEX.md) for the canonical table of contents.

---

## v0.28 — LiteLLM usage-cap guidance refresh (2026-06-20)

Recent support threads show the LiteLLM per-builder cap is now $750 and the LiteLLM gateway is the source of truth for Claude Code usage, not the separate claude.ai usage page. The playbook still described the v0.23-era ~$100 cap and implied that quota bumps were routine.

- **Usage-cap amount corrected.** W.5, Appendix D, H.7, and Prologue §0.3 now name the current $750 LiteLLM cap instead of the old $100/month figure.
- **Source-of-truth clarified.** The cap guidance now tells readers to trust LiteLLM `ExceededBudget` errors over claude.ai usage-page numbers, and to route exceptions through `#ai-help` with manager approval rather than assuming a bump is automatic.
- **Version markers bumped.** README and INDEX now report v0.28 / 2026-06-20 for this quota-guidance pass.

## v0.27 — Index and curriculum label alignment (2026-06-17)

Reader-facing TOC rows and generated course metadata still carried older labels after the underlying chapters had moved on. The load-bearing stale pieces were the retired Vertex/gcloud setup labels; regenerating the course curriculum also brought an older Y.1 Tool Atlas metadata row back into sync with its chapter frontmatter.

- **White Belt index and course metadata corrected.** W.4 now names MyAccess, the LiteLLM key, SSO, and proxy trust; W.6 now describes the LiteLLM gateway instead of "what Vertex does." W.4's time budget now matches the chapter frontmatter.
- **Quest W-0 summary aligned.** The Master Index now mirrors the actual five-step Quest W-0 verification flow and routes stuck builders to `#ai-help`.
- **G.23 TOC labels corrected.** The Master Index, Green Belt overview, Part C guardrails overview, manifest, and course curriculum now match the current G.23 title: every model call routes through LiteLLM; Vertex is only a historical migration note inside the chapter.
- **Quest W-0 detour label corrected.** The first-day map caption now names stale Vertex env vars as the failure shape instead of suggesting `gcloud` auth is still required.
- **Course curriculum regenerated.** `skills/playbook-course/curriculum.json` was regenerated from `manifest.yml`, including the existing Y.1 Tool Atlas title, time budget, and outcome from the chapter frontmatter.

## v0.26 — Active support channel rollover (2026-06-16)

`#claude-onboarding-support` was archived on 2026-05-16 with instructions to log further support in `#ai-help`. The playbook still routed Day-1 setup, access, quota, gateway, and stale-row reports to the archived channel. This pass updates active reader-facing escalation paths to `#ai-help` while leaving historical changelog references intact.

- **Support-channel references updated.** White Belt setup/auth/gateway chapters, the Day-1 quick reference, Appendix D/F, Prologue support references, setup-verify fixes, and generated hub fallback copy now point to [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD).
- **Appendix F directory corrected.** The setup/access row now names `#ai-help` as the active successor to archived `#claude-onboarding-support`, removes the duplicate general `#ai-help` row, and records the archive handoff evidence.
- **Version markers bumped.** README and INDEX now report v0.26 / 2026-06-16 for this channel-rollover pass.

## v0.25 — Status-marker accuracy and version-stamp purge (2026-05-29)

A broader correctness sweep after v0.24. Many chapters carried inline version stamps ("drafted in v0.9", "Part B lands in v0.10", "the v0.5 page") and several appendix headers in `INDEX.md` were still tagged `[drafted skeleton]` or `[planned]` long after those appendices had been fully written. A reader landing on the Green Belt index today would see "Part B drafted in v0.10" and reasonably wonder which version they were on; a reader scanning the appendix TOC would see "Appendix K [planned]" while the changelog file it points at is actively maintained. Status markers must mean something.

**What changed.**

- **`INDEX.md` status markers corrected.** Appendices A, B, C, D, K, and L re-tagged `[drafted]` to match reality. F re-tagged `[drafted]` (it's a live directory, not a skeleton). E remains `[drafted skeleton]` because its frontmatter and body both still acknowledge that role-to-person assignments live in the program tracker. The status-marker definition itself was rewritten from "readable in v0.22" to a generic definition.
- **Green Belt overview chapters** (`belts/03-green/README.md`, `a-craft/README.md`, `b-practices/README.md`, `c-guardrails/badge.md`, `b-practices/quest-G2-greenfield-crossover.md`, `c-guardrails/boss-fight-GB-double-ship.md`) — every "drafted in v0.9 / v0.10 / v0.11" and "lands in v0.11" stamp removed; outdated "Parts B and C have not landed yet" guidance removed.
- **Black Belt overview chapters** (`belts/04-black/README.md`, `a-platform/README.md`, `b-craft/README.md`, `a-platform/quest-B1-publish-an-internal-plugin.md`, `a-platform/B05-multi-agent-orchestration.md`) — every "drafted in v0.13/14/15" stamp removed; "Next: Part B lands in v0.14" navigation footer fixed to point at the actual Part B README.
- **Appendices A, B, C** — "v0.5 page", "v0.5 skeleton", and per-skill "Drafted as a runnable skill in v0.18 / v0.12" stamps removed.
- **Prologue 0.1, 0.3, 0.4, 0.8, 0.10, 0.12** — `[coming]` references that now point at drafted content (Council, Appendix M strategy, Green/Black Belt, Appendix L, W.3) replaced with real links. `0.8` rewritten to acknowledge that the marker is rare now. `0.12` un-pinned from v0.23 to read as the current-version chapter.
- **`foundation/ops-101/README.md` and `03-triage-automations.md`** — Appendix I templates `[coming]` references replaced with real links.
- **`belts/04-black/c-org/B14-writing-an-ai-rfc.md`** — Appendix I `[planned]` reference replaced with a real link to the RFC template that has shipped.
- **`appendices/E-roles-and-forums/README.md` and `INDEX.md`** — "Vertex billing owner" row updated to "LiteLLM gateway owner" to match the post-March-2026 model path.
- **`case-studies/README.md`** — "empty at v0.19" stamp removed.
- **`README.md` and `INDEX.md`** — version bumped to v0.25; README's "drafted skeletons" footer corrected to reflect that only E and F are now skeletons.

No new chapters. No structural changes. The polish baseline holds.

## v0.24 — Post-Vertex correctness sweep (2026-05-29)

A targeted correctness pass after a fresh-eyes review surfaced load-bearing chapters that still described the pre-March-2026 Vertex routing path. The W.5/H.7 v0.23 rewrite committed to the LiteLLM gateway as the canonical model path, but several chapters that frame the mental model still pointed at Vertex/gcloud. Readers were forming a wrong model of Layer 3 on day one — and `403 PERMISSION_DENIED` from stale Vertex env vars is the single most common setup error in `#claude-onboarding-support` right now.

**What changed.**

- **Prologue §0.3 — The 5-Layer Mental Model** rewritten so Layer 3 is the LiteLLM gateway, with an explicit migration callout at the top. ASCII diagram, layer-by-layer description, debug examples, and closing summary all updated. Replaces the `gcloud auth application-default login` reflex with the setup-script re-run.
- **Prologue §0.5 — Tool tour** updated where Claude Code, Claude.ai, and the "why Claude" framing referenced Vertex.
- **Prologue §0.11 — Safety brief** updated the WIP-code-sharing line to reflect the gateway path.
- **Prologue §0.12 — What's shipping** rewritten from a v0.7 status report (Green/Black "not drafted yet", "private hosted deployment not done") to a v0.23 status report that matches reality: all belts drafted, hub live at razorpay.github.io/ai-playbook, the version history in CHANGELOG.md, the roadmap in ROADMAP.md.
- **W.4 — Your auth setup** rewritten to name the five real auth layers (Google SSO, MyAccess, Claude.ai SSO, LiteLLM key, Zscaler) instead of the abstract "program-pinned" framing, with the explicit "what to remove from `~/.bashrc`" guidance for Vertex leftovers.
- **W.6 — The LLM Gateway** rewritten to name LiteLLM, the gateway URL, and the three concrete jobs the gateway does. Failure modes link to the canonical W.5 list rather than restating them.
- **G.23 — The LLM proxy** title, intro, diagram, and closing references updated to reflect that the upstream is Anthropic API (post-migration); the substantive education (four jobs, debugging the proxy, what to share when it's the friction) is unchanged.
- **Appendix D — Known Issues + FAQ** promoted from a drafted skeleton to nine real entries seeded from the seven W.5 failure modes plus two recurring shapes (`command not found: claude`, Zscaler cert errors). Each entry follows the documented format with symptom, diagnosis, copy-pasteable fix, references.
- **Appendix G — Glossary** updated the Vertex entry to flag the migration and point to W.4/W.6.
- **`setup-verify` skill** Check 5 rewritten from "gcloud + Vertex auth" to "No stale Vertex environment variables" (the right thing to verify on the new path); Check 6 renamed from "LiteLLM proxy" to "LiteLLM gateway"; the three example output tables in `output-shape.md` and the README example all updated; `one-line-fixes.md` Check 5 rewritten with the actual rc-file cleanup commands.

No structural changes. No new chapters. No content moved. The v0.20 polish baseline holds.

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
