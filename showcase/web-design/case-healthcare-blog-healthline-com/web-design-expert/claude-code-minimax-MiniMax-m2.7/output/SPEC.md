# WellSource — Design Specification

## Brand Identity

**Concept**: WebMD meets modern editorial — authoritative yet approachable health media platform. Trust through transparency, warmth through design.

**Visual Direction**: "Clinical Warmth" — the reassuring expertise of a trusted physician's office combined with the inviting layout of a premium lifestyle publication.

## Color Palette (OKLCH)

```css
--brand-primary: oklch(55% 0.14 185);      /* #02838D - Calming teal */
--brand-primary-light: oklch(65% 0.12 185); /* Lighter teal for hovers */
--brand-primary-dark: oklch(45% 0.14 185);  /* Darker teal for depth */
--text-primary: oklch(20% 0.02 0);          /* #231F20 - Near black */
--text-secondary: oklch(45% 0.02 0);        /* Medium gray */
--text-muted: oklch(60% 0.02 0);           /* Light gray */
--bg-primary: oklch(99% 0.005 0);           /* Warm white */
--bg-secondary: oklch(97% 0.008 0);        /* Light warm gray */
--bg-card: oklch(100% 0 0);                /* Pure white cards */
--accent-coral: oklch(70% 0.16 35);        /* Warm coral for CTAs */
--accent-coral-hover: oklch(65% 0.18 35);  /* Darker coral */
--border-light: oklch(90% 0.01 0);          /* Subtle borders */
```

## Typography

**Primary Font**: Inter (Google Fonts) — clean, modern, highly readable
**Fallback**: system-ui, -apple-system, sans-serif

### Scale
- Display: 48px/56px, weight 700
- H1: 36px/44px, weight 700
- H2: 28px/36px, weight 600
- H3: 20px/28px, weight 600
- Body: 16px/26px, weight 400
- Small: 14px/20px, weight 400
- Caption: 12px/16px, weight 500

## Layout System

**Container**: max-width 1280px, padding 24px (mobile) / 48px (desktop)
**Grid**: 12-column with 24px gaps
**Section spacing**: 80px vertical rhythm (desktop), 48px (mobile)

## Design Tokens

- Border radius: 8px (cards), 12px (buttons), 24px (large containers)
- Shadows: `0 2px 8px oklch(0% 0 0 / 0.08)` (subtle), `0 8px 32px oklch(0% 0 0 / 0.12)` (elevated)
- Transitions: 200ms ease-out (default), 300ms ease-out (nav)

## Component Specifications

### Mega-Navigation
- Height: 72px
- Dropdown: Full-width with 2-3 column layouts
- Hover: Dropdown slides down with 200ms ease-out
- Active state: Teal underline indicator

### Credibility Ticker
- Background: brand-primary (teal)
- Text: White, bold, scrolling horizontally
- Animation: Continuous scroll, 30s loop, pause on hover
- Content: Stats separated by decorative diamonds

### Hero Card
- Large featured article with category badge
- Gradient overlay for text legibility
- "30-Day Challenge" badge indicator

### Article Cards
- White background with subtle shadow
- Rounded corners (8px)
- Hover: Lift with shadow increase
- Category label: Colored pill

### Health Topic Carousel
- Circular images (160px diameter)
- Horizontal scroll with arrow navigation
- Snap scrolling on mobile

### Trust Pillars
- 4-column grid (2 on mobile)
- Icon + heading + description format
- Subtle teal accent on icons

### Newsletter CTA
- Full-width with coral accent background
- Large input field with prominent CTA button
- Trust statement below

## Responsive Breakpoints

- Mobile: < 768px (1 column, stacked layouts)
- Tablet: 768px - 1024px (2 columns)
- Desktop: > 1024px (full multi-column layouts)

## Interactions

1. **Nav Dropdown**: Click/touch to toggle, keyboard accessible
2. **Recommended Reads Tabs**: Instant category switch, active tab indicator
3. **Health Topics Carousel**: Arrow buttons + touch swipe, smooth scroll
4. **Newsletter Signup**: Email validation, success state feedback
5. **Trust Stats Ticker**: Auto-scrolling, pauses on hover
