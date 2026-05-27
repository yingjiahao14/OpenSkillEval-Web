document.addEventListener('DOMContentLoaded', () => {
    const cookieBanner = document.getElementById('cookieBanner');
    const managePreferencesBtn = document.getElementById('managePreferencesBtn');
    const preferencesModal = document.getElementById('preferencesModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const savePreferencesBtn = document.getElementById('savePreferencesBtn');
    const searchForm = document.getElementById('searchForm');

    // Simulate search functionality
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchForm.querySelector('input').value;
        if(query.trim()) {
            console.log('Searching for:', query);
            // Replace with actual search URL formatting
            window.location.href = `?search=${encodeURIComponent(query)}`;
        }
    });

    // Show cookie banner on load (simulate first visit)
    setTimeout(() => {
        if (!localStorage.getItem('cookiesAccepted')) {
            cookieBanner.classList.add('show');
        }
    }, 500);

    // Open Modal
    managePreferencesBtn.addEventListener('click', () => {
        preferencesModal.classList.add('open');
    });

    // Close Modal
    const closeModal = () => {
        preferencesModal.classList.remove('open');
    };

    closeModalBtn.addEventListener('click', closeModal);

    // Save Preferences
    savePreferencesBtn.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        closeModal();
        cookieBanner.classList.remove('show');
    });

    // Close modal on outside click
    preferencesModal.addEventListener('click', (e) => {
        if (e.target === preferencesModal) {
            closeModal();
        }
    });
});
