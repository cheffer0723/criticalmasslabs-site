# Mobile hierarchy design QA

## Scope

- Reference: `/workspace/scratch/55804b7b1723/upload/IMG_2292.jpeg`
- Supporting typography reference: `/workspace/scratch/55804b7b1723/upload/IMG_2293.jpeg`
- Implementation: mobile viewport at 402 × 874 CSS pixels
- Visual comparison: browser-rendered side-by-side reference and implementation on 2026-08-27

## Findings and fixes

| Priority | Finding | Fix | Verification |
| --- | --- | --- | --- |
| P1 | The brand lockup occupied the mobile header instead of the requested hero position. | The existing brand DOM node is moved into `.hero-content` at widths up to 640px and restored to the header above that breakpoint. | Brand parent is `.hero-content`; header contains only the menu control on mobile. |
| P1 | Hero and section display headings were oversized on mobile. | Added a mobile-only type scale: 40.2px hero heading and 36.18px content headings at the 402px test viewport. | Hero heading renders in three lines at 347px wide; the first content heading renders in three lines without horizontal overflow. |
| P2 | The relocated brand needed more visual weight than the “Dead Vector” line. | Brand lockup spans the full 347px content width with a 76.8px mark and 16.48px wordmark. | Browser comparison confirms the lockup is wider and more prominent than the final title line. |

## Interaction and regression checks

- Mobile menu opens, reports `aria-expanded=true`, and closes after selecting About.
- About navigation scrolls to the correct section.
- No horizontal overflow at the 402px mobile viewport.
- Desktop brand remains in `.site-header`, the original desktop hero type remains 111.766px, and the page has no horizontal overflow at 1363px.

## Result

Passed. No unresolved P0, P1, or P2 visual issues in the requested scope.
