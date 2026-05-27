/* ============================================================
   ShiftWise — Shared JavaScript
   ============================================================ */

(function () {
  "use strict";

  /* ── Mobile Nav Toggle ──────────────────────────────────── */
  const menuBtn = document.querySelector(".mobile-menu-btn");
  const mobileNav = document.querySelector(".mobile-nav");

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener("click", () => {
      const expanded = menuBtn.getAttribute("aria-expanded") === "true";
      menuBtn.setAttribute("aria-expanded", String(!expanded));
      mobileNav.classList.toggle("open");
      document.body.style.overflow = !expanded ? "hidden" : "";
    });

    // Close on link click
    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuBtn.setAttribute("aria-expanded", "false");
        mobileNav.classList.remove("open");
        document.body.style.overflow = "";
      });
    });
  }

  /* ── Testimonial Carousel ───────────────────────────────── */
  const track = document.querySelector(".testimonial-slides");
  const slides = document.querySelectorAll(".testimonial-slide");
  const prevBtn = document.querySelector(".testimonial-prev");
  const nextBtn = document.querySelector(".testimonial-next");
  const dotsContainer = document.querySelector(".testimonial-dots");

  if (track && slides.length) {
    let current = 0;

    // Build dots
    if (dotsContainer) {
      slides.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.setAttribute("aria-label", `Go to testimonial ${i + 1}`);
        if (i === 0) dot.classList.add("active");
        dot.addEventListener("click", () => goTo(i));
        dotsContainer.appendChild(dot);
      });
    }
    const dots = dotsContainer ? dotsContainer.querySelectorAll("button") : [];

    function goTo(index) {
      current = index;
      if (current < 0) current = slides.length - 1;
      if (current >= slides.length) current = 0;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle("active", i === current));
    }

    if (prevBtn) prevBtn.addEventListener("click", () => goTo(current - 1));
    if (nextBtn) nextBtn.addEventListener("click", () => goTo(current + 1));

    // Auto-advance every 6s
    setInterval(() => goTo(current + 1), 6000);
  }

  /* ── FAQ Accordion ──────────────────────────────────────── */
  document.querySelectorAll(".faq-question").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      const wasOpen = item.classList.contains("open");

      // Close all
      document.querySelectorAll(".faq-item").forEach((i) => i.classList.remove("open"));

      // Toggle current
      if (!wasOpen) item.classList.add("open");
    });
  });

  /* ── Pricing Toggle ─────────────────────────────────────── */
  const pricingToggle = document.querySelector(".toggle-switch");
  const monthlyEls = document.querySelectorAll("[data-price-monthly]");
  const annualEls = document.querySelectorAll("[data-price-annual]");

  if (pricingToggle) {
    pricingToggle.addEventListener("click", () => {
      const isAnnual = pricingToggle.classList.toggle("annual");
      monthlyEls.forEach((el) => (el.style.display = isAnnual ? "none" : "inline"));
      annualEls.forEach((el) => (el.style.display = isAnnual ? "inline" : "none"));
    });
  }

  /* ── Contact Form Validation ────────────────────────────── */
  const contactForm = document.getElementById("contact-form");
  const successMsg = document.getElementById("success-message");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;

      const required = contactForm.querySelectorAll("[required]");
      required.forEach((field) => {
        const group = field.closest(".form-group");
        if (!field.value.trim()) {
          valid = false;
          group.classList.add("has-error");
        } else {
          group.classList.remove("has-error");
        }
      });

      // Email validation
      const emailField = contactForm.querySelector('input[type="email"]');
      if (emailField && emailField.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value.trim())) {
          valid = false;
          emailField.closest(".form-group").classList.add("has-error");
        }
      }

      if (valid) {
        contactForm.reset();
        if (successMsg) {
          successMsg.classList.add("show");
          setTimeout(() => successMsg.classList.remove("show"), 5000);
        }
      }
    });

    // Clear errors on input
    contactForm.querySelectorAll(".form-input, .form-textarea, .form-select").forEach((field) => {
      field.addEventListener("input", () => {
        field.closest(".form-group").classList.remove("has-error");
      });
    });
  }

  /* ── Animated Count-Up (Stats) ──────────────────────────── */
  const statNumbers = document.querySelectorAll("[data-count]");
  if (statNumbers.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseFloat(el.dataset.count);
            const suffix = el.dataset.suffix || "";
            const prefix = el.dataset.prefix || "";
            const duration = 1500;
            const start = performance.now();

            function update(now) {
              const progress = Math.min((now - start) / duration, 1);
              const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic
              const current = target * ease;

              if (Number.isInteger(target)) {
                el.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
              } else {
                el.textContent = prefix + current.toFixed(1) + suffix;
              }

              if (progress < 1) requestAnimationFrame(update);
              else el.textContent = prefix + target.toLocaleString() + suffix;
            }

            requestAnimationFrame(update);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );
    statNumbers.forEach((el) => observer.observe(el));
  }
})();
