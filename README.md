# Razorpay Org-Wide AI Playbook

> The operating manual for Razorpay's AI builder program. A belt-progression curriculum, seven runnable Claude Code skills, and a Starlight hub — all built on one Markdown source of truth.

<p align="center">
  <img src="diagrams/belt-ladder-hero.svg" alt="Foundation → White → Yellow → Green → Black → Council" width="720">
</p>

<p align="center">
  <strong>v0.24 alpha</strong> · updated 2026-05-29 · source of truth: Markdown<br>
  <a href="INDEX.md">Master Index</a> · <a href="CHANGELOG.md">Changelog</a> · <a href="ROADMAP.md">Roadmap</a> · <a href="CONTRIBUTING.md">Contributing</a>
</p>

---

## What this is

A playbook for AI-native engineering at Razorpay. It starts before tools — before Terminal, before "what's an API" — and climbs through Foundation, four belts (White, Yellow, Green, Black), and a Staff+ Council layer for senior contributors. A reader who finishes can ship code with AI, lead a team adoption sprint, or contribute back to the org's internal skills and knowledge-base layer.

The content is Markdown-first, written to be **outside-readable** at the lower belts and **fintech-real** at the upper ones. Belts are earned by shipping, not by reading — every belt has required modules, hands-on quests, and a boss-fight capstone.

## Three doors, one source

The same Markdown layer powers three consumption surfaces. Pick the one that fits how you want to read.

| Door | Best for | How to use it |
|---|---|---|
| **Read on GitHub** | Skimming, linking, and reading in the same place you work. | Start at [INDEX.md](INDEX.md). Every chapter is a flat Markdown file. |
| **Browse the hub** | The polished web experience with search, sidebar, and progress markers. | The Astro Starlight site under [`hub/`](hub). See *Run the hub* below. |
| **Walk it with Claude Code** | A paced, conversational track with quest and boss-fight gating. | The [`playbook-course`](skills/playbook-course) skill. Say *"start the playbook"* in Claude Code. |

## Pick your starting point

- **New to software.** → [Part 0 — Foundation](foundation/README.md). Tech 101 + Ops 101. Pre-tools, pre-AI, fully outside-readable.
- **Already know what an API, database, and deploy are.** → [Prologue](prologue/README.md). A twelve-chapter mental-model warmup.
- **Reviewing the whole playbook as a sponsor or maintainer.** → [Master Index](INDEX.md).
- **Looking for templates, cards, glossary, or certification policy.** → [Appendices](appendices/).
- **Senior IC interested in the Council layer.** → [Staff+ Council](belts/05-council/README.md).

If you want a guided walk, open Claude Code in this directory and say *"start the playbook."* The course skill creates a `LEARNER.md` in your working directory and walks the next module.

## Repository layout

```
.
├── README.md                 # you are here
├── INDEX.md                  # reader-facing master TOC
├── CHANGELOG.md              # what shipped, when
├── CONTRIBUTING.md           # design principles, content rules, voice
├── ROADMAP.md                # open questions and the v1.0 path
├── manifest.yml              # machine-readable course manifest
├── slugs.yml                 # stable URL + skill ID map
│
├── foundation/               # Part 0 — Tech 101 + Ops 101
├── prologue/                 # 12-chapter mental-model warmup
├── belts/                    # 01-white → 02-yellow → 03-green → 04-black → 05-council
├── appendices/               # A tool atlas · B setup · C skills · D issues · E roles
│                              # F slack · G glossary · H cards · I templates
│                             # J reading · L certification · N methodologies
├── case-studies/             # Boss Fight B-B case studies seed here
│
├── skills/                  # 7 Claude Code skills (incl. playbook-course)
├── diagrams/                 # 12 signature SVG diagrams (theme-aware)
├── excalidraw/               # 7 hand-drawn companion illustrations
├── hub/                      # Astro Starlight source — regenerated from above
└── scripts/                  # build + polish tooling
```

## Run the hub locally

```sh
cd hub
npm install
npm run dev
# open http://127.0.0.1:4321/
```

Production build:

```sh
cd hub
npm run build       # static output → hub/dist/
npm run preview     # serve hub/dist/ locally
```

The hub regenerates `hub/src/content/docs/` from the root Markdown on every build. Edit the root Markdown — never the generated files, which are overwritten.


## Deployed hub

The hub is published to GitHub Pages on every merge to master and is accessible at:

> **https://razorpay.github.io/ai-playbook/**

### How deployments work

| Trigger | What happens | URL |
|---------|-------------|-----|
| Push to `master` | Site builds and deploys automatically (~2 min) | https://razorpay.github.io/ai-playbook/ |
| PR opened / updated | Preview build deploys automatically | `https://razorpay.github.io/ai-playbook/pr-preview/pr-{N}/` |
| PR closed / merged | Preview is automatically removed | — |

The bot posts a comment on every PR with the preview URL so you can verify the rendered output before merging.

### Trigger a manual redeploy

Go to [Actions → Deploy to GitHub Pages](https://github.com/razorpay/ai-playbook/actions/workflows/deploy-pages.yml) → **Run workflow** → master.

## Run the course skill

In any working directory with Claude Code and the Razorpay Compass plugin loaded:

```
> start the playbook
> continue my belt
> show my progress
```

The skill reads `curriculum.json` (generated from `manifest.yml`) and the chapter Markdown directly, paces the walk, and tracks progress in a local `LEARNER.md`. It records claims at quests and boss fights; it does **not** award belts — that is [Appendix L's reviewer protocol](appendices/L-certification/README.md). Maintainer notes live at [`skills/playbook-course/README.md`](skills/playbook-course/README.md).

## What's drafted

Foundation, Prologue, all four belts, the Staff+ Council section, twelve appendices, seven Claude Code skills, six quick-reference cards, nine signature SVG diagrams, and seven hand-drawn companion illustrations. Three appendices ship as drafted skeletons (D Known Issues, E Roles & Forums, F Slack Channels) whose entries seed over time. The reading order is coherent end-to-end from first commit to Council membership.

Version history is in [CHANGELOG.md](CHANGELOG.md). What's coming next is in [ROADMAP.md](ROADMAP.md).

## Contribute

Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a PR. It covers the six design principles, the content rules (Razorpay-term tiering, no PII, no personal names), the voice commitments, and the link-and-lint sweep that gates merges.

For substantial changes (a belt restructure, a new track, a voice change), write an AI RFC using the [template in Appendix I](appendices/I-templates/RFC-template.md). The RFC is reviewed by the Staff+ Council per [C.3](belts/05-council/C03-rfc-pipeline.md).

---

**Next:** [→ Master Index](INDEX.md) · [→ Part 0 — Foundation](foundation/README.md) · [→ Prologue](prologue/README.md)
