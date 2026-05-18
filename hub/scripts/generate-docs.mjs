import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import YAML from 'yaml';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const hubRoot = path.resolve(scriptDir, '..');
const repoRoot = path.resolve(hubRoot, '..');
const docsDir = path.join(hubRoot, 'src/content/docs');
const generatedDir = path.join(hubRoot, '.generated/docs');
const publicDir = path.join(hubRoot, 'public');
const sidebarPath = path.join(hubRoot, 'src/generated/sidebar.mjs');

const sectionLabels = {
  root: 'Start Here',
  foundation: 'Part 0 — Foundation',
  prologue: 'Prologue',
  belts: 'Belts',
  council: 'Staff+ Council',
  appendices: 'Appendices'
};

// Belt-section ordering: White → Yellow → Green → Black. The 'council' track
// surfaces as its own section (not a belt) so it does not appear here.
const beltOrder = ['white', 'yellow', 'green', 'black'];

const beltIcons = {
  white: '⚪',
  yellow: '🟡',
  green: '🟢',
  black: '⚫'
};

const trackLabels = {
  'tech-101': 'Tech 101',
  'ops-101': 'Ops 101',
  white: '⚪ White Belt',
  yellow: '🟡 Yellow Belt',
  green: '🟢 Green Belt',
  black: '⚫ Black Belt',
  council: 'Staff+ Council',
  'tool-atlas': 'A — Tool Atlas',
  'environment-setup': 'B — Environment Setup',
  'skills-library': 'C — Skills Library',
  'known-issues': 'D — Known Issues',
  'roles-and-forums': 'E — Roles & Forums',
  'slack-channels': 'F — Slack Channels',
  glossary: 'G — Glossary',
  'reference-cards': 'H — Reference Cards',
  templates: 'I — Templates',
  'reading-list': 'J — Reading List',
  certification: 'L — Certification',
  methodologies: 'N — Methodologies'
};

// Appendix clustering by use case. Each cluster has a label, an icon, and the
// list of tracks (in display order) that belong to it.
const appendixClusters = [
  {
    label: '📚 Get oriented',
    tracks: ['tool-atlas', 'environment-setup', 'glossary']
  },
  {
    label: '🔧 Templates & cards',
    tracks: ['templates', 'reference-cards']
  },
  {
    label: '📖 References',
    tracks: ['skills-library', 'methodologies', 'reading-list']
  },
  {
    label: '👥 Program operations',
    tracks: ['known-issues', 'roles-and-forums', 'slack-channels', 'certification']
  }
];

// Status-marker filter: strips reader-facing brackets like [drafted],
// [drafted skeleton], [planned], [coming], [example] from rendered titles.
// The status field in frontmatter is unaffected; only the rendered title
// changes.
function stripStatusMarkers(text) {
  if (!text) return text;
  return text
    .replace(/\s*\[drafted skeleton\]/gi, '')
    .replace(/\s*\[drafted partial\]/gi, '')
    .replace(/\s*\[drafted\]/gi, '')
    .replace(/\s*\[planned[^\]]*\]/gi, '')
    .replace(/\s*\[coming\]/gi, '')
    .replace(/\s*\[example\]/gi, '')
    .replace(/\s*\[in[- ]progress\]/gi, '')
    .trim();
}

const statusVariants = {
  drafted: 'tip',
  planned: 'caution',
  'in-progress': 'note',
  internal: 'danger'
};

function normalizeRel(filePath) {
  return filePath.split(path.sep).join('/');
}

function routeFor(slug) {
  if (!slug || slug === '/') return '/';
  return `/${slug.replace(/^\/+|\/+$/g, '')}/`;
}

function outputPathFor(slug) {
  if (!slug || slug === '/') return 'index.md';
  return `${slug.replace(/^\/+|\/+$/g, '')}.md`;
}

function titleFromMarkdown(body, fallback) {
  const match = body.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : fallback;
}

function pageTitle(entry, body) {
  const raw = entry.title || titleFromMarkdown(body, entry.slug || 'Untitled');
  return stripStatusMarkers(raw);
}

function sidebarLabel(entry) {
  const raw = entry.title || entry.slug || 'Untitled';
  return stripStatusMarkers(raw);
}

