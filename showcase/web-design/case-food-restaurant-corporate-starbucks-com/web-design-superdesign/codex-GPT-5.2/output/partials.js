function gbHeader(active){
  const is=(id)=>active===id ? 'aria-current="page"' : '';
  return `
  <header class="site-header">
    <div class="container">
      <div class="header-inner">
        <a class="brand" href="index.html" aria-label="GreenBean Coffee Home">
          <div class="logo" aria-hidden="true"></div>
          <div class="brand-name">
            <strong>GreenBean Coffee</strong>
            <span>Your Daily Coffee Ritual</span>
          </div>
        </a>

        <nav class="nav" aria-label="Primary">
          <a href="menu.html" ${is('menu')}>Menu</a>
          <a href="rewards.html" ${is('rewards')}>Rewards</a>
          <a href="gift.html" ${is('gift')}>Gift Cards</a>
          <a href="store-locator.html" ${is('store')}>Find a store</a>
        </nav>

        <div class="header-actions">
          <a class="btn btn-ghost btn-small" href="#" aria-label="Sign in">Sign in</a>
          <a class="btn btn-primary btn-small" href="#" aria-label="Join now">Join now</a>
          <button class="btn btn-ghost btn-small mobile-toggle" type="button" data-mobile-toggle aria-expanded="false" aria-controls="mobileDrawer">
            <span aria-hidden="true">☰</span>
            <span class="sr-only">Open menu</span>
          </button>
        </div>
      </div>

      <div id="mobileDrawer" class="mobile-drawer" data-mobile-drawer>
        <a href="menu.html">Menu <span>→</span></a>
        <a href="rewards.html">Rewards <span>→</span></a>
        <a href="gift.html">Gift Cards <span>→</span></a>
        <a href="store-locator.html">Find a store <span>→</span></a>
        <div style="display:flex;gap:.6rem;flex-wrap:wrap;padding-top:.85rem">
          <a class="btn btn-ghost btn-small" href="#">Sign in</a>
          <a class="btn btn-primary btn-small" href="#">Join now</a>
        </div>
      </div>
    </div>
  </header>`;
}

function gbFooter(){
  const cols = [
    { title:'About Us', links:['Our Company','Our Coffee','About GreenBean','GreenBean Archive','Investor Relations','Customer Service','Contact Us'] },
    { title:'Careers', links:['Culture and Values','Belonging at GreenBean','College Achievement Plan','Alumni Community','U.S. Careers','International Careers'] },
    { title:'Social Impact', links:['Communities','GreenBean Foundation','Sustainability','Environmental and Social Impact Reporting'] },
    { title:'For Business Partners', links:['Landlord Support Center','Suppliers','Corporate Gift Card Sales','Office and Foodservice Coffee'] },
    { title:'Order and Pick Up', links:['Order on the App','Order on the Web','Delivery','Order and Pick Up Options','Explore and Find Coffee for Home'] }
  ];

  const colHtml = cols.map((c,i)=>`
    <div class="footer-col" aria-expanded="${i===0 ? 'true' : 'false'}">
      <h3>${c.title}</h3>
      <button class="footer-acc" type="button" data-footer-acc aria-controls="footerCol${i}">
        <span>${c.title}</span>
        <span aria-hidden="true">▾</span>
      </button>
      <div class="links" id="footerCol${i}">
        ${c.links.map(l=>`<a href="#">${l}</a>`).join('')}
      </div>
    </div>
  `).join('');

  return `
  <footer class="footer">
    <div class="container">
      <div class="footer-grid" aria-label="Footer links">
        ${colHtml}
      </div>
      <div class="footer-meta">
        <div>© ${new Date().getFullYear()} GreenBean Coffee. All rights reserved.</div>
        <div style="display:flex;gap:.75rem;flex-wrap:wrap">
          <a href="#" style="text-decoration:none">Privacy</a>
          <a href="#" style="text-decoration:none">Terms</a>
          <a href="#" style="text-decoration:none">Accessibility</a>
        </div>
      </div>
    </div>
  </footer>`;
}

function gbHead(pageTitle){
  return `
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${pageTitle} · GreenBean Coffee</title>
  <meta name="description" content="GreenBean Coffee — handcrafted beverages, rewards, gift cards, and store locator." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Fraunces:opsz,wght@9..144,600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="styles.css" />
  `;
}
