---
title: "Get Shit Done"
slug: "appendices/methodologies/gsd"
section: "appendices"
status: "drafted"
type: "chapter"
track: "methodologies"
order: 3
time_minutes: 12
audience: "engineer"
outcome: "Understand GSD as a spec-first, context-engineering workflow pattern."
prev: "appendices/methodologies/gstack"
next: "appendices/methodologies/llm-wiki"
pillar: null
belt: null
tags: ["appendix", "frameworks", "gsd"]
updated: "2026-04-26"
---

# N.3 — Get Shit Done (TÂCHES)

> **What this section is.** A deep profile of the second of the three frameworks named in [Prologue §0.7](../../prologue/07-operating-principles.md). Get Shit Done is the most *structurally* developed of the three; it materialises the abstract idea of knowledge-base-driven development into a concrete directory layout, a wave-based execution model, and a discipline against context rot. This profile mirrors the structure of [N.2](N2-gstack.md) for easy comparison.

---

## The pitch in one paragraph

Get Shit Done (*GSD* in shorthand) is a framework that turns a vague *"I want to build X"* into a structured *discuss → plan → execute → verify → ship* workflow, materialised as a `.planning/` directory in your repo that holds the project's persistent context across sessions and across teammates. Each phase produces specific files (`PROJECT.md`, `REQUIREMENTS.md`, `ROADMAP.md`, `STATE.md`, per-phase plans in XML), and execution runs in *waves* — orchestrated subagents working in dependency order, each with its own fresh context window scoped to one atomic task. The framework's tagline — *"Claude Code is powerful. GSD makes it reliable"*: captures the central claim: the bottleneck of AI-assisted work isn't model capability, it's context discipline, and GSD is a discipline you can install.

---

## The author and the moment

GSD is authored by **TÂCHES**: a solo developer presenting under a pseudonym, with a deliberate cult-status branding (Discord community, social presence, even a meme-ish token). The repo at `gsd-build/get-shit-done` has somewhere north of 50,000 stars and ships a release every few days at the time of writing — a level of activity that signals genuine traction *and* a moving target.

Two reasons GSD matters as an artefact:

The first is that it is **the most architecturally complete answer** in public to the question *"how do I structure a real project so that AI assistance compounds rather than resets every session?"* Where gstack ([N.2](N2-gstack.md)) gives you specialised role-skills, and Karpathy's LLM Wiki pattern ([N.4](N4-llm-wiki.md)) gives you a manifesto, GSD gives you a *directory layout*: files with specific names, specific contents, specific lifecycles. It's the most *transcribable* of the three frameworks; you can adopt 30% of GSD without adopting the rest, and that 30% might be exactly the directory layout.

The second is that GSD names a specific problem (**context rot**) that most AI-tooling discussions in 2026 don't have a vocabulary for. Context rot is the slow degradation of an AI agent's effectiveness as a single conversation accumulates stale instructions, half-finished tangents, and contradictory facts. GSD's "fresh window per atomic task" pattern is the architectural answer; whether or not you adopt GSD wholesale, having a name for the problem is itself useful. The framework is worth a read just for the vocabulary.

---

## The shape of the framework

The mental picture worth carrying:

```
   ┌─────────────────────────────────────────────────────────────┐
   │                      YOU (the builder)                       │
   └────────────────────────────▲────────────────────────────────┘
                                │ summons (via /gsd-* slash commands)
   ┌────────────────────────────┴────────────────────────────────┐
   │   Phase commands — discuss / plan / execute / verify / ship  │
   │                                                              │
   │   /gsd-new-project        /gsd-discuss-phase                │
   │   /gsd-plan-phase         /gsd-execute-phase                │
   │   /gsd-verify-work        /gsd-ship                          │
   │   /gsd-next               (auto-picks the right next step)   │
   │   /gsd-quick  /gsd-fast   (for ad-hoc work)                  │
   └────────────────────────────▲────────────────────────────────┘
                                │ all read from / write to
   ┌────────────────────────────┴────────────────────────────────┐
   │   The .planning/ directory                                  │
   │   ├── PROJECT.md       (vision)                              │
   │   ├── REQUIREMENTS.md  (what good looks like)               │
   │   ├── ROADMAP.md       (phases, milestones)                 │
   │   ├── STATE.md         ← cross-session memory               │
   │   ├── CONTEXT.md       (per-phase, refreshed)               │
   │   ├── RESEARCH.md      (ecosystem knowledge)                │
   │   ├── {phase}-{N}-PLAN.md  (XML, one fresh window each)     │
   │   ├── SUMMARY.md       VERIFICATION.md   UAT.md             │
   │   └── todos/  threads/  seeds/                              │
   └─────────────────────────────────────────────────────────────┘
                                │ executes via
   ┌────────────────────────────┴────────────────────────────────┐
   │   Subagent waves — each agent gets a fresh 200K window      │
   │   scoped to ONE atomic plan in XML                          │
   │   Independent plans run in parallel; dependent ones serialise │
   └─────────────────────────────────────────────────────────────┘
```