function sortByOrderThenTitle(a, b) {
  const orderA = typeof a.order === 'number' ? a.order : 999;
  const orderB = typeof b.order === 'number' ? b.order : 999;
  if (orderA !== orderB) return orderA - orderB;
  return sidebarLabel(a).localeCompare(sidebarLabel(b));
}

async function readYaml(relPath) {
  const raw = await fs.readFile(path.join(repoRoot, relPath), 'utf8');
  return YAML.parse(raw);
}

async function resetGeneratedTree() {
  // Some filesystems (notably containerised mounts) allow file modification
  // but not unlink. Tolerate EPERM/EACCES from the wipe step — writeGeneratedDoc
  // below uses fs.writeFile, which overwrites in place.
  try {
    await fs.rm(generatedDir, { recursive: true, force: true });
  } catch (err) {
    if (err.code !== 'EPERM' && err.code !== 'EACCES') throw err;
  }
  try {
    await fs.rm(docsDir, { recursive: true, force: true });
  } catch (err) {
    if (err.code !== 'EPERM' && err.code !== 'EACCES') throw err;
  }
  await fs.mkdir(generatedDir, { recursive: true });
  await fs.mkdir(docsDir, { recursive: true });
  await fs.writeFile(path.join(docsDir, '.gitignore'), '*\n!.gitignore\n');
  await fs.mkdir(publicDir, { recursive: true });
}

async function writeGeneratedDoc(relOutputPath, content) {
  const generatedPath = path.join(generatedDir, relOutputPath);
  const docsPath = path.join(docsDir, relOutputPath);
  await fs.mkdir(path.dirname(generatedPath), { recursive: true });
  await fs.mkdir(path.dirname(docsPath), { recursive: true });
  await fs.writeFile(generatedPath, content);
  await fs.writeFile(docsPath, content);
}

async function seedDiagramAssets() {
  const diagramsDir = path.join(repoRoot, 'diagrams');
  const outputDir = path.join(publicDir, 'diagrams');
  await fs.mkdir(outputDir, { recursive: true });
  let entries;
  try {
    entries = await fs.readdir(diagramsDir);
  } catch {
    return;
  }
  for (const entry of entries) {
    if (!entry.endsWith('.svg')) continue;
    await fs.copyFile(path.join(diagramsDir, entry), path.join(outputDir, entry));
  }
}

async function copyAsset(sourceRel) {
  const sourcePath = path.join(repoRoot, sourceRel);
  const assetRoot = sourceRel.startsWith('diagrams/') ? 'diagrams' : 'assets';
  const outputRel = path.join(assetRoot, path.basename(sourceRel));
  const outputPath = path.join(publicDir, outputRel);
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.copyFile(sourcePath, outputPath);
  return `/${normalizeRel(outputRel)}`;
}

function splitTarget(target) {
  const [withoutHash, hash = ''] = target.split('#');
  return { pathPart: withoutHash, hash: hash ? `#${hash}` : '' };
}

function isExternalTarget(target) {
  return /^(https?:|mailto:|tel:|data:|#)/i.test(target);
}

function buildSlugMaps(chapters, extraEntries) {
  const slugByPath = new Map();
  const entryBySlug = new Map();
  for (const entry of [...chapters, ...extraEntries]) {
    if (!entry.slug || !entry.path) continue;
    slugByPath.set(normalizeRel(entry.path), entry.slug);
    entryBySlug.set(entry.slug, entry);
  }
  return { slugByPath, entryBySlug };
}

async function rewriteLinks(body, sourceRel, slugByPath) {
  const replacements = [];
  const rewritten = body.replace(/(!?\[[^\]]*?\]\()([^)]+)(\))/g, (full, prefix, target, suffix) => {
    if (isExternalTarget(target)) return full;
    const { pathPart, hash } = splitTarget(target);
    if (!pathPart) return full;

    const resolvedRel = normalizeRel(path.normalize(path.join(path.dirname(sourceRel), pathPart)));
    const isAsset = /\.(svg|png|jpe?g|gif|webp)$/i.test(pathPart);
    if (isAsset) {
      replacements.push({ original: full, prefix, target, suffix, resolvedRel, hash, type: 'asset' });
      return `%%PLAYBOOK_ASSET_${replacements.length - 1}%%`;
    }

    const candidates = [
      resolvedRel,
      normalizeRel(path.join(resolvedRel, 'README.md')),
      resolvedRel.endsWith('.md') ? resolvedRel : `${resolvedRel}.md`
    ];
    const matched = candidates.find((candidate) => slugByPath.has(candidate));
    if (!matched) return full;
    const slug = slugByPath.get(matched);
    return `${prefix}${routeFor(slug)}${hash}${suffix}`;
  });

  let output = rewritten;
  for (let index = 0; index < replacements.length; index += 1) {
    const replacement = replacements[index];
    try {
      const assetRoute = await copyAsset(replacement.resolvedRel);
      output = output.replace(`%%PLAYBOOK_ASSET_${index}%%`, `${replacement.prefix}${assetRoute}${replacement.hash}${replacement.suffix}`);
    } catch {
      output = output.replace(`%%PLAYBOOK_ASSET_${index}%%`, replacement.original);
    }
  }
  return output;
}

