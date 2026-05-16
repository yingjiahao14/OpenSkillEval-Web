(function () {
  const current = document.documentElement.getAttribute('data-page');
  if (!current) return;
  const selector = `[data-nav="${current}"]`;
  const link = document.querySelector(selector);
  if (link) link.setAttribute('aria-current', 'page');
})();

