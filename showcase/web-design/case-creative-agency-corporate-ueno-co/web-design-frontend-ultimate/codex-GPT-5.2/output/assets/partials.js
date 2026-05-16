// Tiny client-side include: swaps any element with `data-include` with fetched HTML.
// Uses two strategies:
// - `fetch()` (works for http(s) and most local servers)
// - hidden iframe + DOM scrape fallback (works for many file:// setups)
(function () {
  function fetchViaIframe(path) {
    return new Promise((resolve, reject) => {
      const iframe = document.createElement('iframe');
      iframe.style.position = 'fixed';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.opacity = '0';
      iframe.style.pointerEvents = 'none';
      iframe.setAttribute('aria-hidden', 'true');
      iframe.src = path;

      const cleanup = () => {
        try {
          iframe.remove();
        } catch {
          // ignore
        }
      };

      iframe.onload = () => {
        try {
          const doc = iframe.contentDocument;
          if (!doc) throw new Error('No iframe document');
          const html = doc.body ? doc.body.innerHTML : '';
          cleanup();
          resolve(html);
        } catch (e) {
          cleanup();
          reject(e);
        }
      };

      iframe.onerror = () => {
        cleanup();
        reject(new Error('Iframe load failed'));
      };

      document.body.appendChild(iframe);
    });
  }

  async function loadInclude(path) {
    try {
      const res = await fetch(path, { cache: 'no-cache' });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return await res.text();
    } catch {
      return await fetchViaIframe(path);
    }
  }

  async function hydrateIncludes() {
    const nodes = Array.from(document.querySelectorAll('[data-include]'));
    for (const el of nodes) {
      const path = el.getAttribute('data-include');
      if (!path) continue;
      try {
        const html = await loadInclude(path);
        el.outerHTML = html;
      } catch (e) {
        console.warn('Include failed:', path, e);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hydrateIncludes);
  } else {
    hydrateIncludes();
  }
})();
