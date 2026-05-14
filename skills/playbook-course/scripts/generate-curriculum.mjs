#!/usr/bin/env node
// generate-curriculum.mjs
//
// Reads the playbook root manifest.yml, filters to belt content, and emits a
// curriculum.json that the playbook-course skill consumes at runtime.
//
// The skill never reads manifest.yml directly. The skill reads curriculum.json.
// This indirection lets us reshape the data the skill needs without changing
// manifest.yml's semantics.
//
// Run from the repo root:
//   node skills/playbook-course/scripts/generate-curriculum.mjs
//
// Or from the skill directory:
//   node scripts/generate-curriculum.mjs
//
// Output:
//   skills/playbook-course/curriculum.json

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SKILL_DIR = path.resolve(__dirname, "..");
const REPO_ROOT = path.resolve(SKILL_DIR, "..", "..");
const MANIFEST_PATH = path.join(REPO_ROOT, "manifest.yml");
const OUT_PATH = path.join(SKILL_DIR, "curriculum.json");

// Tiny YAML-shaped reader. We parse manifest.yml as a list of chapter records
// keyed by indentation. The manifest is hand-authored and shallow; we do not
// need a full YAML parser.
function parseManifest(yamlText) {
  const lines = yamlText.split("\n");
  const chapters = [];
  let current = null;

  for (const raw of lines) {
    const line = raw.replace(/\r$/, "");
    if (!line.trim()) continue;
    if (line.startsWith("#")) continue;

    // top-level keys (version, updated, etc.)
    if (/^[a-z_]+:/.test(line)) continue;

    // chapter header: starts with "  - "
    const headerMatch = line.match(/^ {2}-\s+slug:\s+"?([^"\n]+?)"?\s*$/);
    if (headerMatch) {
      if (current) chapters.push(current);
      current = { slug: headerMatch[1] };
      continue;
    }

    // chapter field: starts with "    "
    const fieldMatch = line.match(/^ {4}([a-z_]+):\s*(.*)$/);
    if (fieldMatch && current) {
      const key = fieldMatch[1];
      let value = fieldMatch[2].trim();
      // strip surrounding quotes
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      // null literal
      if (value === "null") value = null;
      // numbers
      if (/^-?\d+$/.test(value)) value = Number(value);
      // bare arrays we ignore in v0.8 (none of the fields we use are arrays)
      current[key] = value;
    }
  }
  if (current) chapters.push(current);
  return chapters;
}

function buildBelt(beltSlug, beltTitle, beltPromise, chapters) {
  // The Staff+ Council uses section: "council" rather than section: "belts"
  // because it is structurally not a belt. Other belts use section: "belts".
  const sectionName = beltSlug === "council" ? "council" : "belts";
  const readmeSlug = beltSlug === "council" ? "council" : `belts/${beltSlug}`;
  const beltChapters = chapters.filter(
    (c) =>
      c.section === sectionName &&
      c.track === beltSlug &&
      c.slug !== readmeSlug,
  );

  const modules = beltChapters
    .filter((c) => c.type === "chapter")
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((c) => ({
      slug: c.slug,
      path: c.path,
      title: c.title,
      order: c.order,
      pillar: c.pillar,
      time_minutes: c.time_minutes,
      audience: c.audience,
      outcome: c.outcome,
      status: c.status,
    }));

  const quests = beltChapters
    .filter((c) => c.type === "quest")
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((c) => ({
      slug: c.slug,
      path: c.path,
      title: c.title,
      order: c.order,
      time_minutes: c.time_minutes,
      outcome: c.outcome,
      status: c.status,
    }));

  const bossFight = beltChapters.find((c) => c.type === "boss-fight");
  const badge = beltChapters.find((c) => c.type === "badge");

  return {
    slug: beltSlug,
    title: beltTitle,
    promise: beltPromise,
    status: modules.length > 0 ? "drafted" : "planned",
    modules,
    quests,
    boss_fight: bossFight
      ? {
          slug: bossFight.slug,
          path: bossFight.path,
          title: bossFight.title,
          order: bossFight.order,
          outcome: bossFight.outcome,
          status: bossFight.status,
        }
      : null,
    badge: badge
      ? {
          slug: badge.slug,
          path: badge.path,
          title: badge.title,
          order: badge.order,
          status: badge.status,
        }
      : null,
  };
}

function main() {
  const manifestText = fs.readFileSync(MANIFEST_PATH, "utf8");
  const chapters = parseManifest(manifestText);

  // Belts the playbook tracks. Promises are stable copy from the belt READMEs.
  const beltDefs = [
    {
      slug: "white",
      title: "White Belt",
      promise: "I have shipped code.",
    },
    {
      slug: "yellow",
      title: "Yellow Belt",
      promise:
        "I build with AI daily. I find and fix things in the surfaces I care about.",
    },
    {
      slug: "green",
      title: "Green Belt",
      promise: "My team moves faster.",
    },
    {
      slug: "black",
      title: "Black Belt",
      promise: "I multiply others.",
    },
    {
      slug: "council",
      title: "Staff+ Council",
      promise:
        "I shape the program over multi-year horizons through Council membership, RFC sponsorship, mentoring, and external representation.",
    },
  ];

  const belts = beltDefs.map((d) =>
    buildBelt(d.slug, d.title, d.promise, chapters),
  );

  const out = {
    version: "v0.8",
    generated: new Date().toISOString().slice(0, 10),
    source_manifest: "manifest.yml",
    notes:
      "Generated by skills/playbook-course/scripts/generate-curriculum.mjs. Do not edit by hand. Re-run after manifest.yml changes.",
    belts,
  };

  fs.writeFileSync(OUT_PATH, JSON.stringify(out, null, 2) + "\n", "utf8");

  // Sanity report
  const draftedBelts = belts.filter((b) => b.status === "drafted");
  console.log(`Wrote ${OUT_PATH}`);
  console.log(`Belts: ${belts.length} total, ${draftedBelts.length} drafted`);
  for (const b of belts) {
    const m = b.modules.length;
    const q = b.quests.length;
    const bf = b.boss_fight ? "yes" : "no";
    const bd = b.badge ? "yes" : "no";
    console.log(
      `  ${b.slug.padEnd(12)} status=${b.status.padEnd(8)} modules=${String(m).padEnd(2)} quests=${q} boss_fight=${bf} badge=${bd}`,
    );
  }

  // Verify all module paths exist on disk; this is the integrity check the
  // plan calls out in Stage 1.
  const missing = [];
  for (const b of belts) {
    const items = [
      ...b.modules,
      ...b.quests,
      ...(b.boss_fight ? [b.boss_fight] : []),
      ...(b.badge ? [b.badge] : []),
    ];
    for (const it of items) {
      const abs = path.join(REPO_ROOT, it.path);
      if (!fs.existsSync(abs)) missing.push(`${b.slug}: ${it.path}`);
    }
  }
  if (missing.length) {
    console.error("Path integrity FAILED:");
    for (const m of missing) console.error(`  missing: ${m}`);
    process.exit(1);
  }
  console.log("Path integrity OK");
}

main();
