// Shared HTML templates to keep pages consistent.
function lfEscape(s){
  return String(s)
    .replaceAll('&','&amp;')
    .replaceAll('<','&lt;')
    .replaceAll('>','&gt;')
    .replaceAll('"','&quot;')
    .replaceAll("'",'&#39;');
}

function lfNav(current){
  const items = [
    {href:'index.html', label:'Home', id:'home'},
    {href:'online-courses.html', label:'Online Courses', id:'online-courses'},
    {href:'digital-downloads.html', label:'Digital Downloads', id:'digital-downloads'},
    {href:'memberships.html', label:'Memberships', id:'memberships'},
    {href:'coaching.html', label:'Coaching', id:'coaching'},
  ];

  const links = items.map((it) => {
    const currentAttr = it.id === current ? ' aria-current="page"' : '';
    return `<a href="${it.href}"${currentAttr}>${lfEscape(it.label)}</a>`;
  }).join('');

  return `
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="topbar">
    <div class="container">
      <nav class="nav" aria-label="Primary">
        <a class="brand" href="index.html" aria-label="LearnForge home">
          <span class="mark" aria-hidden="true"></span>
          <span>LearnForge</span>
        </a>

        <div class="nav-cta">
          <button class="btn menu-btn" type="button" aria-expanded="false" data-menu-btn>
            Menu
          </button>
          <a class="btn btn-primary" href="#free-trial" data-cta>
            Start Free Trial
          </a>
        </div>
      </nav>
      <div class="nav-links" data-nav-links>
        ${links}
        <a class="btn btn-primary" href="#free-trial">Start Free Trial</a>
      </div>
    </div>
  </header>`;
}

function lfFooter(){
  return `
  <footer>
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="brand" style="margin-bottom:10px;">
            <span class="mark" aria-hidden="true"></span>
            <span>LearnForge</span>
          </div>
          <div class="fineprint">All-in-one platform for courses, coaching, digital downloads, and memberships — designed for serious educators and modern learners.</div>
        </div>

        <div>
          <h4>Explore</h4>
          <a href="#pricing">Pricing</a>
          <a href="#demo">Product Demo</a>
          <a href="#integrations">Integrations</a>
        </div>
        <div>
          <h4>Company</h4>
          <a href="#">About us</a>
          <a href="#">Careers</a>
          <a href="#">Partners</a>
          <a href="#">Newsletter</a>
        </div>
        <div>
          <h4>Support</h4>
          <a href="#">Help Center</a>
          <a href="#">Blog</a>
          <a href="#">House Rules</a>
          <a href="#">Content Guidelines</a>
        </div>
        <div>
          <h4>Legal</h4>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
          <a href="#">Cookies Policy</a>
          <a href="#">Accessibility</a>
        </div>
      </div>

      <div class="fineprint">© ${new Date().getFullYear()} LearnForge. Built for global creators. Payments, taxes, and international sales support vary by plan and region.</div>
    </div>
  </footer>`;
}

