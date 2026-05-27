document.addEventListener('DOMContentLoaded', function () {

  // ===== HERO CAROUSEL =====
  var heroTrack = document.getElementById('heroTrack');
  var heroDots = document.getElementById('heroDots');
  var heroIndex = 0;

  if (heroTrack) {
    var slides = heroTrack.querySelectorAll('.hero-slide');
    var total = slides.length;

    for (var i = 0; i < total; i++) {
      var dot = document.createElement('button');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      dot.dataset.index = i;
      dot.addEventListener('click', function () { goToHero(parseInt(this.dataset.index)); });
      heroDots.appendChild(dot);
    }

    setInterval(function () { moveHero(1); }, 5000);
  }

  window.moveHero = function (dir) {
    if (!heroTrack) return;
    var slides = heroTrack.querySelectorAll('.hero-slide');
    heroIndex = (heroIndex + dir + slides.length) % slides.length;
    goToHero(heroIndex);
  };

  function goToHero(idx) {
    heroIndex = idx;
    heroTrack.style.transform = 'translateX(-' + (idx * 100) + '%)';
    var dots = heroDots.querySelectorAll('.dot');
    dots.forEach(function (d, i) { d.classList.toggle('active', i === idx); });
  }

  // ===== COURSE SCROLL ARROWS =====
  window.scrollCourses = function (id, dir) {
    var el = document.getElementById(id);
    if (el) el.scrollBy({ left: dir * 300, behavior: 'smooth' });
  };

  // ===== COUNTDOWN TIMER =====
  var countdownEl = document.getElementById('countdown');
  if (countdownEl) {
    var endTime = Date.now() + 2 * 86400000 + 14 * 3600000 + 33 * 60000 + 7000;
    setInterval(function () {
      var diff = Math.max(0, endTime - Date.now());
      var d = Math.floor(diff / 86400000);
      var h = Math.floor((diff % 86400000) / 3600000);
      var m = Math.floor((diff % 3600000) / 60000);
      var s = Math.floor((diff % 60000) / 1000);
      countdownEl.textContent =
        String(d).padStart(2, '0') + ':' +
        String(h).padStart(2, '0') + ':' +
        String(m).padStart(2, '0') + ':' +
        String(s).padStart(2, '0');
    }, 1000);
  }

  // ===== PRICING TOGGLE =====
  window.switchPricing = function (plan) {
    var tabYearly = document.getElementById('tabYearly');
    var tabMonthly = document.getElementById('tabMonthly');
    var yearlyCard = document.getElementById('yearlyCard');
    var monthlyCard = document.getElementById('monthlyCard');

    if (!tabYearly) return;

    if (plan === 'yearly') {
      tabYearly.classList.add('active');
      tabMonthly.classList.remove('active');
      tabYearly.setAttribute('aria-selected', 'true');
      tabMonthly.setAttribute('aria-selected', 'false');
      yearlyCard.style.display = '';
      monthlyCard.style.display = '';
      yearlyCard.classList.add('recommended');
      monthlyCard.classList.remove('recommended');
    } else {
      tabMonthly.classList.add('active');
      tabYearly.classList.remove('active');
      tabMonthly.setAttribute('aria-selected', 'true');
      tabYearly.setAttribute('aria-selected', 'false');
      yearlyCard.style.display = '';
      monthlyCard.style.display = '';
      monthlyCard.classList.add('recommended');
      yearlyCard.classList.remove('recommended');
    }
  };

  // ===== FAQ ACCORDION =====
  window.toggleFaq = function (btn) {
    var item = btn.parentElement;
    var wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(function (el) { el.classList.remove('open'); });
    if (!wasOpen) item.classList.add('open');
  };

  // ===== LOGIN: PASSWORD TOGGLE =====
  window.togglePassword = function () {
    var pw = document.getElementById('password');
    if (pw) pw.type = pw.type === 'password' ? 'text' : 'password';
  };

  window.handleLogin = function (e) {
    e.preventDefault();
    var email = document.getElementById('email').value;
    if (email) alert('Login submitted for: ' + email);
    return false;
  };

  // ===== COURSES PAGE: SIDEBAR FILTERING =====
  var sidebar = document.getElementById('coursesSidebar');
  var coursesGrid = document.getElementById('coursesGrid');
  var coursesTitle = document.getElementById('coursesTitle');

  var allCourses = [
    { title: 'Drawing for Beginners Level -1', instructor: 'Puño', students: '274,195', rating: '99% (10.47K)', price: '$0.50', orig: '$29.99', cat: 'illustration', img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=250&fit=crop' },
    { title: 'Modern Watercolor Techniques', instructor: 'Ana Victoria Calderon', students: '228,801', rating: '99% (10.21K)', price: '$0.50', orig: '$29.99', cat: 'illustration', img: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=250&fit=crop' },
    { title: 'Professional Photography for Instagram', instructor: 'Mina Barrio', students: '282,895', rating: '99% (10.89K)', price: '$0.50', orig: '$29.99', cat: 'photography', img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=250&fit=crop' },
    { title: 'Creative Drawing Techniques for Beginners', instructor: 'Puño', students: '177,842', rating: '99% (4.52K)', price: '$0.50', orig: '$29.99', cat: 'illustration', img: 'https://images.unsplash.com/photo-1596638787647-904d822d751e?w=400&h=250&fit=crop' },
    { title: 'Introduction to After Effects', instructor: 'Carlos Albarrán', students: '296,236', rating: '97% (4.93K)', price: '$0.50', orig: '$29.99', cat: '3d', img: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=250&fit=crop' },
    { title: 'Introduction to Adobe Photoshop', instructor: 'Carles Marsal', students: '381,277', rating: '100% (10.16K)', price: '$0.50', orig: '$29.99', cat: 'design', img: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=400&h=250&fit=crop' },
    { title: 'Digital Illustration with Procreate', instructor: 'Laura Márquez', students: '14,230', rating: '98%', price: '$0.50', orig: '$29.99', cat: 'illustration', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=250&fit=crop' },
    { title: 'Ceramic Art for Beginners', instructor: 'Lena Yokoyama', students: '8,412', rating: '100%', price: '$0.50', orig: '$29.99', cat: 'craft', img: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=250&fit=crop' },
    { title: 'Brand Identity Design from Scratch', instructor: 'Marco Fernández', students: '21,500', rating: '99%', price: '$0.50', orig: '$29.99', cat: 'design', img: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=250&fit=crop' },
    { title: 'Portrait Photography Masterclass', instructor: 'Sarah Chen', students: '19,800', rating: '99%', price: '$0.50', orig: '$29.99', cat: 'photography', img: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=250&fit=crop' },
    { title: '3D Modeling with Blender', instructor: 'Alex Rivera', students: '15,600', rating: '98%', price: '$0.50', orig: '$29.99', cat: '3d', img: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=400&h=250&fit=crop' },
    { title: 'Motion Graphics Essentials', instructor: 'David Park', students: '11,200', rating: '97%', price: '$0.50', orig: '$29.99', cat: '3d', img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop' },
    { title: 'Social Media Marketing Strategy', instructor: 'Elena Torres', students: '12,900', rating: '99%', price: '$0.50', orig: '$29.99', cat: 'marketing', img: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&h=250&fit=crop' },
    { title: 'Fashion Illustration Techniques', instructor: 'Claudia Martín', students: '9,340', rating: '98%', price: '$0.50', orig: '$29.99', cat: 'fashion', img: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=250&fit=crop' },
    { title: 'Calligraphy & Hand Lettering', instructor: 'James Wu', students: '16,500', rating: '99%', price: '$0.50', orig: '$29.99', cat: 'calligraphy', img: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=250&fit=crop' },
    { title: 'Web Design with Figma', instructor: 'Nora Schmidt', students: '23,400', rating: '100%', price: '$0.50', orig: '$29.99', cat: 'web', img: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=250&fit=crop' },
    { title: 'Interior Design Fundamentals', instructor: 'Ana López', students: '7,800', rating: '98%', price: '$0.50', orig: '$29.99', cat: 'architecture', img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=250&fit=crop' },
    { title: 'Creative Writing Workshop', instructor: 'Oliver Grant', students: '11,600', rating: '99%', price: '$0.50', orig: '$29.99', cat: 'writing', img: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=250&fit=crop' },
    { title: 'Music Production Basics', instructor: 'DJ Kova', students: '8,900', rating: '97%', price: '$0.50', orig: '$29.99', cat: 'music', img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=250&fit=crop' },
    { title: 'AI Art Generation Masterclass', instructor: 'Sam Nguyen', students: '31,200', rating: '98%', price: '$0.50', orig: '$29.99', cat: 'ai', img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop' },
    { title: 'Artisan Bread Baking', instructor: 'Pierre Dubois', students: '6,400', rating: '100%', price: '$0.50', orig: '$29.99', cat: 'culinary', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=250&fit=crop' },
    { title: 'Yoga & Mindfulness for Creatives', instructor: 'Maya Patel', students: '5,200', rating: '99%', price: '$0.50', orig: '$29.99', cat: 'wellness', img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=250&fit=crop' },
    { title: 'Sewing Techniques: Dresses & Garments', instructor: 'Lucia Rossi', students: '16,058', rating: '100%', price: '$0.50', orig: '$29.99', cat: 'craft', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=250&fit=crop' },
    { title: 'Sketching Techniques Masterclass', instructor: 'Tom Blake', students: '12,796', rating: '99%', price: '$0.50', orig: '$29.99', cat: 'illustration', img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=250&fit=crop' }
  ];

  function renderCourses(filter) {
    if (!coursesGrid) return;
    var filtered = filter === 'all' ? allCourses : allCourses.filter(function (c) { return c.cat === filter; });
    coursesGrid.innerHTML = filtered.map(function (c) {
      return '<div class="course-card">' +
        '<div class="card-img"><img src="' + c.img + '" alt="' + c.title + '" loading="lazy"><span class="card-badge">Best seller</span></div>' +
        '<div class="card-body">' +
        '<h3 class="card-title">' + c.title + '</h3>' +
        '<p class="card-instructor">by ' + c.instructor + '</p>' +
        '<div class="card-stats"><span>' + c.students + ' students</span><span class="rating-val">' + c.rating + '</span></div>' +
        '<div class="card-price"><span class="price-sale">' + c.price + '</span><span class="price-orig">' + c.orig + '</span><span class="price-disc">98% Disc.</span></div>' +
        '</div></div>';
    }).join('');
  }

  if (sidebar) {
    sidebar.addEventListener('click', function (e) {
      var link = e.target.closest('a[data-cat]');
      if (!link) return;
      e.preventDefault();
      sidebar.querySelectorAll('a').forEach(function (a) { a.classList.remove('active'); });
      link.classList.add('active');
      var cat = link.dataset.cat;
      var label = link.textContent;
      if (coursesTitle) coursesTitle.textContent = cat === 'all' ? 'All Courses' : label;
      renderCourses(cat);
    });
    renderCourses('all');
  }

  // ===== PROJECTS PAGE: GALLERY =====
  var gallery = document.getElementById('projectsGallery');
  var projectsData = [
    { title: 'The Heart of the Street', user: '@fcleroux', likes: 1, views: 11, field: 'photography', img: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=500&fit=crop' },
    { title: 'Bird Among the Flowers', user: '@marina_papercuts', likes: 4, views: 70, field: 'crafts', img: 'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=400&h=350&fit=crop' },
    { title: 'Wonder Woman', user: '@gatol26', likes: 11, views: 252, field: 'illustration', img: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&h=550&fit=crop' },
    { title: 'Floral Shadow Box', user: '@marina_papercuts', likes: 44, views: 232, field: 'crafts', img: 'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=400&h=400&fit=crop' },
    { title: 'HER: The Presence of Absence', user: '@dansdervani_', likes: 7, views: 51108, winner: true, field: 'photography', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop' },
    { title: 'Urban Geometry', user: '@alex_shots', likes: 23, views: 890, field: 'photography', img: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400&h=450&fit=crop' },
    { title: 'Botanical Sketches', user: '@green_line', likes: 18, views: 340, field: 'illustration', img: 'https://images.unsplash.com/photo-1596638787647-904d822d751e?w=400&h=380&fit=crop' },
    { title: 'Neon Dreams', user: '@lightpaint', likes: 56, views: 1240, field: 'photography', img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=520&fit=crop' },
    { title: 'Paper Cut Landscapes', user: '@papercutter', likes: 31, views: 510, field: 'crafts', img: 'https://images.unsplash.com/photo-1582845512747-e42001c95638?w=400&h=360&fit=crop' },
    { title: 'Typography Poster', user: '@type_guru', likes: 15, views: 290, field: 'graphic-design', img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=480&fit=crop' },
    { title: 'Watercolor Sunset', user: '@aqua_brush', likes: 42, views: 780, field: 'watercolor', img: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=400&fit=crop' },
    { title: 'Character Design Portfolio', user: '@toon_factory', likes: 67, views: 2100, field: 'illustration', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=440&fit=crop' }
  ];

  function renderProjects(data) {
    if (!gallery) return;
    gallery.innerHTML = data.map(function (p) {
      return '<div class="masonry-item" data-field="' + p.field + '" data-likes="' + p.likes + '" data-views="' + p.views + '">' +
        (p.winner ? '<span class="winner-badge">Winner</span>' : '') +
        '<img src="' + p.img + '" alt="' + p.title + '" loading="lazy">' +
        '<div class="overlay">' +
        '<h3>' + p.title + '</h3>' +
        '<div class="meta"><span>' + p.user + '</span><span>&#9829; ' + p.likes + '</span><span>&#128065; ' + formatNum(p.views) + '</span></div>' +
        '</div></div>';
    }).join('');
  }

  function formatNum(n) {
    return n >= 1000 ? (n / 1000).toFixed(1) + 'K' : n;
  }

  if (gallery) {
    renderProjects(projectsData);

    var sortSelect = document.getElementById('sortSelect');
    var timeFilter = document.getElementById('timeFilter');
    var fieldFilter = document.getElementById('fieldFilter');

    function applyProjectFilters() {
      var sorted = projectsData.slice();
      var sort = sortSelect ? sortSelect.value : 'featured';
      var field = fieldFilter ? fieldFilter.value : 'all';

      if (field !== 'all') {
        sorted = sorted.filter(function (p) { return p.field === field; });
      }

      if (sort === 'most-liked') sorted.sort(function (a, b) { return b.likes - a.likes; });
      else if (sort === 'most-viewed') sorted.sort(function (a, b) { return b.views - a.views; });
      else if (sort === 'most-recent') sorted.reverse();

      renderProjects(sorted);
    }

    if (sortSelect) sortSelect.addEventListener('change', applyProjectFilters);
    if (timeFilter) timeFilter.addEventListener('change', applyProjectFilters);
    if (fieldFilter) fieldFilter.addEventListener('change', applyProjectFilters);
  }

  // ===== FOOTER ACCORDION (MOBILE) =====
  var footerCols = document.querySelectorAll('.footer-col');
  if (window.innerWidth <= 768) {
    footerCols.forEach(function (col) {
      var ul = col.querySelector('ul');
      if (ul) ul.style.maxHeight = '0';
    });
  }

});
