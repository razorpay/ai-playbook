#!/usr/bin/env python3
"""Generate hand-drawn-style SVG illustrations for v0.21b.

Path B of the Excalidraw companion pass: rough.js-inspired perturbations
applied to lines, rectangles, arrows, and labels so the output reads as a
whiteboard sketch rather than a CAD drawing. Each illustration is a small
composer function that emits one SVG via the same primitives.

Usage:
    python3 scripts/generate-handdrawn-svg.py

Outputs:
    excalidraw/origin-story-bd1-vs-bd2.svg
    excalidraw/boss-fight-bb-month-timeline.svg
    excalidraw/office-hours-60-minute-session.svg
    excalidraw/embedded-sprint-one-week.svg
    excalidraw/inbox-triage-before-after.svg
    excalidraw/white-belt-turn-green-journey.svg
    excalidraw/rfc-anti-patterns.svg

The seed is fixed so reruns produce identical SVGs (otherwise every commit
would diff). Adjust SEED at the top to re-roll the wobble.
"""

from __future__ import annotations

import math
import os
import random
from typing import List, Tuple

SEED = 4242
OUTPUT_DIR = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    "excalidraw",
)

# Palette — sparing, drawn from the playbook identity colours.
INK = "#1F2937"          # primary stroke
INK_MUTED = "#6B7280"    # secondary captions
AMBER = "#F59E0B"        # warm accent / "before"
EMERALD = "#10B981"      # positive / "after"
RED = "#EF4444"          # warning / "no"
INDIGO = "#6366F1"       # rare highlight


# ---------------------------------------------------------------------------
# Rough primitives — wobbly lines, sketchy rects, hand-drawn arrows.
# ---------------------------------------------------------------------------


def wobble(rng: random.Random, base: float, amount: float = 1.5) -> float:
    return base + rng.uniform(-amount, amount)


def rough_line(
    rng: random.Random,
    x1: float,
    y1: float,
    x2: float,
    y2: float,
    stroke: str = INK,
    width: float = 1.8,
    passes: int = 2,
    wobble_amount: float = 2.0,
) -> str:
    """Two slightly-different overlaid passes give the eye a hand-drawn feel."""
    parts: List[str] = []
    length = math.hypot(x2 - x1, y2 - y1)
    segments = max(4, int(length / 22))
    for _ in range(passes):
        points = [(x1, y1)]
        for i in range(1, segments):
            t = i / segments
            mx = x1 + (x2 - x1) * t
            my = y1 + (y2 - y1) * t
            points.append((wobble(rng, mx, wobble_amount), wobble(rng, my, wobble_amount)))
        points.append((wobble(rng, x2, wobble_amount * 0.5), wobble(rng, y2, wobble_amount * 0.5)))
        d = f"M {points[0][0]:.1f},{points[0][1]:.1f} "
        for px, py in points[1:]:
            d += f"L {px:.1f},{py:.1f} "
        parts.append(
            f'<path d="{d.strip()}" fill="none" stroke="{stroke}" stroke-width="{width}" stroke-linecap="round" stroke-linejoin="round"/>'
        )
    return "\n  ".join(parts)


def rough_rect(
    rng: random.Random,
    x: float,
    y: float,
    w: float,
    h: float,
    stroke: str = INK,
    width: float = 1.8,
    fill: str = "none",
    fill_opacity: float = 0.0,
    wobble_amount: float = 1.5,
) -> str:
    """A rectangle drawn as four wobbly lines + optional crosshatch fill."""
    parts: List[str] = []
    if fill != "none" and fill_opacity > 0:
        parts.append(
            f'<rect x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h:.1f}" fill="{fill}" fill-opacity="{fill_opacity}" stroke="none"/>'
        )
    parts.append(rough_line(rng, x, y, x + w, y, stroke, width, wobble_amount=wobble_amount))
    parts.append(rough_line(rng, x + w, y, x + w, y + h, stroke, width, wobble_amount=wobble_amount))
    parts.append(rough_line(rng, x + w, y + h, x, y + h, stroke, width, wobble_amount=wobble_amount))
    parts.append(rough_line(rng, x, y + h, x, y, stroke, width, wobble_amount=wobble_amount))
    return "\n  ".join(parts)


