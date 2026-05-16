function siteNav(active){
  const items = [
    {href:'index.html', label:'Home', id:'home'},
    {href:'online-courses.html', label:'Online Courses', id:'online-courses'},
    {href:'digital-downloads.html', label:'Digital Downloads', id:'digital-downloads'},
    {href:'memberships.html', label:'Memberships', id:'memberships'},
    {href:'coaching.html', label:'Coaching', id:'coaching'},
  ];

  const link = (it) => {
    const isActive = active === it.id;
    const a = document.createElement('a');
    a.href = it.href;
    a.textContent = it.label;
    if (isActive) {
      a.setAttribute('aria-current', 'page');
      a.style.background = 'rgba(39,84,255,.08)';
      a.style.borderColor = 'rgba(39,84,255,.22)';
    }
    return a;
  };

  const nav = document.createElement('header');
  nav.className = 'nav';
  nav.setAttribute('data-nav', '');
  nav.innerHTML = `
    <div class="container">
      <div class="nav__inner">
        <a class="brand" href="index.html" aria-label="LearnForge home">
          <span class="brand__mark" aria-hidden="true"></span>
          <span>
            <span class="brand__name">LearnForge</span>
            <span class="brand__tag">Build & sell learning products</span>
          </span>
        </a>
        <div style="flex:1"></div>
        <button class="nav__toggle" data-nav-toggle aria-expanded="false" aria-controls="site-links">
          <span aria-hidden="true" style="display:inline-grid; place-items:center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
          </span>
          Menu
        </button>
        <nav class="nav__links" id="site-links" data-nav-links aria-label="Primary">
        </nav>
        <div class="nav__actions">
          <a class="btn btn--secondary" href="#pricing">Explore plans</a>
          <a class="btn btn--primary" href="#start">Start Free Trial</a>
        </div>
      </div>
    </div>
  `;

  const links = nav.querySelector('[data-nav-links]');
  items.forEach((it) => links.appendChild(link(it)));
  return nav;
}

function siteFooter(){
  const footer = document.createElement('footer');
  footer.className = 'footer';
  footer.innerHTML = `
    <div class="container">
      <div class="footer__grid">
        <div>
          <a class="brand" href="index.html" aria-label="LearnForge home">
            <span class="brand__mark" aria-hidden="true"></span>
            <span>
              <span class="brand__name">LearnForge</span>
              <span class="brand__tag">The future of your education business</span>
            </span>
          </a>
          <p class="muted" style="margin: .9rem 0 0; max-width: 52ch">All-in-one platform for creators to build and sell courses, coaching, digital downloads, and memberships—powered by AI and trusted globally.</p>
          <p class="muted" style="margin: .9rem 0 0; font-size: .9rem">© ${new Date().getFullYear()} LearnForge. All rights reserved.</p>
        </div>
        <div>
          <h4>Explore</h4>
          <ul>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#">Example Schools</a></li>
            <li><a href="#">Product Demo</a></li>
          </ul>
        </div>
        <div>
          <h4>Company</h4>
          <ul>
            <li><a href="#">About us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press</a></li>
            <li><a href="#">Partners</a></li>
            <li><a href="#">Newsletter</a></li>
          </ul>
        </div>
        <div>
          <h4>Support</h4>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#">House Rules</a></li>
            <li><a href="#">Content Guidelines</a></li>
          </ul>
        </div>
        <div>
          <h4>Legal</h4>
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Use</a></li>
            <li><a href="#">Cookies Policy</a></li>
            <li><a href="#">Ethics Line</a></li>
            <li><a href="#">Accessibility</a></li>
          </ul>
        </div>
      </div>
    </div>
  `;
  return footer;
}

