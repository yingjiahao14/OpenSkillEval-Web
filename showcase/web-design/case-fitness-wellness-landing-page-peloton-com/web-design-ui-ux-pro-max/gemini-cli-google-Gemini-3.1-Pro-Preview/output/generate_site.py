import os

OUT_DIR = "/app/output"
os.makedirs(OUT_DIR, exist_ok=True)
os.makedirs(os.path.join(OUT_DIR, "css"), exist_ok=True)
os.makedirs(os.path.join(OUT_DIR, "js"), exist_ok=True)

CSS_CONTENT = """
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

:root {
  --primary-navy: #15295A;
  --accent-green: #6CC24A;
  --dark-gray: #3C424B;
  
  --bg-deep: #0D1B2A;
  --bg-surface: #1B2838;
  --bg-surface-hover: #263850;
  
  --accent-blue: #00B4D8;
  --accent-blue-hover: #0077B6;
  
  --text-primary: #FFFFFF;
  --text-secondary: #A9B2C3;
  --text-muted: #6B7280;
  
  --border-color: rgba(255, 255, 255, 0.1);
  --border-color-light: rgba(255, 255, 255, 0.2);
  
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;
  --spacing-3xl: 64px;
  --spacing-4xl: 96px;
  
  --transition-fast: 150ms ease;
  --transition-normal: 300ms ease;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', sans-serif;
  background-color: var(--bg-deep);
  color: var(--text-primary);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

a {
  color: var(--accent-blue);
  text-decoration: none;
  transition: color var(--transition-fast);
}

a:hover {
  color: var(--accent-blue-hover);
}

ul {
  list-style: none;
}

/* Layout */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
}

section {
  padding: var(--spacing-4xl) 0;
}

/* Typography */
h1, h2, h3, h4, h5, h6 {
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: var(--spacing-md);
  color: var(--text-primary);
}

h1 { font-size: 3.5rem; letter-spacing: -1px; }
h2 { font-size: 2.5rem; letter-spacing: -0.5px; }
h3 { font-size: 1.75rem; }
p { margin-bottom: var(--spacing-md); color: var(--text-secondary); }

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  border: 1px solid transparent;
  font-size: 1rem;
}

.btn-primary {
  background-color: var(--accent-blue);
  color: #000;
}

.btn-primary:hover {
  background-color: var(--accent-blue-hover);
  color: #fff;
  transform: translateY(-1px);
}

.btn-secondary {
  background-color: transparent;
  border-color: var(--border-color-light);
  color: var(--text-primary);
}

.btn-secondary:hover {
  border-color: var(--text-primary);
  background-color: rgba(255,255,255,0.05);
}

.btn-accent {
  background-color: var(--accent-green);
  color: #000;
}
.btn-accent:hover {
  background-color: #5ab03a;
  color: #000;
}

/* Header */
header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: rgba(13, 27, 42, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-color);
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 72px;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo-icon {
  width: 24px;
  height: 24px;
  fill: var(--accent-blue);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
}

.nav-item {
  position: relative;
}

.nav-link {
  color: var(--text-primary);
  font-weight: 500;
  font-size: 0.95rem;
}

.nav-link:hover {
  color: var(--accent-blue);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  min-width: 200px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all var(--transition-fast);
  padding: var(--spacing-sm) 0;
  box-shadow: 0 10px 25px rgba(0,0,0,0.5);
}

.nav-item.dropdown:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-item {
  display: block;
  padding: 8px 16px;
  color: var(--text-secondary);
}

.dropdown-item:hover {
  background-color: var(--bg-surface-hover);
  color: var(--text-primary);
}

/* Mobile Nav */
.menu-toggle {
  display: none;
  background: none;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
    position: absolute;
    top: 72px;
    left: 0;
    right: 0;
    flex-direction: column;
    background-color: var(--bg-deep);
    padding: var(--spacing-md);
    border-bottom: 1px solid var(--border-color);
  }
  
  .nav-links.active {
    display: flex;
  }
  
  .menu-toggle {
    display: block;
  }
  
  .nav-item.dropdown:hover .dropdown-menu {
    position: static;
    box-shadow: none;
    transform: none;
    opacity: 1;
    visibility: visible;
    border: none;
    padding-left: var(--spacing-md);
  }
}

/* Footer */
footer {
  background-color: var(--primary-navy);
  padding: var(--spacing-4xl) 0 var(--spacing-lg);
  border-top: 1px solid var(--border-color);
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-2xl);
  margin-bottom: var(--spacing-3xl);
}

.footer-col h4 {
  font-size: 1rem;
  margin-bottom: var(--spacing-md);
  color: var(--text-primary);
}

.footer-col ul li {
  margin-bottom: var(--spacing-sm);
}

.footer-col ul li a {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.footer-col ul li a:hover {
  color: var(--accent-blue);
}

.footer-bottom {
  border-top: 1px solid rgba(255,255,255,0.1);
  padding-top: var(--spacing-lg);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .footer-bottom {
    flex-direction: column;
    gap: var(--spacing-md);
    text-align: center;
  }
}

/* Forms */
.form-group {
  margin-bottom: var(--spacing-md);
}

label {
  display: block;
  margin-bottom: var(--spacing-xs);
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-primary);
}

input, textarea, select {
  width: 100%;
  padding: 12px;
  background-color: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  color: var(--text-primary);
  font-family: inherit;
  transition: border-color var(--transition-fast);
}

input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: var(--accent-blue);
}

.form-error {
  color: #ef4444;
  font-size: 0.85rem;
  margin-top: 4px;
  display: none;
}

/* Tabs */
.tabs-nav {
  display: flex;
  gap: var(--spacing-md);
  border-bottom: 1px solid var(--border-color);
  margin-bottom: var(--spacing-xl);
  overflow-x: auto;
  scrollbar-width: none;
}

.tabs-nav::-webkit-scrollbar {
  display: none;
}

.tab-btn {
  background: none;
  border: none;
  padding: 12px 16px;
  color: var(--text-secondary);
  font-weight: 600;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  white-space: nowrap;
  transition: all var(--transition-fast);
}

.tab-btn:hover {
  color: var(--text-primary);
}

.tab-btn.active {
  color: var(--accent-blue);
  border-bottom-color: var(--accent-blue);
}

.tab-content {
  display: none;
  animation: fadeIn 300ms ease;
}

.tab-content.active {
  display: block;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Accordion */
.accordion-item {
  border: 1px solid var(--border-color);
  border-radius: 4px;
  margin-bottom: var(--spacing-sm);
  background-color: var(--bg-surface);
  overflow: hidden;
}

.accordion-header {
  padding: var(--spacing-md);
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  color: var(--text-primary);
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.accordion-icon {
  transition: transform var(--transition-fast);
}

.accordion-item.active .accordion-icon {
  transform: rotate(180deg);
}

.accordion-content {
  padding: 0 var(--spacing-md);
  max-height: 0;
  overflow: hidden;
  transition: max-height 300ms ease, padding 300ms ease;
  color: var(--text-secondary);
}

.accordion-item.active .accordion-content {
  padding: 0 var(--spacing-md) var(--spacing-md);
  max-height: 500px;
}

/* Cookie Banner */
.cookie-banner {
  position: fixed;
  bottom: var(--spacing-lg);
  left: var(--spacing-lg);
  right: var(--spacing-lg);
  max-width: 600px;
  margin: 0 auto;
  background-color: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  box-shadow: 0 10px 25px rgba(0,0,0,0.5);
  z-index: 1000;
  transform: translateY(150%);
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.cookie-banner.show {
  transform: translateY(0);
}

.cookie-actions {
  display: flex;
  gap: var(--spacing-sm);
  justify-content: flex-end;
}

/* Specific Page Styles */

/* Hero */
.hero {
  text-align: center;
  padding: var(--spacing-4xl) 0;
  background: radial-gradient(circle at 50% -20%, rgba(0, 180, 216, 0.15), transparent 60%);
}

.hero h1 {
  max-width: 900px;
  margin: 0 auto var(--spacing-md);
}

.hero p {
  max-width: 700px;
  margin: 0 auto var(--spacing-lg);
  font-size: 1.25rem;
}

.hero-actions {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
}

/* Feature Banner */
.feature-banner {
  background-color: var(--accent-blue);
  color: #000;
  padding: var(--spacing-md) 0;
  text-align: center;
}
.feature-banner p {
  color: #000;
  margin: 0;
  font-weight: 600;
}
.feature-banner a {
  color: #000;
  text-decoration: underline;
  margin-left: 8px;
}

/* Grid Layouts */
.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-2xl);
  align-items: center;
}
.grid-3 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}

@media (max-width: 768px) {
  .grid-2 {
    grid-template-columns: 1fr;
  }
}

/* Cards */
.card {
  background-color: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: var(--spacing-lg);
  transition: transform var(--transition-fast), border-color var(--transition-fast);
}

.card:hover {
  transform: translateY(-4px);
  border-color: var(--accent-blue);
}

.card h3 {
  font-size: 1.25rem;
  margin-bottom: var(--spacing-sm);
}

/* Diagrams */
.diagram-container {
  background-color: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: var(--spacing-2xl);
  position: relative;
  overflow: hidden;
}

.diagram-svg {
  width: 100%;
  height: auto;
}

/* Stats */
.stat-circle {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 4px solid var(--accent-blue);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--spacing-md);
  background: radial-gradient(circle at center, rgba(0, 180, 216, 0.1), transparent);
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1;
}

.stat-label {
  text-align: center;
  font-size: 0.9rem;
}

/* Timeline */
.timeline {
  position: relative;
  padding-left: 20px;
}

.timeline::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 2px;
  background-color: var(--border-color);
}

.timeline-item {
  position: relative;
  margin-bottom: var(--spacing-lg);
}

.timeline-dot {
  position: absolute;
  left: -25px;
  top: 5px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: var(--accent-blue);
}

.progress-bar {
  height: 8px;
  background-color: var(--bg-surface-hover);
  border-radius: 4px;
  margin-top: 8px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: var(--accent-green);
  border-radius: 4px;
}

/* Testimonials */
.testimonial-carousel {
  overflow: hidden;
  position: relative;
}

.testimonial-track {
  display: flex;
  transition: transform 500ms ease;
}

.testimonial-slide {
  min-width: 100%;
  padding: var(--spacing-lg);
  text-align: center;
}

.testimonial-quote {
  font-size: 1.5rem;
  font-style: italic;
  margin-bottom: var(--spacing-md);
  color: var(--text-primary);
}

.testimonial-author {
  color: var(--accent-blue);
  font-weight: 600;
}

.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: var(--spacing-md);
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: var(--border-color);
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

.dot.active {
  background-color: var(--accent-blue);
}

/* Lists */
.check-list li {
  position: relative;
  padding-left: 32px;
  margin-bottom: var(--spacing-sm);
}

.check-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  top: 0;
  color: var(--accent-green);
  font-weight: bold;
}

"""
with open(os.path.join(OUT_DIR, "css", "style.css"), "w") as f:
    f.write(CSS_CONTENT)

