# Contributing to the Razorpay AI Playbook

> **Audience.** Maintainers, contributors, and anyone editing the playbook's content, substrate, or hub. Readers of the playbook do not need to read this file.

This file collects the maintainer-facing material that used to live in `INDEX.md`: the design principles every chapter is held against, the seed themes the playbook was originally shaped to cover, the production-plan diagram and proposed directory layout, and the contribution flow for new chapters and skills.

If you are a reader looking for the playbook itself, start at the [Master Index](./INDEX.md) or the hub homepage. This document is the maintainer's manual.

---

## The six design principles

Every chapter of this playbook is written against these principles. See `RESEARCH-BRIEF.md` for the original derivation.

1. **Laymen-first, engineer-respectful.** Readable by a designer who has never opened Terminal. Deep enough that a staff engineer finds it sharp.
2. **Belts are earned through quests, not self-reported.** Every belt has required deliverables and a boss-fight capstone.
3. **Teach the constraint, not the trick.** Context windows fill up. PII cannot leak. Money is at stake. Understand *why*, and the techniques follow.
4. **The 5-pillar adoption lattice** (explain the *how*; track and reward; cut red tape; champions as teachers; prioritise high-impact) runs through everything.
5. **Prompt × Context × Harness.** Every technique is tagged with which of Simon Willison's three pillars it exercises. A few belt-habit chapters use `Meta`; that is a curriculum tag for learning hygiene, not a fourth technical pillar.
6. **Knowledge-base-driven development is the operating philosophy.** Skills, CLAUDE.md, persistent context, and the org's KB layer all reduce to one idea: do not re-derive, accumulate. See §0.7 and Appendix N.
7. **Fintech guardrails are load-bearing.** Security, PII, compliance are not an appendix. They are a Green Belt module and a Black Belt specialisation.

Pull requests are reviewed against these principles. A chapter that drifts from any of them is asked to revise before merging.

---

## The seed themes — mapping the original index

A cross-reference between the seed themes the playbook was scoped against in v0.4 and the current structure, so nothing is lost as the playbook evolves.

| Seed theme | Lives in |
|---|---|
| **Pre-tools basics** — what software is, what ops automation looks like | Part 0 — Foundation |
| **Operating philosophy** — KB-driven development, gstack, GSD, LLM Wiki | Prologue §0.7 + Appendix N |
| **Technical** — git, terminal, E2E, Playwright, auth | W.2, W.3, W.4, Y.8, G.12-G.14, G.21 |
| **Tool stack** — Claude Code, Codex, Slash, MCPs | Y.1, Y.2, Y.9, Y.10, Appendices A and B |
| **Setup and known issues** — channels, roles, FAQs | W.4, W.5, Appendices D, E, F |
| **Design-specific** — Figma, Blade, Node, pnpm, localhost, mobile | G.15, G.16, G.17 |
| **Best practices** — context and prompt engineering, directories, worktrees, skills | G.1 through G.11 (Green Belt Part A) |
| **Find and fix** — bug-hunting with AI across git and Slack | Y.11 + the Yellow Belt boss fight |

The mapping is durable: any time a new chapter lands, the maintainer confirms it slots into the right seed-theme region.

---

## The production plan

### The two-layer architecture

```
┌──────────────────────────────────────────┐
│         HTML HUB (static site)            │   Polished reader experience.
│  Sidebar TOC · search · progress · quiz   │   Lives at /hub/.
│      Renders markdown at build time.      │   Built from the MD layer.
└────────────────────▲─────────────────────┘
                     │
┌────────────────────┴─────────────────────┐
│         MARKDOWN LAYER (canonical)        │   Source of truth.
│   INDEX.md · belts/ · appendices/ · etc.  │   Plugs into course-serving skill.
│   Every file versioned, every file plain. │   Git-friendly, PR-reviewable.
└──────────────────────────────────────────┘
```

The Markdown layer is the source of truth. The HTML hub is a polished rendering of the Markdown via Starlight + Astro. The `playbook-course` skill is a third consumer that reads the Markdown directly.

### Directory layout

```
razorpay-org-ai-playbook/
├── README.md                    # 60-second "what is this"
├── INDEX.md                     # the master index (reader-facing TOC)
├── CONTRIBUTING.md              # this file
├── ROADMAP.md                   # open questions and the v0.x sequence
├── RESEARCH-BRIEF.md            # the research that shaped the playbook
├── manifest.yml                 # machine-readable course manifest
├── slugs.yml                    # stable URL and skill-ID map
├── CHANGELOG.md                 # version history
│
├── foundation/                  # Part 0
│   ├── README.md
│   ├── tech-101/
│   └── ops-101/
│
├── prologue/
│   └── 01-welcome.md … 12-whats-shipping.md
│
├── belts/
│   ├── 01-white/
│   ├── 02-yellow/
│   ├── 03-green/
│   ├── 04-black/
│   └── 05-council/
│
├── appendices/
│   ├── A-tool-atlas/ … N-methodologies/
│   └── H-reference-cards/, I-templates/ (multi-file)
│
├── skills/
│   ├── setup-verify/
│   ├── pre-ship-check/
│   ├── design-intel/
│   ├── production-compiler/
│   ├── blade-compliance-reviewer/
│   ├── security-review-subagent/
│   └── playbook-course/
│
├── case-studies/                # Boss Fight B-B case studies land here
│
├── diagrams/                    # SVG diagrams (v0.21+)
├── images/                      # static images
└── hub/                         # Starlight + Astro source for the rendered site
```

The layout is stable. New chapters or skills land in the right subdirectory; the substrate (manifest.yml, slugs.yml) gets updated in the same PR.

### How this plugs into the `playbook-course` skill

