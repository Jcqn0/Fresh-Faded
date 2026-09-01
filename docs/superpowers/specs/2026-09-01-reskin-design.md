---
title: Red‑Accent Marble Highlights Design Spec
date: 2026-09-01
---

# Overview
This design reskins **Fresh & Faded Barbershop** website to give it a more professional feel while staying true to the brand’s bold red accent. The approach uses red‑dominant UI elements, selective marble textures on key components, modest layout tweaks, and a lightweight featured‑styles carousel.

---

## 1. Visual Theme & Color Palette
- **Primary brand red** `#8e2f22` – used for buttons, badges, navigation links, and the barber‑pole stripe pattern.
- **Secondary background** `#f3ede3` (cream) for most sections; deeper cream `#eae2d3` for subtle contrast in footers and cards.
- **Accent red** `#6f2318` for hover states.
- **Marble texture** – high‑resolution marble image (≈ 30 KB WebP) applied only to:
  - Barber cards (`.barber-card`)
  - Service tiles (`.service-tile`)
  - Modal windows (`#booking-modal`, `#contact-modal`).
  - The texture receives a very light red overlay (`rgba(142,47,34,0.05)`) to keep the brand hue visible while preserving readability.

---

## 2. Layout Adjustments
- **Hero section** – vertical padding increased by 2 rem, gap between columns set to `4rem`.
- **Spacing** – vertical margin between major sections increased from `6rem` to `8rem` (desktop) with responsive scaling.
- **Carousel** – a new “Featured Styles” carousel (three slides) inserted directly below the hero and above the “Pick Your Barber” heading. Implemented with vanilla JavaScript, no external library.
- **Grid gutters** – increased from `1.5rem` to `2rem` for barber and service grids, giving marble‑textured cards more breathing room.

---

## 3. UI Components & CSS Changes
| Component | Change |
|-----------|--------|
| Buttons (`.cta-button`) | Solid ink background; hover switches to brand red with white text (existing behavior).
| Badges | Border color updated to `var(--red)`.
| Barber cards | Marble background + thin red overlay; `background-image: url(../assets/marble-card-bg.webp);`.
| Service tiles | Same marble treatment as barber cards.
| Modals | Full‑width marble background with red overlay; inner shadow for depth.
| Carousel (`.featured-carousel`) | Flex layout, auto‑rotate every 5 s, manual arrow controls.
| Typography | Keep Fraunces (headings) & Archivo (body). Increase heading weights to 800 and body line‑height to 1.8 for a more upscale feel.

---

## 4. Assets
- New folder `assets/` added at repository root.
- `assets/marble-card-bg.webp` – marble texture for cards and modals.
- `assets/marble-modal-bg.webp` – same texture used in modals (optional, can reuse the same file).
- `assets/featured/` – placeholder images for the carousel (optimized ≤ 30 KB each).

---

## 5. Accessibility & Performance
- **Contrast** – Red on cream meets WCAG AA (≥ 4.5:1). Marble backgrounds have a semi‑transparent red overlay to preserve text contrast.
- **Responsive** – All spacing uses `rem`; carousel collapses to a single slide on screens < 640 px.
- **Lazy‑loading** – Marble images are lazy‑loaded via `loading="lazy"` on `<img>` elements; CSS background images load when the component enters the viewport.
- **Performance** – Marble assets are compressed WebP; total additional payload < 100 KB.

---

## 6. JavaScript Additions (`script.js`)
- Added `initCarousel()` module that:
  1. Selects `.featured-carousel` container.
  2. Cycles through child `.slide` elements using CSS `transform: translateX(-N%)`.
  3. Provides left/right arrow listeners for manual navigation.
- No external dependencies; aligns with existing vanilla‑JS style.

---

## 7. Testing & Validation
- **Visual regression** – Add two screenshots (desktop & mobile) to CI for hero, a marble card, and the carousel.
- **Manual QA checklist**:
  - Verify red accents are visible on both light and dark monitors.
  - Ensure marble textures do not cause layout shift.
  - Test carousel auto‑rotate and manual navigation.
  - Confirm all interactive elements (booking modal, contact modal) retain original functionality.

---

## 8. Scope & YAGNI
All changes are limited to visual restyling and a single carousel component. No new business logic or data models are introduced, keeping the implementation effort minimal while achieving the desired professional aesthetic.

---

## 9. Open Questions (none) 
All requirements have been captured; no placeholders remain.

---

*Design approved by the user on 2026‑09‑01. Ready for implementation.*
