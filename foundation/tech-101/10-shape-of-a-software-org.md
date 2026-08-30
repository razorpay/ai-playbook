---
title: "Shape of a software org: roles, teams, and decision rights"
slug: "tech-101/shape-of-a-software-org"
section: "foundation"
status: "drafted"
type: "chapter"
track: "tech-101"
order: 10
time_minutes: 12
audience: "anyone-curious"
outcome: "Read a software org chart without mistaking job titles for fixed ownership, and map the decision rights on a product team."
prev: "tech-101/tests"
next: null
pillar: null
belt: null
tags: ["tech-101", "org-design", "roles", "teams"]
updated: "2026-08-30"
---

# 0A.10 — Shape of a software org: roles, teams, and decision rights

> **⏱ 12 minutes · 👥 Anyone curious · 🎯 Leaves with:** a practical map of common software roles, shared ownership, and the questions to ask when the org chart is not enough.

---

## The one-paragraph answer

**Software organisations divide work into roles, but products ship through teams.** Titles such as product manager, designer, engineer, tech lead, engineering manager, and SRE describe common areas of focus. They do not create universal borders. The useful questions are: *who is accountable for this decision, who contributes evidence, who approves a high-risk change, and who operates the result?* Answer those for the work in front of you instead of inferring them from a generic org chart.

---

## Start with responsibilities, not stereotypes

The same responsibilities recur across software organisations: understand a problem, design an experience, build a system, test it, release it, and keep it reliable. Different companies split them differently. A small pod may combine several in one person; a regulated or platform-heavy product may add specialists.

These roles are common, but the boundaries are local:

### Software engineer

**Usually focuses on:** designing, building, reviewing, testing, releasing, and operating software. Frontend, backend, mobile, data, and infrastructure describe areas of focus, not sealed rooms.

**Do not assume:** engineers receive a finished specification and merely type it. Good engineers shape scope, expose constraints, test assumptions, and share responsibility for outcomes and reliability.

### Product manager (PM)

**Usually focuses on:** customer and business outcomes, problem framing, priorities, trade-offs, and making sure decisions are explicit. PMs connect evidence from users, data, design, engineering, operations, risk, and commercial teams.

**Do not assume:** the PM owns every decision or dictates implementation. Product direction is stronger when PM, design, and engineering challenge one another with evidence.

### Product designer

**Usually focuses on:** user research, task flows, interaction, information architecture, content, visual systems, prototypes, and experience quality across happy and unhappy paths.

**Do not assume:** design ends when a mock-up is handed over. Designers help discover the problem, test options, inspect the built experience, and learn from production behaviour.

### Engineering manager (EM)

**Usually focuses on:** people leadership, team health, capability, sustainable delivery, and the environment in which engineers do good work. Some EMs remain deeply technical; others lead through coaching and organisational design.

**Do not assume:** the EM automatically owns the product roadmap or every technical choice. The exact split with PMs and technical leaders varies by team.

### Technical lead / staff engineer

**Usually focuses on:** technical direction, architecture, difficult trade-offs, engineering standards, and risks that cross components or teams. This is often an individual-contributor leadership path.

**Do not assume:** “tech lead” is a mandatory promotion step before management. Technical leadership and people management are different careers, even when one person temporarily performs both.

### Quality, reliability, security, data, research, and operations specialists

Teams add specialist roles when the product and risk justify them. A quality engineer may design test strategy and tooling. An SRE may apply software engineering to reliability and operations. Security, data, analytics, research, legal, compliance, support, or go-to-market partners may own or approve decisions in their domain.

**Do not assume:** specialists are a final checkpoint for work created elsewhere. Quality and reliability are shared responsibilities, and specialist involvement should begin before the costly decisions harden. SRE and DevOps are also not interchangeable job titles: SRE is an engineering approach to reliability; DevOps is a broader set of cultural and delivery practices.

---

## The product team: one outcome, several kinds of expertise

A common product team looks roughly like this:

```text
                 shared product outcome
                          │
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
     Product          Design         Engineering
   problem, value   user experience   system behaviour
          │               │               │
          └───────────────┼───────────────┘
                          ▼
             evidence, decisions, delivery
                          │
              specialists join by need
      data · research · risk · security · SRE · support
```

The triangle is a collaboration model, not a claim that three people decide everything. The team still needs named decision rights. A payment-flow change may require Risk or Compliance approval. A platform migration may have a technical DRI. A research finding can reopen the problem definition. “Cross-functional” means the required expertise is in the loop; it does not mean accountability is fuzzy.

### Copy this decision-rights card

Use this before a consequential piece of work. If the DRI or approval boundary is blank, the org chart will not rescue the project later.

