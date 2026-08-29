---
title: "Build, deploy, staging, production"
slug: "tech-101/build-deploy"
section: "foundation"
status: "drafted"
type: "chapter"
track: "tech-101"
order: 8
time_minutes: 10
audience: "anyone-curious"
outcome: "Understand the journey from a code change to something users can touch."
prev: "tech-101/git"
next: "tech-101/tests"
pillar: null
belt: null
tags: ["software-basics", "deploy"]
updated: "2026-08-29"
---

# 0A.8 — Build, deploy, staging, production (the journey of a change)

> **⏱ 10 minutes · 👥 Anyone curious · 🎯 Leaves with:** the right mental picture for what happens between *"my PR was merged"* and *"users are seeing the change"* — and the vocabulary to follow any incident channel.

---

## The short answer

A code change does not reach users just because it merged. It still has to pass the release path for that repository. A common service path is **check → build → deploy → verify → release**, but the exact route varies. Tests can run before or after merge. A docs or configuration change may not produce a packaged artefact. Staging may be required, optional, or absent. A feature flag may keep a deployed change hidden from users.

The useful mental model is not one universal sequence. It is five questions:

1. **What changed?** Code, configuration, data, documentation, or infrastructure.
2. **Which checks passed?** The exact workflow and test scope, not just “CI is green.”
3. **What was produced or changed?** An artefact, container image, site bundle, configuration revision, or direct update.
4. **Where is it running?** Preview, staging, one production region, or all production infrastructure.
5. **Who can use it?** Nobody yet, an internal cohort, a percentage of users, or everyone.

Those distinctions appear in every incident channel you will read. The rest of this chapter gives them names.

---

## Re-anchoring

In chapter 0A.6 we said source code is text in files in repos. In 0A.7 we met Git: branches, commits, PRs, the way a team coordinates changes. After a PR gets merged, the next question is the natural one: *now what?*

The merge itself updates the canonical timeline of `main`. A configured workflow may react to that event, but the merge notification does not prove a release happened. The second journey—from accepted change to verified user outcome—is what this chapter is about.

The journey is invisible to most people who don't ship code. But the *vocabulary* of the journey is everywhere. *"The build is broken." "Did this make it to staging yet?" "We're rolling forward." "Production is live."* This chapter makes those sentences legible.

---

## Build — turning text into something runnable

Your source code has to be prepared for its runtime. **Building** can compile, bundle, package, generate, or verify what will run. Some repositories do several of these; some do almost none.

What “build” means depends on the project:

- **Frontend code** (TypeScript, JavaScript) is often *bundled*: files are combined, compressed, and minified into assets that browsers can download.
- **Backend code** (Go, Java, Rust) is often *compiled* into machine code or bytecode.
- **Interpreted code** (Python, Ruby) may be packaged with dependencies or placed in a container without a compile step.
- **Documentation, configuration, and infrastructure** may generate a site or plan, update a stored revision, or skip a conventional build entirely.

A build often produces a deployable **artefact**: a `.tar.gz` file, a Docker image, or a folder of bundled JavaScript. Building can take seconds or tens of minutes because it is doing real compute. When someone says *“the build is broken,”* they mean a build workflow failed. Read the failed step before assuming compilation was the cause; dependency installation, linting, code generation, packaging, and credentials can all fail a build.

A repository's workflow decides when builds run. It may trigger on a pull request, a merge to a particular branch, a path change, a schedule, or a manual action. It usually runs on a remote **build runner**, not an engineer's laptop. When you hear “CI” or “the pipeline,” that is the system orchestrating these checks and builds.

---

## Test — letting the machine check the work

Modern teams use **automated checks** to catch problems before release. Tests are code that exercises other code with known inputs and checks the outputs. Other checks may lint files, scan dependencies, validate schemas, or verify that generated artefacts are current. We will go deeper on tests in chapter 0A.9.

Checks can run when a PR opens, when it updates, after it merges, before a deploy, or in several of those places. A **green** workflow means the checks included in that workflow passed. It does not mean every possible test ran or that the product is bug-free. A **red** required check normally blocks the next gated step until the failure is fixed or explicitly handled.

The discipline—do not advance a failed release candidate without understanding the failure—is foundational. Many incident channels start with *“the build went red on `main`,”* and that is useful first evidence, not a complete diagnosis.

---

## Deploy — making a change run somewhere

**Deploying** makes a version of software or configuration available in an environment. That may mean starting containers from an image on a cluster, publishing frontend assets to a CDN, updating a serverless function, applying infrastructure configuration, or changing a database schema. No literal server-copy step is required.

The shape depends on the architecture:

- **For a frontend**, deployment often publishes bundled files to a content-delivery network (CDN). Caches, client versions, and feature flags can still affect when a particular user sees them.
- **For a backend service**, deployment usually starts a new version of running processes and shifts traffic when they are healthy. Done well, users see no interruption.
- **For configuration or infrastructure**, deployment applies a declared change. The important output may be a new revision or system state rather than an artefact.

A few specifics that pay off in conversation:

- **A deploy is not instant.** Bigger systems take minutes; very large ones, longer. *“Has this finished rolling out?”* remains a real question after deployment starts.
- **A deploy is not always all-or-nothing.** Teams may roll out by server, region, tenant, or user cohort and watch health before expanding. This is a **progressive rollout**.
- **Deploy and release are different.** A change can be deployed to an environment without being released. Even in production, it is only *released* when intended users can use it. Feature flags, permissions, app-store versions, and gradual exposure can separate those moments.
- **Reversal has limits.** Code can often roll back, but data migrations and external side effects may not. Teams choose between rollback, disabling exposure, and rolling forward with a fix based on the failure.

