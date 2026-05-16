const menus = document.querySelectorAll('.nav-item');
const wrap = document.getElementById('megaMenuWrap');
const panels = document.querySelectorAll('.mega-menu');

menus.forEach((btn) => {
  btn.addEventListener('click', () => {
    const key = btn.dataset.menu;
    const isActive = btn.classList.contains('active');

    menus.forEach((b) => { b.classList.remove('active'); b.setAttribute('aria-expanded', 'false'); });
    panels.forEach((p) => p.hidden = true);

    if (isActive) {
      wrap.hidden = true;
      return;
    }

    btn.classList.add('active');
    btn.setAttribute('aria-expanded', 'true');
    const panel = document.querySelector(`.mega-menu[data-panel="${key}"]`);
    if (panel) {
      wrap.hidden = false;
      panel.hidden = false;
    }
  });
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.site-header')) {
    wrap.hidden = true;
    menus.forEach((b) => { b.classList.remove('active'); b.setAttribute('aria-expanded', 'false'); });
    panels.forEach((p) => p.hidden = true);
  }
});

const reads = {
  top: [
    '16 Superfoods That Are Worthy of the Title',
    'Does Ozempic Cause Hair Loss?',
    'Can Music Therapy Help with Depression?',
    'These Are the 8 Best Calorie Counter Apps'
  ],
  fitness: ['How Many Steps Do You Really Need?', 'A Beginner Strength Plan', 'Can You Run a Marathon ... with POTS?', '5 Mobility Moves for Desk Workers'],
  mental: ['Can Music Therapy Help with Depression?', 'Micro-Habits for Less Stress', 'A Better Evening Routine for Sleep', 'How to Spot Burnout Early'],
  reviews: ['These Are the 8 Best Calorie Counter Apps', 'Tested: Floor-Sitting Workstations', 'Smart Scales Worth Buying in 2026', 'Top Sleep Trackers Compared'],
  recipes: ['Heart-Healthy Grocery List Staples', '7 High-Protein Breakfasts', 'Fiber-Rich Weeknight Dinners', 'Meal Prep for Blood Sugar Balance'],
  skin: ['Derm-Approved Morning Routines', 'Retinol Basics for Beginners', 'Best Sunscreens for Sensitive Skin', 'Can Diet Affect Acne?']
};

const grid = document.getElementById('articleGrid');
const tabs = document.querySelectorAll('.tab');

function renderReads(category) {
  grid.innerHTML = '';
  reads[category].forEach((title) => {
    const card = document.createElement('article');
    card.innerHTML = `<h3>${title}</h3>`;
    grid.appendChild(card);
  });
}

renderReads('top');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');
    renderReads(tab.dataset.tab);
  });
});

const track = document.getElementById('topicsTrack');
document.getElementById('topicsPrev').addEventListener('click', () => {
  track.scrollBy({ left: -250, behavior: 'smooth' });
});
document.getElementById('topicsNext').addEventListener('click', () => {
  track.scrollBy({ left: 250, behavior: 'smooth' });
});

const form = document.getElementById('newsletterForm');
const msg = document.getElementById('formMessage');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = new FormData(form).get('email');
  msg.textContent = `Thanks! ${email} is subscribed.`;
  form.reset();
});
