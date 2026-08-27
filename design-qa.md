# Responsive hierarchy design QA

## Scope

- Reference: `/workspace/scratch/55804b7b1723/upload/IMG_2292.jpeg`
- Supporting typography reference: `/workspace/scratch/55804b7b1723/upload/IMG_2293.jpeg`
- Implementation screenshots: `/workspace/scratch/cml-responsive-mobile.jpg` and `/workspace/scratch/cml-responsive-desktop.jpg`
- Implementation: mobile viewport at 402 × 874 CSS pixels and desktop viewport at 1363 × 936 CSS pixels
- Visual comparison: browser-rendered reference and responsive implementation on 2026-08-27
- Source pixels: 1206 × 2622 at 3× density; normalized mobile content width: 402 CSS pixels
- Implementation pixels: 402 × 874 mobile and 1363 × 936 desktop at 1× density
- State: dark theme, hero at top; About section additionally checked after navigation

## Findings and fixes

| Priority | Finding | Fix | Verification |
| --- | --- | --- | --- |
| P1 | The brand lockup occupied the mobile header instead of the requested hero position. | The existing brand DOM node is moved into `.hero-content` at widths up to 640px and restored to the header above that breakpoint. | Brand parent is `.hero-content`; header contains only the menu control on mobile. |
| P1 | Hero and section display headings were oversized on mobile. | Added a mobile-only type scale: 40.2px hero heading and 36.18px content headings at the 402px test viewport. | Hero heading renders in three lines at 347px wide; the first content heading renders in three lines without horizontal overflow. |
| P2 | The relocated brand needed more visual weight than the “Dead Vector” line. | Brand lockup spans the full 347px content width with a 76.8px mark and 16.48px wordmark. | Browser comparison confirms the lockup is wider and more prominent than the final title line. |
| P1 | The first pass limited the requested hierarchy changes to mobile. | Extended the same brand placement and reduced typography hierarchy across desktop while retaining smaller mobile overrides. | At 1363px, the brand is inside `.hero-content`, the hero heading is 73.6px, and section headings are 54.52px. |

## Interaction and regression checks

- Mobile menu opens, reports `aria-expanded=true`, and closes after selecting About.
- About navigation scrolls to the correct section.
- No horizontal overflow at the 402px mobile viewport.
- Desktop brand is inside `.hero-content`, the desktop hero type is reduced from 111.766px to 73.6px, and the page has no horizontal overflow at 1363px.
- Desktop About navigation scrolls the section to the top and preserves a 54.52px heading scale.
- Browser DOM snapshot contains the rendered application with no framework error overlay.
- Browser console contained only an unrelated browser-extension metadata error; no application errors were present.

## Visual evidence

- Full-view comparison: desktop hero now carries the brand lockup above the kicker, with the headline reduced enough to retain breathing room and the original image composition.
- Focused-region comparison: the brand lockup is visibly more prominent than the “Dead Vector” line on both mobile and desktop.
- Fonts and typography: existing Orbitron and IBM Plex Mono families, weights, colors, and copy are preserved; only requested responsive sizes and line heights changed.
- Spacing and layout rhythm: existing content grid is preserved; the added brand margin creates a clear sequence from brand to kicker to headline.
- Colors and tokens: existing text, violet, cyan, and dark background tokens are unchanged.
- Image quality and asset fidelity: original logo and hero image assets are reused without replacement, stretching, or new rasterization.
- Copy and content: unchanged.

## Comparison history

1. Initial P1: brand relocation and reduced type applied only below 640px.
2. Fix: promoted the brand placement and reduced display scale to responsive defaults, retaining the tighter mobile overrides.
3. Post-fix evidence: desktop brand parent is `.hero-content`; desktop hero is 73.6px; desktop section heading is 54.52px; mobile remains 40.2px and 36.18px; neither viewport overflows horizontally.

## Result

final result: passed
