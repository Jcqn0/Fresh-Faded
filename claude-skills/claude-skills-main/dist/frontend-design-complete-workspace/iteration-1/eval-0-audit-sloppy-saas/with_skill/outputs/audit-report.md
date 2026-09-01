# Design Audit — TaskFlow Landing Page

Files reviewed: `index.html`, `styles.css`, `PricingCard.jsx`
Method: source scan (automated slop-signature scan + hex-color census + manual review), scored against a tiered rubric with an intentionality test applied before scoring.

## Verdict

**AI-generated look likelihood: High (score 32 — 5 Tier-1 signals, 8 Tier-2, 1 Tier-3)**

Your cofounder is right. The page reads as the default output that emerges when no design decision was made: cream background + terracotta gradient buttons + Inter + pill shapes + emoji icons is the single most recognizable "AI landing page" combination of 2024–2026. The strongest single tell is that the site is actually *two* AI defaults stitched together — the static page is the warm cream/terracotta template, while `PricingCard.jsx` is the other classic, a purple-to-indigo Tailwind gradient card that shares no colors, geometry, or shadow language with the rest of the site. No human design process produces two unrelated default palettes on one page.

### The intentionality test (why this scores at face value)

Familiar ingredients aren't automatically slop — but a committed aesthetic leaves fingerprints. This page leaves none (0 of 5 criteria met):

- **Font pairing:** one generic sans (Inter, 4 weights) does everything from logo to body — no display/body pairing, no chosen personality (`index.html:8`, `styles.css:8`).
- **Palette point of view:** the CSS is the cream/terracotta comfort zone; the React component is Tailwind purple/indigo. Two default palettes, zero tokens, no `--custom-property` anywhere.
- **Consistent geometry:** radii are 9999px (buttons/badges), 16px (cards/hero image), 24px (CTA), `rounded-2xl`/`rounded-full` (pricing) — "rounded because that's the default", not a system.
- **Context-specific details:** every word of copy could sell any SaaS product (see Evidence). Nothing on the page could only belong to TaskFlow.
- **Deliberate motion:** `transition: all 0.3s ease` is the only motion idea, repeated six times, plus the standard hover-lift.

## Evidence

| Signal | Tier | Where |
|---|---|---|
| Cream/warm off-white backgrounds (`#faf8f5`, `#fdfcfb`, `#fdf6f3`) | 1 | `styles.css:9` (body), `:19` (navbar), `:146` (cards), `:176` (highlight card) |
| Terracotta/coral accent family (`#c45c48` ×6, `#e07860` ×2) | 1 | `styles.css:26, 43, 47, 66, 89, 103` |
| Purple/indigo gradient (`from-purple-500 to-indigo-600`) | 1 | `PricingCard.jsx:6, 31` |
| Generic font as the only face (Inter) | 1 | `index.html:8`, `styles.css:8` |
| Sparkle/rocket emoji branding AI features (✨ logo, 🚀 badge, ✨ "AI-Powered", ✨ "Most Popular") | 1 | `index.html:13, 24, 55`; `PricingCard.jsx:12` |
| Pill-shaped buttons and badges (`border-radius: 9999px`, `rounded-full`) | 2 | `styles.css:51, 69, 105`; `PricingCard.jsx:11, 28` |
| Uniform generous radii (16px/24px/`rounded-2xl`) | 2 | `styles.css:117, 147, 183`; `PricingCard.jsx:4` |
| `transition: all 0.3s ease` as the only motion idea (×6) | 2 | `styles.css:39, 55, 73, 152`; `PricingCard.jsx:4, 28` (`transition-all duration-300`) |
| Card/button hover-lift (`translateY(-Npx)` + bigger soft shadow) | 2 | `styles.css:60, 156`; `PricingCard.jsx:4` (`hover:-translate-y-1 hover:shadow-xl`) |
| Warm accent-tinted shadows (`rgba(196, 92, 72, …)` in every `box-shadow`) | 2 | `styles.css:20, 56, 61, 118, 151, 157` |
| Left-border accent stripe on cards (`border-left: 4px solid #e07860`) | 2 | `styles.css:150` |
| Emoji as feature icons (⚡ 🤝 📊 ✨, ✅ checklist bullets) | 2 | `index.html:40, 45, 50, 55`; `PricingCard.jsx:23` |
| Interchangeable startup copy ("Supercharge Your Workflow", "collaborate seamlessly", "unlock their full potential — all in one intuitive platform", "Everything you need to succeed", "Ready to transform your workflow?") | 2 | `index.html:6, 25, 26, 36, 46, 63` |
| Gradient text on the hero headline (`background-clip: text`) | 2 | `styles.css:89–91` |
| Fixed px font sizes throughout, no fluid scale, no `clamp()`; no dark mode, no `prefers-reduced-motion` | 3 | `styles.css` (14 occurrences, e.g. `:24, 86, 129`) |

