(() => {
  const state = {
    activeMenu: null,
    activeTab: 'Top Reads',
  };

  const recommendedData = {
    'Top Reads': [
      {
        category: 'Nutrition',
        title: '16 Superfoods That Are Worthy of the Title',
        desc: 'Evidence-backed picks to help you build a more nourishing plate.'
      },
      {
        category: 'Weight Management',
        title: 'Does Ozempic Cause Hair Loss?',
        desc: 'What experts know so far, and how to support healthy hair.'
      },
      {
        category: 'Health News',
        title: 'Prescription Drug Content on Social Media Often Misleading, Study Finds',
        desc: 'How to vet claims and spot missing context in health posts.'
      },
      {
        category: 'Mental Well-Being',
        title: 'Can Music Therapy Help with Depression?',
        desc: 'A practical look at what the research suggests and what to try.'
      },
      {
        category: 'Wellness',
        title: 'Why Am I Craving So Much Salt?',
        desc: 'Common reasons cravings happen and when to check in with a pro.'
      },
      {
        category: 'Tools',
        title: 'These Are the 8 Best Calorie Counter Apps',
        desc: 'Features to look for, plus options people actually stick with.'
      }
    ],
    'Fitness': [
      {
        category: 'Fitness',
        title: 'Day 12: Resistance Band Moves You Can Do in 10 Minutes',
        desc: 'Simple moves for strength and flexibility—no gym required.'
      },
      {
        category: 'Fitness',
        title: 'Warm-Up Essentials for Busy Days',
        desc: 'A five-minute routine to help you feel ready to move.'
      },
      {
        category: 'Fitness',
        title: 'Beginner-Friendly Strength: What to Track',
        desc: 'Progress markers that matter beyond the scale.'
      },
      {
        category: 'Fitness',
        title: 'How to Build a Walk Routine You’ll Keep',
        desc: 'Small steps that compound into real cardiovascular benefits.'
      },
      {
        category: 'Fitness',
        title: 'Stretching Myths, Explained',
        desc: 'What helps, what doesn’t, and how to stay consistent.'
      },
      {
        category: 'Fitness',
        title: 'Recovery Basics: Sleep, Hydration, Protein',
        desc: 'A simple checklist to support training adaptations.'
      }
    ],
    'Mental Well-Being': [
      {
        category: 'Mental Well-Being',
        title: 'Can Music Therapy Help with Depression?',
        desc: 'A practical look at what the research suggests and what to try.'
      },
      {
        category: 'Mental Well-Being',
        title: 'Anxiety Tools That Work in the Moment',
        desc: 'Grounding techniques you can do anywhere.'
      },
      {
        category: 'Mental Well-Being',
        title: 'How to Set Boundaries Without Guilt',
        desc: 'Scripts and steps for calmer, clearer communication.'
      },
      {
        category: 'Mental Well-Being',
        title: 'Stress and Your Body: The Short Version',
        desc: 'What “fight or flight” looks like—and how to come down.'
      },
      {
        category: 'Mental Well-Being',
        title: 'Sleep Hygiene: The Habits That Matter Most',
        desc: 'A prioritized list—skip the noise.'
      },
      {
        category: 'Mental Well-Being',
        title: 'Social Media and Mood: A Healthier Loop',
        desc: 'Small changes to reduce doomscrolling and comparison.'
      }
    ],
    'Product Reviews': [
      {
        category: 'Product Reviews',
        title: 'Is Floor Sitting the New Standing? This Unique Desk Surprised Us',
        desc: 'What we liked, what we didn’t, and who it’s best for.'
      },
      {
        category: 'Product Reviews',
        title: 'Top Electric Toothbrush Features (Without the Hype)',
        desc: 'How to choose based on function—not marketing.'
      },
      {
        category: 'Product Reviews',
        title: 'The Best Heating Pads for Muscle Relief',
        desc: 'Comfort, controls, and safety features to compare.'
      },
      {
        category: 'Product Reviews',
        title: 'Our Favorite Blue-Light Glasses (If You Want Them)',
        desc: 'What matters: fit, comfort, and lens quality.'
      },
      {
        category: 'Product Reviews',
        title: '8 Best Calorie Counter Apps',
        desc: 'Features to look for, plus options people stick with.'
      },
      {
        category: 'Product Reviews',
        title: 'A Simple Water Bottle Test: Leak + Comfort',
        desc: 'The basics that decide whether it stays in your routine.'
      }
    ],
    'Recipes': [
      {
        category: 'Recipes',
        title: 'Protein-Packed Breakfast Bowl',
        desc: 'Fast, flexible, and easy to batch prep.'
      },
      {
        category: 'Recipes',
        title: 'Heart-Healthy Pantry Pasta',
        desc: 'A high-fiber dinner with minimal prep.'
      },
      {
        category: 'Recipes',
        title: 'Sheet-Pan Salmon with Citrus',
        desc: 'Omega-3s + bright flavor in under 25 minutes.'
      },
      {
        category: 'Recipes',
        title: 'High-Volume Salad You’ll Actually Want',
        desc: 'Crunch, protein, and a dressing that holds up.'
      },
      {
        category: 'Recipes',
        title: 'Better Snack Plate (Balanced + Satisfying)',
        desc: 'Mix-and-match components for busy afternoons.'
      },
      {
        category: 'Recipes',
        title: 'Low-Lift Slow Cooker Chili',
        desc: 'Hands-off comfort food with lots of veggies.'
      }
    ],
    'Skin Care': [
      {
        category: 'Skin Care',
        title: 'Beginner’s Guide to Sensitive Skin',
        desc: 'A calmer routine with fewer triggers.'
      },
      {
        category: 'Skin Care',
        title: 'Moisturizer Basics: Barrier First',
        desc: 'How to choose ingredients by skin needs.'
      },
      {
        category: 'Skin Care',
        title: 'Sunscreen FAQs (Real-World Answers)',
        desc: 'Application, reapplication, and what “broad spectrum” means.'
      },
      {
        category: 'Skin Care',
        title: 'Acne Myths You Can Stop Believing',
        desc: 'What helps most, based on dermatology guidance.'
      },
      {
        category: 'Skin Care',
        title: 'Dry Skin: The Shower Habit That Matters',
        desc: 'Small changes that reduce irritation.'
      },
      {
        category: 'Skin Care',
        title: 'Retinoids 101 (Gentle Start)',
        desc: 'How to introduce actives without overdoing it.'
      }
    ]
  };

  const menuData = {
    'Health Conditions': {
      introTitle: 'Browse conditions with confidence',
      introBody: 'Explore medically reviewed guides, symptoms, treatments, and next steps — written for everyday life.',
      cta: 'Explore topics',
      columns: [
        'Breast Cancer','Chronic Kidney Disease','COPD','Digestive Health','Eye Health','Heart Health','Menopause','Mental Health',
        'Migraine','Multiple Sclerosis','Parkinson\'s Disease','Psoriasis','Rheumatoid Arthritis','Sleep Health','Type 2 Diabetes','Weight Management'
      ]
    },
    'Wellness': {
      introTitle: 'Wellness that feels doable',
      introBody: 'Trusted guidance on everyday habits — plus product reviews and featured programs to go deeper.',
      cta: 'Start your routine',
      columns: [
        'CBD','Fitness','Healthy Aging','Hearing','Mental Well-Being','Nutrition','Parenthood','Recipes',
        'Sexual Health','Skin Care','Sleep Health','Vitamins and Supplements','Women\'s Wellness','Product Reviews','Featured Programs','Top Reads'
      ]
    },
    'Tools': {
      introTitle: 'Practical tools, not guesswork',
      introBody: 'Use calculators, directories, and find-care tools built to make decisions easier.',
      cta: 'Browse tools',
      columns: [
        'Pill Identifier','FindCare','Drugs A–Z','Medicare Plans by State','Lessons','Newsletters','Lifestyle Quizzes','Calorie Calculator',
        'Macronutrient Calculator','Recipe Hub','Drug Directory','GLP-1 Resource'
      ]
    },
    'Featured': {
      introTitle: 'Featured coverage and series',
      introBody: 'Hand-picked stories, timely health news, and video series — curated by our editors.',
      cta: 'See what\'s new',
      columns: ['Health News','Top Reads','Video Series','Editors\' Picks','Seasonal Guides','Trending Topics']
    },
    'Connect': {
      introTitle: 'Connect with communities',
      introBody: 'Supportive spaces like Bezzy communities and updates on social.',
      cta: 'Join a community',
      columns: ['Bezzy: Anxiety & Depression','Bezzy: Multiple Sclerosis','Bezzy: Psoriasis','Bezzy: Migraine','Facebook','X','Pinterest','Instagram','YouTube']
    }
  };

  function $(sel, root = document) {
    return root.querySelector(sel);
  }

  function $all(sel, root = document) {
    return Array.from(root.querySelectorAll(sel));
  }

  function setMenu(menuName) {
    state.activeMenu = menuName;
    const menu = $('#megamenu');
    const isOpen = Boolean(menuName);
    menu.dataset.open = isOpen ? 'true' : 'false';

    $all('[data-menu-btn]').forEach((btn) => {
      const expanded = btn.dataset.menuBtn === menuName;
      btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });

    if (!isOpen) return;

    const data = menuData[menuName];
    $('#menuTitle').textContent = menuName;
    $('#menuIntroTitle').textContent = data.introTitle;
    $('#menuIntroBody').textContent = data.introBody;
    $('#menuIntroCta').textContent = data.cta;

    const cols = $('#menuCols');
    cols.innerHTML = '';
    for (const label of data.columns) {
      const a = document.createElement('a');
      a.href = '#';
      a.className = 'menuLink focus-ring';
      a.innerHTML = `
        <span class="menuLink__dot" aria-hidden="true"></span>
        <span>
          <div class="menuLink__label">${label}</div>
          <div class="menuLink__desc">Explore guides and expert answers</div>
        </span>
      `;
      cols.appendChild(a);
    }
  }

  function bindNav() {
    $all('[data-menu-btn]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const name = btn.dataset.menuBtn;
        setMenu(state.activeMenu === name ? null : name);
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setMenu(null);
    });

    document.addEventListener('click', (e) => {
      const menu = $('#megamenu');
      const isInside = e.target.closest('#megamenu') || e.target.closest('[data-menu-btn]');
      if (!isInside && menu.dataset.open === 'true') setMenu(null);
    });
  }

  function renderArticles(category) {
    state.activeTab = category;
    const grid = $('#articlesGrid');
    const items = recommendedData[category] || [];
    grid.innerHTML = '';

    for (const item of items) {
      const card = document.createElement('a');
      card.href = '#';
      card.className = 'article focus-ring';
      card.innerHTML = `
        <div class="label">${item.category}</div>
        <h4>${item.title}</h4>
        <p>${item.desc}</p>
      `;
      grid.appendChild(card);
    }

    $all('[data-tab]').forEach((btn) => {
      btn.setAttribute('aria-selected', btn.dataset.tab === category ? 'true' : 'false');
    });
  }

  function bindTabs() {
    $all('[data-tab]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        renderArticles(btn.dataset.tab);
      });
    });

    renderArticles(state.activeTab);
  }

  function bindCarousel() {
    const track = $('#topicsTrack');
    const left = $('#topicsLeft');
    const right = $('#topicsRight');

    function step(dir) {
      const card = track.querySelector('.topicCard');
      const delta = card ? (card.getBoundingClientRect().width + 14) * 2.2 : 420;
      track.scrollBy({ left: dir * delta, behavior: 'smooth' });
    }

    left.addEventListener('click', () => step(-1));
    right.addEventListener('click', () => step(1));
  }

  function bindForms() {
    $all('form[data-newsletter]').forEach((form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        const email = (input?.value || '').trim();
        const status = form.querySelector('[data-status]');

        if (!email || !email.includes('@')) {
          if (status) status.textContent = 'Please enter a valid email.';
          input?.focus();
          return;
        }

        if (status) status.textContent = 'Thanks — you\'re signed up!';
        form.reset();
      });
    });
  }

  function initTickerWidth() {
    // Ensure the ticker track is wide enough for -50% animation.
    // We render items twice in HTML; this keeps it smooth.
  }

  bindNav();
  bindTabs();
  bindCarousel();
  bindForms();
  initTickerWidth();
})();
