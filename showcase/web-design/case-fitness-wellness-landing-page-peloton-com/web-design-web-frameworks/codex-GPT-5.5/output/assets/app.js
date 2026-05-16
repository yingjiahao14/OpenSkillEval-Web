const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

document.addEventListener('DOMContentLoaded', () => {
  const mobileToggle = $('.mobile-toggle');
  const navLinks = $('.nav-links');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', String(open));
    });
  }

  $$('[data-tabs]').forEach(group => {
    const buttons = $$('[data-tab-target]', group);
    const panels = $$('[data-tab-panel]', group);
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const target = button.dataset.tabTarget;
        buttons.forEach(btn => {
          const active = btn === button;
          btn.classList.toggle('active', active);
          btn.setAttribute('aria-selected', String(active));
        });
        panels.forEach(panel => panel.classList.toggle('active', panel.dataset.tabPanel === target));
      });
    });
  });

  $$('.use-case-card').forEach(card => {
    card.addEventListener('click', () => card.classList.toggle('is-open'));
    card.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        card.classList.toggle('is-open');
      }
    });
  });

  $$('.accordion').forEach(accordion => {
    const items = $$('.accordion-item', accordion);
    items.forEach(item => {
      const trigger = $('.accordion-trigger', item);
      const panel = $('.accordion-panel', item);
      if (!trigger || !panel) return;
      const setHeight = () => { panel.style.maxHeight = item.classList.contains('active') ? `${panel.scrollHeight}px` : '0px'; };
      trigger.addEventListener('click', () => {
        items.forEach(other => {
          other.classList.toggle('active', other === item && !item.classList.contains('active'));
          const otherPanel = $('.accordion-panel', other);
          const otherTrigger = $('.accordion-trigger', other);
          if (otherPanel) otherPanel.style.maxHeight = other.classList.contains('active') ? `${otherPanel.scrollHeight}px` : '0px';
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', String(other.classList.contains('active')));
        });
      });
      setHeight();
    });
  });

  const carousel = $('[data-carousel]');
  if (carousel) {
    const track = $('.testimonial-track', carousel);
    const dots = $$('.dot', carousel);
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        track.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach((d, dotIndex) => {
          d.classList.toggle('active', dotIndex === index);
          d.setAttribute('aria-selected', String(dotIndex === index));
        });
      });
    });
  }

  const cookieBanner = $('#cookie-banner');
  if (cookieBanner && !localStorage.getItem('wellstreamCookiePreference')) {
    cookieBanner.style.display = 'block';
    $$('[data-cookie-choice]').forEach(button => {
      button.addEventListener('click', () => {
        localStorage.setItem('wellstreamCookiePreference', button.dataset.cookieChoice);
        cookieBanner.style.display = 'none';
      });
    });
  }

  const demoForm = $('#demo-form');
  if (demoForm) {
    demoForm.addEventListener('submit', event => {
      event.preventDefault();
      let valid = true;
      $$('.error', demoForm).forEach(error => error.textContent = '');
      $$('[required]', demoForm).forEach(field => {
        const error = $(`#${field.id}-error`, demoForm);
        if (!field.value.trim()) {
          valid = false;
          if (error) error.textContent = 'This field is required.';
        } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim())) {
          valid = false;
          if (error) error.textContent = 'Enter a valid business email.';
        }
      });
      const message = $('#form-message', demoForm);
      if (valid) {
        message.className = 'form-message success';
        message.textContent = 'Thank you. Your demo request has been received and our team will follow up shortly.';
        demoForm.reset();
      } else {
        message.className = 'form-message fail';
        message.textContent = 'Please complete the highlighted required fields.';
      }
    });
  }
});
