(function () {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  function initMobileNav() {
    const toggle = $('.mobile-toggle');
    const links = $('.nav-links');
    if (!toggle || !links) return;
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  function initTabs() {
    $$('.tabs').forEach((tabs) => {
      const buttons = $$('[data-tab-target]', tabs);
      const panels = $$('[data-tab-panel]', tabs);
      buttons.forEach((button) => {
        button.addEventListener('click', () => {
          const target = button.dataset.tabTarget;
          buttons.forEach((item) => {
            const active = item === button;
            item.classList.toggle('active', active);
            item.setAttribute('aria-selected', String(active));
          });
          panels.forEach((panel) => {
            const active = panel.dataset.tabPanel === target;
            panel.classList.toggle('active', active);
            panel.toggleAttribute('hidden', !active);
          });
        });
      });
    });
  }

  function initAccordion() {
    $$('.accordion').forEach((accordion) => {
      const items = $$('.accordion-item', accordion);
      items.forEach((item) => {
        const trigger = $('.accordion-trigger', item);
        const panel = $('.accordion-panel', item);
        if (!trigger || !panel) return;
        trigger.addEventListener('click', () => {
          const willOpen = !item.classList.contains('active');
          items.forEach((other) => {
            const otherPanel = $('.accordion-panel', other);
            other.classList.remove('active');
            $('.accordion-trigger', other)?.setAttribute('aria-expanded', 'false');
            if (otherPanel) otherPanel.style.maxHeight = '0px';
          });
          if (willOpen) {
            item.classList.add('active');
            trigger.setAttribute('aria-expanded', 'true');
            panel.style.maxHeight = panel.scrollHeight + 'px';
          }
        });
      });
      const first = $('.accordion-item.active', accordion);
      if (first) {
        const panel = $('.accordion-panel', first);
        $('.accordion-trigger', first)?.setAttribute('aria-expanded', 'true');
        if (panel) panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  }

  function initCarousel() {
    $$('.carousel').forEach((carousel) => {
      const track = $('.carousel-track', carousel);
      const dots = $$('.dot', carousel);
      if (!track || !dots.length) return;
      dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
          track.style.transform = `translateX(-${index * 100}%)`;
          dots.forEach((item, dotIndex) => {
            item.classList.toggle('active', dotIndex === index);
            item.setAttribute('aria-label', `Show testimonial ${dotIndex + 1}`);
          });
        });
      });
    });
  }

  function initCookieBanner() {
    const banner = $('.cookie-banner');
    if (!banner) return;
    const stored = localStorage.getItem('wellstream_cookie_preference');
    if (!stored) banner.classList.add('active');
    $$('[data-cookie-choice]', banner).forEach((button) => {
      button.addEventListener('click', () => {
        localStorage.setItem('wellstream_cookie_preference', button.dataset.cookieChoice || 'unknown');
        banner.classList.remove('active');
      });
    });
  }

  function initDemoForm() {
    const form = $('#demo-form');
    if (!form) return;
    const success = $('.form-success');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      let valid = true;
      $$('[data-required]', form).forEach((field) => {
        const wrapper = field.closest('.field');
        const error = $('.error-text', wrapper);
        const value = field.value.trim();
        let message = '';
        if (!value) message = 'This field is required.';
        if (field.type === 'email' && value && !emailPattern.test(value)) message = 'Enter a valid business email.';
        wrapper.classList.toggle('invalid', Boolean(message));
        if (error) error.textContent = message;
        if (message) valid = false;
      });
      if (!valid) {
        success?.classList.remove('active');
        const firstInvalid = $('.field.invalid input, .field.invalid select, .field.invalid textarea', form);
        firstInvalid?.focus();
        return;
      }
      success?.classList.add('active');
      form.reset();
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();
    initTabs();
    initAccordion();
    initCarousel();
    initCookieBanner();
    initDemoForm();
  });
})();
