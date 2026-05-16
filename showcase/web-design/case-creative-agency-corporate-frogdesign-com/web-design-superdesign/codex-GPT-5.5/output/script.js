const teamMembers = [
  { region: 'North America', name: 'Denice Alvarez', title: 'Office Manager', office: 'New York', quote: 'As the Office Manager, I engage with teams from every discipline, and have learned so much through my day-to-day interactions with my fellow leapers.', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=80' },
  { region: 'North America', name: 'Marco Bellini', title: 'Design Director', office: 'San Francisco', quote: 'Every day we are delighted by the immense beauty that nature holds. When engaged in the act of creation, it is our responsibility to channel that delight into the things we make.', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=80' },
  { region: 'Asia', name: 'Priya Mehta', title: 'Studio Head', office: 'Bangalore', quote: 'We bring your brand vision to life, with transformative ideas and impactful marketing campaigns fueled by creativity and enthusiasm.', image: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?auto=format&fit=crop&w=700&q=80' },
  { region: 'Asia', name: 'Thierry Lam', title: 'Design Lead', office: 'Singapore', quote: 'Good design is multifaceted. It impacts functionality, aesthetics, strategy, environment, business and so much more. Great design is seamless.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80' },
  { region: 'Europe', name: 'Gavin Hartley', title: 'Managing Director', office: 'London', quote: "It's my job to make sure we innovate and push the boundaries when collaborating with brands to create inspiring customer experiences that deliver great business results.", image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=700&q=80' },
  { region: 'Europe', name: 'Francesca Terzi', title: 'Design Director', office: 'Munich', quote: 'At Leap Studio, I am constantly amazed by the talent I am surrounded with. We love to dream big and bring those dreams to life.', image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=700&q=80' },
  { region: 'Oceania', name: 'Jacintha Soo Ho', title: 'Senior Manager, CX Transformation', office: 'Melbourne', quote: "I love helping clients see beyond their assumptions and showing them opportunities they haven't thought of before.", image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=700&q=80' }
];

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('in');
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

const navToggle = document.querySelector('.nav-toggle');
const primaryNav = document.querySelector('.primary-nav');
navToggle.addEventListener('click', () => {
  const open = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!open));
  primaryNav.classList.toggle('open', !open);
  document.body.classList.toggle('menu-open', !open);
});
primaryNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navToggle.setAttribute('aria-expanded', 'false');
  primaryNav.classList.remove('open');
  document.body.classList.remove('menu-open');
}));

const languageButton = document.querySelector('.language-button');
const languageMenu = document.querySelector('.language-menu');
languageButton.addEventListener('click', (event) => {
  event.stopPropagation();
  const open = languageButton.getAttribute('aria-expanded') === 'true';
  languageButton.setAttribute('aria-expanded', String(!open));
  languageMenu.classList.toggle('open', !open);
});
languageMenu.querySelectorAll('button').forEach((button) => {
  button.addEventListener('click', () => {
    languageButton.querySelector('span').textContent = button.textContent;
    languageButton.setAttribute('aria-expanded', 'false');
    languageMenu.classList.remove('open');
  });
});
document.addEventListener('click', () => {
  languageButton.setAttribute('aria-expanded', 'false');
  languageMenu.classList.remove('open');
});

const heroSlides = [...document.querySelectorAll('.hero-slide')];
const dots = document.querySelector('.dots');
let heroIndex = 0;
let heroTimer;
function showHeroSlide(index) {
  heroIndex = (index + heroSlides.length) % heroSlides.length;
  heroSlides.forEach((slide, slideIndex) => slide.classList.toggle('active', slideIndex === heroIndex));
  dots.querySelectorAll('button').forEach((dot, dotIndex) => dot.classList.toggle('active', dotIndex === heroIndex));
}
function startHeroTimer() {
  clearInterval(heroTimer);
  heroTimer = setInterval(() => showHeroSlide(heroIndex + 1), 6200);
}
heroSlides.forEach((_, index) => {
  const dot = document.createElement('button');
  dot.type = 'button';
  dot.setAttribute('aria-label', `Go to hero slide ${index + 1}`);
  dot.addEventListener('click', () => { showHeroSlide(index); startHeroTimer(); });
  dots.appendChild(dot);
});
document.querySelector('[data-carousel="hero"] [data-prev]').addEventListener('click', () => { showHeroSlide(heroIndex - 1); startHeroTimer(); });
document.querySelector('[data-carousel="hero"] [data-next]').addEventListener('click', () => { showHeroSlide(heroIndex + 1); startHeroTimer(); });
showHeroSlide(0);
startHeroTimer();

const teamTrack = document.querySelector('#team-track');
const regionButtons = [...document.querySelectorAll('.region-tabs button')];
function renderTeam(region) {
  teamTrack.innerHTML = '';
  teamMembers.filter((member) => member.region === region).forEach((member) => {
    const card = document.createElement('article');
    card.className = 'team-card';
    card.innerHTML = `
      <img src="${member.image}" alt="Portrait of ${member.name}" />
      <div class="team-card-content">
        <blockquote>“${member.quote}”</blockquote>
        <h3>${member.name}</h3>
        <p>${member.title} · ${member.office}</p>
        <a href="mailto:hello@leapstudio.example?subject=Contact Leap Studio ${encodeURIComponent(member.office)}">Contact Leap Studio ${member.office}</a>
      </div>
    `;
    teamTrack.appendChild(card);
  });
  teamTrack.scrollTo({ left: 0, behavior: 'smooth' });
}
regionButtons.forEach((button) => {
  button.addEventListener('click', () => {
    regionButtons.forEach((tab) => {
      tab.classList.toggle('active', tab === button);
      tab.setAttribute('aria-selected', String(tab === button));
    });
    renderTeam(button.dataset.region);
  });
});
renderTeam('North America');

document.querySelector('.team-prev').addEventListener('click', () => teamTrack.scrollBy({ left: -460, behavior: 'smooth' }));
document.querySelector('.team-next').addEventListener('click', () => teamTrack.scrollBy({ left: 460, behavior: 'smooth' }));
const workTrack = document.querySelector('#work-track');
document.querySelector('.work-prev').addEventListener('click', () => workTrack.scrollBy({ left: -560, behavior: 'smooth' }));
document.querySelector('.work-next').addEventListener('click', () => workTrack.scrollBy({ left: 560, behavior: 'smooth' }));

const cookieBanner = document.querySelector('.cookie-banner');
const cookieModal = document.querySelector('.cookie-modal');
function hideCookies() {
  cookieBanner.classList.add('hidden');
  cookieModal.classList.remove('open');
  cookieModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}
function openCookieModal() {
  cookieModal.classList.add('open');
  cookieModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}
document.querySelector('.cookie-accept').addEventListener('click', hideCookies);
document.querySelector('.cookie-decline').addEventListener('click', hideCookies);
document.querySelector('.cookie-save').addEventListener('click', hideCookies);
document.querySelector('.cookie-manage').addEventListener('click', openCookieModal);
document.querySelector('.cookie-settings').addEventListener('click', openCookieModal);
document.querySelector('.modal-close').addEventListener('click', () => {
  cookieModal.classList.remove('open');
  cookieModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
});
cookieModal.addEventListener('click', (event) => {
  if (event.target === cookieModal) document.querySelector('.modal-close').click();
});
