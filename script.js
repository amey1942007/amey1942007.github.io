/* ═══════════════════════════════════════════════════════════
   AMEY CHAUDHARI – 3D MATRIX PORTFOLIO
   JavaScript Engine
   ═══════════════════════════════════════════════════════════ */

// ── DOM Ready ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initBootSequence();
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
    initDinoGame();
    animateHeroItems();
    initLiveStats();
    initInteractiveTerminal();
    initThemeSwitcher();
    initEasterEggs();
    initKeyboardShortcuts();
    initSoundToggle();
}

/* ═══════════════════════════════════════════════════════════
   BOOT SEQUENCE – Terminal Startup
   ═══════════════════════════════════════════════════════════ */
function initBootSequence() {
    const bootScreen = document.getElementById('boot-screen');
    const bootMatrix = document.getElementById('boot-matrix');
    const bootTerminal = document.getElementById('boot-terminal');
    const bootLog = document.getElementById('boot-log');
    const bootCursor = document.getElementById('boot-cursor');
    const powerBtn = document.getElementById('power-btn');
    const bootHint = document.getElementById('boot-hint');
    const mainContent = document.getElementById('main-content');

    // Hide power button and hint initially — will appear after boot
    powerBtn.classList.add('fade-out');
    powerBtn.classList.remove('offline');
    if (bootHint) bootHint.classList.add('hidden');

    // Boot Matrix rain (brighter than the main one)
    function initBootMatrix() {
        const ctx = bootMatrix.getContext('2d');
        bootMatrix.width = window.innerWidth;
        bootMatrix.height = window.innerHeight;
        bootMatrix.classList.add('active');

        const chars = 'アイウエオカキクケコサシスセソ01ABCDEF<>/{}[]();:.!';
        const charArr = chars.split('');
        const fontSize = 16;
        let columns = Math.floor(bootMatrix.width / fontSize);
        let drops = Array(columns).fill(1);

        function draw() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, bootMatrix.width, bootMatrix.height);

            for (let i = 0; i < drops.length; i++) {
                const text = charArr[Math.floor(Math.random() * charArr.length)];
                const alpha = Math.random() * 0.6 + 0.4;
                ctx.fillStyle = `rgba(0, 255, 65, ${alpha})`;
                ctx.font = `${fontSize}px 'Fira Code', monospace`;
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > bootMatrix.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        return setInterval(draw, 40);
    }

    const bootMessages = [
        { text: '[SYSTEM] Initializing kernel modules...', delay: 120, type: 'system' },
        { text: '[SYSTEM] Loading Matrix interface v3.0...', delay: 150, type: 'system' },
        { text: '[NETWORK] Establishing secure connection...', delay: 130, type: 'network' },
        { text: '[NETWORK] Connection established ✓', delay: 120, type: 'success' },
        { text: '[DEVICE] GPU acceleration enabled ✓', delay: 120, type: 'success' },
        { text: '[ML] Loading PyTorch runtime...', delay: 150, type: 'ml' },
        { text: '[SLAM] LiDAR sensor online ✓', delay: 120, type: 'success' },
        { text: '', delay: 80, type: 'blank' },
        { text: '> SYSTEM READY', delay: 200, type: 'ready' },
        { text: '> Loading profile: AMEY CHAUDHARI...', delay: 300, type: 'ready' },
        { text: '> Welcome.', delay: 400, type: 'welcome' },
    ];

    const shutdownMessages = [
        { text: '[SYSTEM] Initiating shutdown sequence...', delay: 200, type: 'system' },
        { text: '[NETWORK] Terminating connections...', delay: 150, type: 'network' },
        { text: '[DEVICE] Unmounting filesystems...', delay: 250, type: 'device' },
        { text: '[ML] Saving neural network weights...', delay: 300, type: 'ml' },
        { text: '[ROS2] Halting robot control nodes...', delay: 200, type: 'ros' },
        { text: '[SECURITY] Disengaging firewall...', delay: 150, type: 'success' },
        { text: '', delay: 100, type: 'blank' },
        { text: '> Powering off...', delay: 400, type: 'system' },
    ];

    async function typeBootMessage(msg) {
        return new Promise(resolve => {
            const line = document.createElement('div');
            line.className = 'log-line';

            if (msg.type === 'success') {
                line.style.color = '#00ff41';
            } else if (msg.type === 'ready' || msg.type === 'welcome') {
                line.style.color = '#39ff14';
                line.style.fontWeight = '700';
                line.style.textShadow = '0 0 12px rgba(0, 255, 65, 0.8)';
            } else if (msg.type === 'blank') {
                line.innerHTML = '&nbsp;';
                bootLog.appendChild(line);
                setTimeout(resolve, msg.delay);
                return;
            } else {
                line.style.color = 'rgba(0, 255, 65, 0.6)';
            }

            let i = 0;
            line.textContent = '';
            bootLog.appendChild(line);
            bootLog.scrollTop = bootLog.scrollHeight;

            const typeChar = () => {
                if (i < msg.text.length) {
                    line.textContent += msg.text[i];
                    i++;
                    setTimeout(typeChar, 10 + Math.random() * 6);
                } else {
                    setTimeout(resolve, msg.delay);
                }
            };
            typeChar();
        });
    }

    async function runBootSequence() {
        powerBtn.classList.add('booting');
        bootLog.innerHTML = '';

        // Start bright Matrix rain
        const matrixInterval = initBootMatrix();

        // Show terminal after a tiny pause
        await new Promise(r => setTimeout(r, 300));
        bootTerminal.classList.add('active');

        // Type all messages
        for (const msg of bootMessages) {
            await typeBootMessage(msg);
        }

        // Boot complete — fade out overlay
        await new Promise(r => setTimeout(r, 500));
        clearInterval(matrixInterval);
        playBootSound();
        bootScreen.classList.add('off');

        // Show main content
        mainContent.classList.add('content-visible');
        powerBtn.classList.remove('booting');
        // Reveal power button at corner
        powerBtn.classList.remove('fade-out');
        isBooted = true;

        // Initialize all portfolio systems
        setTimeout(() => {
            if (!document.body.classList.contains('initialized')) {
                initPortfolio();
                document.body.classList.add('initialized');
            }
            bootScreen.style.display = 'none';
        }, 700);
    }

    async function turnOffSequence() {
        isBooted = false;

        powerBtn.classList.add('fade-out');
        window.scrollTo({ top: 0, behavior: 'smooth' });

        await new Promise(r => setTimeout(r, 500));
        mainContent.classList.remove('content-visible');
        bootScreen.style.display = 'flex';

        requestAnimationFrame(() => {
            bootScreen.classList.remove('off');
        });

        bootTerminal.classList.add('active');
        bootLog.innerHTML = '';
        const matrixInterval = initBootMatrix();

        for (const msg of shutdownMessages) {
            await typeBootMessage(msg);
        }

        clearInterval(matrixInterval);
        await new Promise(r => setTimeout(r, 500));

        bootTerminal.classList.remove('active');
        bootLog.innerHTML = '';

        // After shutdown, show big centered offline power button
        powerBtn.classList.add('offline');
        powerBtn.classList.remove('fade-out');
        if (bootHint) bootHint.classList.remove('hidden');
    }

    let isBooted = false;

    // Power button click — only works when offline (after shutdown)
    powerBtn.addEventListener('click', async () => {
        if (!powerBtn.classList.contains('booting') && !powerBtn.classList.contains('fade-out')) {
            if (!isBooted) {
                // Remove offline centering before re-booting
                powerBtn.classList.remove('offline');
                if (bootHint) bootHint.classList.add('hidden');
                bootScreen.style.display = 'flex';
                bootScreen.classList.remove('off');
                mainContent.classList.remove('content-visible');
                runBootSequence();
            } else {
                turnOffSequence();
            }
        }
    });

    // AUTO-BOOT: start boot sequence immediately on page load
    runBootSequence();
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

    // 3D Robot mascot (simple geometric robot)
    const robotGroup = new THREE.Group();
    robotGroup.position.set(4, -2, -6);
    const robotMat = new THREE.MeshBasicMaterial({ color: 0x00ff41, wireframe: true, transparent: true, opacity: 0.25 });
    const bodyGeo = new THREE.BoxGeometry(0.6, 0.5, 0.3);
    const body = new THREE.Mesh(bodyGeo, robotMat);
    robotGroup.add(body);
    const headGeo = new THREE.BoxGeometry(0.4, 0.4, 0.4);
    const head = new THREE.Mesh(headGeo, robotMat);
    head.position.y = 0.5;
    robotGroup.add(head);
    const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.3), robotMat);
    antenna.position.y = 0.9;
    robotGroup.add(antenna);
    scene.add(robotGroup);

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

        robotGroup.rotation.y = time * 0.4;
        robotGroup.position.y = -2 + Math.sin(time * 0.6) * 0.4;

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
   DINO GAME – Chrome-style Runner in Green Theme
   ═══════════════════════════════════════════════════════════ */
