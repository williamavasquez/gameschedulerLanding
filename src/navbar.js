document.addEventListener('DOMContentLoaded', function() {
    // Select the necessary elements
    const hamburger = document.querySelector('.pp-hamburger');
    const menuWrapper = document.querySelector('.pp-menu-wrapper');
    
    // Toggle menu on hamburger click
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            menuWrapper.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Close menu when clicking on menu links
    const menuLinks = document.querySelectorAll('.pp-menu-link');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            menuWrapper.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (
            menuWrapper && 
            menuWrapper.classList.contains('active') && 
            !menuWrapper.contains(e.target) && 
            hamburger && 
            !hamburger.contains(e.target)
        ) {
            hamburger.classList.remove('active');
            menuWrapper.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
});