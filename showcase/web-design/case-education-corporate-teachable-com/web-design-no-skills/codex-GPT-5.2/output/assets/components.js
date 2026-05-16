function escapeHtml(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function setActiveNav(pageId) {
  const map = {
    home: 'index.html',
    'online-courses': 'online-courses.html',
    'digital-downloads': 'digital-downloads.html',
    memberships: 'memberships.html',
    coaching: 'coaching.html'
  };
  const file = map[pageId];
  if (!file) return;
  document.querySelectorAll('.nav-links a').forEach((a) => {
    const href = a.getAttribute('href');
    if (href === file) a.setAttribute('aria-current', 'page');
  });
}

function renderStatsBar(mountSel) {
  const mount = document.querySelector(mountSel);
  if (!mount || !window.LEARNFORGE_DATA) return;
  const html = window.LEARNFORGE_DATA.stats
    .map(
      (s) =>
        `<div class="stat" data-reveal><strong>${escapeHtml(s.value)}</strong><span>${escapeHtml(
          s.label
        )}</span></div>`
    )
    .join('');
  mount.innerHTML = `<div class="stats">${html}</div>`;
}

function renderIntegrations(mountSel) {
  const mount = document.querySelector(mountSel);
  if (!mount || !window.LEARNFORGE_DATA) return;
  const html = window.LEARNFORGE_DATA.integrations
    .map(
      (name) =>
        `<div class="logo" data-reveal><span><i aria-hidden="true"></i>${escapeHtml(
          name
        )}</span></div>`
    )
    .join('');
  mount.innerHTML = `<div class="logo-grid">${html}</div>`;
}

function renderTestimonialCarousel(mountSel, opts = {}) {
  const mount = document.querySelector(mountSel);
  if (!mount || !window.LEARNFORGE_DATA) return;
  const id = opts.id || mount.id || `carousel-${Math.random().toString(16).slice(2)}`;
  if (!mount.id) mount.id = id;
  mount.setAttribute('data-carousel', '');
  mount.setAttribute('data-autoplay', opts.autoplay === false ? 'false' : 'true');
  mount.setAttribute('data-interval', String(opts.interval || 6500));

  const slides = window.LEARNFORGE_DATA.testimonials
    .slice(0, opts.max || window.LEARNFORGE_DATA.testimonials.length)
    .map(
      (t) => `
        <div class="slide">
          <p class="quote">“${escapeHtml(t.quote)}”</p>
          <div class="who">
            <div>
              <strong>${escapeHtml(t.name)}, ${escapeHtml(t.org)}</strong>
            </div>
            <div class="tag">${escapeHtml(t.title)}</div>
          </div>
        </div>
      `
    )
    .join('');

  const dots = window.LEARNFORGE_DATA.testimonials
    .slice(0, opts.max || window.LEARNFORGE_DATA.testimonials.length)
    .map(
      (_, i) =>
        `<button class="dot-btn" type="button" data-dot="${i}" aria-label="Go to testimonial ${
          i + 1
        }"></button>`
    )
    .join('');

  mount.innerHTML = `
    <div class="carousel" id="${escapeHtml(id)}" data-carousel data-interval="${escapeHtml(
    String(opts.interval || 6500)
  )}">
      <div class="carousel-controls" aria-hidden="false">
        <button class="icon-btn" type="button" data-prev aria-label="Previous testimonial">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14.5 5l-7 7 7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <button class="icon-btn" type="button" data-next aria-label="Next testimonial">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9.5 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      </div>
      <div class="carousel-track">${slides}</div>
      <div class="dots-row">${dots}</div>
    </div>
  `;
}

window.LearnForgeComponents = {
  setActiveNav,
  renderStatsBar,
  renderIntegrations,
  renderTestimonialCarousel
};