def rough_arrow(
    rng: random.Random,
    x1: float,
    y1: float,
    x2: float,
    y2: float,
    stroke: str = INK,
    width: float = 1.8,
    head: float = 12,
) -> str:
    """A wobbly arrow with a small triangular head drawn from two short strokes."""
    main = rough_line(rng, x1, y1, x2, y2, stroke, width)
    ang = math.atan2(y2 - y1, x2 - x1)
    hx1 = x2 - head * math.cos(ang - math.pi / 7)
    hy1 = y2 - head * math.sin(ang - math.pi / 7)
    hx2 = x2 - head * math.cos(ang + math.pi / 7)
    hy2 = y2 - head * math.sin(ang + math.pi / 7)
    h1 = rough_line(rng, x2, y2, hx1, hy1, stroke, width, passes=1, wobble_amount=0.8)
    h2 = rough_line(rng, x2, y2, hx2, hy2, stroke, width, passes=1, wobble_amount=0.8)
    return f"{main}\n  {h1}\n  {h2}"


def rough_circle(
    rng: random.Random,
    cx: float,
    cy: float,
    r: float,
    stroke: str = INK,
    width: float = 1.8,
    fill: str = "none",
    passes: int = 2,
) -> str:
    """A circle drawn as a wobbly polyline of many points."""
    parts: List[str] = []
    if fill != "none":
        parts.append(f'<circle cx="{cx:.1f}" cy="{cy:.1f}" r="{r:.1f}" fill="{fill}" stroke="none"/>')
    for _ in range(passes):
        points = []
        steps = 36
        start_offset = rng.uniform(0, math.pi / 12)
        for i in range(steps + 1):
            a = start_offset + (i / steps) * 2 * math.pi
            jitter = rng.uniform(-1.2, 1.2)
            px = cx + (r + jitter) * math.cos(a)
            py = cy + (r + jitter) * math.sin(a)
            points.append((px, py))
        d = f"M {points[0][0]:.1f},{points[0][1]:.1f} "
        for px, py in points[1:]:
            d += f"L {px:.1f},{py:.1f} "
        parts.append(
            f'<path d="{d.strip()}" fill="none" stroke="{stroke}" stroke-width="{width}" stroke-linecap="round" stroke-linejoin="round"/>'
        )
    return "\n  ".join(parts)


def rough_cross(rng: random.Random, cx: float, cy: float, size: float, stroke: str = RED, width: float = 2.4) -> str:
    """Circle with a diagonal cross — the universal NO indicator."""
    parts = [rough_circle(rng, cx, cy, size, stroke=stroke, width=width)]
    s = size * 0.65
    parts.append(rough_line(rng, cx - s, cy - s, cx + s, cy + s, stroke, width, passes=1, wobble_amount=0.6))
    parts.append(rough_line(rng, cx - s, cy + s, cx + s, cy - s, stroke, width, passes=1, wobble_amount=0.6))
    return "\n  ".join(parts)


def rough_check(rng: random.Random, cx: float, cy: float, size: float, stroke: str = EMERALD, width: float = 2.4) -> str:
    """Circle with a checkmark — the universal YES indicator."""
    parts = [rough_circle(rng, cx, cy, size, stroke=stroke, width=width)]
    parts.append(rough_line(rng, cx - size * 0.5, cy, cx - size * 0.1, cy + size * 0.35, stroke, width, passes=1, wobble_amount=0.5))
    parts.append(rough_line(rng, cx - size * 0.1, cy + size * 0.35, cx + size * 0.55, cy - size * 0.4, stroke, width, passes=1, wobble_amount=0.5))
    return "\n  ".join(parts)


# A simple hand-drawn-feeling label. Uses Comic-style font stack so the text
# reads as informal even though the path geometry is sharp.
HANDWRITING_FONT = (
    '"Caveat", "Indie Flower", "Comic Sans MS", "Marker Felt", '
    '"Bradley Hand", sans-serif'
)


def label(
    x: float,
    y: float,
    text: str,
    size: int = 14,
    fill: str = INK,
    anchor: str = "start",
    weight: int = 500,
    rotate: float = 0,
) -> str:
    transform = f' transform="rotate({rotate} {x} {y})"' if rotate else ""
    safe = text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    return (
        f'<text x="{x}" y="{y}" font-family=\'{HANDWRITING_FONT}\' '
        f'font-size="{size}" font-weight="{weight}" fill="{fill}" '
        f'text-anchor="{anchor}"{transform}>{safe}</text>'
    )


