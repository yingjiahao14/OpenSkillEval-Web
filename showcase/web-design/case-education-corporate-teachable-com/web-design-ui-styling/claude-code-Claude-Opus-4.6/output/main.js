document.addEventListener('DOMContentLoaded',function(){
  // Mobile menu toggle
  const toggle=document.querySelector('.mobile-toggle');
  const menu=document.querySelector('.mobile-menu');
  if(toggle&&menu){
    toggle.addEventListener('click',function(){
      menu.classList.toggle('active');
      const spans=toggle.querySelectorAll('span');
      if(menu.classList.contains('active')){
        spans[0].style.transform='rotate(45deg) translate(5px,5px)';
        spans[1].style.opacity='0';
        spans[2].style.transform='rotate(-45deg) translate(5px,-5px)';
      }else{
        spans[0].style.transform='';
        spans[1].style.opacity='';
        spans[2].style.transform='';
      }
    });
    menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
      menu.classList.remove('active');
      const spans=toggle.querySelectorAll('span');
      spans[0].style.transform='';spans[1].style.opacity='';spans[2].style.transform='';
    }));
  }

  // FAQ Accordion
  document.querySelectorAll('.faq-question').forEach(function(btn){
    btn.addEventListener('click',function(){
      const item=this.closest('.faq-item');
      const answer=item.querySelector('.faq-answer');
      const inner=answer.querySelector('.faq-answer-inner');
      const wasActive=item.classList.contains('active');
      // close all in same list
      item.closest('.faq-list').querySelectorAll('.faq-item').forEach(function(fi){
        fi.classList.remove('active');
        fi.querySelector('.faq-answer').style.maxHeight='0';
      });
      if(!wasActive){
        item.classList.add('active');
        answer.style.maxHeight=inner.scrollHeight+'px';
      }
    });
  });

  // Demo accordion
  document.querySelectorAll('.demo-trigger').forEach(function(btn){
    btn.addEventListener('click',function(){
      const item=this.closest('.demo-item');
      const content=item.querySelector('.demo-content');
      const inner=content.querySelector('.demo-content-inner');
      const wasActive=item.classList.contains('active');
      item.closest('.demo-accordion').querySelectorAll('.demo-item').forEach(function(di){
        di.classList.remove('active');
        di.querySelector('.demo-content').style.maxHeight='0';
      });
      if(!wasActive){
        item.classList.add('active');
        content.style.maxHeight=inner.scrollHeight+'px';
      }
    });
  });

  // Hero tab switching
  document.querySelectorAll('.tab-btn').forEach(function(btn){
    btn.addEventListener('click',function(){
      const group=this.closest('.hero-tabs');
      group.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
      group.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
      this.classList.add('active');
      const target=document.getElementById(this.dataset.tab);
      if(target)target.classList.add('active');
    });
  });

  // Why choose us tabs
  document.querySelectorAll('.why-tab').forEach(function(btn){
    btn.addEventListener('click',function(){
      document.querySelectorAll('.why-tab').forEach(b=>b.classList.remove('active'));
      document.querySelectorAll('.why-panel').forEach(p=>p.classList.remove('active'));
      this.classList.add('active');
      const target=document.getElementById(this.dataset.panel);
      if(target)target.classList.add('active');
    });
  });

  // Testimonial carousel
  document.querySelectorAll('.carousel-btn').forEach(function(btn){
    btn.addEventListener('click',function(){
      const carousel=this.closest('.testimonials-section').querySelector('.testimonial-carousel');
      const cardWidth=carousel.querySelector('.testimonial-card').offsetWidth+24;
      if(this.classList.contains('carousel-prev')){
        carousel.scrollBy({left:-cardWidth,behavior:'smooth'});
      }else{
        carousel.scrollBy({left:cardWidth,behavior:'smooth'});
      }
    });
  });

  // Scroll fade-in animation
  const observer=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },{threshold:0.1});
  document.querySelectorAll('.fade-in').forEach(el=>observer.observe(el));

  // Stat counter animation
  const statObserver=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        const el=entry.target;
        const text=el.textContent;
        const num=parseFloat(text.replace(/[^0-9.]/g,''));
        if(isNaN(num))return;
        const prefix=text.match(/^[^0-9]*/)[0];
        const suffix=text.match(/[^0-9.]*$/)[0];
        let current=0;
        const duration=1500;
        const start=performance.now();
        function animate(now){
          const elapsed=now-start;
          const progress=Math.min(elapsed/duration,1);
          const eased=1-Math.pow(1-progress,3);
          current=num*eased;
          if(num>=1){
            el.textContent=prefix+Math.round(current)+suffix;
          }else{
            el.textContent=prefix+current.toFixed(1)+suffix;
          }
          if(progress<1)requestAnimationFrame(animate);
          else el.textContent=text;
        }
        requestAnimationFrame(animate);
        statObserver.unobserve(el);
      }
    });
  },{threshold:0.5});
  document.querySelectorAll('.stat-value').forEach(el=>statObserver.observe(el));
});
