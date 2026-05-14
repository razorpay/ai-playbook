---
title: "Appendix J: Reading List"
slug: "appendices/reading-list"
section: "appendices"
status: "drafted"
type: "readme"
track: "reading-list"
order: 0
time_minutes: 10
audience: "everyone"
outcome: "Find the public source the curriculum cites for a given topic, with a one-line annotation explaining why it matters."
prev: null
next: null
pillar: null
belt: null
tags: ["appendix", "reading-list", "external"]
updated: "2026-05-08"
---

# Appendix J: Reading List

> **Status: drafted.** Consolidates the public sources the curriculum already cites. Organised by where in the curriculum the source is most relevant. Each entry has a one-line annotation explaining why the curriculum points at it.

## What this appendix is

A curated reading list of the external public sources that shaped the curriculum. Books, blog posts, conference talks, RFC standards, engineering publications. Each entry names the source and explains in one line why the curriculum points at it.

The list is not exhaustive. It is the set of works the curriculum actively cites; readers who want broader exposure beyond the curriculum should follow the citations in the works themselves.

## How to use this appendix

If you have read a chapter and want to go deeper on a specific reference, look it up here for the full citation and the one-line "why this matters". If you want to study a topic that the curriculum covers at a chapter-level, this list is the next layer of reading.

## Operating philosophy

Foundational works on knowledge-base-driven development and the way of working the curriculum encodes.

