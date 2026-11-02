document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuButton && navLinks) {
        mobileMenuButton.addEventListener('click', function() {
            navLinks.classList.toggle('show');
            
            // Update ARIA attributes for accessibility
            const isExpanded = navLinks.classList.contains('show');
            mobileMenuButton.setAttribute('aria-expanded', isExpanded);
            
            // Update button icon
            const icon = mobileMenuButton.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navLinks.contains(event.target) && 
                !mobileMenuButton.contains(event.target) && 
                navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
                const icon = mobileMenuButton.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });

        // Close menu when clicking a nav link
        const navItems = navLinks.querySelectorAll('.nav-link');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                if (navLinks.classList.contains('show')) {
                    navLinks.classList.remove('show');
                    mobileMenuButton.setAttribute('aria-expanded', 'false');
                    const icon = mobileMenuButton.querySelector('i');
                    if (icon) {
                        icon.classList.add('fa-bars');
                        icon.classList.remove('fa-times');
                    }
                }
            });
        });
    }
}); 