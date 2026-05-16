(function(){
  function setCurrentNav(){
    var path=(location.pathname.split('/').pop()||'index.html').toLowerCase();
    document.querySelectorAll('[data-nav]').forEach(function(a){
      var href=(a.getAttribute('href')||'').toLowerCase();
      if(href===path){ a.setAttribute('aria-current','page'); }
      else { a.removeAttribute('aria-current'); }
    });
  }
  document.addEventListener('DOMContentLoaded', setCurrentNav);
})();
