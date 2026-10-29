// ===================================
// THIRD-PARTY SDK INITIALIZATION (CSP-SAFE, NO INLINE SCRIPTS)
// ===================================

if (typeof emailjs !== 'undefined' && typeof emailjs.init === 'function') {
    emailjs.init({ publicKey: 'y7EhNSxSYeCNTfytb' });
}

// Google Analytics (Safeguarded with strict Measurement ID validation)
const GA_MEASUREMENT_ID = 'YOUR-GA-ID'; // Set your real Google Analytics ID here (e.g. 'G-XXXXXXXXXX')
if (/^G-[A-Z0-9]{6,15}$/.test(GA_MEASUREMENT_ID)) {
    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;
    document.head.appendChild(gaScript);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);
}

// ===================================
// GLOBAL VARIABLES
// ===================================

const projectsData = [
    {
        title: "Hotel Booking and Reservation System",
        description: "Hotel Booking and Reservation System is a MERN stack project that allows users to book hotels, make payments via Razorpay, and get assistance through an AI chatbot, while adminsmanage rooms and reservations efficiently.",
        image: "images/login_page.png",
        features: [
            "User login and profile management",
            "Hotel search with filters",
            "Room booking and reservation",
            "Secure payment integration",
            "Admin dashboard for hotel management"
        ],
        technologies: ["React", "Node.js", "MongoDB", "Razorpay", "AI Chatbot"],
        liveLink: "https://example.com",
        githubLink: "https://github.com"
    },
    {
        title: "AI-Powered Chatbot",
        description: "An intelligent chatbot application leveraging natural language processing to provide automated customer support. Built with Python and TensorFlow for machine learning capabilities.",
        image: "images/chat-bot.png",
        features: [
            "Natural language understanding",
            "Context-aware conversations",
            "Multi-language support",
            "Intent classification",
            "Sentiment analysis"
        ],
        technologies: ["Python", "TensorFlow", "Flask", "NLP", "NLTK"],
        liveLink: "https://example.com",
        githubLink: "https://github.com"
    },
    {
        title: "Task Management System",
        description: "A collaborative project management tool designed for teams. Real-time synchronization ensures all team members stay updated with task progress and changes.",
        image: "images/portfolio3.jpg",
        features: [
            "Real-time task updates",
            "Team collaboration tools",
            "Kanban board interface",
            "Task assignment and tracking",
            "File attachments and comments",
            "Progress analytics and reporting"
        ],
        technologies: ["Vue.js", "Firebase", "Socket.io", "Vuex"],
        liveLink: "https://example.com",
        githubLink: "https://github.com"
    }
];

// ===================================
// PRELOADER
// ===================================

window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1000);
});

// ===================================
// DARK MODE TOGGLE
// ===================================

const darkModeToggle = document.querySelector('.dark-mode-toggle');
const darkModeIcon = darkModeToggle.querySelector('i');

// Check for saved dark mode preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    darkModeIcon.classList.replace('fa-moon', 'fa-sun');
}

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        darkModeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        darkModeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// ===================================
// MOBILE NAVIGATION
// ===================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

const updateMenuAria = (isOpen) => {
    hamburger.setAttribute('aria-expanded', isOpen);
};

hamburger.addEventListener('click', () => {
    const isActive = hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    updateMenuAria(isActive);
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        updateMenuAria(false);
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        updateMenuAria(false);
    }
});

// ===================================
// ACTIVE NAVIGATION LINK
// ===================================

const sections = document.querySelectorAll('section');

// ===================================
// OPTIMIZED SCROLL HANDLER (Throttled)
// ===================================

const progressBar = document.querySelector('.scroll-progress-bar');
const backToTop = document.querySelector('.back-to-top');

const handleScrollUpdates = () => {
    // 1. Update Reading Progress Bar
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (progressBar) progressBar.style.width = scrolled + "%";

    // 2. Update Active Navigation Link
    let current = '';
    const navbarEl = document.querySelector('.navbar');
    const navOffset = navbarEl ? navbarEl.offsetHeight : 70;
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
        if (window.pageYOffset >= sectionTop - navOffset - 40) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });

    // 3. Back to Top Button Visibility
    if (backToTop) {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
};

