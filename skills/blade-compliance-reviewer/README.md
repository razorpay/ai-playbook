# blade-compliance-reviewer — Maintainer README

> **What this is.** Maintainer-facing notes for `skills/blade-compliance-reviewer/`. The Razorpay-shipped per-file design-system drift scanner.

---

## Why this skill exists

`pre-ship-check` Layer 2 is a PR-level summary of design-system drift. That summary is necessary but coarse: "this PR has 4 design-system findings" tells the reviewer there is drift, not where. `blade-compliance-reviewer` is the precision complement — invoke it on a single file and get a per-line report.

Three patterns it serves:

1. **A specific file you suspect drifted** (e.g., inherited from another team or another version of the codebase).
2. **A file that resists the production-compiler** (sometimes the production-compiler reports clean but the file still feels wrong; the per-line scan catches what the bulk repair did not have a mapping for).
3. **A file you wrote and want to double-check** (self-review; ten seconds of cost catches the small drift the human eye misses).

---

## Files in this directory

| File | Purpose |
|---|---|
| `SKILL.md` | The skill definition Claude Code loads. |
| `README.md` | This file. Maintainer notes. |
| `test-cases.md` | Acceptance scenarios for the skill. |

The skill is intentionally small. The per-line scan logic is straightforward; the value is in the *focus*. Adding more reference files would dilute the focus.

---

## How the scan works

Five categories of finding:

1. **Raw colour / spacing / radius / shadow values** — where a Blade token exists.
2. **Ad-hoc components** — `<div>` styled like a Blade primitive; `<button>` outside Blade Button variants.
3. **Reinvented patterns** — Modal, Tabs, Accordion built from primitives instead of Blade pattern primitives.
4. **Missing variants** — Blade primitives invoked without specifying required variants.
5. **Accessibility-attribute drift** — stripped `role`, `aria-*`, `tabIndex`, `onKeyDown` on interactive elements.

The Blade vocabulary is loaded from the connector at scan time, not hardcoded. As Blade evolves, the skill picks up the new vocabulary on the next pinned-version bump.

---

## When to update this skill

| Change | Action |
|---|---|
| New Blade primitive | Auto-picked-up via the connector; no skill edit needed. |
| New finding category (e.g., a new design-system rule) | Add to the SKILL.md Workflow section; add a test case to `test-cases.md`. |
| Output shape changes | Edit the SKILL.md Outputs section; bump the skill version in frontmatter. |
| Trigger-phrase additions | Edit the SKILL.md frontmatter description. |

---

## Running the skill locally

```
claude
> run blade-compliance on apps/dashboard/views/cart/EmptyState.tsx
```

The skill expects:

- the file to exist;
- the file to be a UI file (extension or import-shape recognised);
- the Blade connector loaded (program-pinned plugin handles this);
- the team's CLAUDE.md loadable (optional but used for team-specific conventions).

If the file is not a UI file, the skill reports "not a UI file" and stops.

---

## Vendoring into the program plugin

Same path as `pre-ship-check` and `playbook-course`: in-repo for v0.12; vendored into the Compass plugin in a later cycle. The skill name `blade-compliance-reviewer` is intended to be unique within the loaded plugin; check the program's skill-name registry before any rename.

---

## Testing

`test-cases.md` covers three scenarios: a clean file, a file with design-system drift, and a file with mixed Blade and ad-hoc usage. Manual run for v0.12; cohort use generates real-test signal.

---

## Content rules

This skill follows the playbook's content rules:

- no personal names;
- no internal-doc paths;
- no FSB-1/2/3 vocabulary;
- public references (Blade docs, Anthropic Claude Code skill docs) are fine when they earn a footnote.

The lint sweep on a release greps the standard violation list across this directory.

---

## Boundary with the chapters

This skill applies the design-system policy from G.16 (Blade deep dive). If Blade adds a new primitive, the connector picks it up; no skill edit needed. If Blade changes a *rule* (e.g., a new accessibility expectation), the chapter updates first; the skill follows.

The skill never substitutes for G.16; reading G.16 is what teaches the *why* behind each finding the skill surfaces.
