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
outcome: "Use AI to research, draft, review, and export documents with less blank-page friction."
prev: "ops-101/ticket-automations"
next: "ops-101/lightweight-agents"
pillar: null
belt: null
tags: ["ops-101", "documents"]
updated: "2026-04-26"
---

# 0B.6 — Document workflows

> **⏱ 30 minutes · 👥 PMs, designers, anyone whose week has writing in it · 🎯 Leaves with:** four concrete recipes spanning the document lifecycle (research, draft, review, export) and the discipline that makes a long-form document *yours* even when AI did most of the typing.

---

## Why documents get their own chapter

Triage (0B.3) sorts inputs. Generation (0B.4) produces short outputs from messy sources. Tickets (0B.5) draft commitments that other people read. **Documents** are different — they're *long-form artefacts that represent a position*. A spec, a brief, an RFC, a competitive analysis, a research synthesis, a strategic memo. They take longer to produce. They're read by more people. They survive longer. And (most importantly) your reputation rides on them in a way it doesn't on a triaged email or a status digest.

That higher stakes means a different relationship with AI. In document workflows you're not asking AI to *replace* your writing; you're asking it to absorb the parts of writing that aren't *thinking*. The research that needs to happen anyway. The first draft that just gets you off the blank page. The line-edit pass for clarity. The export-to-PDF dance.

This chapter is the longest in Ops 101 because the recipes are bigger and the discipline is more important. Take it slow. The hour you invest in the discipline pays off across years of writing.

---

## The four-phase document lifecycle

Almost every long-form document moves through the same four phases:

1. **Research** — gathering inputs. Reading what exists, talking to who knows things, taking notes. The phase where you figure out *what's true*.
2. **Draft** — producing a structured first version. Outline, headings, prose under each heading. The phase where you figure out *what you're arguing*.
3. **Review** — refining the draft. Sharpening prose, catching errors, integrating feedback, checking the structure still serves the argument. The phase where you figure out *whether it lands*.
4. **Export** — publishing the artefact. PDF, deck, doc share, post. The phase where you figure out *how it travels*.

Each phase has different leverage points for AI. Research is high-leverage, low-risk. Draft is high-leverage, medium-risk (the AI might invent things). Review is medium-leverage, low-risk. Export is the most automatable and the lowest-risk of the four — almost pure formatting.

The key discipline: **you're the author at every phase.** AI never *finishes* a document for you in this track. AI accelerates the phase you're in, but the next phase always starts in your head.

---

## Recipe 1 — Research synthesis (45-minute setup, hours saved per piece)

The research phase is where most document time disappears. You read four articles, three internal docs, two transcripts from interviews. You take notes, but they're scattered. You try to identify themes. You realise you don't remember which insight came from which source. You re-read.

AI eats this whole loop, with one critical discipline: **every claim has a source link**.

**Connectors.** Whatever holds your sources — Drive / Docs / web articles / meeting transcripts / a knowledge base.

**The shape.**

> "I'm researching [TOPIC]. Here are the sources I want you to consider [list of links / files]. Also: feel free to retrieve any additional sources you think are relevant via web search.
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

The output isn't your draft. It's the *raw material* you'll use to write your draft. Read it. Verify the source links. Disagree where your gut says something different from what the AI synthesised. Take it as a *starting position* for your own thinking, not a finished argument.

**Reliability tip.** The "no source for this" instruction is doing a lot of work. AI is built to confidently fill gaps, and research syntheses are exactly the kind of artefact where confident gap-filling is dangerous (a wrong claim with a footnote sounds authoritative). Train yourself to scan for any bullet without a link and treat it as suspect.

**The discipline that makes this recipe trustworthy.** Spot-check three to five of the source links every time. Click them. Read the bit the AI cited. Confirm it actually says what the AI claims. *Without spot-checks, the recipe degrades into elegant fiction.* The five-minute spot-check is what keeps the synthesis honest.

---

## Recipe 2 — First-draft scaffolding (30-minute setup, ~half a day saved per long doc)

Once you have a research synthesis (Recipe 1) and a clear position you want to argue, the next phase is the dreaded blank-page first draft.

AI is at its best here. The *structure* of a first draft is largely formulaic: outline, sections, paragraphs under each section. Your *argument* is what's unique. AI does the formula; you provide the argument; the draft assembles much faster than from a blank page.

**Connectors.** Your research synthesis from Recipe 1, plus any prior docs you want the draft to align with stylistically.

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

Read the draft. Most of it will be 70–80% there. The headings and structure usually land first try; the prose under each heading needs your touch. Edit the parts that read off-key, replace any AI-shaped sentences with sentences that sound like *you*, and tighten anything that feels padded.

**The discipline that makes this recipe trustworthy.** *You write the executive summary yourself.* AI can produce a workable opening, but the executive summary is where the argument is most condensed; if any sentence in the doc is going to be quoted, it'll be from there. Edit that paragraph until it sounds entirely like you. The rest of the draft can be 80% AI without anyone noticing; the executive summary cannot be.

**A specific failure mode.** AI will, given the chance, produce a draft that's too *hedged* — full of "it's important to consider" and "various stakeholders may feel." Your real voice is sharper. After the AI draft, do a pass where you *delete every hedge that doesn't earn its place.* The doc gets stronger every time you do.

---

## Recipe 3 — Review and tightening (15-minute setup, ~30 minutes saved per review)

You have a draft. You're looking at it. You know it could be better but you're not sure exactly how. AI is great at *naming what's off*.

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