function previousNext(value, entryBySlug) {
  if (!value || !entryBySlug.has(value)) return undefined;
  const entry = entryBySlug.get(value);
  return {
    link: routeFor(value),
    label: entry.title || value
  };
}

function buildFrontmatter(entry, title, entryBySlug) {
  const fm = {
    title,
    slug: entry.routeSlug,
    description: entry.outcome || `Playbook page for ${title}.`,
    sidebar: {
      label: title,
      order: typeof entry.order === 'number' ? entry.order : undefined,
      badge: entry.status && entry.status !== 'drafted'
        ? { text: entry.status, variant: statusVariants[entry.status] || 'note' }
        : undefined
    },
    prev: previousNext(entry.prev, entryBySlug),
    next: previousNext(entry.next, entryBySlug),
    playbookSlug: entry.slug,
    sourcePath: entry.path,
    section: entry.section,
    track: entry.track ?? null,
    status: entry.status,
    type: entry.type,
    audience: entry.audience,
    outcome: entry.outcome,
    timeMinutes: entry.time_minutes,
    pillar: entry.pillar ?? null,
    belt: entry.belt ?? null,
    tags: entry.tags || []
  };

  return JSON.parse(JSON.stringify(fm));
}

function statusBlock(entry) {
  const parts = [
    `**Status:** ${entry.status || 'drafted'}`,
    entry.time_minutes ? `**Time:** ${entry.time_minutes} min` : null,
    entry.audience ? `**Audience:** ${entry.audience}` : null
  ].filter(Boolean);
  const outcome = entry.outcome ? `\n> **Outcome:** ${entry.outcome}` : '';
  return `> ${parts.join(' · ')}${outcome}\n\n`;
}

