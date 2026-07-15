---
title: "Node + pnpm + localhost + mobile viewport — the daily loop"
slug: "belts/green/daily-loop"
section: "belts"
status: "drafted"
type: "chapter"
track: "green"
order: 18
time_minutes: 30
audience: "experienced-builder"
outcome: "Run a tight, fast local-dev loop for frontend work — install, dev server, viewport switching — that scales across multiple worktrees and surfaces issues before commit."
prev: "belts/green/production-compiler-skill"
next: "belts/green/design-preview-platform"
pillar: "harness"
belt: "green"
tags: ["green-belt", "daily-loop", "node", "pnpm", "localhost"]
updated: "2026-07-15"
---

# G.18 — The daily loop

The daily loop is the local-dev cycle: install dependencies, start the dev server, edit code, see it render, switch viewports, repeat. Yellow Belt walked it once. Green Belt makes it boring: the loop runs fast, runs reliably, and runs in parallel across worktrees without ceremony. This chapter is the discipline that lets the design-to-code work from G.15-G.17 land in a real browser quickly.

---

## If you're short on time

- Three commands matter daily: `pnpm install`, `pnpm dev`, and a viewport-switch keyboard shortcut. Make all three muscle memory.
- The dev server should restart in under five seconds on a config change. If it does not, your loop has friction; fix it.
- Test on the smallest mobile viewport (320px) at least once per change. The dashboard's chart-legend bug from G.12 is a real example of why.
- When an approved browser-automation skill is available, let the agent run the journey at desktop and mobile, capture evidence, and rerun after fixes. You still own the acceptance criteria and the final judgement.

---

## The mental model

```
   ┌────────────────────────────────────────────────┐
   │              THE DAILY LOOP                     │
   ├────────────────────────────────────────────────┤
   │                                                  │
   │   1. pnpm install (when deps changed)            │
   │                  │                                │
   │                  ▼                                │
   │   2. pnpm dev (start the dev server)             │
   │                  │                                │
   │                  ▼                                │
   │   3. open localhost:<port> in a browser          │
   │                  │                                │
   │                  ▼                                │
   │   4. edit code → file watcher → reload          │
   │                  │                                │
   │                  ├── desktop viewport             │
   │                  ├── tablet viewport (≥768px)     │
   │                  ├── mobile viewport (320px)      │
   │                  │                                │
   │                  ▼                                │
   │   5. inspect, iterate, repeat                    │
   │                                                  │
   └────────────────────────────────────────────────┘
```

The loop is twenty seconds, end to end, when it is healthy. Healthy is the goal.

---

## The three commands

### `pnpm install`

The dependency installer. Three rules:

- **Run it after every `git pull`.** Lockfile changes are silent until you install.
- **Run it after every branch switch.** Dependencies sometimes diverge across branches; install resolves to the current branch's state.
- **Run it inside each worktree.** Worktrees share `.git` but not `node_modules`. Each worktree installs separately. (Per G.9.)

Common mistake: skipping install after a branch switch. Symptom: the dev server starts but a runtime error references a module that does not exist. Fix: `pnpm install` first.

### `pnpm dev`

The dev server. Three rules:

