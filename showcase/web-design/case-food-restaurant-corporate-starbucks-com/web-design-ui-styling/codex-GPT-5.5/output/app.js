document.addEventListener('DOMContentLoaded',()=>{
  const header=document.querySelector('.site-header');
  document.querySelector('.mobile-menu-btn')?.addEventListener('click',()=>header.classList.toggle('open'));
  document.querySelector('#agreeCookies')?.addEventListener('click',()=>document.querySelector('.cookie')?.classList.add('hidden'));
  document.querySelectorAll('.footer-section h3').forEach(h=>h.addEventListener('click',()=>h.parentElement.classList.toggle('open')));
  const redemption={
    '25':'$1 off a drink customization like an extra espresso shot, syrup, or velvety cold foam. Value up to $1.',
    '60':'Take up to $2 off your order for an easy little treat between meetings or errands.',
    '100':'Redeem for brewed coffee or tea, a bakery item, packaged snacks and more. Value up to $6.',
    '200':'Choose a handcrafted drink or hot breakfast favorite. Value up to $10.',
    '300':'Enjoy a sandwich, protein box, or packaged coffee to take GreenBean home. Value up to $16.',
    '400':'Pick select GreenBean merchandise, from tumblers to cozy coffee gear. Value up to $20.'
  };
  document.querySelectorAll('[data-stars]').forEach(btn=>btn.addEventListener('click',()=>{
    document.querySelectorAll('[data-stars]').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const value=btn.dataset.stars;
    const panel=document.querySelector('#redemptionPanel');
    if(panel){panel.style.opacity='0';setTimeout(()=>{panel.querySelector('.stars').textContent=value+' ★';panel.querySelector('p').textContent=redemption[value];panel.style.opacity='1';},130)}
  }));
  document.addEventListener('click', event=>{
    const button=event.target.closest('[data-carousel]');
    if(!button)return;
    const carousel=document.querySelector(button.dataset.carousel); if(!carousel)return;
    const amount=(button.dataset.dir==='prev'?-1:1)*(carousel.clientWidth*.82);
    carousel.scrollBy({left:amount,behavior:'smooth'});
  });
  const search=document.querySelector('#storeSearch'), suggestions=document.querySelector('#suggestions'), mapStatus=document.querySelector('#mapStatus');
  search?.addEventListener('input',()=>{const has=search.value.trim().length>0;suggestions.classList.toggle('show',has);if(mapStatus)mapStatus.textContent=has?'Showing results near '+search.value:'Showing nearby GreenBean stores'});
  document.querySelector('#filterBtn')?.addEventListener('click',()=>document.querySelector('#filterPanel')?.classList.toggle('show'));
  document.querySelectorAll('[data-order]').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('[data-order]').forEach(b=>b.classList.remove('active'));btn.classList.add('active');document.querySelectorAll('.order-word').forEach(el=>el.textContent=btn.dataset.order)}));
});
function greenBeanFooter(){return `<footer class="site-footer"><div class="container footer-grid"><section class="footer-section open"><h3>About Us <span class="footer-toggle">+</span></h3><div class="footer-links"><a>Our Company</a><a>Our Coffee</a><a>About GreenBean</a><a>GreenBean Archive</a><a>Investor Relations</a><a>Customer Service</a><a>Contact Us</a></div></section><section class="footer-section"><h3>Careers <span class="footer-toggle">+</span></h3><div class="footer-links"><a>Culture and Values</a><a>Belonging at GreenBean</a><a>College Achievement Plan</a><a>Alumni Community</a><a>U.S. Careers</a><a>International Careers</a></div></section><section class="footer-section"><h3>Social Impact <span class="footer-toggle">+</span></h3><div class="footer-links"><a>Communities</a><a>GreenBean Foundation</a><a>Sustainability</a><a>Environmental and Social Impact Reporting</a></div></section><section class="footer-section"><h3>For Business Partners <span class="footer-toggle">+</span></h3><div class="footer-links"><a>Landlord Support Center</a><a>Suppliers</a><a>Corporate Gift Card Sales</a><a>Office and Foodservice Coffee</a></div></section><section class="footer-section"><h3>Order and Pick Up <span class="footer-toggle">+</span></h3><div class="footer-links"><a>Order on the App</a><a>Order on the Web</a><a>Delivery</a><a>Order and Pick Up Options</a><a>Explore and Find Coffee for Home</a></div></section></div><div class="container footer-bottom"><p>© 2026 GreenBean Coffee Company. Daily rituals, thoughtfully brewed.</p><p>Privacy Notice · Terms · Accessibility</p></div></footer>`}
document.addEventListener('DOMContentLoaded',()=>{const mount=document.getElementById('footerMount');if(mount){mount.outerHTML=greenBeanFooter();document.querySelectorAll('.footer-section h3').forEach(h=>h.addEventListener('click',()=>h.parentElement.classList.toggle('open')))}});
