function orchardIcon(id) {
  if (id === 'chev') {
    return (
      '<svg class="chev" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />' +
      '</svg>'
    );
  }

  if (id === 'arrow-left') {
    return (
      '<svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<path d="M14.5 5.5L8 12l6.5 6.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>' +
      '</svg>'
    );
  }

  if (id === 'arrow-right') {
    return (
      '<svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<path d="M9.5 5.5L16 12l-6.5 6.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>' +
      '</svg>'
    );
  }

  if (id === 'bag') {
    return (
      '<svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<path d="M7 9V7.8C7 5.15 9.15 3 11.8 3h.4C14.85 3 17 5.15 17 7.8V9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>' +
      '<path d="M6.2 9h11.6l.9 11.2c.06.74-.52 1.38-1.26 1.38H6.56c-.74 0-1.32-.64-1.26-1.38L6.2 9Z" stroke="currentColor" stroke-width="1.6" />' +
      '</svg>'
    );
  }

  return '';
}

function orchardHeader(active) {
  return (
    '<header class="topbar">' +
    '  <div class="container topbar-inner">' +
    '    <a class="brand" href="index.html" aria-label="Orchard home">' +
    '      <span class="brand-mark" aria-hidden="true"></span>' +
    '      <span class="brand-name">Orchard</span>' +
    '    </a>' +
    '    <nav class="nav" aria-label="Primary">' +
    '      <a href="store.html" ' +
    (active === 'store' ? 'aria-current="page"' : '') +
    '>Store</a>' +
    '      <a href="shop-laptops.html" ' +
    (active === 'laptops' ? 'aria-current="page"' : '') +
    '>Laptops</a>' +
    '      <a href="shop-tablets.html" ' +
    (active === 'tablets' ? 'aria-current="page"' : '') +
    '>Tablets</a>' +
    '    </nav>' +
    '    <div class="nav-right">' +
    '      <button class="icon-btn" type="button" aria-label="Shopping bag">' +
    orchardIcon('bag') +
    '      </button>' +
    '    </div>' +
    '  </div>' +
    '</header>'
  );
}

function orchardFooter() {
  var columns = [
    {
      title: 'Shop and Learn',
      links: [
        ['Store', 'store.html'],
        ['Laptop', 'shop-laptops.html'],
        ['Tablet', 'shop-tablets.html'],
        ['Phone', 'store.html#phones'],
        ['Smartwatch', 'store.html#watches'],
        ['Headphones', 'store.html#audio'],
        ['Streaming Box', 'store.html#streaming'],
        ['Smart Speaker', 'store.html#audio'],
        ['Tracker', 'store.html#trackers'],
        ['Accessories', 'store.html#accessories'],
        ['Gift Cards', 'store.html#gift-cards'],
      ],
    },
    {
      title: 'Orchard Wallet',
      links: [
        ['Wallet', 'store.html#wallet'],
        ['Orchard Card', 'store.html#card'],
        ['Orchard Pay', 'store.html#pay'],
        ['Orchard Cash', 'store.html#cash'],
      ],
    },
    {
      title: 'Account',
      links: [
        ['Manage Your Account', 'store.html#account'],
        ['Orchard Store Account', 'store.html#account'],
        ['Cloud Account', 'store.html#account'],
      ],
    },
    {
      title: 'Entertainment',
      links: [
        ['Orchard One', 'index.html#entertainment'],
        ['Orchard TV', 'index.html#entertainment'],
        ['Orchard Music', 'index.html#entertainment'],
        ['Orchard Arcade', 'index.html#entertainment'],
        ['Orchard Fitness+', 'index.html#entertainment'],
        ['Orchard News+', 'index.html#entertainment'],
        ['Orchard Podcasts', 'index.html#entertainment'],
      ],
    },
    {
      title: 'Orchard Store',
      links: [
        ['Find a Store', 'store.html#find-store'],
        ['Genius Bar', 'store.html#help'],
        ['Today at Orchard', 'store.html#help'],
        ['Certified Refurbished', 'store.html#savings'],
        ['Orchard Trade In', 'store.html#savings'],
        ['Financing', 'store.html#savings'],
        ['Order Status', 'store.html#quick-links'],
        ['Shopping Help', 'store.html#quick-links'],
      ],
    },
    {
      title: 'For Business',
      links: [
        ['Orchard and Business', 'store.html#business'],
        ['Shop for Business', 'store.html#business'],
      ],
    },
    {
      title: 'For Education',
      links: [
        ['Orchard and Education', 'store.html#education'],
        ['Shop for Education', 'store.html#education'],
      ],
    },
  ];

  function renderLink(link) {
    return '<a href="' + link[1] + '">' + link[0] + '</a>';
  }

  function renderCols() {
    return columns
      .map(function (c) {
        return (
          '<div class="footer-col">' +
          '<h3 class="footer-title">' +
          c.title +
          '</h3>' +
          '<div class="footer-links">' +
          c.links.map(renderLink).join('') +
          '</div>' +
          '</div>'
        );
      })
      .join('');
  }

  function renderAccordion() {
    return columns
      .map(function (c, idx) {
        return (
          '<div class="footer-section" data-footer-section aria-expanded="' +
          (idx === 0 ? 'true' : 'false') +
          '">' +
          '<button class="footer-toggle" type="button" data-footer-toggle>' +
          '<span>' +
          c.title +
          '</span>' +
          orchardIcon('chev') +
          '</button>' +
          '<div class="footer-panel">' +
          c.links.map(renderLink).join('') +
          '</div>' +
          '</div>'
        );
      })
      .join('');
  }

  return (
    '<footer>' +
    '  <div class="container">' +
    '    <div class="footer-grid" aria-label="Footer">' +
    renderCols() +
    '    </div>' +
    '    <div class="footer-accordion" aria-label="Footer">' +
    renderAccordion() +
    '    </div>' +
    '    <div class="footer-legal">' +
    '      <p>0% APR monthly installments subject to credit approval. Terms apply.</p>' +
    '      <p>Trade-in values vary by condition, year, and configuration. Entertainment services require subscription.</p>' +
    '      <p class="muted">Copyright © ' +
    new Date().getFullYear() +
    ' Orchard. All rights reserved.</p>' +
    '    </div>' +
    '  </div>' +
    '</footer>'
  );
}

