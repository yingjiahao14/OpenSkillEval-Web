const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

const donateModal = document.getElementById('donateModal');
const donateTriggers = [
  document.getElementById('heroDonateBtn'),
  document.getElementById('headerDonateBtn'),
  document.getElementById('ctaDonateBtn')
];
const closeModal = document.getElementById('closeModal');
const modalBackdrop = document.getElementById('modalBackdrop');

function openModal() {
  donateModal.classList.add('open');
  donateModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function hideModal() {
  donateModal.classList.remove('open');
  donateModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

donateTriggers.forEach(btn => btn.addEventListener('click', openModal));
closeModal.addEventListener('click', hideModal);
modalBackdrop.addEventListener('click', hideModal);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && donateModal.classList.contains('open')) hideModal();
});

const accordionTriggers = document.querySelectorAll('.accordion-trigger');
accordionTriggers.forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const parent = trigger.parentElement;
    const active = parent.classList.contains('active');
    document.querySelectorAll('.accordion-item').forEach(item => {
      item.classList.remove('active');
      item.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
    });
    if (!active) {
      parent.classList.add('active');
      trigger.setAttribute('aria-expanded', 'true');
    }
  });
});

const newsTrack = document.getElementById('newsTrack');
const prevNews = document.getElementById('prevNews');
const nextNews = document.getElementById('nextNews');
const totalNews = newsTrack.children.length;
let newsIndex = 0;

function updateCarousel() {
  newsTrack.style.transform = `translateX(-${newsIndex * 100}%)`;
}

nextNews.addEventListener('click', () => {
  newsIndex = (newsIndex + 1) % totalNews;
  updateCarousel();
});

prevNews.addEventListener('click', () => {
  newsIndex = (newsIndex - 1 + totalNews) % totalNews;
  updateCarousel();
});

const statEls = document.querySelectorAll('.stat-number');
function animateStat(el) {
  const target = Number(el.dataset.target);
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  const duration = 1400;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const value = Math.floor(progress * target);

    let displayValue = value;
    if (suffix === 'M') displayValue = (value / 1000000).toFixed(value >= 10000000 ? 0 : 1);
    if (suffix === 'K') displayValue = (value / 1000).toFixed(0);

    el.textContent = `${prefix}${displayValue}${suffix}`;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateStat(entry.target);
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.45 });

statEls.forEach(stat => observer.observe(stat));

const customAmount = document.getElementById('customAmount');
const amountRadios = document.querySelectorAll('input[name="amount"]');
amountRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    customAmount.disabled = radio.value !== 'custom' || !radio.checked;
    if (radio.value === 'custom' && radio.checked) customAmount.focus();
  });
});
customAmount.disabled = true;