**CI**—continuous integration—runs the workflows that integrate and check changes. **CD** can mean continuous delivery or continuous deployment: the machinery that keeps a releasable version ready or deploys it. “The pipeline” is the colloquial name for the configured chain, not a promise that every repository uses the same chain.

---

## Environments — staging, production, and friends

A change can pass through one or more **environments**: separately configured places where software runs. The names and fidelity vary by team.

Two names are worth knowing:

**Production.** The real system that serves customers and handles real consequences. A production deployment does not necessarily reach every user immediately: it may cover one region, one service, or code hidden behind a flag.

**Staging.** A non-production environment used for checks before production. It may resemble production and use test accounts or fake processors, but “production-like” is a goal, not a guarantee. Some teams require staging for particular changes; others rely on previews, canaries, automated checks, or guarded production rollout.

You may also hear:

- **Dev** or **devstack** — a per-engineer or shared environment used during development. More disposable than staging and frequently a bit broken on Tuesdays.
- **Preview** — a temporary environment created per branch or PR. Preview is powerful for designers and PMs because they can inspect a change before it merges without setting up a local run.
- **QA** — an environment reserved for a QA workflow.
- **Canary** — a production slice that receives a change before wider rollout. Unlike staging, it exercises real traffic and therefore needs tight monitoring and stop conditions.

Do not infer safety or fidelity from the name alone. Ask what data it uses, what traffic reaches it, what checks happen there, and what promotion rule moves the change forward.

---

## One common journey, fully traced

A service using required PR checks, staging, and progressive production rollout might follow this path:

1. You open a PR. Relevant **checks** run before merge.
2. You merge into `main`. The repository's rules decide whether another workflow applies to this change.
3. The workflow builds a versioned **artefact** and records which checks passed.
4. CD deploys that artefact to **staging** because this service requires it.
5. Automated checks or a teammate verify the intended behaviour there.
6. The same artefact is promoted to **production**, perhaps behind an approval gate.
7. Traffic or feature exposure expands while the team watches defined health signals. A failed gate stops or reverses the rollout.
8. Product evidence—not the merge notification—shows that the intended users can use the change.

That is a common path, not a law. A docs repository may publish directly from `main`. A mobile release may wait for an app-store review. A configuration change may apply without a packaged artefact. A feature may be deployed everywhere and remain unreleased behind a flag.

### Try it: trace one real release

Pick a recent change and fill in this receipt. If a field is unknown, that is your next question—not permission to write “standard pipeline.”

```text
Change:
Checks that ran:
Artefact or applied revision:
Environments reached:
Exposure gate or audience:
Evidence users can use it:
```

This small receipt works in a launch thread, design review, or incident handoff. It separates “merged,” “deployed,” and “released” without asking everyone to become a release engineer.

---

## Why this chapter matters even if you'll never deploy anything

Two payoffs.

**The vocabulary makes incident channels readable.** When something breaks, the conversation moves fast and uses these terms heavily. *"Roll back to the previous artefact." "Staging is green but production is throwing 500s." "The build is red on `main`."* If you've read this chapter, you can follow along and even contribute. If you haven't, the discussion is in code.

**The journey changes how you think about “shipping.”** A merged PR is evidence that a change was accepted, not that users have it. “Deployed to production” is stronger evidence, but it can still hide a flag, partial rollout, permission gate, or failed user outcome. Designers and PMs who internalise the journey ask *“Which users can use it, and what proves that?”*

This is also why preview environments are such a leverage point for non-engineers. Without a shareable preview, a teammate may have to run the change locally or wait for a later environment. With one, reviewers get a real URL before merge. We'll meet preview platforms again at Yellow Belt.

---

## What you should carry into the next chapter

- **There is no universal release sequence.** Trace the configured checks, artefact or revision, environments, exposure gate, and user evidence.
- **Merged, deployed, and released are different states.** Ask which one the evidence proves.
- **Green is scoped.** It means the named workflow's checks passed, not that every test ran or every risk is gone.
- **Staging is optional and imperfect.** Learn what each environment actually tests instead of trusting its name.
- **Rollback, disable, or roll forward** is a real-time incident choice. Data and external side effects can make reversal harder than code deployment.
- The next chapter ([0A.9 — Tests](09-tests.md)) goes deeper on the *test* step we glossed over here: what tests are, why they exist, and how their scope affects release confidence.

---

**Previous:** [← 0A.7 Git, conceptually](07-git-concepts.md) · **Next:** [→ 0A.9 Tests](09-tests.md)

**Further reading**
- [Atlassian — CI/CD intro](https://www.atlassian.com/continuous-delivery/continuous-integration) — the cleanest plain-language overview of CI and CD as separable practices
- [GitHub Actions — events that trigger workflows](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows) — why repository rules, events, branches, and path filters determine what runs
- [Martin Fowler — Feature Toggles](https://martinfowler.com/articles/feature-toggles.html) — the classic explanation of separating feature release from code deployment
- [Charity Majors — Test in production](https://charity.wtf/2020/03/03/ops-engineers-want-to-test-in-production-but-no-one-believes-them/) — the manifesto that reframed how a generation of teams think about staging vs production
- [Google SRE Book — chapter on release engineering](https://sre.google/sre-book/release-engineering/) — free online; the deepest treatment of build-and-deploy discipline in print
