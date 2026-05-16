function stayQuestHeader(active) {
  return `
  <header class="nav">
    <div class="container nav-inner">
      <a class="brand" href="index.html" aria-label="StayQuest Home">
        <div class="logo" aria-hidden="true"></div>
        <span>StayQuest</span>
      </a>
      <nav class="nav-tabs" aria-label="Primary">
        <a class="tablink" data-nav href="index.html">Stays</a>
        <a class="tablink" data-nav href="packages.html">Flight + Hotel</a>
        <a class="tablink" data-nav href="car-rental.html">Car Rental</a>
        <a class="tablink" data-nav href="attractions.html">Attractions</a>
      </nav>
      <div class="nav-actions">
        <a class="btn btn-ghost small" href="#footer">Support</a>
        <a class="btn btn-secondary small" href="#">Sign in</a>
      </div>
    </div>
  </header>`;
}

function stayQuestFooter() {
  return `
  <footer id="footer" class="footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <h4>Support</h4>
          <a href="#">Manage your trips</a>
          <a href="#">Contact Customer Service</a>
          <a href="#">Safety Resource Center</a>
        </div>
        <div>
          <h4>Discover</h4>
          <a href="#">Genius loyalty program</a>
          <a href="#">Seasonal and holiday deals</a>
          <a href="#">Travel articles</a>
          <a href="#">StayQuest for Business</a>
          <a href="#">Traveller Review Awards</a>
          <a href="car-rental.html">Car rental</a>
          <a href="#">Flight finder</a>
          <a href="#">Restaurant reservations</a>
        </div>
        <div>
          <h4>Terms</h4>
          <a href="#">Privacy Notice</a>
          <a href="#">Terms of Service</a>
          <a href="#">Accessibility Statement</a>
          <a href="#">Dispute resolution</a>
        </div>
        <div>
          <h4>Partners</h4>
          <a href="#">Extranet login</a>
          <a href="#">Partner help</a>
          <a href="#">List your property</a>
          <a href="#">Become an affiliate</a>
        </div>
        <div>
          <h4>About</h4>
          <a href="#">About StayQuest</a>
          <a href="#">How We Work</a>
          <a href="#">Sustainability</a>
          <a href="#">Press center</a>
          <a href="#">Careers</a>
          <a href="#">Investor relations</a>
          <a href="#">Corporate contact</a>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="tagline">
          StayQuest is part of StayQuest Holdings Inc., the world leader in online travel and related services.
        </div>
        <div class="chip small">
          <span class="dot" style="width:8px;height:8px;border-radius:999px;background:var(--gold);"></span>
          Brand colors: <span style="font-weight:800;color:var(--navy)">#003B95</span> · <span style="font-weight:800;color:var(--blue)">#006CE4</span> · <span style="font-weight:800;color:var(--gold)">#FFB700</span>
        </div>
      </div>
    </div>
  </footer>`;
}

