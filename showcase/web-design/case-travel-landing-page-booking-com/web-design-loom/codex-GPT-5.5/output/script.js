const byId = (id) => document.getElementById(id);

document.querySelectorAll('[data-tabs]').forEach((group) => {
  const tabs = [...group.querySelectorAll('[role="tab"]')];
  const panels = tabs.map((tab) => byId(tab.getAttribute('aria-controls'))).filter(Boolean);
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((item) => item.setAttribute('aria-selected', String(item === tab)));
      panels.forEach((panel) => { panel.hidden = panel.id !== tab.getAttribute('aria-controls'); });
    });
  });
});

document.querySelectorAll('[data-carousel]').forEach((wrap) => {
  const scroller = wrap.querySelector('.scroller');
  wrap.querySelectorAll('[data-scroll]').forEach((button) => {
    button.addEventListener('click', () => {
      const direction = button.dataset.scroll === 'next' ? 1 : -1;
      scroller.scrollBy({ left: direction * Math.min(720, scroller.clientWidth * .9), behavior: 'smooth' });
    });
  });
});

document.querySelectorAll('[data-faq]').forEach((faq) => {
  faq.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', () => {
      faq.querySelectorAll('button').forEach((other) => {
        const panel = byId(other.getAttribute('aria-controls'));
        const open = other === button && other.getAttribute('aria-expanded') !== 'true';
        other.setAttribute('aria-expanded', String(open));
        if (panel) panel.hidden = !open;
      });
    });
  });
});

document.querySelectorAll('[data-search]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const note = form.querySelector('.form-note');
    const destination = form.querySelector('[name="destination"], [name="pickup"]');
    if (destination && !destination.value.trim()) {
      note.textContent = 'Add a destination or pick-up location to start your search.';
      destination.focus();
      return;
    }
    note.textContent = 'Great choice — matching StayQuest options are ready to compare.';
  });
});

document.querySelectorAll('[name="package-type"]').forEach((radio) => {
  radio.addEventListener('change', () => {
    const note = byId('package-note');
    if (note) note.textContent = `${radio.value} selected — fields updated for this bundle.`;
  });
});
