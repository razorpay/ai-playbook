#!/usr/bin/env node
//
// build-project-knowledge.mjs
// ---------------------------
//
// Builds the "Playbook Concierge" knowledge bundle that gets uploaded into the
// org-shared Claude Project. The bundle is intentionally LEAN: it carries the
// navigational spine of the playbook (manifest, slugs, master index, glossary,
// quick-reference cards, plugin-skill summaries), but does NOT carry chapter
// bodies. The Project's instructions point Claude at the live hub
// (https://razorpay.github.io/ai-playbook/) and Claude fetches chapter bodies
// on demand via web_fetch.
//
// This keeps the Project knowledge under ~250 KB (vs. the ~3 MB full repo) and
// guarantees chapter answers are sourced from the live, current site instead
// of a stale snapshot.
//
// Usage:
//
//   cd scripts
//   npm install     # one-time, picks up yaml
//   npm run build-project-knowledge
//
// Output: scripts/project-knowledge/ — a directory containing the seven files
// that get uploaded to the Project, plus a README explaining where each goes
// (project instructions vs. project knowledge).
//
// Re-run after any merge that touches manifest.yml, slugs.yml, INDEX.md, the
// glossary, the H cards, the skill SKILL.md files, or the CHANGELOG. A
// GitHub Action can wire this to master if/when the freshness story moves
// beyond manual re-upload.

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..');
const outDir = path.join(scriptDir, 'project-knowledge');

const HUB_BASE = 'https://razorpay.github.io/ai-playbook';

// Same rule used by the hub: '/' becomes the root path. Everything else gets
// the slug with a trailing slash.
function hubUrl(slug) {
  if (!slug || slug === '/') return `${HUB_BASE}/`;
  const clean = slug.replace(/^\/+|\/+$/g, '');
  return `${HUB_BASE}/${clean}/`;
}

async function readText(relPath) {
  return fs.readFile(path.join(repoRoot, relPath), 'utf8');
}

async function readYaml(relPath) {
  return YAML.parse(await readText(relPath));
}

async function reset() {
  // Some filesystems (notably containerised mounts) allow file modification
  // but not unlink. Tolerate EPERM/EACCES from the wipe step — every writer
  // below uses fs.writeFile, which overwrites in place.
  try {
    await fs.rm(outDir, { recursive: true, force: true });
  } catch (err) {
    if (err.code !== 'EPERM' && err.code !== 'EACCES') throw err;
  }
  await fs.mkdir(outDir, { recursive: true });
}

// -----------------------------------------------------------------------------
// 1. The spine (compact chapter manifest)
// -----------------------------------------------------------------------------
//
// This is the single most important file in the bundle. For every chapter we
// keep only the fields the Concierge needs to route a question:
//
//   slug, title, hub_url, section, track, belt, status, type, audience,
//   time_minutes, outcome, tags
//
// We DROP `prev`, `next`, `pillar`, `path`, `updated` — they are either
// derivable from slug or not useful for routing. This shaves the manifest
// from ~108 KB to ~25-40 KB.

