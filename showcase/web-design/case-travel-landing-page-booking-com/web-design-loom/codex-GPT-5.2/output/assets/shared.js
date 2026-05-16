const FOOTER_LINKS = {
  Support: [
    'Manage your trips',
    'Contact Customer Service',
    'Safety Resource Center'
  ],
  Discover: [
    'Genius loyalty program',
    'Seasonal and holiday deals',
    'Travel articles',
    'StayQuest for Business',
    'Traveller Review Awards',
    'Car rental',
    'Flight finder',
    'Restaurant reservations'
  ],
  'Terms and settings': [
    'Privacy Notice',
    'Terms of Service',
    'Accessibility Statement',
    'Dispute resolution'
  ],
  Partners: [
    'Extranet login',
    'Partner help',
    'List your property',
    'Become an affiliate'
  ],
  About: [
    'About StayQuest',
    'How We Work',
    'Sustainability',
    'Press center',
    'Careers',
    'Investor relations',
    'Corporate contact'
  ]
};

function escapeHtml(str){
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function mountFooter(){
  const el = document.querySelector('[data-footer]');
  if (!el) return;

  const cols = Object.entries(FOOTER_LINKS).map(([title, links]) => {
    return `
      <div class="footer-col">
        <h3>${escapeHtml(title)}</h3>
        ${links.map(t => `<a href="#">${escapeHtml(t)}</a>`).join('')}
      </div>
    `;
  }).join('');

  el.innerHTML = `
    <footer>
      <div class="container">
        <div class="footer-grid">
          ${cols}
        </div>
        <div class="footer-bottom">
          StayQuest is part of StayQuest Holdings Inc., the world leader in online travel and related services.
        </div>
      </div>
    </footer>
  `;
}

function mountHeader(){
  const el = document.querySelector('[data-header]');
  if (!el) return;

  const page = document.body.getAttribute('data-page') || 'home';
  const navItems = [
    { id: 'home', label: 'Stays', href: './index.html' },
    { id: 'packages', label: 'Flight + Hotel', href: './packages.html' },
    { id: 'car-rental', label: 'Car Rental', href: './car-rental.html' },
    { id: 'attractions', label: 'Attractions', href: './attractions.html' }
  ];

  el.innerHTML = `
    <a class="skip-link" href="#main">Skip to content</a>
    <div class="topbar">
      <div class="container">
        <div class="topbar-inner">
          <a class="brand" href="./index.html" aria-label="StayQuest home">
            <span class="brand-mark" aria-hidden="true"></span>
            <span>
              <span class="brand-name">StayQuest</span>
              <span class="brand-sub">Find deals for any season</span>
            </span>
          </a>

          <nav class="nav" aria-label="Primary">
            ${navItems.map(n => {
              const current = n.id === page;
              return `<a href="${n.href}" ${current ? 'aria-current="page"' : ''}>${escapeHtml(n.label)}</a>`;
            }).join('')}
          </nav>

          <div class="header-actions">
            <a class="btn ghost" href="#">Help</a>
            <a class="btn secondary" href="#">Sign in</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  mountHeader();
  mountFooter();
});