JS_CONTENT = """
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Tabs
  const tabContainers = document.querySelectorAll('.tabs-container');
  tabContainers.forEach(container => {
    const tabs = container.querySelectorAll('.tab-btn');
    const contents = container.querySelectorAll('.tab-content');
    
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));
        
        tab.classList.add('active');
        contents[index].classList.add('active');
      });
    });
  });

  // Accordion
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all
      accordionItems.forEach(i => i.classList.remove('active'));
      
      // Open clicked if it wasn't active
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // Testimonial Carousel
  const track = document.querySelector('.testimonial-track');
  const dots = document.querySelectorAll('.carousel-dots .dot');
  if (track && dots.length > 0) {
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        dots.forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
        track.style.transform = `translateX(-${index * 100}%)`;
      });
    });
  }

  // Form Validation
  const demoForm = document.getElementById('demoForm');
  if (demoForm) {
    demoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;
      
      const requiredFields = demoForm.querySelectorAll('[required]');
      requiredFields.forEach(field => {
        const errorMsg = field.nextElementSibling;
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = '#ef4444';
          if (errorMsg && errorMsg.classList.contains('form-error')) {
            errorMsg.style.display = 'block';
          }
        } else {
          field.style.borderColor = '';
          if (errorMsg && errorMsg.classList.contains('form-error')) {
            errorMsg.style.display = 'none';
          }
        }
      });
      
      if (isValid) {
        // Simulate submission
        const btn = demoForm.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = 'Submitting...';
        btn.disabled = true;
        
        setTimeout(() => {
          alert('Demo request submitted successfully!');
          demoForm.reset();
          btn.textContent = originalText;
          btn.disabled = false;
        }, 1000);
      }
    });
  }

  // Cookie Banner
  const cookieBanner = document.getElementById('cookieBanner');
  const acceptBtn = document.getElementById('acceptCookies');
  const declineBtn = document.getElementById('declineCookies');
  
  if (cookieBanner && !localStorage.getItem('cookieConsent')) {
    setTimeout(() => {
      cookieBanner.classList.add('show');
    }, 1000);
    
    if (acceptBtn) {
      acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieBanner.classList.remove('show');
      });
    }
    
    if (declineBtn) {
      declineBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'declined');
        cookieBanner.classList.remove('show');
      });
    }
  }
});
"""
with open(os.path.join(OUT_DIR, "js", "main.js"), "w") as f:
    f.write(JS_CONTENT)

