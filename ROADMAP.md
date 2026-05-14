# Razorpay AI Playbook — Roadmap

> **Audience.** Maintainers, sponsors, and contributors who want to see what is coming and what is unresolved. Readers do not need this file.

This roadmap collects the playbook's open questions and the proposed version sequence from v0.19 toward v1.0. It used to live at the bottom of `INDEX.md`; it moved here in v0.19 so the master index stays a clean reader-facing TOC.

---

## Open questions

These are the program-level decisions that affect the playbook's shape but have not been resolved. Each remains open until the program lead (or the body the question routes to) commits.

1. **Scope of the first full cohort release.** Builder-Day attendees only, or org-wide release concurrent with the cohort? The answer determines how POD-specific the chapter depth needs to be in the launch version.

2. **Authoring model going forward.** Three plausible models: (a) central v1 with maintenance by a small team; (b) POD-contributed from day one; (c) central v1 plus a contribution flow for Green and Black Belt artefacts. The current draft favours (c), but the explicit decision is owed.

3. **Playbook success KPI distinct from program OKRs.** Candidates: percentage of Builder-Day attendees who complete White and Yellow before the next event; percentage of Green earners who ship a second PR within thirty days; number of skills added by readers; number of Ops 101 recipes contributed. One metric is the right answer; the choice is open.

4. **Black Belt artefact.** Shareable external badge that lives on LinkedIn or Credly, or internal-only certification? Determines whether the badge has an external surface and whether the program's branding extends with it.

5. **Refresh cadence and Playbook Council membership.** Working recommendation: program lead, design transformation lead, and one engineering voice, meeting quarterly and after every Builder Day, major skill release, or devstack change. Formal adoption is pending the first Council charter ratification.

6. **Slash technical detail.** Owner, differentiation from Claude Code and Cowork, belt-level integration. The Slash sections of Appendix A and Y.1 currently describe the role without committing to a specific roadmap.

7. **Compass plugin delivery.** Ship the playbook inside the plugin, as a standalone internal site, or both? The current recommendation is both; the operational decision is owed.

8. **Outside-readability of Part 0.** Package Tech 101 and Ops 101 as a separately publishable handbook, or keep everything behind the same internal access boundary? The Foundation chapters are written to be outside-readable; the publication decision is separate.

The Council reviews open questions at the annual charter revision per [C.2](belts/05-council/C02-structure.md). Substantive answers land via RFC.

---

## The version sequence

The shipped versions through v0.18 are documented in the `V0.x-*-PLAN.md` files at the repo root and in `CHANGELOG.md` (planned for v0.20+).

The v0.19+ sequence proposed below. Each version is one to two execution sessions of authoring time plus calendar time for review where indicated.

### v0.19 — Hub IA restructuring (shipped)

Restructured the hub for the reader. Custom homepage with belt-ladder hero plus a "find your starting point" decision strip. Sidebar curriculum-shaped, not directory-shaped. Appendices clustered by use case rather than alphabetically. Status markers filtered from rendered titles. Maintainer content extracted to `CONTRIBUTING.md` and `ROADMAP.md` (this file). Search and breadcrumbs surfaced.

### v0.20 — Polish pass (shipped)

Em-dash sweep, placeholder-phrase rewrite, voice consistency, Razorpay-term tiering across all pre-v0.16 chapters. The voice bar set in v0.16's Council chapters and v0.18's skill content became the bar applied to prior content. Touched every chapter without changing the underlying structure. Two reusable polish scripts (`scripts/polish-detector.py` and `scripts/polish-substitute.py`) committed for future sweeps.

### v0.21 — Diagrams pass (shipped)

Nine theme-aware SVG diagrams with a shared design language: belt ladder (homepage hero), three pillars, certification flow, design-to-code pipeline, memory layers, RFC state machine, pre-ship-check six-layer gate, plus refreshes of the 5-layer mental model and the 9-layer Enablement Stack. ASCII originals stay below each SVG as fallbacks. The design language is committed in `diagrams/README.md`.

### v0.21b — Excalidraw companion (shipped)

Seven hand-drawn-style companion illustrations as the warm Tier-2 visual layer to the polished Tier-1 SVGs: Origin Story before/after, Boss Fight B-B month timeline, an office hours session, an embedded sprint week, inbox triage before-and-after, a White Belt first-day map, and the RFC anti-patterns grid. The initial cut was script-generated via `scripts/generate-handdrawn-svg.py` (rough.js-style perturbations); each file can be replaced with a hand-drawn Excalidraw sketch later without changing any chapter reference. Two-tier visual system: polished for identity and reference; hand-drawn for the human texture of the work.

### v0.22 — Audio summaries

Roughly eleven podcast-style audio summaries of about ten minutes each: one per belt (four), one per Green and Black part (six), one Foundation primer, one Council overview. Scripts generated from chapter content; voiced via TTS or human narrator; players and transcripts integrated into the hub's chapter pages. The commute-listening surface that the playbook's volume warrants.

### v0.23 — Validation sweeps

Sponsor review (program lead, design transformation lead, sponsor leadership). Security and compliance review of the redline chapters (G.22 through G.25) and the security-review-subagent skill. Engineering and design reads across all four belts. Pilot reading group of five to eight builders walking a belt pre-launch. Calendar time, not authoring time. Runs in parallel with v0.20 through v0.22.

### v1.0 — Launch

Operational close: certification tracker confirmed; the program's primary Slack channels set up and pinned; the Compass plugin integration shipped; the four belt badges designed and added to the program's badge system. Open-question resolution: the eight questions above each get an explicit answer through an RFC or a program-lead decision. All-hands launch.

The v1.0 release also brings the playbook out of pre-release versioning. The `CHANGELOG.md` becomes the canonical version history.

---

## Beyond v1.0 — open horizons

The playbook is a living document. After v1.0:

- **Cohort-driven revisions.** Each cohort produces feedback that shapes the next revision. The cadence: monthly cohort-lead reviews fold into a quarterly content revision; the annual Council charter revision is the biggest revision moment.

- **Case-study archive growth.** The `case-studies/` directory accumulates Boss Fight B-B case studies. After a year, the archive itself is a teaching surface that future Black Belt candidates read.

- **The Grandmaster track surface.** If the Council formalises a "next layer" beyond Council membership (e.g., a Distinguished or Fellow track), that section lands as a v1.x release. The literature suggests this is a multi-year horizon at most companies; the playbook commits no specific date.

- **Plugin and skill ecosystem.** As builders publish more skill packs and MCP integrations through the program's pinned channel, Appendix C grows. v1.x periodically curates the catalogue.

- **External publication.** If Open Question 8 resolves toward external readability for Part 0, the publication infrastructure (an external static host, a separately branded surface) lands as a v1.x release.

---

**For readers:** if you are looking for the playbook itself, return to the [Master Index](./INDEX.md) or the hub homepage.