Three things in that picture matter more than the specific commands.

**The `.planning/` directory is a knowledge base materialised as filesystem.** Where gstack's GBrain is an MCP-exposed KB and Karpathy's wiki is a folder of pages, GSD is *opinionated* about exactly which files exist and what each contains. `STATE.md` is cross-session memory. `RESEARCH.md` is ecosystem knowledge. `seeds/` is forward-looking ideas held until the right phase. Each file has a job; each lifecycle is named. The opinionation is the point — there's nothing to decide on day one, you just adopt the layout.

**XML plans, sized for fresh context windows.** Each unit of work (*one atomic plan*) is an XML file with a structure like `<task><files><action><verify><done>`. The plan is sized to fit in a single 200,000-token window comfortably. When the work is executed, it runs in a *new* Claude session that loads only that plan plus the relevant context, untainted by whatever happened in the planning phase. *This is the architectural trick that defeats context rot.* The planning session is over before execution starts; the execution session never sees the planning session's residue.

**Wave execution.** When several plans are ready, GSD runs them in *waves* — independent plans (that don't depend on each other's outputs) run in parallel, each in its own subagent with its own context. Dependent plans serialise, with the output of one feeding the input of the next. The orchestrator (the parent agent) just coordinates; the work happens in fresh, narrow contexts. This is closer to how a real engineering manager runs a sprint than how a conventional Claude Code session runs.

---

## What's specifically interesting about it

A few things GSD does that are worth noticing whether or not you adopt the framework.

**The discipline of "one atomic plan per fresh window."** Most builders, used to one long session that accumulates context, can't believe at first that *throwing away* the context between phases is a feature. The discipline takes a couple of sessions to internalise, but once it lands, you stop seeing AI sessions as conversations and start seeing them as *transactions*. Each transaction has a narrow input, a narrow scope, a narrow output. The cost of this approach is more upfront planning work; the benefit is much higher per-execution reliability. GSD has done the experiment and the trade favours discipline.

**The XML structure of plans.** It looks corporate; it isn't. The XML scaffolding (`<task>`, `<files>`, `<action>`, `<verify>`, `<done>`) is exactly the structure that makes a plan *executable* by a fresh agent that's never seen it before. Each tag is a question the plan must answer: *what are we doing, which files does it touch, what specific action, how do we verify, when is it done*. The framework forces you to specify all five before any execution starts. That specification *is* the planning work; once it's done, execution is mechanical.

