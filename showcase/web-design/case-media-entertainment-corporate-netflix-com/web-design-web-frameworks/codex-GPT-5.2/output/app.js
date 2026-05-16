(function(){
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function setAriaExpanded(el, expanded){
    el.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  }

  // FAQ accordion: only one open at a time
  const faqRoot = document.querySelector('[data-faq]');
  if (faqRoot){
    const items = Array.from(faqRoot.querySelectorAll('[data-faq-item]'));

    function closeAll(except){
      items.forEach(item => {
        if (item === except) return;
        setAriaExpanded(item, false);
      });
    }

    items.forEach((item, idx) => {
      const btn = item.querySelector('[data-faq-q]');
      if (!btn) return;

      btn.addEventListener('click', () => {
        const isOpen = item.getAttribute('aria-expanded') === 'true';
        closeAll(item);
        setAriaExpanded(item, !isOpen);
      });

      // Keyboard support: Enter/Space already handled by button
      if (idx === 0) setAriaExpanded(item, true);
    });
  }

  // Trending carousel controls
  const scroller = document.querySelector('[data-carousel]');
  if (scroller){
    const nextBtn = document.querySelector('[data-carousel-next]');
    const prevBtn = document.querySelector('[data-carousel-prev]');

    function updateDisabled(){
      const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;
      const atStart = scroller.scrollLeft <= 2;
      const atEnd = scroller.scrollLeft >= (maxScrollLeft - 2);
      if (prevBtn) prevBtn.disabled = atStart;
      if (nextBtn) nextBtn.disabled = atEnd;
    }

    function getStep(){
      const card = scroller.querySelector('[data-card]');
      if (!card) return 320;
      const styles = window.getComputedStyle(scroller);
      const gap = parseFloat(styles.columnGap || styles.gap || '12') || 12;
      return card.getBoundingClientRect().width + gap;
    }

    function scrollByCards(dir){
      const step = getStep();
      scroller.scrollBy({ left: dir * step * 2, behavior: prefersReduced ? 'auto' : 'smooth' });
    }

    if (nextBtn) nextBtn.addEventListener('click', () => scrollByCards(1));
    if (prevBtn) prevBtn.addEventListener('click', () => scrollByCards(-1));

    scroller.addEventListener('scroll', () => window.requestAnimationFrame(updateDisabled), { passive:true });
    window.addEventListener('resize', updateDisabled);
    updateDisabled();
  }

  // Email capture buttons (no backend): basic validation + friendly feedback
  function wireEmailForm(form){
    if (!form) return;
    const input = form.querySelector('input[type="email"]');
    const btn = form.querySelector('button[type="submit"]');
    const msg = form.querySelector('[data-email-msg]');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = (input && input.value || '').trim();
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!ok){
        if (msg) msg.textContent = 'Please enter a valid email address.';
        if (input) input.focus();
        return;
      }
      if (msg) msg.textContent = 'Great — check your inbox to continue.';
      if (btn){
        btn.textContent = 'Saved';
        btn.disabled = true;
      }
      if (input) input.disabled = true;

      // Reset after a bit for demo
      window.setTimeout(() => {
        if (btn){
          btn.textContent = 'Get Started ›';
          btn.disabled = false;
        }
        if (input){
          input.disabled = false;
          input.value = '';
        }
        if (msg) msg.textContent = '';
      }, 3200);
    });
  }

  wireEmailForm(document.querySelector('[data-email-form="hero"]'));
  wireEmailForm(document.querySelector('[data-email-form="cta"]'));

  // Login form: validate required + simple message
  const loginForm = document.querySelector('[data-login-form]');
  if (loginForm){
    const email = loginForm.querySelector('input[name="identifier"]');
    const pass = loginForm.querySelector('input[name="password"]');
    const msg = loginForm.querySelector('[data-login-msg]');

    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const idv = (email && email.value || '').trim();
      const pv = (pass && pass.value || '').trim();
      if (!idv || !pv){
        if (msg) msg.textContent = 'Please enter your email/mobile and password.';
        ( !idv && email ? email : pass )?.focus?.();
        return;
      }
      if (msg) msg.textContent = 'Signing in… (demo)';
      window.setTimeout(() => {
        if (msg) msg.textContent = 'Success (demo). Redirecting…';
        window.setTimeout(() => { window.location.href = 'index.html'; }, 900);
      }, 700);
    });
  }

  // Get help toggle
  const help = document.querySelector('[data-help]');
  if (help){
    const btn = help.querySelector('[data-help-btn]');
    if (btn){
      btn.addEventListener('click', () => {
        const expanded = help.getAttribute('aria-expanded') === 'true';
        setAriaExpanded(help, !expanded);
      });
    }
  }
})();