Each belt folder has a predictable structure (`README.md` plus numbered module files plus quests plus boss fight plus badge). A single `playbook-course` skill walks `foundation/` and `belts/` and enumerates available material, serves modules in order, tracks completion in the learner's local `LEARNER.md`, and gates progression at quests and boss fights through Appendix L's reviewer protocol.

The HTML hub is optional polish. The Markdown layer is self-sufficient and works inside Claude Code, VS Code, GitHub, or in print.

### The hub generation pipeline

The hub is regenerated on every build via `hub/scripts/generate-docs.mjs`. The script reads `manifest.yml` and root Markdown, then emits Starlight-shaped Markdown under `hub/src/content/docs/` plus a generated sidebar at `hub/src/generated/sidebar.mjs`.

Key conventions:

- The generator wipes `hub/src/content/docs/` on every run. Do not edit files there directly; they are overwritten.
- The generator excludes maintainer files (`CONTRIBUTING.md`, `ROADMAP.md`, `V0.x-*-PLAN.md`, research briefs) from hub generation.
- Status markers in front-matter are preserved; the rendered hub hides them from titles but uses them for `[planned]`-style badges where appropriate.
- The custom homepage at `hub/src/content/docs/index.md` overrides the generated README → index mapping. The generator writes it after the per-chapter pass.

### Build commands

From the `hub/` directory:

- `npm run dev` — local server at `http://127.0.0.1:4321/`.
- `npm run build` — static build to `hub/dist/`.

Both run `generate-docs.mjs` first.

---

## The contribution flow

### For new chapters

1. Identify which section (Foundation, Prologue, belt, Council, appendix) the chapter belongs in.
2. Read the existing chapters in that section to match the voice and density.
3. Use the relevant template from Appendix I when authoring (CLAUDE.md, SKILL.md, RFC, retro, or the chapter pattern that matches).
4. Add an entry to `manifest.yml` with the slug, path, status, type, time budget, prev/next, and tags.
5. Add an entry to `slugs.yml` mapping the slug to the file.
6. If the chapter introduces a new track, add it to the trackLabels map in `hub/scripts/generate-docs.mjs`.
7. Run `npm run dev` from `hub/` to verify the chapter renders.
8. Run the repo-wide link sweep (see `Stage 8` in any `V0.x-*-PLAN.md` for the script).
9. Open the PR with the chapter, the manifest edit, the slug edit, and the link-sweep output.

### For new skills

Skills follow the v0.12 / v0.18 program-skill pattern. Each skill is a directory under `skills/<skill-name>/` with:

- `SKILL.md` — the skill's main entry (read by Claude Code at runtime).
- `README.md` — the human-facing how-to.
- Reference files as needed (one per logical concern: rules, outputs, modes).
- `test-cases.md` — acceptance scenarios.

Skills are not in `manifest.yml` (they are not chapters). They are catalogued in `appendices/C-skills-library/README.md`.

### For the substrate

When changing the substrate (`manifest.yml`, `slugs.yml`, the hub generator, the `playbook-course` skill, the build pipeline):

- Bump the playbook version in `manifest.yml` and root `README.md`.
- Update `CHANGELOG.md` with the change.
- If the hub sidebar shape changes, walk a sample of pages locally to confirm nothing regresses.
- If the manifest entries change shape, re-run the `playbook-course` skill's curriculum regen.

### Content rules

- **No personal names.** People change roles; roles persist. Use role-language throughout. The exception: the front-matter `author` field on case studies (where the author is the artefact's owner of record).
- **No historical phasing shorthand.** The early-version programme-phase labels were maintainer-only and never reached the reader. Use the curriculum's own framing.
- **Tier Razorpay-specific terms.** Named directly where the chapter is literally describing Razorpay's setup (Compass plugin, Blade, Slash, Vertex, LiteLLM, POD). Generalised where the chapter is conceptual (the design system, the AI builder community, your team).
- **No regulator-protected data anywhere.** Real PII, real PAN, real secrets, real customer identifiers. Use fixtures or redact aggressively.

### Voice and style

- **Em-dashes sparingly.** One per paragraph is the upper bound; two stacked in a sentence is the wrong shape.
- **Full prose.** Avoid the `"the trap:"` / `"the discipline:"` / `"fix:"` shorthand pattern.
- **Public-readable.** A reader outside the program should be able to follow the chapter without confusion. Internal placeholders like "the program's primary X" are acceptable when the X is genuinely role-specific; specific channel handles and people names are not.

### Review process

Pull requests are reviewed against:

- The six design principles (above).
- The content rules (above).
- The voice commitments (above).
- The link sweep (zero broken markdown links).
- The lint sweep (zero violations on the content-rules patterns).

Maintainers typically respond within a few business days. Substantive PRs may require a second reviewer or a Council discussion if the change touches a shared surface.

---

## How to suggest a substantial change

For changes that affect the playbook's structure, voice, or the way a belt is shaped: write an AI RFC using the [template in Appendix I](appendices/I-templates/RFC-template.md). The RFC is reviewed by the Staff+ Council per the process in [C.3](belts/05-council/C03-rfc-pipeline.md).

For smaller changes (a chapter revision, a new skill, a glossary entry, a card revision): a PR with a clear description is enough.

---

## Versioning

The playbook uses pre-release versioning (`0.x-alpha`) until v1.0. Each version is committed in `manifest.yml`'s top-level `version` field. The version corresponds to a release plan file at the repo root (`V0.x-*-PLAN.md`).

The shipped versions through v0.18 are documented in `CHANGELOG.md` (planned for v0.20+). Until the changelog lands, the plan files at the repo root carry the historical record.

---

**For readers:** if you are looking for the playbook itself, return to the [Master Index](./INDEX.md) or the hub homepage.
