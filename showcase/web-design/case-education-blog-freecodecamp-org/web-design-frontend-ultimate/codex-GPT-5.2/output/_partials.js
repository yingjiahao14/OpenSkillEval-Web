// tiny helper for generating shared header/footer HTML in each page
window.__OLH_PARTIALS = {
  header: function(active){
    function is(id){return active === id}
    return `
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="site-header" role="banner">
      <div class="container">
        <div class="header-inner">
          <a class="brand" href="index.html" aria-label="OpenLearnHub home">
            <span class="mark" aria-hidden="true">A</span>
            <span>
              OpenLearnHub
              <small>Free coding education</small>
            </span>
          </a>

          <div class="search" role="search">
            <input aria-label="Search" placeholder="Search 12,000+ tutorials, articles, and books" />
          </div>

          <nav class="nav" aria-label="Primary">
            <a href="#" ${is('forum') ? 'aria-current="page"' : ''}>Forum</a>
            <a href="learn.html" ${is('learn') ? 'aria-current="page"' : ''}>Curriculum</a>
            <a class="cta" href="donate.html" ${is('donate') ? 'aria-current="page"' : ''}>Donate</a>
          </nav>

          <button class="menu-btn" data-menu-button aria-label="Open menu" aria-expanded="false">
            <span class="menu-icon" aria-hidden="true"><span></span><span></span><span></span></span>
          </button>
        </div>
      </div>

      <div class="mobile-nav" data-mobile-nav>
        <div class="container">
          <div class="mobile-nav-inner">
            <a href="#">Forum</a>
            <a href="learn.html">Curriculum</a>
            <a class="cta" href="donate.html">Donate</a>
          </div>
        </div>
      </div>
    </header>
    `;
  },

  banner: function(){
    return `
      <section class="banner" aria-label="Curriculum banner">
        <div class="container">
          <div class="banner-inner">
            <div><strong>Learn to code — free 3,000-hour curriculum</strong></div>
            <a href="learn.html">Explore the curriculum →</a>
          </div>
        </div>
      </section>
    `;
  },

  footer: function(){
    return `
    <footer class="site-footer" role="contentinfo">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-card">
            <h3>Our mission</h3>
            <p>OpenLearnHub is a donor-supported tax-exempt 501(c)(3) charitable organization. Our mission: to help people learn to code for free. We accomplish this by creating thousands of videos, articles, and interactive coding lessons — all freely available to the public.</p>
          </div>
          <div class="footer-card">
            <h3>Trending guides</h3>
            <div class="trending" aria-label="Trending guides">
              <span>REST APIs</span><span>Clean Code</span><span>TypeScript</span><span>JavaScript</span><span>AI Chatbots</span><span>Command Line</span><span>GraphQL APIs</span><span>CSS Transforms</span><span>Python</span><span>React</span><span>Docker</span><span>Node.js</span>
            </div>
            <div style="height:12px"></div>
            <div class="links" aria-label="Footer links">
              <a href="#">Our Charity</a><a href="#">About</a><a href="#">Alumni Network</a><a href="#">Open Source</a><a href="#">Shop</a><a href="#">Support</a><a href="#">Sponsors</a><a href="#">Academic Honesty</a><a href="#">Code of Conduct</a><a href="#">Privacy Policy</a><a href="#">Terms of Service</a><a href="#">Copyright Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
    `;
  }
};