The output is a *review*, not a rewrite. You read it, you adjudicate each suggestion, you take the ones that match what you wanted to argue and drop the ones that don't.

**Reliability tip.** Run this recipe at least *twice* — once after your first edit pass, again after your second. The second run catches things the first didn't because the doc has changed shape. After the third pass, returns diminish; ship it.

**A specific tip.** When you ask for "AI-generated filler" detection, the AI will sometimes flag *its own* writing back at you. That's the desired outcome. You want it to be more honest than your earlier prompt allowed it to be. The "flag what sounds generic" instruction is the discipline.

---

## Recipe 4 — Export and packaging (10-minute setup, ~30 minutes saved per export)

You've got the draft you want to ship. Now you need it as a PDF for one stakeholder, a one-page exec summary for another, a Slack-friendly version for the team channel, and a slide deck for next week's review.

This is the most automatable phase. *Export is mostly formatting.*

**Connectors.** Your document tools (Workspace docs, PDF tools, presentation tools, the Slack connector for posting).

**The shape, batched as one prompt.**

> "From this final draft, produce four exports:
>
> - **PDF version** with cover page, ToC, page numbers, and the standard Razorpay-style header/footer.
> - **One-page executive summary** condensing the argument and the recommendation. Match my voice; don't add filler.
> - **Slack post version**: a 5–8 line summary suitable for posting to a team channel, with one link back to the full doc.
> - **5–7 slide outline** for a presentation: headline-per-slide format, one slide per major argument section, ending on the ask. Don't make me a deck yet — give me the outline first.
>
> Save each as a separate file in the project folder."

Review each, ship each. The PDF and the slide outline you'll typically tweak; the Slack post and the exec summary usually go untouched.

**Reliability tip.** Don't let AI auto-post anything outbound. The export recipe stops at *files in the project folder*; the human posts. The cost of an auto-posted summary with one wrong claim is too high relative to the seconds saved by skipping the review click.

---

## What document automations are and aren't good at

The honest list.

**Good at:**

- Research synthesis with explicit source-linking.
- Structured first drafts with logical scaffolding.
- Critique passes that surface what a draft is missing or fudging.
- Re-formatting and re-packaging the same content for different audiences.
- Imitating your voice once you've shown it a few examples.

**Not good at, yet:**

- Original *position*. AI is great at writing the case *for* an argument you've decided on; it's not great at deciding what argument to make. *That's still your job.*
- Audience-specific tact. The doc that needs to read carefully because of a sensitive political situation between two teams can't be entrusted to AI alone — you need to feel the room.
- Unspoken context. Anything that depends on what was said in the hallway last week. AI will sound right and miss the actual subtext.
- Ending the document well. Conclusions are where AI most often falls into stock phrases. Write your own last paragraph; everything else can be AI-assisted.

---

## The single discipline that makes document AI work

If you skipped to this section, this is the takeaway:

**Decide the argument before opening any AI prompt.**

If you start with *"help me write a brief about X"* you'll get a generic-shaped brief that's organised around X but argues nothing. If you start with *"I want to argue that we should do Y because of Z, and I want to use these three pieces of evidence"* you'll get a draft that sharpens *your* argument.

The AI is a writer. You are still the *author*. The author's contribution is the position; the writer's contribution is the prose. Confuse the two and you produce documents that read fluently and decide nothing. Keep them separate and AI gives you back hours of every long-doc-shaped week of your life.

---

## Connecting back to the boss fight

A document automation that turns a recurring multi-hour writeup into a 30-minute one is a strong boss-fight candidate, especially for PMs and designers whose week has multiple recurring documents in it.

Three suggestions before committing a document automation as your boss fight:

- **Pick the document type, not a single document.** If you write a competitive analysis once a quarter, the boss-fight is the *recipe* for any future competitive analysis — measurable across a quarter.
- **Recipe 1 + Recipe 2 is the highest-leverage pairing.** Research synthesis with source-linking, plus first-draft scaffolding from that synthesis. Together they collapse the 0-to-rough-draft phase from a day to a couple of hours.
- **Document the discipline alongside the recipe.** The recipe is *prompt + connector list*; the discipline is *what you, the human, must still do at each phase*. The discipline is what makes the recipe transferable to a teammate.

---

## What you should carry into the next chapter

- Documents are *positions*, and the AI's job is to absorb the parts of producing them that aren't *thinking*.
- The four-phase lifecycle (**research → draft → review → export**) has different AI leverage at each phase.
- *Every claim has a source link.* The five-minute spot-check on the research synthesis is what keeps it honest.
- AI is the writer; you are the author. Decide the argument before any prompt.
- Hedging is the most common AI tic in long docs. Delete every hedge that doesn't earn its place.
- The next chapter ([0B.7 — Lightweight agents](07-lightweight-agents.md)) is the next leg up from on-demand recipes — when "automate this for me" earns its keep, and how to know if you're ready for it.

---

**Previous:** [← 0B.5 Ticket automations](05-ticket-automations.md) · **Next:** [→ 0B.7 Lightweight agents](07-lightweight-agents.md)

**Further reading**
- [Lenny's Newsletter — How to write better](https://www.lennysnewsletter.com/) — for the human-side discipline that makes AI-assisted writing trustworthy
- [Will Larson — Writing as a tech lead](https://lethain.com/) — for why long-form docs that *take a position* are still the highest-leverage artefact in any senior role
- [Anthropic on long-context Claude](https://www.anthropic.com/) — useful if you start building automations that ingest very long sources (transcripts, research papers)