def header(view_w: int, view_h: int, title: str, subtitle: str) -> str:
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {view_w} {view_h}" '
        f'role="img" aria-label="{title}">\n'
        f'  <rect width="{view_w}" height="{view_h}" fill="#FFFFFF"/>\n'
        f'  {label(view_w / 2, 48, title, size=28, weight=700, anchor="middle")}\n'
        f'  {label(view_w / 2, 76, subtitle, size=15, fill=INK_MUTED, anchor="middle")}\n'
    )


def footer() -> str:
    return "</svg>\n"


# ---------------------------------------------------------------------------
# Reusable scene fragments.
# ---------------------------------------------------------------------------


def sketch_laptop(rng: random.Random, x: float, y: float, w: float = 80, mood: str = "neutral") -> str:
    """A tiny laptop sketch. mood ∈ {neutral, stressed, calm}."""
    base = []
    body_h = w * 0.6
    # Screen
    base.append(rough_rect(rng, x, y, w, body_h, width=1.6))
    # Keyboard slab
    base.append(rough_line(rng, x - w * 0.1, y + body_h, x + w * 1.1, y + body_h, width=1.6))
    base.append(rough_line(rng, x - w * 0.1, y + body_h + 4, x + w * 1.1, y + body_h + 4, width=1.4))
    # A small "screen" content marker
    if mood == "stressed":
        # zig-zag in screen + tiny x
        base.append(rough_line(rng, x + 8, y + 12, x + w - 8, y + 12, stroke=RED, width=1.4, passes=1))
        base.append(rough_line(rng, x + 8, y + 24, x + w - 18, y + 24, stroke=RED, width=1.4, passes=1))
        base.append(rough_cross(rng, x + w - 14, y + body_h - 12, 6))
    elif mood == "calm":
        base.append(rough_line(rng, x + 8, y + 12, x + w - 8, y + 12, stroke=EMERALD, width=1.4, passes=1))
        base.append(rough_line(rng, x + 8, y + 24, x + w - 20, y + 24, stroke=INK_MUTED, width=1.2, passes=1))
        base.append(rough_check(rng, x + w - 14, y + body_h - 12, 6))
    else:
        base.append(rough_line(rng, x + 8, y + 12, x + w - 8, y + 12, stroke=INK_MUTED, width=1.2, passes=1))
        base.append(rough_line(rng, x + 8, y + 22, x + w - 16, y + 22, stroke=INK_MUTED, width=1.2, passes=1))
    return "\n  ".join(base)


def sketch_person(rng: random.Random, cx: float, cy: float, mood: str = "neutral", scale: float = 1.0) -> str:
    """Stick figure — head + torso + arms + legs."""
    parts: List[str] = []
    head_r = 12 * scale
    parts.append(rough_circle(rng, cx, cy - 28 * scale, head_r, width=1.6))
    # Mouth varies by mood (simple line)
    if mood == "stressed":
        parts.append(rough_line(rng, cx - 4 * scale, cy - 24 * scale, cx + 4 * scale, cy - 22 * scale, width=1.2, passes=1))
        # eyebrows down
        parts.append(rough_line(rng, cx - 6 * scale, cy - 34 * scale, cx - 2 * scale, cy - 32 * scale, width=1.2, passes=1))
        parts.append(rough_line(rng, cx + 2 * scale, cy - 32 * scale, cx + 6 * scale, cy - 34 * scale, width=1.2, passes=1))
    elif mood == "happy":
        parts.append(rough_line(rng, cx - 4 * scale, cy - 25 * scale, cx + 4 * scale, cy - 25 * scale, width=1.2, passes=1))
    # Torso
    parts.append(rough_line(rng, cx, cy - 16 * scale, cx, cy + 18 * scale, width=1.6))
    # Arms
    parts.append(rough_line(rng, cx, cy - 8 * scale, cx - 16 * scale, cy + 6 * scale, width=1.6))
    parts.append(rough_line(rng, cx, cy - 8 * scale, cx + 16 * scale, cy + 6 * scale, width=1.6))
    # Legs
    parts.append(rough_line(rng, cx, cy + 18 * scale, cx - 12 * scale, cy + 40 * scale, width=1.6))
    parts.append(rough_line(rng, cx, cy + 18 * scale, cx + 12 * scale, cy + 40 * scale, width=1.6))
    return "\n  ".join(parts)


