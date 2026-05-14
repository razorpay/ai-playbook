---
title: "Simon Willison's three pillars"
slug: "appendices/methodologies/three-pillars"
section: "appendices"
status: "drafted"
type: "chapter"
track: "methodologies"
order: 5
time_minutes: 10
audience: "engineer"
outcome: "Use prompt, context, and harness as separate axes for diagnosing AI workflows."
prev: "appendices/methodologies/llm-wiki"
next: "appendices/methodologies/spec-first"
pillar: null
belt: null
tags: ["appendix", "frameworks", "three-pillars"]
updated: "2026-04-26"
---

# N.5 — Simon Willison's three pillars (prompt × context × harness)

> **What this section is.** The supporting frame that makes the three frameworks in N.2–N.4 legible as *complementary* rather than competing. Simon Willison's three-pillar model gives you a vocabulary for *what* each framework is doing well, and *what* each is leaving for you to handle yourself. If you want to evaluate a new framework or design your own, this is the lens.

---

## The pitch in one paragraph

Simon Willison — a long-time blogger, ex-Lanyrd founder, prolific OSS author, and one of the most-cited voices on the practical side of LLM tooling — argues that effective LLM coding work has three orthogonal dimensions: **prompt engineering** (how you phrase the immediate request), **context engineering** (what knowledge the model has when it answers), and **harness engineering** (the surrounding system that lets the model actually *do* things: read files, run commands, retry on failure). Most teams are good at one of the three, decent at a second, and quietly bad at the third. The discipline of being deliberate about all three (and especially of recognising which pillar is currently your bottleneck) is what separates teams whose AI use is impressive from teams whose AI use is *consistent.*

---

## Why this frame matters

Most of the AI-tooling discourse from 2023–2024 was about *prompt engineering* — the craft of phrasing requests carefully. By 2025 the conversation had shifted heavily to *context engineering*: what files, what state, what memory the model could see. The third pillar (*harness engineering*, the runtime around the model) has been quietly the most consequential and the least discussed.

Willison's contribution was to *name* the three together, to argue they're orthogonal (improvements in one don't substitute for the others), and to point out that **the bottleneck for most teams in 2026 is the harness, not the prompt or the context**. Once you read his framing, you start to notice this everywhere — a clever prompt that fails because the harness can't actually run the test it suggested; a beautifully maintained CLAUDE.md that doesn't help because the harness doesn't read it on every session; an elaborate skill library that breaks because the harness's permissions are too restrictive.

The frame is useful in three contexts in particular: when you're *evaluating* a framework (which pillars does it strengthen?), when you're *teaching* a teammate (which pillar is failing them right now?), and when you're *designing* your own tooling (which pillar are you accidentally neglecting?).

---

## The three pillars, examined

### Prompt engineering

**What it is.** The craft of constructing the *immediate request* you make to the model: the words, the structure, the examples, the constraints, the expected output format. Prompt engineering is the most-public of the three pillars; entire books are written about it.

**What good looks like.** Clear intent ("here's what I want done"). Stated constraints ("must not touch these files; output must be valid JSON"). Worked examples when the task is unusual ("here's a similar task and the answer I'd accept"). Explicit success criteria ("verify by running the test suite and showing me the output"). Goldilocks specificity — detailed enough that the model can't drift, not so detailed that it becomes brittle.

**Common failure mode.** Vague prompts. *"Help me write better code"* is not a prompt; it's a wish. The fix is rarely "add more words" — usually it's "name the *outcome* you want." Most prompts that fail can be rescued by adding three sentences about what the output should look like.

**What makes it improve over time.** Practice + reading other people's prompts. Many communities (the LessWrong-adjacent / AI Alignment Forum / the OpenAI Cookbook) maintain libraries of well-shaped prompts you can study. It's a real craft and gets meaningfully better with reps.

### Context engineering

**What it is.** The work of *what the model knows* when it answers: what files, what conversation history, what memory, what reference material is loaded into the context window. Context engineering is the discipline N.1–N.4 of this appendix are mostly about.

**What good looks like.** A `CLAUDE.md` schema that loads on every session. A KB structured so the right pages are findable. A discipline of *fresh windows* on a per-task basis (the GSD insight). A skill library that progressively discloses — small enough to load, deep enough to help. Cross-session memory that survives crashes. Explicit prompt patterns that pull *less* into context, not more, when the model doesn't need it.

**Common failure mode.** Context bloat. Loading too much, too eagerly, on every prompt. The model gets tired (in measurable ways — recall on early-context items degrades) and your token bill grows. The fix is usually *editorial* — what's the smallest set of context that lets the model do this task well? (and rarely *additive*) what extra thing can I shove in?

**What makes it improve over time.** Reading the framework profiles in N.2–N.4 is a strong start. Building one minimum viable wiki (recipe in [N.7](N7-minimum-viable-wiki.md)) and using it for a month is the next tier. After that, context engineering becomes intuition you build over years; there's no shortcut.

### Harness engineering

**What it is.** The system *around* the model — the thing that lets the model take actions in the world. The harness reads files for the model. Runs shell commands for the model. Retries when something fails. Manages permissions. Composes tools (MCPs, connectors). Tracks state across turns. Without a harness, an LLM is a chat box; with a harness, an LLM is an *agent*.

**What good looks like.** A harness that can read and write files reliably (Claude Code does this). A harness that can run tests and capture output (Claude Code does this). A harness with a permission model that's strict enough to prevent disasters and loose enough to not feel like obstruction (Claude Code's `y / n / a` model is roughly this). A harness with hooks and slash commands that automate the *pre-flight* (gstack and GSD both invest heavily here). A harness with persistent memory (auto-memory; per-session state).

