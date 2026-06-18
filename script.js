/* ═══════════════════════════════════════════════════════════
   AMEY CHAUDHARI – 3D MATRIX PORTFOLIO
   JavaScript Engine
   ═══════════════════════════════════════════════════════════ */

// ── DOM Ready ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initPortfolio();
    initThemeToggle();
});

function initPortfolio() {
    initMatrixRain();
    initThreeJS();
    initTypingEffect();
    initScrollAnimations();
    initNavigation();
    initSkillBars();
    initTiltCards();
    initContactForm();
    initParticleTrail();
    animateHeroItems();

    // New Features
    initCustomCursor();
    initLiveAPI();
}


function animateHeroItems() {
    const heroSection = document.getElementById('hero');
    const greeting = document.querySelector('.hero-greeting');
    const heroNameEl = document.querySelector('.hero-name');
    const tagline = document.querySelector('.hero-tagline');
    const badges = document.querySelector('.hero-badges');
    const cta = document.querySelector('.hero-cta');
    const right = document.querySelector('.hero-right');
    const social = document.querySelector('.hero-social-strip');
    const scrollInd = document.querySelector('.scroll-indicator');

    // ── Build the name spans (AMEY / CHAUDHARI) ───────────────────────
    if (heroNameEl) {
        heroNameEl.innerHTML = `<span class="name-amey">AMEY</span>&nbsp;<span class="name-chaudhari">CHAUDHARI</span>`;
        heroNameEl.setAttribute('data-text', 'AMEY CHAUDHARI');
        // Container was hidden (opacity:0 in CSS) to prevent raw text flash.
        // Now that spans are set up, reveal the container — spans control their own visibility.
        heroNameEl.style.opacity = '1';
    }

    // ── Element animation map ──────────────────────────────────────────
    // { el, inDelay(ms), inClass, outClass, outDelay(ms) }
    // Note: heroNameEl not in items – its child spans handle their own animation
    const items = [
        { el: greeting, inDelay: 80, inClass: 'hero-enter-left', outClass: 'hero-exit-left', outDelay: 500 },
        { el: tagline, inDelay: 600, inClass: 'hero-enter-up', outClass: 'hero-exit-down', outDelay: 400 },
        { el: badges, inDelay: 800, inClass: 'hero-enter-up-soft', outClass: 'hero-exit-down', outDelay: 350 },
        { el: cta, inDelay: 1050, inClass: 'hero-enter-up-soft', outClass: 'hero-exit-down', outDelay: 280 },
        { el: right, inDelay: 420, inClass: 'hero-enter-right', outClass: 'hero-exit-right', outDelay: 420 },
        { el: social, inDelay: 820, inClass: 'hero-enter-right', outClass: 'hero-exit-right', outDelay: 320 },
        { el: scrollInd, inDelay: 1400, inClass: 'hero-enter-fade', outClass: 'hero-exit-fade', outDelay: 200 },
    ].filter(x => x.el); // skip nulls

    // ── IN trigger ────────────────────────────────────────────────────
    function triggerIn() {
        items.forEach(({ el, inDelay, inClass, outClass }) => {
            el.classList.remove(outClass, 'hero-settled');
            void el.offsetWidth; // reflow reset
            setTimeout(() => {
                el.classList.add(inClass);
                setTimeout(() => el.classList.add('hero-settled'), 1100);
            }, inDelay);
        });

        // Badge stagger
        if (badges) {
            setTimeout(() => {
                badges.querySelectorAll('.badge').forEach((b, i) => {
                    b.classList.remove('badge-in');
                    void b.offsetWidth;
                    setTimeout(() => b.classList.add('badge-in'), i * 110);
                });
            }, 850);
        }

        // AMEY drops from top, CHAUDHARI rises from bottom (CSS transition)
        if (heroNameEl) {
            const amey = heroNameEl.querySelector('.name-amey');
            const chaud = heroNameEl.querySelector('.name-chaudhari');
            if (amey) { amey.classList.remove('name-amey-in'); void amey.offsetWidth; setTimeout(() => amey.classList.add('name-amey-in'), 700); }
            if (chaud) { chaud.classList.remove('name-chaud-in'); void chaud.offsetWidth; setTimeout(() => chaud.classList.add('name-chaud-in'), 880); }
        }
    }

    // ── OUT trigger (when hero scrolls away) ──────────────────────────
    function triggerOut() {
        items.forEach(({ el, inClass, outClass, outDelay }) => {
            el.classList.remove(inClass, 'hero-settled');
            void el.offsetWidth;
            setTimeout(() => el.classList.add(outClass), outDelay);
        });

        if (badges) badges.querySelectorAll('.badge').forEach(b => b.classList.remove('badge-in'));

        if (heroNameEl) {
            heroNameEl.querySelector('.name-amey')?.classList.remove('name-amey-in');
            heroNameEl.querySelector('.name-chaudhari')?.classList.remove('name-chaud-in');
        }
    }

    // ── Scroll observer: out on leave, in on return ────────────────────
    let heroVisible = true;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!heroVisible) { heroVisible = true; triggerIn(); }
            } else {
                if (heroVisible) { heroVisible = false; triggerOut(); }
            }
        });
    }, { threshold: 0.08 });

    if (heroSection) observer.observe(heroSection);

    // Fire IN on boot
    triggerIn();
}


