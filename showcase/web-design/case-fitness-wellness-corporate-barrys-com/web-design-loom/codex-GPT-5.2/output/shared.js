function rrNav(current) {
  const items = [
    { href: 'index.html', label: 'Home', id: 'home' },
    { href: 'the-workout.html', label: 'The Workout', id: 'the-workout' },
    { href: 'instructors.html', label: 'Instructors', id: 'instructors' },
    { href: 'ride-faq.html', label: 'Ride FAQ', id: 'ride-faq' },
    { href: 'digital-platform.html', label: 'Digital Platform', id: 'digital-platform' }
  ];

  const links = items
    .map((it) => {
      const currentAttr = it.id === current ? ' aria-current="page"' : '';
      return `<a href="${it.href}"${currentAttr}>${it.label}</a>`;
    })
    .join('');

  const mobile = items
    .map((it) => {
      const currentAttr = it.id === current ? ' aria-current="page"' : '';
      return `<a href="${it.href}"${currentAttr} style="padding:12px 12px;border-radius:14px;border:1px solid rgba(255,255,255,.10);background:rgba(255,255,255,.03);text-decoration:none;color:#f3f4f6;font-weight:800;letter-spacing:.03em;text-transform:uppercase;">${it.label}</a>`;
    })
    .join('');

  return `
    <div class="topbar">
      <div class="container">
        <div class="topbar-inner">
          <p>The Best (Digital) Workout in the World</p>
          <a class="pill" href="digital-platform.html">Learn More</a>
        </div>
      </div>
    </div>
    <header class="nav">
      <a class="skip-link" href="#main">Skip to content</a>
      <div class="container">
        <div class="nav-inner">
          <a class="brand" href="index.html" aria-label="RedRoom Fitness">
            <span class="brand-mark" aria-hidden="true"></span>
            <span>
              <span class="brand-name">RedRoom</span>
              <span class="brand-sub">Fitness</span>
            </span>
          </a>
          <nav class="nav-links" aria-label="Primary navigation">${links}</nav>
          <div class="nav-cta">
            <a class="btn btn-ghost" href="the-workout.html#schedule">Schedule</a>
            <a class="btn btn-primary" href="index.html#free-trial">Free Trial</a>
            <button class="btn menu-btn" type="button" data-menu-btn aria-expanded="false" aria-controls="mobile-menu">Menu</button>
          </div>
        </div>
        <div id="mobile-menu" data-mobile-menu hidden style="padding:0 0 16px">
          <div style="display:flex;flex-direction:column;gap:10px">${mobile}</div>
        </div>
      </div>
    </header>
  `;
}

function rrFooter() {
  return `
    <footer>
      <div class="container">
        <div class="footer-grid">
          <div>
            <h3>Enter The Red Room</h3>
            <p class="footer-note">Premium HIIT: treadmill intervals + strength training, engineered for results.</p>
            <p class="footer-note">© ${new Date().getFullYear()} RedRoom Fitness. All rights reserved.</p>
          </div>
          <div>
            <h3>Explore</h3>
            <div class="stack" style="gap:10px;margin-top:10px">
              <a href="the-workout.html">The Workout</a>
              <a href="instructors.html">Instructors</a>
              <a href="ride-faq.html">Ride FAQ</a>
              <a href="digital-platform.html">Digital Platform</a>
            </div>
          </div>
          <div>
            <h3>Region</h3>
            <div class="country" data-country style="margin-top:10px">
              <button class="btn" type="button" data-country-btn aria-expanded="false" aria-controls="country-menu">
                <span>Country / Region</span>
                <span class="pill" data-country-label>United States</span>
              </button>
              <div id="country-menu" class="country-menu" data-country-menu hidden role="menu" aria-label="Select country">
                <button type="button" role="menuitem" data-country-option="United States">United States</button>
                <button type="button" role="menuitem" data-country-option="United Kingdom">United Kingdom</button>
                <button type="button" role="menuitem" data-country-option="Canada">Canada</button>
                <button type="button" role="menuitem" data-country-option="Australia">Australia</button>
              </div>
            </div>
            <p class="footer-note">Selector is for demo purposes (static site).</p>
          </div>
        </div>
      </div>
    </footer>
  `;
}