def sketch_speech_bubble(rng: random.Random, x: float, y: float, w: float, h: float, lines: List[str], tail_x: float | None = None) -> str:
    """A rough rounded speech bubble with text lines and a small tail."""
    parts = [rough_rect(rng, x, y, w, h, width=1.5)]
    if tail_x is not None:
        parts.append(rough_line(rng, tail_x, y + h, tail_x - 8, y + h + 16, width=1.5, passes=1, wobble_amount=1.0))
        parts.append(rough_line(rng, tail_x - 8, y + h + 16, tail_x + 6, y + h, width=1.5, passes=1, wobble_amount=1.0))
    for i, line in enumerate(lines):
        parts.append(label(x + 10, y + 20 + i * 18, line, size=13))
    return "\n  ".join(parts)


# ---------------------------------------------------------------------------
# The seven illustrations.
# ---------------------------------------------------------------------------


def diagram_origin_story() -> str:
    rng = random.Random(SEED + 1)
    W, H = 1200, 700
    out = [header(W, H, "Builder Day 1  →  Builder Day 2", "Setup friction was the lesson. Layer 0 became the floor.")]

    # Left panel: BD1
    out.append(label(280, 124, "BUILDER DAY 1", size=18, weight=700, anchor="middle", fill=AMBER))
    out.append(rough_rect(rng, 80, 140, 400, 420, width=1.6, fill=AMBER, fill_opacity=0.05))

    # Stressed builder + laptop
    out.append(sketch_laptop(rng, 180, 200, w=120, mood="stressed"))
    out.append(sketch_person(rng, 380, 260, mood="stressed", scale=1.1))

    # Thought bubble listing blockers
    out.append(sketch_speech_bubble(
        rng, 110, 360, 320, 170,
        [
            "admin lock won't budge",
            "Node? what's Node?",
            "Git never configured",
            "model access denied",
            "...features shipped: 0",
        ],
        tail_x=300,
    ))

    # Right panel: BD2
    out.append(label(900, 124, "BUILDER DAY 2", size=18, weight=700, anchor="middle", fill=EMERALD))
    out.append(rough_rect(rng, 720, 140, 400, 420, width=1.6, fill=EMERALD, fill_opacity=0.05))

    out.append(sketch_laptop(rng, 820, 200, w=120, mood="calm"))
    out.append(sketch_person(rng, 1020, 260, mood="happy", scale=1.1))

    out.append(sketch_speech_bubble(
        rng, 750, 360, 340, 170,
        [
            "setup-verify ran GREEN",
            "plugin checksum matches",
            "office hours 3x/week",
            "right-sized projects",
            "dozens of commits in 2 days",
        ],
        tail_x=940,
    ))

    # Centre arrow with three labels
    out.append(rough_arrow(rng, 490, 340, 710, 340, width=2.4, head=18))
    out.append(label(600, 308, "validation gate", anchor="middle", size=14, weight=600))
    out.append(label(600, 326, "GREEN / YELLOW / RED triage", anchor="middle", size=13, fill=INK_MUTED))
    out.append(label(600, 356, "right-sized projects", anchor="middle", size=13, fill=INK_MUTED))

    # Bottom takeaway
    out.append(rough_line(rng, 200, 620, 1000, 620, width=1.2, passes=1, wobble_amount=0.8, stroke=INK_MUTED))
    out.append(label(600, 660, "The lesson: setup friction isn't an appendix — it's Layer 0.", size=18, weight=600, anchor="middle"))

    out.append(footer())
    return "\n  ".join(out)


