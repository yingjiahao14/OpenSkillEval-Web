/* Global helpers shared across static pages */
function cfSetActiveTopNav(currentPageId){
  document.querySelectorAll('[data-topnav] a[data-page]')
    .forEach(function(a){
      a.removeAttribute('aria-current');
      if(a.dataset.page === currentPageId) a.setAttribute('aria-current', 'page');
    });
}

function cfSetActiveSideNav(currentHref){
  document.querySelectorAll('.side-link').forEach(function(a){
    a.removeAttribute('aria-current');
    if(a.getAttribute('href') === currentHref) a.setAttribute('aria-current', 'true');
  });
}