def make_header():
    return """
  <header>
    <div class="container nav-container">
      <a href="index.html" class="logo">
        <svg class="logo-icon" viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z"/></svg>
        WellStream
      </a>
      <button class="menu-toggle">☰</button>
      <ul class="nav-links">
        <li class="nav-item dropdown">
          <a href="#" class="nav-link">Platform ▾</a>
          <div class="dropdown-menu">
            <a href="platform-overview.html" class="dropdown-item">Platform Overview</a>
            <a href="security.html" class="dropdown-item">Security</a>
            <a href="integration.html" class="dropdown-item">Integration</a>
          </div>
        </li>
        <li class="nav-item"><a href="request-demo.html" class="nav-link btn btn-primary" style="padding: 8px 16px; margin-left: 16px;">Request A Demo</a></li>
      </ul>
    </div>
  </header>
"""

def make_footer():
    return """
  <footer>
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col">
          <h4>Platform</h4>
          <ul>
            <li><a href="platform-overview.html">Platform Overview</a></li>
            <li><a href="security.html">Security</a></li>
            <li><a href="integration.html">Integration</a></li>
            <li><a href="#">Services + Support</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Solutions</h4>
          <ul>
            <li><a href="#">By Industry</a></li>
            <li><a href="#">By Use Case</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Legal</h4>
          <ul>
            <li><a href="#">Cookie Settings</a></li>
            <li><a href="#">Exercise Your Rights</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Login portals</h4>
          <ul>
            <li><a href="#">WellStream Platform</a></li>
            <li><a href="#">WellStream Frac</a></li>
            <li><a href="#">Locksmith</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 WellStream Platform. All rights reserved.</p>
        <div class="social-links">
          <a href="#">LinkedIn</a> | <a href="#">Twitter</a>
        </div>
      </div>
    </div>
  </footer>
"""

