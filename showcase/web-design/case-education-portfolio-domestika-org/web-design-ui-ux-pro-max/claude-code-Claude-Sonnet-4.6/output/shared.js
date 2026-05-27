// Shared JS for CreativeHub

// Footer accordion (mobile)
function toggleFooter(heading) {
  if (window.innerWidth > 600) return;
  heading.classList.toggle('open');
  const list = heading.nextElementSibling;
  if (list) list.classList.toggle('open');
}

// Promo banner close (if shared.js is loaded before inline scripts define it,
// the inline onclick handler handles it — this is a no-op safety net)
