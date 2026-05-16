const teamMembers = [
  {
    region: 'North America',
    name: 'Denice Alvarez',
    title: 'Office Manager',
    office: 'New York',
    quote: 'As the Office Manager, I engage with teams from every discipline, and have learned so much through my day-to-day interactions with my fellow leapers.',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80'
  },
  {
    region: 'North America',
    name: 'Marco Bellini',
    title: 'Design Director',
    office: 'San Francisco',
    quote: 'Every day we are delighted by the immense beauty that nature holds. When engaged in the act of creation, it is our responsibility to channel that delight into the things we make.',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80'
  },
  {
    region: 'Asia',
    name: 'Priya Mehta',
    title: 'Studio Head',
    office: 'Bangalore',
    quote: 'We bring your brand vision to life, with transformative ideas and impactful marketing campaigns fueled by creativity and enthusiasm.',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&q=80'
  },
  {
    region: 'Asia',
    name: 'Thierry Lam',
    title: 'Design Lead',
    office: 'Singapore',
    quote: 'Good design is multifaceted. It impacts functionality, aesthetics, strategy, environment, business and so much more. Great design is seamless.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80'
  },
  {
    region: 'Europe',
    name: 'Gavin Hartley',
    title: 'Managing Director',
    office: 'London',
    quote: 'It\'s my job to make sure we innovate and push the boundaries when collaborating with brands to create inspiring customer experiences that deliver great business results.',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80'
  },
  {
    region: 'Europe',
    name: 'Francesca Terzi',
    title: 'Design Director',
    office: 'Munich',
    quote: 'At Leap Studio, I am constantly amazed by the talent I am surrounded with. We love to dream big and bring those dreams to life.',
    photo: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=900&q=80'
  },
  {
    region: 'Oceania',
    name: 'Jacintha Soo Ho',
    title: 'Senior Manager, CX Transformation',
    office: 'Melbourne',
    quote: 'I love helping clients see beyond their assumptions and showing them opportunities they haven\'t thought of before.',
    photo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80'
  }
];

const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const languageWrap = document.querySelector('.language-wrap');
const languageButton = document.querySelector('.language-button');

navToggle.addEventListener('click', () => {
  const isOpen = header.classList.toggle('nav-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.primary-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    header.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

languageButton.addEventListener('click', (event) => {
  event.stopPropagation();
  const isOpen = languageWrap.classList.toggle('open');
  languageButton.setAttribute('aria-expanded', String(isOpen));
});

document.addEventListener('click', () => {
  languageWrap.classList.remove('open');
  languageButton.setAttribute('aria-expanded', 'false');
});

document.querySelectorAll('.language-menu button').forEach((button) => {
  button.addEventListener('click', (event) => {
    languageButton.innerHTML = `${event.currentTarget.textContent} <span aria-hidden="true">⌄</span>`;
  });
});

const slides = Array.from(document.querySelectorAll('.hero-slide'));
const dotsWrap = document.querySelector('.hero-dots');
let activeSlide = 0;
let heroTimer;

slides.forEach((_, index) => {
  const dot = document.createElement('button');
  dot.type = 'button';
  dot.setAttribute('aria-label', `Go to featured slide ${index + 1}`);
  dot.addEventListener('click', () => showSlide(index, true));
  dotsWrap.appendChild(dot);
});

const dots = Array.from(dotsWrap.children);

function showSlide(index, resetTimer = false) {
  activeSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, slideIndex) => slide.classList.toggle('active', slideIndex === activeSlide));
  dots.forEach((dot, dotIndex) => dot.classList.toggle('active', dotIndex === activeSlide));
  if (resetTimer) startHeroTimer();
}

function startHeroTimer() {
  clearInterval(heroTimer);
  heroTimer = setInterval(() => showSlide(activeSlide + 1), 5200);
}

document.querySelector('.hero-controls .carousel-prev').addEventListener('click', () => showSlide(activeSlide - 1, true));
document.querySelector('.hero-controls .carousel-next').addEventListener('click', () => showSlide(activeSlide + 1, true));
showSlide(0);
startHeroTimer();

const teamTrack = document.querySelector('.team-track');
const regionTabs = Array.from(document.querySelectorAll('.region-tabs button'));

function renderTeam(region) {
  teamTrack.innerHTML = '';
  teamMembers
    .filter((member) => member.region === region)
    .forEach((member) => {
      const card = document.createElement('article');
      card.className = 'team-card';
      card.innerHTML = `
        <div class="team-photo" style="background-image: linear-gradient(135deg, rgba(47,125,255,.24), rgba(0,0,0,.08)), url('${member.photo}')"></div>
        <div class="team-content">
          <blockquote>“${member.quote}”</blockquote>
          <div>
            <h3>${member.name}</h3>
            <p>${member.title}</p>
            <p>${member.office}</p>
            <a href="mailto:hello@leapstudio.example">Contact Leap Studio ${member.office}</a>
          </div>
        </div>
      `;
      teamTrack.appendChild(card);
    });
  teamTrack.scrollTo({ left: 0, behavior: 'smooth' });
}

regionTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    regionTabs.forEach((item) => item.setAttribute('aria-selected', 'false'));
    tab.setAttribute('aria-selected', 'true');
    renderTeam(tab.dataset.region);
  });
});

renderTeam('North America');

function scrollTrack(track, direction) {
  const card = track.querySelector('article');
  const distance = card ? card.getBoundingClientRect().width + 20 : 360;
  track.scrollBy({ left: distance * direction, behavior: 'smooth' });
}

document.querySelector('.team-prev').addEventListener('click', () => scrollTrack(teamTrack, -1));
document.querySelector('.team-next').addEventListener('click', () => scrollTrack(teamTrack, 1));

const workTrack = document.querySelector('.work-track');
document.querySelector('.work-prev').addEventListener('click', () => scrollTrack(workTrack, -1));
document.querySelector('.work-next').addEventListener('click', () => scrollTrack(workTrack, 1));

const cookieBanner = document.querySelector('.cookie-banner');
const cookieModal = document.querySelector('.cookie-modal');
const manageButtons = document.querySelectorAll('.manage-cookies, .cookie-settings-link');
const acceptDeclineButtons = document.querySelectorAll('.accept-cookies, .decline-cookies');
const modalClose = document.querySelector('.modal-close');

function hideCookies() {
  cookieBanner.style.display = 'none';
  cookieModal.classList.remove('open');
  cookieModal.setAttribute('aria-hidden', 'true');
  localStorage.setItem('leapCookieChoice', 'set');
}

function openCookieModal() {
  cookieModal.classList.add('open');
  cookieModal.setAttribute('aria-hidden', 'false');
}

if (localStorage.getItem('leapCookieChoice') === 'set') {
  cookieBanner.style.display = 'none';
}

manageButtons.forEach((button) => button.addEventListener('click', openCookieModal));
acceptDeclineButtons.forEach((button) => button.addEventListener('click', hideCookies));
modalClose.addEventListener('click', () => {
  cookieModal.classList.remove('open');
  cookieModal.setAttribute('aria-hidden', 'true');
});

cookieModal.addEventListener('click', (event) => {
  if (event.target === cookieModal) {
    cookieModal.classList.remove('open');
    cookieModal.setAttribute('aria-hidden', 'true');
  }
});
