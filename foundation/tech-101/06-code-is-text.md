---
title: "Code is text: repos, files, the source of truth"
slug: "tech-101/code-is-text"
section: "foundation"
status: "drafted"
type: "chapter"
track: "tech-101"
order: 6
time_minutes: 5
audience: "anyone-curious"
outcome: "See code as editable text stored in shared repositories, not as magic behind a screen."
prev: "tech-101/api-vs-ui"
next: "tech-101/git"
pillar: null
belt: null
tags: ["software-basics", "repos"]
updated: "2026-08-29"
---

# 0A.6 — Code is text (repos, files, the source of truth)

> **⏱ 5 minutes · 👥 Anyone curious · 🎯 Leaves with:** the working understanding that source code is mostly text stored in repositories, plus the vocabulary to tell local work, committed history, and running software apart.

---

## The one-line answer

**Most source code is text files. Lots of them. Organised into folders. Stored in a place called a repository.** A real project can also contain images, fonts, generated files, and other non-text assets. Hold the text-files picture as the useful centre, not the whole physical reality.

---

## Re-anchoring

We've been zooming in. Software is instructions for what to do with information (0A.1). The frontend lives on your device, the backend on a server (0A.2). They talk over HTTP (0A.3). The backend reads and writes a database (0A.4). They communicate using JSON over an API contract (0A.5).

This chapter zooms back out: where do all those *instructions* (the frontend, the backend, the API contracts, the rules) actually live? While someone edits them, they live in a working folder on that person's laptop. When the team records and shares them, they live in a repository. Most of the instructions are plain text files that you could open in any text editor.

If that surprises you, you're not alone. Most people who haven't looked at code imagine it as something exotic — a gleaming console, a magic incantation. The truth is humbler. Code is text. The same characters, the same keyboard, the same Save action. The only special thing about code is the *grammar* — the rules for what arrangements of words and punctuation a computer can understand and run.

---

## Files and folders

Open any code-shaped project on a laptop and you'll see:

- **Folders** with names like `src`, `lib`, `components`, `pages`, `tests`, `docs`. These are organisational. They group related files together so humans can find things.
- **Source and configuration files** inside those folders, named things like `Button.jsx`, `payment.py`, `database.sql`, `README.md`, `package.json`. These are usually text: you could open them in Notepad, TextEdit, or any plain editor and read them.
- **Non-text assets** such as images, fonts, videos, or compiled binaries. They still live in folders and may be tracked by the repo, but opening them as plain text produces soup, not insight.
- **A handful of "config" files** at the root level — `package.json`, `tsconfig.json`, `.env.example`, `.gitignore`. These describe the *project itself*: what language it's written in, what other code it depends on, what shouldn't be checked in. They're text too.

The structure varies wildly between projects. There's no single "right" layout. Most teams pick a convention and stick to it: once you're inside a Razorpay repo, the layout will look familiar across all of them, even if it differs from a layout you'd find at another company.

Importantly: **a file's name and location are your first clues about what's in it before you open it.** If a file is called `Button.jsx` and lives in `components/`, you can guess it defines a Button component. If it's called `auth_middleware.go` and lives in `internal/auth/`, you can guess it's the authentication layer for a backend service. Those are clues, not guarantees; the README and surrounding files help confirm them. Reading conventions like this (the practice of *navigating* a repo without yet reading code) is much of what an experienced engineer does in their first ten minutes inside a new project.

---

## File extensions, in plain English

Many filenames end in a tiny tag — `.js`, `.py`, `.go`, `.md` — that tells humans (and tools) what kind of content the file probably contains. A short cheat sheet:

- **`.js`, `.ts`, `.jsx`, `.tsx`** — JavaScript or TypeScript. The languages most frontends are written in. JSX/TSX adds support for inline UI markup.
- **`.py`** — Python. A general-purpose language, common for backends, data work, and scripting.
- **`.go`, `.rs`, `.java`, `.kt`, `.rb`, `.php`, `.cs`** — different backend languages each with their own communities. Razorpay uses several of these across teams.
- **`.html`, `.css`** — the languages of the web. HTML is structure; CSS is styling.
- **`.json`, `.yaml`, `.yml`, `.toml`** — configuration formats. JSON we met in 0A.5; YAML and TOML are alternatives.
- **`.sql`** — database queries. We met SQL in 0A.4.
- **`.md`** — Markdown. Plain text with light formatting. README files, documentation, this playbook itself.
- **`.sh`, `.bash`** — shell scripts. Sequences of terminal commands.

You don't have to memorise this list. The reason it's here is so that when you peek at a code repo and see a file ending in `.tsx`, you don't think *"what's this exotic thing"*: you think *"that's probably frontend TypeScript with inline UI markup; I'll come back to it if I need to."*

---

## Repositories

A **repository** (usually shortened to **repo**) is a project's tracked files and folders plus the history of the commits recorded for them.

