const nav = document.querySelector('#primary-nav');
const mobileMenu = document.querySelector('.mobile-menu');
const navItems = Array.from(document.querySelectorAll('.nav-item'));
const navTriggers = Array.from(document.querySelectorAll('.nav-trigger'));

function closeMenus(exceptItem = null) {
  navItems.forEach((item) => {
    if (item !== exceptItem) {
      item.classList.remove('open');
      const trigger = item.querySelector('.nav-trigger');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    }
  });
}

navTriggers.forEach((trigger) => {
  trigger.addEventListener('click', (event) => {
    const item = event.currentTarget.closest('.nav-item');
    const willOpen = !item.classList.contains('open');
    closeMenus(item);
    item.classList.toggle('open', willOpen);
    event.currentTarget.setAttribute('aria-expanded', String(willOpen));
  });
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.nav-item') && !event.target.closest('.mobile-menu')) closeMenus();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMenus();
    if (nav.classList.contains('open')) toggleMobileMenu(false);
  }
});

function toggleMobileMenu(forceState) {
  const isOpen = typeof forceState === 'boolean' ? forceState : !nav.classList.contains('open');
  nav.classList.toggle('open', isOpen);
  document.body.classList.toggle('menu-open', isOpen);
  mobileMenu.setAttribute('aria-expanded', String(isOpen));
}

mobileMenu.addEventListener('click', () => toggleMobileMenu());

const carousel = document.querySelector('.topic-carousel');
document.querySelectorAll('.carousel-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const direction = button.dataset.direction === 'left' ? -1 : 1;
    carousel.scrollBy({ left: direction * Math.max(240, carousel.clientWidth * 0.72), behavior: 'smooth' });
  });
});