function initDinoGame() {
    const canvas = document.getElementById('dino-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const overlay = document.getElementById('dino-overlay');
    const phone = document.getElementById('phone-frame');

    // Hi-DPI sizing
    function resizeCanvas() {
        const parent = canvas.parentElement;
        canvas.width = parent.clientWidth * 2;
        canvas.height = parent.clientHeight * 2;
        ctx.scale(2, 2);
    }
    resizeCanvas();

    const W = () => canvas.width / 2;
    const H = () => canvas.height / 2;

    // Game state
    let gameRunning = false;
    let gameOver = false;
    let score = 0;
    let highScore = 0;
    let speed = 3;
    let frameCount = 0;

    // Ground
    const GROUND_Y = () => H() - 40;

    // Dino
    const dino = {
        x: 40,
        w: 22,
        h: 26,
        y: 0,
        vy: 0,
        jumping: false,
        runFrame: 0
    };
    dino.y = 0; // set in reset

    // Obstacles
    let cacti = [];

    // Ground dashes
    let groundDashes = [];
    for (let i = 0; i < 30; i++) {
        groundDashes.push({ x: Math.random() * 400, w: 8 + Math.random() * 12 });
    }

    function reset() {
        dino.y = GROUND_Y() - dino.h;
        dino.vy = 0;
        dino.jumping = false;
        dino.runFrame = 0;
        cacti = [];
        score = 0;
        speed = 3;
        frameCount = 0;
        gameOver = false;
    }

    function jump() {
        if (!dino.jumping) {
            dino.vy = -9;
            dino.jumping = true;
        }
    }

    function spawnCactus() {
        const h = 20 + Math.random() * 18;
        const w = 8 + Math.random() * 8;
        cacti.push({ x: W(), y: GROUND_Y() - h, w, h });
    }

    function drawDino() {
        const x = dino.x;
        const y = dino.y;
        ctx.fillStyle = '#00ff41';
        ctx.shadowColor = '#00ff41';
        ctx.shadowBlur = 6;

        // Body
        ctx.fillRect(x + 4, y, 14, 18);
        // Head
        ctx.fillRect(x + 8, y - 8, 14, 10);
        // Eye
        ctx.fillStyle = '#000';
        ctx.fillRect(x + 17, y - 5, 3, 3);
        ctx.fillStyle = '#00ff41';
        // Tail
        ctx.fillRect(x, y + 4, 6, 4);
        // Arm
        ctx.fillRect(x + 16, y + 8, 4, 3);

        // Legs (animated)
        if (dino.jumping) {
            ctx.fillRect(x + 6, y + 18, 4, 8);
            ctx.fillRect(x + 12, y + 18, 4, 8);
        } else {
            if (dino.runFrame % 10 < 5) {
                ctx.fillRect(x + 6, y + 18, 4, 8);
                ctx.fillRect(x + 14, y + 18, 4, 5);
            } else {
                ctx.fillRect(x + 6, y + 18, 4, 5);
                ctx.fillRect(x + 14, y + 18, 4, 8);
            }
        }
        ctx.shadowBlur = 0;
    }

    function drawCactus(c) {
        ctx.fillStyle = '#00cc33';
        ctx.shadowColor = '#00ff41';
        ctx.shadowBlur = 4;
        // Trunk
        ctx.fillRect(c.x + c.w / 2 - 3, c.y, 6, c.h);
        // Top
        ctx.fillRect(c.x, c.y, c.w, 6);
        // Arms
        if (c.h > 25) {
            ctx.fillRect(c.x - 3, c.y + 10, 4, 8);
            ctx.fillRect(c.x + c.w - 1, c.y + 6, 4, 10);
        }
        ctx.shadowBlur = 0;
    }

    function drawGround() {
        ctx.strokeStyle = 'rgba(0, 255, 65, 0.5)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, GROUND_Y());
        ctx.lineTo(W(), GROUND_Y());
        ctx.stroke();

        ctx.fillStyle = 'rgba(0, 255, 65, 0.15)';
        groundDashes.forEach(d => {
            ctx.fillRect(d.x, GROUND_Y() + 4, d.w, 1);
        });
    }

    function drawScore() {
        ctx.fillStyle = '#00ff41';
        ctx.font = "bold 11px 'Fira Code', monospace";
        ctx.textAlign = 'right';
        ctx.fillText('HI ' + String(highScore).padStart(5, '0') + '  ' + String(score).padStart(5, '0'), W() - 10, 20);
        ctx.textAlign = 'left';
    }

    function drawGameOver() {
        ctx.fillStyle = '#00ff41';
        ctx.font = "bold 14px 'Orbitron', sans-serif";
        ctx.textAlign = 'center';
        ctx.shadowColor = '#00ff41';
        ctx.shadowBlur = 10;
        ctx.fillText('GAME OVER', W() / 2, H() / 2 - 10);
        ctx.font = "11px 'Fira Code', monospace";
        ctx.shadowBlur = 0;
        ctx.fillText('Press Space / Click to restart', W() / 2, H() / 2 + 15);
        ctx.textAlign = 'left';
    }

    function checkCollision() {
        for (const c of cacti) {
            if (
                dino.x + dino.w > c.x &&
                dino.x < c.x + c.w &&
                dino.y + dino.h > c.y
            ) {
                return true;
            }
        }
        return false;
    }

    function update() {
        frameCount++;

        // Dino physics
        if (dino.jumping) {
            dino.vy += 0.5; // gravity
            dino.y += dino.vy;
            if (dino.y >= GROUND_Y() - dino.h) {
                dino.y = GROUND_Y() - dino.h;
                dino.jumping = false;
                dino.vy = 0;
            }
        }
        dino.runFrame++;

        // Cacti
        cacti.forEach(c => { c.x -= speed; });
        cacti = cacti.filter(c => c.x + c.w > -10);

        // Spawn
        if (frameCount % Math.max(50, 90 - Math.floor(score / 5)) === 0) {
            spawnCactus();
        }

        // Ground dashes
        groundDashes.forEach(d => {
            d.x -= speed * 0.5;
            if (d.x + d.w < 0) {
                d.x = W() + Math.random() * 40;
                d.w = 8 + Math.random() * 12;
            }
        });

        // Score
        if (frameCount % 5 === 0) score++;

        // Speed up gradually
        speed = 3 + score * 0.008;

        // Collision
        if (checkCollision()) {
            gameOver = true;
            gameRunning = false;
            if (score > highScore) highScore = score;
        }
    }

    function render() {
        const w = W();
        const h = H();
        ctx.clearRect(0, 0, w, h);

        // Faint scanlines
        for (let i = 0; i < h; i += 4) {
            ctx.fillStyle = 'rgba(0, 255, 65, 0.012)';
            ctx.fillRect(0, i, w, 1);
        }

        drawGround();
        drawDino();
        cacti.forEach(c => drawCactus(c));
        drawScore();

        if (gameOver) drawGameOver();
    }

    function gameLoop() {
        if (gameRunning) {
            update();
        }
        render();
        requestAnimationFrame(gameLoop);
    }

    function startGame() {
        if (gameOver) {
            reset();
        }
        if (!gameRunning) {
            overlay.classList.add('hidden');
            gameRunning = true;
            reset();
        } else if (gameOver) {
            reset();
            gameRunning = true;
        }
    }

    function handleInput() {
        if (!gameRunning && !gameOver) {
            startGame();
        } else if (gameOver) {
            startGame();
        } else {
            jump();
        }
    }

    // Controls
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' || e.code === 'ArrowUp') {
            // Only respond if phone section is in view
            const rect = phone.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                e.preventDefault();
                handleInput();
            }
        }
    });

    canvas.addEventListener('click', handleInput);
    canvas.addEventListener('touchstart', (e) => { e.preventDefault(); handleInput(); });
    overlay.addEventListener('click', handleInput);

    // Start render loop
    reset();
    gameLoop();

    // Handle resize
    window.addEventListener('resize', () => {
        resizeCanvas();
        if (!gameRunning) reset();
    });
}

