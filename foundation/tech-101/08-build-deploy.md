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
updated: "2026-04-26"
---

# 0A.8 — Build, deploy, staging, production (the journey of a change)

> **⏱ 10 minutes · 👥 Anyone curious · 🎯 Leaves with:** the right mental picture for what happens between *"my PR was merged"* and *"users are seeing the change"* — and the vocabulary to follow any incident channel.

---

## The one-paragraph answer

A code change doesn't reach users the moment it merges. It first gets *built* (turned into something runnable), *tested* (mostly automatically), *deployed* (copied onto servers), and *gradually exposed* (often through a staging environment first, then to a fraction of users, then to all of them). Each of those stages has names and the names appear in every incident channel you'll ever read. **Build → test → deploy → staging → production** is the whole journey. The rest of this chapter is just naming the stages.

---

## Re-anchoring

In chapter 0A.6 we said source code is text in files in repos. In 0A.7 we met Git: branches, commits, PRs, the way a team coordinates changes. After a PR gets merged, the next question is the natural one: *now what?*

The merge itself is just an edit to the canonical timeline of `main`. It doesn't restart any servers. It doesn't update any pages. *Users will not see anything different until the change is built, deployed, and rolled out.* That second journey (from merged commit to running pixel on a user's screen) is what this chapter is about.

The journey is invisible to most people who don't ship code. But the *vocabulary* of the journey is everywhere. *"The build is broken." "Did this make it to staging yet?" "We're rolling forward." "Production is live."* This chapter makes those sentences legible.

---

## Build — turning text into something runnable

Source code is text. Computers don't *run* text; they run instructions in a more compact, optimised, pre-arranged form. **Building** is the process of turning the text (possibly thousands of files spread across your repo) into a single packaged thing that's ready to run.

What "build" means depends on the language:

- **Frontend code** (TypeScript, JavaScript) is *bundled*: all the files combined, compressed, and minified into a small set of files that browsers can download fast.
- **Backend code** (Go, Java, Rust) is *compiled* — translated from the language a human wrote into instructions a CPU can execute directly.
- **Some languages** (Python, Ruby) skip the compile step at build time, but still get a build step that bundles dependencies, runs static checks, and produces an artefact.

In every case, the *output* of a build is a deployable artefact — a `.tar.gz` file, a Docker image, a folder of bundled JavaScript, something you can copy onto a server. The build *takes time* (anything from seconds to tens of minutes depending on the project) because it's doing real compute. The slowness is also why people say *"the build is broken"* — what they mean is the automatic build process tried to run and failed, usually because someone's PR introduced something the build couldn't compile.

A merged PR triggers a fresh build automatically. The build runs on a special machine (a *build server*) not on anyone's laptop. When you hear "CI" or "the pipeline," that's the system orchestrating these automatic builds. We'll meet CI again in a moment.

---

## Test — letting the machine check the work

Almost every modern team runs an *automated test suite* on every build. The tests are themselves code (files in the same repo) that exercise the rest of the code with known inputs and check the outputs match expectations. We'll go deeper on tests in chapter 0A.9; for now, *tests run as part of the build*, and a failing test fails the build.

This sounds elaborate, but the practical implication is simple: when a PR is merged, the build runs, the tests run, and either *everything is green* (the build succeeded, all tests passed, the artefact is ready to deploy) or *something is red* (the build is broken or a test failed, and the team has to fix it before anything can ship).

The discipline (*don't deploy a red build*) is so foundational that some teams have it physically lit on a wall. Many incident channels start with the sentence *"the build went red on `main`"* and that's the first information a team needs.

---

## Deploy — moving the artefact onto servers

A successful build produces an artefact. **Deploying** is the act of copying that artefact onto the servers (chapter 0A.3) where it'll actually run, and telling those servers to start using it.

The shape of a deploy depends on the architecture:

- **For a frontend**, deploying often means uploading the bundled files to a content-delivery network (CDN) — a global system of caches that serve the same files fast to users everywhere. Once the files are on the CDN, anyone loading the website gets the new version.
- **For a backend service**, deploying usually means rolling out a new version of the running server processes. The old version keeps serving requests until the new one is ready, then traffic switches over. Done well, users see no interruption.

A few specifics that pay off in conversation:

- **A deploy is not instant.** Bigger systems take minutes; very large ones, longer. *"Wait, hasn't this rolled out yet?"* is a real question even minutes after the deploy was kicked off.
- **A deploy is not all-or-nothing.** Most teams deploy in stages: to a small fraction of servers first, watch for errors, then expand. This is called *progressive rollout*.
- **A deploy is reversible (mostly).** If a new deploy starts breaking things, the team can usually *roll back* (return to the previous version) within a minute or two. Roll-forward (just deploying a fix on top) is also a common move, and the choice between roll-back and roll-forward is a real-time judgement call during incidents.

The system that runs deploys is sometimes called *CD* — *continuous deployment* (or *continuous delivery*; the distinction is technical). Together with CI (continuous integration, the build-and-test pipeline), it's *CI/CD* — the umbrella for "everything between PR-merged and users-see-the-change."

---

## Environments — staging, production, and friends

A change usually doesn't go straight from a build to where users live. It passes through a series of *environments*, each a separate copy of the system, each with its own purpose.

The two environments worth knowing by name:

**Production.** The real one. The system your customers actually hit. Production has real data, real money, real consequences. A deploy to production reaches every user.

**Staging.** A copy of production used for *final checks*. Staging looks like production but uses test data, test accounts, fake payment processors. Engineers and QA poke at staging before a change ships to production. Most teams have a rule: *every change goes to staging first*. The five-minute soak time on staging catches problems that the automated tests didn't.

Many teams also have:

- **Dev** or **devstack** — a per-engineer or shared environment used during development. Even more disposable than staging. Frequently a bit broken on Tuesdays.
- **Preview** — temporary environments spun up per branch or per PR, used by reviewers to see a change running before it merges. These are powerful for designers and PMs because they let non-engineers *see* a change without a teammate setting up a local run.
- **QA** — a dedicated copy where the QA team runs their own tests.

The conventions vary. The two stable terms are **production** (where the users are) and **staging** (where the final dress rehearsal happens). Once you can map any environment-name to one of these two roles, the conversations make sense.

---

## The journey, fully traced

Let's trace one PR end-to-end:

1. You merge your PR into `main`.
2. The CI system notices the merge and kicks off a fresh **build** of the code.
3. The build compiles / bundles / packages everything into an artefact. It also runs the test suite. Both succeed; the build is **green**.
4. The CD system picks up the green artefact and deploys it to **staging** automatically. A few minutes pass; the staging environment is now running your change.
5. A teammate or QA engineer (or, sometimes, an automated end-to-end test suite that wakes up on staging) verifies the change does what it's supposed to.
6. The CD system **promotes** the same artefact to **production** — typically gated on a human approval, or on automated checks remaining green for some period.
7. The deploy to production rolls out progressively: first to a small fraction of servers, then more, then all. If error rates spike during the rollout, the system *automatically rolls back*.
8. Once the rollout completes, your change is live. Users start seeing it.

That whole sequence might take 20 minutes for a small change in a fast-moving team, or several hours for a large change in a more cautious one. *It is, in every case, the journey.* When someone says *"this fix is in `main` but hasn't been deployed yet,"* they mean steps 2–7 are still in flight.

---

## Why this chapter matters even if you'll never deploy anything

Two payoffs.

**The vocabulary makes incident channels readable.** When something breaks, the conversation moves fast and uses these terms heavily. *"Roll back to the previous artefact." "Staging is green but production is throwing 500s." "The build is red on `main`."* If you've read this chapter, you can follow along and even contribute. If you haven't, the discussion is in code.

**The journey changes how you think about "shipping."** When you say *"we shipped X"*, what you usually mean is *"X is in production, deployed to all users, stable."* The merged PR was an early step in that, not the end. Designers and PMs who internalise the journey stop asking *"is the PR merged yet?"* and start asking *"is this deployed to production?"* — which is the question that actually matters for whether users have the thing.

This is also why preview environments are such a leverage point for non-engineers. Without preview, the only way to see your change is to wait for the full journey. With preview, you see the change two minutes after a PR is opened, on a real URL, with real assets. We'll meet preview platforms again at Yellow Belt.

---

## What you should carry into the next chapter

- **The journey is build → test → deploy → staging → production.** Five stages, each named, each with its own failure modes.
- **A merged PR isn't deployed yet.** The journey takes minutes-to-hours.
- **CI/CD is the orchestration layer** that runs builds, tests, and deploys automatically. *"The pipeline"* is the colloquial name.
- **Production is where users are. Staging is the dress rehearsal.** Most other environment names map to one of these two roles.
- **Roll-back vs roll-forward** is the real-time judgement call during incidents. Both are common; the choice depends on the situation.
- The next chapter ([0A.9 — Tests](09-tests.md)) goes deeper on the *test* step we glossed over here: what tests are, why they exist, why a green test suite is the difference between fast shipping and constant fires.

---

**Previous:** [← 0A.7 Git, conceptually](07-git-concepts.md) · **Next:** [→ 0A.9 Tests](09-tests.md)

**Further reading**
- [Atlassian — CI/CD intro](https://www.atlassian.com/continuous-delivery/continuous-integration) — the cleanest plain-language overview of CI and CD as separable practices
- [Charity Majors — Test in production](https://charity.wtf/2020/03/03/ops-engineers-want-to-test-in-production-but-no-one-believes-them/) — the manifesto that reframed how a generation of teams think about staging vs production
- [Google SRE Book — chapter on release engineering](https://sre.google/sre-book/release-engineering/) — free online; the deepest treatment of build-and-deploy discipline in print
