document.querySelectorAll('[data-faq]').forEach((faqWrap) => {
  faqWrap.querySelectorAll('.faq-item').forEach((item) => {
    item.querySelector('.faq-q')?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqWrap.querySelectorAll('.faq-item').forEach((node) => node.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
});

document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const track = carousel.querySelector('.carousel-track');
  const slides = Array.from(carousel.querySelectorAll('.slide'));
  if (!track || !slides.length) return;
  let index = 0;
  const draw = () => track.style.transform = `translateX(-${index * 100}%)`;
  carousel.querySelector('[data-prev]')?.addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length;
    draw();
  });
  carousel.querySelector('[data-next]')?.addEventListener('click', () => {
    index = (index + 1) % slides.length;
    draw();
  });
  setInterval(() => {
    index = (index + 1) % slides.length;
    draw();
  }, 5500);
});

const heroTabs = document.querySelector('[data-hero-tabs]');
if (heroTabs) {
  const btns = heroTabs.querySelectorAll('.tab-btn');
  const title = document.querySelector('[data-hero-title]');
  const text = document.querySelector('[data-hero-text]');
  const list = document.querySelector('[data-hero-list]');
  const content = {
    creator: {
      title: 'Build and scale your creator business',
      text: 'Create courses, coaching, downloads, and memberships with one integrated platform built for growth.',
      points: ['AI-powered curriculum tools', 'Upsells and checkout optimization', 'Advanced analytics and CRM sync']
    },
    student: {
      title: 'Deliver a premium student learning experience',
      text: 'Engage learners with mobile-first lessons, interactive content, and seamless progress tracking.',
      points: ['On-the-go lesson access', 'Community and live session support', 'Personalized student dashboards']
    }
  };
  const render = (key) => {
    const data = content[key];
    title.textContent = data.title;
    text.textContent = data.text;
    list.innerHTML = data.points.map((p) => `<li>${p}</li>`).join('');
    btns.forEach((button) => button.classList.toggle('active', button.dataset.tab === key));
  };
  btns.forEach((button) => button.addEventListener('click', () => render(button.dataset.tab)));
  render('creator');
}

document.querySelectorAll('[data-feature-tabs]').forEach((wrap) => {
  const buttons = wrap.querySelectorAll('.tab-btn');
  const title = wrap.querySelector('[data-ft-title]');
  const desc = wrap.querySelector('[data-ft-desc]');
  const items = wrap.querySelector('[data-ft-items]');
  const map = {
    creators: {
      title: 'Built for creators who demand velocity',
      desc: 'Launch quickly without sacrificing depth, brand control, or advanced growth tooling.',
      items: ['Drag-and-drop course builders', 'Automated upsells and order bumps', 'Intuitive 3rd-party app integrations']
    },
    students: {
      title: 'Experiences students keep coming back for',
      desc: 'Design immersive learning journeys that increase completion and customer lifetime value.',
      items: ['Innovative student dashboard', 'Progress-based learning paths', 'Multi-device seamless playback']
    },
    teams: {
      title: 'Operational control for scaling teams',
      desc: 'Get the insight and workflows needed to run a serious digital knowledge business.',
      items: ['Role-based admin tools', 'Revenue and cohort analytics', 'Integrated support and automation']
    }
  };
  const render = (key) => {
    const data = map[key];
    title.textContent = data.title;
    desc.textContent = data.desc;
    items.innerHTML = data.items.map((it) => `<li>${it}</li>`).join('');
    buttons.forEach((button) => button.classList.toggle('active', button.dataset.tab === key));
  };
  buttons.forEach((button) => button.addEventListener('click', () => render(button.dataset.tab)));
  render('creators');
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('in');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach((node) => observer.observe(node));