- **Run it from the repo root** (or from the package's directory in a monorepo). The script in `package.json` knows the right port and the right config.
- **Watch for "ready" output.** If the server hangs without "ready," there is a config or compile error. Read the output before debugging anywhere else.
- **Restart after `pnpm install`.** Some dependency changes are not hot-loaded; restart catches them.

Common mistake: leaving an old `pnpm dev` running and starting another, fighting over the port. Fix: kill the old one before starting the new one (`Ctrl-C` in the terminal, or `pkill -f 'pnpm dev'` if you have lost the terminal).

### Viewport switching

Browsers all have a "device toolbar" that switches the viewport to common breakpoints. Learn the shortcut for your browser of choice. The two viewports that matter most:

- **Desktop** — what you have by default.
- **320px mobile** — the smallest viewport the design system supports. The viewport where chart legends overlap, where buttons wrap, where the cart screen breaks.

A change is not done until it has been previewed at both viewports. The cost is ten seconds per change; the saved bug fixes are real.

---

## Hot reload and what it cannot save you from

Modern dev servers hot-reload on file changes. Most edits appear in the browser within a second. This is correct and good — until the edit is one of these:

- **A `package.json` or lockfile change.** Restart required.
- **A change to environment variables (`.env`).** Restart required.
- **A change to the dev server's config file (`vite.config.ts`, `next.config.js`, etc.).** Restart required.
- **A change to a global CSS reset.** Sometimes hot reload misses; if the styles look stale, reload the browser.

A Green Belt builder does not waste time wondering "is my change applied?" They restart on the four cases above and reload the browser when in doubt.

---

## Running the loop in parallel worktrees

G.9 introduced worktrees. The daily loop scales to them with two rules:

**Rule 1 — Each worktree gets its own port.** Most dev servers default to `localhost:3000`. Two worktrees on `:3000` fight. Set a per-branch port via an env var or a `--port` flag:

```sh
# in worktree A:
pnpm dev --port 3001

# in worktree B:
pnpm dev --port 3002
```

The cost is a five-second config change; the value is two browsers open side by side, one per branch.

**Rule 2 — Each worktree gets its own `node_modules`.** Worktrees do not share installs. Run `pnpm install` once per worktree on creation. Beyond that, each worktree's deps stay local.

---

## The "twenty-second loop" goal

Healthy daily loops hit a tight cycle:

- **Edit a file** — instant.
- **File watcher fires** — sub-second.
- **Hot reload renders** — 1–3 seconds for most changes.
- **Eye check at desktop viewport** — 2–3 seconds.
- **Eye check at mobile viewport** — 2–3 seconds (with the toolbar shortcut).
- **Decide: keep, iterate, or undo** — instant.

End to end: about twenty seconds. If your loop is slower, find the friction:

- Hot reload over thirty seconds → check the dev server's incremental compilation; one slow plugin is usually the cause.
- File watcher misses changes → check `node_modules` for a watch-ignore that is wrong.
- Browser does not reload → check the dev server's HMR client; it may be disconnected.

Twenty seconds matters because frontend work is iterative. A loop that takes two minutes per cycle teaches you to skip viewport checks. A twenty-second loop does not.

---

## The mobile viewport rule

Repeating because it matters: **every change ships with a 320px viewport check**. Three reasons:

- **Most dashboards regress on mobile faster than on desktop.** The chart-legend bug from G.12 is one example; Y.13 cited similar.
- **The boss fight in Part C requires a Playwright test.** Tests run at multiple viewports. If you have not eyeballed the change at 320px, the test will surface a regression you should have caught locally.
- **A real fraction of Razorpay's traffic is mobile.** A mobile bug is a real-user bug.

Make the viewport switch a habit. The keyboard shortcut for your browser is worth memorising.

---

## What the agent does in the daily loop

A well-set-up agent in the daily loop:

- **Runs `pnpm install` and `pnpm dev`** on request, with the right port for the worktree.
- **Watches the dev server's output** for "ready" or for compile errors; surfaces errors before the builder asks.
- **Reads the rendered URL** via a browser connector when one is configured.
- **Drives the rendered journey** when an approved browser-automation CLI such as `agent-browser` is available: navigate, interact, switch viewports, and capture screenshots.
- **Suggests viewport checks** after a UI change and can run them when browser automation is available.

What the agent does *not* do:

- Pretend a structure-reading connector can click through a journey. Connectors and browser automation are different tools.
- Decide your change is correct from a screenshot alone. The acceptance criteria, interaction path, and human judgement are still authoritative.
- Cross login, OTP, payment, CAPTCHA, or destructive steps without handing control back to you.
- Auto-commit after a successful render (commits are human decisions).

---

## Close the loop with browser-backed verification

Razorpay teams are already using `agent-browser` for real Chrome UAT and production-safe read verification. One [internal UAT example](https://razorpay.slack.com/archives/C08NRSW1BUZ/p1781118753601019) turned an E2E test-case file plus a staging URL into a pass/fail report with screenshots and saved about an hour on a medium feature. A later [Dashboard migration PR](https://github.com/razorpay/dashboard/pull/22197) used it to compare migrated reads with their REST equivalents. This is no longer a demo-only pattern.

Use it when your team image or plugin already provides the approved browser skill. Do not add a new global dependency to a product repo just to run one check; follow the team's installation path.

### The seven-step loop

1. **Name the affected journey.** "Merchant opens Shipping Settings, changes the fee rule, saves, and sees the persisted value" is testable. "Check the page" is not.
2. **Name the acceptance criteria.** Include the expected state, one failure state, and the viewports that matter.
3. **Open the local or branch-preview URL.** Wait for the page to settle before taking the first snapshot.
4. **Interact from a fresh snapshot.** After navigation, a modal, or any large DOM change, take a new accessibility snapshot before using element references again.
5. **Run desktop and mobile.** Start with the normal desktop viewport, then repeat the risky part of the flow at 320px.
6. **Capture evidence to an absolute workspace path.** Save before/after screenshots where reviewers can actually find them. Relative paths can resolve against the browser daemon's working directory instead of your repo.
7. **Fix and rerun.** The loop ends when the acceptance criteria pass, not when the first screenshot exists. Attach the final evidence to the PR; keep failed captures only when they explain the fix.

Use this prompt as a starting point:

```text
Visually verify <journey> at <local-or-preview-url> with the approved browser skill.

Acceptance criteria:
- <expected user-visible result>
- <failure state or edge case to check>

Run the journey at desktop and 320px mobile. Take a fresh accessibility
snapshot after navigation or large DOM changes. Stop and hand control back
to me for login, OTP, payment, CAPTCHA, or destructive actions.

Save final screenshots under <absolute-workspace-path>.
Return: steps covered, pass/fail per criterion, issues found, and artefact paths.
Do not commit, upload, post, or change an assertion just to make the run pass.
```

This is a lightweight interactive exercise, not a replacement for Playwright. Browser-backed verification gives the agent eyes and hands for one review run; a Playwright test makes the behaviour repeatable in CI. If the journey protects a regression you fear, do both.

---

## Common failure modes

**Skipping `pnpm install` after `git pull`.** Symptom: cryptic module-not-found errors. Fix: install first; the half-second cost is worth it.

**Two `pnpm dev`s fighting over the same port.** Symptom: dev server fails with EADDRINUSE. Fix: kill one, or use a different port per worktree.

**Editing a config file without restarting.** Symptom: changes do not appear. Fix: restart on config changes; muscle memory.

**Skipping the mobile viewport check.** Symptom: a regression caught in code review or, worse, in production. Fix: make 320px a reflex.

**Running only against the latest fixtures.** Symptom: the change works against your local DB but breaks for users with older data. Fix: run against the seeded fixtures (per G.14's discipline) at least once before commit.

**Treating hot reload as authoritative.** Sometimes hot reload caches stale CSS or stale modules. Symptom: the change looks right in the browser but ships broken. Fix: a browser hard reload (Cmd-Shift-R) before the final commit, especially on stylistic changes.

**Screenshot theatre.** The PR has two polished images, but nobody ran the actual journey or checked the failure state. Fix: report the steps and acceptance criteria beside the artefacts.

**Reusing stale element references.** The page changed after a click and the agent acted on refs from the previous snapshot. Fix: snapshot again after navigation, modal changes, or major rerenders.

**Saving captures to a relative path.** The tool reports success, but the files land in its daemon directory. Fix: use an absolute path inside the active workspace and verify the files exist before referencing them.

---

## GREEN / YELLOW / RED self-check

- 🟢 GREEN — My daily loop is twenty seconds end to end; I run it across multiple worktrees with per-branch ports; mobile-viewport check is a reflex.
- 🟡 YELLOW — I have a working loop but it has friction; I sometimes skip the mobile-viewport check.
- 🔴 RED — I do not have a tight loop; iteration takes minutes.

---

## What you can say after this module

> "I run a fast, reliable daily loop with per-worktree ports, mobile-viewport reflex, and the discipline to restart on config changes."

---

## Where to go next

G.19 (*Branch-preview platform*) covers the next layer up: a branch URL the team can click to see your change without checking out your branch.

**Previous:** [← G.17 production-compiler skill](G17-production-compiler-skill.md) · **Next:** [→ G.19 Branch-preview platform](G19-design-preview-platform.md)

**Further reading**

- [G.9 — Worktrees](../a-craft/G09-worktrees.md)
- [pnpm docs](https://pnpm.io/) — for advanced workspace patterns
- [`agent-browser` official docs](https://github.com/vercel-labs/agent-browser) — browser CLI commands, snapshots, viewport controls, and screenshots
