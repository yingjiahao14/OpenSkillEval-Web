/* shared.js — GlobalStone interactive behaviors */

// ── Header scroll effect
const header = document.getElementById('site-header');
if (header) {
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ── Mega menu (click/hover)
const servicesTrigger = document.getElementById('services-trigger');
const megaMenu = document.getElementById('mega-menu');

if (servicesTrigger && megaMenu) {
  let megaOpen = false;

  const openMega = () => {
    megaMenu.classList.add('open');
    servicesTrigger.setAttribute('aria-expanded', 'true');
    megaOpen = true;
  };
  const closeMega = () => {
    megaMenu.classList.remove('open');
    servicesTrigger.setAttribute('aria-expanded', 'false');
    megaOpen = false;
  };

  servicesTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    megaOpen ? closeMega() : openMega();
  });

  // Hover intent on nav item
  const navItem = servicesTrigger.closest('.has-mega');
  if (navItem) {
    navItem.addEventListener('mouseenter', openMega);
    navItem.addEventListener('mouseleave', closeMega);
    megaMenu.addEventListener('mouseenter', openMega);
    megaMenu.addEventListener('mouseleave', closeMega);
  }

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!megaMenu.contains(e.target) && e.target !== servicesTrigger) {
      closeMega();
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMega();
  });
}

// ── Mobile menu
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileNav = document.getElementById('mobile-nav');

if (mobileMenuBtn && mobileNav) {
  mobileMenuBtn.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    mobileMenuBtn.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
}

// ── Mobile accordion
document.querySelectorAll('.mobile-acc-trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const content = trigger.nextElementSibling;
    const isOpen = content.classList.contains('open');
    // Close all
    document.querySelectorAll('.mobile-acc-content').forEach(c => c.classList.remove('open'));
    document.querySelectorAll('.mobile-acc-trigger').forEach(t => t.classList.remove('open'));
    // Toggle clicked
    if (!isOpen) {
      content.classList.add('open');
      trigger.classList.add('open');
    }
  });
});

// ── What We Do tabs (homepage)
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tabId = btn.dataset.tab;
    // Deactivate all
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    // Activate target
    btn.classList.add('active');
    const target = document.getElementById('tab-' + tabId);
    if (target) target.classList.add('active');
  });
});

// ── Featured partners carousel (invest page)
const carousel = document.querySelector('.carousel-track');
if (carousel) {
  const slides = carousel.querySelectorAll('.carousel-slide');
  const prev = document.querySelector('.carousel-prev');
  const next = document.querySelector('.carousel-next');
  const dots = document.querySelectorAll('.carousel-dot');
  let current = 0;

  const goTo = (idx) => {
    slides[current].classList.remove('active');
    if (dots[current]) dots[current].classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');
  };

  if (prev) prev.addEventListener('click', () => goTo(current - 1));
  if (next) next.addEventListener('click', () => goTo(current + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  // Auto-advance
  let autoTimer = setInterval(() => goTo(current + 1), 5000);
  carousel.closest('.carousel-wrap')?.addEventListener('mouseenter', () => clearInterval(autoTimer));
  carousel.closest('.carousel-wrap')?.addEventListener('mouseleave', () => {
    autoTimer = setInterval(() => goTo(current + 1), 5000);
  });
}

// ── Newsletter form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  newsletterForm.querySelector('button')?.addEventListener('click', () => {
    const input = newsletterForm.querySelector('input');
    if (input && input.value) {
      input.value = '';
      input.placeholder = 'Thank you for subscribing!';
      setTimeout(() => { input.placeholder = 'Enter your email address'; }, 3000);
    }
  });
}