**`STATE.md` as the cross-session ground truth.** Of all the files in `.planning/`, `STATE.md` is the load-bearing one. It's the page every fresh agent reads first to know "where are we?": what's done, what's in flight, what's blocked, what was last decided. The discipline of keeping `STATE.md` honest (it's allowed to be stale only if something has gone wrong) is what makes the rest of the framework work. If `STATE.md` is wrong, every downstream agent drifts; if it's right, every downstream agent inherits the truth.

**The verifier-and-debugger loop.** GSD doesn't just execute plans and ship; it pairs an executor agent with a verifier agent that *checks* whether the plan was actually achieved as written. Discrepancies trigger a debugger pass. This is multi-agent orchestration at its most pragmatic — not "agents collaborating creatively," but agents *checking each other's work* on a clear contract. It's also the part of the framework that's most broadly applicable; many teams who adopt GSD only adopt this one pattern and find it transformative.

---

## What to lift

Three patterns from GSD that you can apply tomorrow without installing the framework.

**Adopt a `.planning/` directory.** Not necessarily with GSD's exact files, but *with named files for named jobs*. Pick three: a `STATE.md` for cross-session state, a `ROADMAP.md` for milestone planning, and a `CONTEXT.md` per active workstream. Commit the directory to your repo. *Make the AI write to it.* The shape is half the value; the specific files matter less than the discipline of having them.

**Atomic plans in fresh windows.** When you have a non-trivial task, *don't* keep extending one Claude session with more and more context. Instead: spend 15 minutes specifying the task as a small plan (a markdown file is fine; XML is overkill for most teams), then start a *new* session to execute the plan against just that file plus the strictly relevant code. The fresh-window discipline is the most powerful single technique in GSD; you can adopt it without any of the rest.

**Verifier-and-debugger pairing.** When you've made a non-trivial change, run a *second* Claude pass that's explicitly set up to *verify* the change against the plan, with no memory of the planning session. The verifier reads the plan, reads the diff, and answers one question: *did this actually do what was planned?* You'd be surprised how often the verifier surfaces a gap the executor confidently skipped. This is a 5-minute habit; the bug-catch rate is high.

---

## What to leave

A few honest cautions.

**The framework is heavy.** GSD has dozens of slash commands, several configuration files, model-tier preferences for different stages, hooks for prompt-injection defence, and an installer that prefers `--dangerously-skip-permissions`. A team adopting it wholesale has signed up for a real piece of infrastructure. For a small team, the cost-benefit doesn't always pencil; you might be better off lifting the patterns and skipping the apparatus.

**The voice is anti-corporate by design.** The README and tooling lean into a *"no enterprise roleplay bullshit"* posture, with branding that includes a cryptocurrency token. Whether this is charming or off-putting depends on your team's culture. For a regulated-fintech context, it can read as performative. None of the *engineering* in GSD is affected by the voice; the voice just sometimes makes it harder to sell internally.

**Velocity of change.** GSD ships releases every few days. That's energising as a community member; it's painful as a dependency. If you adopt, version-pin aggressively. The recipe that worked last week may need adjusting this week. *Track the changelog like a hawk* if GSD is in your critical path.

**The orchestration is opinionated.** The wave model (independent plans parallel, dependent ones serial) is a real opinion about how work should flow. It works beautifully for some workloads (greenfield builds, refactors with clean dependency graphs). It fits less well for others (incident response, exploratory bug-hunting, work where the dependency graph isn't knowable upfront). Be aware of the kinds of work the framework was designed for, and don't force-fit it onto work shaped differently.

---

## When GSD is the right reach

If you're starting a multi-week project where the work decomposes into clearly-bounded tasks with knowable dependencies (a feature build, a migration, a refactor of a well-understood subsystem) GSD's wave model can compress weeks of effort into days, and the `.planning/` discipline keeps the work coordinatable across sessions.

If you're a team of 2–5 who want a shared discipline, the framework's directory layout works as a contract — every member can pick up where another left off, because the state is in files everyone can read.

If you're working on something *exploratory* — early product discovery, debugging a system you don't understand, research-shaped work — GSD's structure can feel premature. The lighter-weight pattern is the LLM Wiki ([N.4](N4-llm-wiki.md)) or the minimum viable wiki recipe ([N.7](N7-minimum-viable-wiki.md)).

If you only have time for one framework profile in this appendix and you want the *most directly transcribable* set of patterns, read GSD. The directory shape, the XML plans, the verifier loop: those three alone, lifted into a Razorpay project, would be a genuine upgrade for most teams' AI workflows.

---

## How GSD maps to the other parts of this playbook

A short cross-reference for readers who'll come back to this section after reading further:

- **GSD's `.planning/` directory** ↔ the [Razorpay Knowledge Base](../../prologue/04-enablement-stack.md) (Layer 3 of the Enablement Stack). At project scale, GSD's `.planning/` is what each team should have; at org scale, the Knowledge Base layer is the same idea spread across product surfaces.
- **GSD's atomic XML plans + fresh windows** ↔ Green Belt Part A's *worktrees* and *subagents* chapters. Worktrees are the harness mechanism; subagents-with-fresh-windows are the discipline. Different vocabulary, same architectural thesis.
- **GSD's verifier-and-debugger loop** ↔ the *pre-ship-check* and *PR-guardrail* skills. Razorpay's existing skills implement the same pattern at the ship gate; GSD does it at every plan boundary. You can have both.

You don't need any of these mappings to read the playbook — but if you've used GSD, the mappings will help you locate yourself faster inside the belts.

---

**Up to:** [↑ Appendix N README](README.md) · **Previous:** [← N.2 gstack](N2-gstack.md) · **Next:** [→ N.4 The LLM Wiki pattern](N4-llm-wiki.md)

**Further reading**
- [Get Shit Done on GitHub](https://github.com/gsd-build/get-shit-done) — the canonical source. Read the README, the `.planning/` schema docs, and one or two phase definitions before forming an opinion
- [Anthropic on Claude Code subagents](https://code.claude.com/docs) — the platform-level doc for the harness GSD's wave execution sits on top of
- [Simon Willison — designing agentic loops](https://simonwillison.net/2025/Oct/15/designing-agentic-loops/) — the harness-engineering frame that explains *why* fresh windows beat long sessions
