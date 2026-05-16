const scrollAmount = (track) => Math.min(track.clientWidth * 0.86, 760);
document.querySelectorAll('[data-carousel]').forEach((shell) => {
  const track = shell.querySelector('.track');
  shell.querySelectorAll('[data-dir]').forEach((button) => {
    button.addEventListener('click', () => track.scrollBy({ left: Number(button.dataset.dir) * scrollAmount(track), behavior: 'smooth' }));
  });
});
document.querySelectorAll('[data-tabs]').forEach((tabs) => {
  const buttons = tabs.querySelectorAll('.tab-btn');
  const panels = tabs.querySelectorAll('.tab-panel');
  buttons.forEach((button) => button.addEventListener('click', () => {
    buttons.forEach((b) => b.classList.toggle('active', b === button));
    panels.forEach((panel) => panel.classList.toggle('active', panel.id === button.dataset.tab));
  }));
});
document.querySelectorAll('.foot-col button').forEach((button) => {
  button.addEventListener('click', () => button.closest('.foot-col').classList.toggle('open'));
});
