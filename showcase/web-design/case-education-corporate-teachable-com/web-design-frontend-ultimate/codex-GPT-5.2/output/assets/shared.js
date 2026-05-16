const SITE = {
  name: 'LearnForge',
  tagline: 'Build. Sell. Teach. Scale.',
  cta: 'Start Free Trial',
  trialNote: '7-day free trial · plans from $29/mo',
  nav: [
    { label: 'Online Courses', href: 'online-courses.html', id: 'online-courses' },
    { label: 'Digital Downloads', href: 'digital-downloads.html', id: 'digital-downloads' },
    { label: 'Memberships', href: 'memberships.html', id: 'memberships' },
    { label: 'Coaching', href: 'coaching.html', id: 'coaching' },
  ],
  integrations: [
    'Stripe',
    'Zapier',
    'Google Analytics',
    'Mailchimp',
    'PayPal',
    'Calendly',
    'Google Tag Manager',
    'Zoom',
    'Segment',
    'Meta',
    'HotJar',
    'Dropbox',
  ],
  testimonials: [
    {
      quote:
        'With students from 188 countries, tax compliance could have been a nightmare. LearnForge handles it all, so we can focus on helping members upgrade their data skills.',
      title: 'Global Reach',
      name: 'Leila G.',
      org: 'XelPlus Academy',
    },
    {
      quote:
        'You should never have anyone dictating the prices you charge. With LearnForge, you get full control—you can build real relationships instead of going through third parties.',
      title: 'Full Control',
      name: 'Erin B.',
      org: 'Virtual Assistant Coach',
    },
    {
      quote:
        'LearnForge delivers excellent uptime. That peace of mind is invaluable. The built-in tax handling frees me to focus on creating content.',
      title: 'Peace of Mind',
      name: 'Razvan C.',
      org: 'Voxyde',
    },
    {
      quote:
        'LearnForge has been essential for reaching thousands of students worldwide. It handles payments, taxes, and enrollments so I can focus on the creative side.',
      title: 'Essential',
      name: 'Francesco C.',
      org: 'Vaporetto Italiano',
    },
    {
      quote:
        'What started as a few dozen students has grown into 10,000+ pilots worldwide. My courses run 24/7 while I focus on teaching.',
      title: '10,000+ Students',
      name: 'Dan G.',
      org: 'FlightInsight',
    },
    {
      quote:
        'The platform made it simple to create and deliver our programs, and even let us offer a free course so students could get comfortable.',
      title: 'Made Simple',
      name: 'Huzan R. & Nicoleta S.',
      org: 'Speak Norsk',
    },
    {
      quote:
        'I\'ve been using LearnForge since 2017, and it continues to be a major revenue generator. Hands down the best platform.',
      title: 'Revenue Engine',
      name: 'Anna G.',
      org: 'The Science of Reading',
    },
  ],
  faqHome: [
    {
      q: 'Can I cancel my account at any time?',
      a: "Yes — cancel any time if LearnForge isn't right for you.",
    },
    {
      q: 'Can I change my plan once I sign up?',
      a: 'Yes — change your plan at any time from your admin. Your new amount is charged at the next billing date.',
    },
    {
      q: 'Are there any transaction fees?',
      a: '0% on Builder, Growth, Advanced, and Unlimited plans using LearnForge:pay. 7.5% on Starter. Standard processing fees may apply.',
    },
    {
      q: 'Who uses LearnForge?',
      a: 'Creators, experts, entrepreneurs, and businesses serious about education — from language teachers to finance professionals to health and fitness leaders.',
    },
  ],
};

function icon(name) {
  const icons = {
    arrow: `
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M7 12h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M13 7l5 5-5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
    check: `
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M20 7L10 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
    plus: `
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>`,
    spark: `
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M12 2l1.3 5.2L18 9l-4.7 1.8L12 16l-1.3-5.2L6 9l4.7-1.8L12 2z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
        <path d="M4 14l.8 3.2L8 18l-3.2.8L4 22l-.8-3.2L0 18l3.2-.8L4 14z" opacity=".7" fill="currentColor"/>
      </svg>`,
  };
  return icons[name] || '';
}

