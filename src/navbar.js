document.addEventListener('DOMContentLoaded', function() {
            
    const ppHamburger = document.querySelector('.pp-hamburger');
    const originalMobileBtn = document.querySelector('header:not(.pp-header) .mobile-menu-btn');
    
    
    const ppMenuWrapper = document.querySelector('.pp-menu-wrapper');
    const originalNavLinks = document.querySelector('.nav-links');
    
    
    ppHamburger.addEventListener('click', function() {
        
        if (originalMobileBtn) {
            originalMobileBtn.click();
        }
        
        
        document.body.classList.toggle('menu-open');
        ppMenuWrapper.classList.toggle('active');
    });
    
    
    if (originalNavLinks && ppMenuWrapper) {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.attributeName === 'class') {
                    
                    if (originalNavLinks.classList.contains('active')) {
                        ppMenuWrapper.classList.add('active');
                    } else {
                        ppMenuWrapper.classList.remove('active');
                    }
                }
            });
        });
        
        observer.observe(originalNavLinks, { attributes: true });
    }
    
    
    const ppMenuLinks = document.querySelectorAll('.pp-menu-link');
    ppMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            ppMenuWrapper.classList.remove('active');
            originalNavLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
            ppHamburger.classList.remove('active');
            
            
            const href = this.getAttribute('href');
            const originalLink = document.querySelector(`.nav-links a[href="${href}"]`);
            if (originalLink) {
                originalLink.click();
            }
        });
    });
});