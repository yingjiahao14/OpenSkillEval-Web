(function(){
  const q = (sel, root=document) => root.querySelector(sel);
  const qa = (sel, root=document) => Array.from(root.querySelectorAll(sel));

  const escapeHtml = (s) => String(s)
    .replaceAll('&','&amp;')
    .replaceAll('<','&lt;')
    .replaceAll('>','&gt;')
    .replaceAll('"','&quot;')
    .replaceAll("'",'&#39;');

  const currentFile = () => {
    const p = location.pathname.split('/').pop();
    return p || 'index.html';
  };

  const isActive = (href) => {
    const cf = currentFile();
    return (href === cf) || (href === 'index.html' && cf === '');
  };

  const renderNav = () => {
    const el = q('[data-render="nav"]');
    if (!el) return;

    const links = LearnForge.NAV.map(item => {
      const active = isActive(item.href);
      return `<a href="${item.href}" ${active ? 'aria-current="page"' : ''}>${escapeHtml(item.label)}</a>`;
    }).join('');

    el.innerHTML = `
      <div class="nav-wrap">
        <div class="container">
          <div class="nav" data-nav data-open="false">
            <a class="brand" href="index.html" aria-label="LearnForge home">
              <div class="logo" aria-hidden="true"></div>
              <span>LearnForge</span>
            </a>
            <div class="nav-links" aria-label="Primary">
              ${links}
            </div>
            <div class="nav-cta">
              <a class="btn btn-secondary" href="index.html#pricing">Explore Plans</a>
              <a class="btn btn-primary" href="#free-trial">Start Free Trial</a>
              <button class="btn btn-secondary menu-btn" data-nav-toggle aria-expanded="false" aria-label="Toggle menu">
                <span style="font-weight:900">Menu</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  const renderStats = () => {
    qa('[data-render="stats"]').forEach((el) => {
      el.innerHTML = `
        <div class="stats" data-animate>
          ${LearnForge.STATS.map(s => `
            <div class="stat">
              <div class="big">${escapeHtml(s.big)}</div>
              <div class="label">${escapeHtml(s.label)}</div>
            </div>
          `).join('')}
        </div>
      `;
    });
  };

  const renderIntegrations = () => {
    qa('[data-render="integrations"]').forEach((el) => {
      const max = Number(el.getAttribute('data-limit') || '18');
      const list = LearnForge.INTEGRATIONS.slice(0, max);
      el.innerHTML = `
        <div class="logos" data-animate>
          ${list.map(name => `<div class="logo-pill">${escapeHtml(name)}</div>`).join('')}
        </div>
      `;
    });
  };

  const renderTestimonials = () => {
    qa('[data-render="testimonials"]').forEach((el) => {
      const picksAttr = el.getAttribute('data-picks');
      const picks = picksAttr ? picksAttr.split(',').map(s => Number(s.trim())).filter(n => Number.isFinite(n)) : [];
      const items = picks.length
        ? picks.map(i => LearnForge.TESTIMONIALS[i]).filter(Boolean)
        : LearnForge.TESTIMONIALS;

      const slides = items.map(t => `
        <div class="slide" data-slide>
          <div class="surface card">
            <div class="tag"><b>${escapeHtml(t.headline)}</b></div>
            <p class="mt-16" style="margin-bottom:0;color:rgba(11,16,32,.78);font-weight:650">“${escapeHtml(t.quote)}”</p>
            <div class="mt-16" style="display:flex;justify-content:space-between;gap:10px;align-items:center">
              <div>
                <div style="font-weight:900">${escapeHtml(t.name)}</div>
                <div class="muted" style="font-weight:700">${escapeHtml(t.org)}</div>
              </div>
              <div class="pill" aria-hidden="true"><span class="dot"></span><span style="font-weight:900">Verified</span></div>
            </div>
          </div>
        </div>
      `).join('');

      el.innerHTML = `
        <div class="carousel" data-carousel data-autoplay="true" data-animate>
          <div class="carousel-track" data-track>
            ${slides}
          </div>
          <div class="carousel-controls">
            <button class="icon-btn" type="button" data-prev aria-label="Previous testimonial">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button class="icon-btn" type="button" data-next aria-label="Next testimonial">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>
      `;
    });
  };

  const renderFaq = () => {
    qa('[data-render="faq"]').forEach((el) => {
      const variant = el.getAttribute('data-variant') || 'generic';
      const items = variant === 'home' ? LearnForge.FAQ_HOME : LearnForge.FAQ_GENERIC;
      el.innerHTML = `
        <div class="accordion" data-accordion data-animate>
          ${items.map((it, idx) => `
            <div class="acc-item" data-acc-item data-open="${idx === 0 ? 'true' : 'false'}">
              <button class="acc-btn" type="button" data-acc-btn>
                <span>${escapeHtml(it.q)}</span>
                <svg class="chev" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
              </button>
              <div class="acc-panel"><div class="inner">${escapeHtml(it.a)}</div></div>
            </div>
          `).join('')}
        </div>
      `;
    });
  };

  const renderFooter = () => {
    const el = q('[data-render="footer"]');
    if (!el) return;
    const cols = Object.entries(LearnForge.FOOTER).map(([title, links]) => {
      return `
        <div>
          <div style="font-weight:900;margin-bottom:8px">${escapeHtml(title)}</div>
          ${links.map(l => `<a href="#">${escapeHtml(l)}</a>`).join('')}
        </div>
      `;
    }).join('');
    el.innerHTML = `
      <footer>
        <div class="container">
          <div class="footer-grid">
            <div>
              <a class="brand" href="index.html" style="margin-bottom:10px">
                <div class="logo" aria-hidden="true"></div>
                <span>LearnForge</span>
              </a>
              <div class="muted" style="max-width:44ch">
                Build and sell online courses, coaching, digital downloads, and memberships—powered by modern automation and built for global scale.
              </div>
              <div class="mt-16" style="display:flex;gap:10px;flex-wrap:wrap">
                <a class="btn btn-primary" href="#free-trial">Start Free Trial</a>
                <a class="btn btn-secondary" href="index.html#pricing">Explore Plans</a>
              </div>
            </div>
            ${cols}
          </div>
          <div class="fineprint">© ${new Date().getFullYear()} LearnForge. All rights reserved.</div>
        </div>
      </footer>
    `;
  };

  const renderTrialAnchor = () => {
    qa('[data-render="trial"]').forEach((el) => {
      el.innerHTML = `
        <div class="surface card" id="free-trial" data-animate>
          <div class="kicker">Start free</div>
          <div class="h2" style="margin:8px 0 10px">Launch your next product in days—not months.</div>
          <p class="lead" style="margin:0 0 16px">Start a 7-day free trial. No pressure—pick the plan when you’re ready.</p>
          <div class="hero-actions">
            <a class="btn btn-primary" href="#">Start Free Trial</a>
            <a class="btn btn-secondary" href="index.html#pricing">Explore Plans</a>
          </div>
        </div>
      `;
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    renderNav();
    renderStats();
    renderIntegrations();
    renderTestimonials();
    renderFaq();
    renderTrialAnchor();
    renderFooter();
  });
})();