def diagram_boss_fight_bb() -> str:
    rng = random.Random(SEED + 2)
    W, H = 1300, 700
    out = [header(W, H, "Boss Fight B-B  —  the month, phase by phase", "One pre-week, four working weeks, one post-week. The flow has a shape.")]

    # Timeline spine
    y = 360
    out.append(rough_line(rng, 90, y, 1210, y, width=2.4, wobble_amount=1.0))
    # Notches
    phases = [
        (180, "week 0", "Pre-embed", "lock metric + reviewer", "stressed"),
        (390, "week 1", "Listen", "shadow standups,\nread the codebase", "neutral"),
        (650, "weeks 2-3", "Build", "pair-program,\nemerge a skill-pack", "neutral"),
        (900, "week 4", "Consolidate", "measure + write up\nthe case study", "happy"),
        (1140, "post-week", "Present", "the all-hands,\nthe artefact", "happy"),
    ]
    for (cx, weeklabel, phase, blurb, mood) in phases:
        out.append(rough_circle(rng, cx, y, 14, width=2.0, fill="#FFFFFF"))
        out.append(label(cx, y + 5, "●", size=10, anchor="middle", fill=INK))
        out.append(label(cx, y - 200, phase.upper(), size=15, weight=700, anchor="middle"))
        out.append(label(cx, y - 178, weeklabel, size=12, anchor="middle", fill=INK_MUTED))
        # Person at the phase
        out.append(sketch_person(rng, cx, y - 130, mood=mood, scale=0.9))
        # Blurb below
        for i, line in enumerate(blurb.split("\n")):
            out.append(label(cx, y + 50 + i * 18, line, size=13, anchor="middle", fill=INK_MUTED))

    # "DO NOT" annotations
    out.append(rough_rect(rng, 110, 590, 1080, 70, width=1.4, fill=RED, fill_opacity=0.05))
    out.append(label(140, 615, "Do NOT:", size=14, weight=700, fill=RED))
    out.append(label(140, 635, "  ✕ advisory-only (no PRs)", size=13, fill=INK))
    out.append(label(420, 635, "  ✕ pick the metric solo", size=13, fill=INK))
    out.append(label(700, 635, "  ✕ skip the reviewer", size=13, fill=INK))
    out.append(label(940, 635, "  ✕ no written debrief", size=13, fill=INK))

    out.append(footer())
    return "\n  ".join(out)


def diagram_office_hours() -> str:
    rng = random.Random(SEED + 3)
    W, H = 1100, 760
    out = [header(W, H, "Office Hours  —  one 60-minute session", "Three days of queue, one hour live, one log entry that compounds.")]

    spine_x = 520
    out.append(rough_line(rng, spine_x, 130, spine_x, 690, width=2.2, wobble_amount=0.8))

    # Pre-hour: queue
    out.append(label(spine_x, 152, "3 DAYS BEFORE", size=13, weight=700, anchor="middle", fill=INK_MUTED))
    out.append(sketch_speech_bubble(
        rng, 200, 170, 260, 110,
        ["@here urgent? not really.", "anyone seen X error?", "is Y skill working?", "(slack thread fills up)"],
        tail_x=420,
    ))
    out.append(label(700, 200, "queue is the agenda", size=15, weight=600))
    out.append(label(700, 222, "no agenda, no hour", size=13, fill=INK_MUTED))

    # T = 0: triage
    out.append(label(spine_x, 320, "MINUTE 0  —  TRIAGE", size=13, weight=700, anchor="middle", fill=INK_MUTED))
    out.append(rough_rect(rng, 200, 340, 260, 130, width=1.6, fill=AMBER, fill_opacity=0.05))
    out.append(label(330, 365, "Sort the queue", size=14, weight=600, anchor="middle"))
    out.append(label(220, 392, "• in-scope → live (10 min each)", size=12))
    out.append(label(220, 412, "• out-of-scope → route to owner", size=12))
    out.append(label(220, 432, "• already-answered → link back", size=12))
    out.append(label(220, 452, "• unclear → ask in 1 line", size=12))

    # Centre: facilitator + flowchart
    out.append(sketch_person(rng, spine_x + 40, 410, mood="happy", scale=1.0))
    out.append(label(spine_x + 75, 380, "(host)", size=11, fill=INK_MUTED))
    out.append(label(700, 380, "rotation is the legitimacy", size=15, weight=600))
    out.append(label(700, 402, "host rotates monthly", size=13, fill=INK_MUTED))

    # Middle: live work
    out.append(label(spine_x, 510, "MINUTES 10–55  —  LIVE WORK", size=13, weight=700, anchor="middle", fill=INK_MUTED))
    out.append(rough_rect(rng, 200, 530, 260, 90, width=1.6, fill=INK_MUTED, fill_opacity=0.06))
    out.append(label(330, 555, "Pair on each item", size=14, weight=600, anchor="middle"))
    out.append(label(220, 580, "• demo → critique → decision", size=12))
    out.append(label(220, 600, "• timebox 10 min per item", size=12))
    out.append(sketch_person(rng, 600, 575, mood="neutral", scale=0.85))
    out.append(sketch_person(rng, 640, 575, mood="happy", scale=0.85))

    # End: log
    out.append(label(spine_x, 660, "MINUTE 60  —  LOG", size=13, weight=700, anchor="middle", fill=INK_MUTED))
    out.append(rough_rect(rng, 200, 680, 700, 56, width=1.6, fill=EMERALD, fill_opacity=0.08))
    out.append(label(220, 705, "Log entry pinned in the channel:", size=13, weight=600))
    out.append(label(220, 725, "what was asked • what we decided • link to the artefact", size=12, fill=INK_MUTED))

    out.append(footer())
    return "\n  ".join(out)