# index.html
html_index = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>WellStream Platform — Integrated Energy Data Management</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div class="feature-banner">
    <p>WellStream Innova - Real-Time Drilling <a href="#">Learn More</a></p>
  </div>
  {make_header()}
  
  <main>
    <section class="hero">
      <div class="container">
        <h1>GET REAL-TIME DATA ACROSS YOUR ENTIRE OPERATION</h1>
        <p>The integrated energy data platform built for operators who demand speed, security, and visibility across the well data lifecycle.</p>
        <div class="hero-actions">
          <a href="platform-overview.html" class="btn btn-primary">Explore the Platform</a>
          <a href="request-demo.html" class="btn btn-secondary">Request A Demo</a>
        </div>
      </div>
    </section>

    <section class="use-cases">
      <div class="container">
        <h2 style="text-align:center;">See the WellStream Platform in Action</h2>
        <p style="text-align:center; max-width:800px; margin:0 auto var(--spacing-xl);">From drilling to production, land to water, watch how WellStream transforms every phase of your operations. Streamline workflows, unlock real-time insights, and make every decision count with seamless, end-to-end data integration. Get it all—effortlessly.</p>
        
        <div class="tabs-container">
          <div class="tabs-nav" style="justify-content:center;">
            <button class="tab-btn active">E&P</button>
            <button class="tab-btn">Midstream</button>
            <button class="tab-btn">Downstream</button>
            <button class="tab-btn">Utilities</button>
            <button class="tab-btn">Solar/Wind</button>
            <button class="tab-btn">Mining</button>
          </div>
          
          <div class="tab-content active">
            <div class="grid-3" id="use-cases-grid">
              <a href="#" class="card" style="display:block;">
                <h3>Drilling & Completions Management</h3>
                <p>Centralize drilling programs, daily reports, and well design data in one accessible hub.</p>
              </a>
              <a href="#" class="card" style="display:block;">
                <h3>Production Operations Oversight</h3>
                <p>Monitor production volumes, allocations, and decline curves with real-time dashboards.</p>
              </a>
              <a href="#" class="card" style="display:block;">
                <h3>Asset Integrity Monitoring</h3>
                <p>Track well integrity risks, inspection schedules, and compliance status across your portfolio.</p>
              </a>
              <a href="#" class="card" style="display:block;">
                <h3>Hydraulic Frac Data Centralization</h3>
                <p>Consolidate frac stage data, chemical usage, and pressure readings for every completion.</p>
              </a>
              <a href="#" class="card" style="display:block;">
                <h3>Facility Construction & Commissioning</h3>
                <p>Manage site activity, construction milestones, and commissioning workflows digitally.</p>
              </a>
              <a href="#" class="card" style="display:block;">
                <h3>Geospatial Asset Analysis</h3>
                <p>Visualize well locations, land positions, and infrastructure on interactive map layers.</p>
              </a>
            </div>
          </div>
          <div class="tab-content"><p style="text-align:center;">Midstream solutions coming soon.</p></div>
          <div class="tab-content"><p style="text-align:center;">Downstream solutions coming soon.</p></div>
          <div class="tab-content"><p style="text-align:center;">Utilities solutions coming soon.</p></div>
          <div class="tab-content"><p style="text-align:center;">Solar/Wind solutions coming soon.</p></div>
          <div class="tab-content"><p style="text-align:center;">Mining solutions coming soon.</p></div>
        </div>
        <div style="text-align:center; margin-top:var(--spacing-xl);">
          <a href="#" class="btn btn-secondary">More Use Cases</a>
        </div>
      </div>
    </section>

    <section class="platform-ecosystem" style="background-color: var(--bg-surface);">
      <div class="container">
        <h2 style="text-align:center;">Platform Overview Diagram</h2>
        <div class="diagram-container" style="text-align:center; padding:var(--spacing-4xl) var(--spacing-lg);">
          <svg viewBox="0 0 800 400" class="diagram-svg" style="max-width:800px; margin:0 auto;">
            <rect x="50" y="100" width="200" height="200" rx="10" fill="var(--bg-deep)" stroke="var(--accent-blue)" stroke-width="2"/>
            <text x="150" y="190" fill="white" text-anchor="middle" font-weight="bold">Well Data Lifecycle</text>
            <text x="150" y="215" fill="var(--text-secondary)" text-anchor="middle" font-size="12">Plan, drill, complete,</text>
            <text x="150" y="230" fill="var(--text-secondary)" text-anchor="middle" font-size="12">manage wells</text>

            <rect x="300" y="100" width="200" height="200" rx="10" fill="var(--bg-deep)" stroke="var(--accent-green)" stroke-width="2"/>
            <text x="400" y="190" fill="white" text-anchor="middle" font-weight="bold">Production Data</text>
            <text x="400" y="215" fill="var(--text-secondary)" text-anchor="middle" font-size="12">Capture, allocate,</text>
            <text x="400" y="230" fill="var(--text-secondary)" text-anchor="middle" font-size="12">report, optimize</text>

            <rect x="550" y="100" width="200" height="200" rx="10" fill="var(--bg-deep)" stroke="var(--accent-blue)" stroke-width="2"/>
            <text x="650" y="190" fill="white" text-anchor="middle" font-weight="bold">Land Data Management</text>
            <text x="650" y="215" fill="var(--text-secondary)" text-anchor="middle" font-size="12">Track leases, agreements,</text>
            <text x="650" y="230" fill="var(--text-secondary)" text-anchor="middle" font-size="12">mineral rights</text>

            <path d="M 250 200 L 300 200" stroke="white" stroke-width="2" stroke-dasharray="5,5" fill="none"/>
            <path d="M 500 200 L 550 200" stroke="white" stroke-width="2" stroke-dasharray="5,5" fill="none"/>
          </svg>
        </div>
      </div>
    </section>

    <section class="company-culture">
      <div class="container grid-2">
        <div>
          <h2>WellStream: Fearless Innovation</h2>
          <p>At WellStream, innovation drives everything we do. From a two-person startup to a global leader, we've built a culture of collaboration and bold ideas. Join a team that empowers 600+ clients worldwide with cutting-edge solutions in well, production, and land data management. With mobility, automation, and data integration at our core, we're shaping the future of energy together.</p>
          <a href="#" class="btn btn-secondary">Find Out More</a>
        </div>
        <div style="background-image: linear-gradient(135deg, var(--bg-surface), var(--primary-navy)); border-radius: 8px; min-height: 300px;"></div>
      </div>
    </section>

    <section class="renewables-cta" style="background-color: var(--accent-green); color: #000; text-align:center;">
      <div class="container">
        <h2 style="color: #000;">WellStream Renewables</h2>
        <p style="color: #111; max-width: 700px; margin: 0 auto var(--spacing-lg);">Unlock peak efficiency with WellStream Land. Our tools, LandView and LandView Map, supercharge solar, wind, utilities, geothermal, and carbon capture projects. Drive energy innovation and transform your operations now.</p>
        <a href="#" class="btn btn-primary">Find Out More</a>
      </div>
    </section>
  </main>

  <div class="cookie-banner" id="cookieBanner">
    <div>
      <h4 style="margin-bottom:8px;">Cookie Preferences</h4>
      <p style="font-size:0.9rem; margin:0;">We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.</p>
    </div>
    <div class="cookie-actions">
      <button class="btn btn-secondary" id="declineCookies" style="padding: 8px 16px; font-size: 0.85rem;">Decline</button>
      <button class="btn btn-primary" id="acceptCookies" style="padding: 8px 16px; font-size: 0.85rem;">Accept</button>
    </div>
  </div>

  {make_footer()}
  <script src="js/main.js"></script>
