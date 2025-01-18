document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-toggle');
    const root = document.documentElement;

    // Initialize theme
    const savedTheme = localStorage.getItem('theme') || 'black';
    root.setAttribute('data-theme', savedTheme);
    updateThemeToggleIcon(savedTheme);

    // Toggle theme on click
    themeToggle.addEventListener('click', () => {
        const currentTheme = root.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'black' : 'light';
        
        root.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeToggleIcon(newTheme);
    });

    function updateThemeToggleIcon(theme) {
        const sunIcon = themeToggle.querySelector('.sun-icon');
        const moonIcon = themeToggle.querySelector('.moon-icon');
        
        if (theme === 'light') {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        } else {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
    }

    // Banner functionality
    const banner = document.querySelector('.announcement-banner');
    const nav = document.querySelector('nav');
    const closeButton = banner.querySelector('.close-button');
    const bannerLink = banner.querySelector('.banner-link');

    // Show banner on page load
    setTimeout(() => {
        banner.classList.add('visible');
        nav.classList.add('banner-visible');
    }, 500);

    // Handle banner close
    closeButton.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent the link click
        e.stopPropagation(); // Prevent event bubbling
        banner.classList.remove('visible');
        nav.classList.remove('banner-visible');
        localStorage.setItem('bannerClosed', 'true');
    });

    // Check if banner was previously closed
    if (localStorage.getItem('bannerClosed') === 'true') {
        banner.classList.remove('visible');
        nav.classList.remove('banner-visible');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Fade in elements on scroll
const fadeInElements = document.querySelectorAll('.project, section');
const fadeInOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
            fadeInObserver.unobserve(entry.target);
        }
    });
}, fadeInOptions);

fadeInElements.forEach(element => {
    element.style.opacity = 0;
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    fadeInObserver.observe(element);
});