def diagram_embedded_sprint() -> str:
    rng = random.Random(SEED + 4)
    W, H = 1400, 680
    out = [header(W, H, "Embedded sprint  —  the week has a shape", "Ship-with-not-for, time-boxed, debriefed in writing.")]

    days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"]
    activities = [
        ("Arrival", "read the POD's\nCLAUDE.md\n+ sit in standup", "neutral"),
        ("Pair day 1", "two figures\none keyboard\n(code visible)", "neutral"),
        ("Pair day 2", "first PR ships\nedge cases land\nfeedback fast", "happy"),
        ("Iterate", "v0.1 → v0.2\nmerge\ngreen CI", "happy"),
        ("Handover", "written debrief\nlead reads it\nartefacts pinned", "happy"),
    ]
    col_w = 240
    base_x = 80
    for i, day in enumerate(days):
        x = base_x + i * (col_w + 20)
        out.append(rough_rect(rng, x, 130, col_w, 460, width=1.6, fill=INK_MUTED, fill_opacity=0.03))
        out.append(label(x + col_w / 2, 156, day, size=15, weight=700, anchor="middle"))
        title, blurb, mood = activities[i]
        out.append(label(x + col_w / 2, 180, title, size=14, weight=600, anchor="middle", fill=EMERALD if mood == "happy" else INK))
        # Two figures pair-programming
        if "Pair" in title:
            out.append(sketch_person(rng, x + col_w / 2 - 30, 260, mood="neutral", scale=0.9))
            out.append(sketch_person(rng, x + col_w / 2 + 30, 260, mood="happy", scale=0.9))
            out.append(sketch_laptop(rng, x + col_w / 2 - 35, 320, w=70, mood="calm"))
        elif title == "Arrival":
            out.append(sketch_person(rng, x + col_w / 2, 260, mood="neutral", scale=1.0))
            out.append(sketch_speech_bubble(rng, x + 30, 320, col_w - 60, 60, ["reading CLAUDE.md..."]))
        elif title == "Iterate":
            out.append(sketch_laptop(rng, x + col_w / 2 - 50, 220, w=100, mood="calm"))
            out.append(label(x + col_w / 2, 330, "v0.1 → v0.2", size=16, weight=600, anchor="middle", fill=EMERALD))
            out.append(rough_check(rng, x + col_w / 2, 380, 14))
        else:  # Handover
            out.append(sketch_person(rng, x + col_w / 2 - 30, 260, mood="happy", scale=0.9))
            out.append(sketch_person(rng, x + col_w / 2 + 30, 260, mood="happy", scale=0.9))
            out.append(sketch_speech_bubble(rng, x + 25, 320, col_w - 50, 60, ["debrief.md pinned"]))
        # Bottom blurb
        for j, line in enumerate(blurb.split("\n")):
            out.append(label(x + col_w / 2, 460 + j * 18, line, size=12, anchor="middle", fill=INK_MUTED))

    # Failure-shape band
    out.append(rough_rect(rng, 100, 610, 1200, 50, width=1.4, fill=RED, fill_opacity=0.05))
    out.append(label(125, 640, "Common failures:", size=13, weight=700, fill=RED))
    out.append(label(310, 640, "✕ advice-only embed", size=13))
    out.append(label(560, 640, "✕ no time-box", size=13))
    out.append(label(770, 640, "✕ no written debrief", size=13))
    out.append(label(1020, 640, "✕ ship-for-not-with", size=13))

    out.append(footer())
    return "\n  ".join(out)