</body>
</html>"""

with open(os.path.join(OUT_DIR, "index.html"), "w") as f:
    f.write(html_index)

# platform-overview.html
html_platform = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Platform Overview - WellStream Platform</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  {make_header()}
  
  <main>
    <section class="hero" style="padding: var(--spacing-3xl) 0;">
      <div class="container">
        <h1>Platform Overview</h1>
        <p>A unified data management ecosystem for energy operators.</p>
      </div>
    </section>

    <section class="platform-benefits">
      <div class="container">
        <div class="grid-3" id="platform-benefits">
          <div class="card">
            <h3>Save Time</h3>
            <p>Eliminate manual data entry and redundant workflows with automated data capture and centralized reporting.</p>
          </div>
          <div class="card">
            <h3>Save Resources</h3>
            <p>Reduce headcount dedicated to spreadsheet management by consolidating tools into one platform.</p>
          </div>
          <div class="card">
            <h3>Save Money</h3>
            <p>Lower total cost of ownership versus maintaining multiple legacy systems and on-premise servers.</p>
          </div>
          <div class="card">
            <h3>Stay Connected</h3>
            <p>Access your data from any device, anywhere, with cloud-native mobile and desktop applications.</p>
          </div>
          <div class="card">
            <h3>Stay Secure</h3>
            <p>Enterprise-grade security with SOC compliance, SSO, and continuous monitoring protects your critical data.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="stats" style="background-color: var(--bg-surface);">
      <div class="container">
        <h2 style="text-align:center; margin-bottom: var(--spacing-2xl);">Platform Statistics</h2>
        <div class="grid-3" id="platform-stats">
          <div>
            <div class="stat-circle">
              <span class="stat-value">80</span>
            </div>
            <p class="stat-label">companies trust WellStream to manage their energy data</p>
          </div>
          <div>
            <div class="stat-circle">
              <span class="stat-value">89%</span>
            </div>
            <p class="stat-label">of clients are actively pursuing digital transformation initiatives</p>
          </div>
          <div>
            <div class="stat-circle">
              <span class="stat-value">31%</span>
            </div>
            <p class="stat-label">reported significant return on investment within the first year</p>
          </div>
        </div>
      </div>
    </section>

    <section class="implementation-timeline">
      <div class="container grid-2">
        <div>
          <h2>Implementation Timeline</h2>
          <p>Deploy quickly regardless of your operational scale.</p>
          <div class="timeline" id="implementation-timeline">
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <h4>3 WEEKS</h4>
              <p>Independent Operator, from the demo to launch</p>
              <div class="progress-bar"><div class="progress-fill" style="width: 15%;"></div></div>
            </div>
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <h4>5 MONTHS</h4>
              <p>Major Operator with extensive data log</p>
              <div class="progress-bar"><div class="progress-fill" style="width: 45%;"></div></div>
            </div>
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <h4>12 MONTHS</h4>
              <p>Super Major International Operator</p>
              <div class="progress-bar"><div class="progress-fill" style="width: 100%;"></div></div>
            </div>
          </div>
        </div>
        
        <div>
          <h2>Platform Capabilities</h2>
          <div class="accordion">
            <div class="accordion-item active">
              <button class="accordion-header">Get Speed <span class="accordion-icon">▼</span></button>
              <div class="accordion-content">
                <p>Deploy in weeks, not years. Cloud-native architecture means zero hardware and instant scalability.</p>
              </div>
            </div>
            <div class="accordion-item">
              <button class="accordion-header">Get Secure <span class="accordion-icon">▼</span></button>
              <div class="accordion-content">
                <p>SOC 1 & 2 certified, Azure-powered infrastructure with 24/7 monitoring and encryption at rest and in transit.</p>
              </div>
            </div>
            <div class="accordion-item">
              <button class="accordion-header">Get Mobility <span class="accordion-icon">▼</span></button>
              <div class="accordion-content">
                <p>Field-ready mobile apps that sync in real time, even in low-connectivity environments.</p>
              </div>
            </div>
            <div class="accordion-item">
              <button class="accordion-header">Get Real-Time Reporting <span class="accordion-icon">▼</span></button>
              <div class="accordion-content">
                <p>Configurable dashboards deliver live KPIs to executives, engineers, and field teams simultaneously.</p>
              </div>
            </div>
            <div class="accordion-item">
              <button class="accordion-header">Get Connected <span class="accordion-icon">▼</span></button>
              <div class="accordion-content">
                <p>Open APIs, ETL pipelines, and pre-built connectors integrate WellStream with your existing tech stack.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <section class="data-lifecycle-diagram" style="background-color: var(--bg-surface);">
      <div class="container">
         <h2 style="text-align:center;">Data Lifecycle Diagram</h2>
         <div class="diagram-container" style="text-align:center; padding:var(--spacing-4xl) var(--spacing-lg);">
          <svg viewBox="0 0 600 300" class="diagram-svg" style="max-width:600px; margin:0 auto;">
            <circle cx="150" cy="150" r="80" fill="var(--bg-deep)" stroke="var(--accent-blue)" stroke-width="3"/>
            <text x="150" y="145" fill="white" text-anchor="middle" font-weight="bold">Data Capture</text>
            <text x="150" y="165" fill="var(--text-secondary)" text-anchor="middle" font-size="12">Field & API</text>

            <circle cx="300" cy="150" r="80" fill="var(--bg-deep)" stroke="var(--accent-green)" stroke-width="3"/>
            <text x="300" y="145" fill="white" text-anchor="middle" font-weight="bold">Processing</text>
            <text x="300" y="165" fill="var(--text-secondary)" text-anchor="middle" font-size="12">Cloud native</text>

            <circle cx="450" cy="150" r="80" fill="var(--bg-deep)" stroke="var(--accent-blue)" stroke-width="3"/>
            <text x="450" y="145" fill="white" text-anchor="middle" font-weight="bold">Analysis</text>
            <text x="450" y="165" fill="var(--text-secondary)" text-anchor="middle" font-size="12">Dashboards</text>
            
            <path d="M 230 150 L 220 150" stroke="white" stroke-width="2" marker-end="url(#arrowhead)"/>
            <path d="M 380 150 L 370 150" stroke="white" stroke-width="2" marker-end="url(#arrowhead)"/>
          </svg>
        </div>
      </div>
    </section>

    <section class="company-info" style="background-color: var(--bg-deep);">
      <div class="container">
        <h2 style="text-align:center; margin-bottom:var(--spacing-xl);">Learn More About Us</h2>
        <div class="tabs-container" id="platform-tabs">
          <div class="tabs-nav" style="justify-content:center;">
            <button class="tab-btn active">Our Company</button>
            <button class="tab-btn">Careers</button>
          </div>
          <div class="tab-content active">
            <div class="grid-2">
              <div>
                <h3>WellStream: Fearless Innovation</h3>
                <p>At WellStream, innovation drives everything we do. From a two-person startup to a global leader, we've built a culture of collaboration and bold ideas. Join a team that empowers 600+ clients worldwide with cutting-edge solutions in well, production, and land data management.</p>
              </div>
            </div>
          </div>
          <div class="tab-content">
            <div class="grid-2">
              <div>
                <h3>Join Our Team</h3>
                <p>We are always looking for talented individuals to join our mission of transforming the energy industry. Explore open positions in engineering, sales, and support.</p>
                <a href="#" class="btn btn-secondary">View Open Roles</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="testimonials">
      <div class="container">
        <h2 style="text-align:center; margin-bottom:var(--spacing-xl);">What Our Clients Say</h2>
        <div class="testimonial-carousel">
          <div class="testimonial-track">
            <div class="testimonial-slide">
              <p class="testimonial-quote">"WellStream cut our reporting cycle from days to minutes. We finally have one source of truth."</p>
              <p class="testimonial-author">— VP Operations, Mid-Continent E&P</p>
            </div>
            <div class="testimonial-slide">
              <p class="testimonial-quote">"Implementation was seamless. The team had us live in under four weeks."</p>
              <p class="testimonial-author">— Data Manager, Permian Basin Operator</p>
            </div>
            <div class="testimonial-slide">
              <p class="testimonial-quote">"The mobile app changed how our field teams capture data—no more paper tickets."</p>
              <p class="testimonial-author">— Completions Engineer, Rockies Operator</p>
            </div>
          </div>
          <div class="carousel-dots">
            <div class="dot active"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
        </div>
      </div>
    </section>
  </main>

  {make_footer()}
  <script src="js/main.js"></script>
</body>
</html>"""

