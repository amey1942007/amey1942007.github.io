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
    // Greeting: fade + slide from left (typewriter feel)
    const greeting = document.querySelector('.hero-greeting');
    // Hero name: split AMEY and CHAUDHARI spans already set in HTML via JS split
    const heroNameEl = document.querySelector('.hero-name');
    const tagline = document.querySelector('.hero-tagline');
    const badges = document.querySelector('.hero-badges');
    const cta = document.querySelector('.hero-cta');
    const right = document.querySelector('.hero-right');
    const social = document.querySelector('.hero-social-strip');
    const scroll = document.querySelector('.scroll-indicator');

    // Assign specific animation classes
    if (greeting) {
        setTimeout(() => greeting.classList.add('anim-in', 'anim-from-left'), 100);
    }

    // Split hero name: wrap AMEY and CHAUDHARI in separate spans for separate animations
    if (heroNameEl) {
        // Replace text content with two animated spans
        heroNameEl.innerHTML = `<span class="name-amey">AMEY</span> <span class="name-chaudhari">CHAUDHARI</span>`;
        // Set data-text for glitch pseudo-elements
        heroNameEl.setAttribute('data-text', 'AMEY CHAUDHARI');
        setTimeout(() => {
            heroNameEl.querySelector('.name-amey').classList.add('anim-drop-down');
        }, 300);
        setTimeout(() => {
            heroNameEl.querySelector('.name-chaudhari').classList.add('anim-rise-up');
        }, 450);
        setTimeout(() => {
            heroNameEl.classList.add('anim-in');
        }, 300);
    }

    if (tagline) {
        setTimeout(() => tagline.classList.add('anim-in', 'anim-scale-in'), 700);
    }

    if (badges) {
        // Badges: stagger each badge with a flip-in
        badges.classList.add('anim-in');
        setTimeout(() => {
            const badgeItems = badges.querySelectorAll('.badge');
            badgeItems.forEach((b, i) => {
                setTimeout(() => b.classList.add('anim-badge-pop'), i * 120);
            });
        }, 900);
    }

    if (cta) {
        setTimeout(() => cta.classList.add('anim-in', 'anim-blur-in'), 1200);
    }

    if (right) {
        setTimeout(() => right.classList.add('anim-in', 'anim-from-right'), 600);
    }

    if (social) {
        setTimeout(() => social.classList.add('anim-in', 'anim-from-right'), 900);
    }

    if (scroll) {
        setTimeout(() => scroll.classList.add('anim-in'), 1600);
    }
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