/* ═══════════════════════════════════════════════════════════
   LIVE STATS – GitHub & LeetCode
   ═══════════════════════════════════════════════════════════ */
function initLiveStats() {
    const ghRepos = document.getElementById('gh-repos-count');
    const ghFollowers = document.getElementById('gh-followers-count');
    const leetCodeSolved = document.getElementById('leetcode-solved');

    if (ghRepos || ghFollowers) {
        fetch('https://api.github.com/users/amey1942007')
            .then(r => r.json())
            .then(data => {
                if (ghRepos && data.public_repos != null) ghRepos.textContent = data.public_repos;
                if (ghFollowers && data.followers != null) ghFollowers.textContent = data.followers;
            })
            .catch(() => {
                if (ghRepos) ghRepos.textContent = '—';
                if (ghFollowers) ghFollowers.textContent = '—';
            });
    }

    if (leetCodeSolved) {
        fetch('https://alfa-leetcode-api.onrender.com/Amey19/solved')
            .then(r => r.json())
            .then(data => {
                const solved = data?.solvedTotal ?? data;
                if (typeof solved === 'number') leetCodeSolved.textContent = solved;
            })
            .catch(() => { });
    }
}

/* ═══════════════════════════════════════════════════════════
   INTERACTIVE TERMINAL
   ═══════════════════════════════════════════════════════════ */