function headerHTML(current) {
  const links = SITE.nav
    .map((l) => {
      const currentAttr = current === l.id ? 'aria-current="page"' : '';
      return `<a href="${l.href}" ${currentAttr}>${l.label}</a>`;
    })
    .join('');

  return `
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="header">
      <div class="container nav">
        <a class="brand" href="index.html" aria-label="${SITE.name} home">
          <span class="mark" aria-hidden="true"></span>
          <span class="brand-title"><strong>${SITE.name}</strong><span>${SITE.tagline}</span></span>
        </a>
        <nav class="nav-links" aria-label="Primary">
          ${links}
        </nav>
        <div class="nav-cta">
          <a class="btn btn-ghost" href="#pricing">Explore plans</a>
          <a class="btn btn-primary" href="#trial">${SITE.cta}</a>
        </div>
      </div>
    </header>
  `;
}

function footerHTML() {
  return `
    <footer class="footer" id="trial">
      <div class="container footer-grid">
        <div>
          <div class="brand" style="padding: 0;">
            <span class="mark" aria-hidden="true"></span>
            <span class="brand-title"><strong>${SITE.name}</strong><span>${SITE.tagline}</span></span>
          </div>
          <p class="fineprint">
            Human-led learning, powered by AI as a time-saving partner. Build courses, coaching, downloads, and memberships — then scale globally with payments, tax handling, and automations.
          </p>
          <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:14px;">
            <a class="btn btn-primary" href="#">${SITE.cta}</a>
            <a class="btn btn-ghost" href="#pricing">See pricing</a>
          </div>
          <p class="fineprint">${SITE.trialNote}</p>
        </div>
        <div class="footer-links">
          <div>
            <h4>Explore</h4>
            <a href="#pricing">Pricing</a>
            <a href="#">Example Schools</a>
            <a href="#">Product Demo</a>
          </div>
          <div>
            <h4>Company</h4>
            <a href="#">About us</a>
            <a href="#">Careers</a>
            <a href="#">Press</a>
            <a href="#">Partners</a>
            <a href="#">Newsletter</a>
          </div>
          <div>
            <h4>Support</h4>
            <a href="#">Help Center</a>
            <a href="#">Blog</a>
            <a href="#pricing">Pricing</a>
            <a href="#">House Rules</a>
            <a href="#">Content Guidelines</a>
          </div>
          <div>
            <h4>Legal</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <a href="#">Cookies Policy</a>
            <a href="#">Ethics Line</a>
            <a href="#">Accessibility</a>
          </div>
        </div>
      </div>
      <div class="container">
        <p class="fineprint">© ${new Date().getFullYear()} ${SITE.name}. All rights reserved.</p>
      </div>
    </footer>
  `;
}

function testimonialsCarouselHTML(id, title, subtitle) {
  const slides = SITE.testimonials
    .map(
      (t) => `
        <article class="slide" aria-label="Testimonial">
          <div class="tag"><span class="dot" aria-hidden="true" style="width:10px;height:10px;border-radius:999px;background:linear-gradient(135deg,var(--accent),var(--primary));"></span>${t.title}</div>
          <p class="quote">“${t.quote}”</p>
          <p class="byline"><strong>${t.name}</strong>, ${t.org}</p>
        </article>
      `
    )
    .join('');

  const dots = SITE.testimonials
    .map(
      (_, i) =>
        `<button class="dotbtn" type="button" data-dot="${i}" aria-current="${i === 0 ? 'true' : 'false'}" aria-label="Go to testimonial ${i + 1}"></button>`
    )
    .join('');

  return `
    <section class="section" aria-label="Testimonials">
      <div class="container">
        <div class="section-head" data-reveal>
          <div>
            <div class="section-kicker">Success Stories</div>
            <h2 class="h2">${title}</h2>
            <p class="lead">${subtitle}</p>
          </div>
        </div>
        <div class="carousel" data-carousel="${id}" data-auto="true" data-reveal>
          <div class="carousel-track" style="transition: transform 320ms ease;">
            ${slides}
          </div>
          <div class="carousel-controls">
            <button class="btn btn-ghost" type="button" data-prev aria-label="Previous testimonial">←</button>
            <div class="dots" aria-label="Testimonial slides">${dots}</div>
            <button class="btn btn-ghost" type="button" data-next aria-label="Next testimonial">→</button>
          </div>
        </div>
      </div>
    </section>
  `;
}

function integrationsHTML(kicker = 'Integrations', title = 'Plug into the tools you already trust') {
  const logos = SITE.integrations
    .map(
      (name) => `
        <div class="logo" data-reveal>
          <strong>${name}</strong>
          <span class="badge">Connected</span>
        </div>
      `
    )
    .join('');
  return `
    <section class="section" aria-label="Integrations">
      <div class="container">
        <div class="section-head" data-reveal>
          <div>
            <div class="section-kicker">${kicker}</div>
            <h2 class="h2">${title}</h2>
            <p class="lead">Stripe, Zapier, Mailchimp and more — plus developer-friendly APIs and webhooks when you need custom workflows.</p>
          </div>
          <div class="pill"><span class="dot" aria-hidden="true"></span>Works with 130+ currencies</div>
        </div>
        <div class="logos">${logos}</div>
      </div>
    </section>
  `;
}

