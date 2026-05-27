document.addEventListener('DOMContentLoaded', () => {
  // Cookie Banner Logic
  const cookieBanner = document.getElementById('cookieBanner');
  if (cookieBanner && !localStorage.getItem('cookieConsent')) {
    setTimeout(() => {
      cookieBanner.classList.add('visible');
    }, 1000);
  }

  const acceptCookies = document.getElementById('acceptCookies');
  const rejectCookies = document.getElementById('rejectCookies');
  const manageCookies = document.getElementById('manageCookies');
  const cookieModal = document.getElementById('cookieModal');
  const savePreferences = document.getElementById('savePreferences');

  if (acceptCookies) {
    acceptCookies.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'accepted');
      cookieBanner.classList.remove('visible');
    });
  }

  if (rejectCookies) {
    rejectCookies.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'rejected');
      cookieBanner.classList.remove('visible');
    });
  }

  if (manageCookies && cookieModal) {
    manageCookies.addEventListener('click', () => {
      cookieModal.classList.add('visible');
    });
  }

  if (savePreferences && cookieModal) {
    savePreferences.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'custom');
      cookieModal.classList.remove('visible');
      cookieBanner.classList.remove('visible');
    });
  }
});