function initInteractiveTerminal() {
    const terminal = document.getElementById('interactive-terminal');
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');
    const terminalToggle = document.getElementById('terminal-toggle');
    const terminalClose = document.getElementById('terminal-close');

    const welcome = 'Type "help" for available commands.\n';
    terminalOutput.textContent = welcome;

    const commands = {
        help: () => 'Available commands:\n  help     - Show this help\n  ls       - List sections\n  cat about.txt - About me\n  cd projects - Scroll to projects\n  contact  - Scroll to contact\n  clear    - Clear terminal',
        ls: () => 'hero  about  skills  projects  competitive  experience  contact',
        'cat about.txt': () => 'Passionate ML Engineer & Robotics enthusiast at IIT Delhi. Building intelligent systems — from neural networks to autonomous SLAM robots.',
        'cd projects': () => { scrollToSection('projects'); return 'Navigated to projects.'; },
        contact: () => { scrollToSection('contact'); return 'Navigated to contact.'; },
        clear: () => { terminalOutput.innerHTML = ''; return null; },
    };

    function scrollToSection(id) {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    }

    function runCommand(cmd) {
        const trimmed = cmd.trim().toLowerCase();
        if (!trimmed) return null;
        for (const [key, fn] of Object.entries(commands)) {
            if (trimmed === key || trimmed.startsWith(key + ' ')) {
                const result = fn();
                return result;
            }
        }
        return `Command not found: ${trimmed}. Type "help" for commands.`;
    }

    function appendLine(text, isCmd = false) {
        const div = document.createElement('div');
        div.textContent = (isCmd ? '$ ' : '') + text;
        if (isCmd) div.style.color = 'var(--green-primary)';
        terminalOutput.appendChild(div);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    if (terminalToggle) {
        terminalToggle.addEventListener('click', () => {
            terminal.classList.toggle('open');
            if (terminal.classList.contains('open')) terminalInput.focus();
        });
    }
    if (terminalClose) {
        terminalClose.addEventListener('click', () => terminal.classList.remove('open'));
    }

    if (terminalInput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key !== 'Enter') return;
            const cmd = terminalInput.value;
            terminalInput.value = '';
            appendLine(cmd, true);
            const result = runCommand(cmd);
            if (result) appendLine(result);
        });
    }
}

