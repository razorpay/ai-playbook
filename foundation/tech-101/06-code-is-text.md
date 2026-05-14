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
updated: "2026-04-26"
---

# 0A.6 — Code is text (repos, files, the source of truth)

> **⏱ 5 minutes · 👥 Anyone curious · 🎯 Leaves with:** the working understanding that *every product you've ever used is, deep down, a folder of text files,* and the vocabulary you need to talk about it.

---

## The one-line answer

**Source code is just text files. Lots of them. Organised into folders. Stored in a place called a repository.** That's the whole physical reality. Hold that picture; the rest of this chapter is just naming the parts.

---

## Re-anchoring

We've been zooming in. Software is instructions for what to do with information (0A.1). The frontend lives on your device, the backend on a server (0A.2). They talk over HTTP (0A.3). The backend reads and writes a database (0A.4). They communicate using JSON over an API contract (0A.5).

This chapter zooms back out: where do all those *instructions* (the frontend, the backend, the API contracts, the rules) actually live, physically? On someone's laptop, until they're shared. On a shared server, when they're shared. As what, though? As text files. Plain, ordinary text files, the kind you could open in any text editor.

If that surprises you, you're not alone. Most people who haven't looked at code imagine it as something exotic — a gleaming console, a magic incantation. The truth is humbler. Code is text. The same characters, the same keyboard, the same Save action. The only special thing about code is the *grammar* — the rules for what arrangements of words and punctuation a computer can understand and run.

---

## Files and folders

Open any code-shaped project on a laptop and you'll see:

- **Folders** with names like `src`, `lib`, `components`, `pages`, `tests`, `docs`. These are organisational. They group related files together so humans can find things.
- **Files** inside those folders, named things like `Button.jsx`, `payment.py`, `database.sql`, `README.md`, `package.json`. Each file is text: you could open any of them in Notepad, TextEdit, or any plain editor and read it.
- **A handful of "config" files** at the root level — `package.json`, `tsconfig.json`, `.env.example`, `.gitignore`. These describe the *project itself*: what language it's written in, what other code it depends on, what shouldn't be checked in. They're text too.

The structure varies wildly between projects. There's no single "right" layout. Most teams pick a convention and stick to it: once you're inside a Razorpay repo, the layout will look familiar across all of them, even if it differs from a layout you'd find at another company.

Importantly: **a file's name and location are the only signal you have about what's in it before you open it.** If a file is called `Button.jsx` and lives in `components/`, you can guess it defines a Button component. If it's called `auth_middleware.go` and lives in `internal/auth/`, you can guess it's the authentication layer for a backend service. Reading conventions like this (the practice of *navigating* a repo without yet reading code) is most of what an experienced engineer does in their first ten minutes inside a new project.

---

## File extensions, in plain English

Every file ends in a tiny tag — `.js`, `.py`, `.go`, `.md` — that tells humans (and tools) what *kind of text* the file contains. A short cheat sheet:

- **`.js`, `.ts`, `.jsx`, `.tsx`** — JavaScript or TypeScript. The languages most frontends are written in. JSX/TSX adds support for inline UI markup.
- **`.py`** — Python. A general-purpose language, common for backends, data work, and scripting.
- **`.go`, `.rs`, `.java`, `.kt`, `.rb`, `.php`, `.cs`** — different backend languages each with their own communities. Razorpay uses several of these across teams.
- **`.html`, `.css`** — the languages of the web. HTML is structure; CSS is styling.
- **`.json`, `.yaml`, `.yml`, `.toml`** — configuration formats. JSON we met in 0A.5; YAML and TOML are alternatives.
- **`.sql`** — database queries. We met SQL in 0A.4.
- **`.md`** — Markdown. Plain text with light formatting. README files, documentation, this playbook itself.
- **`.sh`, `.bash`** — shell scripts. Sequences of terminal commands.

You don't have to memorise this list. The reason it's here is so that when you peek at a code repo and see a file ending in `.tsx`, you don't think *"what's this exotic thing"*: you think *"oh, that's a frontend file in TypeScript with inline UI markup, I'll come back to it if I need to."*

---

## Repositories

A **repository** (usually shortened to **repo**) is the collected set of all the files and folders for one project, plus the *history* of every change ever made to any of them.

That second part is the magic. A repo isn't just a snapshot of "the current state of the code." It's a complete record of *how the code got to its current state*: every change, who made it, when, why. You can rewind to any point in the past, see what changed, and figure out who to ask about it. This is what makes repos different from a regular folder of files — and it's the topic of the next chapter (Git, which is the system that makes this possible).

Repos live in two places:

- **On your laptop**, when you're working on them. A repo on your laptop is a regular folder with one extra hidden folder inside it (`.git/`) that holds the history.
- **On a hosting service**, usually GitHub for our world. The hosted version is the *shared* copy that the team works against. GitHub.com is where Razorpay's repos live.

When you start working on a repo, you **clone** it from GitHub to your laptop: that copies the entire repo, history and all, locally. You then make changes locally, commit them (we'll get to commits in 0A.7), and push them back to GitHub when you want to share. The cycle of *clone → change → commit → push* is the heartbeat of every code-shipping process you'll ever encounter.

---

## "The source of truth"

You'll hear this phrase. It means something specific.

The repo on GitHub is *the* canonical version of the project. If two developers' laptops disagree about what the code says, GitHub is the tiebreaker. If you're trying to figure out what's currently in production, you go to the repo. If you want to know what state was 90 days ago, the repo's history has it.

The implication is unglamorous and important: **if it's not in the repo, it didn't happen.** The clever idea you sketched in Notion isn't part of the codebase. The fix you made on your laptop but forgot to push doesn't exist for anyone else. The skill you wrote that's only saved on your desktop is invisible to your team. Code is real *when it's in the repo*; everywhere else, it's just intent.

This is the same principle the playbook applies in [§0.1](../../prologue/01-welcome.md) when it defines "shipped code" as a real PR in a real repo. Repos are how teams have a shared, durable view of *the truth*. Everything else is gossip.

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

- **Source code is text.** Files. In folders. Stored in a repo.
- **The repo is the source of truth.** If it's not in the repo, it didn't happen.
- **File extensions tell you what kind of text** — `.tsx` is a frontend file, `.py` is Python, `.md` is Markdown, etc.
- **Repos live on your laptop *and* on GitHub.** GitHub is the shared canonical copy; your laptop is where you work.
- **Reading a repo without writing code is a useful skill.** README → top-level folders → recent commits is the five-minute path to oriented.
- The next chapter ([0A.7 — Git, conceptually](07-git-concepts.md)) is the system that makes the *history* part of a repo work. Save points, branches, the whole choreography of working alongside other people on the same files.

---

**Previous:** [← 0A.5 What is an API? What is a UI?](05-api-vs-ui.md) · **Next:** [→ 0A.7 Git, conceptually](07-git-concepts.md)

**Further reading**
- [GitHub — Hello World tutorial](https://docs.github.com/en/get-started/quickstart/hello-world) — a 10-minute hands-on intro that turns the abstractions in this chapter into something you can actually click through
- [The Pragmatic Programmer (Hunt & Thomas)](https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/) — the classic that explains *why* the source-of-truth discipline matters, beyond technical reasons