with open(os.path.join(OUT_DIR, "platform-overview.html"), "w") as f:
    f.write(html_platform)

# security.html
html_security = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Security - WellStream Platform</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  {make_header()}
  
  <main>
    <section class="hero" style="padding: var(--spacing-3xl) 0;">
      <div class="container">
        <h1>Enterprise-Grade Security</h1>
        <p>Protecting your critical energy data with continuous monitoring and compliance.</p>
      </div>
    </section>

    <section class="security-details">
      <div class="container">
        <div class="tabs-container">
          <div class="tabs-nav">
            <button class="tab-btn active">Security</button>
            <button class="tab-btn">SOC Compliance</button>
          </div>
          
          <div class="tab-content active">
            <div class="grid-2">
              <div>
                <h2>Comprehensive Protection</h2>
                <p>We take data security seriously. WellStream employs defense-in-depth strategies to secure your operations data at rest, in transit, and during processing.</p>
                <ul class="check-list" id="security-features">
                  <li>SOC 1 & 2 Certified Compliance</li>
                  <li>Powered by Microsoft Azure</li>
                  <li>Performance Monitoring</li>
                  <li>Single Sign-On (SSO) Authentication</li>
                  <li>Security Information and Event Management (SIEM) System</li>
                </ul>
              </div>
              <div class="diagram-container">
                <div style="background-color: var(--primary-navy); border-radius: 8px; padding: var(--spacing-2xl); text-align:center; height:100%; display:flex; flex-direction:column; justify-content:center;">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" stroke-width="2" style="margin: 0 auto var(--spacing-md);">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  <h3 style="margin-bottom:0;">Secure Infrastructure</h3>
                </div>
              </div>
            </div>
          </div>
          
          <div class="tab-content">
            <div class="grid-2">
              <div>
                <h2>SOC 1 & 2 Certified</h2>
                <p>Annual third-party audits verify controls over financial and operational data handling. WellStream adheres to the highest industry standards for security, availability, processing integrity, confidentiality, and privacy.</p>
              </div>
              <div class="card" style="text-align:center;">
                <h3 style="color:var(--accent-green); font-size:3rem; margin-bottom:0;">SOC 2</h3>
                <p>Type II Certified</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="compliance-cta" style="background-color: var(--bg-surface); text-align:center;">
      <div class="container">
        <h2>Require specific compliance documentation?</h2>
        <p style="max-width:600px; margin:0 auto var(--spacing-lg);">Our security team is ready to provide detailed architecture reviews, compliance reports, and answer any questions regarding your data sovereignty requirements.</p>
        <a href="request-demo.html" class="btn btn-primary">Contact Security Team</a>
      </div>
    </section>
  </main>

  {make_footer()}
  <script src="js/main.js"></script>