def diagram_inbox_triage() -> str:
    rng = random.Random(SEED + 5)
    W, H = 1200, 700
    out = [header(W, H, "Inbox triage  —  before / after", "Same emails. Same morning. Different shape.")]

    # Before panel
    out.append(label(280, 124, "BEFORE", size=20, weight=700, anchor="middle", fill=AMBER))
    out.append(rough_rect(rng, 80, 140, 400, 480, width=1.6, fill=AMBER, fill_opacity=0.05))

    # A stack of nondescript emails
    for i in range(10):
        y = 170 + i * 28
        out.append(rough_line(rng, 110, y, 380, y, width=1.2, wobble_amount=0.8, stroke=INK_MUTED, passes=1))
        out.append(rough_line(rng, 110, y + 8, 320, y + 8, width=1.0, wobble_amount=0.5, stroke=INK_MUTED, passes=1))
    out.append(label(280, 470, "...197 more unread", size=12, anchor="middle", fill=INK_MUTED))

    # Stressed builder + clock
    out.append(sketch_person(rng, 200, 540, mood="stressed", scale=1.0))
    out.append(sketch_speech_bubble(rng, 240, 510, 200, 60, ["\"where do I even start\""]))

    # Arrow + recipe label
    out.append(rough_arrow(rng, 490, 380, 710, 380, width=2.4, head=18))
    out.append(label(600, 348, "daily triage prompt", size=14, weight=600, anchor="middle"))
    out.append(label(600, 368, "+ connector", size=13, fill=INK_MUTED, anchor="middle"))
    out.append(label(600, 408, "(runs at 7:30am)", size=12, fill=INK_MUTED, anchor="middle"))

    # After panel
    out.append(label(900, 124, "AFTER", size=20, weight=700, anchor="middle", fill=EMERALD))
    out.append(rough_rect(rng, 720, 140, 400, 480, width=1.6, fill=EMERALD, fill_opacity=0.05))

    buckets = [
        ("ACTS_ON_ME", "4 items — read these first", EMERALD),
        ("FYI", "12 items — batch later", INK),
        ("ROUTES", "6 items — forward + go", AMBER),
        ("AUTO_ARCHIVE", "175 items — already gone", INK_MUTED),
    ]
    for i, (name, sub, colour) in enumerate(buckets):
        y = 170 + i * 78
        out.append(rough_rect(rng, 750, y, 340, 64, width=1.6, fill=colour, fill_opacity=0.08))
        out.append(label(770, y + 25, name, size=14, weight=700, fill=colour))
        out.append(label(770, y + 48, sub, size=12, fill=INK))

    out.append(sketch_person(rng, 1040, 540, mood="happy", scale=1.0))
    out.append(sketch_speech_bubble(rng, 760, 510, 240, 60, ["\"15 minutes for the four\""]))

    # Bottom takeaway
    out.append(label(600, 670, "≈ 15 minutes saved per workday — the cost of a triage agent that runs while you sleep.", size=16, weight=600, anchor="middle"))

    out.append(footer())
    return "\n  ".join(out)


def diagram_white_belt_journey() -> str:
    rng = random.Random(SEED + 6)
    W, H = 1300, 680
    out = [header(W, H, "White Belt  —  the first-day map", "Setup script → verify → likely YELLOW → one-line fix → GREEN.")]

    # Path: laptop -> setup -> verify -> branch (3 detour bubbles) -> green
    y = 380
    out.append(rough_line(rng, 110, y, 1190, y, width=2.4, wobble_amount=1.0))

    stations = [
        (160, "fresh\nlaptop", "neutral"),
        (380, "run setup\nscript", "neutral"),
        (640, "setup-verify\nfirst run", "stressed"),
        (920, "fix\n(one line)", "neutral"),
        (1170, "GREEN\nQuest W-0", "happy"),
    ]
    for (cx, name, mood) in stations:
        out.append(rough_circle(rng, cx, y, 14, width=2.0, fill="#FFFFFF"))
        # Person
        out.append(sketch_person(rng, cx, y - 130, mood=mood, scale=0.9))
        # Name above
        for i, line in enumerate(name.split("\n")):
            out.append(label(cx, y - 200 + i * 18, line, size=13, weight=600, anchor="middle"))

    # Connect with thicker arrows between stations
    for (a, b) in [(160, 380), (380, 640), (640, 920), (920, 1170)]:
        out.append(rough_arrow(rng, a + 22, y, b - 22, y, width=2.0, head=14))

    # Detour bubbles above the verify station
    detours = [
        (640, "cert not trusted", "trust the cert\nin Keychain"),
        (640, "checksum mismatch", "re-download the\nplugin from registry"),
        (640, "stale Vertex env", "remove Vertex\nenv vars"),
    ]
    for i, (anchor_x, problem, fix) in enumerate(detours):
        bx = anchor_x - 280 + i * 200
        by = 460
        out.append(rough_rect(rng, bx, by, 200, 80, width=1.4, fill=RED, fill_opacity=0.06))
        out.append(label(bx + 100, by + 22, problem, size=13, weight=700, anchor="middle", fill=RED))
        for j, line in enumerate(fix.split("\n")):
            out.append(label(bx + 100, by + 42 + j * 16, line, size=12, anchor="middle"))
        # Connector from verify station
        out.append(rough_line(rng, anchor_x, y + 14, bx + 100, by, width=1.4, passes=1, wobble_amount=1.0, stroke=INK_MUTED))

    # Speech bubble at the end
    out.append(sketch_speech_bubble(rng, 1010, 220, 260, 80, ["if YELLOW or RED after an hour,", "post in the channel", "— detours are normal"]))

    # Bottom takeaway
    out.append(label(W / 2, 640, "The detours are part of the map, not a failure of yours.", size=16, weight=600, anchor="middle"))

    out.append(footer())
    return "\n  ".join(out)


