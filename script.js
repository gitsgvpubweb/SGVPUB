// --- 1. Global Variables and Event Listeners ---

// DOM Elements
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const mainNav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.main-nav .nav-link');
const skipToContentLink = document.querySelector('.skip-to-content');

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Prevent default anchor click behavior
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        // Check if the target element exists
        if (targetElement) {
            // Scroll smoothly to the target element
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start' // Scrolls to the top of the element
            });

            // Optionally, if a mobile menu is open, close it after clicking a link
            if (mobileNavToggle && mainNav && mobileNavToggle.classList.contains('active')) {
                closeMobileNav();
            }
        } else {
            console.warn(`Target element not found for link: ${targetId}`);
        }
    });
});

// Function to handle mobile navigation toggle
const handleMobileNavToggle = () => {
    if (!mobileNavToggle || !mainNav) {
        console.error("Mobile navigation elements not found.");
        return;
    }

    mainNav.classList.toggle('is-open');
    mobileNavToggle.classList.toggle('active');

    // Accessibility: Manage ARIA attributes
    const isOpen = mainNav.classList.contains('is-open');
    mobileNavToggle.setAttribute('aria-expanded', isOpen);

    // Prevent background scrolling when mobile menu is open
    if (isOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = ''; // Restore default
    }
};

// Function to close the mobile navigation
const closeMobileNav = () => {
    if (!mobileNavToggle || !mainNav) return;
    mainNav.classList.remove('is-open');
    mobileNavToggle.classList.remove('active');
    mobileNavToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = ''; // Restore default
};

// Event listener for mobile nav toggle button
if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', handleMobileNavToggle);
} else {
    console.warn("Mobile navigation toggle element not found.");
}

// Close mobile nav when a link is clicked
if (navLinks.length > 0) {
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Only close if the menu is currently open
            if (mainNav && mainNav.classList.contains('is-open')) {
                closeMobileNav();
            }
        });
    });
} else {
    console.warn("No navigation links found.");
}

// Handle Escape key press to close mobile menu
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mainNav && mainNav.classList.contains('is-open')) {
        closeMobileNav();
    }
});

// Add focus handling for the skip-to-content link
if (skipToContentLink) {
    skipToContentLink.addEventListener('blur', () => {
        // Reset its position if it loses focus
        skipToContentLink.style.top = '-100px';
    });
} else {
    console.warn("Skip to content link not found.");
}

// --- 2. Error Handling and Edge Cases ---

// General error handling for potentially missing elements
document.addEventListener('DOMContentLoaded', () => {
    // Check for essential elements and log warnings if missing
    const requiredElements = [
        { selector: '.site-header', name: 'Site Header' },
        { selector: '.main-nav', name: 'Main Navigation' },
        { selector: '.hero-section', name: 'Hero Section' },
        { selector: '#main-content', name: 'Main Content Area' },
        { selector: 'footer', name: 'Footer' }
    ];

    requiredElements.forEach(elementInfo => {
        if (!document.querySelector(elementInfo.selector)) {
            console.warn(`Required element missing: ${elementInfo.name} (Selector: ${elementInfo.selector})`);
        }
    });

    // Specific checks for interactive elements used in this script
    if (!mobileNavToggle) {
        console.error("Critical: Mobile navigation toggle is missing. Mobile navigation will not function.");
    }
    if (!mainNav) {
        console.error("Critical: Main navigation element is missing. Mobile navigation will not function.");
    }
});

// --- 3. Performance Optimization ---

// Lazy loading for images (example: if you had many hero images or below-the-fold content)
// For this example, we'll assume images are optimized and few.
// If you had many images, you would implement:
/*
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                if (img.dataset.srcset) {
                    img.srcset = img.dataset.srcset;
                }
                img.removeAttribute('data-src');
                img.removeAttribute('data-srcset');
                observer.unobserve(img);
            }
        });
    }, { rootMargin: '0px 0px 200px 0px' }); // Start loading images when they are 200px away from the viewport

    images.forEach(img => {
        observer.observe(img);
    });
});
*/

// Debouncing/Throttling for resize events (not strictly necessary here as no complex resize logic is present, but good practice)
// Example:
/*
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Perform resize-related logic here
        console.log('Window resized');
    }, 250); // Debounce by 250ms
});
*/

// --- 4. Best Practices Adherence ---

// Semantic HTML: Used extensively in index.html.
// Accessibility: ARIA attributes, focus states, skip-to-content.
// SEO: Meta tags, structured data, canonical URL.
// Modularity: Functions for specific tasks (nav toggle, smooth scroll).
// Robustness: Checks for missing elements, graceful degradation.
// Performance: Mentioned lazy loading and debouncing as potential improvements.

// Additional script enhancements could include:
// - A more sophisticated mobile menu (e.g., off-canvas)
// - A carousel for impact stories or testimonials
// - Form validation (client-side, though server-side is crucial for security)
// - Analytics integration (e.g., Google Analytics)

console.log('San Gabriel Valley Power Up Beacon script loaded successfully.');