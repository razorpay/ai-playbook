---
title: "Document workflows"
slug: "ops-101/document-workflows"
section: "foundation"
status: "drafted"
type: "chapter"
track: "ops-101"
order: 6
time_minutes: 30
audience: "pm-designer-ops"
outcome: "Use AI to research, draft, review, and export documents while keeping claims and requirements tied to evidence."
prev: "ops-101/ticket-automations"
next: "ops-101/lightweight-agents"
pillar: null
belt: null
tags: ["ops-101", "documents", "agent-specs", "evidence"]
updated: "2026-09-06"
---

# 0B.6 — Document workflows

> **⏱ 30 minutes · 👥 PMs, designers, anyone whose week has writing in it · 🎯 Leaves with:** a four-phase workflow for researching, drafting, reviewing, and exporting documents without losing ownership of the argument or its evidence.

---

## Why documents get their own chapter

Triage (0B.3) sorts inputs. Generation (0B.4) produces short outputs. Tickets (0B.5) record work. A long-form document does more: it carries a position, its evidence, and often a decision people will act on. That makes a spec, brief, RFC, research synthesis, or strategy memo worth treating as its own workflow.

AI can organise sources, scaffold prose, critique a draft, and prepare alternate formats. It cannot decide what evidence is trustworthy, what the organisation should commit to, or whether a compressed version still means the same thing. Those checkpoints stay with the author.

---

## The four-phase document lifecycle

Use four phases, each with a different author checkpoint:

| Phase | Let AI help with | Author checkpoint |
|---|---|---|
| **Research** | Grouping accessible sources, extracting claims, and surfacing contradictions | Approve the source set; verify that important claims match the cited passage and context |
| **Draft** | Turning an explicit position or set of hypotheses into a structure | Own the argument, commitments, open questions, and decision rights |
| **Review** | Locating unclear logic, unsupported claims, repetition, and likely objections | Adjudicate every suggestion; involve the people whose expertise or approval matters |
| **Export** | Applying a supplied template and preparing audience-specific versions | Compare each output with the approved source; check access, links, layout, and meaning before sharing |

The key discipline is simple: **you are the author at every phase.** Assistance changes the speed and shape of the work, not who owns the claims or the decision.

---

## Recipe 1 — Research synthesis

Research gets slow when articles, internal docs, and interview notes live in different places. AI can organise that source set and make the gaps visible. It cannot prove that it reached every source, read the right version, or interpreted a passage correctly.

**Inputs.** The exact Drive files, docs, web articles, transcripts, or knowledge-base records you want considered. Confirm that the assistant can open them before asking for synthesis.

**The shape.**

> "I'm researching [TOPIC]. Here are the sources I want you to consider [list of links / files]. If another source would help, propose it separately; do not use it until I approve it.
>
> Produce a research synthesis with the following structure:
>
> - **The question I'm answering** (in my words; this is just to confirm we're aligned).
> - **Working hypotheses** — 3 to 5 candidate answers, each with a one-line claim.
> - **Evidence for each hypothesis** — bulleted, each bullet linking back to the source it came from. *No claim without a link.*
> - **Counter-evidence / what would change my mind** — for each hypothesis, what would have to be true for the hypothesis to be wrong.
> - **What's still unclear** — questions the sources don't answer; things I'd need to ask a person about.
> - **Confidence level** for the overall picture: low / medium / high. Be honest. *If sources are sparse or contradict, low is the right answer.*
>
> Don't invent. If a claim isn't directly supported by a source, say 'no source for this' rather than asserting it."

The output is an evidence map, not a draft. Verify every decision-critical claim against the cited passage, including its source, date, scope, and qualifications. For lower-risk background claims, choose a sample appropriate to the document's stakes. If a link is inaccessible, a citation does not support the claim, or two sources conflict, keep the item unresolved instead of polishing it into certainty.

---

## Workflow card — Turn customer notes into an agent spec without inventing requirements

Customer-call notes are not yet an agent spec. They mix requirements, examples, capabilities mentioned in passing, and questions nobody answered. Draft straight from that pile and the agent will politely fill the gaps. The resulting document can look precise while quietly committing the team to features, dates, or quality claims the customer never requested.

