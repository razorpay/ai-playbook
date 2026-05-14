#!/usr/bin/env python3
"""
polish-detector.py — Detects voice-drift patterns across canonical content.

Four dimensions are measured per file:

  1. Em-dash density (em-dashes per file; flag overuse).
  2. Shorthand-marker patterns (the v0.5-v0.15 staccato voice that
     v0.16+ replaced with full prose).
  3. Placeholder phrases ("the program's primary X", "the program-pinned X").
  4. POD usage (legitimate in literal organisational references; flag
     where 'team' would read more cleanly).

Outputs:
  - Per-section summary table.
  - Top-N worst-offender files for manual editing prioritisation.
  - Optional per-line context dump.

Usage:
  python3 scripts/polish-detector.py                 # summary table
  python3 scripts/polish-detector.py --top-n 30      # show worst 30 files
  python3 scripts/polish-detector.py --context FILE  # dump matched lines

Skip rule: content already polished in v0.16 (Council), v0.17 (appendices D-J),
v0.18 (skills), and v0.19 (CONTRIBUTING, ROADMAP) is excluded by default. Pass
--all to include everything.
"""

import argparse
import re
import sys
from collections import defaultdict
from pathlib import Path

# Sections in scope. (section_label, glob_root). Each section is walked.
SECTIONS = [
    ("Foundation", "foundation"),
    ("Prologue", "prologue"),
    ("White Belt", "belts/01-white"),
    ("Yellow Belt", "belts/02-yellow"),
    ("Green Belt", "belts/03-green"),
    ("Black Belt", "belts/04-black"),
    ("Council", "belts/05-council"),
    ("Appendices", "appendices"),
]

# Files/directories excluded by default because they were drafted under the
# v0.16+ style bar. The polish pass should not revisit them.
SKIP_PATHS_DEFAULT = {
    "belts/05-council",                           # Council chapters; voice anchor
    "appendices/D-known-issues",                  # v0.17 drafted skeleton
    "appendices/E-roles-and-forums",              # v0.17
    "appendices/F-slack-channels",                # v0.17
    "appendices/G-glossary",                      # v0.17
    "appendices/I-templates",                     # v0.17
    "appendices/J-reading-list",                  # v0.17
}

# Skip individual files that were drafted under the new bar even if their
# section is otherwise pre-bar.
SKIP_FILES_DEFAULT = {
    "appendices/H-reference-cards/H2-terminal-essentials.md",      # v0.18
    "appendices/H-reference-cards/H3-git-essentials.md",
    "appendices/H-reference-cards/H4-claude-code-essentials.md",
    "appendices/H-reference-cards/H5-playwright-essentials.md",
    "appendices/H-reference-cards/H6-mv-wiki-one-pager.md",
}

# Patterns. The shorthand-marker pattern is intentionally specific: it looks
# for the bold/italic delimiter or paragraph-start to avoid catching
# incidental phrasing.
EM_DASH = re.compile(r"—")

SHORTHAND_MARKERS = [
    re.compile(r"\*\*Trap:\*\*", re.M),
    re.compile(r"\*\*Trap\.\*\*", re.M),
    re.compile(r"\*\*Fix:\*\*", re.M),
    re.compile(r"\*\*Fix\.\*\*", re.M),
    re.compile(r"\*\*Discipline:\*\*", re.M),
    re.compile(r"\*\*Discipline\.\*\*", re.M),
    re.compile(r"\*\*The trap:\*\*", re.M),
    re.compile(r"\*\*The fix:\*\*", re.M),
    re.compile(r"\*\*The discipline:\*\*", re.M),
    re.compile(r"^The trap:\s", re.M),
    re.compile(r"^The fix:\s", re.M),
    re.compile(r"^The discipline:\s", re.M),
    re.compile(r"^\*The trap:\*\s", re.M),
    re.compile(r"^\*The fix:\*\s", re.M),
    re.compile(r"^\*The discipline:\*\s", re.M),
]

PLACEHOLDER_PATTERNS = [
    re.compile(r"the program's primary", re.IGNORECASE),
    re.compile(r"the program-pinned", re.IGNORECASE),
    re.compile(r"the program's pinned", re.IGNORECASE),
]

POD_USAGE = re.compile(r"\bPOD\b")


def relpath(path: Path, root: Path) -> str:
    return str(path.relative_to(root)).replace("\\", "/")


def is_skipped(rel: str, include_all: bool) -> bool:
    if include_all:
        return False
    if rel in SKIP_FILES_DEFAULT:
        return True
    for prefix in SKIP_PATHS_DEFAULT:
        if rel.startswith(prefix + "/") or rel == prefix:
            return True
    return False


