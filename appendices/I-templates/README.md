---
title: "Appendix I: Templates"
slug: "appendices/templates"
section: "appendices"
status: "drafted"
type: "readme"
track: "templates"
order: 0
time_minutes: 8
audience: "everyone"
outcome: "Find the right template for the artefact you are about to create — CLAUDE.md, SKILL.md, RFC, retro, or knowledge-base seed — and copy it into your repository as a starting point."
prev: null
next: "appendices/templates/claude-md-service"
pillar: null
belt: null
tags: ["appendix", "templates"]
updated: "2026-05-08"
---

# Appendix I: Templates

Eight ready-to-fork templates. Each is a working starting point. Copy the template into your repository or working folder, fill in the placeholders, and ship.

The templates pair with specific chapters that explain the why and the discipline. Use the chapter for context; use the template for the artefact.

## Which template do I need?

| You want to | Open this template | The chapter that explains it |
|---|---|---|
| Add a CLAUDE.md to a single service or repo | [CLAUDE-md-service](CLAUDE-md-service.md) | [G.3](../../belts/03-green/a-craft/G03-claude-md-real-service.md) |
| Add a CLAUDE.md to a monorepo root | [CLAUDE-md-monorepo](CLAUDE-md-monorepo.md) | [G.4](../../belts/03-green/a-craft/G04-hierarchical-claude-md.md) |
| Add a personal CLAUDE.local.md (gitignored) | [CLAUDE-local-md](CLAUDE-local-md.md) | [G.5](../../belts/03-green/a-craft/G05-claude-local-md.md) |
| Author your first SKILL.md | [SKILL-md-minimum](SKILL-md-minimum.md) | [G.7](../../belts/03-green/a-craft/G07-writing-your-first-skill.md) |
| Author a SKILL.md with progressive disclosure | [SKILL-md-full](SKILL-md-full.md) | [G.7](../../belts/03-green/a-craft/G07-writing-your-first-skill.md) and [B.7](../../belts/04-black/b-craft/B07-progressive-disclosure.md) |
| Write an AI RFC | [RFC-template](RFC-template.md) | [B.14](../../belts/04-black/c-org/B14-writing-an-ai-rfc.md) and [C.3](../../belts/05-council/C03-rfc-pipeline.md) |
| Write a retro (Quest, Boss Fight, or Embedded Sprint) | [retro-template](retro-template.md) | The relevant belt's quest or boss-fight chapter |
| Stand up a minimum viable wiki | [minimum-viable-wiki-seed](minimum-viable-wiki-seed.md) | [Prologue §0.7](../../prologue/07-operating-principles.md) and [Appendix N.7](../N-methodologies/N7-minimum-viable-wiki.md) |

## How the templates are written

Every template has three sections.

**Header.** What the template is for, when to use it, and what to fill in. Read this first; it tells you whether you have the right template.

**Template body.** The actual artefact, with placeholders in `<!-- comment -->` blocks. Replace each placeholder with your content. Comments that should not appear in the final artefact start with `<!-- DELETE -->`.

**Worked example.** A populated version of the template below the body. Use it as a calibration check: if your artefact looks roughly like the worked example, you have used the template correctly.

## Conventions

The templates use the following conventions consistently.

- **Placeholder format.** `<!-- replace this with ... -->` for content the user fills in. `<!-- DELETE -->` for instructional comments that should be removed before shipping.
- **Voice.** The template is written from the perspective of the person filling it in. The worked example is written from the perspective of someone reading the populated artefact.
- **Length guidance.** Each template indicates the approximate target length. Real artefacts vary; the guidance is for calibration, not enforcement.
- **Cross-references.** Templates point at the chapter where the discipline is explained. They do not duplicate the discipline; the template is the artefact, the chapter is the rationale.

## Maintenance

Templates are revised as the curriculum evolves. When a chapter changes its discipline (e.g., the RFC chapter adds a new required section), the corresponding template is updated in the same revision. The revision history is tracked in the file's `updated` front-matter and in the playbook changelog.

Pull requests welcome. The templates are most useful when many builders use them; feedback from real use shapes the next revision.

---

**See also:** [Appendix N.7 — The minimum viable wiki](../N-methodologies/N7-minimum-viable-wiki.md), the deeper treatment of the wiki seed template; [Appendix C — Skills Library](../C-skills-library/README.md), the catalogue of skills that the SKILL.md templates produce.

**Templates:** [CLAUDE-md-service](CLAUDE-md-service.md) · [CLAUDE-md-monorepo](CLAUDE-md-monorepo.md) · [CLAUDE-local-md](CLAUDE-local-md.md) · [SKILL-md-minimum](SKILL-md-minimum.md) · [SKILL-md-full](SKILL-md-full.md) · [RFC-template](RFC-template.md) · [retro-template](retro-template.md) · [minimum-viable-wiki-seed](minimum-viable-wiki-seed.md)