// Throttle function to improve performance
const throttle = (callback, delay) => {
    let lastCall = 0;
    return (...args) => {
        const now = new Date().getTime();
        if (now - lastCall < delay) return;
        lastCall = now;
        return callback(...args);
    };
};

window.addEventListener('scroll', throttle(handleScrollUpdates, 50));

// ===================================
// TYPING ANIMATION
// ===================================

const typingText = document.querySelector('.typing-text');
const textArray = [
    'Web Developer',
    'AI Enthusiast',
    'Problem Solver',
    'Creative Thinker'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentText = textArray[textIndex];

    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

// Start typing animation
setTimeout(type, 1000);

// ===================================
// SCROLL ANIMATIONS
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ===================================
// COUNTER ANIMATION
// ===================================

const counters = document.querySelectorAll('.counter');
let counterStarted = false;

function animateCounters() {
    if (!counters || counters.length === 0) return;
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });
}

// Trigger counter animation when about section is visible
const aboutSection = document.querySelector('#about');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !counterStarted) {
            animateCounters();
            counterStarted = true;
        }
    });
}, { threshold: 0.5 });

if (aboutSection) {
    counterObserver.observe(aboutSection);
}


// ===================================
// PROJECT MODAL
// ===================================

const modal = document.getElementById('projectModal');
const closeModal = document.querySelector('.close-modal');
const viewButtons = document.querySelectorAll('.btn-view');

function sanitizeHttpUrl(rawUrl) {
    if (typeof rawUrl !== 'string' || !rawUrl.trim()) return '#';
    try {
        const parsed = new URL(rawUrl, window.location.origin);
        if (parsed.protocol === 'https:' || parsed.protocol === 'http:') {
            return parsed.href;
        }
    } catch {
        // Reject malformed URIs
    }
    return '#';
}

viewButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const projectIndex = Number.parseInt(button.getAttribute('data-project') || '', 10);
        openProjectModal(projectIndex);
    });
});

function openProjectModal(index) {
    if (!modal || !Number.isInteger(index) || index < 0 || index >= projectsData.length) {
        return;
    }
    const project = projectsData[index];

    const modalImg = modal.querySelector('.modal-image');
    const modalTitle = modal.querySelector('.modal-title');
    const modalDesc = modal.querySelector('.modal-description');
    if (modalImg) modalImg.src = sanitizeHttpUrl(project.image);
    if (modalTitle) modalTitle.textContent = project.title;
    if (modalDesc) modalDesc.textContent = project.description;

    // Populate features list safely without innerHTML
    const featuresList = modal.querySelector('.features-list');
    if (featuresList) {
        featuresList.replaceChildren();
        project.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            featuresList.appendChild(li);
        });
    }

    // Populate technologies safely without innerHTML
    const modalTech = modal.querySelector('.modal-tech');
    if (modalTech) {
        modalTech.replaceChildren();
        project.technologies.forEach(tech => {
            const span = document.createElement('span');
            span.className = 'tech-tag';
            span.textContent = tech;
            modalTech.appendChild(span);
        });
    }

    // Update links with strict HTTP/HTTPS protocol allowlisting
    const liveBtn = modal.querySelector('.modal-links .btn-primary');
    const repoBtn = modal.querySelector('.modal-links .btn-secondary');
    if (liveBtn) liveBtn.href = sanitizeHttpUrl(project.liveLink);
    if (repoBtn) repoBtn.href = sanitizeHttpUrl(project.githubLink);

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

const closeProjectModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
};

if (closeModal) {
    closeModal.addEventListener('click', closeProjectModal);
}

if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeProjectModal();
    });
}

// ===================================
// RESUME MODAL
// ===================================

const resumeModal = document.getElementById('resumeModal');
const openResumeBtn = document.getElementById('openResume');
const closeResumeBtn = document.querySelector('.close-modal-resume');

if (openResumeBtn) {
    openResumeBtn.addEventListener('click', () => {
        resumeModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

const closeResumeModal = () => {
    resumeModal.classList.remove('active');
    document.body.style.overflow = 'auto';
};

if (closeResumeBtn) {
    closeResumeBtn.addEventListener('click', closeResumeModal);
}

if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
        if (e.target === resumeModal) closeResumeModal();
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (modal.classList.contains('active')) closeProjectModal();
        if (resumeModal && resumeModal.classList.contains('active')) closeResumeModal();
    }
});