</body>
</html>"""

with open(os.path.join(OUT_DIR, "security.html"), "w") as f:
    f.write(html_security)

# integration.html
html_integration = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Integration - WellStream Platform</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  {make_header()}
  
  <main>
    <section class="hero" style="padding: var(--spacing-3xl) 0;">
      <div class="container">
        <h1>Connect Your Tech Stack</h1>
        <p>Seamlessly integrate WellStream with your enterprise systems via APIs, ETL, and custom dashboards.</p>
      </div>
    </section>

    <section class="integration-overview">
      <div class="container">
        <div class="tabs-container">
          <div class="tabs-nav" style="justify-content:center; margin-bottom:var(--spacing-2xl);">
            <button class="tab-btn active">ETL</button>
            <button class="tab-btn">APIs</button>
            <button class="tab-btn">Dashboards</button>
          </div>
          
          <div class="tab-content active">
            <div class="grid-2">
              <div>
                <h2>ETL Integration</h2>
                <p>Automated extract-transform-load pipelines move data between WellStream and enterprise systems on schedule. Transform complex data structures into clean, analytical schemas.</p>
                <h3>ETL Key Benefits</h3>
                <ul class="check-list" id="integration-etl-benefits">
                  <li>Read-Only Snowflake Access</li>
                  <li>Supports BI Warehousing</li>
                  <li>Handles Complex Use Cases</li>
                  <li>Improves System Interoperability</li>
                </ul>
              </div>
              <div class="diagram-container">
                 <svg viewBox="0 0 400 300" class="diagram-svg">
                    <rect x="50" y="50" width="100" height="60" rx="4" fill="var(--bg-deep)" stroke="var(--border-color)"/>
                    <text x="100" y="85" fill="white" text-anchor="middle">SCADA</text>
                    
                    <rect x="50" y="190" width="100" height="60" rx="4" fill="var(--bg-deep)" stroke="var(--border-color)"/>
                    <text x="100" y="225" fill="white" text-anchor="middle">Accounting</text>
                    
                    <rect x="250" y="120" width="100" height="60" rx="4" fill="var(--bg-deep)" stroke="var(--accent-blue)" stroke-width="2"/>
                    <text x="300" y="155" fill="white" text-anchor="middle">WellStream</text>
                    
                    <path d="M 150 80 L 250 150" stroke="var(--accent-green)" stroke-width="2" marker-end="url(#arrow)"/>
                    <path d="M 150 220 L 250 150" stroke="var(--accent-green)" stroke-width="2" marker-end="url(#arrow)"/>
                 </svg>
              </div>
            </div>
          </div>
          
          <div class="tab-content">
            <div class="grid-2">
              <div>
                <h2>RESTful APIs</h2>
                <p>RESTful APIs enable real-time programmatic access for custom applications and third-party integrations. Build your own tools on top of the WellStream data engine.</p>
                <div style="background-color:#000; padding:var(--spacing-md); border-radius:4px; font-family:monospace; color:var(--accent-green); margin-top:var(--spacing-md);">
                  GET /api/v1/wells/status<br>
                  Authorization: Bearer [token]<br>
                  ...
                </div>
              </div>
            </div>
          </div>
          
          <div class="tab-content">
            <div class="grid-2">
              <div>
                <h2>Custom Dashboards</h2>
                <p>Pre-built and configurable visualization layers surface insights without requiring data exports. Embed our dashboard components directly into your internal portals.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="integration-cta" style="background-color: var(--primary-navy); text-align:center;">
      <div class="container">
        <h2>Ready to integrate?</h2>
        <p style="max-width:600px; margin:0 auto var(--spacing-lg);">Connect with our solutions team to discuss your current tech stack and how WellStream can fit seamlessly into your workflows.</p>
        <a href="request-demo.html" class="btn btn-primary">Request A Demo</a>
      </div>
    </section>
  </main>

  {make_footer()}
  <script src="js/main.js"></script>
</body>
</html>"""

