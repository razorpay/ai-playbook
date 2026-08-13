# Razorpay Org-Wide AI Playbook

> The operating manual for Razorpay's AI builder program. A belt-progression curriculum, seven reusable Claude Code skill definitions, and a Starlight hub — all built on one Markdown source of truth.

<p align="center">
  <img src="diagrams/belt-ladder-hero.svg" alt="Foundation → White → Yellow → Green → Black → Council" width="720">
</p>

<p align="center">
  <strong>v0.61 alpha</strong> · updated 2026-08-13 · source of truth: Markdown<br>
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
| **Inspect a reusable workflow** | Understanding how a bounded skill should behave before it is distributed. | Start in the [Skills Library](appendices/C-skills-library/README.md). The seven reference definitions live under [`skills/`](skills/); confirm the current runnable distribution in [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD) rather than assuming Compass ships them. |

## Pick your starting point

- **New to software.** → [Part 0 — Foundation](foundation/README.md). Tech 101 + Ops 101. Pre-tools, pre-AI, fully outside-readable.
- **Already know what an API, database, and deploy are.** → [Prologue](prologue/README.md). A twelve-chapter mental-model warmup.
- **Reviewing the whole playbook as a sponsor or maintainer.** → [Master Index](INDEX.md).
- **Looking for templates, cards, glossary, or certification policy.** → [Appendices](appendices/).
- **Senior IC interested in the Council layer.** → [Staff+ Council](belts/05-council/README.md).

If you want a guided walk, use the index or hub today. The repo contains a `playbook-course` reference definition for a stateful Claude Code walk, but it is not currently shipped through Compass; confirm a supported runnable route in [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD).

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
├── skills/                  # 7 Claude Code reference definitions
├── diagrams/                 # 9 signature SVG diagrams + 2 legacy aliases
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

## Inspect the course-skill reference

The in-repo [`playbook-course`](skills/playbook-course/) definition specifies how a stateful Claude Code walk should pace the curriculum, read `curriculum.json`, and track progress in a local `LEARNER.md`. It is a reference implementation, not a Compass command currently available to learners.

Use the [Master Index](INDEX.md) or [hub](https://razorpay.github.io/ai-playbook/) for a guided reading route today. Maintainers can inspect the [course-skill notes](skills/playbook-course/README.md); confirm any supported runnable distribution in [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD) before sharing invocation guidance. A future implementation may record quest and boss-fight claims, but belt awards still follow [Appendix L's reviewer protocol](appendices/L-certification/README.md).

## What's drafted

Foundation, Prologue, all four belts, the Staff+ Council section, twelve appendices, seven Claude Code reference definitions, seven quick-reference cards, nine signature SVG diagrams, and seven hand-drawn companion illustrations. Appendices E (Roles & Forums) and F (Slack Channels) ship as living directories where the structure is fixed and named holders refresh quarterly; everything else is drafted end-to-end. The reading order is coherent end-to-end from first commit to Council membership.

Version history is in [CHANGELOG.md](CHANGELOG.md). What's coming next is in [ROADMAP.md](ROADMAP.md).

## Contribute

Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a PR. It covers the seven review principles, the content rules (Razorpay-term tiering, no PII, no personal names), the voice commitments, and the link-and-lint sweep that gates merges.

For substantial changes (a belt restructure, a new track, a voice change), write an AI RFC using the [template in Appendix I](appendices/I-templates/RFC-template.md). The RFC is reviewed by the Staff+ Council per [C.3](belts/05-council/C03-rfc-pipeline.md).

---

**Next:** [→ Master Index](INDEX.md) · [→ Part 0 — Foundation](foundation/README.md) · [→ Prologue](prologue/README.md)
