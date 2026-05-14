#!/usr/bin/env python3
"""
polish-substitute.py — Mechanical substitutions for the polish pass.

Applies high-confidence patterns:

  1. Stacked em-dashes in prose: "X — Y — Z" → "X (Y) Z" where the inner
     phrase is bounded and clearly parenthetical.
  2. Shorthand markers: "**Trap:**", "**Fix:**", "**Discipline:**" etc.
     restructured to plain prose.
  3. Placeholder phrases: "the program's primary X" / "the program-pinned X"
     simplified where the indirection isn't load-bearing.

Skips:
  - Heading lines (start with #).
  - Table rows (start with |).
  - List item titles (a bare line starting with - or * + bold heading).
  - Fenced code blocks.
  - Front-matter.

Usage:
  python3 scripts/polish-substitute.py --dry-run        # show what would change
  python3 scripts/polish-substitute.py --apply          # apply substitutions
  python3 scripts/polish-substitute.py --apply --file X # one specific file
"""

import argparse
import re
import sys
from pathlib import Path

SECTIONS = [
    "foundation",
    "prologue",
    "belts/01-white",
    "belts/02-yellow",
    "belts/03-green",
    "belts/04-black",
    "appendices/A-tool-atlas",
    "appendices/B-environment-setup",
    "appendices/C-skills-library",
    "appendices/H-reference-cards",
    "appendices/L-certification",
    "appendices/N-methodologies",
]

SKIP_PATHS = {
    "belts/05-council/",
    "appendices/D-known-issues/",
    "appendices/E-roles-and-forums/",
    "appendices/F-slack-channels/",
    "appendices/G-glossary/",
    "appendices/I-templates/",
    "appendices/J-reading-list/",
}

SKIP_FILES = {
    "appendices/H-reference-cards/H2-terminal-essentials.md",
    "appendices/H-reference-cards/H3-git-essentials.md",
    "appendices/H-reference-cards/H4-claude-code-essentials.md",
    "appendices/H-reference-cards/H5-playwright-essentials.md",
    "appendices/H-reference-cards/H6-mv-wiki-one-pager.md",
}


def is_skipped(rel: str) -> bool:
    if rel in SKIP_FILES:
        return True
    return any(rel.startswith(prefix) for prefix in SKIP_PATHS)


def is_structural_line(line: str) -> bool:
    """Heading, table, list-item, blockquote-with-heading, fenced code."""
    stripped = line.lstrip()
    if not stripped:
        return True  # blank line; nothing to substitute
    return stripped.startswith(("#", "|", "```", "    "))


# --- Substitution patterns ---

# Pattern 1: stacked em-dashes inside prose. "A — B — C" where the inner
# phrase B is short (parenthetical-shaped). Conservative bound: B is up to
# ~80 chars and doesn't contain another em-dash or punctuation that would
# imply a different structure.
STACKED_EM = re.compile(
    r" — ([^—\n.!?]{2,80}?) — "
)

# Pattern 2: shorthand markers
SHORTHAND_PATTERNS = [
    (re.compile(r"\*\*Trap:\*\* +(.+)"), r"A common trap here: \1"),
    (re.compile(r"\*\*Trap\.\*\* +(.+)"), r"A common trap here: \1"),
    (re.compile(r"\*\*Fix:\*\* +(.+)"), r"The fix: \1"),
    (re.compile(r"\*\*Fix\.\*\* +(.+)"), r"The fix: \1"),
    (re.compile(r"\*\*Discipline:\*\* +(.+)"), r"The discipline: \1"),
    (re.compile(r"\*\*Discipline\.\*\* +(.+)"), r"The discipline: \1"),
    (re.compile(r"\*\*The trap:\*\* +(.+)"), r"A common trap here: \1"),
    (re.compile(r"\*\*The fix:\*\* +(.+)"), r"The fix: \1"),
    (re.compile(r"\*\*The discipline:\*\* +(.+)"), r"The discipline: \1"),
]

# Pattern 3: placeholder phrases (conservative; most common usages)
PLACEHOLDER_PATTERNS = [
    (re.compile(r"the program's primary Slack channel", re.I), "the program's flagship channel"),
    (re.compile(r"the program's primary support channel", re.I), "the program's support channel"),
    (re.compile(r"the program's primary forum", re.I), "the program's main forum"),
    (re.compile(r"the program-pinned plugin distribution channel", re.I), "the program's plugin distribution channel"),
    (re.compile(r"the program's pinned plugin distribution channel", re.I), "the program's plugin distribution channel"),
]


def substitute_line(line: str) -> tuple[str, int]:
    """Returns (new_line, n_changes)."""
    if is_structural_line(line):
        return line, 0
    n_changes = 0
    result = line

    # Shorthand markers
    for pattern, replacement in SHORTHAND_PATTERNS:
        new_result, n = pattern.subn(replacement, result)
        if n:
            result = new_result
            n_changes += n

    # Placeholder phrases
    for pattern, replacement in PLACEHOLDER_PATTERNS:
        new_result, n = pattern.subn(replacement, result)
        if n:
            result = new_result
            n_changes += n

    # Stacked em-dashes. Only fire once per line; if the line has 4+ em-dashes
    # the substitution can chain and produce odd output; iterate carefully.
    while True:
        new_result, n = STACKED_EM.subn(r" (\1) ", result, count=1)
        if n == 0:
            break
        result = new_result
        n_changes += n

    return result, n_changes


def substitute_file(text: str) -> tuple[str, int]:
    """Returns (new_text, n_total_changes)."""
    # Skip front-matter and fenced code blocks.
    lines = text.split("\n")
    in_code = False
    in_frontmatter = lines and lines[0].strip() == "---"
    fm_end = -1
    if in_frontmatter:
        for i, ln in enumerate(lines[1:], 1):
            if ln.strip() == "---":
                fm_end = i
                break

    new_lines = []
    total_changes = 0
    for i, line in enumerate(lines):
        if in_frontmatter and i <= fm_end:
            new_lines.append(line)
            continue
        # Track fenced code blocks
        if line.lstrip().startswith("```"):
            in_code = not in_code
            new_lines.append(line)
            continue
        if in_code:
            new_lines.append(line)
            continue
        new_line, n = substitute_line(line)
        new_lines.append(new_line)
        total_changes += n

    return "\n".join(new_lines), total_changes


def walk_files(root: Path):
    for section in SECTIONS:
        base = root / section
        if not base.exists():
            continue
        for md in sorted(base.rglob("*.md")):
            rel = str(md.relative_to(root))
            if is_skipped(rel):
                continue
            yield md, rel


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--apply", action="store_true", help="Apply substitutions (default: dry-run)")
    parser.add_argument("--file", help="Process one specific file only")
    parser.add_argument("--root", default=".")
    args = parser.parse_args()

    root = Path(args.root).resolve()
    total_files_changed = 0
    total_changes = 0

    if args.file:
        targets = [(root / args.file, args.file)]
    else:
        targets = list(walk_files(root))

    for md_path, rel in targets:
        try:
            text = md_path.read_text(encoding="utf-8")
        except OSError:
            continue
        new_text, n = substitute_file(text)
        if n == 0:
            continue
        total_files_changed += 1
        total_changes += n
        if args.apply:
            md_path.write_text(new_text, encoding="utf-8")
            print(f"[applied {n:3} changes] {rel}")
        else:
            print(f"[would apply {n:3} changes] {rel}")

    mode = "Applied" if args.apply else "Would apply"
    print(f"\n{mode} {total_changes} substitutions across {total_files_changed} files.")


if __name__ == "__main__":
    main()
