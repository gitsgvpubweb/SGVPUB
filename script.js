document.addEventListener('DOMContentLoaded', () => {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileNavContent = document.querySelector('#mobile-menu-overlay .mobile-nav-content');

    // Function to populate the mobile menu
    const populateMobileMenu = () => {
        // Clear existing content to prevent duplication
        mobileNavContent.innerHTML = ''; 

        // Get links from desktop navigation
        const desktopNavLeftLinks = document.querySelectorAll('.main-nav-left .nav-link');
        const desktopNavRightLinks = document.querySelectorAll('.main-nav-right .nav-link');
        
        const allNavLinks = [...desktopNavLeftLinks, ...desktopNavRightLinks];

        const ul = document.createElement('ul');
        allNavLinks.forEach(link => {
            const li = document.createElement('li');
            const newLink = link.cloneNode(true); // Clone the anchor tag
            li.appendChild(newLink);
            ul.appendChild(li);
        });

        // Add "Contribute" button to mobile menu (clone from desktop button if it exists)
        const desktopContributeBtn = document.querySelector('.nav-donate-btn');
        if (desktopContributeBtn) {
            const li = document.createElement('li');
            const newBtn = desktopContributeBtn.cloneNode(true);
            newBtn.classList.remove('nav-donate-btn'); // Remove desktop specific class if needed
            newBtn.classList.add('mobile-menu-btn'); // Add a mobile specific class for styling
            li.appendChild(newBtn);
            ul.appendChild(li);
        }

        mobileNavContent.appendChild(ul);
    };

    // Initial population of the mobile menu
    populateMobileMenu();


    // Function to close the mobile menu
    const closeMobileMenu = () => {
        mobileNavToggle.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        // Re-enable scroll on body
        document.body.style.overflow = '';
    };

    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', () => {
            mobileNavToggle.classList.toggle('active');
            mobileMenuOverlay.classList.toggle('active');

            // Disable/enable scroll on body when menu is open/closed
            if (mobileMenuOverlay.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // Close mobile menu when a navigation link is clicked inside the overlay
    mobileNavContent.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (event) => {
            // Prevent default anchor behavior for smooth scrolling if desired, or allow if handled by other scripts
            // event.preventDefault(); 
            closeMobileMenu();
            // Optional: If you use smooth scrolling, trigger it here after closing menu
            // const targetId = link.getAttribute('href').substring(1);
            // document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Close mobile menu when the mobile-menu-btn is clicked
    mobileNavContent.querySelectorAll('.mobile-menu-btn').forEach(button => {
        button.addEventListener('click', () => {
            closeMobileMenu();
        });
    });


    // Close mobile menu on resize (e.g., if user resizes from mobile to desktop)
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992) { // Assuming 992px is your mobile breakpoint
            closeMobileMenu();
        }
    });

    // Handle initial state on load in case it's a mobile view
    if (window.innerWidth <= 992) {
        // Ensure desktop nav is hidden and mobile toggle is ready
        // (CSS media queries already handle this, but ensures JS is in sync)
    }
});