// ===================================
// EMAIL INTEGRATION (EmailJS)
// ===================================
// ================= CONTACT FORM EMAILJS (HARDENED) =================

const contactForm = document.getElementById("contactForm");
const formMessage = document.querySelector(".form-message");

const sanitizeSingleLineInput = (value, maxLength) =>
    String(value || "")
        .replace(/[\r\n\x00-\x1F\x7F]+/g, " ")
        .trim()
        .slice(0, maxLength);

const sanitizeMultiLineInput = (value, maxLength) =>
    String(value || "")
        .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]+/g, "")
        .trim()
        .slice(0, maxLength);

if (contactForm && formMessage) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // ===== Anti-Bot Honeypot Check =====
        if (contactForm.website_hp && contactForm.website_hp.value.trim() !== "") {
            contactForm.reset();
            return;
        }

        // ===== Rate-Limiting / Submission Cooldown (60 seconds) =====
        const SUBMISSION_COOLDOWN_MS = 60000;
        const lastSentTime = localStorage.getItem("last_contact_submitted_at");
        const parsedLastSent = Number.parseInt(lastSentTime || "", 10);
        const currentTime = Date.now();
        if (
            Number.isFinite(parsedLastSent) &&
            currentTime >= parsedLastSent &&
            currentTime - parsedLastSent < SUBMISSION_COOLDOWN_MS
        ) {
            const remainingSec = Math.ceil((SUBMISSION_COOLDOWN_MS - (currentTime - parsedLastSent)) / 1000);
            formMessage.textContent = `⏳ Please wait ${remainingSec}s before sending another message.`;
            formMessage.className = "form-message error";
            formMessage.style.display = "block";
            setTimeout(() => { formMessage.style.display = "none"; }, 4000);
            return;
        }

        // ===== Input Sanitization (Strip CR/LF & Control Characters) =====
        const nameVal = sanitizeSingleLineInput(contactForm.name.value, 100);
        const emailVal = sanitizeSingleLineInput(contactForm.email.value, 100);
        const subjectVal = sanitizeSingleLineInput(contactForm.subject.value, 150);
        const messageVal = sanitizeMultiLineInput(contactForm.message.value, 2000);

        const emailRegex = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+$/;
        if (!nameVal || !emailVal || !subjectVal || !messageVal) {
            formMessage.textContent = "⚠️ Please fill in all required fields.";
            formMessage.className = "form-message error";
            formMessage.style.display = "block";
            setTimeout(() => { formMessage.style.display = "none"; }, 4000);
            return;
        }

        if (!emailRegex.test(emailVal)) {
            formMessage.textContent = "⚠️ Please enter a valid email address.";
            formMessage.className = "form-message error";
            formMessage.style.display = "block";
            setTimeout(() => { formMessage.style.display = "none"; }, 4000);
            return;
        }

        // ===== Fail-Closed reCAPTCHA Verification & Token Extraction =====
        let recaptchaToken = "";
        const recaptchaWidget = contactForm.querySelector(".g-recaptcha");
        if (recaptchaWidget) {
            if (typeof grecaptcha === "undefined" || typeof grecaptcha.getResponse !== "function") {
                formMessage.textContent = "⚠️ Security verification failed to load. Please disable any script blockers and refresh.";
                formMessage.className = "form-message error";
                formMessage.style.display = "block";
                setTimeout(() => { formMessage.style.display = "none"; }, 5000);
                return;
            }

            recaptchaToken = grecaptcha.getResponse();
            if (!recaptchaToken) {
                formMessage.textContent = "⚠️ Please complete the reCAPTCHA verification.";
                formMessage.className = "form-message error";
                formMessage.style.display = "block";
                setTimeout(() => { formMessage.style.display = "none"; }, 4000);
                return;
            }
        }

        if (typeof emailjs === "undefined" || typeof emailjs.send !== "function") {
            formMessage.textContent = "⚠️ Messaging service is temporarily unavailable. Please reach out directly via email.";
            formMessage.className = "form-message error";
            formMessage.style.display = "block";
            setTimeout(() => { formMessage.style.display = "none"; }, 5000);
            return;
        }

        const submitBtn = contactForm.querySelector("button");
        const btnText = submitBtn.querySelector("span");
        const btnIcon = submitBtn.querySelector("i");

        // Button loading state
        btnText.textContent = "Sending...";
        btnIcon.classList.remove("fa-paper-plane");
        btnIcon.classList.add("fa-spinner", "fa-spin");
        submitBtn.disabled = true;

        // Clear old messages
        formMessage.style.display = "none";
        formMessage.className = "form-message";

        const templateParams = {
            from_name: nameVal,
            from_email: emailVal,
            subject: subjectVal,
            message: messageVal,
            "g-recaptcha-response": recaptchaToken // Forward token for EmailJS server-side verification
        };

        emailjs
            .send(
                "service_8mguzri",   // YOUR SERVICE ID
                "template_73gpdz4",  // YOUR TEMPLATE ID
                templateParams
            )
            .then(() => {
                formMessage.textContent =
                    "✅ Message sent successfully! I'll get back to you soon.";
                formMessage.classList.add("success");
                formMessage.style.display = "block";

                // Save successful submission timestamp for cooldown
                localStorage.setItem("last_contact_submitted_at", Date.now().toString());

                contactForm.reset();
                if (typeof grecaptcha !== "undefined" && typeof grecaptcha.reset === "function") {
                    grecaptcha.reset();
                }
            })
            .catch(() => {
                // Avoid reflecting raw upstream diagnostic/account error messages to end users (CWE-209)
                formMessage.textContent = "❌ Unable to send your message right now. Please try again later or reach out directly via email.";
                formMessage.classList.add("error");
                formMessage.style.display = "block";

                if (typeof grecaptcha !== "undefined" && typeof grecaptcha.reset === "function") {
                    grecaptcha.reset();
                }
            })
            .finally(() => {
                // Restore button
                btnText.textContent = "Send Message";
                btnIcon.classList.remove("fa-spinner", "fa-spin");
                btnIcon.classList.add("fa-paper-plane");
                submitBtn.disabled = false;

                // Auto-hide message
                setTimeout(() => {
                    formMessage.style.display = "none";
                }, 5000);
            });
    });
}

