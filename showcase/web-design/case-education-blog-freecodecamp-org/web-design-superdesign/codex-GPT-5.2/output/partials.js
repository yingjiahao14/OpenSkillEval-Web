// Small client-side partials to keep pages consistent.

function olhHeader(current){
  const navLink = (href, label, extraClass) => {
    const isActive = current === href;
    return `<a href="${href}" ${isActive ? 'aria-current="page"' : ''} class="${extraClass||''}">${label}</a>`;
  };

  return `
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <div class="container">
      <div class="header-inner">
        <a class="brand" href="index.html" aria-label="OpenLearnHub home">
          <div class="logo" aria-hidden="true"></div>
          <div class="brand-name">OpenLearnHub</div>
        </a>

        <div class="search" role="search">
          <label class="sr-only" for="search">Search</label>
          <input id="search" type="search" placeholder="Search 12,000+ tutorials, articles, and books" />
        </div>

        <nav class="nav" aria-label="Primary">
          ${navLink('#', 'Forum')}
          ${navLink('learn.html', 'Curriculum')}
          ${navLink('donate.html', 'Donate', 'cta-donate')}
        </nav>

        <button class="menu-btn" type="button" aria-label="Open menu" aria-expanded="false" data-menu-button>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M4 7h16"></path>
            <path d="M4 12h16"></path>
            <path d="M4 17h16"></path>
          </svg>
        </button>
      </div>

      <div class="mobile-nav" data-mobile-nav data-open="false" aria-label="Mobile">
        ${navLink('#', 'Forum')}
        ${navLink('learn.html', 'Curriculum')}
        ${navLink('donate.html', 'Donate')}
      </div>
    </div>
  </header>`;
}

function olhBanner(){
  return `
  <div class="banner">
    <div class="container">
      <a href="learn.html" aria-label="Go to curriculum">
        <strong>Learn to code — free 3,000-hour curriculum</strong>
        <span class="pill">Explore curriculum</span>
      </a>
    </div>
  </div>`;
}

function olhFooter(){
  const d = window.OPENLEARNHUB_DATA;
  const trending = d.footer.trending.map(x => `<a href="#" aria-label="Trending guide ${x}">${x}</a>`).join(' · ');
  const links = d.footer.links.map(x => `<a href="#" aria-label="${x}">${x}</a>`).join('');

  return `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="brand" style="margin-bottom:10px">
            <div class="logo" aria-hidden="true"></div>
            <div>
              <div class="brand-name">OpenLearnHub</div>
              <div class="kicker">Free tutorials · structured curriculum · nonprofit</div>
            </div>
          </div>
          <p class="mission">${d.footer.mission}</p>
        </div>
        <div>
          <div class="section" style="margin-top:0">
            <h2 style="margin:0 0 10px">Trending Guides</h2>
            <p class="subtle" style="margin:0">${trending}</p>
          </div>
          <div class="section">
            <h2 style="margin:0 0 10px">Links</h2>
            <div class="footer-links">${links}</div>
          </div>
        </div>
      </div>
      <div class="kicker">© ${new Date().getFullYear()} OpenLearnHub. Built for learning.</div>
    </div>
  </footer>`;
}