async function buildSpine(manifest) {
  const chapters = (manifest.chapters || [])
    .filter((c) => c.slug && c.path && c.status !== 'internal');

  const compact = chapters.map((c) => ({
    slug: c.slug,
    title: c.title,
    hub_url: hubUrl(c.slug),
    section: c.section,
    track: c.track ?? null,
    belt: c.belt ?? null,
    status: c.status,
    type: c.type,
    audience: c.audience,
    time_minutes: c.time_minutes,
    outcome: c.outcome,
    tags: c.tags || []
  }));

  const planned = (manifest.planned_sections || []).map((p) => ({
    slug: p.slug_prefix.replace(/\/+$/g, ''),
    title: p.note || p.track,
    hub_url: hubUrl(p.slug_prefix),
    section: p.section,
    track: p.track ?? null,
    belt: p.track ?? null,
    status: p.status || 'planned',
    type: 'planned-section',
    audience: 'everyone',
    time_minutes: null,
    outcome: p.note || 'Planned section, not yet drafted.',
    tags: ['planned']
  }));

  const spine = {
    version: manifest.version,
    updated: manifest.updated,
    hub: HUB_BASE,
    source_of_truth: 'manifest.yml + slugs.yml in razorpay/ai-playbook',
    chapters: compact,
    planned: planned
  };

  const body = [
    '# Playbook spine',
    '',
    `Compact chapter index for the Razorpay AI Playbook (${manifest.version}, updated ${manifest.updated}).`,
    '',
    'Every chapter has a stable slug. The live URL is always `' + HUB_BASE + '/<slug>/`.',
    'Use this file to (a) find the right chapter for a question, (b) get the hub URL, ',
    '(c) check status (drafted / planned / in-progress) before recommending.',
    '',
    'Do not paraphrase a chapter from this file. The `outcome` line is a routing hint, ',
    'not a substitute for reading the chapter. For chapter bodies, web_fetch the `hub_url`.',
    '',
    '```yaml',
    YAML.stringify(spine),
    '```',
    ''
  ].join('\n');

  await fs.writeFile(path.join(outDir, 'playbook-spine.md'), body);
  return spine;
}

// -----------------------------------------------------------------------------
// 2. Master index (kept verbatim — it's the human-facing TOC)
// -----------------------------------------------------------------------------