// ===================================
// BACK TO TOP BUTTON
// ===================================

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===================================
// SMOOTH SCROLL FOR ALL LINKS
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || !/^#[A-Za-z][\w:-]*$/.test(href)) {
            return;
        }

        const target = document.getElementById(href.slice(1));
        if (target) {
            e.preventDefault();
            const navbar = document.querySelector('.navbar');
            const navHeight = navbar ? navbar.offsetHeight : 70;

            let targetTop = 0;
            if (href !== '#home') {
                const targetRect = target.getBoundingClientRect();
                targetTop = window.pageYOffset + targetRect.top - navHeight;
            }

            window.scrollTo({
                top: Math.max(0, Math.round(targetTop)),
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');
            if (hamburger && navMenu && hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        }
    });
});

// ===================================
// LAZY LOADING IMAGES
// ===================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// PARALLAX EFFECT (Optional Enhancement)
// ===================================
// Disabled vertical shift on .hero-image to keep the Hero poster evenly aligned with Hero content

// ===================================
// CURSOR EFFECT (Optional Enhancement)
// ===================================

const createCursorFollower = () => {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-follower';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: var(--primary-color);
        pointer-events: none;
        opacity: 0.5;
        transition: transform 0.15s ease;
        z-index: 9999;
        display: none;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.display = 'block';
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });

    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'scale(0.8)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'scale(1)';
    });
};

// Uncomment to enable cursor follower
// if (window.innerWidth > 768) createCursorFollower();

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Debounce function for scroll events
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
// ===================================
// PARTICLES BACKGROUND
// ===================================

if (document.getElementById('particles-js')) {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 38,
                density: {
                    enable: true,
                    value_area: 900
                }
            },
            color: {
                value: ['#101011', '#1E73AE', '#D02220', '#F3B82F']
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.4,
                random: false
            },
            size: {
                value: 2.5,
                random: false
            },
            line_linked: {
                enable: true,
                distance: 145,
                color: '#101011',
                opacity: 0.16,
                width: 1
            },
            move: {
                enable: true,
                speed: 0.6,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'repulse'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            }
        },
        retina_detect: true
    });
}


