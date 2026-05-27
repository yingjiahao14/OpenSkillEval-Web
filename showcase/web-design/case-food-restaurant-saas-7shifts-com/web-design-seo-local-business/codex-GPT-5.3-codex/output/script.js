const $ = (selector, ctx = document) => ctx.querySelector(selector);
const $$ = (selector, ctx = document) => [...ctx.querySelectorAll(selector)];

const mobileToggle = $('#mobileToggle');
const mobileDrawer = $('#mobileDrawer');
const navOverlay = $('#navOverlay');
if (mobileToggle && mobileDrawer && navOverlay) {
  const closeDrawer = () => {
    mobileDrawer.classList.remove('open');
    navOverlay.classList.remove('show');
    mobileToggle.setAttribute('aria-expanded', 'false');
  };
  mobileToggle.addEventListener('click', () => {
    const isOpen = mobileDrawer.classList.toggle('open');
    navOverlay.classList.toggle('show', isOpen);
    mobileToggle.setAttribute('aria-expanded', String(isOpen));
  });
  navOverlay.addEventListener('click', closeDrawer);
  $$('#mobileDrawer a').forEach(link => link.addEventListener('click', closeDrawer));
}

const testimonialData = [
  { quote: 'ShiftWise replaced five different tools for us. Scheduling and communication are finally in one place.', name: 'Maria P.', role: 'Owner, Coastal Bites' },
  { quote: 'Labor alerts helped us avoid overtime surprises and reduce scheduling errors across locations.', name: 'James R.', role: 'Operations Director, Ember Kitchen Group' },
  { quote: 'Our managers save hours every week. The mobile app keeps everyone synced, even during rush service.', name: 'Leah C.', role: 'GM, Root & Flame' }
];
let testimonialIndex = 0;
const tQuote = $('#testimonialQuote');
const tMeta = $('#testimonialMeta');
const renderTestimonial = () => {
  if (!tQuote || !tMeta) return;
  const t = testimonialData[testimonialIndex];
  tQuote.textContent = `“${t.quote}”`;
  tMeta.textContent = `${t.name} — ${t.role}`;
};
const prevBtn = $('#testimonialPrev');
const nextBtn = $('#testimonialNext');
if (prevBtn && nextBtn) {
  renderTestimonial();
  prevBtn.addEventListener('click', () => {
    testimonialIndex = (testimonialIndex - 1 + testimonialData.length) % testimonialData.length;
    renderTestimonial();
  });
  nextBtn.addEventListener('click', () => {
    testimonialIndex = (testimonialIndex + 1) % testimonialData.length;
    renderTestimonial();
  });
}

const counters = $$('.stat strong[data-target]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    let count = 0;
    const step = Math.max(1, Math.floor(target / 60));
    const tick = () => {
      count += step;
      if (count >= target) {
        el.textContent = `${target.toLocaleString()}${suffix}`;
        return;
      }
      el.textContent = `${count.toLocaleString()}${suffix}`;
      requestAnimationFrame(tick);
    };
    tick();
    observer.unobserve(el);
  });
}, { threshold: .4 });
counters.forEach(c => observer.observe(c));

const billingToggle = $('#billingToggle');
if (billingToggle) {
  const prices = {
    monthly: ['0', '29.99', '69.99'],
    annual: ['0', '24.99', '59.99']
  };
  const priceEls = $$('.price-value');
  const periodEls = $$('.price-period');
  billingToggle.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-cycle]');
    if (!button) return;
    $$('#billingToggle button').forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    const cycle = button.dataset.cycle;
    priceEls.forEach((el, idx) => {
      el.textContent = prices[cycle][idx];
    });
    periodEls.forEach(el => {
      el.textContent = cycle === 'monthly' ? '/mo' : '/mo (billed annually)';
    });
  });
}

const faqItems = $$('.faq-item');
faqItems.forEach(item => {
  const q = $('.faq-q', item);
  q?.addEventListener('click', () => {
    faqItems.forEach(other => { if (other !== item) other.classList.remove('open'); });
    item.classList.toggle('open');
  });
});

const contactForm = $('#contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let valid = true;
    const requiredFields = $$('[data-required="true"]', contactForm);
    requiredFields.forEach((field) => {
      const wrapper = field.closest('.field');
      if (!field.value.trim()) {
        valid = false;
        wrapper?.classList.add('invalid');
      } else {
        wrapper?.classList.remove('invalid');
      }
      if (field.type === 'email' && field.value.trim()) {
        const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
        if (!ok) {
          valid = false;
          wrapper?.classList.add('invalid');
        }
      }
    });
    if (!valid) return;
    $('#formSuccess').style.display = 'block';
    contactForm.reset();
  });
}
