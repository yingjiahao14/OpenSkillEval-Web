document.addEventListener('DOMContentLoaded', () => {
  // Pricing Toggle Logic
  const billingToggle = document.getElementById('billingToggle');
  const priceBusiness = document.getElementById('priceBusiness');
  const priceBusinessAI = document.getElementById('priceBusinessAI');
  const periodLabels = document.querySelectorAll('.pricing-period');

  if (billingToggle) {
    billingToggle.addEventListener('change', (e) => {
      const isAnnual = e.target.checked;
      
      if (isAnnual) {
        if (priceBusiness) priceBusiness.textContent = '$15'; // ~17% off 18
        if (priceBusinessAI) priceBusinessAI.textContent = '$20'; // ~17% off 24
        periodLabels.forEach(el => el.textContent = 'per user / month, billed annually');
      } else {
        if (priceBusiness) priceBusiness.textContent = '$18';
        if (priceBusinessAI) priceBusinessAI.textContent = '$24';
        periodLabels.forEach(el => el.textContent = 'per user / month');
      }
    });
  }

  // FAQ Accordion
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');
      
      // Close all
      document.querySelectorAll('.accordion-item').forEach(el => el.classList.remove('active'));
      
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // Card Feature Expand
  const expandFeatureBtns = document.querySelectorAll('.expand-features-btn');
  expandFeatureBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const featuresDiv = btn.nextElementSibling;
      if (featuresDiv.style.display === 'none') {
        featuresDiv.style.display = 'block';
        btn.textContent = 'Hide features';
      } else {
        featuresDiv.style.display = 'none';
        btn.textContent = 'See all features';
      }
    });
  });

  // Table Expand (Optional based on design)
  const expandTableBtn = document.getElementById('expandTableBtn');
  const comparisonTable = document.getElementById('comparisonTableWrapper');
  if (expandTableBtn && comparisonTable) {
    expandTableBtn.addEventListener('click', () => {
      comparisonTable.classList.toggle('expanded');
    });
  }

  // Team Size Slider Logic
  const teamSlider = document.getElementById('teamSlider');
  const teamSizeDisplay = document.getElementById('teamSizeDisplay');
  const recommendedPlan = document.getElementById('recommendedPlan');

  if (teamSlider) {
    teamSlider.addEventListener('input', (e) => {
      const value = parseInt(e.target.value, 10);
      if (teamSizeDisplay) {
        teamSizeDisplay.textContent = value + (value === 500 ? '+' : '');
      }
      if (recommendedPlan) {
        if (value < 10) {
          recommendedPlan.textContent = 'Starter or Business';
        } else if (value < 50) {
          recommendedPlan.textContent = 'Business + AI';
        } else {
          recommendedPlan.textContent = 'Enterprise';
        }
      }
    });
  }
});