- **Andrej Karpathy on LLM Wikis.** Various conference talks and blog posts (search "Karpathy LLM wiki"). The anti-RAG framing that anchors [Appendix N.4](../N-methodologies/N4-llm-wiki.md). Why it matters: the wiki-as-persistent-context idea is the operating philosophy of the curriculum.
- **Will Larson, *Staff Engineer: Leadership Beyond the Management Track* (2021).** [staffeng.com](https://staffeng.com). The single most-cited book in the [Council section](../../belts/05-council/README.md). Why it matters: the senior-IC track and what it takes to operate at the Council level.
- **Tanya Reilly, *The Staff Engineer's Path* (O'Reilly, 2022).** Chapter 9, "You Are Part of Something Bigger", is the canonical reference for senior-IC communities. Why it matters: how senior engineers find each other and why community is structurally not management.
- **Lara Hogan, *Resilient Management* (A Book Apart, 2019).** The mentor-portfolio frame. [larahogan.me](https://larahogan.me). Why it matters: the mentoring discipline at [C.4](../../belts/05-council/C04-mentoring-and-sponsorship.md).
- **Garry Tan, gstack.** Internal framework from his work as an investor and former engineering leader. Profiled in [Appendix N.2](../N-methodologies/N2-gstack.md). Why it matters: specialist-skills-as-roles framing for AI workflows.
- **GSD (Get Shit Done, also TÂCHES).** Profiled in [Appendix N.3](../N-methodologies/N3-gsd.md). Why it matters: meta-prompting and spec-driven development patterns.

## Three pillars and prompting

- **Simon Willison, "Agentic Engineering Patterns" and various blog posts.** [simonwillison.net](https://simonwillison.net). The prompt-context-harness three-pillars frame anchored in [G.1](../../belts/03-green/a-craft/G01-three-pillars.md). Why it matters: the orthogonal axes used as a tagging system across the curriculum.
- **Anthropic's Claude documentation.** [docs.claude.com](https://docs.claude.com). The reference for Claude Code, the Agent SDK, effort levels, and tool design. Why it matters: the program's primary AI surface; the docs are the canonical reference.
- **Anthropic engineering blog.** [anthropic.com/news](https://anthropic.com/news). Engineering writing on prompt evaluation, agent design, and safety patterns. Why it matters: contextualises the patterns the curriculum applies.

## Engineering blogs and publications

The publications that demonstrate the editorial-driven engineering writing pattern referenced in [C.5](../../belts/05-council/C05-external-voice.md).

- **Stripe Press.** [press.stripe.com](https://press.stripe.com). Stripe-funded publishing imprint that does not directly promote Stripe. Why it matters: the cleanest public example of investing in the engineering commons.
- **Increment magazine.** [increment.com](https://increment.com). Stripe-funded publication, mostly external authors. The "On Documentation" issue is particularly useful.
- **Etsy Code as Craft.** [codeascraft.com](https://codeascraft.com). The original editorial-driven engineering blog. Why it matters: posts read as useful even to non-Etsy engineers.
- **Cloudflare blog.** [blog.cloudflare.com](https://blog.cloudflare.com). High-cadence engineering writing held to an editorial bar. Why it matters: demonstrates that fast cadence and editorial quality coexist.
- **GitHub Engineering.** [github.blog/engineering](https://github.blog/engineering). The ALSO-public Balanced Employee IP Agreement and engineering writing. Why it matters: the IP carve-out reference and the editorial-quality template.
- **Shopify Engineering.** [shopify.engineering](https://shopify.engineering). Maxime Robert's "Engineering Levels" post is direct on the senior-IC track.
- **Square Engineering.** "How Square Approaches RFCs" is a primary reference for [C.3](../../belts/05-council/C03-rfc-pipeline.md).

## Senior-IC writing (individual blogs)

- **Will Larson, lethain.com.** [lethain.com](https://lethain.com). The deepest archive on engineering management and the senior-IC track.
- **Charity Majors, charity.wtf.** [charity.wtf](https://charity.wtf). Direct on personal-versus-company voice and the asymmetry of senior-engineer brand.
- **Tanya Reilly, noidea.dog.** [noidea.dog](https://noidea.dog). The "Being Glue" essay ([noidea.dog/glue](https://noidea.dog/glue)) is the most-cited piece on under-recognised mentoring work.
- **Lara Hogan, larahogan.me.** [larahogan.me](https://larahogan.me). The blog companion to *Resilient Management*; deeper material on mentoring portfolios and burnout.

## RFC and decision-record literature

- **Bryan Cantrill, "RFD 1: Requests for Discussion" (Oxide Computer, 2020).** [oxide.computer/blog/rfd-1-requests-for-discussion](https://oxide.computer/blog/rfd-1-requests-for-discussion). Foundational on RFC pipelines as teaching corpus. Why it matters: the framing for [C.3](../../belts/05-council/C03-rfc-pipeline.md).
- **The Oxide RFD archive.** [github.com/oxidecomputer/rfd](https://github.com/oxidecomputer/rfd). Public reading; the working example of an RFC archive at scale.
- **IETF RFC 2119, "Key words for use in RFCs to Indicate Requirement Levels" (Bradner, 1997).** [rfc-editor.org/rfc/rfc2119](https://www.rfc-editor.org/rfc/rfc2119). The MUST/SHOULD/MAY vocabulary every RFC pipeline borrows. Why it matters: ambiguity-reducing standard vocabulary.
- **IETF RFC 7282, "On Consensus and Humming in the IETF" (Resnick, 2014).** [rfc-editor.org/rfc/rfc7282](https://www.rfc-editor.org/rfc/rfc7282). The most useful single reading on consensus mechanics. Why it matters: consensus by addressed objections, not voting.
- **Michael Nygard, "Documenting Architecture Decisions" (Cognitect, 2011).** [cognitect.com/blog/2011/11/15/documenting-architecture-decisions](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions). The ADR foundation. Why it matters: lighter-weight per-decision artefact alternative to RFCs.

## Public-speaking and external-voice references

- **Lara Hogan, *Demystifying Public Speaking* (A Book Apart, 2016).** The canonical engineer-side reference for conference talks and external speaking. Why it matters: the asymmetry framing in [C.5](../../belts/05-council/C05-external-voice.md).
- **GitHub Balanced Employee IP Agreement.** [github.com/github/balanced-employee-ip-agreement](https://github.com/github/balanced-employee-ip-agreement). The cleanest public IP carve-out artefact. Why it matters: the only public reference for what a balanced IP policy looks like.

## Frameworks profiled in Appendix N

The five frameworks that get full treatment in [Appendix N](../N-methodologies/README.md). Each is summarised below; the appendix has the depth.

- **Knowledge-base-driven development.** [N.1](../N-methodologies/N1-kb-driven-development.md). The discipline behind accumulating context instead of re-deriving it.
- **gstack (Garry Tan).** [N.2](../N-methodologies/N2-gstack.md). Specialist skills as roles.
- **Get Shit Done (TÂCHES).** [N.3](../N-methodologies/N3-gsd.md). Meta-prompting and spec-driven development.
- **The LLM Wiki pattern (Karpathy).** [N.4](../N-methodologies/N4-llm-wiki.md). Anti-RAG; the wiki as persistent compounding artefact.
- **Simon Willison's three pillars.** [N.5](../N-methodologies/N5-three-pillars.md). Prompt × context × harness as orthogonal axes.

## Specific topics with primary sources

Where the curriculum cites a specific public source for a specific point.

- **Mentoring versus sponsorship.** Sylvia Ann Hewlett, *Forget a Mentor, Find a Sponsor* (HBR Press, 2013). Cited in [C.4](../../belts/05-council/C04-mentoring-and-sponsorship.md). The upstream source for the sponsorship distinction.
- **The manager-side view of mentoring.** Camille Fournier, *The Manager's Path* (O'Reilly, 2017). Cited in [C.4](../../belts/05-council/C04-mentoring-and-sponsorship.md) as the management-side counterpoint to the IC-track mentoring.
- **Architecture Decision Records.** Michael Nygard's 2011 post (above) is the foundational reference. Many companies have adapted it; the foundational reference is the cleanest source.
- **Office hours patterns.** The Whoop and Ramp patterns referenced in [B.12](../../belts/04-black/c-org/B12-running-office-hours.md) come from public engineering writing rather than canonical books; the chapter cites them inline.
- **Embedded sprint patterns.** [staffeng.com](https://staffeng.com) has direct material on the time-boxed embed pattern that [B.13](../../belts/04-black/c-org/B13-embedded-sprints.md) cites.

## Conference talks and podcasts

A small set worth knowing about.

- **Tanya Reilly, "Being Glue".** Originally a conference talk, now an essay at [noidea.dog/glue](https://noidea.dog/glue). The most-cited single piece on under-recognised mentoring work.
- **Charity Majors on Software Engineering Daily and Hanselminutes.** Direct interviews on personal-versus-company voice.
- **Bryan Cantrill, various talks.** Good examples of senior-engineer external voice; relevant to [C.5](../../belts/05-council/C05-external-voice.md).
- **Anthropic engineering team conference appearances.** Contextualise the agentic patterns the curriculum applies.

## How to suggest additions

If a public source has shaped the curriculum and is not on this list, the appendix accepts contributions:

1. Open a PR adding the entry.
2. Place it under the appropriate section.
3. Include the URL or full citation, and a one-line "why it matters".
4. The Council's annual reading-list discipline (per [C.2](../../belts/05-council/C02-structure.md)) reviews additions at the annual revision.

## Why this appendix is drafted (not a skeleton)

Appendix J ships as a fuller draft because the curriculum already cites these sources extensively. The chapters reference specific works by name and URL; this appendix is the consolidation of those references into a single discoverable location. The work to populate it was already done in the chapters; this appendix surfaces it.

The list will continue to grow as new chapters land and as the Council's annual reading-list reviews surface new works. The current shape is durable.

## Cross-references

- [Appendix N — Methodologies & Frameworks](../N-methodologies/README.md), where five of the operating frameworks get full treatment.
- [Appendix G — Glossary](../G-glossary/README.md), where most of the named concepts have one-paragraph definitions.
- [Council reading-list discipline (C.2)](../../belts/05-council/C02-structure.md), the annual cadence that surfaces new entries.

---

*This appendix is drafted. Additions land at the annual Council charter revision plus on-demand when new chapters cite new sources.*
