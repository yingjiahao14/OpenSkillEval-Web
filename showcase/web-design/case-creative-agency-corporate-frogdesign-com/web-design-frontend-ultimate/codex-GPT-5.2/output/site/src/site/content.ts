export type NavItem = { label: string; href: string }

export type HeroSlide = {
  kicker: string
  title: string
  description: string
  ctaLabel: string
  ctaHref: string
  toneTag?: string
}

export type TeamRegionKey = 'north-america' | 'asia' | 'europe' | 'oceania'

export type TeamMember = {
  name: string
  title: string
  office: string
  region: TeamRegionKey
  quote: string
  email?: string
  imageDataUri: string
}

export type WorkProject = {
  client: string
  title: string
  description?: string
  testimonial?: {
    quote: string
    attribution: string
  }
  tag: string
  imageDataUri: string
}

export type InsightItem = {
  type: 'Podcast' | 'Article' | 'Insight Report'
  title: string
  cta: string
  href: string
  imageDataUri: string
}

export type Principle = {
  title: string
  description: string
}

const svgDataUri = (svg: string) =>
  `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`

const cinematicThumb = (seed: string, accent: 'blue' | 'amber') => {
  const a = accent === 'blue' ? '#3B82F6' : '#F59E0B'
  const b = accent === 'blue' ? '#60A5FA' : '#FBBF24'
  const c = '#0A0A0A'
  const d = '#111827'
  return svgDataUri(`
  <svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${c}"/>
        <stop offset="0.55" stop-color="${d}"/>
        <stop offset="1" stop-color="#000"/>
      </linearGradient>
      <radialGradient id="r" cx="30%" cy="25%" r="70%">
        <stop offset="0" stop-color="${a}" stop-opacity="0.32"/>
        <stop offset="0.55" stop-color="${b}" stop-opacity="0.14"/>
        <stop offset="1" stop-color="#000" stop-opacity="0"/>
      </radialGradient>
      <filter id="n">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .12 0"/>
      </filter>
    </defs>
    <rect width="1600" height="1000" fill="url(#g)"/>
    <rect width="1600" height="1000" fill="url(#r)"/>
    <g opacity="0.9">
      <path d="M-80 780 C 280 600, 520 900, 900 720 S 1500 520, 1720 700" fill="none" stroke="${a}" stroke-opacity="0.20" stroke-width="3"/>
      <path d="M-120 650 C 220 540, 560 760, 920 640 S 1520 460, 1760 610" fill="none" stroke="#ffffff" stroke-opacity="0.06" stroke-width="2"/>
      <path d="M-60 880 C 260 700, 580 980, 980 800 S 1540 600, 1700 820" fill="none" stroke="${b}" stroke-opacity="0.10" stroke-width="2"/>
    </g>
    <rect width="1600" height="1000" filter="url(#n)" opacity="0.5"/>
    <text x="64" y="940" fill="#ffffff" fill-opacity="0.22" font-size="28" font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace">${seed}</text>
  </svg>
  `)
}

const portrait = (name: string, accent: 'blue' | 'amber') => {
  const a = accent === 'blue' ? '#3B82F6' : '#F59E0B'
  const b = accent === 'blue' ? '#93C5FD' : '#FCD34D'
  return svgDataUri(`
  <svg xmlns="http://www.w3.org/2000/svg" width="900" height="1100" viewBox="0 0 900 1100">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#0a0a0a"/>
        <stop offset="1" stop-color="#111827"/>
      </linearGradient>
      <radialGradient id="glow" cx="30%" cy="25%" r="70%">
        <stop offset="0" stop-color="${a}" stop-opacity="0.35"/>
        <stop offset="0.65" stop-color="${b}" stop-opacity="0.08"/>
        <stop offset="1" stop-color="#000" stop-opacity="0"/>
      </radialGradient>
      <filter id="n">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .16 0"/>
      </filter>
    </defs>
    <rect width="900" height="1100" fill="url(#bg)"/>
    <rect width="900" height="1100" fill="url(#glow)"/>
    <g transform="translate(0,40)">
      <circle cx="450" cy="390" r="210" fill="#0b0f1a" stroke="#ffffff" stroke-opacity="0.10"/>
      <path d="M280 720 C 340 630, 560 630, 620 720 C 640 750, 650 820, 650 890 C 650 930, 610 960, 560 980 C 500 1005, 400 1005, 340 980 C 290 960, 250 930, 250 890 C 250 820, 260 750, 280 720 Z" fill="#0b1220" stroke="#ffffff" stroke-opacity="0.08"/>
      <circle cx="390" cy="380" r="18" fill="#ffffff" fill-opacity="0.14"/>
      <circle cx="510" cy="380" r="18" fill="#ffffff" fill-opacity="0.14"/>
      <path d="M392 470 C 420 500, 480 500, 508 470" fill="none" stroke="#ffffff" stroke-opacity="0.14" stroke-width="6" stroke-linecap="round"/>
      <path d="M320 300 C 360 230, 420 210, 450 210 C 520 210, 585 250, 615 320 C 650 400, 610 470, 600 500" fill="none" stroke="${a}" stroke-opacity="0.20" stroke-width="10" stroke-linecap="round"/>
    </g>
    <rect width="900" height="1100" filter="url(#n)" opacity="0.55"/>
    <text x="56" y="1020" fill="#ffffff" fill-opacity="0.22" font-size="24" font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace">LEAP / ${name}</text>
  </svg>
  `)
}

