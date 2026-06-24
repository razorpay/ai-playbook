# Test cases

> **What this is.** The acceptance scenarios the playbook-course skill must pass before any release. Eight tests, each grounded in the current drafted belt content. Pass means "no regression"; it does not mean "great." A first real-learner walk-through is the real test and is captured in the v0.8 retro.

---

## How to run these

Manual, for v0.8. Each test is a sequence of phrases the learner types and the expected skill behaviour. Run them in order; some tests depend on the state left by earlier tests.

Two artefacts are produced per run:

- a fresh `LEARNER.md` whose final state is checked against the spec;
- the skill's transcript, scanned for behavioural drift (off-template responses, content invention, wrong rule firing).

The maintainer keeps a markdown log of each run in `test-runs/<date>.md` — not committed; ephemeral, local.

---

## Test 1 — Cold-start a learner, walk W01

**Setup.** Empty working directory, no `LEARNER.md`.

**Phrase.** `start white belt`

**Expected behaviour.**

- Skill detects the missing `LEARNER.md` and asks whether to create one.
- On consent, creates the file with the template from `state-schema.md`. Front-matter: `started: <today>`, `current_belt: white`, empty `learner` and `last_seen_module`.
- Walks W01 — *The File System* — applying the eight-section template.
- Logs `belts/white/file-system — read <today> — colour: <colour>` after the self-check.
- Updates `last_seen_module: belts/white/file-system`.
- Offers W02 next.

**Acceptance.** `LEARNER.md` exists, the W01 module box is checked, the colour is recorded, and the trailing `Continue or take a break?` prompt is present.

---

## Test 2 — Resume mid-belt

**Setup.** `LEARNER.md` from Test 1 (or hand-crafted to match: W01–W04 checked with colours, others unchecked).

**Phrase.** `continue my belt`

**Expected behaviour.**

- Skill reads `LEARNER.md`, identifies W05 — *Installing the stack* — as the next module.
- Walks W05 with the eight-section template.
- Logs accordingly.

**Acceptance.** W05 is the next item walked. The skill does not re-read W04 unless asked. The colour declared is logged verbatim.

---

## Test 3 — Quest W-0 gate

**Setup.** All twelve White Belt modules checked.

**Phrase.** `continue my belt`

**Expected behaviour.**

- Skill identifies that all modules are read and routes to Quest W-0 — *Turn GREEN*.
- Reads the quest chapter aloud, surfaces the success criteria.
- Asks the learner whether evidence is ready.
- On "yes": prompts for the three pieces (verification screenshot, plugin version, date), logs the claim with `claimed: yes — date: <date> — evidence: …`.

**Acceptance.** The Quest W-0 box is checked, the evidence line is recorded, and the skill does not silently advance to W-1 without offering the next-step prompt.

---

## Test 4 — Boss Fight W-B and badge handoff

**Setup.** All modules read, Quests W-0 and W-1 claimed, Boss Fight W-B not yet claimed.

**Phrase.** `claim boss fight`

**Expected behaviour.**

- Skill walks the boss-fight chapter.
- Asks for PR URL, merge link, optional triage paragraph.
- Logs `belts/white/boss-fight — claimed: yes — date: <date> — evidence: …`.
- Renders the badge template (`belts/01-white/badge.md`) with the learner's evidence pre-filled where known, leaving the Reviewer attestation and What changed for me sections blank.
- Surfaces a four-line reviewer-routing summary cribbed from Appendix L.
- Asks "send to a reviewer now, or save for later?"

**Acceptance.** The badge box flips to `claimed: yes — submitted: <date>` only if the learner says "send now." If "save for later," the badge box stays unchecked. The skill never writes "awarded" anywhere.

---

## Test 5 — White → Yellow continuity

**Setup.** White Belt fully claimed and submitted (badge `claimed: yes — submitted: <date>`).

**Phrase.** `continue my belt`

**Expected behaviour.**

- Skill notes White is in the reviewer's hands and that Yellow is drafted.
- Asks whether to start Yellow.
- On "yes": flips `current_belt: yellow`, appends a Yellow Belt section to `LEARNER.md` if one does not exist, walks the Yellow Belt README, then walks Y01.

**Acceptance.** The transition is explicit, not silent. White Belt's section is preserved verbatim. The Yellow Belt section is freshly populated from `curriculum.json`.

---

## Test 6 — Drafted-belt progression after Yellow

**Setup.** Yellow Belt fully claimed and submitted.

**Phrase.** `continue my belt` *or* `start green belt`

**Expected behaviour.**

- Skill reads `curriculum.json`, sees Green Belt has `status: drafted`, and offers or starts Green Belt instead of deferring it.
- On consent or direct `start green belt`: flips `current_belt: green`, appends a Green Belt section to `LEARNER.md` if one does not exist, walks the Green Belt README, then walks G01.

**Acceptance.** The transition is explicit, not silent. The Green Belt section is freshly populated from `curriculum.json`; the skill does not use a hardcoded White/Yellow-only allow-list.

---

## Test 7 — Hand-edit respect

**Setup.** A `LEARNER.md` where the learner has hand-edited W03 to read `colour: GREEN (after rebase practice)` (replacing an earlier YELLOW).

**Phrase.** `show my progress` *or* `continue my belt`

**Expected behaviour.**

- Skill reads `LEARNER.md` as-is. It does not silently rewrite the W03 line.
- If asked for "show my progress," the skill reads the colour verbatim including the parenthetical.
- If asked for "continue my belt," the skill picks up where the unchecked items begin and does not re-walk W03.

**Acceptance.** The hand edit survives unchanged. The skill does not nag the learner about the edit unless explicitly asked.

---

## Test 8 — Lint sweep

**Setup.** Run on the skill directory after any change.

**Command.**

```sh
grep -nE "Nawal|Khilan|Abhinav|Vaibhav|FSB-1|FSB-2|FSB-3|FSB-Transformation" \
  skills/playbook-course/*.md skills/playbook-course/scripts/*.mjs ; echo "exit=$?"
```

**Expected behaviour.**

- Exit status is non-zero (no matches). The skill files contain none of the canonical forbidden tokens.

**Acceptance.** Lint exits clean. Any failure blocks the release.

---

## Curriculum integrity check

In addition to the eight tests above, the curriculum generator runs its own path-integrity check on every invocation:

```sh
node skills/playbook-course/scripts/generate-curriculum.mjs
```

The script fails non-zero if any module, quest, boss-fight, or badge path in `manifest.yml` does not resolve to a real file on disk. Run it after any test sequence above to confirm the substrate did not drift.

---

## What is intentionally not tested

- **Real-learner UX.** A first real-learner walk-through belongs in the v0.8.1 retro after a cohort uses the skill end-to-end.
- **Performance.** The skill is read-heavy; latency on a single chapter read is dominated by chapter length, not skill logic. Not a v0.8 concern.
- **Multi-directory state synchronisation.** Out of scope by design.
- **Quiz quality.** The skill does not have a quiz engine; comprehension prompts are open-ended and logged verbatim.
- **Rendering correctness for SVG diagrams.** The skill prints diagram paths and recommends opening the hub; it does not try to render SVG inline.

---

## Failure log shape

When a test fails, capture the failure in this shape:

```markdown
### Test <N> — <name>
- **Run date.** <YYYY-MM-DD>
- **Symptom.** <one sentence>
- **Expected.** <one sentence>
- **Actual.** <one sentence>
- **Likely cause.** <skill behaviour, content drift, schema drift, or environment>
- **Fix or follow-up.** <link to PR or note>
```

Failures are interesting data. Resist the urge to delete them after the fix lands.
