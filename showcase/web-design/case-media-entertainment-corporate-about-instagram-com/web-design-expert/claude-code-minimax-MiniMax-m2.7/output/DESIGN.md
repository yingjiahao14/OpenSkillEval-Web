# SnapFrame Corporate Landing Page — Design Specification

## Brand Identity

**Platform**: SnapFrame — social media photo/video sharing
**Audience**: General consumers, creators, parents, businesses
**Tone**: Modern, bold, playful

## Color Palette (OKLCH)

| Role | Color | Usage |
|------|-------|-------|
| Background | `oklch(98% 0.01 265)` | Page background, near-white |
| Surface | `oklch(100% 0 0)` | Cards, elevated surfaces |
| Primary Black | `oklch(15% 0.02 265)` | Text, headers |
| Accent Purple | `oklch(55% 0.25 290)` | CTAs, highlights, brand energy |
| Accent Orange | `oklch(70% 0.20 45)` | Secondary accent, warmth |
| Muted Text | `oklch(50% 0.02 265)` | Secondary text, dates |
| Safety Accent | `oklch(75% 0.08 160)` | Safety section — softer green-teal |
| Creator Accent | `oklch(60% 0.22 320)` | Creator section — magenta vibrancy |

## Typography

**Primary Font**: Inter (Google Fonts)
- Headlines: 700 weight, tracking -0.02em
- Body: 400/500 weight, 1.5 line-height
- Links: 500 weight, underline on hover

**Scale**:
- Hero: 56px / 64px mobile: 36px
- Section headlines: 36px desktop / 28px mobile
- Body: 18px
- Small/meta: 14px

## Layout

- Max-width: 1200px centered
- Section padding: 80px vertical desktop, 48px mobile
- Grid: 12-column with 24px gutters
- Border radius: 16px cards, 24px large elements, 8px small

## Sections

1. **Header**: Sticky, transparent → solid on scroll. Logo left, "Log in" right, hamburger mobile.
2. **Hero**: Full-viewport, gradient overlay on background image. Headline + CTA centered.
3. **Features**: 2-column on desktop, gradient purple accent on left card.
4. **Safety**: Soft teal accent, centered layout, trust-focused imagery.
5. **Creators**: Magenta gradient accent, asymmetric layout, aspirational tone.
6. **Tagline Banner**: Full-width gradient bar (purple → orange), white text.
7. **News Carousel**: Horizontal scroll, 4 cards visible on desktop, touch-swipe on mobile. Cards have thumbnail, category tags, title, date.
8. **CTA Download**: Dark section (near-black), centered, two app store buttons.
9. **Footer**: 6-column grid, dense navigation, social icons, legal row.

## Interactions

- **Hamburger**: Click opens full-screen overlay with nav links
- **News Carousel**: Horizontal scroll, mouse-drag on desktop, touch-swipe on mobile
- **Hover States**: Buttons scale 1.02, links underline, cards lift with shadow

## Accessibility

- Minimum 4.5:1 contrast ratio
- Focus-visible outlines
- Semantic HTML5 elements
- ARIA labels on interactive elements