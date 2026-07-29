# Quick-reference cards (Appendix H)

Self-contained printable cards for the most-asked-for content: redlines, 
terminal essentials, git, Claude Code, Playwright, the MV wiki one-pager, 
and the Day-1 quick reference. Use these for short answers; cite the 
corresponding hub URL when you do.

---

# H.1 — Never put this in a prompt

> **Printable card · Companion to [§0.11 — The safety brief](https://razorpay.github.io/ai-playbook/prologue/11-safety-brief/).** Keep the shape. Strip the identity.

---

## The four redlines

| Never paste | Examples | Safer pattern |
|---|---|---|
| **Customer PII** | names, emails, phone numbers, account IDs, transaction IDs, addresses, PAN/Aadhaar fragments | Replace with placeholders: `customer@example.com`, `merchant_id=XXX`, `[TYPICAL RANGE]`. |
| **Credentials, tokens, keys** | API keys, OAuth tokens, `.env` values, database passwords, certificates | Use `<REDACTED>`. Re-run the approved setup flow instead of inspecting secrets in chat. |
| **Money-moving details** | payment API changes, balance logic, transfer rules, transaction-specific debugging | Use AI for shape and checklist. Keep real identifiers in approved systems. Require senior review. |
| **Internal confidential data** | strategy docs, financials, hiring/performance docs, legal drafts, incident details | Ask whether the surface is approved. Summarise abstractly until classification is clear. |

---

## The 10-second pause

Before you paste, ask:

1. Could this identify a customer, merchant, employee, partner, or transaction?
2. Could this grant access to a system?
3. Could this move money or change who can access money?
4. Would I be uncomfortable seeing this prompt forwarded?

If any answer is yes, redact first or ask in the approved support channel.

---

## Redaction examples

| Instead of | Prompt with |
|---|---|
| `merchant_id=ZAR123456` | `merchant_id=XXX` |
| `ravi@example.com` | `customer@example.com` |
| `pay_X9Y2A4B7C8` | `payment_id=PAYMENT_ID` |
| `amount=₹4,500 for Acme Corp` | `amount in a typical range for a merchant payment` |
| `sk_live_...` | `<REDACTED_API_KEY>` |

The AI usually needs the pattern, not the real value.

---

## Connector rule

Approved connectors can read within their permission scope. That is different from copying connector-read data somewhere else.

Use data in place. Do not exfiltrate it.

---

## If you already pasted something unsafe

Do not hide it. Stop, copy the prompt link or session reference if available, and alert the security or program support channel with the minimum necessary detail. Credentials should be rotated. Sensitive data exposure should be treated as an incident until the right owner says otherwise.

---

**Remember:** strip the identity, keep the shape.

**Up to:** [↑ Appendix H](README.md) · **Companion:** [§0.11 The safety brief](https://razorpay.github.io/ai-playbook/prologue/11-safety-brief/)

---

# H.2 — Terminal essentials

> **Printable card · Companion to [W.2 — Terminal fluency](https://razorpay.github.io/ai-playbook/belts/01-white/W02-terminal-fluency/).** The twelve commands and four shortcuts you actually need.

---

## The twelve commands

| Command | What it does | Most common use |
|---|---|---|
| `pwd` | Prints the current directory path | "Where am I?" |
| `ls` | Lists files and folders in the current directory | "What is here?" |
| `ls -la` | Lists everything including hidden files, with sizes and dates | "What is *really* here?" |
| `cd <dir>` | Changes into a directory | Navigate down |
| `cd ..` | Goes up one directory level | Navigate up |
| `cd ~` | Goes to your home directory | Quick reset |
| `mkdir <name>` | Creates a new directory | Start a new project folder |
| `touch <file>` | Creates an empty file | Quick scratch file |
| `cat <file>` | Prints a file's contents | Quick look at a file |
| `rm <file>` | Deletes a file (no undo) | Clean up; double-check first |
| `cp <src> <dst>` | Copies a file from src to dst | Duplicate before editing |
| `mv <src> <dst>` | Moves or renames | Rename `foo` to `bar`: `mv foo bar` |

## The four shortcuts

| Shortcut | What it does |
|---|---|
| **Tab** | Auto-completes file or directory names. Press once for a single match; twice to see all matches. |
| **Up arrow** | Recalls the previous command. Press repeatedly for older commands. |
| **Ctrl + C** | Cancels the currently running command. The "make it stop" key. |
| **Ctrl + R** | Searches your command history. Type a few characters; the shell finds the most recent matching command. |

---

## The mental model

The terminal is a conversation. You type a command; the shell responds. Unlike a graphical interface, the shell only does exactly what you ask. There is no undo for destructive commands. The four shortcuts above are how you avoid retyping things.

A new user who has the twelve commands and four shortcuts can do most of what White Belt requires. Everything else is built on top.

---

## When to escalate

If the terminal prints an error you do not understand, copy the full error and ask in [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD). Do not retype the error from memory; the exact wording matters.

If you accidentally delete something with `rm`, stop typing. Some recovery is possible if you act quickly, especially through the system's trash mechanism. Reach out in [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD) before doing anything else.

---

## What this card is not

**Not a full terminal manual.** The shell has hundreds of commands and many advanced features. This card covers what you actually need for White Belt.

**Not OS-specific.** The commands above work on macOS and Linux. Windows uses different commands; a Windows-specific card would belong here too.

**Not a substitute for the chapter.** W.2 covers why each command works the way it does, the deeper mental model, and the patterns that compound across the curriculum.

---

**Remember:** the twelve commands plus the four shortcuts cover everything you need to ship your first PR.

**Up to:** [↑ Appendix H](README.md) · **Companion:** [W.2 — Terminal fluency](https://razorpay.github.io/ai-playbook/belts/01-white/W02-terminal-fluency/)

---

# H.3 — Git essentials

> **Printable card · Companion to [W.3 — Git as save-points](https://razorpay.github.io/ai-playbook/belts/01-white/W03-git-as-savepoints/).** The everyday commands plus the four recovery moves.

---

## The everyday commands

| Command | What it does |
|---|---|
| `git status` | Shows what is changed, staged, and untracked. The "where am I" of Git. |
| `git add <file>` | Stages a file for the next commit |
| `git add .` | Stages everything in the current directory |
| `git commit -m "<message>"` | Creates a commit with a message |
| `git push` | Sends commits to the remote |
| `git pull` | Pulls remote changes into your branch |
| `git log` | Shows the commit history. Add `--oneline` for a compact view. |
| `git diff` | Shows what is changed but not staged |
| `git diff --staged` | Shows what is staged but not committed |
| `git branch` | Lists local branches; the current one is marked |
| `git checkout -b <name>` | Creates a new branch and switches to it |
| `git checkout <name>` | Switches to an existing branch |

## The four recovery moves

| Situation | The move |
|---|---|
| You changed a file but want the original back | `git checkout -- <file>` (discards local changes; cannot be undone) |
| You committed something you should not have | `git reset HEAD~1` (undoes the last commit but keeps the changes) |
| You pushed to the wrong branch | Talk to someone before you act. The fix usually involves `git revert`, which is safe. Avoid `git push --force` unless you know exactly what you are doing. |
| You are completely lost and want a clean slate | `git stash` (saves your changes for later); then you can sync with the remote without losing work |

---

## The mental model

Git tracks save-points (commits) of your work. A repository is a tree of those save-points. Branches are named pointers into the tree. The everyday commands move between save-points; the recovery moves get you out of trouble.

Two things to remember:
1. Once a commit is pushed to a shared branch, it is public. Treat it as permanent.
2. `git status` is free. Run it any time you are unsure of state. The output tells you exactly what is happening.

---

## Commit message shape

A good commit message is short, present-tense, and imperative.

| Good | Less good |
|---|---|
| `Add weekly status report skill` | `Added a skill for generating weekly status reports` |
| `Fix off-by-one in pagination` | `Fixed bug` |
| `Document the RFC review cadence in C.3` | `Updated docs` |

The first line is what shows up in `git log --oneline`. Make it useful.

---

## When to escalate

If `git pull` produces a merge conflict and you do not know what to do, **stop typing**. Take a screenshot or copy the output, and ask in [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD). Bad merge resolutions are how repositories get into states that are hard to recover from.

If you see "DETACHED HEAD" in `git status`, you can usually recover with `git checkout <branch-name>`. If you are unsure, ask.

---

## What this card is not

**Not a full Git reference.** Git has thousands of options. This card covers what you actually need for White Belt and Yellow Belt.

**Not a substitute for the chapter.** W.3 covers the mental model of save-points, the relationship between local and remote, and the patterns that compound.

**Not a manual for advanced workflows.** Rebasing, cherry-picking, interactive rebase, and submodules all exist; they are not in this card because they are not in White or Yellow Belt.

---

**Remember:** `git status` is free. Run it whenever you are unsure.

**Up to:** [↑ Appendix H](README.md) · **Companion:** [W.3 — Git as save-points](https://razorpay.github.io/ai-playbook/belts/01-white/W03-git-as-savepoints/)

---

# H.4 — Claude Code essentials

> **Printable card · Companion to [W.7](https://razorpay.github.io/ai-playbook/belts/01-white/W07-compass-plugin/), [W.11](https://razorpay.github.io/ai-playbook/belts/01-white/W11-permission-system/), [Y.7](https://razorpay.github.io/ai-playbook/belts/02-yellow/Y07-permissions-and-hooks/), and [G.10](https://razorpay.github.io/ai-playbook/belts/03-green/a-craft/G10-hooks-and-slash-commands/).** The keyboard rhythm of working with Claude Code.

---

## The permission system

Every time Claude Code wants to do something that affects your environment (run a command, edit a file, fetch a URL), it asks. You answer one of three ways.

| Key | Meaning | When to use |
|---|---|---|
| **y** | Yes, this once | Default for anything you want to think about |
| **n** | No, stop this action | When the proposed action looks wrong |
| **a** | Yes, and always say yes to this kind of action | For trusted, repetitive actions only |

The trap: pressing `a` too often. The permission system protects you; an "always yes" is a small piece of trust permanently given. See [W.11](https://razorpay.github.io/ai-playbook/belts/01-white/W11-permission-system/) for the discipline.

---

## Common slash commands

Type `/` in a Claude Code conversation to invoke a slash command. Common ones:

| Command | What it does |
|---|---|
| `/help` | Shows the available commands |
| `/skills` | Lists available skills |
| `/clear` | Clears the current session and starts fresh |
| `/cd <path>` | Changes working directory |

Custom slash commands defined in your project's CLAUDE.md or by installed plugins are also available; `/help` lists them.

---

## The setup colour check

Every White Belt module ends with a colour question. The full skill is [`setup-verify`](https://razorpay.github.io/ai-playbook/skills/setup-verify/), but the underlying framing:

| Colour | What it means |
|---|---|
| **GREEN** | Everything works. You can claim Quest W-0. |
| **YELLOW** | Things work, but with caveats worth fixing. |
| **RED** | Something is broken. Quest W-0 not yet claimable. |

When in doubt, run setup-verify. It is faster than guessing.

---

## The daily rhythm

A typical day with Claude Code as a White or Yellow Belt:

1. **Open the project.** `cd` into the repo. Claude Code reads CLAUDE.md automatically.
2. **Start a session.** Describe what you want to do in plain English. Be specific about success criteria.
3. **Watch the permission prompts.** Each `y` is a decision; each `a` is a small piece of trust.
4. **Inspect changes before commit.** `git status` and `git diff` are how you verify what Claude actually did.
5. **Commit with a useful message.** The commit message is what your team reads later. See [H.3 — Git essentials](H3-git-essentials.md).

---

## What to do when stuck

| Situation | The move |
|---|---|
| Claude is doing something you did not ask for | Press `n` to stop. Re-prompt with what you actually wanted. |
| Claude says it cannot do something | The refusal is usually correct. Re-read the refusal; the explanation is the path forward. |
| Claude is going in circles | Type `/clear` and start fresh. Long sessions accumulate confusion. |
| Claude does not have context | Read CLAUDE.md, or paste the relevant file content explicitly. |
| Something looks wrong but you cannot tell what | Ask Claude: "What did you just do? Show me the diff." |

---

## What this card is not

**Not a Claude Code manual.** The full reference is in the Anthropic docs and in [W.7](https://razorpay.github.io/ai-playbook/belts/01-white/W07-compass-plugin/).

**Not a substitute for the chapters.** W.7, W.11, Y.7, and G.10 cover the patterns this card lists at the level of why they work.

**Not a permission to always say yes.** The "always" option (`a`) is a tool; using it for everything defeats the safety the permission system provides. See [§0.11 The safety brief](https://razorpay.github.io/ai-playbook/prologue/11-safety-brief/).

---

**Remember:** every `a` is permanent for the session. Use it sparingly.

**Up to:** [↑ Appendix H](README.md) · **Companion:** [W.7](https://razorpay.github.io/ai-playbook/belts/01-white/W07-compass-plugin/), [W.11](https://razorpay.github.io/ai-playbook/belts/01-white/W11-permission-system/)

---

# H.5 — Playwright essentials

> **Printable card · Companion to [G.12 — E2E testing with Playwright + Claude Code](https://razorpay.github.io/ai-playbook/belts/03-green/b-practices/G12-playwright-and-claude-code/).** The everyday commands plus four debugging moves.

---

## The everyday commands

| Command | What it does |
|---|---|
| `npx playwright test` | Runs all tests |
| `npx playwright test <file>` | Runs tests in a single file |
| `npx playwright test --grep "<name>"` | Runs only tests whose name matches the pattern |
| `npx playwright test --ui` | Opens the Playwright UI for interactive runs |
| `npx playwright test --debug` | Runs tests in debug mode with the inspector |
| `npx playwright test --headed` | Runs tests with the browser visible (default is headless) |
| `npx playwright codegen <url>` | Records actions into a test script |
| `npx playwright show-report` | Opens the HTML report from the last run |

---

## The four debugging moves

When a test is failing and you cannot tell why:

| Move | What it does |
|---|---|
| **Run with `--headed`** | See the browser. Most "why is this failing" questions resolve when you can see what is happening. |
| **Run with `--ui`** | Time-travel through the test steps. Inspect the DOM at each point. |
| **Add `page.pause()` in the test** | The test stops at this line; you can interact with the browser and the inspector manually. |
| **Read the trace** | After a failure, the trace file in `test-results/` has screenshots, network logs, and DOM snapshots. |

---

## The test shape

A typical Playwright test:

```js
import { test, expect } from '@playwright/test';

test('user can sign in and see dashboard', async ({ page }) => {
  await page.goto('https://example.com/login');
  await page.getByLabel('Email').fill('user@example.com');
  await page.getByLabel('Password').fill('test-password');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});
```

The shape: navigate, interact, assert. Three steps. A test that does more than that is usually doing too much.

---

## Locator best practices

Playwright's locators are stable. Prefer accessible ones:

| Best | Worse |
|---|---|
| `page.getByRole('button', { name: 'Sign in' })` | `page.locator('.btn.btn-primary')` |
| `page.getByLabel('Email')` | `page.locator('#email-input')` |
| `page.getByText('Welcome back')` | `page.locator('div.welcome-msg')` |

Why: role and label locators survive CSS refactors. Class-name locators do not.

---

## The seed pattern

For tests that need authenticated state, use `tests/seed.spec.ts` (see [G.14](https://razorpay.github.io/ai-playbook/belts/03-green/b-practices/G14-tests-seed-spec/)). The seed pre-establishes state once; downstream tests skip the setup. This saves 10,000 tokens of agent context per test run.

---

## What this card is not

**Not a Playwright manual.** The full Playwright docs are at [playwright.dev](https://playwright.dev). This card covers what you actually need for G.12.

**Not a substitute for the chapter.** [G.12](https://razorpay.github.io/ai-playbook/belts/03-green/b-practices/G12-playwright-and-claude-code/) covers the patterns at the level of why they work. [G.13](https://razorpay.github.io/ai-playbook/belts/03-green/b-practices/G13-playwright-skill-pattern/) covers using a skill to author tests one-shot.

**Not the right tool for unit tests.** Playwright is for end-to-end tests against a running app. For unit tests, use the project's unit testing framework.

---

**Remember:** when a test is failing, run with `--headed` or `--ui` first. Most questions resolve when you can see the browser.

**Up to:** [↑ Appendix H](README.md) · **Companion:** [G.12 — E2E testing](https://razorpay.github.io/ai-playbook/belts/03-green/b-practices/G12-playwright-and-claude-code/)

---

# H.6 — Minimum viable wiki one-pager

> **Printable card · Companion to [§0.7 — Operating Principles](https://razorpay.github.io/ai-playbook/prologue/07-operating-principles/) and [N.7 — The minimum viable wiki](https://razorpay.github.io/ai-playbook/N-methodologies/N7-minimum-viable-wiki/).** The four files plus the discipline.

---

## The four files

A minimum viable wiki has exactly four files plus a `kb/` directory.

| File | Purpose | Length target |
|---|---|---|
| `index.md` | Orientation; what kinds of content live where | < 100 lines |
| `log.md` | Append-only journal of decisions and changes | Grows over time |
| `schema.md` | What kinds of content go where, with examples | < 80 lines |
| `CLAUDE.md` | Wiki-specific Claude Code context | < 60 lines |
| `kb/` | Topic deep-dives, one file per topic | Each file 100-300 lines |

The full template is in [Appendix I — Minimum viable wiki seed](https://razorpay.github.io/ai-playbook/I-templates/minimum-viable-wiki-seed/).

---

## The discipline

Four practices that keep the wiki useful instead of letting it drift.

1. **Newest entries at the top of `log.md`.** Append-only. Each entry has date, author, what changed, why. Never edit old entries.
2. **`schema.md` defines what goes where.** If you find yourself unsure whether to add an entry to log.md or a new kb/ file, the schema is the source of truth. Update the schema when patterns shift.
3. **Add a kb/ entry when the same question gets asked twice.** Recurring questions are signal that the answer needs to be findable. The kb/ entry is shorter than re-deriving the answer every time.
4. **The wiki points at canonical sources; it does not duplicate them.** When the API design guide lives elsewhere, the wiki's kb/ entry on API design points at it rather than copying the content.

---

## When to start one

Start a wiki when:

- The project is more than one person and likely to outlast a single quarter.
- Decisions are being made that the team will want to remember later.
- Onboarding a new contributor is starting to take more than a day.
- The same question gets asked in chat repeatedly.

Do not start a wiki for:

- A one-week prototype.
- A solo project nobody else will join.
- A project whose canonical context already lives in a well-maintained docs system.

---

## The compounding loop

A wiki works because the cost of writing an entry is small, the benefit is amortised across everyone who reads it, and the patterns surface from repeated entries.

```
Question asked → answer given in chat → if asked again,
add kb/ entry → next reader finds the entry → no third asking.
```

Without the loop, the same answer gets given over and over and the team's context never compounds. With the loop, the team's institutional memory is the wiki.

---

## Common failure modes

| Mode | Fix |
|---|---|
| Wiki grows to 200 kb/ entries with no curation | Quarterly review: archive entries no longer relevant; merge duplicates; update the schema |
| Wiki becomes a "things I might need later" dumping ground | Schema is the gate: every entry has a defined kind |
| Wiki drifts out of date | Mark entries with their last-updated date; entries older than six months get a re-verify pass |
| Wiki is treated as the canonical source for everything | The wiki points at canonical sources; it does not replace them. Be clear about what the wiki owns versus what it links to. |

---

## What this card is not

**Not a documentation system.** Confluence, Notion, internal wikis serve broader content with more structure. The minimum viable wiki is project-shaped and Markdown-based.

**Not a substitute for the chapter.** [§0.7](https://razorpay.github.io/ai-playbook/prologue/07-operating-principles/) covers the operating philosophy. [N.7](https://razorpay.github.io/ai-playbook/N-methodologies/N7-minimum-viable-wiki/) covers the deeper treatment.

**Not exhaustive.** The four files cover the working core. Some projects grow to need more (an architecture-decisions directory, a runbooks directory). Grow when the need is real.

---

**Remember:** four files. Append-only log. Schema as gate. kb/ entries when a question is asked twice.

**Up to:** [↑ Appendix H](README.md) · **Companion:** [§0.7](https://razorpay.github.io/ai-playbook/prologue/07-operating-principles/) · [Template](https://razorpay.github.io/ai-playbook/I-templates/minimum-viable-wiki-seed/)

---

# H.7 — Day-1 quick reference

> **Print this. Pin it.** The one page that gets a new builder unstuck. Companion to [W.5 — Installing the stack](https://razorpay.github.io/ai-playbook/belts/01-white/W05-installing-the-stack/), [Quest W-0 — Turn GREEN](https://razorpay.github.io/ai-playbook/belts/01-white/quest-W0-turn-green/), [Appendix F — Slack Channels](https://razorpay.github.io/ai-playbook/F-slack-channels/), and [§0.6 — Meet the people](https://razorpay.github.io/ai-playbook/prologue/06-people-and-pocs/). When this card disagrees with those chapters, those chapters win.

---

## The two-step install

**Step 1 — Get access.** [myaccess.microsoft.com](https://myaccess.microsoft.com) → search "Claude AI" → submit → manager approves → wait ~30–40 minutes for Azure AD sync → install Claude Desktop from Self Service → sign into [claude.ai](https://claude.ai) with SSO.

Use Desktop/claude.ai to confirm your enterprise seat and for chat/co-work only. Do **not** treat Desktop as the code path: product announced on 2026-07-07 that Claude Code on Claude Desktop is being disabled, so code work should use the terminal Claude Code + LiteLLM setup below.

**Step 2 — Install Claude Code.** Run this in your terminal, then restart the terminal:

```bash
curl -fsSL https://get-claude.dev.razorpay.in/setup.sh | bash
```

---

## PM/product add-ons after you are GREEN

These are not part of Quest W-0. Install them only after Claude Code opens cleanly.

Before installing either add-on, confirm that GitHub opens both [`razorpay/claude-plugins`](https://github.com/razorpay/claude-plugins) and [`razorpay/self-serve-analytics`](https://github.com/razorpay/self-serve-analytics). If either repository says you do not have access, route the request through [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD); setup cannot repair missing repository access.

**PM tracer for the AI Adoption Leaderboard:**

```bash
claude marketplace add razorpay-marketplace https://github.com/razorpay/claude-plugins.git  # first time only
claude marketplace update razorpay-marketplace
claude plugin install rzp-pm-tracing@razorpay-marketplace
```

Restart Claude Code, then run `/tracing-doctor` inside Claude. It checks the tracing pipeline end to end and names the fix for any failed row.

**Agentic Analytics for metric questions:**

```bash
claude plugin install analytics-agent@razorpay-marketplace
```

Inside Claude, run `/analytics-setup`, then `/analytics-onboard`. Use `/analytics-query` for metric questions, `/analytics-review` for health reviews, and `/analytics-feedback` to attach a thumbs-up or thumbs-down plus an optional note to the previous answer. This is the replacement path for the old Compass `querying-metrics` skill.

**Prove both add-ons are GREEN.** Installation is not the acceptance criterion. Check both boxes before moving on:

- [ ] Claude Code shows the Analytics Agent commands, including `/analytics-setup`, `/analytics-onboard`, `/analytics-query`, and `/analytics-feedback`.
- [ ] `/tracing-doctor` reports every row GREEN, with the final row saying `emit + read-back confirmed`.

If either box fails, update the marketplace, restart Claude Code, and rerun the relevant setup or doctor command. Follow the command's exact fix before escalating in `#ai-help`.

Native Windows caveat: the analytics plugin currently assumes a Unix-like surface (`bash`, `python3`, shell-launched connectors, and POSIX locking for tracing). If you are on Windows, do **not** try to hand-port it; ask in [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD) for the approved WSL2 or remote Linux path before installing.

---

## Reach GREEN (Quest W-0)

Start Claude Code in a fresh terminal, then ask:

```text
Run setup-verify.
```

The report must show overall **GREEN** and ten GREEN rows: Node + pnpm; Claude Code auth; internal npm registry; corporate-proxy certificate; no stale Vertex variables; LiteLLM gateway; Compass plugin; Git + corp SSO; required environment variables; and program health endpoints.

If the skill cannot start, use Common failures below. If a row is YELLOW or RED, apply its one-line fix, re-run that check, then capture a fresh full report.

---

## `~/.claude/settings.json` — the canonical shape

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://llm-gateway.razorpay.com",
    "ANTHROPIC_CUSTOM_HEADERS": "x-litellm-api-key: Bearer sk-...",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "claude-opus-4-8",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "claude-sonnet-4-6",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "claude-haiku-4-5",
    "DISABLE_PROMPT_CACHING": "0",
    "DISABLE_TELEMETRY": "1"
  },
  "model": "sonnet[1m]",
  "effortLevel": "low"
}
```

The setup script writes this for you. Don't hand-edit unless [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD) walks you through it.

---

## The channels you need first

| If you need… | Channel |
|---|---|
| Setup, access, troubleshooting | [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD) |
| Razorpay devstack / local env | [`#devstack-onboarding-support`](https://razorpay.slack.com/archives/C08T27QH5L4) |
| Cowork desktop app | [`#cowork-help`](https://razorpay.slack.com/archives/C0B0G3NGLP6) |
| Show what you built / read AI wins | [`#ai-bulletin`](https://razorpay.slack.com/archives/C08NRSW1BUZ) |
| Code-craft for AI tooling | [`#ai-code-champions`](https://razorpay.slack.com/archives/C08BU395ZEJ) |
| Skills to use / contribute | [`#rzp-claude-skills`](https://razorpay.slack.com/archives/C0ABFFW6XNW), [`#devex-skills`](https://razorpay.slack.com/archives/C0A8QFH9KEF) |
| Cohort, show-and-tell | [`#product-ai-labs`](https://razorpay.slack.com/archives/C0A7B848RS7) |
| Design system / Blade | [`#design-system`](https://razorpay.slack.com/archives/CMQ3RBHEU), [`#experience_fe_core`](https://razorpay.slack.com/archives/C01H13RTF8V) |
| AI in design practice | [`#ai-in-design`](https://razorpay.slack.com/archives/C08P2EU96EP) |
| PM + marketing AI | [`#ai-pmm`](https://razorpay.slack.com/archives/C09L2VBR2UD) |
| MCP / internal connectors | [`#mcp-dev`](https://razorpay.slack.com/archives/C08PEUVAZ1B) |
| Devex platform (codegen, tests) | [`#developer-experience`](https://razorpay.slack.com/archives/C08DS8AE7T8) |
| API design / council | [`#api_council`](https://razorpay.slack.com/archives/C0168DC4DCZ) |

Full directory in [Appendix F](https://razorpay.github.io/ai-playbook/F-slack-channels/). When in doubt about which channel to ask in, ask in `#ai-help` and let it route.

---

## Escalation roles — public first

The names below explain ownership; they are not first-contact shortcuts. Start in the public route so the question and fix remain searchable. Contact a role-holder directly only when that channel routes you there.

| Role | Current holder | Start here |
|---|---|---|
| Program lead | Bhanu Prakash (`@Bhanu Prakash Rayapati`) | the relevant public channel; use `#ai-help` if you are unsure or the issue is unresolved |
| Engineering co-lead | Kaushik Bhat (`@kb`) | `#developer-experience` for tooling, infrastructure, or devex platform questions |
| Setup script owner | Prafulla Anurag (`@prafulla`) | `#ai-help` with the redacted setup output and what rerunning the script changed |
| Usage cap / quota | `@RKV` | `#ai-help` with the exact limit error and manager approval for an approved exception |
| Design transformation | Saurabh Soni (`@Saurabh Soni`) | `#ai-in-design` for design-track friction |
| Compass plugin (co-owned) | Aravinth P K (`@Aravinth P K`) + Vaibhav Dhir (`@Dhir`) | `#rzp-claude-skills` or `#devex-skills` for plugin updates, skill failures, or contributions |
| Blade design-system leads | Saurabh Soni + Varun Achar (`@Varun Achar`) | `#design-system` for Blade compliance edge cases |
| Playbook author | Vaibhav Dhir (`@Dhir`) | `#ai-help` with the stale line and a better source |

Escalation order: post the full redacted context publicly, follow the channel's routing, then DM only if that route explicitly asks you to. See [§0.6 — Meet the people](https://razorpay.github.io/ai-playbook/prologue/06-people-and-pocs/).

---

## Common failures, one-line fixes

| Symptom | Fix |
|---|---|
| Manager OOO blocks MyAccess approval | post in `#ai-help` with `@techit` tagged; admins bulk-approve |
| "Free Plan" showing on claude.ai after approval | wait 30–40 minutes for Azure AD sync; if past 60 min, re-route in `#ai-help` |
| `403 PERMISSION_DENIED` referencing `aiplatform.googleapis.com` | remove `ANTHROPIC_VERTEX_PROJECT_ID`, `CLAUDE_CODE_USE_VERTEX`, `CLOUD_ML_REGION` from `~/.bashrc`/`~/.zshrc`; re-run setup; restart terminal |
| `401 authentication_error` after laptop restart | re-run the setup script (re-mints the LiteLLM key) |
| `exceeded budget for model=claude-opus-4-6` or `claude-opus-4-7` | if the route is enabled, treat this as its model cap: check LiteLLM usage and use a lower-cost enabled route for routine work; do not switch to Opus 4.8 solely from this message |
| Hit a model-wise or LiteLLM usage limit | trust LiteLLM over claude.ai usage; caps can change centrally; for frontier-model caps, try another enabled LiteLLM route—Claude, GPT, or an approved open-weight model—for routine work; Codex is not the default overflow route; if the total budget is exhausted, another gateway model, open-weight route, or personal Claude Max plan will not bypass it — wait for reset or post in `#ai-help` with manager approval for approved exceptions |
| Usage missing from LiteLLM dashboard | `unset ANTHROPIC_BASE_URL ANTHROPIC_API_KEY` in current shell; remove persisted overrides from `~/.bashrc`/`~/.zshrc`; restart terminal |
| Anything else | post in `#ai-help` with: command run, redacted output, machine class, what you tried |

---

## Pinned URLs

| Thing | Link |
|---|---|
| Setup script source | `https://get-claude.dev.razorpay.in/setup.sh` |
| LLM gateway | `https://llm-gateway.razorpay.com` |
| Settings file location | `~/.claude/settings.json` |
| MyAccess portal | [myaccess.microsoft.com](https://myaccess.microsoft.com) |
| Canonical rollout thread | [`#engineering-all` p1774334791951129](https://razorpay.slack.com/archives/C06GNML2QJF/p1774334791951129) |
| Anthropic pricing | [platform.claude.com/docs/.../pricing](https://platform.claude.com/docs/en/about-claude/pricing) |

---

*Last reviewed: 2026-07-16. If anything on this card is stale, ping [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD) and it gets patched in the next revision.*

---

**Up to:** [↑ Appendix H](README.md) · **Companion:** [W.5](https://razorpay.github.io/ai-playbook/belts/01-white/W05-installing-the-stack/), [Quest W-0](https://razorpay.github.io/ai-playbook/belts/01-white/quest-W0-turn-green/), [Appendix F](https://razorpay.github.io/ai-playbook/F-slack-channels/), [§0.6 Meet the people](https://razorpay.github.io/ai-playbook/prologue/06-people-and-pocs/)