```text
OUTCOME: <what should change for the user or business?>
DECISION: <the specific choice being made>
DRI: <one role accountable for making and recording this decision>
CONTRIBUTORS: <roles supplying options, constraints, or evidence>
EVIDENCE: <research, data, prototype, technical spike, policy>
APPROVAL / VETO: <who must approve because of risk or regulation?>
OPERATOR: <who owns the result after release?>
ESCALATION: <where does unresolved disagreement go?>
REVIEW DATE: <when will evidence reopen the decision?>
```

**Five-minute exercise:** fill the card for one live product decision. If you write “the team” in every field, try again. Shared work still needs explicit accountability.

---

## How work moves through the team

Product development is usually iterative rather than a one-way hand-off:

1. **Frame the outcome and constraints.** PM, design, engineering, and relevant specialists make the problem testable.
2. **Gather evidence.** Research, analytics, support signal, prototypes, technical spikes, and policy constraints reduce different kinds of uncertainty.
3. **Choose and record.** The named DRI makes the decision, records the trade-off, and names any approval boundary.
4. **Build and verify.** Engineers implement; design, product, quality, and specialists inspect the evidence that matters for their part of the contract.
5. **Release and operate.** The team proves what reached users, watches behaviour and reliability, and keeps an owner for the result.
6. **Learn and revise.** Production evidence can change the problem, design, architecture, priority, or operating model.

Ownership can change between steps. The PM may be DRI for which problem enters discovery; the designer for an interaction standard; the tech lead for an architecture choice; Risk for a regulated control; and an incident commander during recovery. Name the decision, then name its owner.

---

## Productive tension is evidence work

Cross-functional teams should disagree. The useful form of disagreement is not “PM wants speed, design wants beauty, engineering says no.” It sounds like this:

- **Outcome:** which user or business result are we optimising, and how will we know?
- **Experience:** which task or failure path becomes easier, and what did users actually do?
- **Feasibility:** which constraints are hard, which are assumptions, and what can a spike prove?
- **Risk:** what needs approval, what can be reversed, and what must fail closed?
- **Operations:** who sees a failure first, who can stop the rollout, and what recovery evidence is required?

This language turns role friction into a decision that can be tested. It also gives AI-assisted work somewhere to attach: the model can draft options or inspect evidence, but it cannot decide who is accountable.

---

## Reporting lines and product teams answer different questions

Most people sit in two structures at once:

- a **reporting line**, which handles coaching, performance, capability, and career growth; and
- a **product or platform team**, which owns an outcome or service with colleagues from other disciplines.

That is why an engineer can report to an EM while taking technical direction from a staff engineer and working day to day with a PM and designer. Matrixed structures can be useful, but only when the team knows which decision belongs to which line.

Career paths vary too. Engineering commonly offers individual-contributor and people-management tracks. Product, design, data, and other disciplines also have specialist and leadership paths, but titles and levels differ between companies. Treat a title as a clue to scope, not a universal ladder or proof of authority.

---

## What AI changes — and what it does not

AI can compress tasks across disciplines: drafting a prototype, exploring code, summarising research, generating test cases, or analysing a data set. That can change who performs a task and how quickly a team explores options. It does **not** remove the need for domain judgement, decision rights, approval boundaries, production evidence, or an operator.

For AI-assisted work, add four questions to the decision card:

1. What artefact did the model produce?
2. Which source, test, or user evidence checks it?
3. Who owns the decision to accept or reject it?
4. Who owns the result after release?

Do not turn a temporary tooling advantage into a prediction that one role disappears or that every person should become a one-person product team. The durable skill is broader: understand adjacent constraints, collaborate earlier, and keep accountability visible while the task boundaries move.

---

## What to carry forward

When someone mentions a role, team, or reorganisation, ask:

- What outcome or service does this team own?
- Which decision are we discussing?
- Who is the DRI, who contributes evidence, and who has an approval boundary?
- Who builds, verifies, releases, and operates the result?
- Which boundary is company-specific rather than universal?

That is enough to read most software-org conversations without pretending every company uses the same map.

---

## Where to go next

This completes the Tech 101 track. You now have the vocabulary to follow the main playbook without treating software delivery as a chain of mysterious job titles.

**Previous:** [← 0A.9 Tests](09-tests.md) · **Next:** [Start the Prologue →](../../prologue/README.md)

**Further reading**

- [SVPG — Product vs Feature Teams](https://www.svpg.com/product-vs-feature-teams/) — cross-functional teams accountable for outcomes rather than feature hand-offs
- [Google SRE Book — Introduction](https://sre.google/sre-book/introduction/) — SRE as an engineering approach to operations and reliability
- [Team Topologies](https://teamtopologies.com/) — stream-aligned, platform, enabling, and subsystem team interaction patterns
- [Google re:Work — Team effectiveness](https://rework.withgoogle.com/guides/understanding-team-effectiveness/) — why team dynamics matter beyond individual role strength