def diagram_rfc_anti_patterns() -> str:
    rng = random.Random(SEED + 7)
    W, H = 1100, 760
    out = [header(W, H, "RFC anti-patterns", "Four shapes that look like RFCs and don't merge as ones.")]

    cells = [
        ("Recommendation-first writing",
         "the answer is at the top.\nthe problem is at the bottom\nin tiny text.\n\n(reviewers don't know what\nthey are agreeing to.)"),
        ("Strawman options",
         "Option A: the answer.\nOption B: obviously bad.\nOption C: also obviously bad.\n\n(this isn't options. this is a\ndecision dressed as one.)"),
        ("No success metric",
         "## Success criteria\n\n‘we'll know it worked.’\n\n(if you can't measure it,\nyou can't review it.)"),
        ("No rollback plan",
         "## Rollback\n\n(section is empty.)\n\n(if it fails in prod, the\nplan is panic.)"),
    ]

    cell_w, cell_h = 460, 270
    gap = 40
    x0 = (W - 2 * cell_w - gap) / 2
    y0 = 130

    for idx, (title, body) in enumerate(cells):
        col = idx % 2
        row = idx // 2
        x = x0 + col * (cell_w + gap)
        y = y0 + row * (cell_h + gap)
        out.append(rough_rect(rng, x, y, cell_w, cell_h, width=1.8, fill=RED, fill_opacity=0.04))
        # Title
        out.append(label(x + 24, y + 32, title, size=18, weight=700, fill=RED))
        # Cross indicator
        out.append(rough_cross(rng, x + cell_w - 36, y + 36, 20))
        # Body lines
        for i, line in enumerate(body.split("\n")):
            out.append(label(x + 24, y + 80 + i * 22, line, size=13))

    # Bottom takeaway
    out.append(rough_line(rng, 120, 700, 980, 700, width=1.2, passes=1, wobble_amount=0.8, stroke=INK_MUTED))
    out.append(label(W / 2, 738, "An RFC merges when reviewers can name what would change and how to measure it.", size=15, weight=600, anchor="middle"))

    out.append(footer())
    return "\n  ".join(out)


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------


DIAGRAMS = [
    ("origin-story-bd1-vs-bd2.svg", diagram_origin_story),
    ("boss-fight-bb-month-timeline.svg", diagram_boss_fight_bb),
    ("office-hours-60-minute-session.svg", diagram_office_hours),
    ("embedded-sprint-one-week.svg", diagram_embedded_sprint),
    ("inbox-triage-before-after.svg", diagram_inbox_triage),
    ("white-belt-turn-green-journey.svg", diagram_white_belt_journey),
    ("rfc-anti-patterns.svg", diagram_rfc_anti_patterns),
]


def main() -> None:
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    for filename, fn in DIAGRAMS:
        path = os.path.join(OUTPUT_DIR, filename)
        svg = fn()
        with open(path, "w") as fh:
            fh.write(svg)
        print(f"  wrote {filename}")
    print(f"\nGenerated {len(DIAGRAMS)} hand-drawn-style SVGs in {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