export const siteContent = {
  meta: {
    title: 'Leap Studio — Reinvention & Experience Partner',
    description:
      "A global creative agency that challenges the status quo to create transformative experiences that win hearts and move markets in the eco-digital era.",
  },
  navigation: {
    primary: [
      { label: 'Insights', href: '#insights' },
      { label: 'Work', href: '#work' },
      { label: 'Services', href: '#services' },
      { label: 'Culture', href: '#culture' },
      { label: 'Make Your Mark', href: '#make-your-mark' },
      { label: 'Contact Us', href: '#contact' },
    ] satisfies NavItem[],
    languages: [
      { label: 'Global EN', value: 'en-global' },
      { label: 'France FR', value: 'fr-france' },
      { label: 'China CN', value: 'zh-china' },
    ],
  },
  hero: {
    eyebrow: 'Leap Studio · Meridian Consulting Group',
    headline: 'Your reinvention and\nexperience partner',
    subhead:
      'We fuse design, strategy, and technology across 30+ studios worldwide to help enterprise teams lead the eco‑digital era.',
    slides: [
      {
        kicker: 'Futurescape',
        title: 'Synthetic Realities',
        description:
          'Welcome to the Futurescape. Discover trends and insights on the future of human‑AI chemistry.',
        ctaLabel: 'Read the report',
        ctaHref: '#insights',
        toneTag: 'Insight Report',
      },
      {
        kicker: 'Concept Work',
        title: 'Designing Robots for Human Spaces',
        description:
          "Meet ‘Aura,’ a concept from Leap Studio that offers a human‑centered approach to physical AI.",
        ctaLabel: 'Explore the work',
        ctaHref: '#work',
        toneTag: 'Case Study',
      },
      {
        kicker: 'Service Design',
        title: 'Amplifying Clinical Care with AI',
        description:
          'Examining how service design helps experts understand the healthcare ecosystem.',
        ctaLabel: 'Explore now',
        ctaHref: '#insights',
        toneTag: 'Article',
      },
      {
        kicker: 'Leapcast',
        title: 'Design Mind · Ep. 55',
        description:
          'Peter Hallström, Global Head of Design at Lumina Health, discusses design leadership and product evolution.',
        ctaLabel: 'Listen now',
        ctaHref: '#insights',
        toneTag: 'Podcast',
      },
      {
        kicker: 'Research',
        title: 'From Complexity to Clarity',
        description:
          'Dive into new research on how CMOs can reclaim marketing to build competitive edge.',
        ctaLabel: 'Read the report',
        ctaHref: '#insights',
        toneTag: 'Insight Report',
      },
    ] satisfies HeroSlide[],
    slideVisuals: [
      cinematicThumb('FUTURESCAPE / SYNTHETIC REALITIES', 'blue'),
      cinematicThumb('AURA / HUMAN SPACES', 'amber'),
      cinematicThumb('CLINICAL CARE / AI', 'blue'),
      cinematicThumb('LEAPCAST / EP. 55', 'amber'),
      cinematicThumb('CMO / CLARITY', 'blue'),
    ],
  },
  team: {
    title: 'Welcome to the studio',
    subtitle: 'Meet the team making an impact for leading brands around the globe.',
    regions: [
      { key: 'north-america', label: 'North America' },
      { key: 'asia', label: 'Asia' },
      { key: 'europe', label: 'Europe' },
      { key: 'oceania', label: 'Oceania' },
    ] as const,
    members: [
      {
        name: 'Denice Alvarez',
        title: 'Office Manager',
        office: 'New York',
        region: 'north-america',
        quote:
          'As the Office Manager, I engage with teams from every discipline, and have learned so much through my day-to-day interactions with my fellow leapers.',
        imageDataUri: portrait('Denice Alvarez', 'amber'),
      },
      {
        name: 'Marco Bellini',
        title: 'Design Director',
        office: 'San Francisco',
        region: 'north-america',
        quote:
          'Every day we are delighted by the immense beauty that nature holds. When engaged in the act of creation, it is our responsibility to channel that delight into the things we make.',
        imageDataUri: portrait('Marco Bellini', 'blue'),
      },
      {
        name: 'Priya Mehta',
        title: 'Studio Head',
        office: 'Bangalore',
        region: 'asia',
        quote:
          'We bring your brand vision to life, with transformative ideas and impactful marketing campaigns fueled by creativity and enthusiasm.',
        imageDataUri: portrait('Priya Mehta', 'amber'),
      },
      {
        name: 'Thierry Lam',
        title: 'Design Lead',
        office: 'Singapore',
        region: 'asia',
        quote:
          'Good design is multifaceted. It impacts functionality, aesthetics, strategy, environment, business and so much more. Great design is seamless.',
        imageDataUri: portrait('Thierry Lam', 'blue'),
      },
      {
        name: 'Gavin Hartley',
        title: 'Managing Director',
        office: 'London',
        region: 'europe',
        quote:
          'It’s my job to make sure we innovate and push the boundaries when collaborating with brands to create inspiring customer experiences that deliver great business results.',
        imageDataUri: portrait('Gavin Hartley', 'amber'),
      },
      {
        name: 'Francesca Terzi',
        title: 'Design Director',
        office: 'Munich',
        region: 'europe',
        quote:
          'At Leap Studio, I am constantly amazed by the talent I am surrounded with. We love to dream big and bring those dreams to life.',
        imageDataUri: portrait('Francesca Terzi', 'blue'),
      },
      {
        name: 'Jacintha Soo Ho',
        title: 'Senior Manager, CX Transformation',
        office: 'Melbourne',
        region: 'oceania',
        quote:
          "I love helping clients see beyond their assumptions and showing them opportunities they haven't thought of before.",
        imageDataUri: portrait('Jacintha Soo Ho', 'amber'),
      },
    ] satisfies TeamMember[],
  },
  work: {
    title: 'Our work',
    subtitle:
      'Reinvent your business and realize exceptional experiences that win hearts and move markets.',
    projects: [
      {
        client: 'Unilever',
        title: 'Creating Consumer Insights at Scale',
        description: 'Enterprise insight systems that connect data to decisions.',
        testimonial: {
          quote:
            'The PDC provides insight not only to marketing, but also to supply chain, R&D, HR and finance. Thanks to the collaboration with Leap Studio we now have the capability to provide insight and action all across the organisation.',
          attribution:
            'Alex Owens, VP, Global Head of People Data Centres, Unilever',
        },
        tag: 'Insight Platform',
        imageDataUri: cinematicThumb('UNILEVER / INSIGHTS AT SCALE', 'blue'),
      },
      {
        client: 'IKEA Retail (Ingka Group)',
        title: 'Deepening Customer Engagement',
        description: 'Experience strategy and design that turns visits into relationships.',
        tag: 'CX',
        imageDataUri: cinematicThumb('IKEA / ENGAGEMENT', 'amber'),
      },
      {
        client: 'Volvo Group',
        title: 'Harnessing Data for Leaner and Greener Future of Mobility',
        description: 'Data products that enable efficiency and sustainability at scale.',
        tag: 'Data + Sustainability',
        imageDataUri: cinematicThumb('VOLVO / GREENER MOBILITY', 'blue'),
      },
      {
        client: 'Chase Payment Solutions',
        title: 'Modernizing the Point-of-Sale Experience',
        description: 'Service design and systems thinking for frontline retail.',
        tag: 'Service Design',
        imageDataUri: cinematicThumb('CHASE / POS EXPERIENCE', 'amber'),
      },
      {
        client: 'Tiffany & Co.',
        title: 'Reimagining Luxury Craftsmanship',
        description: 'Heritage-driven interaction design, powered by new AI workflows.',
        testimonial: {
          quote:
            'We valued the truly collaborative process from conception to delivery. The resulting experience beautifully emphasizes our core brand codes of craftsmanship and heritage, while effectively leveraging new AI technologies.',
          attribution:
            'Thomas Arnold, Digital Experience Design & Innovation Director',
        },
        tag: 'Luxury + AI',
        imageDataUri: cinematicThumb('TIFFANY / CRAFT + AI', 'blue'),
      },
      {
        client: 'Majid Al Futtaim / Carrefour',
        title: 'Helping Healthier Habits Stick',
        description: 'Behavior design frameworks that scale across markets.',
        testimonial: {
          quote:
            "Our 'Pick Your 5' framework, based on your behavior change strategy, is going to be instrumental in driving positive outcomes.",
          attribution: 'Sheila Chaiban, Global CMO',
        },
        tag: 'Behavior Change',
        imageDataUri: cinematicThumb('CARREFOUR / HEALTHIER HABITS', 'amber'),
      },
    ] satisfies WorkProject[],
  },
  ctaBanner: {
    title: "Let's work together",
    body:
      'Reach out to our global team to imagine, make and scale new products, services, experiences, business models, ventures and ways of working.',
    ctaLabel: 'Get in touch',
    ctaHref: '#contact',
  },
  howWeWork: {
    title: 'Advancing people and planet',
    body:
      "The disruptive forces of emerging technologies and sustainable objectives present a reinvention imperative for businesses—and the potential to create entirely new dimensions of value. Navigate the dual transition of the eco-digital era with innovative solutions to today's biggest challenges.",
    ctaLabel: 'Explore our services',
    ctaHref: '#services',
  },
  insights: {
    title: 'Latest insights',
    subtitle:
      'Explore research, provocations and perspectives on trends across technology, creativity, business and culture.',
    items: [
      {
        type: 'Podcast',
        title: 'Ep. 58 — When Human Connection Meets AI',
        cta: 'Listen',
        href: '#insights',
        imageDataUri: cinematicThumb('PODCAST / EP. 58', 'blue'),
      },
      {
        type: 'Podcast',
        title: 'Ep. 57 — Writing the Future of AI',
        cta: 'Listen',
        href: '#insights',
        imageDataUri: cinematicThumb('PODCAST / EP. 57', 'amber'),
      },
      {
        type: 'Article',
        title: 'Amplifying Clinical Care with AI',
        cta: 'Read',
        href: '#insights',
        imageDataUri: cinematicThumb('ARTICLE / CLINICAL CARE', 'blue'),
      },
      {
        type: 'Podcast',
        title: 'Ep. 56 — The Future of Customer Experience',
        cta: 'Listen',
        href: '#insights',
        imageDataUri: cinematicThumb('PODCAST / EP. 56', 'amber'),
      },
      {
        type: 'Article',
        title: 'Next-Gen Contact Centers: Powered by AI',
        cta: 'Read',
        href: '#insights',
        imageDataUri: cinematicThumb('ARTICLE / CONTACT CENTERS', 'blue'),
      },
      {
        type: 'Article',
        title: 'The AI-Empowered Marketer',
        cta: 'Read',
        href: '#insights',
        imageDataUri: cinematicThumb('ARTICLE / AI MARKETER', 'amber'),
      },
      {
        type: 'Podcast',
        title: 'Ep. 55 — What Makes a Product Great?',
        cta: 'Listen',
        href: '#insights',
        imageDataUri: cinematicThumb('PODCAST / EP. 55', 'blue'),
      },
      {
        type: 'Insight Report',
        title: 'From Complexity to Clarity',
        cta: 'Download',
        href: '#insights',
        imageDataUri: cinematicThumb('REPORT / CLARITY', 'amber'),
      },
    ] satisfies InsightItem[],
  },
  principles: {
    title: 'Our principles',
    items: [
      {
        title: 'Challenge the status quo',
        description:
          'From launching game-changing products and services to redefining business as usual, our work bridges the gap between what could be and what should be.',
      },
      {
        title: 'Fuse art & science to make ideas real',
        description:
          'We innovate with equal parts expertise in creativity and transformation, leveraging next-level data and tech to elevate experiences for all.',
      },
      {
        title: 'Create a lasting impact at global scale',
        description:
          'Driving meaningful outcomes starts with reimagining systems at a fundamental level. As part of Meridian Consulting, we bring global reach and diverse skillsets to our approach.',
      },
      {
        title: 'Regenerate systems & communities',
        description:
          'In the eco-digital era, we believe every collaboration is an opportunity to create social, economic and environmental value for all.',
      },
    ] satisfies Principle[],
  },
  footer: {
    ctas: [
      {
        title:
          'Ready to make your mark? As your reinvention and experience partner, our global team is here to help.',
        ctaLabel: 'Get in touch',
        ctaHref: '#contact',
      },
      {
        title: 'Do your best work among a caring community of diverse talents.',
        ctaLabel: 'Join our team',
        ctaHref: '#make-your-mark',
      },
    ],
    links: ['Studios', 'Culture', 'DE&I', 'Play'],
    legal:
      '© 2026 Leap Studio, part of Meridian Consulting Group · Privacy Policy · Terms of Use · Cookie Policy · Cookie Settings',
  },
} as const