Score = (5 × 3) + (8 × 2) + (1 × 1) = **32** → well past the High threshold (9+). Confidence is high because it's the *co-occurrence* that convicts: any one of these appears in intentional human work; all fifteen together do not.

## What's already working

Worth keeping — this is a structure problem, not a rebuild-from-zero problem:

- **Clean, semantic HTML.** Proper `nav`/`header`/`section`/`footer` landmarks, `lang` attribute, viewport meta, alt text on the hero image (`index.html:32`).
- **Sensible information architecture.** Nav → hero → features → CTA → footer is the right skeleton for a landing page; nothing needs to move.
- **Responsive grid basics.** `repeat(auto-fit, minmax(250px, 1fr))` (`styles.css:141`) collapses gracefully; `max-width: 1200px` containers keep line lengths sane.
- **Font loading hygiene.** `preconnect` + `display=swap` on the Google Fonts link (`index.html:7–8`).
- **A reusable pricing component** with a clean props API (`plan, price, features, popular`) — restyling it is a one-file job.

## Recommended direction

TaskFlow is a team workflow/task tool. The current design says "cozy lifestyle app"; the product promise is *throughput and control*. Commit to one of these — both kill every flagged signal by construction:

**Option A — "Operations ledger" (light, Swiss-instrument):** the interface as a precision scheduling instrument.
- **Palette:** paper `#f2f3f5` (cool, not cream), ink `#101318`, hairline `#d4d8de`, one accent: cobalt `#1f3aff` used only for actions and live state. Defined once as CSS custom properties (`--paper`, `--ink`, `--hairline`, `--accent`).
- **Type:** display **Familjen Grotesk** 600 (tight tracking, real character in the a/g) + body/UI **IBM Plex Sans**, with **IBM Plex Mono** for numbers, prices, and metadata labels (`$12/mo`, task counts) — tabular numerals give the "instrument" feel.
- **Geometry rule:** border-radius 0–2px everywhere. Depth from 1px hairline borders, never from shadows. Cards separated by rules, not floating.
- **One motion idea:** a single staggered reveal on page load (headline → subhead → buttons, 80ms steps); hovers change `border-color`/`background-color` only, 120ms. Wrap in `prefers-reduced-motion`.

**Option B — "Control room" (dark):** bg `#0c0f13`, panels `#12161b`, hairlines `#232a31`, accent signal-green `#2fe08c` for status/CTAs, amber only for warnings. Same type system as A. This direction also gives you the dark mode the current site lacks for free.

Either way, the pricing card stops being purple: `popular` gets a 1px accent border + a mono `MOST POPULAR` tag on the top rule — not a gradient fill.

## Fix list

**Quick wins (mechanical swaps, ~1 day):**
1. Replace Inter with the chosen pairing; swap the Google Fonts link and set two `font-family` tokens.
2. Create a token block (`:root { --paper; --ink; --hairline; --accent; }`) and replace every hardcoded hex in `styles.css` and every Tailwind color class in `PricingCard.jsx`. This single step eliminates cream, terracotta, *and* the purple gradient, and forces the two files onto one palette.
3. Kill all gradients: buttons become solid `--accent`; delete the `background-clip: text` hero treatment (`styles.css:89–91`) — the headline in the display face at full contrast is stronger.
4. Set one radius (0–2px) globally; replace all six accent-tinted `box-shadow`s with `border: 1px solid var(--hairline)`; delete `border-left: 4px solid` (`styles.css:150`).
5. Replace every `transition: all 0.3s ease` / `transition-all duration-300` with property-specific 120ms transitions; remove the hover `translateY` lifts.
6. Replace all emoji (✨🚀⚡🤝📊✅❤️) with a consistent SVG line-icon set (e.g. Lucide, 1.5px stroke) sized and colored via the tokens. The ✨-branded "AI" badge especially has to go.

**Deeper changes (identity work, ~2–5 days):**
7. Rewrite the copy to be specific to TaskFlow. "Supercharge Your Workflow with AI" → say what it actually does and for whom, with a real number ("Plan the week's work in 20 minutes, not a Monday"). Feature cards should name concrete capabilities, not "Lightning Fast" / "Seamless Collaboration".
8. Break the centered-everything rhythm: left-align the features section header, let the hero screenshot bleed off the right edge or sit on a ruled panel, and make one feature card double-width. One asymmetric move per section is enough.
9. Replace `dashboard-preview.png` styling (floating rounded screenshot with tinted glow) with a flat, hairline-framed screenshot — and make sure the screenshot itself uses the new palette.
10. Add a fluid type scale (`clamp()` for the 56px/40px/36px headings), `prefers-reduced-motion` support, and — if you pick Option A — a `prefers-color-scheme` dark variant built from the same tokens.

Do items 1–6 and the site stops reading as AI-generated; do 7–10 and it starts reading as designed.
