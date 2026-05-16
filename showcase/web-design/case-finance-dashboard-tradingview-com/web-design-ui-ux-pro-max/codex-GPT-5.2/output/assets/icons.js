export function icon(name) {
  const common = 'fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"';
  switch (name) {
    case 'home':
      return `<svg viewBox="0 0 24 24" aria-hidden="true" ${common}><path d="M3 10.5 12 3l9 7.5"/><path d="M5.5 10.5V21h13V10.5"/></svg>`;
    case 'chart':
      return `<svg viewBox="0 0 24 24" aria-hidden="true" ${common}><path d="M4 19V5"/><path d="M4 19h16"/><path d="M7 15l3-4 3 2 5-7"/></svg>`;
    case 'markets':
      return `<svg viewBox="0 0 24 24" aria-hidden="true" ${common}><path d="M4 20V10"/><path d="M10 20V4"/><path d="M16 20v-8"/><path d="M22 20H2"/></svg>`;
    case 'ideas':
      return `<svg viewBox="0 0 24 24" aria-hidden="true" ${common}><path d="M12 3a7 7 0 0 0-4 12c.6.5 1 1.2 1.1 2h5.8c.1-.8.5-1.5 1.1-2A7 7 0 0 0 12 3Z"/><path d="M9 21h6"/></svg>`;
    case 'brokers':
      return `<svg viewBox="0 0 24 24" aria-hidden="true" ${common}><path d="M4 10h16"/><path d="M6 10V6h12v4"/><path d="M8 14v6"/><path d="M12 14v6"/><path d="M16 14v6"/></svg>`;
    case 'community':
      return `<svg viewBox="0 0 24 24" aria-hidden="true" ${common}><path d="M16 11a4 4 0 1 0-8 0"/><path d="M5 21a7 7 0 0 1 14 0"/><path d="M19 8a3 3 0 1 1 0 6"/></svg>`;
    case 'chev':
      return `<svg viewBox="0 0 24 24" aria-hidden="true" ${common}><path d="m6 9 6 6 6-6"/></svg>`;
    case 'search':
      return `<svg viewBox="0 0 24 24" aria-hidden="true" ${common}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>`;
    default:
      return `<svg viewBox="0 0 24 24" aria-hidden="true" ${common}><path d="M4 12h16"/></svg>`;
  }
}

