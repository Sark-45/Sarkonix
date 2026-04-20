document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        smoothTouch: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. GSAP ScrollTrigger Integration
    gsap.registerPlugin(ScrollTrigger);
    lenis.on('scroll', ScrollTrigger.update);

    // 2.5 Dynamic Text Splitting for Hero
    document.querySelectorAll('.hero-title .reveal-text').forEach(el => {
        const text = el.innerText;
        el.innerHTML = '';
        text.split(' ').forEach(word => {
            const span = document.createElement('span');
            span.classList.add('split-word');
            span.innerText = word + ' ';
            el.appendChild(span);
        });
        el.style.overflow = 'hidden';
        if (el.classList.contains('accent')) {
            el.querySelectorAll('.split-word').forEach(sw => sw.classList.add('accent'));
        }
    });

    // 3. Hero Entrance Animations
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.to('.split-word', {
        y: '0%',
        stagger: 0.05,
        duration: 1.2,
        delay: 0.2
    }, 'start')
        .to('.fade-up', {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 1.2
        }, 'start+=0.5')
        .to('.navbar', {
            y: 0,
            opacity: 1,
            duration: 1
        }, 'start+=0.2');

    // 5. Scroll Animations
    // Navbar change on scroll
    ScrollTrigger.create({
        start: 'top -80',
        onEnter: () => document.getElementById('navbar').classList.add('scrolled'),
        onLeaveBack: () => document.getElementById('navbar').classList.remove('scrolled'),
    });

    // Universal Entrance Reveals
    function initScrollReveals() {
        const revealElements = document.querySelectorAll('.fade-up, .reveal-text, .reveal');

        revealElements.forEach(el => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                },
                y: 50,
                opacity: 0,
                duration: 1.2,
                ease: 'power3.out',
                stagger: 0.1
            });
        });
    }

    initScrollReveals();

    // Work Item Images Parallax
    document.querySelectorAll('.work-img-wrapper img').forEach(img => {
        gsap.to(img, {
            scrollTrigger: {
                trigger: img,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            },
            y: -50,
            ease: 'none'
        });
    });

    // Counter animation
    document.querySelectorAll('.counter').forEach(counter => {
        const goal = parseInt(counter.innerText);
        gsap.from(counter, {
            scrollTrigger: {
                trigger: counter,
                start: 'top 90%',
            },
            innerText: 0,
            duration: 2,
            snap: { innerText: 1 },
            stagger: 0.2
        });
    });

    // 6. Magnetic Buttons
    document.querySelectorAll('.magnetic').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(btn, {
                x: x * 0.15,
                y: y * 0.15,
                duration: 0.3
            });
        });
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.5 });
        });
    });

    // 7. Hero Parallax
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        gsap.to('.mesh-gradient', {
            x: x,
            y: y,
            duration: 1,
            ease: 'power2.out'
        });
    });

    // 8. Populating Marquee with Text Logos
    const marqueeContent = document.getElementById('marquee-content');
    const brands = [
        'zepto', 'meesho', 'Groww', 'Khatabook', 'Apollo Clinic', 'Manipal Hospitals',
        'TVS Motors', 'TVS Credit', 'Muthoot Finance', 'Jio', 'bigbasket', 'Urban Company',
        'Nykaa', 'blinkit', 'boAt', 'lenskart'
    ];

    // Create 2 sets for seamless loop
    const populate = (container) => {
        brands.forEach(brand => {
            const div = document.createElement('div');
            div.className = 'marquee-item';
            div.innerHTML = `<span class="company-name">${brand}</span>`;
            div.setAttribute('title', brand);
            container.appendChild(div);
        });
    };

    if (marqueeContent) {
        populate(marqueeContent);
        populate(marqueeContent);
    }

    // Marquee Navigation Logic
    const marqueeTrack = document.querySelector('.marquee-track');
    let currentX = 0;
    const step = 400; // Pixels to move on click

    window.moveMarquee = (direction) => {
        // We pause the auto-animation briefly or just additive movement
        // Since we are using CSS animation, we might need to switch to GSAP for the whole marquee to make it controllable
        // But to keep it simple and high-performance, we'll use GSAP to shift the track container
        currentX += (direction === 'next' ? -step : step);
        gsap.to(marqueeTrack, {
            x: currentX,
            duration: 0.8,
            ease: 'power2.out'
        });
    };

    // 9. Particle Canvas Network
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];

        const initCanvas = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            particles = [];

            const numParticles = Math.min(Math.floor(width * height / 15000), 120);

            for (let i = 0; i < numParticles; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.4,
                    vy: (Math.random() - 0.5) * 0.4,
                    radius: Math.random() * 1.5 + 0.5
                });
            }
        };

        initCanvas();
        window.addEventListener('resize', initCanvas);

        let mouse = { x: -1000, y: -1000 };
        document.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        const animateParticles = () => {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                let p = particles[i];
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                // Mouse interaction
                let dxMouse = mouse.x - p.x;
                let dyMouse = mouse.y - p.y;
                let distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

                if (distMouse < 180) {
                    p.x -= dxMouse * 0.015;
                    p.y -= dyMouse * 0.015;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
                ctx.fill();

                for (let j = i + 1; j < particles.length; j++) {
                    let p2 = particles[j];
                    let dx = p.x - p2.x;
                    let dy = p.y - p2.y;
                    let dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 - dist / 120 * 0.15})`;
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animateParticles);
        };

        animateParticles();
    }

    // Dynamic Mouse Glow for Background Grid
    const mouseGlow = document.querySelector('.mouse-glow');
    if (mouseGlow) {
        document.addEventListener('mousemove', (e) => {
            gsap.to(mouseGlow, {
                x: e.clientX,
                y: e.clientY,
                opacity: 1,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
        document.addEventListener('mouseleave', () => {
            gsap.to(mouseGlow, { opacity: 0, duration: 0.5 });
        });
    }

    // Parallax Canvas & Grid Scroll
    const gridOverlay = document.querySelector('.grid-pattern-overlay');
    window.addEventListener('scroll', () => {
        const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        if (canvas) {
            gsap.to(canvas, { yPercent: scrollPercent * 10, ease: 'none', overwrite: 'auto' });
        }
        if (gridOverlay) {
            gsap.to(gridOverlay, { yPercent: scrollPercent * 5, ease: 'none', overwrite: 'auto' });
        }
    });

    // Floating GSAP Badges Animation
    gsap.to('.floating-badge', {
        y: 'random(-15, 15)',
        x: 'random(-5, 5)',
        rotation: 'random(-3, 3)',
        duration: 'random(4, 6)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.3
    });

    // Animate Badge Entrance
    gsap.from('.floating-badge', {
        scale: 0.5,
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: 'elastic.out(1, 0.7)',
        stagger: 0.15,
        delay: 1.5 // appear after hero text
    });

    // General Section Scroll Animations (Premium Staggered Flow)
    // Filter out hero elements to prevent double animation
    const scrollTargets = gsap.utils.toArray('.fade-up, .reveal, .service-card, .work-item, .testimonial-card, .section-header, .section-label').filter(el => !el.closest('#hero'));

    // Securely set initial invisible state to prevent ScrollTrigger/CSS fighting
    gsap.set(scrollTargets, { opacity: 0, y: 50 });

    ScrollTrigger.batch(scrollTargets, {
        start: "top 90%", // Trigger slightly before it fully enters
        onEnter: (batch) => {
            gsap.to(batch, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
                stagger: 0.15, // Smooth sequential revelation
                overwrite: true
            });
        },
        onLeaveBack: (batch) => {
            gsap.set(batch, { y: 50, opacity: 0, overwrite: true });
        }
    });

    // 10. Service Card 3D Tilt Effect
    document.querySelectorAll('.service-card.tilt').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            gsap.to(card, {
                rotateX: rotateX,
                rotateY: rotateY,
                transformPerspective: 1000,
                ease: 'power1.out',
                duration: 0.4
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                ease: 'power3.out',
                duration: 0.8
            });
        });
    });

    // 10.5 Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('nav-active');
            document.body.classList.toggle('nav-open');
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('nav-active');
                document.body.classList.remove('nav-open');
            });
        });
    }

    // 11. Custom Premium Cursor
    if (window.innerWidth > 768) {
        const cursor = document.createElement('div');
        cursor.classList.add('custom-cursor');
        document.body.appendChild(cursor);

        const follower = document.createElement('div');
        follower.classList.add('custom-cursor-follower');
        document.body.appendChild(follower);

        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'power2.out' });
            gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.5, ease: 'power2.out' });
        });

        document.querySelectorAll('a, button, input, select, .magnetic, .service-card, .work-item').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('active');
                follower.classList.add('active');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
                follower.classList.remove('active');
            });
        });

        // Hide default cursor on interactive sections
        document.querySelectorAll('a, button, select, input, .service-card').forEach(el => {
            el.style.cursor = 'none';
        });
    }

    // 12. Form Handling
    const createSuccessModal = () => {
        if (document.getElementById('success-modal')) return;
        const modal = document.createElement("div");
        modal.className = "success-modal-overlay";
        modal.id = "success-modal";
        modal.innerHTML = `
            <div class="success-modal">
                <div class="success-icon">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke-linecap="round" stroke-linejoin="round"/>
                        <polyline points="22 4 12 14.01 9 11.01" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <h3>Thank you for connecting with us!</h3>
                <p>We have received your message and our elite team will evaluate your requirements and reach out to you shortly.</p>
                <button class="btn btn-primary" onclick="closeSuccessModal()">Acknowledged</button>
            </div>
        `;
        document.body.appendChild(modal);
    };

    window.closeSuccessModal = () => {
        const modal = document.getElementById('success-modal');
        if (modal) modal.classList.remove('active');
    };

    createSuccessModal();

    const forms = document.querySelectorAll('form.premium-form, #contact-form');
    forms.forEach(form => {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = "Initializing...";
            submitBtn.disabled = true;

            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch("https://formsubmit.co/ajax/contact.sarkonix@gmail.com", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    form.reset();
                    document.getElementById('success-modal').classList.add('active');
                } else {
                    alert("System failed to dispatch message. Please try again or construct an email manually.");
                }
            } catch (err) {
                alert("Network error. Please ensure you are connected to the internet.");
            } finally {
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }
        });
    });

    // 13. Favicon — handled statically via favicon-mark.svg (black circle, white logo)
});