/* ═══════════════════════════════════════════════════════════
   MATRIX RAIN – Canvas Animation
   ═══════════════════════════════════════════════════════════ */
function initMatrixRain() {
    const canvas = document.getElementById('matrix-rain');
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/{}[]();:.!@#$%^&*';
    const charArr = chars.split('');
    const fontSize = 14;
    let columns = Math.floor(canvas.width / fontSize);
    let drops = Array(columns).fill(1);

    window.addEventListener('resize', () => {
        columns = Math.floor(canvas.width / fontSize);
        drops = Array(columns).fill(1);
    });

    function drawMatrix() {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.06)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#00ff41';
        ctx.font = `${fontSize}px 'Fira Code', monospace`;

        for (let i = 0; i < drops.length; i++) {
            const text = charArr[Math.floor(Math.random() * charArr.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;

            // Vary brightness
            const alpha = Math.random() * 0.5 + 0.3;
            ctx.fillStyle = `rgba(0, 255, 65, ${alpha})`;
            ctx.fillText(text, x, y);

            // Head glow
            if (Math.random() > 0.96) {
                ctx.fillStyle = 'rgba(150, 255, 150, 0.9)';
                ctx.fillText(text, x, y);
            }

            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(drawMatrix, 45);
}

/* ═══════════════════════════════════════════════════════════
   THREE.JS – 3D Background Scene
   ═══════════════════════════════════════════════════════════ */
function initThreeJS() {
    if (typeof THREE === 'undefined') return;

    const container = document.getElementById('three-bg');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Materials
    const wireMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ff41,
        wireframe: true,
        transparent: true,
        opacity: 0.08
    });

    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ff41,
        wireframe: true,
        transparent: true,
        opacity: 0.15
    });

    // Geometries
    const torusGeo = new THREE.TorusGeometry(3, 1, 16, 50);
    const torus = new THREE.Mesh(torusGeo, wireMaterial);
    torus.position.set(6, 2, -8);
    scene.add(torus);

    const icosaGeo = new THREE.IcosahedronGeometry(2.5, 1);
    const icosa = new THREE.Mesh(icosaGeo, glowMaterial);
    icosa.position.set(-7, -3, -10);
    scene.add(icosa);

    const octaGeo = new THREE.OctahedronGeometry(2, 0);
    const octa = new THREE.Mesh(octaGeo, wireMaterial);
    octa.position.set(-4, 5, -12);
    scene.add(octa);

    const dodecaGeo = new THREE.DodecahedronGeometry(1.8, 0);
    const dodeca = new THREE.Mesh(dodecaGeo, glowMaterial);
    dodeca.position.set(5, -5, -9);
    scene.add(dodeca);

    // Particle system
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 40;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
        color: 0x00ff41,
        size: 0.05,
        transparent: true,
        opacity: 0.6
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    camera.position.z = 5;

    // Mouse tracking
    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    // Scroll tracking
    let scrollY = 0;
    window.addEventListener('scroll', () => {
        scrollY = window.scrollY;
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        const time = Date.now() * 0.001;

        torus.rotation.x = time * 0.3;
        torus.rotation.y = time * 0.2;

        icosa.rotation.x = time * 0.2;
        icosa.rotation.z = time * 0.15;

        octa.rotation.y = time * 0.25;
        octa.rotation.z = time * 0.3;

        dodeca.rotation.x = time * 0.15;
        dodeca.rotation.y = time * 0.2;

        // Float animation
        torus.position.y = 2 + Math.sin(time * 0.5) * 0.8;
        icosa.position.y = -3 + Math.sin(time * 0.4 + 1) * 1;
        octa.position.y = 5 + Math.sin(time * 0.3 + 2) * 0.6;
        dodeca.position.y = -5 + Math.sin(time * 0.6 + 3) * 0.7;

        // Mouse parallax
        camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
        camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.05;

        // Scroll parallax
        camera.position.y -= scrollY * 0.0005;

        particles.rotation.y = time * 0.02;
        particles.rotation.x = time * 0.01;

        renderer.render(scene, camera);
    }

    animate();

    // Resize handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

/* ═══════════════════════════════════════════════════════════
   TYPING EFFECT
   ═══════════════════════════════════════════════════════════ */
function initTypingEffect() {
    const phrases = [
        'ML Engineer Enthusiast',
        'IIT Delhi Student',
        'Robotics Club Member',
        'Competitive Programmer',
        'Building Autonomous Robots',
        'Neural Network Architect'
    ];

    const typedText = document.getElementById('typed-text');
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typedText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            typedText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 80;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; // Pause before next
        }

        setTimeout(type, typeSpeed);
    }

    setTimeout(type, 1500);
}

