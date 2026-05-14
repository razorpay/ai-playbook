---
title: "Tech 101: What is this world I'm in?"
slug: "tech-101"
section: "foundation"
status: "drafted"
type: "readme"
track: "tech-101"
order: 0
time_minutes: 3
audience: "anyone-curious"
outcome: "Understand what the Tech 101 track covers and how to read it."
prev: "foundation"
next: "tech-101/what-is-software"
pillar: null
belt: null
tags: ["tech-101"]
updated: "2026-04-27"
---

# Track 0A — Tech 101

> **Promise.** By the end of this track you can read a tech blog post, a product spec, or a Slack thread between engineers without losing the plot. You'll know what a server is, what an API is, what a deploy is, and what role each kind of person plays in shipping software. No coding required. No tools installed.

---

## Who this is for

Anyone who has ever found themselves nodding along while engineers talk and quietly Googling words afterwards. Designers, PMs, founders, ops folks, recent hires, parents-of-engineers, journalists, anyone curious. Razorpay-specific content lives elsewhere in the playbook — Tech 101 is deliberately universal, so it works as a standalone handbook.

You don't need a laptop, a terminal, or any installed software to read Tech 101. You'll need a browser to follow the linked diagrams, and that's it.

## Why this track exists

Most of the friction at the seam between "people who write code" and "people who ship product" isn't bad attitude or bad will. It's missing vocabulary. The PM who can't tell whether a problem is "frontend" or "backend" has to ask the engineer, who has to explain twice as much because the question was wrong-shaped. The designer who doesn't know what a deploy is can't tell their reviewer whether their preview is live or stale. The ops person who hears "the database is down" pictures something different from what's actually happening, and the next ten minutes go to clarifying images instead of solving incidents.

Tech 101 fixes this with the smallest possible vocabulary that still works. We're not teaching you to be an engineer. We're teaching you the words and the mental pictures so the next conversation costs you 30% less and the next bug report you write is *useful*.

If you finish this track and find yourself wanting more, the right next step is the Prologue (the orientation to AI dev work specifically), and after that the White Belt setup chapters. For most readers, what's in this track is enough on its own.

## Chapters

| §     | Chapter                                                        | Time   |
|-------|----------------------------------------------------------------|--------|
| 0A.1  | [What is software, really?](01-what-is-software.md)            | 5 min  |
| 0A.2  | [Frontend vs backend (and why most product friction lives in between)](02-frontend-vs-backend.md) | 10 min |
| 0A.3  | [What is a server? What is a client? What is HTTP?](03-server-client-http.md) | 10 min |
| 0A.4  | [Databases — the world's most important spreadsheet](04-databases.md) | 8 min |
| 0A.5  | [What is an API? What is a UI?](05-api-vs-ui.md)               | 8 min  |
| 0A.6  | [Code is text — repos, files, the source of truth](06-code-is-text.md) | 5 min |
| 0A.7  | [Git, conceptually — save points for files](07-git-concepts.md) | 8 min |
| 0A.8  | [Build, deploy, staging, production — the journey of a change](08-build-deploy.md) | 10 min |
| 0A.9  | [Tests — what they are, why they exist](09-tests.md)           | 8 min  |
| 0A.10 | [The shape of a software org — engineers, designers, PMs, ops, SRE](10-shape-of-a-software-org.md) | 10 min |

**Total reading time:** ~80 minutes if you go straight through. Most people spread it across a week — one chapter a coffee break.

There's no quest and no boss fight in Tech 101. The reward is being able to follow the conversations around you. If you want a hands-on track, that's Ops 101 (next door).

## How to read this track

- **In order, the first time.** The chapters build on each other: *server* uses words *software* defines, *deploy* uses words *git* defines, etc.
- **As a reference, after.** Once you've done the first pass, you can cherry-pick. Each chapter ends with a "what you should carry into the next chapter" line that makes them work as standalone refs too.
- **Don't take notes.** This is supposed to be vibey reading, not study. The vocabulary will stick if you read it once and *then* hear it used in your next standup. If a word slips out of your head, the chapter is two clicks away.

---

**Next:** [→ 0A.1 What is software, really?](01-what-is-software.md)

**Further reading**
- [Anthropic on Model Context Protocol](https://modelcontextprotocol.io/) — once you've finished Tech 101, this is the bridge into the AI dev side
- [Lenny's Newsletter](https://www.lennysnewsletter.com/) — for the product-side mental models that pair well with the technical ones
- [Julia Evans's "How HTTPS works" zine](https://wizardzines.com/zines/https/) — paid but worth it; the whole zine series is the Tech-101-but-fun version of half this track
