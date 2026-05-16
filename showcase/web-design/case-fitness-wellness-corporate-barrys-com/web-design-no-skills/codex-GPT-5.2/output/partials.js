function siteTopbar() {
  return `
    <div class="topbar" role="region" aria-label="Site promotion">
      <div class="container topbar-inner">
        <div class="pill">
          <span class="chip">Promo</span>
          <strong>The Best (Digital) Workout in the World</strong>
        </div>
        <a class="btn small" href="digital-platform.html">Learn More</a>
      </div>
    </div>
  `;
}

function siteHeader(current) {
  const is = (id) => (current === id ? 'aria-current="page"' : '');

  return `
    <header class="header" data-site-header data-open="false">
      <div class="container nav">
        <a class="logo" href="index.html" aria-label="RedRoom Fitness home">
          <span class="logo-mark" aria-hidden="true"></span>
          <span>RedRoom Fitness</span>
        </a>

        <button class="btn ghost menu-btn" type="button" data-menu-btn aria-expanded="false" aria-label="Open menu">
          Menu
        </button>

        <nav class="nav-links" aria-label="Primary">
          <a href="the-workout.html" ${is('workout')}>The Workout</a>
          <a href="instructors.html" ${is('instructors')}>Instructors</a>
          <a href="ride-faq.html" ${is('ride')}>RedRoom RIDE</a>
          <a href="digital-platform.html" ${is('digital')}>RedRoom X (Digital)</a>
          <a href="#" title="Community page not in this 5-page build">The Community</a>
          <a href="#" title="Studios page not in this 5-page build">Our Studios</a>
          <a href="#" title="First Timers page not in this 5-page build">First Timers</a>
        </nav>

        <div class="nav-utility" aria-label="Utility">
          <a class="btn small primary" href="#" title="Booking flows not included in this static build">Book Now</a>
          <a class="btn small" href="#" title="Purchasing not included in this static build">Buy Classes</a>
          <a class="btn small" href="#" title="Shop not included in this static build">Shop</a>
          <a class="btn small" href="#" title="Account not included in this static build">My Account</a>
        </div>
      </div>
    </header>
  `;
}

function siteNewsletter() {
  return `
    <section class="section compact">
      <div class="container">
        <div class="cta-band">
          <div class="row">
            <div>
              <div class="kicker">Newsletter Form Signup</div>
              <h2 class="h2">Stay in the know.</h2>
              <p class="muted" style="margin:0">Get workout tips, class updates, and exclusive offers delivered to your inbox.</p>
            </div>
          </div>
          <div style="margin-top:14px">
            <form class="form" data-newsletter-form>
              <div class="field">
                <input class="input" type="email" inputmode="email" autocomplete="email" placeholder="Email address" aria-label="Email" data-email />
                <div class="help" data-help aria-live="polite"></div>
              </div>
              <button class="btn primary" type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  `;
}

function siteFooter() {
  return `
    <footer>
      <div class="container">
        <div class="footer-grid">
          <div class="footer-col">
            <div class="logo" style="margin-bottom:10px">
              <span class="logo-mark" aria-hidden="true"></span>
              <span>RedRoom Fitness</span>
            </div>
            <p class="muted" style="margin:0 0 10px">A premium HIIT experience combining treadmill running and strength training — in-studio and on-demand.</p>
            <div class="country">
              <span class="muted">Region:</span>
              <select class="select" data-country-select aria-label="Country selector">
                <option>US</option>
                <option>UK</option>
                <option>Australia</option>
                <option>Canada</option>
                <option>EU</option>
              </select>
              <span class="chip" data-country-label>US</span>
            </div>
          </div>

          <div class="footer-col">
            <h4>Explore</h4>
            <a href="the-workout.html">The Workout</a>
            <a href="instructors.html">Instructors</a>
            <a href="ride-faq.html">RIDE FAQ</a>
            <a href="digital-platform.html">Digital Platform</a>
            <a href="#" title="Not included in this 5-page build">Community Events</a>
          </div>

          <div class="footer-col">
            <h4>Company</h4>
            <a href="#" title="Not included in this 5-page build">Our Studios</a>
            <a href="#" title="Not included in this 5-page build">Global Expansion</a>
            <a href="#" title="Not included in this 5-page build">Fuel Bar</a>
            <a href="#" title="Not included in this 5-page build">Blog</a>
            <a href="#" title="Not included in this 5-page build">Careers</a>
          </div>

          <div class="footer-col">
            <h4>Connect</h4>
            <a href="#" title="Not included in this 5-page build">Shop</a>
            <a href="#" title="Not included in this 5-page build">My Account</a>
            <a href="#" title="Not included in this 5-page build">Download the App (iOS)</a>
            <a href="#" title="Not included in this 5-page build">Download the App (Android)</a>
          </div>
        </div>

        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} RedRoom Fitness. All rights reserved.</span>
          <span class="muted">Built dark-mode by default.</span>
        </div>
      </div>
    </footer>
  `;
}

function mountChrome(current) {
  const top = document.getElementById('site-topbar');
  const head = document.getElementById('site-header');
  const foot = document.getElementById('site-footer');
  if (top) top.innerHTML = siteTopbar();
  if (head) head.innerHTML = siteHeader(current);
  if (foot) foot.innerHTML = siteFooter();
}

