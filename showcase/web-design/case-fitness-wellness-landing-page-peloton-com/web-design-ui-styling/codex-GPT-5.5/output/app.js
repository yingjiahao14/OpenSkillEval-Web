const tabContent = {
  ep: {
    title: 'Exploration & Production',
    text: 'Unify drilling, completions, production and land records so operating teams can plan faster and report with confidence.',
    points: ['Daily operations dashboards', 'Well lifecycle data capture', 'Mobile field reporting']
  },
  midstream: {
    title: 'Midstream Operations',
    text: 'Connect facilities, pipeline assets and operational reporting in one governed environment for dependable throughput decisions.',
    points: ['Facility commissioning workflows', 'Asset integrity visibility', 'Cross-system data exchange']
  },
  downstream: {
    title: 'Downstream Visibility',
    text: 'Bring engineering, operations and compliance records together for safer, more transparent industrial asset management.',
    points: ['Performance monitoring', 'Regulatory evidence trails', 'Executive KPI dashboards']
  },
  utilities: {
    title: 'Utilities & Infrastructure',
    text: 'Manage geospatial assets, obligations and project documentation across distributed infrastructure portfolios.',
    points: ['Land agreement tracking', 'Map-based asset context', 'Mobile site data collection']
  },
  renewables: {
    title: 'Solar, Wind & Carbon Capture',
    text: 'Scale renewable projects with land data, field mobility and integrated views for development, construction and operation.',
    points: ['LandView and LandView Map', 'Construction milestone tracking', 'Carbon capture project support']
  },
  mining: {
    title: 'Mining & Industrial Assets',
    text: 'Apply WellStream data governance to high-value industrial assets that require traceability, inspections and reliable field capture.',
    points: ['Inspection schedules', 'Equipment tracking', 'Secure operational records']
  }
};

const integrationContent = {
  etl: {
    title: 'Managed ETL Pipelines',
    text: 'Automated extract-transform-load pipelines move data between WellStream and enterprise systems on schedule.',
    points: ['Read-only Snowflake access', 'Scheduled orchestration', 'Unified schemas for complex energy data']
  },
  apis: {
    title: 'RESTful APIs',
    text: 'Real-time programmatic access supports custom applications, partner portals and enterprise integration layers.',
    points: ['Secure token-based access', 'Operational data endpoints', 'Designed for third-party integrations']
  },
  dashboards: {
    title: 'Configurable Dashboards',
    text: 'Visualization layers surface insights without requiring exports, helping teams act from shared operational truth.',
    points: ['Executive KPI views', 'Engineer and field dashboards', 'Power BI, Tableau and Spotfire-ready data']
  }
};

const securityContent = {
  security: {
    title: 'Enterprise Security Architecture',
    text: 'Azure-powered infrastructure, SSO, encryption and 24/7 monitoring protect operational data across the platform.',
    points: ['Encryption at rest and in transit', 'Single Sign-On authentication', 'SIEM-based threat detection']
  },
  soc: {
    title: 'SOC Compliance Confidence',
    text: 'SOC 1 & 2 certified compliance verifies controls over financial and operational data handling through annual third-party audits.',
    points: ['Third-party control validation', 'Audit-ready platform evidence', 'Continuous monitoring and response']
  }
};

const companyContent = {
  company: {
    title: 'WellStream: Fearless Innovation',
    text: "From a two-person startup to a global leader, WellStream has built a culture of collaboration and bold ideas for 600+ clients worldwide.",
    points: ['Energy data management focus', 'Mobility and automation at the core', 'Global client enablement']
  },
  careers: {
    title: 'Careers Built Around Impact',
    text: 'Join teams shaping the future of well, production and land data management for operators that run critical energy assets.',
    points: ['Collaborative product teams', 'Complex industrial data challenges', 'Customer-centered implementation culture']
  }
};

function renderPanel(panel, data) {
  panel.innerHTML = `<div><p class="eyebrow">Operational fit</p><h3>${data.title}</h3><p>${data.text}</p></div><ul class="check-list">${data.points.map(point => `<li>${point}</li>`).join('')}</ul>`;
}