const articleData = {
  top: [
    ['Nutrition', '16 Superfoods That Are Worthy of the Title', 'A practical look at nutrient-dense foods and how to add them to everyday meals.'],
    ['Medication', 'Does Ozempic Cause Hair Loss?', 'What research suggests, what may be temporary, and when to speak with a clinician.'],
    ['Health News', 'Prescription Drug Content on Social Media Often Misleading, Study Finds', 'How to spot misinformation and protect your decisions online.'],
    ['Mental Well-Being', 'Can Music Therapy Help with Depression?', 'Evidence-backed benefits and ways to try music as part of a broader care plan.'],
    ['Nutrition', 'Why Am I Craving So Much Salt?', 'Common causes, hydration cues, and when cravings may need medical attention.'],
    ['Reviews', 'These Are the 8 Best Calorie Counter Apps', 'Dietitian-informed picks for tracking nutrition without losing sight of balance.']
  ],
  fitness: [
    ['Fitness', 'Day 12: Resistance Band Moves You Can Do in 10 Minutes', 'A beginner-friendly strength session you can do almost anywhere.'],
    ['Fitness', 'Can You Run a Marathon … with POTS?', 'Training considerations, pacing, and safety questions to discuss with your care team.'],
    ['Fitness', '7 Types of Exercises to Relieve Constipation', 'Gentle movement ideas that may support digestion and comfort.'],
    ['Healthy Aging', 'How Often Should You Strength Train After 50?', 'Simple ways to protect mobility, confidence, and muscle health.'],
    ['Mobility', 'A 5-Minute Stretch Routine for Stiff Mornings', 'Small movements that help wake up your joints and muscles.'],
    ['Recovery', 'What Your Rest Day Should Actually Look Like', 'Low-pressure recovery tips for sustainable fitness goals.']
  ],
  mental: [
    ['Mental Well-Being', 'Can Music Therapy Help with Depression?', 'Evidence-backed benefits and how music may complement professional care.'],
    ['Mental Health', 'How to Tell Stress from Burnout', 'Signals to notice and small resets that can help you recover.'],
    ['Sleep', 'A Gentle Wind-Down Routine for Anxious Nights', 'Create a calmer transition into sleep with approachable habits.'],
    ['Mindfulness', 'What Grounding Techniques Can Do in 60 Seconds', 'Fast practices that bring attention back to the present moment.'],
    ['Therapy', 'Questions to Ask Before Your First Therapy Session', 'Feel more prepared and confident starting care.'],
    ['Relationships', 'How Social Connection Supports Mental Health', 'Why community matters and ways to make connection easier.']
  ],
  products: [
    ['Products', 'Is Floor Sitting the New Standing? This Unique Desk Surprised Us', 'Our editorial review of a flexible workstation trend.'],
    ['Reviews', 'These Are the 8 Best Calorie Counter Apps', 'Dietitian-informed picks with usability, privacy, and feature notes.'],
    ['Sleep', 'The Best Cooling Pillows for Hot Sleepers', 'Comfort-focused picks for different sleep positions.'],
    ['Skin Care', 'Derm-Approved Sunscreens for Sensitive Skin', 'Formulas that balance protection, comfort, and everyday wear.'],
    ['Fitness', 'Resistance Bands Worth Keeping in Your Gym Bag', 'Durable options for home, travel, and beginner routines.'],
    ['Nutrition', 'Meal Prep Containers That Make Planning Easier', 'Practical tools for organizing balanced meals.']
  ],
  recipes: [
    ['Recipes', '16 Superfoods That Are Worthy of the Title', 'Ingredients you can turn into simple, satisfying meals.'],
    ['Nutrition', 'How to Make a Heart-Healthy Grocery List', 'Build a cart with fiber, healthy fats, and practical staples.'],
    ['Recipes', '5 Mediterranean-Inspired Lunches for Busy Weeks', 'Colorful, flexible ideas that hold up well for meal prep.'],
    ['Recipes', 'High-Protein Breakfasts That Do Not Feel Heavy', 'Balanced mornings with easy swaps for different preferences.'],
    ['Digestive Health', 'Gentle Meals for Sensitive Stomachs', 'Comforting recipe ideas with digestion-friendly ingredients.'],
    ['Nutrition', 'Why Am I Craving So Much Salt?', 'How cravings can inform smarter snack choices.']
  ],
  skin: [
    ['Skin Care', 'Beginner’s Guide to Sensitive Skin', 'A calm approach to triggers, routines, and product labels.'],
    ['Skin Care', 'Eczema Solutions: Knowledge for Self-Care', 'Practical ways to support your barrier and prepare for appointments.'],
    ['Psoriasis', 'What Every Psoriasis Patient Needs to Know About Flares and Stress', 'A closer look at the stress-skin connection.'],
    ['Product Reviews', 'Derm-Approved Sunscreens for Sensitive Skin', 'Formulas designed for comfort and broad-spectrum coverage.'],
    ['Healthy Aging', 'How Your Skin Changes During Menopause', 'What to know about dryness, sensitivity, and care routines.'],
    ['Skin Care', 'When Should You See a Dermatologist?', 'Signs a skin concern deserves professional attention.']
  ]
};

const articleGrid = document.querySelector('.article-grid');
const tabButtons = Array.from(document.querySelectorAll('[role="tab"]'));

function renderArticles(category) {
  articleGrid.innerHTML = articleData[category].map(([label, title, summary], index) => `
    <article class="article-card" style="animation-delay: ${index * 25}ms">
      <div class="article-art" aria-hidden="true"></div>
      <div class="article-content">
        <span>${label}</span>
        <h3><a href="#">${title}</a></h3>
        <p>${summary}</p>
      </div>
    </article>
  `).join('');
}

tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    tabButtons.forEach((tab) => tab.setAttribute('aria-selected', String(tab === button)));
    renderArticles(button.dataset.category);
  });
});
renderArticles('top');

const newsletterForm = document.querySelector('.newsletter-form');
const newsletterMessage = document.querySelector('.form-message');
newsletterForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = newsletterForm.email.value.trim();
  if (!newsletterForm.checkValidity()) {
    newsletterMessage.textContent = 'Please enter a valid email address.';
    newsletterMessage.className = 'form-message';
    newsletterForm.reportValidity();
    return;
  }
  newsletterMessage.textContent = `Thanks — ${email} is signed up for WellSource updates.`;
  newsletterMessage.className = 'form-message success';
  newsletterForm.reset();
});
