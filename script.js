// 0. Mobile Menu Toggle (Priority)
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            mainNav.classList.toggle('active');
            
            const icon = menuToggle.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.className = 'ph ph-x';
                document.body.style.overflow = 'hidden'; 
            } else {
                icon.className = 'ph ph-list';
                document.body.style.overflow = '';
            }
        });

        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                menuToggle.querySelector('i').className = 'ph ph-list';
                document.body.style.overflow = '';
            });
        });

        document.addEventListener('click', (e) => {
            if (mainNav.classList.contains('active') && !mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
                mainNav.classList.remove('active');
                menuToggle.querySelector('i').className = 'ph ph-list';
                document.body.style.overflow = '';
            }
        });
    }

    // 1. FAQ Accordion Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
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

    // 1.5 Curriculum Accordion Functionality
    const curriculumItems = document.querySelectorAll('.accordion-item');
    
    curriculumItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        if (header) {
            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all others
                curriculumItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                });
                
                // Toggle clicked one
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
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

    // 4. Testimonials Slider Logic
    const slides = document.querySelectorAll('.testi-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (slides.length > 0 && prevBtn && nextBtn) {
        let currentIndex = 0;
        
        function updateSlider() {
            slides.forEach((slide, index) => {
                slide.classList.remove('active', 'prev', 'next', 'hidden');
                
                if (index === currentIndex) {
                    slide.classList.add('active');
                } else if (index === currentIndex - 1 || (currentIndex === 0 && index === slides.length - 1)) {
                    slide.classList.add('prev');
                } else if (index === currentIndex + 1 || (currentIndex === slides.length - 1 && index === 0)) {
                    slide.classList.add('next');
                } else {
                    slide.classList.add('hidden');
                }
            });
        }
        
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlider();
        });
        
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlider();
        });
        
        slides.forEach((slide) => {
            slide.addEventListener('click', () => {
                if (slide.classList.contains('prev')) {
                    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                    updateSlider();
                } else if (slide.classList.contains('next')) {
                    currentIndex = (currentIndex + 1) % slides.length;
                    updateSlider();
                }
            });
        });
        
        // Initialize
        updateSlider();
    }