/* ═══════════════════════════════════════════════════════════
   THEME SWITCHER
   ═══════════════════════════════════════════════════════════ */
function initThemeSwitcher() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    const themes = ['matrix', 'cyberpunk', 'hacker'];
    let idx = parseInt(localStorage.getItem('portfolio-theme') || '0', 10);
    applyTheme(themes[idx]);

    btn.addEventListener('click', () => {
        idx = (idx + 1) % themes.length;
        localStorage.setItem('portfolio-theme', String(idx));
        applyTheme(themes[idx]);
    });
}

function applyTheme(name) {
    document.body.classList.remove('theme-cyberpunk', 'theme-hacker');
    if (name === 'cyberpunk') document.body.classList.add('theme-cyberpunk');
    if (name === 'hacker') document.body.classList.add('theme-hacker');
}

/* ═══════════════════════════════════════════════════════════
   EASTER EGGS – Konami Code & Boss Mode
   ═══════════════════════════════════════════════════════════ */
function initEasterEggs() {
    const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    let konamiIdx = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konami[konamiIdx]) {
            konamiIdx++;
            if (konamiIdx === konami.length) {
                konamiIdx = 0;
                document.body.classList.add('konami-glitch');
                setTimeout(() => document.body.classList.remove('konami-glitch'), 2500);
            }
        } else konamiIdx = 0;
    });

    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.code === 'KeyB') {
            e.preventDefault();
            document.body.classList.toggle('theme-cyberpunk');
        }
    });
}

