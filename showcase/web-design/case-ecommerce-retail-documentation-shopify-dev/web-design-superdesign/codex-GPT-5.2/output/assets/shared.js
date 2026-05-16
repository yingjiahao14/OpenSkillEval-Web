function cfSharedInit(currentPageId) {
  const current = currentPageId || '';
  const header = document.querySelector('[data-site-header]');
  if (!header) return;
  const links = header.querySelectorAll('[data-nav]');
  links.forEach((a) => {
    const id = a.getAttribute('data-nav');
    if (id && id === current) a.setAttribute('aria-current', 'page');
  });
}

