const RedRoom = (() => {
  const year = new Date().getFullYear();

  const navItems = [
    { label: "The Workout", href: "the-workout.html" },
    { label: "Instructors", href: "instructors.html" },
    { label: "Ride FAQ", href: "ride-faq.html" },
    { label: "Digital Platform", href: "digital-platform.html" },
  ];

  const navHtml = (current) => {
    const linkHtml = navItems
      .map((i) => {
        const isCurrent = current === i.href;
        return `<a href="${i.href}" ${isCurrent ? 'aria-current="page"' : ""}>${i.label}</a>`;
      })
      .join("");

    return `
      <div class="topbar">
        <div class="container">
          <div class="promo">
            <div>The Best (Digital) Workout in the World</div>
            <a href="digital-platform.html" aria-label="Learn more about the digital platform">Learn More →</a>
          </div>
          <div class="nav" data-nav>
            <div class="nav-row">
              <a class="brand" href="index.html" aria-label="RedRoom Fitness home">
                <span class="brand-mark" aria-hidden="true"></span>
                <span class="brand-name">RedRoom Fitness</span>
              </a>

              <nav class="nav-links" aria-label="Primary">
                ${linkHtml}
              </nav>

              <div class="nav-cta">
                <a class="btn btn-ghost" href="#" aria-label="Book now">Book Now</a>
                <a class="btn btn-primary" href="#" aria-label="Buy classes">Buy Classes</a>
                <button class="icon-btn mobile-toggle" data-mobile-toggle aria-label="Open menu" aria-expanded="false">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                </button>
              </div>
            </div>

            <div class="mobile-panel" data-mobile-panel>
              ${navItems.map((i) => `<a href="${i.href}">${i.label}</a>`).join("")}
              <a href="#">The Community</a>
              <a href="#">Our Studios</a>
              <a href="#">First Timers</a>
            </div>
          </div>
        </div>
      </div>
    `.trim();
  };

  const footerHtml = () => {
    return `
      <footer>
        <div class="container">
          <div class="footer-grid">
            <div class="footer-col">
              <div class="brand" aria-label="RedRoom Fitness">
                <span class="brand-mark" aria-hidden="true"></span>
                <span class="brand-name">RedRoom Fitness</span>
              </div>
              <p class="muted" style="margin: 12px 0 0; line-height: 1.7; max-width: 44ch;">
                Original HIIT — treadmill + strength — in a signature red-lit studio.
              </p>
              <div style="margin-top: 14px; display: flex; gap: 10px; flex-wrap: wrap;">
                <a class="btn btn-primary" href="#">Start Free Trial</a>
                <a class="btn" href="#">Book a Class</a>
              </div>
            </div>
            <div class="footer-col">
              <h4>Explore</h4>
              <a href="the-workout.html">The Workout</a><br/>
              <a href="instructors.html">Instructors</a><br/>
              <a href="ride-faq.html">RIDE FAQ</a><br/>
              <a href="digital-platform.html">Digital Platform</a><br/>
              <a href="#">Community Events</a>
            </div>
            <div class="footer-col">
              <h4>Company</h4>
              <a href="#">Our Studios</a><br/>
              <a href="#">Global Expansion</a><br/>
              <a href="#">Fuel Bar</a><br/>
              <a href="#">Blog</a><br/>
              <a href="#">Careers</a>
            </div>
            <div class="footer-col">
              <h4>Connect</h4>
              <a href="#">Shop</a><br/>
              <a href="#">My Account</a><br/>
              <a href="#">Download the App (iOS)</a><br/>
              <a href="#">Download the App (Android)</a>

              <div class="divider"></div>
              <div class="country">
                <button class="btn" data-country-button aria-expanded="false" aria-haspopup="true">
                  Country: <span data-country-label>US</span>
                </button>
                <div class="country-menu" data-country-menu role="menu" aria-label="Select country">
                  ${["US", "UK", "Australia", "Canada", "EU"].map((v) => `<button type="button" role="menuitem" data-value="${v}">${v}</button>`).join("")}
                </div>
              </div>
            </div>
          </div>
          <div class="footer-bottom">
            <div>© ${year} RedRoom Fitness. All rights reserved.</div>
            <div class="muted">Built for speed. Lit in red.</div>
          </div>
        </div>
      </footer>
    `.trim();
  };

  return { navHtml, footerHtml };
})();

