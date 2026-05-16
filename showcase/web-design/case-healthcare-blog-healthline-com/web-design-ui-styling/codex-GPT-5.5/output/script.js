const navItems = document.querySelectorAll('.nav-item');
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

function closeMenus(exceptItem = null) {
  navItems.forEach((item) => {
    if (item !== exceptItem) {
      item.classList.remove('open');
      const trigger = item.querySelector('.nav-trigger');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    }
  });
}

navItems.forEach((item) => {
  const trigger = item.querySelector('.nav-trigger');
  trigger.addEventListener('click', (event) => {
    event.stopPropagation();
    const isOpen = item.classList.contains('open');
    closeMenus(item);
    item.classList.toggle('open', !isOpen);
    trigger.setAttribute('aria-expanded', String(!isOpen));
  });
});

document.addEventListener('click', () => closeMenus());
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenus();
});

mobileMenu.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  mobileMenu.setAttribute('aria-expanded', String(isOpen));
});

const carousel = document.getElementById('topics-carousel');
document.getElementById('topics-prev').addEventListener('click', () => {
  carousel.scrollBy({ left: -420, behavior: 'smooth' });
});
document.getElementById('topics-next').addEventListener('click', () => {
  carousel.scrollBy({ left: 420, behavior: 'smooth' });
});

const baseArticles = [
  '16 Superfoods That Are Worthy of the Title',
  'Does Ozempic Cause Hair Loss?',
  'Prescription Drug Content on Social Media Often Misleading, Study Finds',
  'Can Music Therapy Help with Depression?',
  'Why Am I Craving So Much Salt?',
  'These Are the 8 Best Calorie Counter Apps'
];

const articleData = {
  'Top Reads': baseArticles.map((title, index) => ({ title, tag: ['Nutrition', 'Medication', 'Health News', 'Mental Health', 'Wellness', 'Apps'][index], summary: 'A clear, expert-reviewed guide to help you understand your options and next steps.' })),
  Fitness: [
    'Day 12: Resistance Band Moves You Can Do in 10 Minutes',
    'Can You Run a Marathon … with POTS?',
    'How Zone 2 Walks Support Heart Health',
    'A Beginner Strength Plan That Fits Busy Mornings',
    'Stretching Myths Physical Therapists Want You to Know',
    'Is Floor Sitting the New Standing? This Unique Desk Surprised Us'
  ].map((title) => ({ title, tag: 'Fitness', summary: 'Movement advice that is approachable, realistic, and designed for everyday bodies.' })),
  'Mental Well-Being': [
    'Can Music Therapy Help with Depression?',
    'How to Start a Calming Evening Routine',
    'Signs Stress Is Showing Up in Your Body',
    'What Therapists Say About Micro-Breaks',
    'How to Talk With Your Doctor About Anxiety',
    'The Science Behind Better Sleep Hygiene'
  ].map((title) => ({ title, tag: 'Mental Well-Being', summary: 'Supportive insights for emotional health, stress, sleep, and daily resilience.' })),
  'Product Reviews': [
    'These Are the 8 Best Calorie Counter Apps',
    'Is Floor Sitting the New Standing? This Unique Desk Surprised Us',
    'The Best Home Blood Pressure Monitors Reviewed',
    'Editor-Tested Pill Organizers for Travel',
    'Smart Scales: Helpful Tool or Too Much Data?',
    'Our Favorite Sunscreens for Sensitive Skin'
  ].map((title) => ({ title, tag: 'Product Reviews', summary: 'Independent reviews focused on usefulness, accessibility, and health value.' })),
  Recipes: [
    'How to Make a Heart-Healthy Grocery List',
    '16 Superfoods That Are Worthy of the Title',
    'Low-Sodium Dinners That Still Feel Satisfying',
    'High-Protein Breakfasts for Busy Weeks',
    'Fiber-Rich Snacks Dietitians Actually Recommend',
    'Mediterranean Lunch Ideas in 15 Minutes'
  ].map((title) => ({ title, tag: 'Recipes', summary: 'Dietitian-informed ideas for balanced meals, grocery planning, and joyful eating.' })),
  'Skin Care': [
    'Beginner\'s Guide to Sensitive Skin',
    'Our Favorite Sunscreens for Sensitive Skin',
    'Eczema Solutions: Knowledge for Self-Care',
    'What Psoriasis Flares Can Teach You',
    'How to Build a Gentle Skin Barrier Routine',
    'Ingredients Dermatologists Use With Caution'
  ].map((title) => ({ title, tag: 'Skin Care', summary: 'Dermatology-informed guidance for caring for skin with confidence and care.' }))
};

const grid = document.getElementById('article-grid');
const tabs = document.querySelectorAll('.tab');

function renderArticles(category) {
  grid.innerHTML = articleData[category].map((article) => `
    <article class="article-card">
      <div class="article-image" aria-hidden="true"></div>
      <div class="article-body">
        <span>${article.tag}</span>
        <h3>${article.title}</h3>
        <p>${article.summary}</p>
      </div>
    </article>
  `).join('');
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((item) => {
      item.classList.remove('active');
      item.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    renderArticles(tab.dataset.category);
  });
});

renderArticles('Top Reads');

const newsletterForm = document.getElementById('newsletter-form');
const newsletterMessage = document.getElementById('newsletter-message');
newsletterForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = new FormData(newsletterForm).get('email');
  newsletterMessage.textContent = email ? `Thanks — ${email} is subscribed to WellSource.` : 'Your privacy is important to us.';
  newsletterForm.reset();
});

document.querySelector('.footer-form').addEventListener('submit', (event) => {
  event.preventDefault();
  event.currentTarget.reset();
});