// ===================================
// 3D CAROUSEL ENGINE (PROJECTS & CERTIFICATES)
// ===================================

function init3DCarousel(carouselId, autoPlayInterval = 6000) {
    const container = document.getElementById(carouselId);
    if (!container) return;

    const cards = Array.from(container.querySelectorAll('.carousel-3d-card'));
    const prevBtn = container.querySelector('.carousel-prev');
    const nextBtn = container.querySelector('.carousel-next');
    const indicatorsContainer = container.querySelector('.carousel-indicators');

    if (!cards.length) return;

    let currentIndex = 0;
    let autoPlayTimer = null;
    let isHovered = false;

    // Build pagination dots
    if (indicatorsContainer) {
        indicatorsContainer.replaceChildren();
        cards.forEach((_, idx) => {
            const dot = document.createElement('button');
            dot.className = `carousel-dot ${idx === 0 ? 'is-active' : ''}`;
            dot.setAttribute('aria-label', `Go to slide ${idx + 1}`);
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                goToSlide(idx);
            });
            indicatorsContainer.appendChild(dot);
        });
    }

    const dots = indicatorsContainer ? Array.from(indicatorsContainer.querySelectorAll('.carousel-dot')) : [];

    function updateCarousel() {
        const total = cards.length;
        const isMobile = window.innerWidth <= 768;

        cards.forEach((card, i) => {
            let diff = i - currentIndex;

            // Cyclic distance around circle
            if (diff > total / 2) diff -= total;
            if (diff < -total / 2) diff += total;

            const absDiff = Math.abs(diff);

            if (diff === 0) {
                // Active Card (Front and Center)
                card.classList.add('is-active');
                card.style.transform = 'translateX(0) translateZ(0) rotateY(0deg) scale(1)';
                card.style.opacity = '1';
                card.style.zIndex = '10';
                card.style.filter = 'none';
                card.style.pointerEvents = 'auto';
            } else if (absDiff === 1) {
                // Immediate Neighbors (Flanking in 3D perspective)
                card.classList.remove('is-active');
                const xOffset = diff * (isMobile ? 42 : 58);
                const rotY = diff > 0 ? -26 : 26;
                const scale = isMobile ? 0.88 : 0.85;
                const zDist = isMobile ? -100 : -160;

                card.style.transform = `translateX(${xOffset}%) translateZ(${zDist}px) rotateY(${rotY}deg) scale(${scale})`;
                card.style.opacity = '0.7';
                card.style.zIndex = '5';
                card.style.filter = 'brightness(0.92)';
                card.style.pointerEvents = 'auto';
            } else if (absDiff === 2 && total > 3) {
                // Outer Flanks for 5+ cards (Certificates)
                card.classList.remove('is-active');
                const xOffset = diff > 0 ? (isMobile ? 75 : 98) : (isMobile ? -75 : -98);
                const rotY = diff > 0 ? -38 : 38;
                const scale = isMobile ? 0.72 : 0.70;
                const zDist = isMobile ? -200 : -300;

                card.style.transform = `translateX(${xOffset}%) translateZ(${zDist}px) rotateY(${rotY}deg) scale(${scale})`;
                card.style.opacity = '0.35';
                card.style.zIndex = '2';
                card.style.filter = 'brightness(0.85)';
                card.style.pointerEvents = 'auto';
            } else {
                // Hidden beyond visible arc
                card.classList.remove('is-active');
                const sign = diff > 0 ? 1 : -1;
                card.style.transform = `translateX(${sign * 120}%) translateZ(-400px) rotateY(${sign * -45}deg) scale(0.6)`;
                card.style.opacity = '0';
                card.style.zIndex = '0';
                card.style.pointerEvents = 'none';
            }
        });

        // Update dot indicators
        dots.forEach((dot, idx) => {
            dot.classList.toggle('is-active', idx === currentIndex);
        });
    }

    function goToSlide(index) {
        const total = cards.length;
        currentIndex = (index + total) % total;
        updateCarousel();
        resetAutoPlay();
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prevSlide(); });
    if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); nextSlide(); });

    // Allow clicking side cards to bring them to front
    cards.forEach((card, idx) => {
        card.addEventListener('click', (e) => {
            // If already center card, let internal buttons/links fire
            if (idx === currentIndex) return;

            e.preventDefault();
            goToSlide(idx);
        });
    });

    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    container.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    container.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const threshold = 45;
        if (touchStartX - touchEndX > threshold) {
            nextSlide();
        } else if (touchEndX - touchStartX > threshold) {
            prevSlide();
        }
    }, { passive: true });

    // Autoplay logic
    function startAutoPlay() {
        if (!autoPlayInterval) return;
        clearInterval(autoPlayTimer);
        autoPlayTimer = setInterval(() => {
            if (!isHovered) nextSlide();
        }, autoPlayInterval);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayTimer);
        startAutoPlay();
    }

    container.addEventListener('mouseenter', () => { isHovered = true; });
    container.addEventListener('mouseleave', () => { isHovered = false; });

    // Keyboard navigation
    container.setAttribute('tabindex', '0');
    container.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') { prevSlide(); }
        else if (e.key === 'ArrowRight') { nextSlide(); }
    });

    window.addEventListener('resize', throttle(updateCarousel, 100));

    // Initial setup
    updateCarousel();
    startAutoPlay();
}