def scan_file(text: str) -> dict:
    """Counts the four dimensions in a single file."""
    em_count = len(EM_DASH.findall(text))
    shorthand_count = sum(len(p.findall(text)) for p in SHORTHAND_MARKERS)
    placeholder_count = sum(len(p.findall(text)) for p in PLACEHOLDER_PATTERNS)
    pod_count = len(POD_USAGE.findall(text))
    return {
        "em_dash": em_count,
        "shorthand": shorthand_count,
        "placeholder": placeholder_count,
        "pod": pod_count,
    }


def walk_section(root: Path, glob_root: str, include_all: bool):
    """Yields (relative_path, scan_result) for each markdown file in the section."""
    base = root / glob_root
    if not base.exists():
        return
    for md in sorted(base.rglob("*.md")):
        rel = relpath(md, root)
        if is_skipped(rel, include_all):
            continue
        try:
            text = md.read_text(encoding="utf-8")
        except OSError:
            continue
        result = scan_file(text)
        result["lines"] = text.count("\n") + 1
        yield rel, result


def summary_table(root: Path, include_all: bool) -> None:
    print(f"{'Section':<14} {'Files':>6} {'Lines':>7} {'Em-dash/file':>14} {'Shorthand':>10} {'Placeholder':>12} {'POD':>6}")
    print("-" * 76)
    for section_label, glob_root in SECTIONS:
        totals = defaultdict(int)
        file_count = 0
        for _, scan in walk_section(root, glob_root, include_all):
            for key in ("em_dash", "shorthand", "placeholder", "pod", "lines"):
                totals[key] += scan[key]
            file_count += 1
        if file_count == 0:
            continue
        avg_em = totals["em_dash"] / file_count
        print(
            f"{section_label:<14} {file_count:>6} {totals['lines']:>7} "
            f"{avg_em:>14.1f} {totals['shorthand']:>10} "
            f"{totals['placeholder']:>12} {totals['pod']:>6}"
        )


def top_offenders(root: Path, n: int, include_all: bool) -> None:
    all_files = []
    for _, glob_root in SECTIONS:
        for rel, scan in walk_section(root, glob_root, include_all):
            scan["path"] = rel
            # Composite score weighted by visibility risk:
            # em-dash density gets the highest weight since it visibly drags
            # the prose; shorthand markers next; placeholders and POD lower
            # because they tend to be context-dependent edits.
            density = scan["em_dash"] / max(scan["lines"], 1) * 100
            scan["score"] = density * 3 + scan["shorthand"] * 2 + scan["placeholder"] + scan["pod"] * 0.5
            all_files.append(scan)
    all_files.sort(key=lambda r: r["score"], reverse=True)
    print(f"\nTop {n} worst-offender files (composite score):\n")
    print(f"{'#':>3} {'Em-dash':>8} {'Sh':>4} {'Pl':>4} {'POD':>4} {'Lines':>6} {'Score':>6}  Path")
    for i, scan in enumerate(all_files[:n], 1):
        print(
            f"{i:>3} {scan['em_dash']:>8} {scan['shorthand']:>4} "
            f"{scan['placeholder']:>4} {scan['pod']:>4} {scan['lines']:>6} "
            f"{scan['score']:>6.1f}  {scan['path']}"
        )


def context_dump(root: Path, target: str) -> None:
    path = root / target
    if not path.exists():
        print(f"File not found: {target}", file=sys.stderr)
        sys.exit(1)
    text = path.read_text(encoding="utf-8")
    print(f"=== {target} ===\n")
    # Em-dash lines
    print("-- Em-dash occurrences --")
    for idx, line in enumerate(text.split("\n"), 1):
        if EM_DASH.search(line):
            print(f"  L{idx:4}: {line}")
    # Shorthand
    print("\n-- Shorthand-marker occurrences --")
    for idx, line in enumerate(text.split("\n"), 1):
        if any(p.search(line) for p in SHORTHAND_MARKERS):
            print(f"  L{idx:4}: {line}")
    # Placeholder
    print("\n-- Placeholder occurrences --")
    for idx, line in enumerate(text.split("\n"), 1):
        if any(p.search(line) for p in PLACEHOLDER_PATTERNS):
            print(f"  L{idx:4}: {line}")
    # POD
    print("\n-- POD occurrences --")
    for idx, line in enumerate(text.split("\n"), 1):
        if POD_USAGE.search(line):
            print(f"  L{idx:4}: {line}")


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--top-n", type=int, default=0, help="Show top N worst-offender files (default: 0 = skip)")
    parser.add_argument("--context", help="Dump matched lines for a single file")
    parser.add_argument("--all", action="store_true", help="Include content polished in earlier passes")
    parser.add_argument("--root", default=".", help="Repository root (default: cwd)")
    args = parser.parse_args()

    root = Path(args.root).resolve()
    if args.context:
        context_dump(root, args.context)
        return
    summary_table(root, args.all)
    if args.top_n:
        top_offenders(root, args.top_n, args.all)


if __name__ == "__main__":
    main()