async function copyIndex() {
  const raw = await readText('INDEX.md');
  // Rewrite relative links to hub URLs so they're useful when Claude cites
  // them. Heuristic: any link that ends in .md or starts with ./ or ../ gets
  // turned into the hub URL by stripping the .md and rooting at HUB_BASE.
  //
  // We do NOT touch in-page anchors or absolute URLs.
  const rewritten = raw.replace(
    /\]\(((?:\.\/|\.\.\/|\/)?[A-Za-z0-9_\-./]+\.md)(#[^)]+)?\)/g,
    (_full, target, hash = '') => {
      // Resolve relative path against INDEX.md (repo root).
      const cleaned = target.replace(/^\.\//, '').replace(/^\//, '');
      // INDEX.md → root; the file lives at repoRoot/INDEX.md, so cleaned is
      // already repo-rooted unless it starts with ../, which it shouldn't
      // for INDEX (everything is at or below repo root).
      const noMd = cleaned.replace(/\.md$/, '');
      const noReadme = noMd.replace(/\/README$/, '');
      return `](${HUB_BASE}/${noReadme}/${hash})`;
    }
  );
  const header = [
    '# Master index',
    '',
    'The human-facing table of contents for the Razorpay AI Playbook.',
    'Links rewritten to the live hub (' + HUB_BASE + ').',
    'Use this for "where do I start" and "show me the shape" questions.',
    '',
    '---',
    ''
  ].join('\n');
  // Strip the original H1 from INDEX.md since we just added our own.
  const stripped = rewritten.replace(/^#\s+[^\n]*\n+/, '');
  await fs.writeFile(path.join(outDir, 'playbook-index.md'), header + stripped);
}

// -----------------------------------------------------------------------------
// 3. Glossary
// -----------------------------------------------------------------------------

async function copyGlossary() {
  const raw = await readText('appendices/G-glossary/README.md');
  // Same link-rewrite pass, but the glossary uses ../../ relative paths.
  const rewritten = raw.replace(
    /\]\(((?:\.\.\/)+[A-Za-z0-9_\-./]+\.md)(#[^)]+)?\)/g,
    (_full, target, hash = '') => {
      const segments = target.split('/').filter((s) => s && s !== '..');
      const noMd = segments.join('/').replace(/\.md$/, '').replace(/\/README$/, '');
      return `](${HUB_BASE}/${noMd}/${hash})`;
    }
  );
  await fs.writeFile(path.join(outDir, 'playbook-glossary.md'), rewritten);
}

// -----------------------------------------------------------------------------
// 4. Quick-reference cards (H1–H7)
// -----------------------------------------------------------------------------

async function bundleCards() {
  const cardDir = path.join(repoRoot, 'appendices/H-reference-cards');
  const entries = (await fs.readdir(cardDir))
    .filter((f) => /^H\d+-.+\.md$/.test(f))
    .sort();
  const sections = [];
  for (const file of entries) {
    const raw = await fs.readFile(path.join(cardDir, file), 'utf8');
    const body = raw
      .replace(/^---\n[\s\S]*?\n---\n+/, '')              // strip frontmatter
      .replace(
        /\]\(((?:\.\.\/)+[A-Za-z0-9_\-./]+\.md)(#[^)]+)?\)/g,
        (_full, target, hash = '') => {
          const segments = target.split('/').filter((s) => s && s !== '..');
          const noMd = segments.join('/').replace(/\.md$/, '').replace(/\/README$/, '');
          return `](${HUB_BASE}/${noMd}/${hash})`;
        }
      );
    sections.push(body.trim());
  }
  const out = [
    '# Quick-reference cards (Appendix H)',
    '',
    'Self-contained printable cards for the most-asked-for content: redlines, ',
    'terminal essentials, git, Claude Code, Playwright, the MV wiki one-pager, ',
    'and the Day-1 quick reference. Use these for short answers; cite the ',
    'corresponding hub URL when you do.',
    '',
    '---',
    '',
    sections.join('\n\n---\n\n'),
    ''
  ].join('\n');
  await fs.writeFile(path.join(outDir, 'playbook-cards.md'), out);
}

// -----------------------------------------------------------------------------
// 5. Plugin skills summary
// -----------------------------------------------------------------------------
//
// The seven skills in skills/* are reference implementations in this repo.
// They are not currently vendored into Compass. The Concierge can explain
// what each does, but must not advertise them as installed commands.

async function summariseSkills() {
  const skillsDir = path.join(repoRoot, 'skills');
  const skillFolders = (await fs.readdir(skillsDir)).sort();
  const summaries = [];
  for (const folder of skillFolders) {
    const skillFile = path.join(skillsDir, folder, 'SKILL.md');
    let raw;
    try {
      raw = await fs.readFile(skillFile, 'utf8');
    } catch {
      continue;
    }
    // Parse frontmatter the permissive way: skill SKILL.md files often use
    // long unquoted descriptions that strict YAML won't accept. We only need
    // `name` and `description`, so a line-based extractor is safer than
    // YAML.parse here.
    const fmMatch = raw.match(/^---\n([\s\S]*?)\n---/);
    if (!fmMatch) continue;
    const fm = fmMatch[1];
    const nameLine = fm.match(/^name:\s*(.+)$/m);
    // Description can span multiple lines if it wraps. Greedy-match to either
    // the next top-level key or the end of the frontmatter block.
    // Match the description line plus any wrapped continuation lines (lines
    // that aren't themselves a top-level key like `name:` or `version:`).
    const descLine = fm.match(/^description:\s*(.+(?:\n(?![a-z_-]+:).*)*)/m);
    if (!nameLine || !descLine) continue;
    summaries.push({
      name: nameLine[1].trim().replace(/^["']|["']$/g, ''),
      description: descLine[1].trim().replace(/^["']|["']$/g, '').replace(/\s+/g, ' '),
      folder
    });
  }

  const out = [
    '# Playbook skill references',
    '',
    'The seven definitions below are reference implementations in the',
    '`razorpay/ai-playbook` repository. They are **not currently shipped in',
    'the Razorpay Compass plugin**. A Project chat cannot run them, write',
    '`LEARNER.md`, scan a repo, or run shell commands.',
    '',
    'Use these definitions to explain what a workflow is designed to do. Do',
    'not give a Compass install command or claim that an invocation phrase',
    'will work. If a user needs a currently runnable internal equivalent,',
    'route them to [#ai-help](https://razorpay.slack.com/archives/C08C35GKJKD)',
    'to confirm the supported distribution. For reading questions, answer',
    'here and cite the live hub.',
    '',
    '---',
    '',
    ...summaries.map((s) => [
      `## ${s.name}`,
      '',
      s.description,
      '',
      `Source: \`skills/${s.folder}/SKILL.md\` in razorpay/ai-playbook.`,
      ''
    ].join('\n'))
  ].join('\n');
  await fs.writeFile(path.join(outDir, 'playbook-skills.md'), out);
}

// -----------------------------------------------------------------------------
// 6. The Concierge system prompt (Project instructions)
// -----------------------------------------------------------------------------
//
// This is what gets pasted into the Project's "Custom Instructions" field.
// Everything else in the bundle is uploaded as Project knowledge; this is the
// only file that becomes the system prompt.

async function writeConciergeInstructions(manifest) {
  const draftedBelts = (manifest.chapters || [])
    .filter((c) => c.section === 'belts' && c.type === 'readme' && c.status === 'drafted')
    .map((c) => c.belt)
    .filter((b, i, a) => b && a.indexOf(b) === i);
  const allBelts = ['white', 'yellow', 'green', 'black'];
  const plannedBelts = allBelts.filter((b) => !draftedBelts.includes(b));

  const body = `# Razorpay AI Playbook — Concierge

> Paste this entire file into the Project's **Custom Instructions** field. The
> other files in this directory go into **Project Knowledge**.

You are the **Playbook Concierge** for the Razorpay AI Playbook. Anyone in the
Razorpay org can open this Project and ask you questions about the playbook —
what to read, where to start, what a term means, how a skill works, what a
specific chapter says.

## What you are

- A stateless Q&A surface over the Razorpay AI Playbook.
- The third consumption door, alongside the raw Markdown repo and the hub
  (${HUB_BASE}/). You do not replace either — you *route* to them.
- Friendly, concise, and grounded. You never invent chapter content.

## What you are NOT

- You are NOT an execution surface for the seven in-repo skill definitions.
  They describe local-filesystem workflows, but they are not currently
  vendored into the Razorpay Compass plugin. You may explain their intended
  behaviour; never claim that installing Compass makes them invokable.
- You are NOT a belt-awarding authority. Belts are awarded by reviewers per
  Appendix L. You do not declare anyone has earned a belt.
- You are NOT a substitute for the hub or the repo. You point at them.

## Knowledge sources, in priority order

1. **\`playbook-spine.md\`** — the compact chapter manifest. For every question,
   first locate the relevant slug(s) here. Each entry has a \`hub_url\` field
   that is the canonical link to cite.
2. **\`playbook-index.md\`** — the human master index. Use this for "where do I
   start," "show me the shape," and "what's in the playbook" questions.
3. **\`playbook-glossary.md\`** — Appendix G. Use this for "what does X mean"
   questions, definitions, acronyms.
4. **\`playbook-cards.md\`** — the Appendix H quick-reference cards. Use these
   for short, dense answers (Day-1 commands, terminal essentials, git, Claude
   Code essentials, Playwright, the MV one-pager, the never-put-this-in-a-prompt
   redlines).
5. **\`playbook-skills.md\`** — seven in-repo reference skill definitions. Use
   this to explain intended workflows, not as evidence that a skill is
   installed in Compass or currently invokable.
6. **The live hub via \`web_fetch\`.** For any answer that needs the body of a
   chapter (not just the slug, title, and outcome), fetch the \`hub_url\` from
   the spine and answer from what you fetched. Never paraphrase a chapter you
   have not just read.

## Routing rules

Apply these in order. The first that matches wins.

1. **The user wants to walk a belt with progress tracking** ("start the
   playbook", "start white belt", "continue my belt", "claim quest W-0",
   "show my progress"). → Explain that the repo contains a \`playbook-course\`
   reference definition, but it is not currently shipped through Compass. Do
   not provide an install or invocation command. Offer to summarise the named
   belt here. If the user needs a runnable, stateful route, send them to
   [#ai-help](https://razorpay.slack.com/archives/C08C35GKJKD) to confirm the
   currently supported distribution.

2. **The user wants to run an action-shaped skill** (a pre-ship check, a Blade
   compliance review, a setup verification, etc.). → Use \`playbook-skills.md\`
   to explain the intended workflow and its limits. State that the definition
   is not currently shipped through Compass; do not invent a runnable command.
   Route distribution questions to
   [#ai-help](https://razorpay.slack.com/archives/C08C35GKJKD).

3. **The user asks "where do I start" / "I'm new" / "what should I read first"**
   → Open the master index. Route to the matching door (Day-1, designer, PM,
   reference). Always cite \`${HUB_BASE}/\` and the appropriate first chapter URL.

4. **The user asks a definition / acronym / glossary question** → Answer from
   \`playbook-glossary.md\`. Cite the glossary URL and the deeper chapter URL
   the glossary entry points at.

5. **The user asks for a quick reference** (commands, redlines, Day-1, terminal
   basics, git, Claude Code essentials) → Answer from \`playbook-cards.md\`.
   Cite the card URL.

6. **The user asks about a specific chapter** ("what's W.5 about", "explain Y.9",
   "tell me about B.4") → Look up the slug in the spine, fetch the hub URL,
   answer from what you fetched. Cite the URL.

7. **The user asks an open-ended "explain X" question** where X is a concept
   covered in a chapter → Find the closest chapter via the spine, fetch it,
   answer from what you fetched. If the concept spans multiple chapters, cite
   the most direct one and list the others as further reading.

8. **The user asks for something not in the playbook** → Say so plainly. Do
   not invent. Suggest the closest adjacent chapter if one exists.

## Hard rules

These are inherited from \`skills/playbook-course/SKILL.md\` and adapted for the
Project surface. Read them carefully — they're load-bearing.

- **Do not invent chapter content.** Every chapter answer must come from a
  freshly fetched hub URL or from the verbatim cards / glossary / index in
  this Project's knowledge.
- **Always cite a hub URL** when answering anything beyond a routing pointer.
  Format: \`[Title](URL)\`. The Project's purpose is to send people *to* the
  playbook, not to be a fork of it.
- **Do not declare a belt awarded.** That is Appendix L's reviewer protocol.
  You can describe what's required to claim, never confirm an award.
- **Do not pretend planned belts are drafted.** The drafted belts are: ${draftedBelts.map((b) => b[0].toUpperCase() + b.slice(1)).join(', ') || 'White, Yellow'}.
  ${plannedBelts.length ? `Planned but not yet drafted: ${plannedBelts.map((b) => b[0].toUpperCase() + b.slice(1)).join(', ')}. If asked about those, say "not yet drafted, here is what is drafted."` : ''}
- **Do not store or echo PII.** No personal names beyond what already appears
  in the playbook itself. No phone numbers, emails, or internal identifiers.
- **Do not render SVG inline.** Diagrams in the playbook are SVG files. Point
  at the hub URL or the file path; do not try to draw them.
- **Do not run shell commands or modify files without explicit per-command
  consent.** Project chats generally don't have a filesystem, so this is
  mostly defensive. If a worked example references a command, surface it as a
  code block to copy, not as something for you to run.
- **Do not silently drift from the cited source.** If you fetched a chapter
  and your answer diverges from it, refetch.

## Tone

The playbook's voice: warm, concrete, no jargon-for-jargon. You inherit it.
Bullets are fine when listing chapters or commands. Prose is better for
explanations. Never lecture past what was asked.

## Worked examples

### Example 1 — "I'm new, where do I start?"

> Welcome. There are four doors depending on where you're coming from. The
> two-minute self-assessment ([${HUB_BASE}/prologue/self-assessment/](${HUB_BASE}/prologue/self-assessment/))
> picks the right one for you in 90 seconds. If you've never opened Terminal,
> start with [Part 0 — Foundation](${HUB_BASE}/foundation/). If you ship code
> already, jump to the [Prologue](${HUB_BASE}/prologue/). If you're a PM or
> in ops, the [Ops 101 track](${HUB_BASE}/ops-101/) is built for you.
>
> Day 1 has a three-step ramp: take the self-assessment → read Tech 101 chapter
> 1 → install the stack via W.5. The whole thing is ~70 minutes.

### Example 2 — "What is a boss fight?"

> A boss fight is the capstone artefact you ship to earn a belt. Each belt has
> exactly one. It's larger than a quest and is what a reviewer attests against
> per [Appendix L](${HUB_BASE}/appendices/certification/). White Belt's boss
> fight is "find and fix a real bug in your area"; Yellow's is your first
> AI-assisted feature; Green's is a Claude-authored feature shipped to prod;
> Black's is owning a POD's AI uplift for a month. The skill never awards a
> belt — claims go to a reviewer.
>
> [Glossary entry](${HUB_BASE}/appendices/glossary/#boss-fight) · belt-specific
> details on each belt's README.

### Example 3 — "Walk me through W.5"

> W.5 is the chapter that gets your stack installed and turns you GREEN. I can
> summarise it here. The repo also contains a \`playbook-course\` reference
> definition for a paced walk with \`LEARNER.md\` tracking, but that skill is not
> currently shipped through Compass, so I won't give you an install command
> that does not work. For a supported runnable route, check
> [#ai-help](https://razorpay.slack.com/archives/C08C35GKJKD).
>
> Either way, the chapter is at [${HUB_BASE}/belts/white/installing-the-stack/](${HUB_BASE}/belts/white/installing-the-stack/).

### Example 4 — "What does ADR stand for?"

> Architecture Decision Record. A small, immutable per-decision artefact that
> records the chosen path for an architectural decision. Lighter than an RFC.
> Originated by Michael Nygard in 2011. The RFC pipeline chapter [C.3](${HUB_BASE}/council/rfc-pipeline/)
> has the deeper treatment.
>
> [Glossary entry](${HUB_BASE}/appendices/glossary/#a).

## Versioning

This Concierge runs against playbook ${manifest.version}, updated ${manifest.updated}.
When the bundle is regenerated, this header updates. If a user references a
version older than what's in the spine, defer to the spine.

---

*Generated by \`scripts/build-project-knowledge.mjs\`. Edit the script, not this file.*
`;

  await fs.writeFile(path.join(outDir, 'project-instructions.md'), body);
}

// -----------------------------------------------------------------------------
// 7. Bundle README — how to actually use these files
// -----------------------------------------------------------------------------

async function writeBundleReadme(manifest, spine) {
  const fileSizes = await Promise.all(
    ['project-instructions.md', 'playbook-spine.md', 'playbook-index.md',
     'playbook-glossary.md', 'playbook-cards.md', 'playbook-skills.md']
      .map(async (f) => {
        const stat = await fs.stat(path.join(outDir, f));
        return { file: f, kb: (stat.size / 1024).toFixed(1) };
      })
  );

  const body = `# Project knowledge bundle

Generated by \`scripts/build-project-knowledge.mjs\` from playbook **${manifest.version}** (updated ${manifest.updated}).

Chapters indexed: **${spine.chapters.length}** drafted + **${spine.planned.length}** planned.
Hub: **${HUB_BASE}/**

## What to do with these files

| File | Where it goes | Why |
|---|---|---|
| \`project-instructions.md\` | Project → **Custom Instructions** | The Concierge system prompt. The only file that becomes the prompt. |
| \`playbook-spine.md\` | Project → **Knowledge** | Compact chapter manifest. The Concierge uses this to resolve slug → hub URL for every routing decision. |
| \`playbook-index.md\` | Project → **Knowledge** | Human master index with rewritten hub links. Used for "where do I start" questions. |
| \`playbook-glossary.md\` | Project → **Knowledge** | Appendix G. Used for term lookups. |
| \`playbook-cards.md\` | Project → **Knowledge** | All seven Appendix H quick-reference cards concatenated. Used for short, dense answers. |
| \`playbook-skills.md\` | Project → **Knowledge** | Summaries of seven in-repo reference skill definitions. Used to explain intended workflows without claiming they are installed in Compass. |

## How to set up the Project (once)

1. Create a new Claude Project named **"Razorpay AI Playbook"**.
2. Description: *Ask anything about the Razorpay AI Playbook — belts, quests, tools, glossary, where to start, and what the in-repo skill definitions are designed to do.*
3. Paste the contents of \`project-instructions.md\` into the **Custom Instructions** field.
4. Upload the other five \`.md\` files as **Project Knowledge**.
5. Confirm \`mcp__workspace__web_fetch\` is enabled for the workspace (Admin → Capabilities → Web access). The Concierge depends on it for chapter bodies.
6. Share the Project at org level via Anthropic's native sharing.
7. Pin the Project link in \`#ai-playbook\` Slack and in the playbook README's "Three doors" section as a fourth door.

## How to refresh

Re-run \`npm run build-project-knowledge\` after any merge that touches:

- \`manifest.yml\` or \`slugs.yml\` (chapter set or routing changed)
- \`INDEX.md\`
- \`appendices/G-glossary/README.md\`
- \`appendices/H-reference-cards/*.md\`
- \`skills/*/SKILL.md\`
- The drafted-belt set in \`manifest.yml\` (so the Concierge stops claiming planned belts are drafted)

Then re-upload the six files to the Project (replace the existing knowledge).
A future GitHub Action can automate the build; the upload step needs
Anthropic-side support that isn't here yet.

## Sanity targets

| Target | Why |
|---|---|
| Total bundle < 250 KB | Leaves headroom for conversations in the Project's context budget. |
| \`playbook-spine.md\` covers every drafted chapter | Otherwise the Concierge can't route to it. |
| Hub URLs in cited form (\`[Title](URL)\`) | The Project's purpose is to send people to the live hub. |
| No PII or personal names beyond what already appears in the playbook | Inherits from the playbook's content rules. |

## File sizes (this build)

${fileSizes.map((f) => `- \`${f.file}\` — ${f.kb} KB`).join('\n')}
`;
  await fs.writeFile(path.join(outDir, 'README.md'), body);
}

// -----------------------------------------------------------------------------
// Main
// -----------------------------------------------------------------------------

async function main() {
  const manifest = await readYaml('manifest.yml');
  await reset();

  const spine = await buildSpine(manifest);
  await copyIndex();
  await copyGlossary();
  await bundleCards();
  await summariseSkills();
  await writeConciergeInstructions(manifest);
  await writeBundleReadme(manifest, spine);

  // Sanity print.
  const files = await fs.readdir(outDir);
  let total = 0;
  console.log('\nProject knowledge bundle written to:', outDir);
  console.log('-'.repeat(60));
  for (const f of files.sort()) {
    const stat = await fs.stat(path.join(outDir, f));
    total += stat.size;
    console.log(`  ${f.padEnd(32)} ${(stat.size / 1024).toFixed(1).padStart(7)} KB`);
  }
  console.log('-'.repeat(60));
  console.log(`  ${'TOTAL'.padEnd(32)} ${(total / 1024).toFixed(1).padStart(7)} KB`);
  console.log(`\nChapters indexed: ${spine.chapters.length} drafted, ${spine.planned.length} planned.`);
  console.log(`Hub: ${HUB_BASE}/`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
