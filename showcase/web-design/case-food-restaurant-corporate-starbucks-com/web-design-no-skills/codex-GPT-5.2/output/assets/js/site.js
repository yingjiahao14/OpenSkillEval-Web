(function(){
  const storage = {
    get(key, fallback){
      try{ return JSON.parse(localStorage.getItem(key)) ?? fallback; }
      catch{ return fallback; }
    },
    set(key, value){
      try{ localStorage.setItem(key, JSON.stringify(value)); }
      catch{}
    }
  };

  // Active nav highlighting
  const current = document.documentElement.getAttribute('data-page');
  if(current){
    document.querySelectorAll('[data-nav]').forEach(a=>{
      if(a.getAttribute('data-nav') === current){
        a.setAttribute('aria-current','page');
      }
    });
  }

  // Cookie banner
  const cookieKey = 'gb_cookie_ack_v1';
  const cookieBanner = document.querySelector('[data-cookie-banner]');
  if(cookieBanner){
    const ack = storage.get(cookieKey, false);
    if(ack){ cookieBanner.remove(); }
    else{
      cookieBanner.querySelector('[data-cookie-agree]')?.addEventListener('click', ()=>{
        storage.set(cookieKey, true);
        cookieBanner.remove();
      });
      cookieBanner.querySelector('[data-cookie-settings]')?.addEventListener('click', ()=>{
        alert('Cookie settings are placeholders in this demo.');
      });
    }
  }

  // Footer accordion (mobile)
  document.querySelectorAll('[data-footer-col] > h4').forEach((heading)=>{
    heading.addEventListener('click', ()=>{
      const col = heading.closest('[data-footer-col]');
      if(!col) return;
      const open = col.getAttribute('data-open') === 'true';
      col.setAttribute('data-open', String(!open));
    });
  });

  // Tabs (Rewards redemption)
  const tabRoot = document.querySelector('[data-tabs]');
  if(tabRoot){
    const buttons = Array.from(tabRoot.querySelectorAll('[role="tab"]'));
    const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));

    function activateTab(targetId, focus){
      buttons.forEach(btn=>{
        const selected = btn.getAttribute('aria-controls') === targetId;
        btn.setAttribute('aria-selected', String(selected));
        btn.tabIndex = selected ? 0 : -1;
        if(selected && focus) btn.focus();
      });
      panels.forEach(panel=>{
        const match = panel.id === targetId;
        panel.hidden = !match;
      });
    }

    buttons.forEach((btn, idx)=>{
      btn.addEventListener('click', ()=>activateTab(btn.getAttribute('aria-controls'), false));
      btn.addEventListener('keydown', (e)=>{
        const key = e.key;
        if(key !== 'ArrowLeft' && key !== 'ArrowRight' && key !== 'Home' && key !== 'End') return;
        e.preventDefault();
        let nextIndex = idx;
        if(key === 'ArrowLeft') nextIndex = (idx - 1 + buttons.length) % buttons.length;
        if(key === 'ArrowRight') nextIndex = (idx + 1) % buttons.length;
        if(key === 'Home') nextIndex = 0;
        if(key === 'End') nextIndex = buttons.length - 1;
        const next = buttons[nextIndex];
        activateTab(next.getAttribute('aria-controls'), true);
      });
    });

    const initial = buttons.find(b=>b.getAttribute('aria-selected') === 'true') || buttons[0];
    if(initial) activateTab(initial.getAttribute('aria-controls'), false);
  }

  // Carousels
  document.querySelectorAll('[data-carousel]').forEach((root)=>{
    const track = root.querySelector('[data-carousel-track]');
    const prev = root.querySelector('[data-carousel-prev]');
    const next = root.querySelector('[data-carousel-next]');
    if(!track || !prev || !next) return;

    function pageWidth(){
      return Math.max(240, Math.floor(track.clientWidth * 0.92));
    }
    prev.addEventListener('click', ()=>{
      track.scrollBy({left: -pageWidth(), behavior: 'smooth'});
    });
    next.addEventListener('click', ()=>{
      track.scrollBy({left: pageWidth(), behavior: 'smooth'});
    });
  });

  // Store locator (suggestions, filters, pickup/delivery)
  const locator = document.querySelector('[data-locator]');
  if(locator){
    const orderPickup = locator.querySelector('[data-order="pickup"]');
    const orderDelivery = locator.querySelector('[data-order="delivery"]');
    const input = locator.querySelector('[data-locator-input]');
    const suggPanel = locator.querySelector('[data-suggestions]');
    const filterBtn = locator.querySelector('[data-filter-btn]');
    const filterPanel = locator.querySelector('[data-filter-panel]');
    const results = locator.querySelector('[data-results]');
    const map = locator.querySelector('[data-map]');

    const stores = [
      {
        name:'GreenBean Downtown',
        address:'120 Market St, San Francisco, CA',
        hours:'6:00a – 8:00p',
        features:['Mobile order','Drive-thru','Outdoor seating'],
        pickup:true, delivery:true,
        pin:{x:18,y:54}
      },
      {
        name:'GreenBean Mission',
        address:'314 Valencia St, San Francisco, CA',
        hours:'6:30a – 7:30p',
        features:['Mobile order','Pickup'],
        pickup:true, delivery:false,
        pin:{x:56,y:42}
      },
      {
        name:'GreenBean North Beach',
        address:'58 Columbus Ave, San Francisco, CA',
        hours:'6:00a – 9:00p',
        features:['Mobile order','Delivery'],
        pickup:true, delivery:true,
        pin:{x:74,y:62}
      },
      {
        name:'GreenBean Berkeley',
        address:'2010 Shattuck Ave, Berkeley, CA',
        hours:'6:00a – 7:00p',
        features:['Drive-thru','Mobile order'],
        pickup:true, delivery:true,
        pin:{x:32,y:28}
      },
      {
        name:'GreenBean Palo Alto',
        address:'456 University Ave, Palo Alto, CA',
        hours:'6:00a – 7:00p',
        features:['Mobile order','Outdoor seating'],
        pickup:true, delivery:false,
        pin:{x:66,y:22}
      }
    ];

    let state = {
      query:'',
      orderType:'pickup',
      filters:{ driveThru:false, mobileOrder:false, outdoorSeating:false }
    };

    function matchesFilters(store){
      const {driveThru, mobileOrder, outdoorSeating} = state.filters;
      const f = store.features.map(s=>s.toLowerCase());
      if(driveThru && !f.some(v=>v.includes('drive'))) return false;
      if(mobileOrder && !f.some(v=>v.includes('mobile'))) return false;
      if(outdoorSeating && !f.some(v=>v.includes('outdoor'))) return false;
      return true;
    }

    function matchesQuery(store){
      const q = state.query.trim().toLowerCase();
      if(!q) return true;
      return (store.name + ' ' + store.address).toLowerCase().includes(q);
    }

    function matchesOrderType(store){
      return state.orderType === 'pickup' ? store.pickup : store.delivery;
    }

    function visibleStores(){
      return stores.filter(s=>matchesOrderType(s) && matchesQuery(s) && matchesFilters(s));
    }

    function renderResults(){
      if(!results) return;
      const vis = visibleStores();
      if(vis.length === 0){
        results.innerHTML = '<div class="store"><div class="name">No matches</div><div class="meta">Try removing filters or using a broader search.</div></div>';
        renderPins([]);
        return;
      }

      results.innerHTML = vis.map(s=>{
        const chips = s.features.map(f=>`<span class="chip">${escapeHtml(f)}</span>`).join('');
        return `
          <article class="store">
            <div class="top">
              <div>
                <div class="name">${escapeHtml(s.name)}</div>
                <div class="meta">${escapeHtml(s.address)} · <span>${escapeHtml(s.hours)}</span></div>
              </div>
              <a class="btn secondary small" href="#">Directions</a>
            </div>
            <div class="chips">${chips}</div>
          </article>
        `;
      }).join('');
      renderPins(vis);
    }

    function renderPins(vis){
      if(!map) return;
      map.querySelectorAll('.pin').forEach(p=>p.remove());
      vis.forEach((s, idx)=>{
        const pin = document.createElement('div');
        pin.className = 'pin';
        pin.style.left = `calc(${s.pin.x}% - 9px)`;
        pin.style.top = `calc(${s.pin.y}% - 9px)`;
        pin.title = s.name;
        pin.setAttribute('role','button');
        pin.tabIndex = 0;
        pin.addEventListener('click', ()=>{
          const card = results?.querySelectorAll('.store')[idx];
          card?.scrollIntoView({behavior:'smooth', block:'start'});
        });
        pin.addEventListener('keydown', (e)=>{
          if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); pin.click(); }
        });
        map.appendChild(pin);
      });
    }

    function setOrderType(type){
      state.orderType = type;
      if(orderPickup) orderPickup.setAttribute('aria-pressed', String(type==='pickup'));
      if(orderDelivery) orderDelivery.setAttribute('aria-pressed', String(type==='delivery'));
      renderResults();
    }

    function setPanelOpen(open){
      if(!filterPanel) return;
      filterPanel.hidden = !open;
      filterBtn?.setAttribute('aria-expanded', String(open));
    }

    function renderSuggestions(){
      if(!suggPanel || !input) return;
      const q = state.query.trim().toLowerCase();
      if(!q){
        suggPanel.setAttribute('data-open','false');
        suggPanel.innerHTML = '';
        return;
      }

      const candidates = stores
        .map(s=>{
          const city = s.address.split(',')[1]?.trim() || '';
          return [s.name, city, s.address];
        })
        .flat()
        .filter(Boolean)
        .filter(v=>v.toLowerCase().includes(q));

      const unique = Array.from(new Set(candidates)).slice(0,6);
      if(unique.length === 0){
        suggPanel.setAttribute('data-open','false');
        suggPanel.innerHTML = '';
        return;
      }

      suggPanel.innerHTML = unique.map(v=>`<button type="button">${escapeHtml(v)}</button>`).join('');
      suggPanel.setAttribute('data-open','true');
      suggPanel.querySelectorAll('button').forEach((btn)=>{
        btn.addEventListener('click', ()=>{
          input.value = btn.textContent || '';
          state.query = input.value;
          suggPanel.setAttribute('data-open','false');
          renderResults();
        });
      });
    }

    function escapeHtml(s){
      return String(s).replace(/[&<>"']/g, c=>({
        '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
      }[c]));
    }

    orderPickup?.addEventListener('click', ()=>setOrderType('pickup'));
    orderDelivery?.addEventListener('click', ()=>setOrderType('delivery'));
    filterBtn?.addEventListener('click', ()=>{
      const open = filterBtn.getAttribute('aria-expanded') === 'true';
      setPanelOpen(!open);
    });
    locator.querySelectorAll('[data-filter]')?.forEach((cb)=>{
      cb.addEventListener('change', ()=>{
        const key = cb.getAttribute('data-filter');
        state.filters[key] = cb.checked;
        renderResults();
      });
    });

    input?.addEventListener('input', ()=>{
      state.query = input.value;
      renderSuggestions();
      renderResults();
    });
    document.addEventListener('click', (e)=>{
      if(!locator.contains(e.target)){
        suggPanel?.setAttribute('data-open','false');
      }
    });
    input?.addEventListener('focus', ()=>renderSuggestions());

    // initial
    setPanelOpen(false);
    setOrderType('pickup');
    renderResults();
  }
})();