// Initialize both 3D Carousels
init3DCarousel('projectsCarousel', 6000);
init3DCarousel('certificatesCarousel', 5500);

// ===================================
// ANTI-SCRAPING CONTACT HYDRATION
// ===================================
function hydrateObfuscatedContacts() {
    const emailUserPattern = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]{1,64}$/;
    const emailDomainPattern = /^[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+$/;
    const digitsOnlyPattern = /^\d{1,15}$/;

    // Contact section text (built via safe DOM APIs without innerHTML)
    document.querySelectorAll(".obfuscated-email").forEach(el => {
        const user = el.getAttribute("data-user");
        const domain = el.getAttribute("data-domain");
        if (user && domain && emailUserPattern.test(user) && emailDomainPattern.test(domain)) {
            const email = `${user}@${domain}`;
            const link = document.createElement("a");
            link.href = `mailto:${email}`;
            link.textContent = email;
            el.replaceChildren(link);
        }
    });

    document.querySelectorAll(".obfuscated-phone").forEach(el => {
        const country = el.getAttribute("data-country");
        const num = el.getAttribute("data-num");
        if (country && num && digitsOnlyPattern.test(country) && digitsOnlyPattern.test(num)) {
            const phone = `+${country} ${num}`;
            const link = document.createElement("a");
            link.href = `tel:+${country}${num}`;
            link.textContent = phone;
            el.replaceChildren(link);
        }
    });

    // Quick contact floating buttons
    document.querySelectorAll(".obfuscated-email-btn").forEach(btn => {
        const user = btn.getAttribute("data-user");
        const domain = btn.getAttribute("data-domain");
        if (user && domain && emailUserPattern.test(user) && emailDomainPattern.test(domain)) {
            btn.href = `mailto:${user}@${domain}`;
        }
    });

    document.querySelectorAll(".obfuscated-wa-btn").forEach(btn => {
        const phone = btn.getAttribute("data-phone");
        if (phone && /^\d{6,15}$/.test(phone)) {
            btn.href = `https://wa.me/${phone}`;
        }
    });

    document.querySelectorAll(".obfuscated-tel-btn").forEach(btn => {
        const country = btn.getAttribute("data-country");
        const num = btn.getAttribute("data-num");
        if (country && num && digitsOnlyPattern.test(country) && digitsOnlyPattern.test(num)) {
            btn.href = `tel:+${country}${num}`;
        }
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", hydrateObfuscatedContacts);
} else {
    hydrateObfuscatedContacts();
}

// ===================================
// CONSOLE MESSAGE
// ===================================

console.log('%c👋 Hey there! Welcome to my portfolio!',
    'color: #1E73AE; font-size: 20px; font-weight: bold;');
console.log('%cLooking for talented developers? Let\'s connect!',
    'color: #D02220; font-size: 14px;');