**Common failure mode.** Outsized faith in the model, no investment in the harness. *"The model will figure it out"* leads to brittle workflows where one wrong tool call cascades into ten more. The fix is to *invest in the harness as a first-class engineering surface*: write hooks that catch known failures, add `pre-ship-check`-style gates, build retry-with-context-on-error patterns. Most teams underinvest here by an order of magnitude relative to how much they invest in prompts.

**What makes it improve over time.** This is the hardest pillar to improve, because it requires actual coding (writing hooks, MCPs, skills). It's also the pillar where investment compounds the most. A harness improvement made today benefits every session for the next year.

---

## Why the three are orthogonal

It's worth dwelling on Willison's strong claim: improvements in one pillar don't substitute for the others.

**A great prompt against poor context still fails.** You can phrase a code-change request beautifully, but if the model can't see the file you're talking about (because your harness didn't load it, or your context window is already full of unrelated material), the prompt doesn't matter.

**A great context against a weak prompt produces fluent confusion.** All the right files are loaded. All the right history is in memory. Your prompt is *"do something useful here"* — the model produces a confidently-wrong answer because the prompt didn't tell it what *useful* meant.

**A great prompt and great context against a weak harness can't act.** You phrased the request perfectly. You loaded exactly the right context. The model says *"I'd run the test suite to verify, but I don't have permission to execute commands."* You spend the next 20 minutes copy-pasting test output back into the chat. The harness was the bottleneck.

The orthogonality isn't a hypothesis; it's been the lived experience of any team that's tried to scale AI use beyond a single power user. *Each pillar can be the bottleneck. Identifying which one is, right now, is the move.*

---

## How the three frameworks distribute across the pillars

A useful exercise: place each of the frameworks profiled in N.2–N.4 against the three pillars.

**gstack** ([N.2](N2-gstack.md)) is overwhelmingly a *prompt-and-context* framework. The 23 specialist skills are essentially specialised prompts. GBrain is a context layer. The harness is whatever Claude Code provides — gstack mostly inherits it. *gstack's contribution is in the first two pillars; the harness is borrowed.*

**Get Shit Done** ([N.3](N3-gsd.md)) is the most *harness-heavy* of the three. Wave execution, fresh windows per atomic plan, the verifier-and-debugger loop, the prompt-injection hooks — these are all harness-engineering moves. GSD also has strong context discipline (the `.planning/` directory) but its distinctive contribution is the harness pattern. *GSD invests where most teams underinvest.*

**The LLM Wiki pattern** ([N.4](N4-llm-wiki.md)) is purely a *context* framework. It says nothing about how prompts should be phrased and nothing about what harness should run them. Its claim is entirely about how knowledge should be structured and maintained as the model's context. *The Wiki is the most context-pure of the three.*

If you read all three, you've now triangulated the field: one framework heavy on prompt+context, one heavy on harness, one pure on context. *The synthesis is the lens.*

---

## How this maps to the playbook

Every belt in this playbook can be read against the three pillars:

- **White Belt** is mostly *harness*: install the tools, configure the permissions, get the environment GREEN. A small amount of *prompt* training (W.10) and *context* training (W.7).
- **Yellow Belt** balances *prompt* and *context*: Y.3 is prompt deep-dive, Y.4 and Y.5 are context (CLAUDE.md, what Claude can see). The boss-fight exercises *all three.*
- **Green Belt Part A** is *context-heavy* (CLAUDE.md, hierarchical CLAUDE.md, skills, subagents) with a strong *harness* component (worktrees, hooks, slash commands).
- **Green Belt Part B** is mostly *harness* practices (Playwright + Claude Code, the Design Preview Platform, observability).
- **Black Belt Part A** is *harness* at the platform level: authoring MCPs, skills packs, plugins.
- **Black Belt Part B** balances *prompt* (evals, A/B testing) with *context* (memory systems, progressive disclosure).

Some curriculum artefacts use `Meta` as a tag. Treat that as a belt-program label for learning hygiene (staying current, logging daily practice, reflecting on evidence) not as a fourth technical pillar. When diagnosing an AI failure, stay with the three questions: prompt, context, or harness?

A reader who finishes the playbook isn't equally strong in all three pillars (that takes years of practice) but they should at minimum be able to *name* which pillar a given problem lives in. That's the diagnostic.

---

## Using the lens in real time

Three places the three-pillar lens earns its keep day-to-day.

**When AI is failing you.** Stop and ask: *which pillar?* Is the prompt unclear? Is the context wrong? Is the harness blocking the action you want? The diagnosis points at the fix.

**When evaluating a new framework.** Some frameworks claim to revolutionise everything; most actually move the needle on one pillar. Map the framework onto prompt / context / harness and you'll see what it's *really* selling. Then decide whether that's the pillar you need help with.

**When teaching a teammate.** When someone says *"AI doesn't really work for me"*, the next question is *"in which pillar?"* — and you can show them the framing. Most teaching that lands well lands because the teacher named the pillar the learner was stuck on, not because the teacher answered a different question more loudly.

---

## A small cautionary note

The three-pillar frame is a *teaching tool*, not a complete theory. There are real tensions and trade-offs the frame doesn't capture: between context size and latency, between harness sophistication and operational complexity, between prompt brittleness and prompt portability. Experienced practitioners hold all three pillars *and* the trade-offs between them.

The frame is most useful as the on-ramp from *"AI is a black box"* to *"AI is a system with named parts I can investigate."* Use it for that, and graduate when the trade-offs start mattering more than the vocabulary.

---

**Up to:** [↑ Appendix N README](README.md) · **Previous:** [← N.4 The LLM Wiki pattern](N4-llm-wiki.md) · **Next:** [→ N.6 Spec-first / agentic-loop design](N6-spec-first.md)

**Further reading**
- [Simon Willison — designing agentic loops](https://simonwillison.net/2025/Oct/15/designing-agentic-loops/) — the canonical blog post laying out the three-pillar model
- [Simon Willison's blog](https://simonwillison.net/) — for the running commentary on practical LLM tooling that informed most of this appendix
- [Anthropic's Model Context Protocol](https://modelcontextprotocol.io/) — the open standard the harness pillar is increasingly built on
