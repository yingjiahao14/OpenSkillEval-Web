const qs=(s,p=document)=>p.querySelector(s);const qsa=(s,p=document)=>[...p.querySelectorAll(s)];
qsa('[data-tabs]').forEach(root=>{const btns=qsa('[data-tab]',root),panels=qsa('[data-panel]',root);btns.forEach(b=>b.addEventListener('click',()=>{const t=b.dataset.tab;btns.forEach(x=>x.classList.toggle('active',x===b));panels.forEach(p=>p.classList.toggle('active',p.dataset.panel===t));}));});
qsa('.watchlist-group').forEach(g=>{const h=qs('h4',g),b=qs('.watchlist-body',g);h.addEventListener('click',()=>{b.style.display=b.style.display==='none'?'block':'none';});});
qsa('[data-timeframe]').forEach(btn=>btn.addEventListener('click',()=>{qsa('[data-timeframe]').forEach(b=>b.classList.remove('active'));btn.classList.add('active');}));
