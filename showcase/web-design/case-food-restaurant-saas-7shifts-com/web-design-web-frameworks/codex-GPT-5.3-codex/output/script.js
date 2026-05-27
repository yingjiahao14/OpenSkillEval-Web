const drawerBtn = document.querySelector('[data-mobile-toggle]');
const drawer = document.querySelector('[data-mobile-drawer]');
if (drawerBtn && drawer) {
  drawerBtn.addEventListener('click', () => {
    drawer.classList.toggle('open');
  });
}

document.querySelectorAll('[data-count]').forEach((item) => {
  const target = Number(item.dataset.count || 0);
  const suffix = item.dataset.suffix || '';
  let start = 0;
  const step = Math.max(1, Math.ceil(target / 60));
  function tick() {
    start += step;
    if (start >= target) {
      item.textContent = target.toLocaleString() + suffix;
      return;
    }
    item.textContent = start.toLocaleString() + suffix;
    requestAnimationFrame(tick);
  }
  tick();
});

const testimonials = [
  {
    quote: 'ShiftWise cut our scheduling time from 6 hours to 30 minutes every week. It\'s been a game-changer for our three-location operation.',
    author: 'Maria Gonzalez, General Manager, Fuego Kitchen'
  },
  {
    quote: 'The compliance alerts alone have saved us from costly violations. I sleep better knowing ShiftWise has our back.',
    author: 'David Lee, Owner, Harbor House Grill'
  },
  {
    quote: 'Our team communication is finally in one place, and shift swaps happen without manager chaos.',
    author: 'Aisha Patel, Operations Director, Urban Plate Co.'
  }
];
let tIndex = 0;
const qEl = document.querySelector('[data-testimonial-quote]');
const aEl = document.querySelector('[data-testimonial-author]');
function paintTestimonial() {
  if (!qEl || !aEl) return;
  qEl.textContent = '“' + testimonials[tIndex].quote + '”';
  aEl.textContent = testimonials[tIndex].author;
}
const prevBtn = document.querySelector('[data-testimonial-prev]');
const nextBtn = document.querySelector('[data-testimonial-next]');
if (prevBtn && nextBtn) {
  paintTestimonial();
  prevBtn.addEventListener('click', () => {
    tIndex = (tIndex - 1 + testimonials.length) % testimonials.length;
    paintTestimonial();
  });
  nextBtn.addEventListener('click', () => {
    tIndex = (tIndex + 1) % testimonials.length;
    paintTestimonial();
  });
}

const toggleBtns = document.querySelectorAll('[data-billing]');
const starter = document.querySelector('[data-price-starter]');
const premium = document.querySelector('[data-price-premium]');
function setBilling(mode) {
  toggleBtns.forEach((btn) => btn.classList.toggle('active', btn.dataset.billing === mode));
  if (!starter || !premium) return;
  if (mode === 'annual') {
    starter.textContent = '$23.99';
    premium.textContent = '$55.99';
  } else {
    starter.textContent = '$29.99';
    premium.textContent = '$69.99';
  }
}
toggleBtns.forEach((btn) => btn.addEventListener('click', () => setBilling(btn.dataset.billing)));

const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach((item) => {
  const q = item.querySelector('.faq-q');
  if (!q) return;
  q.addEventListener('click', () => {
    faqItems.forEach((other) => other.classList.remove('open'));
    item.classList.add('open');
  });
});

const contactForm = document.querySelector('[data-contact-form]');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const required = ['name', 'email', 'message'];
    let valid = true;
    required.forEach((field) => {
      const input = contactForm.querySelector(`[name="${field}"]`);
      const error = contactForm.querySelector(`[data-error="${field}"]`);
      if (!input || !error) return;
      if (!input.value.trim()) {
        error.textContent = 'This field is required.';
        valid = false;
      } else if (field === 'email' && !/^\S+@\S+\.\S+$/.test(input.value)) {
        error.textContent = 'Enter a valid email address.';
        valid = false;
      } else {
        error.textContent = '';
      }
    });

    const success = contactForm.querySelector('[data-success]');
    if (valid && success) {
      success.style.display = 'block';
      contactForm.reset();
    } else if (success) {
      success.style.display = 'none';
    }
  });
}