/* ═══════════════════════════════════════════════════════════
   KEYBOARD SHORTCUTS
   ═══════════════════════════════════════════════════════════ */
function initKeyboardShortcuts() {
    const modal = document.getElementById('shortcuts-modal');
    const scroll = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };
    const terminal = document.getElementById('interactive-terminal');
    const termToggle = document.getElementById('terminal-toggle');

    document.addEventListener('keydown', (e) => {
        if (e.target.matches('input, textarea')) return;
        if (e.key === 'Escape') {
            modal?.classList.remove('visible');
            terminal?.classList.remove('open');
            return;
        }
        if (e.key === '?') { e.preventDefault(); modal?.classList.toggle('visible'); return; }
        const key = e.key.toUpperCase();
        if (key === 'H') scroll('hero');
        if (key === 'P') scroll('projects');
        if (key === 'C') scroll('contact');
        if (key === 'T' && termToggle) { termToggle.click(); }
    });
}

/* ═══════════════════════════════════════════════════════════
   SOUND TOGGLE & BOOT SOUND
   ═══════════════════════════════════════════════════════════ */
function initSoundToggle() {
    const btn = document.getElementById('sound-toggle');
    const muted = localStorage.getItem('portfolio-sound') === 'muted';
    if (btn) {
        if (muted) { btn.classList.add('muted'); btn.innerHTML = '<i class="fas fa-volume-mute"></i>'; }
        btn.addEventListener('click', () => {
            const m = btn.classList.toggle('muted');
            btn.innerHTML = m ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
            localStorage.setItem('portfolio-sound', m ? 'muted' : 'on');
        });
    }
    window._portfolioSoundMuted = muted;
}

function playBootSound() {
    if (window._portfolioSoundMuted || localStorage.getItem('portfolio-sound') === 'muted') return;
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = 880;
        osc.type = 'sine';
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.15);
    } catch (_) { }
}
document.addEventListener('DOMContentLoaded', () => {
    const phoneTime = document.getElementById('phone-time');
    const appsContainer = document.querySelector('.phone-apps-container');
    const dinoGameOverlay = document.getElementById('dino-overlay');

    // Update phone time
    setInterval(() => {
        if (!phoneTime) return;
        const now = new Date();
        phoneTime.innerText = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
    }, 1000);

    // App Navigation Logic
    const appIcons = document.querySelectorAll('.app-icon');
    const appViews = document.querySelectorAll('.phone-app-view');
    const homeIndicator = document.getElementById('phone-home-indicator');
    const hwHomeBtn = document.getElementById('dino-phone-home-btn');
    const homeView = document.getElementById('phone-app-home');

    function goHome() {
        // Show apps container in case we were in the dino game
        if (appsContainer) appsContainer.classList.remove('hidden');

        // Hide all app views and show home
        appViews.forEach(view => view.classList.remove('active'));
        if (homeView) {
            homeView.classList.add('active');
            homeView.classList.remove('active-hidden');
        }
    }

    // Click icon -> Open App
    appIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const targetId = icon.getAttribute('data-target');

            // Special case: launching Dino Game hides the HTML apps layer entirely
            if (targetId === 'dino-game') {
                if (appsContainer) appsContainer.classList.add('hidden');
                // The game handles starting on click, but if the overlay is hidden, game is running
                if (dinoGameOverlay && !dinoGameOverlay.classList.contains('hidden')) {
                    // trigger a click on the canvas to start it
                    document.getElementById('dino-canvas').click();
                }
                return;
            }

            const targetApp = document.getElementById(targetId);
            if (targetApp) {
                // hide home view behind
                if (homeView) homeView.classList.add('active-hidden');
                // show selected app
                targetApp.classList.add('active');
            }
        });
    });

    // Hardware button & indicator return to home
    if (hwHomeBtn) hwHomeBtn.addEventListener('click', goHome);
    if (homeIndicator) homeIndicator.addEventListener('click', goHome);

    // Bottom Navs inside apps (visual only, returns to home on 'home' icon click)
    const bottomNavHomes = document.querySelectorAll('.li-bottom-nav .fa-home, .gh-bottom-nav .fa-home');
    bottomNavHomes.forEach(btn => {
        btn.addEventListener('click', goHome);
    });

}); // End of Phone App UI LogicalDOMContentLoaded
