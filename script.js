document.addEventListener('DOMContentLoaded', () => {
    // 1. FAQ Accordion Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-q');
        
        question.addEventListener('click', () => {
            // Close all the others first
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle the clicked one
            item.classList.toggle('active');
        });
    });

    // 2. Header Style on Scroll
    const header = document.querySelector('.main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(1, 4, 4, 0.95)';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.5)';
            header.style.padding = '1rem 0';
        } else {
            header.style.background = 'rgba(1, 4, 4, 0.85)';
            header.style.boxShadow = 'none';
            header.style.padding = '1.5rem 0';
        }
    });

    // 3. Smooth Reveal Animation for Sections
    // Intersection Observer to reveal elements as they come into view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add initial styles for reveal elements dynamically
    const sectionsToReveal = document.querySelectorAll('section, .badge-card, .benefit-card, .tl-item, .step');
    
    sectionsToReveal.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        revealObserver.observe(el);
    });

    // Special class added when intersection happens
    // We inject css dynamically for the 'revealed' state
    const styleObj = document.createElement('style');
    styleObj.innerHTML = `
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleObj);
});
