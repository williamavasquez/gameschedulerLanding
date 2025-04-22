document.addEventListener('DOMContentLoaded', function() {
    // Clear form resubmission state immediately on page load
    if (window.history.replaceState) {
        window.history.replaceState(null, null, window.location.href);
    }
    
    // Clear any form data on page load
    document.querySelectorAll('form').forEach(form => {
        form.reset();
    });

    // Navbar scroll effect
    const header = document.querySelector('header');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            }

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (elementPosition.top < windowHeight * 0.9) {
                element.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Check on initial load

    // Typing effect for the hero headline (optional)
    // This is just a placeholder. You can implement a proper typing effect if desired.
    setTimeout(() => {
        document.querySelector('.highlight').style.visibility = 'visible';
    }, 800);

    // ChatBot animation in phone mockup
    const chatAnimations = () => {
        const chatBubbles = document.querySelectorAll('.chat-bubble');
        
        chatBubbles.forEach((bubble, index) => {
            setTimeout(() => {
                bubble.style.opacity = '1';
                bubble.style.transform = 'translateY(0)';
            }, 1000 + (index * 800));
        });
    };

    // Initialize chat animations
    setTimeout(chatAnimations, 1500);

    // Video placeholder click
    const videoPlaceholder = document.querySelector('.video-placeholder');
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', function() {
            // This would normally load the actual video
            alert('Video would play here. Replace with actual video embed when available.');
            
            // Uncomment this code when you have a real video to embed
            /*
            const videoWrapper = this.parentElement;
            const iframe = document.createElement('iframe');
            iframe.setAttribute('src', 'https://www.youtube.com/embed/your-video-id?autoplay=1');
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
            iframe.setAttribute('allowfullscreen', '');
            videoWrapper.appendChild(iframe);
            this.remove();
            */
        });
    }

    // Replace the command card hover animations with immediate display
    const commandCards = document.querySelectorAll('.command-card');
    
    commandCards.forEach(card => {
        // Initialize all chat bubbles immediately instead of on hover
        const chatDemo = card.querySelector('.chat-demo');
        if (chatDemo) {
            const bubbles = chatDemo.querySelectorAll('.chat-bubble');
            
            bubbles.forEach((bubble, index) => {
                // Set initial state to visible
                bubble.style.opacity = '1';
                bubble.style.transform = 'translateY(0)';
            });
        }
        
        // Remove the mouseenter event that was previously used
        // This effectively cancels the hover-dependent animation
    });

    // Notification carousel for automation section
    const setupNotificationCarousel = () => {
        const notifications = document.querySelectorAll('.phone-notification');
        const dots = document.querySelectorAll('.notification-dots .dot');
        
        if (!notifications.length || !dots.length) return;
        
        let currentIndex = 0;
        
        const showNotification = (index) => {
            // Hide all notifications and dots
            notifications.forEach(notification => {
                notification.classList.remove('active');
            });
            
            dots.forEach(dot => {
                dot.classList.remove('active');
            });
            
            // Show selected notification and dot
            notifications[index].classList.add('active');
            dots[index].classList.add('active');
        };
        
        // Auto rotate notifications
        const autoRotate = () => {
            currentIndex = (currentIndex + 1) % notifications.length;
            showNotification(currentIndex);
        };
        
        // Set up dot click handlers
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                showNotification(currentIndex);
                clearInterval(rotationTimer);
                rotationTimer = setInterval(autoRotate, 4000);
            });
        });
        
        // Start auto rotation
        let rotationTimer = setInterval(autoRotate, 4000);
        
        // Pause rotation when hovering over notifications
        const phoneSequence = document.querySelector('.phone-sequence');
        if (phoneSequence) {
            phoneSequence.addEventListener('mouseenter', () => {
                clearInterval(rotationTimer);
            });
            
            phoneSequence.addEventListener('mouseleave', () => {
                rotationTimer = setInterval(autoRotate, 4000);
            });
        }
        
        // Show first notification initially
        showNotification(0);
    };

    // Set up notification carousel
    setupNotificationCarousel();

    // Sport showcase carousel
    const setupSportCarousel = () => {
        const sportOptions = document.querySelectorAll('.sport-option');
        const sportCards = document.querySelectorAll('.sport-card');
        
        if (!sportOptions.length || !sportCards.length) return;
        
        sportOptions.forEach(option => {
            option.addEventListener('click', () => {
                const sportId = option.getAttribute('data-sport');
                
                // Remove active class from all options and cards
                sportOptions.forEach(opt => opt.classList.remove('active'));
                sportCards.forEach(card => card.classList.remove('active'));
                
                // Add active class to selected option and card
                option.classList.add('active');
                document.getElementById(sportId).classList.add('active');
            });
        });
    };

    // Set up sport showcase carousel
    setupSportCarousel();

    // Testimonial slider
    const setupTestimonialSlider = () => {
        const slider = document.querySelector('.testimonial-slider');
        const cards = document.querySelectorAll('.testimonial-card');
        const dots = document.querySelectorAll('.testimonial-dots .dot');
        const prevBtn = document.querySelector('.testimonial-arrow.prev');
        const nextBtn = document.querySelector('.testimonial-arrow.next');
        
        if (!slider || !cards.length || !dots.length) return;
        
        let currentIndex = 0;
        let startX, moveX;
        let isMoving = false;
        
        // Show testimonial at specified index
        const showTestimonial = (index) => {
            // Adjust index if out of bounds
            if (index < 0) index = cards.length - 1;
            if (index >= cards.length) index = 0;
            
            currentIndex = index;
            
            // Update slider position - fix to ensure all cards are properly positioned
            cards.forEach((card, i) => {
                card.style.transform = `translateX(${100 * (i - currentIndex)}%)`;
                card.style.opacity = i === currentIndex ? '1' : '0.5';
                card.style.zIndex = i === currentIndex ? '5' : '1';
                card.style.transition = 'all 0.5s ease';
                card.style.position = 'absolute';
                card.style.width = '100%';
                card.style.left = '0';
            });
            
            // Update dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        };
        
        // Initialize dot click handlers
        dots.forEach((dot) => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.getAttribute('data-index'));
                showTestimonial(index);
            });
        });
        
        // Previous button handler
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                showTestimonial(currentIndex - 1);
            });
        }
        
        // Next button handler
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                showTestimonial(currentIndex + 1);
            });
        }
        
        // Touch/swipe support
        slider.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isMoving = true;
        }, { passive: true });
        
        slider.addEventListener('touchmove', (e) => {
            if (!isMoving) return;
            moveX = e.touches[0].clientX;
        }, { passive: true });
        
        slider.addEventListener('touchend', () => {
            if (!isMoving) return;
            isMoving = false;
            
            if (startX - moveX > 50) {
                // Swipe left, show next
                showTestimonial(currentIndex + 1);
            } else if (moveX - startX > 50) {
                // Swipe right, show previous
                showTestimonial(currentIndex - 1);
            }
        });
        
        // Initialize first testimonial
        showTestimonial(0);
        
        // Auto-rotation
        let autoRotate = setInterval(() => {
            showTestimonial(currentIndex + 1);
        }, 6000);
        
        // Pause auto-rotation on hover or touch
        slider.addEventListener('mouseenter', () => {
            clearInterval(autoRotate);
        });
        
        slider.addEventListener('mouseleave', () => {
            autoRotate = setInterval(() => {
                showTestimonial(currentIndex + 1);
            }, 6000);
        });
    };

    // Set up testimonial slider
    setupTestimonialSlider();

    // Stats dashboard animations
    const setupStatsAnimations = () => {
        const statsSection = document.querySelector('#stats');
        if (!statsSection) return;
        
        // Animate bars when they come into view
        const animateBars = () => {
            const bars = document.querySelectorAll('.bar');
            const chartSection = document.querySelector('.attendance-chart');
            
            if (!bars.length || !chartSection) return;
            
            const chartPosition = chartSection.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (chartPosition.top < windowHeight * 0.8) {
                bars.forEach(bar => {
                    const targetWidth = bar.style.width;
                    bar.style.width = '0%';
                    
                    setTimeout(() => {
                        bar.style.width = targetWidth;
                    }, 300);
                });
                
                // Remove event listener once animation is triggered
                window.removeEventListener('scroll', animateBars);
            }
        };
        
        window.addEventListener('scroll', animateBars);
        
        // Check on initial load
        setTimeout(animateBars, 1000);
    };

    // Set up stats dashboard animations
    setupStatsAnimations();

    // Enhanced CTA section
    const setupCtaAnimations = () => {
        const ctaSection = document.querySelector('#try-now');
        if (!ctaSection) return;
        
        const ctaButton = ctaSection.querySelector('.btn-cta');
        const floatingCommands = ctaSection.querySelectorAll('.command');
        
        // Add click animation for CTA button
        if (ctaButton) {
            ctaButton.addEventListener('click', (e) => {
                e.preventDefault();
                
                ctaButton.classList.add('btn-clicked');
                
                setTimeout(() => {
                    ctaButton.classList.remove('btn-clicked');
                    // Here you would typically redirect or open WhatsApp
                    window.open('https://wa.me/your-bot-number', '_blank');
                }, 300);
            });
        }
        
        // Interactive floating commands
        if (floatingCommands.length) {
            floatingCommands.forEach(command => {
                command.addEventListener('mouseenter', () => {
                    command.style.transform = 'scale(1.1) translateY(-5px)';
                    command.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
                });
                
                command.addEventListener('mouseleave', () => {
                    command.style.transform = '';
                    command.style.boxShadow = '';
                });
            });
        }
    };

    // Set up CTA section animations
    setupCtaAnimations();

    // SEO content section enhancements
    const setupSeoSection = () => {
        const keywordPills = document.querySelectorAll('.keyword-pill');
        const keywordCloud = document.querySelector('.keyword-cloud');
        
        if (keywordPills.length) {
            keywordPills.forEach((pill, index) => {
                // Add staggered animation
                setTimeout(() => {
                    pill.style.opacity = '1';
                    pill.style.transform = 'translateY(0)';
                }, 100 * index);
                
                // Add hover effect
                pill.addEventListener('mouseenter', () => {
                    keywordPills.forEach(p => {
                        if (p !== pill) {
                            p.style.opacity = '0.6';
                        }
                    });
                });
                
                pill.addEventListener('mouseleave', () => {
                    keywordPills.forEach(p => {
                        p.style.opacity = '1';
                    });
                });
            });
        }
        
        // Animate keyword cloud
        if (keywordCloud) {
            const keywords = keywordCloud.querySelectorAll('span');
            
            keywords.forEach((keyword, index) => {
                // Random initial position
                keyword.style.transform = `translateY(${20 + Math.random() * 30}px)`;
                keyword.style.opacity = '0';
                
                // Animate into view when scrolled to
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            setTimeout(() => {
                                keyword.style.transform = 'translateY(0)';
                                keyword.style.opacity = '1';
                            }, 100 * index);
                            observer.unobserve(keyword);
                        }
                    });
                }, { threshold: 0.1 });
                
                observer.observe(keyword);
            });
        }
    };

    // Set up SEO section
    setupSeoSection();

    // Updated contact form handling for Netlify (iframe method)
    const setupContactForm = () => {
        const contactForm = document.getElementById('contact-form');
        
        if (contactForm) {
            // Track form field interactions
            const formFields = contactForm.querySelectorAll('input, textarea, select');
            formFields.forEach(field => {
                field.addEventListener('focus', function() {
                    if (typeof gtag === 'function') {
                        gtag('event', 'form_field_focus', {
                            'field_id': this.id,
                            'field_name': this.name
                        });
                    }
                });
                
                field.addEventListener('blur', () => {
                    // Existing validation code
                    if (this.value.trim() !== '') {
                        this.classList.add('has-value');
                    } else {
                        this.classList.remove('has-value');
                    }
                    
                    // Track field completion
                    if (typeof gtag === 'function' && this.value.trim() !== '') {
                        gtag('event', 'form_field_complete', {
                            'field_id': this.id,
                            'field_name': this.name
                        });
                    }
                });
            });

            contactForm.addEventListener('submit', function(e) {
                e.preventDefault(); // Prevent the default form submission
                
                // Track form submission
                if (typeof gtag === 'function') {
                    // Get form data for analytics
                    const name = document.getElementById('name')?.value || 'not_provided';
                    const email = document.getElementById('email')?.value || 'not_provided';
                    const subject = document.getElementById('subject')?.value || 'not_provided';
                    
                    // Pseudonymize email for privacy
                    const hashedEmail = email !== 'not_provided' ? 
                        btoa(email).substring(0, 10) : 'not_provided';
                    
                    gtag('event', 'form_submission', {
                        'form_id': 'contact-form',
                        'form_name': 'Contact Form',
                        'subject': subject,
                        'user_type': 'lead',
                        'user_id': hashedEmail
                    });
                    
                    // Set user properties for future tracking
                    gtag('set', 'user_properties', {
                        'has_contacted_us': true,
                        'contact_subject': subject
                    });
                }
                
                // Show loading state
                const submitButton = contactForm.querySelector('.btn-submit');
                const originalButtonText = submitButton.innerHTML;
                submitButton.innerHTML = '<span class="rotating-icon"><i class="fas fa-spinner fa-spin"></i></span> Sending...';
                submitButton.disabled = true;
                
                // Create a hidden iframe to handle the form submission
                const iframe = document.createElement('iframe');
                iframe.name = 'hidden-form-iframe';
                iframe.style.display = 'none';
                document.body.appendChild(iframe);
                
                // Set up form to use the iframe
                contactForm.setAttribute('target', 'hidden-form-iframe');
                
                // Set up iframe load event to detect completion
                iframe.addEventListener('load', function() {
                    // Success handling
                    contactForm.innerHTML = `
                        <div class="form-success">
                            <i class="fas fa-check-circle" style="font-size: 3rem; color: var(--primary-color); margin-bottom: 15px;"></i>
                            <h3>Thank You!</h3>
                            <p>Your message has been sent successfully. We'll get back to you shortly.</p>
                        </div>
                    `;
                    
                    // Clear the URL to prevent resubmission dialog
                    if (window.history.replaceState) {
                        window.history.replaceState(null, null, window.location.href);
                    }
                    
                    // Remove the iframe after a delay
                    setTimeout(() => {
                        document.body.removeChild(iframe);
                    }, 1000);
                });
                
                // Submit the form to the iframe
                contactForm.submit();
                
                // After form submission, create and submit a duplicate form to Netlify
                const formData = new FormData(contactForm);
                formData.append('form-name', 'sport-scheduler-contact');
                
                fetch('/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams(formData).toString()
                }).catch(error => {
                    console.log('Netlify submission backup sent');
                });
            });
        }
    };

    // Setup contact form
    setupContactForm();

    // Fix for the "See how it works" button
    const howItWorksBtn = document.querySelector('.hero-cta a[href="#how-it-works"]');
    if (howItWorksBtn) {
        howItWorksBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const howItWorksSection = document.getElementById('how-it-works');
            if (howItWorksSection) {
                // Scroll to the video section with an offset for the fixed header
                const headerHeight = document.querySelector('header').offsetHeight;
                const sectionPosition = howItWorksSection.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: sectionPosition - headerHeight - 20, // Extra 20px for padding
                    behavior: 'smooth'
                });
            }
        });
    }

    // Updated script with FAQ section completely removed
    const setupFooter = () => {
        // Back to top button
        const backToTopButton = document.getElementById('back-to-top');
        
        if (backToTopButton) {
            // Show/hide back to top button
            window.addEventListener('scroll', () => {
                if (window.scrollY > 500) {
                    backToTopButton.classList.add('visible');
                } else {
                    backToTopButton.classList.remove('visible');
                }
            });
            
            // Scroll to top when clicked
            backToTopButton.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
        
        // Newsletter form submission only - FAQ section completely removed
        const newsletterForm = document.querySelector('.newsletter-form');
        
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const emailInput = newsletterForm.querySelector('input[type="email"]');
                
                if (emailInput.value.trim() !== '') {
                    // Here you would normally send this to your backend
                    alert(`Thanks for subscribing with: ${emailInput.value}`);
                    emailInput.value = '';
                }
            });
        }
    };

    // Setup footer functionality
    setupFooter();

    // Setup FAQ section
    const setupFaqSection = () => {
        const faqItems = document.querySelectorAll('.faq-item');
        
        if (faqItems.length) {
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');
                
                question.addEventListener('click', () => {
                    // Check if this item is already active
                    const isActive = item.classList.contains('active');
                    
                    // Close all FAQ items
                    faqItems.forEach(faqItem => {
                        faqItem.classList.remove('active');
                    });
                    
                    // If the clicked item wasn't active, make it active
                    if (!isActive) {
                        item.classList.add('active');
                    }
                });
            });
        }
    };
    
    // Initialize FAQ functionality
    setupFaqSection();

    // Enhanced Analytics for PickupPal
    const setupEnhancedAnalytics = () => {
        // Don't run if gtag isn't defined
        if (typeof gtag !== 'function') return;
        
        // Set returning visitor data
        const isReturning = localStorage.getItem('pp_returning_visitor');
        if (isReturning) {
            gtag('set', 'user_properties', {
                'visitor_type': 'returning',
                'last_visit_date': localStorage.getItem('pp_last_visit') || 'unknown'
            });
        } else {
            gtag('set', 'user_properties', {
                'visitor_type': 'first_time',
                'first_visit_date': new Date().toISOString().split('T')[0]
            });
            localStorage.setItem('pp_returning_visitor', 'true');
        }
        localStorage.setItem('pp_last_visit', new Date().toISOString().split('T')[0]);
        
        // Track feature card engagement
        document.querySelectorAll('.feature-card').forEach((card, index) => {
            const featureName = card.querySelector('h3')?.innerText || `Feature ${index+1}`;
            
            // Intersection Observer to track feature views
            const featureObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        gtag('event', 'feature_view', {
                            'feature_name': featureName,
                            'feature_position': index + 1
                        });
                        featureObserver.unobserve(card); // Only track first view
                    }
                });
            }, { threshold: 0.7 }); // 70% of feature must be visible
            
            featureObserver.observe(card);
            
            // Track clicks on feature cards
            card.addEventListener('click', () => {
                gtag('event', 'feature_click', {
                    'feature_name': featureName,
                    'feature_position': index + 1
                });
            });
        });
        
        // Track navigation link clicks
        document.querySelectorAll('.pp-menu-link, .nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                const linkText = this.innerText.trim();
                const linkHref = this.getAttribute('href');
                
                gtag('event', 'navigation_click', {
                    'link_text': linkText,
                    'link_destination': linkHref
                });
            });
        });
        
        // Scroll depth tracking
        const scrollDepths = [25, 50, 75, 90, 100];
        let sentDepths = {};
        
        const getScrollDepth = () => {
            const winHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return Math.round((scrollTop + winHeight) / docHeight * 100);
        };
        
        window.addEventListener('scroll', () => {
            // Throttle scroll events
            if (!window.scrollThrottle) {
                window.scrollThrottle = true;
                setTimeout(() => {
                    const scrollPercentage = getScrollDepth();
                    
                    scrollDepths.forEach(depth => {
                        if (scrollPercentage >= depth && !sentDepths[depth]) {
                            gtag('event', 'scroll_depth', {
                                'depth_percentage': depth,
                                'page_title': document.title
                            });
                            sentDepths[depth] = true;
                        }
                    });
                    window.scrollThrottle = false;
                }, 500);
            }
        });
        
        // Track CTA button clicks with attribution
        document.querySelectorAll('.btn-primary, .pp-btn-primary, .btn-donate, .pp-btn-donate').forEach(btn => {
            btn.addEventListener('click', function() {
                const btnText = this.innerText.trim();
                const closestSection = this.closest('section');
                const sectionId = closestSection ? closestSection.id : 'header';
                
                gtag('event', 'cta_click', {
                    'button_text': btnText,
                    'section_id': sectionId
                });
            });
        });
        
        // Performance tracking after page load
        window.addEventListener('load', () => {
            // Wait for page to be fully loaded
            setTimeout(() => {
                if (window.performance) {
                    const perfData = window.performance.timing;
                    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                    
                    gtag('event', 'performance', {
                        'page_load_time': pageLoadTime,
                        'dns_time': perfData.domainLookupEnd - perfData.domainLookupStart,
                        'server_response_time': perfData.responseEnd - perfData.requestStart,
                        'dom_interactive_time': perfData.domInteractive - perfData.navigationStart
                    });
                }
            }, 0);
        });
        
        // Track time on page when leaving
        let sessionStart = new Date().getTime();
        window.addEventListener('beforeunload', () => {
            const sessionDuration = Math.round((new Date().getTime() - sessionStart) / 1000);
            
            gtag('event', 'time_on_page', {
                'duration_seconds': sessionDuration,
                'page_path': window.location.pathname
            });
        });
    };

    // Run the enhanced analytics setup
    setupEnhancedAnalytics();
});