function faqHTML(items, title = 'Questions, answered') {
  const rows = items
    .map(
      (it, i) => `
      <div class="acc-item" data-reveal>
        <button class="acc-btn" type="button" aria-expanded="false" aria-controls="faq-${i}">
          <span>${it.q}</span>
          ${icon('plus')}
        </button>
        <div class="acc-panel" id="faq-${i}" role="region" aria-label="Answer">
          <div>
            <p>${it.a}</p>
          </div>
        </div>
      </div>
    `
    )
    .join('');
  return `
    <section class="section" aria-label="FAQ">
      <div class="container">
        <div class="section-head" data-reveal>
          <div>
            <div class="section-kicker">FAQ</div>
            <h2 class="h2">${title}</h2>
            <p class="lead">Fast clarity for fast decisions — everything you need to start your free trial with confidence.</p>
          </div>
        </div>
        <div class="accordion" data-accordion>
          ${rows}
        </div>
      </div>
    </section>
  `;
}

function statsBarHTML() {
  return `
    <section class="section compact stats-bar" aria-label="Platform statistics">
      <div class="container">
        <div class="stats" data-reveal>
          <div class="stat"><strong>$12B+</strong><span>earned by LearnForge creators</span></div>
          <div class="stat"><strong>120M+</strong><span>students served on LearnForge</span></div>
          <div class="stat"><strong>180</strong><span>countries using LearnForge</span></div>
        </div>
      </div>
    </section>
  `;
}

function pricingOverviewHTML() {
  const plans = [
    {
      name: 'Starter',
      price: '$29',
      note: 'Best for validating a new idea. 7.5% transaction fee on Starter plan.',
      features: ['Course + download selling', 'Basic checkout', 'Email capture + coupons', 'Creator analytics'],
    },
    {
      name: 'Growth',
      price: '$99',
      ribbon: 'Most popular',
      note: '0% transaction fees on Growth and above. Built for scaling.',
      features: ['0% transaction fees', 'Upsells + order bumps', 'Automations + integrations', 'Certificates + quizzes'],
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      note: 'SSO, advanced reporting, bulk sales, native integrations + API, dedicated success manager.',
      features: ['SSO + provisioning', 'Advanced reporting', 'Bulk sales management', 'Priority support + onboarding'],
    },
  ];

  const html = plans
    .map(
      (p) => `
        <article class="card price-card ${p.ribbon ? 'soft' : ''}" data-reveal>
          <div class="card-inner">
            ${p.ribbon ? `<div class="ribbon">${p.ribbon}</div>` : ''}
            <div class="price-head">
              <div class="plan">${p.name}</div>
              <div class="price">${p.price}<small>${p.price.startsWith('$') ? '/mo' : ''}</small></div>
            </div>
            <div class="price-note">${p.note}</div>
            <ul class="list">
              ${p.features
                .map((f) => `<li>${icon('check')}<span>${f}</span></li>`)
                .join('')}
            </ul>
            <div style="display:flex; gap:10px; margin-top:16px; flex-wrap:wrap;">
              <a class="btn btn-primary" href="#trial">Start Free Trial</a>
              <a class="btn btn-ghost" href="#">Compare plans</a>
            </div>
          </div>
        </article>
      `
    )
    .join('');

  return `
    <section class="section" id="pricing" aria-label="Pricing overview">
      <div class="container">
        <div class="section-head" data-reveal>
          <div>
            <div class="section-kicker">Pricing</div>
            <h2 class="h2">Pick a plan that scales with you</h2>
            <p class="lead">Start free for 7 days. Keep 0% transaction fees on Builder, Growth, Advanced, and Unlimited plans — and keep momentum with tools that convert.</p>
          </div>
          <div class="pill"><span class="dot" aria-hidden="true"></span>0% fees on Growth+</div>
        </div>
        <div class="pricing">${html}</div>
      </div>
    </section>
  `;
}

window.SITE = SITE;
window.LF_SHARED = {
  headerHTML,
  footerHTML,
  testimonialsCarouselHTML,
  integrationsHTML,
  faqHTML,
  statsBarHTML,
  pricingOverviewHTML,
  icon,
};