// Strip duplicated page chrome from chapter bodies before they're written into
// the generated tree. Two things go:
//
// 1. The body H1. Almost every source chapter opens with `# 0.1 — Welcome…`
//    or `# W.5 - Installing the stack`, duplicating the Starlight page title
//    rendered from the frontmatter. Two H1s in a row reads as a draft. We
//    strip the leading body H1 unconditionally; the Starlight title carries
//    the heading. The numeric prefix (W.5, 0.1, B.7) is recoverable from the
//    URL, the sidebar position, and the metadata bar.
//
// 2. The body emoji metadata bar. Pre-v0.23 chapters embed a
//    `> **⏱ 5 minutes · 👥 Everyone · 🎯 Leaves with:** …` line right after
//    the body H1. It duplicates the Status / Time / Audience / Outcome bar
//    that `statusBlock` already prepends. We strip it so each page renders
//    one metadata bar, not two.
//
// The function is conservative — it only strips the leading content, never
// touches H1s or emoji bars that appear later in a chapter (where they may be
// part of body content rather than chrome).
function stripDuplicateChrome(body) {
  let out = body.replace(/^\s*\n/, '');

  // Strip leading H1 + any blank lines that follow.
  const h1Match = out.match(/^# [^\n]*\n+/);
  if (h1Match) {
    out = out.slice(h1Match[0].length);
  }

  // Strip a leading emoji-metadata blockquote line, with or without bold
  // formatting, with or without the `>` prefix, with stopwatch or wall-clock
  // glyph variants.
  out = out.replace(/^> ?\*?\*?[⏱🕒][^\n]*\n+/, '');
  out = out.replace(/^[⏱🕒][^\n]*\n+/, '');

  // Some chapters lead with a horizontal rule directly after the stripped
  // chrome; collapse it so we don't render an orphan separator.
  out = out.replace(/^---\n+/, '');

  return out;
}

// Strip internal-version stamps like `(drafted in v0.10)` or `[drafted in v0.11]`
// from body content. These appeared in Green Belt and Black Belt overviews
// alongside Part / Quest / Boss Fight headings so maintainers could track
// drafting cadence; they leak into the reader-facing right-rail nav as part
// of the heading text, where they make every page feel half a draft away from
// done. The drafted-status badge in the metadata bar already conveys status;
// the version stamps are maintainer noise. We strip them from the body in
// every chapter as a global safety net — the same regex catches `[planned in vX.Y]`
// too.
function stripVersionStamps(body) {
  return body
    .replace(/ ?[\(\[](drafted|planned) in v\d+\.\d+[a-z]?[\)\]]/g, '')
    // The Green and Black belt READMEs also drop bare `(v0.X)` markers in
    // the "Files:" sentence at the foot of the page. Drop those too.
    .replace(/ ?\(v\d+\.\d+[a-z]?\)/g, '');
}

async function buildChapter(entry, slugByPath, entryBySlug, allChapters) {
  const sourcePath = path.join(repoRoot, entry.path);
  const raw = await fs.readFile(sourcePath, 'utf8');
  const parsed = matter(raw);
  const sourceData = parsed.data || {};
  const merged = { ...sourceData, ...entry };
  const title = pageTitle(merged, parsed.content);
  const rewritten = await rewriteLinks(parsed.content.trimStart(), entry.path, slugByPath);
  const body = stripVersionStamps(stripDuplicateChrome(rewritten));
  const frontmatter = buildFrontmatter(merged, title, entryBySlug);
  const gradedStrip = beltGradedArtefactsStrip(merged, allChapters);
  const output = `---\n${YAML.stringify(frontmatter).trim()}\n---\n\n${statusBlock(merged)}${gradedStrip}${body}`;
  await writeGeneratedDoc(outputPathFor(merged.slug), output);
}

// If this chapter is a belt README (top-level belt overview, not a part
// README inside a belt), prepend a graded-artefacts strip listing the
// quests, boss fight, and badge for the belt. Returns empty string for
// non-belt-README chapters.
function beltGradedArtefactsStrip(entry, allChapters) {
  if (entry.type !== 'readme' || entry.section !== 'belts') return '';
  if (!entry.belt || !beltOrder.includes(entry.belt)) return '';
  // Confirm this is the top-level belt README (not a part README): the slug
  // should be "belts/<beltname>" without a trailing part segment.
  const slugParts = (entry.slug || '').split('/');
  if (slugParts.length !== 2) return '';

  const beltTrack = entry.belt;
  const beltEntries = allChapters.filter((c) => c.section === 'belts' && c.track === beltTrack);
  const quests = beltEntries.filter((c) => c.type === 'quest').sort(sortByOrderThenTitle);
  const bossFight = beltEntries.find((c) => c.type === 'boss-fight');
  const badge = beltEntries.find((c) => c.type === 'badge');

  if (!quests.length && !bossFight && !badge) return '';

  const items = [];
  for (const quest of quests) {
    items.push(`🎮 [${stripStatusMarkers(quest.title || quest.slug)}](${routeFor(quest.slug)})`);
  }
  if (bossFight) {
    items.push(`🏁 [${stripStatusMarkers(bossFight.title || bossFight.slug)}](${routeFor(bossFight.slug)})`);
  }
  if (badge) {
    items.push(`🏆 [${stripStatusMarkers(badge.title || badge.slug)}](${routeFor(badge.slug)})`);
  }

  const strip = `> **Graded artefacts for this belt:** ${items.join(' · ')}\n\n`;
  return strip;
}

function plannedPageFromSection(section) {
  const slug = section.slug_prefix.replace(/\/+$/g, '');
  const title = trackLabels[section.track] || section.section || slug;
  return {
    slug,
    path: section.path,
    title: `${title} (planned)`,
    section: section.section,
    track: section.track ?? null,
    status: section.status || 'planned',
    type: 'planned-section',
    order: 500,
    time_minutes: 2,
    audience: 'everyone',
    outcome: section.note || 'Understand what is planned for this section.',
    prev: null,
    next: null,
    pillar: null,
    belt: section.track || null,
    tags: ['planned']
  };
}

async function buildPlannedPage(entry) {
  const frontmatter = buildFrontmatter(entry, entry.title, new Map());
  const body = [
    `# ${entry.title}`,
    '',
    `> **Status:** ${entry.status} · **Audience:** ${entry.audience}`,
    `> **Outcome:** ${entry.outcome}`,
    '',
    'This section is intentionally visible so readers can see the full playbook shape without mistaking planned work for missing files.',
    '',
    '## What exists now',
    '',
    entry.note ? entry.note : entry.outcome,
    '',
    '## Where to go next',
    '',
    '- Return to the [Master Index](/master-index/).',
    '- Read the drafted Foundation, Prologue, and appendix pages first.'
  ].join('\n');
  const output = `---\n${YAML.stringify(frontmatter).trim()}\n---\n\n${body}\n`;
  await writeGeneratedDoc(outputPathFor(entry.slug), output);
}

function makeLink(entry) {
  return {
    label: sidebarLabel(entry),
    link: routeFor(entry.slug)
  };
}

function groupBy(items, keyFn) {
  const groups = new Map();
  for (const item of items) {
    const key = keyFn(item);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(item);
  }
  return groups;
}

function buildSidebar(chapters, plannedPages) {
  const allEntries = [...chapters, ...plannedPages].filter((entry) => entry.slug && entry.slug !== '/');
  const bySection = groupBy(allEntries, (entry) => entry.section || 'other');
  const sidebar = [
    {
      label: 'Start Here',
      items: [
        { label: 'Playbook Home', link: '/' },
        { label: 'Master Index', link: '/master-index/' }
      ]
    }
  ];

  // Foundation
  const foundation = bySection.get('foundation');
  if (foundation?.length) {
    sidebar.push(sectionToSidebar('foundation', foundation));
  }

  // Prologue
  const prologue = bySection.get('prologue');
  if (prologue?.length) {
    sidebar.push(sectionToSidebar('prologue', prologue));
  }

  // Belts: each belt is its own collapsible section (so the curriculum
  // structure is the navigation structure). Belt order: White → Yellow →
  // Green → Black. The 'belts' section in the manifest carries all four
  // tracks; we split them here.
  const beltEntries = bySection.get('belts') ?? [];
  for (const beltTrack of beltOrder) {
    const beltItems = beltEntries.filter((entry) => entry.track === beltTrack);
    if (!beltItems.length) continue;
    sidebar.push(beltToSidebar(beltTrack, beltItems));
  }

  // Appendices: clustered by use case.
  const appendixEntries = bySection.get('appendices') ?? [];
  const appendicesByTrack = groupBy(appendixEntries, (entry) => entry.track);
  for (const cluster of appendixClusters) {
    const items = [];
    for (const track of cluster.tracks) {
      const trackEntries = appendicesByTrack.get(track);
      if (!trackEntries?.length) continue;
      const sorted = trackEntries.sort(sortByOrderThenTitle);
      if (sorted.length === 1) {
        items.push(makeLink(sorted[0]));
      } else {
        items.push({
          label: trackLabels[track] || track,
          items: sorted.map(makeLink),
          collapsed: true
        });
      }
    }
    if (items.length) {
      sidebar.push({
        label: cluster.label,
        items,
        collapsed: true
      });
    }
  }

  // Council (invitation-only senior-IC community above the belts). Demoted
  // to the bottom of the sidebar and collapsed by default — most readers
  // don't have access to it, so it shouldn't compete for nav space with
  // chapters everyone reads. Still discoverable from the homepage belt-ladder
  // visual and from the Master Index.
  const council = bySection.get('council');
  if (council?.length) {
    const councilSection = sectionToSidebar('council', council);
    councilSection.collapsed = true;
    sidebar.push(councilSection);
  }

  return sidebar;
}

// Generic section-to-sidebar conversion: direct items first, then tracks
// as nested collapsibles. Used for foundation, prologue, council.
function sectionToSidebar(section, entries) {
  const direct = entries.filter((entry) => !entry.track).sort(sortByOrderThenTitle).map(makeLink);
  const tracks = groupBy(entries.filter((entry) => entry.track), (entry) => entry.track);
  const items = [...direct];

  for (const [track, trackEntries] of tracks.entries()) {
    const sorted = trackEntries.sort(sortByOrderThenTitle);
    if (sorted.length === 1) {
      items.push(makeLink(sorted[0]));
    } else {
      items.push({
        label: trackLabels[track] || track,
        items: sorted.map(makeLink),
        collapsed: true
      });
    }
  }

  return {
    label: sectionLabels[section] || section,
    items
  };
}

// Belt-specific sidebar: surfaces the belt README, the parts (if any),
// modules, quests with 🎮 prefix, boss fight with 🏁 prefix, badge with 🏆
// prefix. The graded artefacts are the highlights, not buried.
function beltToSidebar(beltTrack, entries) {
  const sorted = entries.sort(sortByOrderThenTitle);
  const readme = sorted.find((entry) => entry.type === 'readme');
  const modules = sorted.filter((entry) => entry.type === 'chapter');
  const quests = sorted.filter((entry) => entry.type === 'quest');
  const bossFight = sorted.find((entry) => entry.type === 'boss-fight');
  const badge = sorted.find((entry) => entry.type === 'badge');

  const items = [];
  if (readme) items.push({ label: 'Overview', link: routeFor(readme.slug) });

  // Modules: if the belt has parts (a-craft, b-practices, c-guardrails for
  // Green; a-platform, b-craft, c-org for Black), group by directory prefix.
  // Otherwise list flat.
  const moduleGroups = groupModulesByPart(modules, beltTrack);
  if (moduleGroups.length > 1) {
    for (const group of moduleGroups) {
      items.push({
        label: group.label,
        items: group.modules.map(makeLink),
        collapsed: true
      });
    }
  } else if (moduleGroups.length === 1) {
    for (const mod of moduleGroups[0].modules) {
      items.push(makeLink(mod));
    }
  }

  // Graded artefacts with icon prefixes.
  for (const quest of quests) {
    items.push({
      label: `🎮 ${stripStatusMarkers(quest.title || quest.slug)}`,
      link: routeFor(quest.slug)
    });
  }
  if (bossFight) {
    items.push({
      label: `🏁 ${stripStatusMarkers(bossFight.title || bossFight.slug)}`,
      link: routeFor(bossFight.slug)
    });
  }
  if (badge) {
    items.push({
      label: `🏆 ${stripStatusMarkers(badge.title || badge.slug)}`,
      link: routeFor(badge.slug)
    });
  }

  return {
    label: `${beltIcons[beltTrack] || ''} ${trackLabels[beltTrack] || beltTrack}`.trim(),
    items,
    collapsed: beltTrack !== 'white' // White Belt expanded by default; others collapsed
  };
}

// Detect parts in belt modules by inspecting the path prefix. Green Belt has
// a-craft/, b-practices/, c-guardrails/; Black Belt has a-platform/, b-craft/,
// c-org/. Yellow and White have no parts.
function groupModulesByPart(modules, beltTrack) {
  if (!modules.length) return [];
  const groups = new Map();
  for (const mod of modules) {
    const match = mod.path?.match(/belts\/\d+-[a-z]+\/([a-z]-[a-z-]+)\//);
    const part = match ? match[1] : '_flat';
    if (!groups.has(part)) groups.set(part, []);
    groups.get(part).push(mod);
  }

  if (groups.size === 1 && groups.has('_flat')) {
    return [{ label: 'Modules', modules: groups.get('_flat') }];
  }

  // Map part directory names to human labels.
  const partLabels = {
    'a-craft': 'Part A — The Craft',
    'b-practices': 'Part B — The Practices',
    'c-guardrails': 'Part C — Fintech Guardrails',
    'a-platform': 'Part A — Build the Platform',
    'b-craft': 'Part B — Push the Craft',
    'c-org': 'Part C — Shape the Org'
  };

  return Array.from(groups.entries()).map(([part, mods]) => ({
    label: partLabels[part] || part,
    modules: mods
  }));
}

async function main() {
  const manifest = await readYaml('manifest.yml');
  const slugs = await readYaml('slugs.yml');
  const slugEntries = (slugs.entries || []).filter((entry) => entry.slug && entry.path);
  const chapters = (manifest.chapters || []).filter((entry) => entry.slug && entry.path && entry.status !== 'internal');
  const plannedPages = (manifest.planned_sections || []).map(plannedPageFromSection);
  const extraEntries = [
    ...plannedPages
  ];
  const { slugByPath, entryBySlug } = buildSlugMaps(chapters, extraEntries);

  for (const entry of chapters) {
    if (entry.slug && !slugEntries.some((slugEntry) => slugEntry.slug === entry.slug && slugEntry.path === entry.path)) {
      throw new Error(`Manifest entry missing from slugs.yml: ${entry.slug} -> ${entry.path}`);
    }
  }

  await resetGeneratedTree();
  for (const entry of chapters) {
    await buildChapter(entry, slugByPath, entryBySlug, chapters);
  }
  for (const entry of plannedPages) {
    await buildPlannedPage(entry);
  }

  // Pre-seed the diagrams folder into public/diagrams so absolute-path
  // references in the custom homepage (e.g. /diagrams/belt-ladder-hero.svg)
  // resolve at build time. Per-chapter markdown references still flow through
  // rewriteLinks → copyAsset on demand.
  await seedDiagramAssets();

  // The custom homepage overrides the generated README → index mapping. Written
  // last so the splash template lands on /. The root README continues to serve
  // GitHub readers; the hub homepage is purpose-built.
  await writeCustomHomepage(chapters);
  await writeCustom404Page();

  const sidebar = buildSidebar(chapters, plannedPages);
  await fs.mkdir(path.dirname(sidebarPath), { recursive: true });
  await fs.writeFile(sidebarPath, `// Generated by scripts/generate-docs.mjs.\nexport const sidebar = ${JSON.stringify(sidebar, null, 2)};\n`);

  const generatedCount = chapters.length + plannedPages.length;
  console.log(`Generated ${generatedCount} docs pages from manifest.yml and front matter.`);
}

// Write a Starlight splash-template homepage with the belt-ladder hero, the
// "find your starting point" decision strip, a unified curriculum ladder
// (Foundation → belts → Council), and the appendix grid. The homepage
// overrides the generated README → index mapping.
async function writeCustomHomepage(chapters) {
  const beltCards = beltOrder.map((track) => {
    const beltReadme = chapters.find((c) => c.section === 'belts' && c.track === track && c.type === 'readme' && c.slug === `belts/${track}`);
    if (!beltReadme) return null;
    return {
      title: `${beltIcons[track]} ${capitalise(track)} Belt`,
      href: routeFor(beltReadme.slug),
      description: beltReadme.outcome || ''
    };
  }).filter(Boolean);

  const councilReadme = chapters.find((c) => c.section === 'council' && c.slug === 'council');
  const foundationReadme = chapters.find((c) => c.section === 'foundation' && c.slug === 'foundation');

  // The full curriculum reads bottom-up (the direction the journey runs):
  // Foundation → White → Yellow → Green → Black → Council. Each entry is a
  // single line with the promise — no per-card descriptions to avoid the
  // sidebar already saying the same thing.
  const curriculumRows = [];
  if (foundationReadme) {
    curriculumRows.push(`- [**Part 0 — Foundation**](${routeFor(foundationReadme.slug)}) — Tech 101 + Ops 101. Pre-tools, pre-AI.`);
  }
  for (const card of beltCards) {
    curriculumRows.push(`- [**${card.title}**](${card.href}) — ${escapeYaml(card.description)}`);
  }
  if (councilReadme) {
    curriculumRows.push(`- [**Staff+ Council**](${routeFor(councilReadme.slug)}) — senior IC community above the belts. Invitation only.`);
  }
  const curriculumLadderMd = curriculumRows.join('\n');

  const appendixGrid = appendixClusters.map((cluster) => {
    const items = cluster.tracks.map((track) => {
      const trackEntries = chapters.filter((c) => c.section === 'appendices' && c.track === track);
      const readme = trackEntries.find((c) => c.type === 'readme') || trackEntries[0];
      if (!readme) return null;
      return `- [${trackLabels[track] || track}](${routeFor(readme.slug)})`;
    }).filter(Boolean).join('\n');
    return `### ${cluster.label}\n\n${items}`;
  }).join('\n\n');

  const content = `---
title: Razorpay AI Playbook
description: The operating manual for AI-native builders at every level. Foundation through Council, all in one source.
template: splash
hero:
  tagline: The operating manual for AI-native builders. Foundation through Council, all in one source.
  actions:
    - text: Start the journey
      link: /prologue/welcome/
      icon: right-arrow
      variant: primary
    - text: Just want the TOC
      link: /master-index/
      icon: external
      variant: minimal
---

## Day 1 — three steps in this order

If today is your first day with the playbook, do these three things before anything else. The whole rest of the curriculum compounds off of them.

1. **[Take the self-assessment](/prologue/self-assessment/)** (2 minutes). Tells you which belt to actually start at.
2. **[Read Tech 101 chapter 1](/tech-101/what-is-software/)** (5 minutes) — or skip if you already know what a server is.
3. **[Run W.5 → Quest W-0](/belts/white/installing-the-stack/)** (~60 minutes). The two-step install + the five GREEN checks. By the end of this you've shipped your first "I have working Claude Code" claim.

Stuck at any step? Post in [\`#claude-onboarding-support\`](https://razorpay.slack.com/archives/C0ANCMTCJA2) within ten minutes — that's the support channel for everything Day 1.

---

![The belt ladder — from Foundation through Council](/diagrams/belt-ladder-hero.svg)

## Find your starting point

Pick the door that matches where you are today.

- [**Never opened Terminal?**](/foundation/) — start with Part 0 (Tech 101 + Ops 101).
- [**Ship code regularly?**](/prologue/self-assessment/) — take the two-minute self-assessment.
- [**Senior IC reading the Council?**](/council/) — invitation-only senior community.
- [**Just browsing?**](/master-index/) — the full table of contents.

## The full curriculum

The journey runs bottom-up. Each link is one stop on the ladder above.

${curriculumLadderMd}

## Appendices

${appendixGrid}

---

The full playbook is reachable from the [Master Index](/master-index/). The hub is regenerated from Markdown on every build; the canonical source is the repository.
`;

  await writeGeneratedDoc('index.md', content);
}

// Write a custom 404 page that gives the reader an actual escape route instead
// of a dead-end "page not found" message. Three suggested entry points cover
// most arrivals; the search bar in the header surfaces the rest.
async function writeCustom404Page() {
  const content = `---
title: Page not found
description: This page moved or never existed. The doors below cover most arrivals.
template: splash
hero:
  tagline: This page moved or never existed. Three doors cover most arrivals.
  actions:
    - text: Back to the playbook home
      link: /
      icon: right-arrow
      variant: primary
    - text: Open the Master Index
      link: /master-index/
      icon: external
      variant: minimal
---

## Where you probably wanted to go

- [**Tech 101 — What is software, really?**](/tech-101/what-is-software/) — chapter one of the universal handbook, if you're new and looking for a place to start.
- [**Part 0 — Foundation**](/foundation/) — pre-tools, pre-AI orientation for Tech 101 and Ops 101.
- [**Master Index**](/master-index/) — the full table of contents.

If you searched and the page you wanted has moved, the search bar in the header above will find it. If a stale link sent you here, ping [\`#claude-onboarding-support\`](https://razorpay.slack.com/archives/C0ANCMTCJA2) so the link gets fixed.
`;

  await writeGeneratedDoc('404.md', content);
}

function capitalise(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function escapeYaml(s) {
  return (s || '').replace(/"/g, '\\"').replace(/\n/g, ' ');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
