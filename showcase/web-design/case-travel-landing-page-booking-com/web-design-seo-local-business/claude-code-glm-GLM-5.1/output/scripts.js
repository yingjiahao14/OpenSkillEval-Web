// ===== Tab Switching =====
document.querySelectorAll('.tabs-nav').forEach(nav => {
  const buttons = nav.querySelectorAll('.tab-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tabGroup = nav.closest('.container') || nav.parentElement;
      const contents = tabGroup.querySelectorAll('.tab-content');
      contents.forEach(c => c.classList.remove('active'));
      const target = tabGroup.querySelector('#tab-' + btn.dataset.tab);
      if (target) target.classList.add('active');
    });
  });
});

// ===== Carousel =====
document.querySelectorAll('.carousel-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const track = document.getElementById(btn.dataset.carousel);
    if (!track) return;
    const scrollAmount = 300;
    track.scrollBy({ left: scrollAmount * parseInt(btn.dataset.dir), behavior: 'smooth' });
  });
});

// ===== FAQ Accordion (one open at a time) =====
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const item = question.closest('.faq-item');
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

// ===== Search Form Validation =====
document.querySelectorAll('.search-form').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputs = form.querySelectorAll('input[type="text"], input[type="date"]');
    let valid = true;
    inputs.forEach(input => {
      if (input.type === 'text' && !input.value.trim()) {
        input.style.borderColor = '#c00';
        valid = false;
      } else {
        input.style.borderColor = '';
      }
    });
    if (valid) {
      alert('Searching... (This is a demo)');
    }
  });
});
