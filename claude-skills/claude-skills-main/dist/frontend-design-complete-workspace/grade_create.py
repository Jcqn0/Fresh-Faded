#!/usr/bin/env python3
"""Mechanically grade the create-surf-landing eval assertions against an index.html."""
import json
import re
import sys

path = sys.argv[1]
text = open(path, errors="ignore").read()
low = text.lower()


def hexes(t):
    out = []
    for m in re.findall(r"#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b", t):
        h = m.lower()
        if len(h) == 4:
            h = "#" + "".join(c * 2 for c in h[1:])
        out.append(h)
    return out


def rgb(h):
    return int(h[1:3], 16), int(h[3:5], 16), int(h[5:7], 16)


all_hex = hexes(text)
cream = [h for h in all_hex if (lambda r, g, b: r >= 0xF6 and r >= g >= b and 4 <= (r - b) <= 24)(*rgb(h))]
terracotta = [h for h in all_hex if (lambda r, g, b: 0xA0 <= r <= 0xE8 and 0.38 <= g / max(r, 1) <= 0.65 and b < g)(*rgb(h))]

generic_fonts = re.findall(r"font-family[^;}]*(inter|roboto|arial|poppins|space grotesk)", low)
purple_grad = re.findall(r"linear-gradient[^;]*(purple|violet|indigo|#[78][0-9a-f]{5})", low)
trans_all = re.findall(r"transition:\s*all", low)
responsive = bool(re.search(r"@media", low)) or bool(re.search(r"clamp\(", low))
reduced_motion = "prefers-reduced-motion" in low
context = sum(w in low for w in ["ventura", "shaper", "shape", "waitlist", "board"]) >= 3

expectations = [
    {"text": "No generic fonts (Inter, Roboto, Arial, Poppins, Space Grotesk) as display/body face",
     "passed": not generic_fonts,
     "evidence": f"font-family generic matches: {generic_fonts or 'none'}"},
    {"text": "No cream/warm off-white background family and no terracotta/coral accent family",
     "passed": not cream and not terracotta,
     "evidence": f"cream hits: {cream or 'none'}; terracotta hits: {terracotta or 'none'}"},
    {"text": "No purple/indigo gradients",
     "passed": not purple_grad,
     "evidence": f"gradient matches: {purple_grad or 'none'}"},
    {"text": "No 'transition: all' declarations",
     "passed": not trans_all,
     "evidence": f"{len(trans_all)} 'transition: all' occurrences"},
    {"text": "Mobile responsive (media queries and/or fluid clamp() sizing present)",
     "passed": responsive,
     "evidence": "@media: %d, clamp(): %d" % (len(re.findall(r"@media", low)), len(re.findall(r"clamp\(", low)))},
    {"text": "Includes prefers-reduced-motion handling",
     "passed": reduced_motion,
     "evidence": f"prefers-reduced-motion present: {reduced_motion}"},
    {"text": "Context-specific content (shaper/waitlist/Ventura details), not interchangeable startup copy",
     "passed": context,
     "evidence": "context keywords found: " + ", ".join(w for w in ["ventura", "shaper", "shape", "waitlist", "board"] if w in low)},
]

print(json.dumps({"expectations": expectations,
                  "passed": sum(e["passed"] for e in expectations),
                  "total": len(expectations)}, indent=2))