/* ═══════════════════════════════════════════════════════════
   SCROLL ANIMATIONS – Intersection Observer
   ═══════════════════════════════════════════════════════════ */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');

                // Animate skill bars when visible
                if (entry.target.classList.contains('skill-card')) {
                    const bar = entry.target.querySelector('.skill-fill');
                    if (bar) {
                        const level = bar.getAttribute('data-level');
                        setTimeout(() => {
                            bar.style.width = level + '%';
                        }, 300);
                    }
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
        observer.observe(el);
    });
}

/* ═══════════════════════════════════════════════════════════
   NAVIGATION
   ═══════════════════════════════════════════════════════════ */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    const allLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active section highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        allLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
    });

    // Mobile toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Close mobile menu on link click
    allLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });
}

/* ═══════════════════════════════════════════════════════════
   SKILL BARS
   ═══════════════════════════════════════════════════════════ */
function initSkillBars() {
    // Handled by scroll animation observer
}

/* ═══════════════════════════════════════════════════════════
   3D TILT CARDS – Mouse Tracking Parallax
   ═══════════════════════════════════════════════════════════ */
function initTiltCards() {
    const cards = document.querySelectorAll('.tilt-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / centerY * -8;
            const rotateY = (x - centerX) / centerX * 8;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            card.style.transition = 'transform 0.5s ease';
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.1s ease';
        });
    });
}

/* ═══════════════════════════════════════════════════════════
   CONTACT FORM
   ═══════════════════════════════════════════════════════════ */
function initContactForm() {
    const form = document.getElementById('contact-form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Button feedback - Loading
        const btn = form.querySelector('.submit-btn');
        const originalText = btn.querySelector('.btn-text').textContent;
        btn.querySelector('.btn-text').textContent = 'Sending...';
        btn.style.background = 'linear-gradient(135deg, #00cc33, #00ff41)';

        // Web3Forms Integration
        // TODO: Replace 'YOUR_ACCESS_KEY_HERE' with your actual Web3Forms access key
        // Get your free key at https://web3forms.com/
        const formObject = {
            access_key: 'ca6e7c9f-07d3-4a3e-8266-19a7df949d71',
            name: name,
            email: email,
            subject: subject,
            message: message,
            from_name: name
        };

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formObject)
            });

            const json = await response.json();

            if (response.status == 200) {
                // Success
                btn.querySelector('.btn-text').textContent = 'Message Sent!';
                form.reset();
            } else {
                // Error from Web3Forms
                console.log(response);
                btn.querySelector('.btn-text').textContent = 'Error Sending';
                btn.style.background = 'linear-gradient(135deg, #ff3333, #cc0000)';
            }
        } catch (error) {
            console.log(error);
            btn.querySelector('.btn-text').textContent = 'Something went wrong!';
            btn.style.background = 'linear-gradient(135deg, #ff3333, #cc0000)';
        }

        // Reset button after delay
        setTimeout(() => {
            btn.querySelector('.btn-text').textContent = originalText;
            btn.style.background = '';
        }, 4000);
    });
}

/* ═══════════════════════════════════════════════════════════
   PARTICLE TRAIL – Mouse Follow Effect
   ═══════════════════════════════════════════════════════════ */
