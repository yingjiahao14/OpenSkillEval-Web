function setupCarousels() {
  document.querySelectorAll('[data-carousel]').forEach((wrap) => {
    const track = wrap.querySelector('.carousel');
    const prev = wrap.querySelector('[data-dir="prev"]');
    const next = wrap.querySelector('[data-dir="next"]');
    if (!track) return;
    const step = () => Math.max(280, Math.floor(track.clientWidth * 0.9));
    prev?.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
    next?.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
  });
}

function setupTabs() {
  const tabGroups = document.querySelectorAll('[data-tabs]');
  tabGroups.forEach((group) => {
    const buttons = group.querySelectorAll('[role="tab"]');
    const panels = group.querySelectorAll('[role="tabpanel"]');
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-target');
        buttons.forEach((b) => b.classList.toggle('active', b === btn));
        panels.forEach((p) => p.classList.toggle('active', p.id === target));
      });
    });
  });
}

function setupFooterAccordion() {
  document.querySelectorAll('.acc-btn').forEach((btn) => {
    btn.addEventListener('click', () => btn.parentElement.classList.toggle('open'));
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupCarousels();
  setupTabs();
  setupFooterAccordion();
});
