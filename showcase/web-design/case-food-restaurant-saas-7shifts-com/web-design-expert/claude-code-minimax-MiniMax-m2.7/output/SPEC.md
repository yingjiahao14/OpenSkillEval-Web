# ShiftWise Design Specification

## Brand Identity

### Business Context
- **Primary Goal**: Convert restaurant owners and managers into free trial sign-ups
- **Target Audience**: Restaurant owners, managers, and hospitality teams
- **Core Action**: "Start Your Free Trial" CTA throughout the site
- **Tone**: Professional, modern, bold — clean SaaS aesthetics with hospitality warmth

### Brand Personality
- **Adjectives**: Confident, energetic, reliable, approachable
- **Never**: Cold, corporate, stuffy, generic

## Visual Direction

### Color Palette (OKLCH)

| Role | Color | Hex Approximation |
|------|-------|------------------|
| Primary Navy | `oklch(25% 0.15 265)` | `#1a2744` |
| Primary Blue | `oklch(50% 0.18 265)` | `#3b5bdb` |
| Vibrant Orange Accent | `oklch(70% 0.18 35)` | `#f97316` |
| Success Green | `oklch(65% 0.18 145)` | `#22c55e` |
| Surface White | `oklch(98% 0.01 265)` | `#fafbfc` |
| Text Primary | `oklch(20% 0.02 265)` | `#1e293b` |
| Text Secondary | `oklch(45% 0.02 265)` | `#64748b` |
| Border | `oklch(88% 0.01 265)` | `#e2e8f0` |

### Typography

**Headings**: Inter (Google Fonts) — geometric, modern, bold weights
**Body**: Inter — clean, highly readable
**Fallbacks**: system-ui, -apple-system, sans-serif

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| H1 | 3.5rem | 800 | 1.1 |
| H2 | 2.5rem | 700 | 1.2 |
| H3 | 1.75rem | 600 | 1.3 |
| Body | 1rem | 400 | 1.6 |
| Small | 0.875rem | 400 | 1.5 |

### Layout Philosophy
- **Grid**: 12-column, max-width 1280px, 24px gutters
- **Spacing Scale**: 4px base (4, 8, 12, 16, 24, 32, 48, 64, 96, 128)
- **Border Radius**: 8px (buttons/cards), 12px (sections), 16px (modals)
- **Shadows**: Subtle layered shadows for depth (0 4px 6px -1px rgba)

### Signature Elements
- Bold orange CTA buttons with hover lift effect
- Navy header with white text
- Card-based sections with subtle shadows
- Stats displayed with large bold numbers
- Testimonial cards with quote styling

## Technical Stack
- Pure HTML5, CSS3, Vanilla JavaScript
- No build step required
- Google Fonts (Inter) via CDN
- Responsive breakpoints: 640px, 768px, 1024px, 1280px

## Component States

### Buttons
- **Primary**: Navy bg, white text → Orange bg on hover with 2px lift
- **Secondary**: Transparent, navy border → Navy bg on hover
- **Disabled**: 50% opacity, no pointer events

### Form Inputs
- **Default**: Border `oklch(88% 0.01 265)`, white bg
- **Focus**: Border `oklch(50% 0.18 265)`, subtle shadow
- **Error**: Border red, error message below
- **Success**: Border green, checkmark icon

### Cards
- White background
- 8px border radius
- Subtle shadow on hover
- 24px padding

## Page Specifications

### 1. Home (index.html)
Sections: Header → Hero → Features → How It Works → Testimonials → Stats → Pricing Teaser → CTA → Footer
- Hero: Full-width, navy gradient background
- Stats: Animated count-up numbers
- Testimonials: Carousel with 3 quotes
- CTA: Orange background, high contrast

### 2. Features (features.html)
Sections: Header → Hero → Scheduling → Team Communication → Labor Compliance → Integrations → CTA → Footer
- Feature sections: Alternating image/text layout
- Integration logos in grid

### 3. Pricing (pricing.html)
Sections: Header → Hero → Pricing Table → FAQ → CTA → Footer
- Monthly/Annual billing toggle (20% annual discount)
- 3 tiers: Free, Starter ($29.99/mo), Premium ($69.99/mo)
- FAQ accordion with smooth expand/collapse

### 4. About (about.html)
Sections: Header → Hero → Mission → Team → Stats → CTA → Footer
- Team grid with photos/roles
- Mission statement prominent

### 5. Contact (contact.html)
Sections: Header → Hero → Contact Form → Office Locations → Footer
- Form with validation (name, email, company, locations, message)
- Success confirmation on submit
- Office location cards

## Interactions

| Interaction | Page | Behavior |
|-------------|------|----------|
| Mobile Nav Toggle | All | Hamburger icon → slide-in drawer |
| Testimonial Carousel | Home | Arrow navigation, smooth transitions |
| Pricing Toggle | Pricing | Monthly ↔ Annual, prices update |
| FAQ Accordion | Pricing | Click to expand, others collapse |
| Form Validation | Contact | Required fields, success message |
| Stats Count-up | Home | Animate numbers on scroll into view |

## Accessibility
- Minimum 4.5:1 contrast ratio for all text
- Focus states for keyboard navigation
- ARIA labels for interactive elements
- Semantic HTML throughout
