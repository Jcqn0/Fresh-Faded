# frontend-design-complete

A production-grade frontend design skill for Claude. It steers Claude toward distinctive, non-generic interfaces (anti "AI slop"), with deep guidance on mobile-first layout, modern CSS, performance (Core Web Vitals), dark mode & theming, AI-era UI patterns, data viz, accessibility, forms, i18n, design tokens, and more.

## What's in here

```
frontend-design-complete/
├── SKILL.md            # Lean entry point: always-on aesthetic core (Part 1) + a routing table
└── references/         # Deep, topic-specific guidance — loaded on demand
    ├── mobile-and-responsive.md
    ├── forms.md
    ├── color-and-contrast.md
    ├── foundations-and-principles.md
    ├── layout-and-spacing.md
    ├── typography.md
    ├── modern-css.md
    ├── performance.md
    ├── dark-mode-and-tokens.md
    ├── motion-and-interaction.md
    ├── ai-era-patterns.md
    ├── data-visualization.md
    ├── components.md
    ├── accessibility.md
    ├── brutalism.md
    ├── resources.md
    └── extended-checklist.md
```

`SKILL.md` keeps the always-relevant aesthetic direction inline and points to the right reference file for whatever you're building — so Claude only pulls in the detail it needs (progressive disclosure) instead of loading ~17k words every time.

## How to install

**Claude Code / Claude Cowork (local skills):** copy or clone this whole folder into your skills directory:

```bash
cp -R frontend-design-complete ~/.claude/skills/
```

Then invoke it with `/frontend-design-complete`, or just ask for frontend design help — Claude will pick it up from the `description`.

**Claude.ai / Cowork (uploaded skill):** zip this folder (keeping `SKILL.md` at the root of the zip alongside `references/`) and upload it as a skill.

## Notes

- Fully self-contained — no external file dependencies. Every link inside is either a public URL or a relative pointer to a file in `references/`.
- The reference files preserve the original numbered "Part 1–31" section headings, so any cross-reference like "see Part 20" resolves to that part inside the matching reference file.

Version 4.0
