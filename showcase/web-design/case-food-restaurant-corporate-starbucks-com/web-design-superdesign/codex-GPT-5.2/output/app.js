(function(){
  const qs=(s,el=document)=>el.querySelector(s);
  const qsa=(s,el=document)=>Array.from(el.querySelectorAll(s));

  // Mobile nav
  const navBtn = qs('[data-mobile-toggle]');
  const drawer = qs('[data-mobile-drawer]');
  if(navBtn && drawer){
    navBtn.addEventListener('click', ()=>{
      const open = drawer.classList.toggle('open');
      navBtn.setAttribute('aria-expanded', String(open));
    });
  }

  // Cookie banner
  const cookie = qs('[data-cookie]');
  const cookieAgree = qs('[data-cookie-agree]');
  if(cookie && cookieAgree){
    const key='gb_cookie_ok_v1';
    if(localStorage.getItem(key)==='1') cookie.remove();
    cookieAgree.addEventListener('click', ()=>{
      localStorage.setItem(key,'1');
      cookie.style.display='none';
    });
  }

  // Footer accordion (mobile)
  qsa('[data-footer-acc]').forEach((btn)=>{
    btn.addEventListener('click', ()=>{
      const col = btn.closest('.footer-col');
      if(!col) return;
      const expanded = col.getAttribute('aria-expanded')==='true';
      col.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    });
  });

  // Rewards tier tabs
  const tablist = qs('[data-tabs]');
  if(tablist){
    const tabs = qsa('[role="tab"]', tablist);
    const panels = qsa('[role="tabpanel"]');
    const activate = (id)=>{
      tabs.forEach(t=>{
        const on = t.getAttribute('aria-controls')===id;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
      });
      panels.forEach(p=>{
        p.hidden = p.id!==id;
      });
    };
    tabs.forEach(t=>{
      t.addEventListener('click', ()=>activate(t.getAttribute('aria-controls')));
      t.addEventListener('keydown', (e)=>{
        const idx = tabs.indexOf(t);
        if(e.key==='ArrowRight') tabs[(idx+1)%tabs.length].focus();
        if(e.key==='ArrowLeft') tabs[(idx-1+tabs.length)%tabs.length].focus();
        if(e.key==='Enter' || e.key===' ') {
          e.preventDefault();
          activate(t.getAttribute('aria-controls'));
        }
      });
    });
    const first = tabs.find(t=>t.getAttribute('aria-selected')==='true') || tabs[0];
    if(first) activate(first.getAttribute('aria-controls'));
  }

  // Carousels
  qsa('[data-carousel]').forEach((root)=>{
    const track = qs('[data-carousel-track]', root);
    const viewport = qs('[data-carousel-viewport]', root);
    const prev = qs('[data-carousel-prev]', root);
    const next = qs('[data-carousel-next]', root);
    if(!track || !viewport || !prev || !next) return;

    let index = 0;
    const cards = qsa('[data-card]', track);

    const step = ()=>{
      const firstCard = cards[0];
      if(!firstCard) return 240;
      const style = getComputedStyle(track);
      const gap = parseFloat(style.columnGap || style.gap || '16') || 16;
      return firstCard.getBoundingClientRect().width + gap;
    };

    const maxIndex = ()=>{
      const s = step();
      const visible = Math.max(1, Math.floor(viewport.getBoundingClientRect().width / s));
      return Math.max(0, cards.length - visible);
    };

    const render = ()=>{
      const mi = maxIndex();
      index = Math.max(0, Math.min(index, mi));
      track.style.transform = `translateX(${-index * step()}px)`;
      prev.disabled = index===0;
      next.disabled = index===mi;
      root.setAttribute('data-index', String(index));
    };

    prev.addEventListener('click', ()=>{index -= 1; render();});
    next.addEventListener('click', ()=>{index += 1; render();});
    window.addEventListener('resize', ()=>render(), {passive:true});
    render();
  });

  // Store locator interactions (placeholder data)
  const storeRoot = qs('[data-store-locator]');
  if(storeRoot){
    const input = qs('[data-store-input]', storeRoot);
    const sugg = qs('[data-store-suggestions]', storeRoot);
    const filterBtn = qs('[data-filter-btn]', storeRoot);
    const filterPanel = qs('[data-filter-panel]', storeRoot);
    const resultsEl = qs('[data-store-results]', storeRoot);
    const modeBtns = qsa('[data-order-type]', storeRoot);

    const stores = [
      { name:'GreenBean Downtown', city:'Seattle, WA', address:'120 Pine St', hours:'6:00a–7:30p', features:['Mobile order','Drive-thru'], pickup:true, delivery:true, x:18, y:30 },
      { name:'GreenBean Waterfront', city:'Seattle, WA', address:'44 Alaskan Way', hours:'6:30a–8:00p', features:['Mobile order'], pickup:true, delivery:false, x:55, y:44 },
      { name:'GreenBean Capitol Hill', city:'Seattle, WA', address:'905 E Pike St', hours:'5:30a–8:30p', features:['Mobile order','Café seating'], pickup:true, delivery:true, x:72, y:22 },
      { name:'GreenBean Ballard', city:'Seattle, WA', address:'2210 NW Market St', hours:'6:00a–7:00p', features:['Drive-thru'], pickup:true, delivery:false, x:34, y:68 },
      { name:'GreenBean Bellevue', city:'Bellevue, WA', address:'500 Bellevue Way', hours:'6:00a–7:30p', features:['Mobile order','Café seating'], pickup:true, delivery:true, x:83, y:62 }
    ];

    let orderType = 'pickup';
    let query = '';

    const setOrderType = (type)=>{
      orderType = type;
      modeBtns.forEach(b=>b.setAttribute('aria-pressed', String(b.getAttribute('data-order-type')===type)));
      render();
    };

    const matches = ()=>{
      const q = query.trim().toLowerCase();
      const filtered = stores.filter(s=>{
        const okType = orderType==='pickup' ? s.pickup : s.delivery;
        if(!okType) return false;
        if(!q) return true;
        return (s.name+s.city+s.address).toLowerCase().includes(q);
      });
      return filtered;
    };

    const renderPins = (list)=>{
      const map = qs('[data-map]', storeRoot);
      if(!map) return;
      qsa('.pin', map).forEach(p=>p.remove());
      list.slice(0,5).forEach((s)=>{
        const pin = document.createElement('div');
        pin.className='pin';
        pin.style.left = `${s.x}%`;
        pin.style.top = `${s.y}%`;
        pin.title = s.name;
        map.appendChild(pin);
      });
    };

    const render = ()=>{
      const list = matches();
      if(resultsEl){
        resultsEl.innerHTML = '';
        list.forEach(s=>{
          const el = document.createElement('div');
          el.className='result';
          el.innerHTML = `
            <strong>${s.name}<span class="badge">${orderType==='pickup' ? 'Pickup' : 'Delivery'}</span></strong>
            <small>${s.address} • ${s.city}</small>
            <small>Hours: ${s.hours}</small>
            <div class="tags">${s.features.map(f=>`<span class="tag">${f}</span>`).join('')}</div>
          `;
          resultsEl.appendChild(el);
        });
      }
      renderPins(list);
    };

    const suggest = ()=>{
      if(!sugg || !input) return;
      const q = input.value.trim();
      query = q;
      const opts = ['Seattle, WA','Bellevue, WA','98101','Pine St','Capitol Hill'].filter(x=>x.toLowerCase().includes(q.toLowerCase())).slice(0,5);
      sugg.innerHTML = '';
      if(q.length===0 || opts.length===0){
        sugg.classList.remove('open');
        render();
        return;
      }
      opts.forEach(o=>{
        const b=document.createElement('button');
        b.type='button';
        b.textContent=o;
        b.addEventListener('click', ()=>{
          input.value=o;
          query=o;
          sugg.classList.remove('open');
          render();
        });
        sugg.appendChild(b);
      });
      sugg.classList.add('open');
      render();
    };

    if(input){
      input.addEventListener('input', suggest);
      input.addEventListener('blur', ()=>setTimeout(()=>sugg && sugg.classList.remove('open'), 150));
    }

    if(filterBtn && filterPanel){
      filterBtn.addEventListener('click', ()=>{
        const open = filterPanel.classList.toggle('open');
        filterBtn.setAttribute('aria-expanded', String(open));
      });
      // ensure base class present
      filterPanel.classList.add('panel');
    }

    modeBtns.forEach(b=>b.addEventListener('click', ()=>setOrderType(b.getAttribute('data-order-type'))));
    setOrderType('pickup');
  }
})();
