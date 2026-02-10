// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 70;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate squares grid on load
    const squares = document.querySelectorAll('.square');
    squares.forEach((square, index) => {
        setTimeout(() => {
            square.style.opacity = '0';
            square.style.transform = 'scale(0)';
            square.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                square.style.opacity = '1';
                square.style.transform = 'scale(1)';
            }, 100);
        }, index * 100);
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .step, .pricing-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        .feature-card, .step, .pricing-card {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .feature-card.animate-in, .step.animate-in, .pricing-card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    // Header background on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });

    // Button click handlers for demo purposes
    const ctaButtons = document.querySelectorAll('.btn-primary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.textContent.includes('Start') || this.textContent.includes('Playing')) {
                alert('Welcome to GameDaySquares! Sign up feature coming soon.');
            }
        });
    });

    const demoButton = document.querySelector('.btn-secondary');
    if (demoButton && demoButton.textContent.includes('Demo')) {
        demoButton.addEventListener('click', function() {
            alert('Demo video coming soon! Check back later.');
        });
    }

    // Pricing card interactions
    const pricingCards = document.querySelectorAll('.pricing-card .btn');
    pricingCards.forEach(button => {
        button.addEventListener('click', function() {
            const cardTitle = this.parentElement.querySelector('h3').textContent;
            if (this.textContent.includes('Free Trial') || this.textContent.includes('Get Started')) {
                alert(`Starting ${cardTitle} plan signup...`);
            } else if (this.textContent.includes('Contact Sales')) {
                alert('Redirecting to sales contact form...');
            }
        });
    });

    // Add some interactive feedback to squares
    const gameSquares = document.querySelectorAll('.square');
    gameSquares.forEach(square => {
        square.addEventListener('mouseenter', function() {
            if (!this.classList.contains('winner') && !this.classList.contains('active')) {
                this.style.background = 'rgba(255, 255, 255, 0.2)';
                this.style.cursor = 'pointer';
            }
        });

        square.addEventListener('mouseleave', function() {
            if (!this.classList.contains('winner') && !this.classList.contains('active')) {
                this.style.background = 'rgba(255, 255, 255, 0.1)';
            }
        });

        square.addEventListener('click', function() {
            if (!this.classList.contains('winner') && !this.classList.contains('active')) {
                this.classList.add('active');
                this.style.background = 'rgba(59, 130, 246, 0.3)';
                this.style.borderColor = '#3b82f6';
            }
        });
    });
});

// Utility function to debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimized scroll handler
const scrollHandler = debounce(() => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
}, 10);

window.addEventListener('scroll', scrollHandler);