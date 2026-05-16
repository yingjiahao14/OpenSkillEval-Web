document.querySelectorAll('[data-tabs]').forEach((group) => {
  const tabs = group.querySelectorAll('[data-tab]');
  const panels = group.querySelectorAll('[data-panel]');
  tabs.forEach((tab) => tab.addEventListener('click', () => {
    const target = tab.getAttribute('data-tab');
    tabs.forEach(t => t.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const panel = group.querySelector(`[data-panel="${target}"]`);
    if(panel) panel.classList.add('active');
  }));
});

document.querySelectorAll('[data-accordion]').forEach((head)=>{
  head.addEventListener('click',()=>{
    const body = head.nextElementSibling;
    const open = body.style.display !== 'none';
    body.style.display = open ? 'none':'block';
  })
});

document.querySelectorAll('.tf button').forEach((b)=>b.addEventListener('click',()=>{
  b.parentElement.querySelectorAll('button').forEach(x=>x.classList.remove('active'));
  b.classList.add('active');
}));
