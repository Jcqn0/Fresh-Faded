# Design Audit — FERMENT (A Journal of Sourdough Baking)

Scope: `index.html` + `styles.css`, audited via automated slop-signature scan (hex census + tiered pattern grep), a manual intentionality review, and rendered verification in a browser at 375px and 1440px.

## Verdict

**AI-generated look likelihood: Low (score 0)**

This does not read as generic or AI-generated — it reads as a designed editorial object with a clear point of view. The single biggest reason: every choice follows one coherent print-journal system (paper white, warm ink, a single deep red, sharp geometry, hairline-vs-heavy rules), and the page is full of details that could only belong to *this* publication. There is nothing here I would rip out before you share it around.

## Evidence

The automated scan found **zero** signature hits across both files. For transparency, here is what was checked and what turned up:

| Signal checked | Tier | Result |
|---|---|---|
| Cream/warm off-white background family | 1 | Not present — background is true white `#ffffff` (`styles.css:2`) |
| Terracotta/coral/rust accent family | 1 | Not present — accent is a deep blood red `#a41f13` (`styles.css:4`), well outside the coral zone |
| Purple/indigo gradients | 1 | None |
| Generic display font (Inter/Roboto/Poppins/Space Grotesk…) | 1 | None — Libre Caslon Text + IBM Plex Mono (`index.html:8`) |
| Sparkle/rocket emoji branding | 1 | None |
| Pill or uniform 12–24px border-radius | 2 | None — zero `border-radius` in the entire stylesheet; geometry is consistently sharp |
| `transition: all`, hover-lift cards, tinted shadows | 2 | None — exactly one transition, `background-color/color 120ms linear` (`styles.css:198–202`) |
| Left-border accent stripe on cards | 2 | The marginalia uses `border-inline-start: 1px solid` (`styles.css:163`) — a hairline column rule in a margin-notes context, not the card-stripe pattern; discounted by the intentionality test |
| Interchangeable startup copy | 2 | None — copy is hyper-specific (baker's math, 7,200 ft, 78% hydration) |
| Raw Tailwind palette / fixed px type / missing a11y prefs | 3 | None — 3-color token palette, `clamp()` fluid type, `prefers-reduced-motion` gate, logical properties throughout |

**Hex census:** `#1a1613` (ink, ×2), `#ffffff` (paper), `#a41f13` (accent). Three colors total, all defined once as tokens (`styles.css:1–8`). That is a palette with a point of view, not a default.

**Intentionality test: passes 5/5**

1. **Specific font pairing** — Libre Caslon Text (a bookish text serif, italic used deliberately for deck/subtitle) against IBM Plex Mono for all metadata (issue marker, kickers, page numbers, marginalia, the CTA). The serif/mono split maps cleanly onto "editorial voice vs. apparatus."
2. **Palette with a point of view** — three precise values via CSS variables; the red is used sparingly and consistently (TOC numerals, kickers, drop cap, link states).
3. **Consistent geometry** — one system throughout: zero radii, hairline 1px rules for interior structure, heavy 6px rules bracketing masthead and colophon (`styles.css:28`, `styles.css:175`). Nothing is rounded "because that's the default."
4. **Context-specific details** — a drop cap via `::first-letter` (`styles.css:137–143`), a baker's-math marginalia note with a `※` reference mark, TOC entries with printed page numbers ("p. 04"), an issue marker ("No. 14 — Winter 2026"), and a colophon that names its own typefaces. This is the opposite of interchangeable.
5. **Deliberate motion** — a single 120ms linear transition on the "Continue reading" button, correctly wrapped in `@media (prefers-reduced-motion: no-preference)`.

## What's already working

- **The identity is memorable.** The oversized clamped masthead (`clamp(4rem, 14vw, 10rem)`, tight tracking, 0.9 line-height) between heavy rules reads unmistakably as a print journal, and it holds up at both 1440px and 375px in the rendered check.
- **Craft-level typography.** 62ch measure token, italic decks, fluid type via `clamp()`, mono metadata at a consistent 0.8125rem with letterspacing — the type system is doing the design work.
- **Excellent contrast.** Ink `#1a1613` on white is ~17.5:1; the red accent `#a41f13` on white is ~7.5:1 (passes WCAG AAA for normal text). Hover/focus states change color *and* add a border, so they don't rely on color alone.
- **Responsible modern CSS.** Logical properties (`margin-inline`, `border-inline-start`, `padding-block`), `focus-visible` styles paired with every hover, reduced-motion gating, and a sensible single-breakpoint collapse where the marginalia converts from a side column to a ruled footnote block (`styles.css:185–196`) — confirmed working in the 375px render.

The intentionality test passes decisively, so the familiar ingredients here (a serif, a red accent, white background) count as editorial vocabulary, not defaults.

## Recommended direction

None needed — the direction is already committed and executed. Do not redesign this. The items below are pre-share polish, not aesthetic fixes.

## Fix list

Quick wins before you share it:

1. **Wire up the placeholder links.** "Continue reading," "Subscribe," and "Back issues" all point to `#` (`index.html:37`, `index.html:46`). Dead links will be the first thing reviewers click.
2. **Add a favicon.** The browser check logged a 404 for it — a small `※` or "F" mark in the ink/red palette would extend the identity into the tab.
3. **Add social/meta tags.** Since the goal is sharing it around: a `<meta name="description">` and Open Graph title/description/image so the masthead (not a blank card) shows up in link previews.

Deeper (optional, only if you keep building on this):

4. **Guard the TOC grid at very narrow widths.** `grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr))` (`styles.css:70`) can force horizontal overflow below ~320px viewports. `minmax(min(18rem, 100%), 1fr)` removes the risk with no visual change.
5. **Masthead headroom on small phones.** At 375px the `4rem` clamp floor makes "FERMENT" fill the measure almost exactly (verified in render — it fits). On sub-360px devices it may clip; a slightly lower floor (`clamp(3.25rem, 14vw, 10rem)`) keeps the full-bleed feel with a safety margin.
6. **Consider `font-display` / self-hosting the fonts.** Google Fonts with `display=swap` is fine, but self-hosting Libre Caslon Text and Plex Mono would remove third-party requests and the brief fallback-serif flash on first load — worth it for a site whose entire identity is typographic.
