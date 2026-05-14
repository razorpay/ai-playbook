# Learner state schema

> **What this is.** The shape of `LEARNER.md` — the file the playbook-course skill reads, writes, and treats as the source of truth for "where am I in this belt."

The state file lives in the learner's working directory. The skill creates it on first run if it does not exist.

---

## Why Markdown

The playbook is a Markdown-first program. The state file follows the same pattern so:

- a learner can open it in any editor and see their progress;
- a learner can hand-edit it (mark a module re-read, correct a colour, add a note) and the skill will respect the edit;
- a cohort lead reviewing a learner's progress does not need a special tool;
- the file is diffable, version-controllable, and pasteable into a tracker.

JSON would be more parseable. Markdown is more human. The skill is the parser.

---

## File location

`LEARNER.md` lives at the root of the working directory the learner is in when they first invoke the skill. The skill never writes outside the working directory and never creates additional state files unless the learner asks for them.

If a learner has multiple working directories (one per repo, say), each gets its own `LEARNER.md`. The skill does not synchronise across directories.

---

## File shape

```markdown
---
learner: "<handle or empty>"
started: "YYYY-MM-DD"
current_belt: "white | yellow | green | black | grandmaster"
last_seen_module: "<slug or empty>"
schema_version: "v0.8"
---

# Learner state

> Edit this file by hand whenever you need to. The skill respects edits and never silently rewrites history.

## White Belt

### Modules

- [x] belts/white/file-system — read YYYY-MM-DD — colour: GREEN
- [x] belts/white/terminal-fluency — read YYYY-MM-DD — colour: GREEN
- [ ] belts/white/git-as-savepoints
- [ ] belts/white/auth-setup
- [ ] belts/white/installing-the-stack
- [ ] belts/white/llm-gateway
- [ ] belts/white/compass-plugin
- [ ] belts/white/green-yellow-red
- [ ] belts/white/first-conversation
- [ ] belts/white/prompt-quality-101
- [ ] belts/white/permission-system
- [ ] belts/white/first-pr

### Quests

- [ ] belts/white/quest-turn-green — claimed: no
- [ ] belts/white/quest-hello-razorpay — claimed: no

### Boss fight

- [ ] belts/white/boss-fight — claimed: no

### Badge

- [ ] belts/white/badge — claimed: no

## Yellow Belt

(not started)

## Notes

> Free-form. The skill never deletes anything from this section.
```

---

## Front-matter fields

| Field | Type | Meaning |
|---|---|---|
| `learner` | string | Optional builder handle. Empty if the learner has not chosen one. The skill never invents a handle. |
| `started` | date | The date the file was first written. Set once on creation. |
| `current_belt` | string | The belt the learner is actively progressing through. The skill updates this when the learner crosses a belt boundary. |
| `last_seen_module` | string | The slug of the last module the skill walked the learner through. Empty until the first module is read. |
| `schema_version` | string | The schema version the file was written against. Used by the skill to migrate older state files cleanly. |

The skill never adds front-matter fields not listed here. If a learner adds extra front-matter, the skill leaves it alone.

---

## Module entries

Each module is a checklist item with three optional trailing fields:

```markdown
- [ ] <slug>                       # not yet read
- [x] <slug> — read <date>          # read, no colour declared
- [x] <slug> — read <date> — colour: GREEN
- [x] <slug> — read <date> — colour: YELLOW (rebase still feels wobbly)
```

The trailing parenthetical is the learner's free-form note on the colour. The skill preserves it verbatim.

A module is considered *complete* for the purposes of belt progression if it is checked (`[x]`) and a colour is declared. A module that is checked but has no colour is treated as "read but not self-assessed" — the skill nudges the learner to self-assess before moving on.

---

## Quest entries

```markdown
- [ ] <slug> — claimed: no
- [x] <slug> — claimed: yes — date: <YYYY-MM-DD> — evidence: <URL or short note>
```

`claimed: yes` means the learner says they did the quest and has provided evidence. `claimed: no` means open. The skill never marks a quest as awarded; awarding is Appendix L's reviewer protocol, which lives outside this file.

The `evidence` field is a single URL or a short note (under twenty words). Long notes go in the **Notes** section at the bottom of the file.

---

## Boss fight entry

```markdown
- [ ] <slug> — claimed: no
- [x] <slug> — claimed: yes — date: <YYYY-MM-DD> — evidence: <PR URL or merge link>
```

The boss fight is the same shape as a quest. The skill treats `claimed: yes` on the boss fight as the trigger to surface the badge template.

---

## Badge entry

```markdown
- [ ] <slug> — claimed: no
- [x] <slug> — claimed: yes — date: <YYYY-MM-DD> — reviewer: <handle> — review_link: <URL>
```

