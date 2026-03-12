document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // Initializing Lenis for smooth scroll
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis();
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => { lenis.raf(time * 1000); });
        gsap.ticker.lagSmoothing(0);
    }

    // Preloader Animation
    const preloader = document.getElementById('preloader');
    if (preloader) {
        document.body.style.overflow = "hidden"; // Disable scroll while loading

        const tlPreloader = gsap.timeline({
            onComplete: () => {
                preloader.style.display = 'none';
                document.body.style.overflow = ""; // Re-enable scroll
            }
        });

        tlPreloader
            .to(".grid-line.horiz", { scaleX: 1, duration: 1.2, ease: "expo.inOut" })
            .to(".grid-line.vert", { scaleY: 1, duration: 1.2, ease: "expo.inOut" }, "<")
            .to(".intro-shape.rect", {opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)"}, "-=0.6")
            .to(".intro-shape.circle", {opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)"}, "-=0.7")
            .to(".intro-shape.square", {opacity: 1, scale: 1, rotation: 90, duration: 0.8, ease: "back.out(1.7)"}, "-=0.7")
            .to(".intro-char", { y: 0, opacity: 1, duration: 1.0, stagger: 0.05, ease: "power4.out" }, "<")
            .to(".intro-dot", { scale: 1, opacity: 1, duration: 0.6, ease: "elastic.out(1, 0.5)" }, "-=0.5")
            .to(".intro-shape", { opacity: 0, scale: 0.8, duration: 0.6, stagger: 0.1, ease: "power2.in" }, "+=0.5")
            .to(".grid-line", { opacity: 0, duration: 0.5 }, "<")
            .to(".intro-logo-wrapper", { scale: 1.1, duration: 1.5, ease: "power1.inOut" }, "<")
            .to(preloader, { opacity: 0, duration: 1.0, ease: "power2.inOut", delay: 0.1 });
    }

    // Navbar Logo Animation
    if (document.querySelector('.brand-logo')) {
        gsap.from(".brand-logo > *", { y: -50, opacity: 0, duration: 1.2, stagger: 0.1, ease: "power3.out", delay: 0.5 });
    }

    // Navbar Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const menuIcon = document.querySelector('.menu-toggle i');

    if (menuToggle && navMenu && menuIcon) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('mobile-active');
            if (navMenu.classList.contains('mobile-active')) {
                menuIcon.className = 'ri-close-line';
            } else {
                menuIcon.className = 'ri-menu-line';
            }
        });
    }

    // Hero Animation
    const heroTextElements = document.querySelectorAll(".hero-text-section > *");
    if(heroTextElements.length) {
        gsap.from(heroTextElements, { delay: 0.8, y: 100, opacity: 0, duration: 1, stagger: 0.15, ease: "power3.out" });
        gsap.from(".profile-container", { delay: 0.8, scale: 0.9, opacity: 0, y: 30, duration: 1.4, ease: "power3.out" }, "-=1");
    }

    // Interactive Text (Rubber Band)
    const letters = document.querySelectorAll('.interactive-text span');
    letters.forEach(letter => {
        letter.addEventListener('pointerenter', () => {
            gsap.to(letter, { scale: 1.25, y: -15, color: "#2563eb", duration: 0.45, ease: "back.out(2)" });
        });
        letter.addEventListener('pointerleave', () => {
            gsap.to(letter, { scale: 1, y: 0, color: "inherit", duration: 0.70, ease: "none" });
        });
    });

    // Hero Mouse Parallax
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    window.addEventListener('resize', () => {
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;
    });

    const heroSection = document.querySelector('.hero-section');
    if (heroSection && document.querySelector('.profile-container')) {
        const xSetProfile = gsap.quickSetter(".profile-container", "x", "px");
        const ySetProfile = gsap.quickSetter(".profile-container", "y", "px");
        
        heroSection.addEventListener('mousemove', (e) => {
            const x = (e.clientX / windowWidth - 0.5) * 30;
            const y = (e.clientY / windowHeight - 0.5) * 30;
            xSetProfile(-x * 0.5);
            ySetProfile(-y * 0.5);
        });
    }

    // Marquee
    const marqueeContent = document.querySelector('.marquee-content');
    if (marqueeContent) {
        gsap.to(marqueeContent, { xPercent: -50, ease: "none", duration: 15, repeat: -1 });
    }

    // Stats
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            gsap.to(stat, {
                innerText: target,
                duration: 2.5,
                snap: { innerText: 1 },
                ease: "power2.out",
                scrollTrigger: {
                    trigger: statsSection,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                onUpdate: function () {
                    stat.innerText = Math.ceil(this.targets()[0].innerText);
                }
            });
        });
    }

    // Services
    const servicesSection = document.querySelector('.section-padding .services-grid');
    if (servicesSection) {
        const serviceCards = document.querySelectorAll('.service-card');
        if (serviceCards.length > 0) {
            gsap.from(serviceCards, {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: servicesSection.closest('.section-padding'),
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });
        }
    }

    // Process
    const processSection = document.querySelector('.section-padding .process-grid');
    if (processSection) {
        const processCards = document.querySelectorAll('.process-card');
        if (processCards.length > 0) {
            gsap.from(processCards, {
                y: 60,
                opacity: 0,
                duration: 1.2,
                stagger: 0.25,
                ease: "back.out(1.2)",
                scrollTrigger: {
                    trigger: processSection.closest('.section-padding'),
                    start: "top 75%",
                    toggleActions: "play none none reverse"
                }
            });
        }
    }

    // Featured Work
    const workSection = document.querySelector('.projects-grid');
    if (workSection) {
        const workCards = document.querySelectorAll('.work-card');
        if (workCards.length > 0) {
            gsap.from(workCards, {
                y: 100,
                opacity: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: workSection.closest('.section-padding'),
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });

            workCards.forEach(card => {
                const imageContainer = card.querySelector('.work-image-wrapper');
                if (!imageContainer) return;

                let bounds = { left: 0, top: 0, width: 0, height: 0 };

                card.addEventListener('mouseenter', () => {
                    const rect = card.getBoundingClientRect();
                    bounds = { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
                });

                card.addEventListener('mousemove', (e) => {
                    if (gsap.isTweening(window)) return;

                    const x = e.clientX - bounds.left;
                    const y = e.clientY - bounds.top;
                    const centerX = bounds.width / 2;
                    const centerY = bounds.height / 2;

                    const rotateX = ((y - centerY) / centerY) * -2;
                    const rotateY = ((x - centerX) / centerX) * 2;

                    gsap.to(imageContainer, {
                        duration: 0.5,
                        rotationX: rotateX,
                        rotationY: rotateY,
                        ease: "power1.out",
                        transformPerspective: 500,
                        overwrite: "auto"
                    });
                });

                card.addEventListener('mouseleave', () => {
                    gsap.to(imageContainer, {
                        duration: 0.8,
                        rotationX: 0,
                        rotationY: 0,
                        ease: "elastic.out(1, 0.5)",
                        overwrite: "auto"
                    });
                });
            });
        }
    }

    // FAQ Accordion (Hover Effect like React version)
    const faqItems = document.querySelectorAll('.accordion-item');
    faqItems.forEach(item => {
        const btn = item.querySelector('.accordion-button');
        const collapseItem = item.querySelector('.accordion-collapse');
        let hoverTimeout;
        
        item.addEventListener('mouseenter', () => {
            clearTimeout(hoverTimeout);
            
            // Close all others first
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherBtn = otherItem.querySelector('.accordion-button');
                    const otherCollapse = otherItem.querySelector('.accordion-collapse');
                    if (otherBtn.getAttribute('aria-expanded') === 'true') {
                        otherBtn.setAttribute('aria-expanded', 'false');
                        otherBtn.classList.add('collapsed');
                        gsap.to(otherCollapse, { height: 0, opacity: 0, paddingTop: 0, duration: 0.3, ease: "power2.in" });
                    }
                }
            });

            btn.setAttribute('aria-expanded', 'true');
            btn.classList.remove('collapsed');
            
            gsap.set(collapseItem, { height: 'auto' });
            const targetHeight = collapseItem.offsetHeight;
            gsap.fromTo(collapseItem, 
                { height: 0, opacity: 0 }, 
                { height: targetHeight, opacity: 1, paddingTop: "1rem", duration: 0.4, ease: "power2.out" }
            );
        });

        item.addEventListener('mouseleave', () => {
            hoverTimeout = setTimeout(() => {
                btn.setAttribute('aria-expanded', 'false');
                btn.classList.add('collapsed');
                gsap.to(collapseItem, { height: 0, opacity: 0, paddingTop: 0, duration: 0.3, ease: "power2.in" });
            }, 100);
        });
    });

    // Footer Rolling Text
    const rollingTexts = document.querySelectorAll('.rolling-text');
    rollingTexts.forEach(text => {
        const originalContent = text.textContent;
        // Don't modify if it already has .letter elements (e.g., duplicated during generation)
        if(text.querySelector('.letter')) return;
        
        text.innerHTML = '';
        originalContent.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.classList.add('letter');
            span.style.setProperty('--index', index);
            if (char === ' ') {
                span.style.marginRight = "0.2em";
            }
            text.appendChild(span);
        });
    });

    // Magnetic Buttons
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const x = e.offsetX;
            const y = e.offsetY;
            const btnWidth = btn.clientWidth;
            const btnHeight = btn.clientHeight;
            const transX = (x - btnWidth / 2);
            const transY = (y - btnHeight / 2);

            gsap.to(btn, { x: transX * 0.3, y: transY * 0.3, duration: 0.5, ease: "power2.out" });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
        });
    });

});