function setupTabs(selector, content) {
  document.querySelectorAll(selector).forEach(group => {
    const panel = document.querySelector(group.dataset.target);
    const buttons = [...group.querySelectorAll('[data-tab]')];
    const activate = key => {
      buttons.forEach(button => {
        const active = button.dataset.tab === key;
        button.classList.toggle('active', active);
        button.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      if (panel && content[key]) renderPanel(panel, content[key]);
    };
    buttons.forEach(button => button.addEventListener('click', () => activate(button.dataset.tab)));
    activate(buttons.find(button => button.classList.contains('active'))?.dataset.tab || buttons[0]?.dataset.tab);
  });
}

function setupSimpleTabs() {
  document.querySelectorAll('[data-tab-panel]').forEach(panel => panel.classList.remove('active'));
  document.querySelectorAll('[data-simple-tabs]').forEach(group => {
    const buttons = [...group.querySelectorAll('[data-show]')];
    const activate = id => {
      buttons.forEach(button => button.classList.toggle('active', button.dataset.show === id));
      document.querySelectorAll(`[data-tab-panel="${group.dataset.simpleTabs}"]`).forEach(panel => panel.classList.toggle('active', panel.id === id));
    };
    buttons.forEach(button => button.addEventListener('click', () => activate(button.dataset.show)));
    activate(buttons[0]?.dataset.show);
  });
}

function setupAccordion() {
  document.querySelectorAll('.accordion').forEach(accordion => {
    const items = [...accordion.querySelectorAll('.accordion-item')];
    items.forEach(item => {
      item.querySelector('.accordion-trigger').addEventListener('click', () => {
        items.forEach(other => other.classList.toggle('open', other === item && !item.classList.contains('open')));
      });
    });
    items[0]?.classList.add('open');
  });
}

function setupCarousel() {
  document.querySelectorAll('[data-carousel]').forEach(carousel => {
    const track = carousel.querySelector('.testimonial-track');
    const dots = [...carousel.querySelectorAll('.dot')];
    dots.forEach((dot, index) => dot.addEventListener('click', () => {
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach(item => item.classList.toggle('active', item === dot));
    }));
  });
}

function setupDemoForm() {
  const form = document.querySelector('#demoForm');
  if (!form) return;
  const status = form.querySelector('.form-status');
  form.addEventListener('submit', event => {
    event.preventDefault();
    let valid = true;
    form.querySelectorAll('[required]').forEach(field => {
      const wrapper = field.closest('.field');
      const invalid = !field.value.trim() || (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value));
      wrapper.classList.toggle('invalid', invalid);
      valid = valid && !invalid;
    });
    if (valid) {
      status.textContent = 'Thank you. Your demo request has been received and a WellStream specialist will follow up shortly.';
      status.className = 'form-status success';
      form.reset();
    }
  });
}

function setupCookieBanner() {
  const banner = document.querySelector('.cookie-banner');
  if (!banner || localStorage.getItem('wellstream_cookie_preference')) return;
  banner.style.display = 'block';
  banner.querySelectorAll('[data-cookie]').forEach(button => button.addEventListener('click', () => {
    localStorage.setItem('wellstream_cookie_preference', button.dataset.cookie);
    banner.style.display = 'none';
  }));
}

function setupUseCases() {
  document.querySelectorAll('[data-use-case]').forEach(card => {
    card.addEventListener('click', () => {
      const detail = document.querySelector('.use-case-detail');
      detail.textContent = card.dataset.useCase;
      detail.classList.add('show');
      detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });
}

function setupMobileNav() {
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupTabs('[data-industry-tabs]', tabContent);
  setupTabs('[data-security-tabs]', securityContent);
  setupTabs('[data-integration-tabs]', integrationContent);
  setupTabs('[data-company-tabs]', companyContent);
  setupSimpleTabs();
  setupAccordion();
  setupCarousel();
  setupDemoForm();
  setupCookieBanner();
  setupUseCases();
  setupMobileNav();
});