Use a two-pass workflow instead: **classify the evidence, then draft the spec**. This is a workflow rather than an autonomous agent for a reason: [Anthropic's production guidance](https://www.anthropic.com/engineering/building-effective-agents) recommends starting with the simplest approach and defines workflows as systems that follow predefined paths.

### Pass 1 — Build the evidence ledger

Give the assistant the exact notes or transcript. Ask it to label every proposed requirement as:

- **Confirmed** — stated directly in the source. Include the quote or source location.
- **Tentative** — a reasonable interpretation that an owner still needs to confirm.
- **Open** — missing or contradictory information that blocks a reliable spec.

Then close the minimum operating contract: **user and outcome, trigger, channels, systems read and written, permitted actions, human handoff and forbidden actions, pilot cohort, success measure, and intended reader**. If the source does not answer one, keep it open. An empty field is safer than a confident invention.

### Pass 2 — Draft only after the owner answers

**Copyable request**

> "Use only [CUSTOMER NOTES / TRANSCRIPT] as evidence. Do not draft the agent spec yet.
>
> First, produce an evidence ledger with four columns: `requirement`, `status` (`confirmed`, `tentative`, or `open`), `source quote or location`, and `owner question`.
>
> Check whether the source defines:
> - the user, business outcome, and event that triggers the agent;
> - each channel and the systems the agent may read from or write to;
> - the actions it may take, when it must hand off, and what it must never do;
> - the pilot cohort, success measures, and evidence the run must return;
> - the intended reader and document type.
>
> Ask me only the questions needed to close those gaps. After I answer, draft the spec. Keep unresolved items in an `Open questions` section. Do not add launch dates, benchmark or accuracy claims, integrations, permissions, or customer commitments that the evidence does not support."

### Five-minute pre-handoff check

- [ ] Every requirement is traceable to the source or an owner's explicit answer.
- [ ] Tentative interpretations are not written as confirmed commitments.
- [ ] Trigger, reads, writes, allowed actions, handoff, and forbidden actions are explicit.
- [ ] Pilot cohort, success measures, and returned evidence are named.
- [ ] Unsupported dates, performance claims, permissions, and rights-sensitive details remain out.

If a box fails, the document is a question list wearing a spec costume. Close the gap or leave it visibly open; do not smooth it over with prose.

This is a current internal workflow, not a theoretical template. A Forward Deployed Agent [used the same confirmed-versus-open gate before drafting a merchant agent proposal](https://razorpay.slack.com/archives/C0A94EJ38NP/p1786422995101429), and the merged Agent Builder lifecycle [starts with writing the spec before create, config, eval, review, and go-live](https://github.com/razorpay/merchant-skills/pull/232). The human still owns the business goal and every commitment. The assistant's job is to expose missing decisions before they become polished fiction.

---

## Recipe 2 — First-draft scaffolding

Once you have a research synthesis (Recipe 1) and a clear position you want to argue, the next phase is the dreaded blank-page first draft.

Use AI to turn an explicit argument and approved evidence into a proposed structure. The result depends on what you supply: vague goals produce generic sections, and missing evidence produces confident connective prose.

**Inputs.** Your verified synthesis from Recipe 1, plus any prior documents you are allowed to use as style references.

**The shape.**

> "I'm writing a [TYPE OF DOC: brief, RFC, strategic memo, etc.] arguing that [YOUR POSITION IN ONE LINE]. The audience is [WHO READS IT AND WHAT THEY CARE ABOUT]. The desired length is roughly [PAGES].
>
> Use this research synthesis as the source material [link to Recipe 1 output] and these prior docs as voice/style reference [links].
>
> Produce a structured first draft with:
>
> - **A one-paragraph executive summary** at the top. The version that goes in someone's calendar five minutes before the meeting.
> - **A clear thesis statement** in the first section (the argument, in 1–2 sentences).
> - **Sections** that build the argument in a logical sequence. Each section should answer one question.
> - **Evidence under each section** drawn from the research synthesis. Cite as you go.
> - **Counter-arguments** considered honestly in their own section, not as throwaway lines.
> - **A clear ask or recommendation** at the end (what should the reader *do*).
>
> Voice: [DESCRIBE: direct, plain, no jargon, etc.]. Don't pad. If a section is two paragraphs because that's what's needed, leave it at two."

Treat the draft as a proposal. Check its structure against your intended decision, trace factual claims back to the synthesis, and rewrite the executive summary, recommendation, commitments, and unresolved questions until they reflect your judgement.

**A common failure mode.** Generated drafts often replace precise uncertainty with phrases such as "it is important to consider" or "stakeholders may feel." Do not delete uncertainty that matters. Replace vague hedging with the evidence, confidence level, open question, or owner that would resolve it.

---

## Recipe 3 — Review and tightening

A critique pass can turn a general feeling that something is off into a list of issues you can inspect.

**The shape.**

> "Read this draft. Don't rewrite it. Just *critique* it across these dimensions:
>
> - **The argument**: is the thesis clear in the first paragraph? Does each section advance the argument? Are there sections that don't earn their place?
> - **Evidence**: are claims supported? Are there places where 'evidence' is just assertion?
> - **Voice**: where does it sound generic vs. specific to me? Flag any sentences that read like AI-generated filler.
> - **Hedging**: list every sentence that hedges. For each, suggest whether the hedge is earning its place or could be sharpened.
> - **Length**: which sections are longer than they need to be? Suggest cuts.
> - **Missing**: what would a thoughtful reader expect to see that isn't here? What would they push back on?
>
> For each issue, give me the location (section, paragraph) and a one-line suggestion. Don't rewrite paragraphs; let me decide which suggestions to take."

The output is a set of review hypotheses, not an approval. Accept a suggestion only after checking it against the purpose, evidence, and audience. Run another critique after a material revision if it is useful; do not use a prescribed number of AI passes as a substitute for the domain, legal, policy, design, or leadership review the document needs.

---

## Recipe 4 — Export and packaging

You've got the draft you want to ship. Now you need it as a PDF for one stakeholder, a one-page exec summary for another, a Slack-friendly version for the team channel, and a slide deck for next week's review.

This phase contains two different jobs. File conversion and template application are mostly structural. Summaries, Slack posts, and slide outlines are editorial: they select, compress, and reframe information, so they need claim-level review.

**Inputs.** The approved source document, the actual audience, and any supplied document, PDF, or presentation template.

**The shape, batched as one prompt.**

> "From this final draft, produce four exports:
>
> - **PDF version** using [SUPPLIED TEMPLATE], with cover page, ToC, page numbers, and the provided header/footer. If no template is available, do not invent brand elements.
> - **One-page executive summary** condensing the argument and the recommendation. Match my voice; don't add filler.
> - **Slack post version**: a 5–8 line summary suitable for posting to a team channel, with one link back to the full doc.
> - **5–7 slide outline** for a presentation: headline-per-slide format, one slide per major argument section, ending on the ask. Don't make me a deck yet — give me the outline first.
>
> Save each as a separate file in the project folder."

Compare every output with the approved source. For a format conversion, check completeness, links, layout, permissions, and accessibility. For a summary or slide outline, re-check every number, qualification, recommendation, and ask. This recipe stops at files in the project folder; a human approves and posts anything outbound.

---

## Workflow card — Migrate a document without losing its evidence

Sometimes the document already exists; the template changed. A spec, RFC, or design proposal now needs the current structure without losing the decisions and sources people already rely on. This is a **conservation task**, not a fresh-draft task.

Use Slash or another connected document agent, but check access before the long run starts: ask it to open both the source and the target template. If either read fails, connect the required workspace or Drive source, or paste the template into the thread. Do not let the agent infer a template it cannot read.

**Copyable request**

> "Duplicate [SOURCE DOCUMENT]. Do not modify the original.
>
> Restructure only the duplicate to follow [TARGET TEMPLATE].
>
> Rules:
> - Preserve every source link and supported claim from the original.
> - Map existing content to the best matching target section; do not silently drop content that does not map cleanly.
> - Do not invent material to fill an empty section. Mark it `[NEEDS OWNER INPUT]` and state exactly what is missing.
> - Keep the original document linked in the duplicate's sources.
>
> Before finishing, re-open the published duplicate and verify it against both inputs. Return the duplicate link, a source-to-target section map, a list of owner-input gaps, and the validation results."

**Five checks before you share it**

- [ ] The original remains unchanged.
- [ ] Every required target section exists or carries an explicit owner-input marker.
- [ ] Every original source link survives in the duplicate.
- [ ] No unsupported detail was added to make an empty section look complete.
- [ ] The published duplicate was re-opened and checked, not merely declared finished.

If any box fails, do not share the migration as complete. Fix the gap or name the owner who must close it.

This is a live internal pattern, not a hypothetical prompt: Slash has [published nine project documents while preserving their spec structure](https://razorpay.slack.com/archives/C0A94EJ38NP/p1781507279818589?thread_ts=1781506641.485349) and [migrated an existing AI Docs proposal while preserving 34 sources and passing section validation](https://razorpay.slack.com/archives/C09CG60KLMU/p1784887052481499?thread_ts=1784886439.284629).

---

## Where assistance helps — and where judgement stays human

| Task | Useful assistance | Human responsibility |
|---|---|---|
| Research synthesis | Group claims, sources, counter-evidence, and open questions | Approve source access and quality; verify decision-critical claims |
| First draft | Propose an outline and connect supplied evidence | Own the position, commitments, uncertainty, and decision rights |
| Review | Surface gaps, repetition, unclear logic, and possible objections | Decide which feedback is correct; bring in required expert reviewers |
| Repackaging | Apply a template or propose shorter audience versions | Preserve meaning, permissions, accessibility, and audience-appropriate tact |

Assume the assistant does **not** know unrecorded context, sensitive team dynamics, or who may approve a commitment. Put relevant context in the input when it is appropriate to share, and keep the final decision with the accountable human.

---

## Name the decision state before you draft

Before prompting, state whether the document is **exploratory** or **decisional**.

- For an exploratory document, provide the question, candidate hypotheses, source boundary, and evidence that would change your mind. Do not let the draft present a hypothesis as a settled recommendation.
- For a decisional document, provide the position, audience, evidence, counter-evidence, open questions, and the exact decision or ask.

The assistant can propose prose in either mode. You remain accountable for the position, evidence, and commitment. Without that boundary, a fluent draft can make an unresolved question look decided.

---

## Connecting back to the boss fight

A recurring document can be a strong boss-fight candidate when the workflow is stable enough to measure and the review burden does not erase the benefit.

Three suggestions before committing a document automation as your boss fight:

- **Pick a repeatable document type, not one document.** Define the recurring input, output, audience, and approval path.
- **Measure by phase.** Record the baseline and assisted time for research, draft, review, and export, plus corrections or rework. Automate the phase whose measured benefit survives review.
- **Package the checkpoints with the prompt.** A transferable recipe names source boundaries, claim verification, owner decisions, required reviewers, and the evidence returned at the end.

---

## What you should carry into the next chapter

- Long-form documents carry positions, evidence, and commitments; assistance does not transfer ownership.
- The four-phase lifecycle (**research → draft → review → export**) needs an author checkpoint at every phase.
- A source link is a lead, not proof. Verify decision-critical claims against the cited passage and its context.
- Name the document as exploratory or decisional before drafting, and keep unresolved questions visible.
- Review compressed exports as editorial work, not just formatting.
- The next chapter ([0B.7 — Lightweight agents](07-lightweight-agents.md)) is the next leg up from on-demand recipes — when "automate this for me" earns its keep, and how to know if you're ready for it.

---

**Previous:** [← 0B.5 Ticket automations](05-ticket-automations.md) · **Next:** [→ 0B.7 Lightweight agents](07-lightweight-agents.md)

**Further reading**
- [Lenny's Newsletter — How to write better](https://www.lennysnewsletter.com/) — for the human-side discipline that makes AI-assisted writing trustworthy
- [Will Larson — Writing as a tech lead](https://lethain.com/) — for why long-form docs that *take a position* are still the highest-leverage artefact in any senior role
- [Anthropic on long-context Claude](https://www.anthropic.com/) — useful if you start building automations that ingest very long sources (transcripts, research papers)