That second part is the magic, with one important boundary: Git records **commits**, not every keystroke or local experiment. A changed or newly created file stays outside history until someone deliberately includes it in a commit. Once committed, the repo can show what changed, who recorded it, when, and whatever reason the commit or pull-request message captured. This is what makes repos different from a regular folder of files — and it's the topic of the next chapter (Git, which is the system that makes this possible).

You will usually meet a repo in two places:

- **A local clone on your laptop**, where you edit files and make commits. It is a regular folder with one extra hidden folder inside it (`.git/`) that holds Git's metadata and available history.
- **A hosted remote**, usually GitHub for our world. This is the shared copy that teammates push to, review, and pull from. A repo can have more than one remote, so “the GitHub copy” means the team-designated shared remote, not a law of Git.

When you start working on a repo, you usually **clone** it from GitHub to your laptop. A normal clone downloads the available history; a *shallow clone* deliberately downloads only recent history to save time and space. You then make changes locally, commit the ones you want to record (we'll get to commits in 0A.7), and push them to the shared remote when you want teammates to see them. *Clone → change → commit → push* is the common loop.

---

## "The source of truth"

You'll hear this phrase. It is useful only when the speaker names **truth about what**.

The team's default branch on GitHub is usually the canonical source for accepted code. If two developers' laptops disagree, compare both with that branch. But the repo alone does not prove what is running in production: a commit may be merged but not deployed, deployed only to one environment, or deployed behind a feature flag. For runtime truth, use the deployment record and environment evidence that identify the running build or commit.

Keep these states separate:

| Question | Evidence to inspect |
|---|---|
| What am I editing right now? | The local working folder and `git status` |
| What did I record? | The local commit history |
| What can the team review or use as accepted source? | The pushed branch, pull request, and team-designated default branch |
| What are users actually running? | The deployment record, build or commit identifier, environment, and release/flag state |

The implication is narrower and more useful than “if it's not in the repo, it didn't happen.” A fix that exists only on your laptop is real work, but it is not yet a shared source change. A design decision in a document can be real context, but it does not change the product until the implementation is committed, reviewed, deployed, and released through the team's path. Name the state instead of calling all four “done.”

---

## Reading a repo without writing code

This is a useful skill for every reader of this playbook, even if you'll never write code yourself.

The pattern, in five minutes:

1. **Open the README.** Almost every repo has a `README.md` at the root. It's the "what is this and how do I use it" file. Sometimes it's terse; sometimes it's a small book. Read it.
2. **Look at the top-level folders.** Most repos have 5–15 top-level folders. Their names tell you a lot. `src/` and `tests/` together suggest "code goes here, tests live alongside." `frontend/` and `backend/` together suggest a monorepo. `docs/` suggests there's actual documentation worth reading.
3. **Open any file whose name interests you.** Don't try to understand it. Just look. You'll start to see patterns: variable names, comments, the shape of the language.
4. **Open the most recent commits.** GitHub shows you "what changed recently" on the front page. Reading the *titles* of recent commits tells you what the team is currently working on. You'll learn more about the project's heartbeat in 60 seconds of commit-title reading than 30 minutes of trying to guess from the code.
5. **Don't worry about understanding everything.** You don't have to. The goal is to *locate* yourself (to know roughly where things live) not to read the whole codebase.

This skill is the foundation of the White Belt's repo-orientation move. Get comfortable with it now, before any AI gets involved, and AI-assisted exploration becomes a force multiplier instead of an unsteady crutch.

---

## What you should carry into the next chapter

- **Most source code is text.** Projects can also contain non-text assets and generated artefacts.
- **Git records commits, not every local change.** Untracked and uncommitted work is outside the shared history.
- **File extensions are clues** — `.tsx` probably means frontend TypeScript, `.py` means Python, and `.md` means Markdown.
- **Your local clone and the hosted remote have different jobs.** You edit locally; the team reviews and shares pushed commits through its designated remote.
- **Accepted source is not production truth.** Use deployment and release evidence to prove what users are running.
- **Reading a repo without writing code is a useful skill.** README → top-level folders → recent commits is the five-minute path to oriented.
- The next chapter ([0A.7 — Git, conceptually](07-git-concepts.md)) is the system that makes the *history* part of a repo work. Save points, branches, the whole choreography of working alongside other people on the same files.

---

**Previous:** [← 0A.5 What is an API? What is a UI?](05-api-vs-ui.md) · **Next:** [→ 0A.7 Git, conceptually](07-git-concepts.md)

**Further reading**
- [GitHub — Hello World tutorial](https://docs.github.com/en/get-started/quickstart/hello-world) — a 10-minute hands-on intro that turns the abstractions in this chapter into something you can actually click through
- [Pro Git — Recording Changes to the Repository](https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository) — the tracked, modified, staged, and committed states behind the distinctions above
- [The Pragmatic Programmer (Hunt & Thomas)](https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/) — the classic that explains *why* the source-of-truth discipline matters, beyond technical reasons
