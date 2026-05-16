const heroSlides = [...document.querySelectorAll('.hero-slide')];
let heroIndex = 0;
const showHero = (index) => {
  heroSlides.forEach((slide, i) => slide.classList.toggle('active', i === index));
};
const nextHero = () => {
  heroIndex = (heroIndex + 1) % heroSlides.length;
  showHero(heroIndex);
};
document.getElementById('heroNext').addEventListener('click', nextHero);
document.getElementById('heroPrev').addEventListener('click', () => {
  heroIndex = (heroIndex - 1 + heroSlides.length) % heroSlides.length;
  showHero(heroIndex);
});
setInterval(nextHero, 5500);

const teamData = {
  'north-america': [
    { name: 'Maya Rodriguez', title: 'Executive Creative Director', office: 'New York', quote: 'We design for measurable emotion and meaningful growth.', photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=700&q=80' },
    { name: 'Ethan Brooks', title: 'Partner, Experience Strategy', office: 'San Francisco', quote: 'The best strategy is tangible, not theoretical.', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=80' }
  ],
  asia: [
    { name: 'Aiko Tan', title: 'Design Principal', office: 'Singapore', quote: 'Craft and velocity are not trade-offs, they are partners.', photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=700&q=80' },
    { name: 'Ravi Menon', title: 'Innovation Lead', office: 'Singapore', quote: 'We prototype tomorrow in weeks, not quarters.', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=700&q=80' }
  ],
  europe: [
    { name: 'Sofia Klein', title: 'Service Design Director', office: 'Munich', quote: 'Elegance appears when complexity is made human.', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=700&q=80' },
    { name: 'Oliver Hayes', title: 'Client Partner', office: 'London', quote: 'Transformation needs brave decisions and practical delivery.', photo: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=700&q=80' }
  ],
  oceania: [
    { name: 'Chloe Martin', title: 'Head of Brand Experience', office: 'Melbourne', quote: 'Brand is the system that shapes every interaction.', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=700&q=80' },
    { name: 'Noah Fitzgerald', title: 'Transformation Consultant', office: 'Melbourne', quote: 'We help teams move from ambiguity to aligned action.', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80' }
  ]
};

let currentRegion = 'north-america';
let teamStart = 0;
const teamTrack = document.getElementById('teamTrack');

function renderTeam() {
  const members = teamData[currentRegion];
  const ordered = [...members.slice(teamStart), ...members.slice(0, teamStart)];
  teamTrack.innerHTML = ordered.map(member => `
    <article class="team-card">
      <img src="${member.photo}" alt="${member.name}" loading="lazy" />
      <blockquote>“${member.quote}”</blockquote>
      <h3>${member.name}</h3>
      <p>${member.title}</p>
      <p>${member.office} · <a href="#footer">Contact office</a></p>
    </article>
  `).join('');
}

for (const tab of document.querySelectorAll('.region-tab')) {
  tab.addEventListener('click', () => {
    currentRegion = tab.dataset.region;
    teamStart = 0;
    document.querySelectorAll('.region-tab').forEach(button => {
      const isActive = button === tab;
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-selected', String(isActive));
    });
    renderTeam();
  });
}

document.getElementById('teamNext').addEventListener('click', () => {
  const length = teamData[currentRegion].length;
  teamStart = (teamStart + 1) % length;
  renderTeam();
});

document.getElementById('teamPrev').addEventListener('click', () => {
  const length = teamData[currentRegion].length;
  teamStart = (teamStart - 1 + length) % length;
  renderTeam();
});
renderTeam();

const navToggle = document.getElementById('navToggle');
const primaryNav = document.getElementById('primaryNav');
navToggle.addEventListener('click', () => {
  const open = primaryNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});

const langToggle = document.getElementById('langToggle');
const langMenu = document.getElementById('langMenu');
langToggle.addEventListener('click', () => {
  const open = langMenu.classList.toggle('open');
  langToggle.setAttribute('aria-expanded', String(open));
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.lang-wrap')) {
    langMenu.classList.remove('open');
    langToggle.setAttribute('aria-expanded', 'false');
  }
});

const cookieBanner = document.getElementById('cookieBanner');
const cookieState = localStorage.getItem('leap-cookie-choice');
if (!cookieState) setTimeout(() => cookieBanner.classList.add('show'), 800);
for (const button of document.querySelectorAll('[data-cookie]')) {
  button.addEventListener('click', () => {
    localStorage.setItem('leap-cookie-choice', button.dataset.cookie);
    cookieBanner.classList.remove('show');
  });
}