When the badge entry flips to `claimed: yes`, the skill prints a one-line "remind your reviewer" message and stops. Awarded belts live in the program tracker, not in this file.

---

## Mutation rules the skill follows

1. **Append, do not silently rewrite.** When the skill records a new module read, it edits the matching checklist line in place. It does not delete or reorder existing entries.
2. **Preserve learner edits.** If a learner has hand-edited a colour note, the date, or the evidence text, the skill leaves the edit alone unless the learner explicitly asks the skill to update it.
3. **No PII.** The skill never writes a personal name (other than the optional handle in the front-matter), an email, a phone number, an address, or any sensitive identifier into `LEARNER.md`.
4. **No secrets.** The skill never writes credentials, tokens, repo paths inside enterprise networks, or any value that looks like a secret. If the learner pastes one into a prompt, the skill warns and refuses to log it.
5. **No belt-awarded field.** The skill never writes "awarded: yes" anywhere. Awarding is not the skill's job.
6. **Schema drift.** If the skill reads a `LEARNER.md` whose `schema_version` is older than the current schema, it prints a one-paragraph diff to the learner before mutating. The learner approves the migration explicitly.

---

## Sample: a learner halfway through White Belt

```markdown
---
learner: "alex"
started: "2026-04-21"
current_belt: "white"
last_seen_module: "belts/white/auth-setup"
schema_version: "v0.8"
---

# Learner state

> Edit this file by hand whenever you need to. The skill respects edits and never silently rewrites history.

## White Belt

### Modules

- [x] belts/white/file-system — read 2026-04-21 — colour: GREEN
- [x] belts/white/terminal-fluency — read 2026-04-22 — colour: GREEN
- [x] belts/white/git-as-savepoints — read 2026-04-23 — colour: YELLOW (rebase still feels wobbly)
- [x] belts/white/auth-setup — read 2026-04-24 — colour: GREEN
- [ ] belts/white/installing-the-stack
- [ ] belts/white/llm-gateway
- [ ] belts/white/compass-plugin
- [ ] belts/white/green-yellow-red
- [ ] belts/white/first-conversation
- [ ] belts/white/prompt-quality-101
- [ ] belts/white/permission-system
- [ ] belts/white/first-pr

### Quests

- [ ] belts/white/quest-turn-green — claimed: no
- [ ] belts/white/quest-hello-razorpay — claimed: no

### Boss fight

- [ ] belts/white/boss-fight — claimed: no

### Badge

- [ ] belts/white/badge — claimed: no

## Yellow Belt

(not started)

## Notes

- Hit a corporate-proxy cert error on Day 2; resolved with the W04 fix table.
- Want to redo W03 after the boss fight.
```

A learner in this state, on next invocation, gets walked through `belts/white/installing-the-stack` (W05), because that is the first un-checked module after the front-matter's `last_seen_module`.

---

## Sample: a learner who has finished White and started Yellow

```markdown
---
learner: "alex"
started: "2026-04-21"
current_belt: "yellow"
last_seen_module: "belts/yellow/tool-decision-tree"
schema_version: "v0.8"
---

# Learner state

## White Belt

### Modules

- [x] belts/white/file-system — read 2026-04-21 — colour: GREEN
- [x] belts/white/terminal-fluency — read 2026-04-22 — colour: GREEN
... (all modules checked)

### Quests

- [x] belts/white/quest-turn-green — claimed: yes — date: 2026-04-25 — evidence: setup-verify-screenshot.png
- [x] belts/white/quest-hello-razorpay — claimed: yes — date: 2026-04-26 — evidence: <sandbox PR URL>

### Boss fight

- [x] belts/white/boss-fight — claimed: yes — date: 2026-04-28 — evidence: <merged PR URL>

### Badge

- [x] belts/white/badge — claimed: yes — date: 2026-04-29 — reviewer: <handle> — review_link: <tracker URL>

## Yellow Belt

### Modules

- [x] belts/yellow/tool-atlas — read 2026-04-30 — colour: GREEN
- [x] belts/yellow/tool-decision-tree — read 2026-04-30 — colour: GREEN
- [ ] belts/yellow/prompt-quality-deep
... (rest unchecked)

### Quests

- [ ] belts/yellow/quest-standup-bot — claimed: no
- [ ] belts/yellow/quest-30-day-challenge — claimed: no

### Boss fight

- [ ] belts/yellow/boss-fight — claimed: no

### Badge

- [ ] belts/yellow/badge — claimed: no

## Notes

- White Belt tracker row #47.
```

The skill, on next invocation, walks Y03.

---

## Migration

The schema is `v0.8`. Future versions will add fields, not remove them. If the skill ever needs to remove a field, the migration step prints a diff and waits for explicit learner approval before writing.
