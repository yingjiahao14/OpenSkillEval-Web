function renderHeader(active) {
  const items = [
    { id: 'home', label: 'Stays', href: 'index.html' },
    { id: 'packages', label: 'Flight + Hotel', href: 'packages.html' },
    { id: 'car-rental', label: 'Car Rental', href: 'car-rental.html' },
    { id: 'attractions', label: 'Attractions', href: 'attractions.html' }
  ];

  return `
  <header class="topbar">
    <div class="container">
      <div class="topbar-inner">
        <a class="brand" href="index.html" aria-label="StayQuest Home">
          <span class="logo" aria-hidden="true"></span>
          <span>
            StayQuest
            <small>Find deals with confidence</small>
          </span>
        </a>

        <nav class="nav" aria-label="Primary">
          ${items
            .map(
              (it) =>
                `<a data-nav="${it.id}" href="${it.href}" class="${it.id === active ? 'active' : ''}">${it.label}</a>`
            )
            .join('')}
        </nav>

        <div class="header-actions">
          <span class="pill" aria-label="Trusted service">\u2605 4.8 avg rating</span>
          <a class="btn btn-ghost" href="#footer">Support</a>
        </div>
      </div>
    </div>
  </header>`;
}

function renderFooter() {
  return `
  <footer class="footer" id="footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="brand" style="margin-bottom:10px">
            <span class="logo" aria-hidden="true"></span>
            <span>
              StayQuest
              <small>Professional. Warm. Worldwide.</small>
            </span>
          </div>
          <div class="small">Book hotels, flights, car rentals, and experiences with clarity and confidence. This is a static demo landing page.</div>
        </div>
        <div>
          <h4>Explore</h4>
          <a href="index.html">Stays</a>
          <a href="packages.html">Flight + Hotel</a>
          <a href="car-rental.html">Car Rental</a>
          <a href="attractions.html">Attractions</a>
        </div>
        <div>
          <h4>Popular</h4>
          <a href="#">Deals</a>
          <a href="#">Genius rewards</a>
          <a href="#">Free cancellation</a>
          <a href="#">Verified reviews</a>
        </div>
        <div>
          <h4>Help</h4>
          <a href="#">Customer service</a>
          <a href="#">Manage booking</a>
          <a href="#">Safety center</a>
          <a href="#">Accessibility</a>
        </div>
      </div>
      <div class="small" style="margin-top:16px">\u00a9 ${new Date().getFullYear()} StayQuest. All rights reserved.</div>
    </div>
  </footer>`;
}