with open(os.path.join(OUT_DIR, "integration.html"), "w") as f:
    f.write(html_integration)

# request-demo.html
html_demo = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Request A Demo - WellStream Platform</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  {make_header()}
  
  <main>
    <section class="demo-form" style="padding-top:var(--spacing-2xl);">
      <div class="container grid-2">
        <div>
          <h1>REQUEST A DEMO</h1>
          <p style="font-size:1.1rem; max-width:500px;">Experience WellStream's integrated energy data platform firsthand. Schedule a personalized demo to see how our solutions can optimize your operations and increase profitability.</p>
          
          <div class="support-contact" style="margin-top:var(--spacing-2xl); padding:var(--spacing-lg); background-color:var(--bg-surface); border-radius:8px;">
            <h3>Global Support</h3>
            <p style="margin-bottom:0;">Available across North America, Latin America, and Middle East/North Africa regions. Contact our team for technical assistance, implementation questions, or partnership inquiries.</p>
          </div>
        </div>
        
        <div class="card" style="background-color: var(--bg-surface);">
          <form id="demoForm">
            <div class="grid-2" style="gap:var(--spacing-md); margin-bottom:0;">
              <div class="form-group">
                <label for="firstName">First Name *</label>
                <input type="text" id="firstName" name="firstName" required>
                <div class="form-error">First name is required.</div>
              </div>
              <div class="form-group">
                <label for="lastName">Last Name *</label>
                <input type="text" id="lastName" name="lastName" required>
                <div class="form-error">Last name is required.</div>
              </div>
            </div>
            
            <div class="form-group">
              <label for="email">Business Email *</label>
              <input type="email" id="email" name="email" required>
              <div class="form-error">Valid business email is required.</div>
            </div>
            
            <div class="grid-2" style="gap:var(--spacing-md); margin-bottom:0;">
              <div class="form-group">
                <label for="company">Company *</label>
                <input type="text" id="company" name="company" required>
                <div class="form-error">Company is required.</div>
              </div>
              <div class="form-group">
                <label for="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone">
              </div>
            </div>
            
            <div class="grid-2" style="gap:var(--spacing-md); margin-bottom:0;">
              <div class="form-group">
                <label for="jobTitle">Job Title</label>
                <input type="text" id="jobTitle" name="jobTitle">
              </div>
              <div class="form-group">
                <label for="country">Country *</label>
                <select id="country" name="country" required>
                  <option value="">Select Country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="Other">Other</option>
                </select>
                <div class="form-error">Country is required.</div>
              </div>
            </div>
            
            <div class="form-group">
              <label for="comments">Comments</label>
              <textarea id="comments" name="comments" rows="4"></textarea>
            </div>
            
            <button type="submit" class="btn btn-primary" style="width:100%; margin-top:var(--spacing-md);">Submit</button>
          </form>
        </div>
      </div>
    </section>
  </main>

  {make_footer()}
  <script src="js/main.js"></script>
</body>
</html>"""

with open(os.path.join(OUT_DIR, "request-demo.html"), "w") as f:
    f.write(html_demo)

print("Generated all files successfully in /app/output")