function initParticleTrail() {
    let lastTime = 0;
    const throttle = 50; // ms between particles

    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastTime < throttle) return;
        lastTime = now;

        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            width: 4px;
            height: 4px;
            background: #00ff41;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            box-shadow: 0 0 6px rgba(0, 255, 65, 0.6);
            transition: all 0.8s ease;
        `;
        document.body.appendChild(particle);

        requestAnimationFrame(() => {
            particle.style.opacity = '0';
            particle.style.transform = `translate(${(Math.random() - 0.5) * 30}px, ${(Math.random() - 0.5) * 30}px) scale(0)`;
        });

        setTimeout(() => particle.remove(), 800);
    });
}

/* ═══════════════════════════════════════════════════════════
   SMOOTH SCROLL – for CTA buttons
   ═══════════════════════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

/* ═══════════════════════════════════════════════════════════
   PRELOADER – Optional loading screen
   ═══════════════════════════════════════════════════════════ */
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

/* ═══════════════════════════════════════════════════════════
   CUSTOM HACKER CURSOR
   ═══════════════════════════════════════════════════════════ */
function initCustomCursor() {
    const cursor = document.getElementById('custom-cursor');
    if (!cursor) return;

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    const hoverElements = document.querySelectorAll('a, button, .nav-logo, .chrome-bookmark, .repo-title');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hovering');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovering');
        });
    });

    const textElements = document.querySelectorAll('p, h1, h2, h3, h4, span, input, textarea');
    textElements.forEach(el => {
        // Skip elements that are inside hover elements or are hover elements
        if (el.closest('a') || el.closest('button')) return;

        el.addEventListener('mouseenter', () => {
            cursor.classList.add('text-hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('text-hover');
        });
    });

    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });
}


/* ═══════════════════════════════════════════════════════════
   LIVE API INTEGRATION
   ═══════════════════════════════════════════════════════════ */
async function initLiveAPI() {
    // GitHub API
    try {
        const ghResponse = await fetch('https://api.github.com/users/amey1942007');
        if (ghResponse.ok) {
            const ghData = await ghResponse.json();
            const ghStats = document.querySelector('.gh-stats');
            if (ghStats && ghData.public_repos !== undefined) {
                ghStats.innerHTML = `
                    <div class="gh-stat"><strong>${ghData.public_repos}</strong><span>Repos</span></div>
                    <div class="gh-stat"><strong>${ghData.followers}</strong><span>Followers</span></div>
                `;
            }
        }
    } catch (e) { console.log('GitHub API fetch failed:', e); }

    // LeetCode API (via proxy)
    try {
        const lcResponse = await fetch('https://leetcode-stats-api.herokuapp.com/Amey19');
        if (lcResponse.ok) {
            const lcData = await lcResponse.json();
            const lcDesc = document.querySelector('#leetcode-card .cp-desc');
            if (lcDesc && lcData.status === 'success') {
                lcDesc.innerHTML = `Problems Solved: <strong>${lcData.totalSolved}</strong><br>Easy: ${lcData.easySolved} | Med: ${lcData.mediumSolved} | Hard: ${lcData.hardSolved}`;
            }
        }
    } catch (e) { console.log('LeetCode API fetch failed:', e); }
}


/* ═══════════════════════════════════════════════════════════
   LIDAR/SLAM BACKGROUND EFFECT
   ═══════════════════════════════════════════════════════════ */
function initLidarBackground() {
    const canvas = document.getElementById('lidar-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width, height;
    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    let mouse = { x: width / 2, y: height / 2 };
    let points = [];
    let angle = 0;

    document.addEventListener('mousemove', (e) => {
        // Move towards target smoothly or abruptly? For SLAM, abruptly is fine
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    function drawLidar() {
        ctx.clearRect(0, 0, width, height);

        // Emulate scanner ray
        angle += 0.05;
        const rayLength = Math.max(width, height);

        ctx.save();

        // Setup clip region to avoid drawing on terminal or other UI areas if needed
        // For now, let it be behind everything (handled by z-index)

        // Draw scanning cone
        ctx.beginPath();
        ctx.moveTo(mouse.x, mouse.y);
        ctx.lineTo(mouse.x + Math.cos(angle - 0.2) * rayLength, mouse.y + Math.sin(angle - 0.2) * rayLength);
        ctx.lineTo(mouse.x + Math.cos(angle + 0.2) * rayLength, mouse.y + Math.sin(angle + 0.2) * rayLength);
        ctx.closePath();
        ctx.fillStyle = 'rgba(0, 255, 65, 0.03)';
        ctx.fill();

        // Draw scanner center dot
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#39ff14';
        ctx.fill();
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#39ff14';

        // Add points at the boundary of rectangles/page
        if (Math.random() > 0.3) {
            const hitDist = 50 + Math.random() * 300;
            points.push({
                x: mouse.x + Math.cos(angle) * hitDist,
                y: mouse.y + Math.sin(angle) * hitDist,
                life: 1.0
            });
        }

        // Draw and age points
        ctx.shadowBlur = 0;
        for (let i = points.length - 1; i >= 0; i--) {
            let p = points[i];
            ctx.fillStyle = `rgba(0, 255, 65, ${p.life * 0.5})`;
            ctx.fillRect(p.x, p.y, 2, 2);
            p.life -= 0.005;
            if (p.life <= 0) {
                points.splice(i, 1);
            }
        }

        ctx.restore();

        requestAnimationFrame(drawLidar);
    }

    drawLidar();
}


/* ═══════════════════════════════════════════════════════════
   THEME TOGGLE (Dark/Light)
   ═══════════════════════════════════════════════════════════ */
function initThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;

    // Load saved preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlEl.setAttribute('data-theme', savedTheme);

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = htmlEl.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            htmlEl.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
}
