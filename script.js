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
    if (!preloader) return;
    setTimeout(() => {
        preloader.classList.add('fade-out');
        document.body.classList.add('site-loaded');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 650);
    }, 550);
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
    darkModeToggle.classList.remove('is-toggled');
    void darkModeToggle.offsetWidth;
    darkModeToggle.classList.add('is-toggled');

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
const navActiveIndicator = document.getElementById('navActiveIndicator');
const navMenuWrap = document.querySelector('.nav-menu-wrap');

function syncNavIndicator(activeLink) {
    if (!navActiveIndicator || !navMenuWrap) return;
    if (!activeLink || window.innerWidth <= 968) {
        navActiveIndicator.style.opacity = '0';
        return;
    }
    const linkRect = activeLink.getBoundingClientRect();
    const wrapRect = navMenuWrap.getBoundingClientRect();
    navActiveIndicator.style.transition = 'transform 0.42s cubic-bezier(0.22, 1, 0.36, 1), width 0.36s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.2s ease';
    navActiveIndicator.style.transform = `translate3d(${(linkRect.left - wrapRect.left).toFixed(1)}px, 0, 0)`;
    navActiveIndicator.style.width = `${linkRect.width.toFixed(1)}px`;
    navActiveIndicator.style.opacity = '1';
}

const handleScrollUpdates = () => {
    // 1. Update Reading Progress Bar
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    if (progressBar) progressBar.style.width = scrolled + "%";

    // 2. Update Active Navigation Link & Gliding Indicator
    let current = '';
    const navbarEl = document.querySelector('.navbar');
    const navOffset = navbarEl ? navbarEl.offsetHeight : 70;
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
        if (window.pageYOffset >= sectionTop - navOffset - 60) {
            current = section.getAttribute('id');
        }
    });

    let activeNavLink = null;
    navLinks.forEach(link => {
        const matches = link.getAttribute('href').slice(1) === current;
        link.classList.toggle('active', matches);
        if (matches) activeNavLink = link;
    });
    syncNavIndicator(activeNavLink);

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

window.addEventListener('scroll', throttle(handleScrollUpdates, 30), { passive: true });
window.addEventListener('resize', throttle(handleScrollUpdates, 100));

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
// DYNAMIC HORIZONTAL & VERTICAL SCROLL REVEALS
// ===================================

const prefersReducedMotionGlobal = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealTargets = document.querySelectorAll('.fade-in, [data-reveal]');

if (prefersReducedMotionGlobal) {
    revealTargets.forEach(el => el.classList.add('visible'));
} else {
    const observerOptions = {
        threshold: 0.12,
        rootMargin: '0px 0px -36px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        let batchIndex = 0;
        entries.forEach(entry => {
            const el = entry.target;
            if (entry.isIntersecting) {
                el.style.setProperty('--reveal-delay', `${Math.min(batchIndex * 70, 280)}ms`);
                el.classList.add('visible');
                batchIndex++;
            } else {
                el.style.setProperty('--reveal-delay', '0ms');
                el.classList.remove('visible');
            }
        });
    }, observerOptions);

    revealTargets.forEach(el => observer.observe(el));
}

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
        const parsed = new URL(rawUrl, window.location.href);
        const isHttp = parsed.protocol === 'https:' || parsed.protocol === 'http:';
        const isLocalFile = parsed.protocol === 'file:' && window.location.protocol === 'file:';
        if (isHttp || isLocalFile) {
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
// RESUME MODAL (DESKTOP PDF IFRAME + MOBILE HIGH-DPI PAGE VIEWER)
// ===================================

const resumeModal = document.getElementById('resumeModal');
const openResumeBtn = document.getElementById('openResume');
const closeResumeBtn = document.querySelector('.close-modal-resume');
const resumeViewerContainer = document.getElementById('resumeViewerContainer');

function shouldUseMobileResumeViewer() {
    const ua = navigator.userAgent || '';
    const isMobileOS =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua) ||
        (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1);
    const isNarrowViewport = window.matchMedia('(max-width: 968px)').matches;
    const lacksInlinePdfSupport =
        typeof navigator.pdfViewerEnabled === 'boolean' && !navigator.pdfViewerEnabled;

    return isMobileOS || isNarrowViewport || lacksInlinePdfSupport;
}

function syncResumeViewerMode() {
    if (!resumeViewerContainer) return;

    const useMobilePages = shouldUseMobileResumeViewer();
    resumeViewerContainer.classList.toggle('is-mobile-viewer', useMobilePages);

    if (useMobilePages) {
        resumeViewerContainer.querySelectorAll('.resume-page-sheet img[data-src]').forEach(img => {
            if (!img.getAttribute('src')) {
                img.src = sanitizeHttpUrl(img.getAttribute('data-src'));
            }
        });
    } else {
        const pdfIframe = resumeViewerContainer.querySelector('.resume-pdf-iframe[data-src]');
        if (pdfIframe && !pdfIframe.getAttribute('src')) {
            pdfIframe.src = sanitizeHttpUrl(pdfIframe.getAttribute('data-src'));
        }
    }
}

if (openResumeBtn && resumeModal) {
    openResumeBtn.addEventListener('click', () => {
        syncResumeViewerMode();
        resumeModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

const closeResumeModal = () => {
    if (!resumeModal) return;
    resumeModal.classList.remove('active');
    document.body.style.overflow = 'auto';
};

if (closeResumeBtn) {
    closeResumeBtn.addEventListener('click', closeResumeModal);
    closeResumeBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            closeResumeModal();
        }
    });
}

if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
        if (e.target === resumeModal) closeResumeModal();
    });
}

window.addEventListener('resize', () => {
    if (resumeModal && resumeModal.classList.contains('active')) {
        syncResumeViewerMode();
    }
});

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
    const BOOKING_DRAFT_KEY = "pema-booking-brief-v1";
    const stepEls = Array.from(contactForm.querySelectorAll(".booking-step"));
    const progressBars = Array.from(contactForm.querySelectorAll(".booking-bar"));
    const stepCounterEl = document.getElementById("bookingStepCounter");
    const otherWrap = document.getElementById("bookingOtherWrap");
    const otherInput = document.getElementById("bookingOtherInput");
    const skipScheduleBtn = document.getElementById("bookingSkipScheduleBtn");
    const slotPickerWrap = document.getElementById("bookingSlotPicker");
    const dayStripEl = document.getElementById("bookingDayStrip");
    const tzLabelEl = document.getElementById("bookingTimezoneLabel");
    const summaryChipsEl = document.getElementById("bookingSummaryChips");
    const backBtn = document.getElementById("bookingBackBtn");
    const continueBtn = document.getElementById("bookingContinueBtn");
    const submitBtn = document.getElementById("bookingSubmitBtn");
    const bookingNav = document.getElementById("bookingNav");
    const confirmedActions = document.getElementById("bookingConfirmedActions");
    const icsBtn = document.getElementById("bookingIcsBtn");
    const resetBtn = document.getElementById("bookingResetBtn");

    let visitorTimezone = "Asia/Thimphu";
    try {
        visitorTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Thimphu";
    } catch {
        visitorTimezone = "Asia/Thimphu";
    }
    if (tzLabelEl) {
        tzLabelEl.textContent = `Optional quick call in ${visitorTimezone}`;
    }

    const defaultState = () => ({
        step: 0,
        services: [],
        otherService: "",
        budget: "",
        timeline: "",
        skipSchedule: false,
        dayIso: "",
        dayLabel: "",
        time: "",
        name: "",
        email: "",
        notes: ""
    });

    let bookingState = defaultState();

    function showWizardNotice(msg, type = "error", autoHideMs = 4000) {
        formMessage.textContent = msg;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = "block";
        if (autoHideMs > 0) {
            setTimeout(() => {
                if (formMessage.textContent === msg) {
                    formMessage.style.display = "none";
                }
            }, autoHideMs);
        }
    }

    function clearWizardNotice() {
        formMessage.style.display = "none";
        formMessage.className = "form-message";
        formMessage.textContent = "";
    }

    function saveBookingDraft() {
        try {
            localStorage.setItem(BOOKING_DRAFT_KEY, JSON.stringify({ version: 1, ...bookingState }));
        } catch {
            // Ignore private-mode storage quotas
        }
    }

    function loadBookingDraft() {
        try {
            const raw = localStorage.getItem(BOOKING_DRAFT_KEY);
            if (!raw) return;
            const parsed = JSON.parse(raw);
            if (!parsed || parsed.version !== 1) return;
            bookingState = {
                ...defaultState(),
                step: Number.isInteger(parsed.step) ? Math.max(0, Math.min(3, parsed.step)) : 0,
                services: Array.isArray(parsed.services) ? parsed.services.slice(0, 6) : [],
                otherService: typeof parsed.otherService === "string" ? parsed.otherService.slice(0, 300) : "",
                budget: typeof parsed.budget === "string" ? parsed.budget : "",
                timeline: typeof parsed.timeline === "string" ? parsed.timeline : "",
                skipSchedule: Boolean(parsed.skipSchedule),
                dayIso: typeof parsed.dayIso === "string" ? parsed.dayIso : "",
                dayLabel: typeof parsed.dayLabel === "string" ? parsed.dayLabel : "",
                time: typeof parsed.time === "string" ? parsed.time : "",
                name: typeof parsed.name === "string" ? parsed.name.slice(0, 100) : "",
                email: typeof parsed.email === "string" ? parsed.email.slice(0, 100) : "",
                notes: typeof parsed.notes === "string" ? parsed.notes.slice(0, 2000) : ""
            };
        } catch {
            bookingState = defaultState();
        }
    }

    function buildUpcomingWeekdays() {
        if (!dayStripEl) return;
        dayStripEl.replaceChildren();
        const cursor = new Date();
        let added = 0;
        let offset = 1;
        while (added < 8 && offset < 25) {
            const d = new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate() + offset);
            offset++;
            const dow = d.getDay();
            if (dow === 0 || dow === 6) continue;
            const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
            const dowLabel = d.toLocaleDateString("en-US", { weekday: "short" });
            const dateLabel = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });

            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "booking-day-pill";
            btn.dataset.dayIso = iso;
            btn.dataset.dayLabel = `${dowLabel}, ${dateLabel}`;
            btn.setAttribute("aria-pressed", "false");

            const sDow = document.createElement("span");
            sDow.className = "booking-day-dow";
            sDow.textContent = dowLabel;
            const sNum = document.createElement("span");
            sNum.className = "booking-day-num";
            sNum.textContent = dateLabel;

            btn.appendChild(sDow);
            btn.appendChild(sNum);
            btn.addEventListener("click", () => {
                bookingState.skipSchedule = false;
                bookingState.dayIso = iso;
                bookingState.dayLabel = `${dowLabel}, ${dateLabel}`;
                syncWizardUI();
                saveBookingDraft();
            });
            dayStripEl.appendChild(btn);
            added++;
        }
    }

    function renderSummaryChips() {
        if (!summaryChipsEl) return;
        summaryChipsEl.replaceChildren();
        const items = [];
        if (bookingState.services.length) {
            items.push(bookingState.services.join(" + "));
        }
        if (bookingState.budget) items.push(bookingState.budget);
        if (bookingState.timeline) items.push(bookingState.timeline);
        if (bookingState.skipSchedule) {
            items.push("Reply via email");
        } else if (bookingState.dayLabel && bookingState.time) {
            items.push(`${bookingState.dayLabel} at ${bookingState.time}`);
        }
        items.forEach(text => {
            const chip = document.createElement("span");
            chip.className = "booking-summary-chip";
            chip.textContent = text;
            summaryChipsEl.appendChild(chip);
        });
    }

    function syncWizardUI(direction = null) {
        const current = bookingState.step;
        if (stepCounterEl) {
            stepCounterEl.textContent = `Step ${current + 1} of ${stepEls.length}`;
        }

        progressBars.forEach((bar, idx) => {
            bar.classList.toggle("is-done", idx < current);
            bar.classList.toggle("is-active", idx === current);
        });

        contactForm.classList.toggle("is-schedule-step", current >= 2);

        stepEls.forEach((stepEl, idx) => {
            const isActive = idx === current;
            stepEl.hidden = !isActive;
            stepEl.classList.remove("is-entering-forward", "is-entering-backward");
            if (isActive && direction) {
                void stepEl.offsetWidth;
                stepEl.classList.add(direction === "backward" ? "is-entering-backward" : "is-entering-forward");
            }
        });

        // Sync service, budget, timeline, time pill states
        contactForm.querySelectorAll('.booking-pill[data-group="services"]').forEach(btn => {
            const active = bookingState.services.includes(btn.dataset.value);
            btn.setAttribute("aria-pressed", active ? "true" : "false");
        });
        contactForm.querySelectorAll('.booking-pill[data-group="budget"]').forEach(btn => {
            btn.setAttribute("aria-pressed", btn.dataset.value === bookingState.budget ? "true" : "false");
        });
        contactForm.querySelectorAll('.booking-pill[data-group="timeline"]').forEach(btn => {
            btn.setAttribute("aria-pressed", btn.dataset.value === bookingState.timeline ? "true" : "false");
        });
        contactForm.querySelectorAll('.booking-pill[data-group="time"]').forEach(btn => {
            btn.setAttribute("aria-pressed", !bookingState.skipSchedule && btn.dataset.value === bookingState.time ? "true" : "false");
        });

        if (dayStripEl) {
            dayStripEl.querySelectorAll(".booking-day-pill").forEach(btn => {
                btn.setAttribute("aria-pressed", !bookingState.skipSchedule && btn.dataset.dayIso === bookingState.dayIso ? "true" : "false");
            });
        }

        const showOther = bookingState.services.includes("Something else");
        if (otherWrap) {
            otherWrap.dataset.visible = showOther ? "true" : "false";
            otherWrap.setAttribute("aria-hidden", showOther ? "false" : "true");
        }
        if (otherInput && otherInput.value !== bookingState.otherService) {
            otherInput.value = bookingState.otherService;
        }

        if (skipScheduleBtn) {
            skipScheduleBtn.setAttribute("aria-pressed", bookingState.skipSchedule ? "true" : "false");
        }
        if (slotPickerWrap) {
            slotPickerWrap.style.opacity = bookingState.skipSchedule ? "0.42" : "1";
            slotPickerWrap.style.pointerEvents = bookingState.skipSchedule ? "none" : "auto";
        }

        if (contactForm.name && contactForm.name.value !== bookingState.name) contactForm.name.value = bookingState.name;
        if (contactForm.email && contactForm.email.value !== bookingState.email) contactForm.email.value = bookingState.email;
        if (contactForm.message && contactForm.message.value !== bookingState.notes) contactForm.message.value = bookingState.notes;

        if (backBtn) backBtn.hidden = current === 0;
        if (continueBtn) continueBtn.hidden = current >= stepEls.length - 1;
        if (submitBtn) submitBtn.hidden = current !== stepEls.length - 1;

        if (current === stepEls.length - 1) {
            renderSummaryChips();
        }
    }

    function goToStep(nextStep, dir) {
        clearWizardNotice();
        bookingState.step = Math.max(0, Math.min(stepEls.length - 1, nextStep));
        syncWizardUI(dir);
        saveBookingDraft();
        const heading = stepEls[bookingState.step]?.querySelector("h3[tabindex]");
        if (heading) {
            heading.focus({ preventScroll: true });
        }
    }

    function validateStep(idx) {
        if (idx === 0) {
            if (!bookingState.services.length) {
                showWizardNotice("⚠️ Please select at least one option to continue.");
                return false;
            }
            if (bookingState.services.includes("Something else") && bookingState.services.length === 1 && !bookingState.otherService.trim()) {
                showWizardNotice("⚠️ Please tell me briefly what else you need.");
                if (otherInput) otherInput.focus();
                return false;
            }
        } else if (idx === 1) {
            if (!bookingState.budget) {
                showWizardNotice("⚠️ Please choose an estimated budget range in Nu.");
                return false;
            }
            if (!bookingState.timeline) {
                showWizardNotice("⚠️ Please choose an ideal timeline.");
                return false;
            }
        } else if (idx === 2) {
            if (!bookingState.skipSchedule && (!bookingState.dayIso || !bookingState.time)) {
                showWizardNotice("⚠️ Pick a preferred day & time, or choose 'Skip call — reply by email'.");
                return false;
            }
        }
        return true;
    }

    function createIcsDataUri(dayIso, timeStr, clientName) {
        const [y, m, d] = dayIso.split("-").map(Number);
        const match = timeStr.match(/^(\d+):(\d+)\s*(AM|PM)$/i);
        if (!y || !m || !d || !match) return "#";
        let hr = parseInt(match[1], 10);
        const min = parseInt(match[2], 10);
        const ampm = match[3].toUpperCase();
        if (ampm === "PM" && hr !== 12) hr += 12;
        if (ampm === "AM" && hr === 12) hr = 0;

        const pad = (n) => String(n).padStart(2, "0");
        const startLocal = `${y}${pad(m)}${pad(d)}T${pad(hr)}${pad(min)}00`;
        const endDate = new Date(y, m - 1, d, hr, min + 30);
        const endLocal = `${endDate.getFullYear()}${pad(endDate.getMonth() + 1)}${pad(endDate.getDate())}T${pad(endDate.getHours())}${pad(endDate.getMinutes())}00`;

        const lines = [
            "BEGIN:VCALENDAR",
            "VERSION:2.0",
            "PRODID:-//Pema Choda Portfolio//Booking//EN",
            "BEGIN:VEVENT",
            `UID:pema-${dayIso}-${hr}${min}@pemachoda`,
            `DTSTART:${startLocal}`,
            `DTEND:${endLocal}`,
            `SUMMARY:Discovery Call — Pema Choda & ${sanitizeSingleLineInput(clientName, 60)}`,
            `DESCRIPTION:Service: ${bookingState.services.join(", ")} | Budget: ${bookingState.budget} | Timezone: ${visitorTimezone}`,
            "LOCATION:Online / Thimphu",
            "END:VEVENT",
            "END:VCALENDAR"
        ].join("\r\n");

        return `data:text/calendar;charset=utf-8,${encodeURIComponent(lines)}`;
    }

    // Wire clickable pills
    contactForm.querySelectorAll(".booking-pill[data-group]").forEach(btn => {
        btn.addEventListener("click", () => {
            const group = btn.dataset.group;
            const val = btn.dataset.value || "";
            if (group === "services") {
                const exists = bookingState.services.includes(val);
                bookingState.services = exists
                    ? bookingState.services.filter(item => item !== val)
                    : [...bookingState.services, val];
                syncWizardUI();
                if (!exists && btn.dataset.toggleOther === "true" && otherInput) {
                    setTimeout(() => otherInput.focus({ preventScroll: true }), 180);
                }
            } else if (group === "budget") {
                bookingState.budget = val;
                syncWizardUI();
            } else if (group === "timeline") {
                bookingState.timeline = val;
                syncWizardUI();
            } else if (group === "time") {
                bookingState.skipSchedule = false;
                bookingState.time = val;
                syncWizardUI();
            }
            clearWizardNotice();
            saveBookingDraft();
        });
    });

    if (otherInput) {
        otherInput.addEventListener("input", () => {
            bookingState.otherService = otherInput.value.slice(0, 300);
            saveBookingDraft();
        });
    }

    if (skipScheduleBtn) {
        skipScheduleBtn.addEventListener("click", () => {
            bookingState.skipSchedule = !bookingState.skipSchedule;
            clearWizardNotice();
            syncWizardUI();
            saveBookingDraft();
        });
    }

    if (contactForm.name) {
        contactForm.name.addEventListener("input", () => {
            bookingState.name = contactForm.name.value.slice(0, 100);
            saveBookingDraft();
        });
    }
    if (contactForm.email) {
        contactForm.email.addEventListener("input", () => {
            bookingState.email = contactForm.email.value.slice(0, 100);
            saveBookingDraft();
        });
    }
    if (contactForm.message) {
        contactForm.message.addEventListener("input", () => {
            bookingState.notes = contactForm.message.value.slice(0, 2000);
            saveBookingDraft();
        });
    }

    if (continueBtn) {
        continueBtn.addEventListener("click", () => {
            if (!validateStep(bookingState.step)) return;
            goToStep(bookingState.step + 1, "forward");
        });
    }

    if (backBtn) {
        backBtn.addEventListener("click", () => {
            goToStep(bookingState.step - 1, "backward");
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            bookingState = defaultState();
            try { localStorage.removeItem(BOOKING_DRAFT_KEY); } catch {}
            contactForm.reset();
            if (typeof grecaptcha !== "undefined" && typeof grecaptcha.reset === "function") {
                grecaptcha.reset();
            }
            if (confirmedActions) confirmedActions.hidden = true;
            if (icsBtn) icsBtn.hidden = true;
            if (bookingNav) bookingNav.style.display = "flex";
            clearWizardNotice();
            goToStep(0, "backward");
        });
    }

    buildUpcomingWeekdays();
    loadBookingDraft();
    syncWizardUI();

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
            showWizardNotice(`⏳ Please wait ${remainingSec}s before submitting another booking.`);
            return;
        }

        // ===== Input Sanitization (Strip CR/LF & Control Characters) =====
        const nameVal = sanitizeSingleLineInput(contactForm.name.value, 100);
        const emailVal = sanitizeSingleLineInput(contactForm.email.value, 100);
        const otherVal = sanitizeSingleLineInput(bookingState.otherService, 300);
        const notesVal = sanitizeMultiLineInput(contactForm.message.value, 2000);

        const emailRegex = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+$/;
        if (!nameVal || !emailVal) {
            showWizardNotice("⚠️ Please enter both your name and email address.");
            return;
        }

        if (!emailRegex.test(emailVal)) {
            showWizardNotice("⚠️ Please enter a valid email address.");
            return;
        }

        // ===== Fail-Closed reCAPTCHA Verification & Token Extraction =====
        let recaptchaToken = "";
        const recaptchaWidget = contactForm.querySelector(".g-recaptcha");
        if (recaptchaWidget) {
            if (typeof grecaptcha === "undefined" || typeof grecaptcha.getResponse !== "function") {
                showWizardNotice("⚠️ Security verification failed to load. Please disable any script blockers and refresh.", "error", 5000);
                return;
            }

            recaptchaToken = grecaptcha.getResponse();
            if (!recaptchaToken) {
                showWizardNotice("⚠️ Please complete the reCAPTCHA verification.");
                return;
            }
        }

        if (typeof emailjs === "undefined" || typeof emailjs.send !== "function") {
            showWizardNotice("⚠️ Messaging service is temporarily unavailable. Please reach out directly via email.", "error", 5000);
            return;
        }

        const btnText = submitBtn.querySelector("span");
        const btnIcon = submitBtn.querySelector("i");

        btnText.textContent = "Booking...";
        btnIcon.classList.remove("fa-paper-plane");
        btnIcon.classList.add("fa-spinner", "fa-spin");
        submitBtn.disabled = true;
        clearWizardNotice();

        const servicesSummary = bookingState.services.join(", ") || "General Inquiry";
        const scheduleSummary = bookingState.skipSchedule
            ? "Reply via email (no call needed)"
            : `${bookingState.dayLabel} (${bookingState.dayIso}) at ${bookingState.time}`;

        const subjectVal = sanitizeSingleLineInput(
            `Booking: ${servicesSummary} (${bookingState.budget || "Nu. TBD"})`,
            150
        );

        const formattedBody = [
            "=== BOOKING BRIEF ===",
            `Services: ${servicesSummary}`,
            otherVal ? `Other Need: ${otherVal}` : null,
            `Budget (BTN): ${bookingState.budget || "Not specified"}`,
            `Timeline: ${bookingState.timeline || "Not specified"}`,
            `Preferred Schedule: ${scheduleSummary}`,
            `Visitor Timezone: ${visitorTimezone}`,
            notesVal ? `\nProject Notes:\n${notesVal}` : null
        ].filter(Boolean).join("\n");

        const templateParams = {
            from_name: nameVal,
            from_email: emailVal,
            subject: subjectVal,
            message: sanitizeMultiLineInput(formattedBody, 2000),
            "g-recaptcha-response": recaptchaToken
        };

        emailjs
            .send(
                "service_8mguzri",
                "template_73gpdz4",
                templateParams
            )
            .then(() => {
                localStorage.setItem("last_contact_submitted_at", Date.now().toString());
                try { localStorage.removeItem(BOOKING_DRAFT_KEY); } catch {}

                if (bookingNav) bookingNav.style.display = "none";
                if (confirmedActions) confirmedActions.hidden = false;
                if (icsBtn && !bookingState.skipSchedule && bookingState.dayIso && bookingState.time) {
                    icsBtn.href = createIcsDataUri(bookingState.dayIso, bookingState.time, nameVal);
                    icsBtn.hidden = false;
                }

                showWizardNotice(
                    `✅ Booking request sent! I'll follow up shortly${bookingState.skipSchedule ? "." : ` for ${bookingState.dayLabel} at ${bookingState.time}.`}`,
                    "success",
                    0
                );
            })
            .catch(() => {
                showWizardNotice("❌ Unable to send your booking right now. Please try again later or reach out directly via email.", "error", 5000);
                if (typeof grecaptcha !== "undefined" && typeof grecaptcha.reset === "function") {
                    grecaptcha.reset();
                }
            })
            .finally(() => {
                btnText.textContent = "Confirm Booking";
                btnIcon.classList.remove("fa-spinner", "fa-spin");
                btnIcon.classList.add("fa-paper-plane");
                submitBtn.disabled = false;
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
                value: ['#012B1D', '#01B36C', '#FB6912', '#16D184']
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
                color: '#01B36C',
                opacity: 0.24,
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
// INTERACTIVE FRAMER-MOTION CHARACTER RIG
// ===================================

function initHeroCharacterRig() {
    const heroSection = document.getElementById('home');
    const aboutSectionEl = document.getElementById('about');
    const rig = document.getElementById('heroCharacterRig');
    const glider = document.getElementById('heroCharGlider');
    const aboutSlot = document.getElementById('aboutCharSlot');
    const aboutFrame = document.getElementById('aboutImageFrame');
    const canvas = document.getElementById('heroSquishCanvas');
    const bgName = document.querySelector('.hero-bg-name');
    if (!heroSection || !rig) return;

    const sprites = Array.from(rig.querySelectorAll('.expr-sprite'));
    if (!sprites.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const W = 542;
    const H = 640;
    const COLS = 18;
    const ROWS = 22;
    const spriteMap = {};
    let canvasReady = false;
    let ctx = canvas ? canvas.getContext('2d') : null;
    let dpr = 1;

    // Pre-allocate typed grid vertex coordinates for zero-GC 60fps canvas mesh warp
    const vx = new Float32Array((COLS + 1) * (ROWS + 1));
    const vy = new Float32Array((COLS + 1) * (ROWS + 1));

    class Spring {
        constructor(value = 0, stiffness = 340, damping = 18, mass = 1) {
            this.x = value;
            this.v = 0;
            this.target = value;
            this.stiffness = stiffness;
            this.damping = damping;
            this.mass = mass;
        }
        step(dt) {
            const clampedDt = Math.min(dt, 0.032);
            const fSpring = -this.stiffness * (this.x - this.target);
            const fDamp = -this.damping * this.v;
            const a = (fSpring + fDamp) / this.mass;
            this.v += a * clampedDt;
            this.x += this.v * clampedDt;
        }
    }

    // Whole-rig subtle bounce springs
    const sx = new Spring(0, 320, 17, 1);
    const sy = new Spring(0, 320, 17, 1);
    const sScaleX = new Spring(1, 420, 18, 0.9);
    const sScaleY = new Spring(1, 420, 18, 0.9);
    const sRot = new Spring(0, 260, 15, 1);
    const sSkew = new Spring(0, 260, 16, 1);

    // Localized rubber-band cheek-squish mesh springs
    const sGrabX = new Spring(0, 420, 13, 0.85);
    const sGrabY = new Spring(0, 420, 13, 0.85);
    const sLeanX = new Spring(0, 260, 15, 1);
    const sLeanY = new Spring(0, 260, 15, 1);
    const sPress = new Spring(0, 380, 14, 0.9);

    let currentExpr = 'base';
    let lastDrawnExpr = '';
    let wasWarping = false;
    let isHovering = false;
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let grabU = 0.5;
    let grabV = 0.44;
    let maxDragDist = 0;
    let holdTimer = null;
    let timedStateTimer = null;
    let pokeCount = 0;
    let lastPokeTime = 0;

    function syncCanvasSize() {
        if (!canvas || !ctx) return;
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        const bw = Math.round(W * dpr);
        const bh = Math.round(H * dpr);
        if (canvas.width !== bw || canvas.height !== bh) {
            canvas.width = bw;
            canvas.height = bh;
        }
    }

    function drawTexturedTriangle(img, sx0, sy0, sx1, sy1, sx2, sy2, dx0, dy0, dx1, dy1, dx2, dy2) {
        const du1 = sx1 - sx0;
        const dv1 = sy1 - sy0;
        const du2 = sx2 - sx0;
        const dv2 = sy2 - sy0;
        const denom = du1 * dv2 - dv1 * du2;
        if (Math.abs(denom) < 1e-6) return;

        const ddx1 = dx1 - dx0;
        const ddy1 = dy1 - dy0;
        const ddx2 = dx2 - dx0;
        const ddy2 = dy2 - dy0;

        const a = (ddx1 * dv2 - ddx2 * dv1) / denom;
        const b = (ddy1 * dv2 - ddy2 * dv1) / denom;
        const c = (du1 * ddx2 - du2 * ddx1) / denom;
        const d = (du1 * ddy2 - du2 * ddy1) / denom;
        const e = dx0 - a * sx0 - c * sy0;
        const f = dy0 - b * sx0 - d * sy0;

        // Slight centroid bleed eliminates hairline seams between mesh triangles
        const cx = (dx0 + dx1 + dx2) / 3;
        const cy = (dy0 + dy1 + dy2) / 3;
        const bleed = 0.6;

        const l0 = Math.hypot(dx0 - cx, dy0 - cy) || 1;
        const l1 = Math.hypot(dx1 - cx, dy1 - cy) || 1;
        const l2 = Math.hypot(dx2 - cx, dy2 - cy) || 1;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(dx0 + ((dx0 - cx) / l0) * bleed, dy0 + ((dy0 - cy) / l0) * bleed);
        ctx.lineTo(dx1 + ((dx1 - cx) / l1) * bleed, dy1 + ((dy1 - cy) / l1) * bleed);
        ctx.lineTo(dx2 + ((dx2 - cx) / l2) * bleed, dy2 + ((dy2 - cy) / l2) * bleed);
        ctx.closePath();
        ctx.clip();
        ctx.transform(a, b, c, d, e, f);
        ctx.drawImage(img, 0, 0, W, H);
        ctx.restore();
    }

    function renderCanvas(force = false) {
        if (!canvasReady || !ctx) return;
        const activeImg = spriteMap[currentExpr] || spriteMap.base;
        if (!activeImg) return;

        const meshActive = isDragging ||
            Math.abs(sGrabX.x) > 0.08 || Math.abs(sGrabX.v) > 0.08 ||
            Math.abs(sGrabY.x) > 0.08 || Math.abs(sGrabY.v) > 0.08 ||
            Math.abs(sLeanX.x) > 0.08 || Math.abs(sLeanX.v) > 0.08 ||
            Math.abs(sLeanY.x) > 0.08 || Math.abs(sLeanY.v) > 0.08 ||
            Math.abs(sPress.x) > 0.08 || Math.abs(sPress.v) > 0.08;

        if (!force && !meshActive && !wasWarping && lastDrawnExpr === currentExpr) {
            return;
        }

        syncCanvasSize();
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, W, H);

        if (!meshActive) {
            ctx.drawImage(activeImg, 0, 0, W, H);
            wasWarping = false;
            lastDrawnExpr = currentExpr;
            return;
        }

        const gx = sGrabX.x;
        const gy = sGrabY.x;
        const lx = sLeanX.x;
        const ly = sLeanY.x;
        const press = sPress.x;
        const invRx = 1 / 0.28;
        const invRy = 1 / 0.24;
        const stride = COLS + 1;

        for (let j = 0; j <= ROWS; j++) {
            const v = j / ROWS;
            // Smoothstep anchor pin: bottom hoodie hem/shoulders stay locked
            const rawPin = Math.min(1, Math.max(0, (0.90 - v) / 0.24));
            const pin = rawPin * rawPin * (3 - 2 * rawPin);
            const leanFalloff = Math.max(0, 1 - v * 1.05) * pin;

            for (let i = 0; i <= COLS; i++) {
                const u = i / COLS;
                const du = (u - grabU) * invRx;
                const dv = (v - grabV) * invRy;
                const d2 = du * du + dv * dv;
                const g = Math.exp(-d2 * 1.45) * pin;

                // Volume-preserving lateral cheek bulge + rubber pull toward cursor
                const squishBulgeX = press * du * Math.exp(-d2 * 1.1) * pin;
                const squishBulgeY = -press * 0.55 * dv * Math.exp(-d2 * 1.1) * pin;

                const idx = j * stride + i;
                vx[idx] = u * W + gx * g + lx * leanFalloff + squishBulgeX;
                vy[idx] = v * H + gy * g + ly * leanFalloff + squishBulgeY;
            }
        }

        const cellW = W / COLS;
        const cellH = H / ROWS;
        for (let j = 0; j < ROWS; j++) {
            const sy0 = j * cellH;
            const sy1 = (j + 1) * cellH;
            for (let i = 0; i < COLS; i++) {
                const sx0 = i * cellW;
                const sx1 = (i + 1) * cellW;

                const i00 = j * stride + i;
                const i10 = i00 + 1;
                const i01 = i00 + stride;
                const i11 = i01 + 1;

                drawTexturedTriangle(
                    activeImg,
                    sx0, sy0, sx1, sy0, sx0, sy1,
                    vx[i00], vy[i00], vx[i10], vy[i10], vx[i01], vy[i01]
                );
                drawTexturedTriangle(
                    activeImg,
                    sx1, sy0, sx1, sy1, sx0, sy1,
                    vx[i10], vy[i10], vx[i11], vy[i11], vx[i01], vy[i01]
                );
            }
        }

        wasWarping = true;
        lastDrawnExpr = currentExpr;
    }

    if (canvas && ctx) {
        Promise.all(sprites.map(img => {
            spriteMap[img.dataset.expr] = img;
            if (img.complete && img.naturalWidth > 0) {
                return img.decode ? img.decode().catch(() => {}) : Promise.resolve();
            }
            return new Promise(resolve => {
                img.addEventListener('load', () => resolve(), { once: true });
                img.addEventListener('error', () => resolve(), { once: true });
            });
        })).then(() => {
            if (!spriteMap.base || !spriteMap.base.naturalWidth) return;
            canvasReady = true;
            syncCanvasSize();
            canvas.classList.add('ready');
            rig.classList.add('canvas-ready');
            renderCanvas(true);
        });
    }

    function setExpr(name) {
        if (currentExpr === name) return;
        currentExpr = name;
        sprites.forEach(img => {
            img.classList.toggle('active', img.dataset.expr === name);
        });
        if (canvasReady && prefersReducedMotion) {
            renderCanvas(true);
        }
    }

    function clearTimedState() {
        if (timedStateTimer) {
            clearTimeout(timedStateTimer);
            timedStateTimer = null;
        }
    }

    function scheduleRecovery(delayMs) {
        clearTimedState();
        timedStateTimer = setTimeout(() => {
            if (!isDragging) {
                setExpr(isHovering ? 'hovered' : 'base');
                sScaleX.target = isHovering ? 1.02 : 1;
                sScaleY.target = isHovering ? 1.02 : 1;
                sRot.target = 0;
            }
        }, delayMs);
    }

    rig.addEventListener('pointerenter', () => {
        isHovering = true;
        if (!isDragging && (currentExpr === 'base' || currentExpr === 'smile')) {
            setExpr('hovered');
            sScaleX.target = 1.02;
            sScaleY.target = 1.02;
        }
    });

    rig.addEventListener('pointerleave', () => {
        isHovering = false;
        if (!isDragging && currentExpr === 'hovered') {
            setExpr('base');
            sScaleX.target = 1;
            sScaleY.target = 1;
            sRot.target = 0;
        }
    });

    heroSection.addEventListener('pointermove', (e) => {
        if (isDragging || prefersReducedMotion) return;
        const rect = heroSection.getBoundingClientRect();
        const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

        if (bgName && window.innerWidth > 968) {
            bgName.style.transform = `translate3d(calc(-50% + ${(-nx * 10).toFixed(1)}px), ${(-ny * 5).toFixed(1)}px, 0)`;
        }

        if (currentExpr === 'base' || currentExpr === 'hovered' || currentExpr === 'smile') {
            sRot.target = nx * 1.8;
            sx.target = nx * 4;
            sy.target = ny * 2;
            sLeanX.target = nx * 9;
            sLeanY.target = ny * 4;
        }
    });

    heroSection.addEventListener('pointerleave', () => {
        if (isDragging || prefersReducedMotion) return;
        sx.target = 0;
        sy.target = 0;
        sRot.target = 0;
        sLeanX.target = 0;
        sLeanY.target = 0;
        if (bgName && window.innerWidth > 968) {
            bgName.style.transform = 'translate3d(-50%, 0, 0)';
        }
    });

    rig.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        rig.setPointerCapture(e.pointerId);
        rig.classList.add('grabbing');
        clearTimedState();
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        maxDragDist = 0;

        // Capture normalized local grab point on face/cheek inside 542x640 rig
        const rigRect = rig.getBoundingClientRect();
        grabU = Math.min(0.84, Math.max(0.16, (e.clientX - rigRect.left) / (rigRect.width || 1)));
        grabV = Math.min(0.82, Math.max(0.12, (e.clientY - rigRect.top) / (rigRect.height || 1)));

        const now = performance.now();
        if (now - lastPokeTime < 2200) {
            pokeCount += 1;
        } else {
            pokeCount = 1;
        }
        lastPokeTime = now;

        setExpr('held');
        sPress.target = 18;
        sScaleX.target = 1.04;
        sScaleY.target = 0.96;
        sRot.target = 0;

        clearTimeout(holdTimer);
        holdTimer = setTimeout(() => {
            if (isDragging && maxDragDist < 12) {
                setExpr('held');
                sPress.target = 24;
                sScaleX.target = 1.06;
                sScaleY.target = 0.94;
            }
        }, 120);
    });

    rig.addEventListener('pointermove', (e) => {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        const dist = Math.hypot(dx, dy);
        if (dist > maxDragDist) maxDragDist = dist;

        const rigRect = rig.getBoundingClientRect();
        const canvasScale = W / (rigRect.width || W);

        // Localized rubber-band cheek deformation in canvas pixels
        sGrabX.target = Math.tanh((dx * canvasScale) / 110) * 72;
        sGrabY.target = Math.tanh((dy * canvasScale) / 110) * 60;
        sLeanX.target = Math.tanh((dx * canvasScale) / 180) * 26;
        sLeanY.target = Math.tanh((dy * canvasScale) / 180) * 16;

        // Keep bottom hoodie planted while rig leans subtly
        sx.target = Math.tanh(dx / 150) * 18;
        sy.target = Math.tanh(dy / 160) * 10;

        if (dist > 12) {
            setExpr('pulled');
            sPress.target = Math.min(34, 14 + dist * 0.14);
            const stretch = Math.min(0.10, dist / 460);
            if (Math.abs(dy) > Math.abs(dx)) {
                sScaleY.target = 1 + (dy < 0 ? stretch : -stretch * 0.65);
                sScaleX.target = 1 / sScaleY.target;
            } else {
                sScaleX.target = 1 + stretch * 0.75;
                sScaleY.target = 1 / sScaleX.target;
            }
            sRot.target = Math.max(-7, Math.min(7, dx * 0.06));
            sSkew.target = Math.max(-5, Math.min(5, -dx * 0.04));
        }
    });

    function endDrag() {
        if (!isDragging) return;
        isDragging = false;
        clearTimeout(holdTimer);
        rig.classList.remove('grabbing');

        sGrabX.target = 0;
        sGrabY.target = 0;
        sLeanX.target = 0;
        sLeanY.target = 0;
        sPress.target = 0;

        sx.target = 0;
        sy.target = 0;
        sScaleX.target = 1;
        sScaleY.target = 1;
        sRot.target = 0;
        sSkew.target = 0;

        if (pokeCount >= 6) {
            setExpr('fedUp');
            pokeCount = 0;
            sPress.v += 110;
            sScaleX.v -= 0.7;
            sScaleY.v += 0.7;
            scheduleRecovery(2600);
        } else if (maxDragDist > 26 || pokeCount >= 4) {
            setExpr('dazed');
            sRot.v += (Math.random() > 0.5 ? 1 : -1) * 75;
            scheduleRecovery(1700);
        } else {
            setExpr('smile');
            sPress.v -= 85;
            sScaleY.v += 1.2;
            sScaleX.v -= 0.9;
            scheduleRecovery(1350);
        }
    }

    rig.addEventListener('pointerup', endDrag);
    rig.addEventListener('pointercancel', endDrag);

    // Hero -> About Shared Scroll Glide Spring
    const sGlide = new Spring(0, 240, 26, 1);
    let glideMetrics = { enabled: false, dx: 0, dy: 0, scale: 0.72, yStart: 12, yEnd: 540 };
    let landedInAbout = false;

    function measureHeroAboutGlide() {
        const canGlide = window.innerWidth > 968 && !prefersReducedMotion && glider && aboutSlot && aboutSectionEl;
        document.body.classList.toggle('has-hero-glide', Boolean(canGlide));
        if (!canGlide) {
            glideMetrics.enabled = false;
            if (glider) glider.style.transform = 'none';
            if (aboutFrame) {
                aboutFrame.style.clipPath = 'none';
                aboutFrame.style.opacity = '';
            }
            return;
        }

        const prevTransform = glider.style.transform;
        glider.style.transform = 'none';
        const gr = glider.getBoundingClientRect();
        const ar = aboutSlot.getBoundingClientRect();
        glider.style.transform = prevTransform;

        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        const heroCenterX = gr.left + gr.width / 2;
        const heroBottomY = gr.bottom + scrollY;
        const aboutCenterX = ar.left + ar.width / 2;
        const aboutBottomY = ar.bottom + scrollY;

        glideMetrics = {
            enabled: true,
            dx: aboutCenterX - heroCenterX,
            dy: aboutBottomY - heroBottomY,
            scale: ar.width / Math.max(1, gr.width),
            yStart: 14,
            yEnd: Math.max(220, aboutSectionEl.offsetTop - 90)
        };
        updateGlideTarget();
    }

    function updateGlideTarget() {
        if (!glideMetrics.enabled) return;
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        const span = Math.max(1, glideMetrics.yEnd - glideMetrics.yStart);
        sGlide.target = Math.max(0, Math.min(1, (scrollY - glideMetrics.yStart) / span));
    }

    window.addEventListener('scroll', updateGlideTarget, { passive: true });
    window.addEventListener('resize', throttle(measureHeroAboutGlide, 120));
    window.addEventListener('load', measureHeroAboutGlide);
    setTimeout(measureHeroAboutGlide, 80);

    if (!prefersReducedMotion) {
        let lastT = performance.now();
        function tick(now) {
            const dt = (now - lastT) / 1000;
            lastT = now;

            sx.step(dt);
            sy.step(dt);
            sScaleX.step(dt);
            sScaleY.step(dt);
            sRot.step(dt);
            sSkew.step(dt);

            sGrabX.step(dt);
            sGrabY.step(dt);
            sLeanX.step(dt);
            sLeanY.step(dt);
            sPress.step(dt);
            sGlide.step(dt);

            renderCanvas(false);

            if (glideMetrics.enabled && glider) {
                const g = Math.max(0, Math.min(1.04, sGlide.x));
                const tx = glideMetrics.dx * g;
                const ty = glideMetrics.dy * g;
                const sc = 1 + (glideMetrics.scale - 1) * g;
                glider.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0) scale(${sc.toFixed(4)})`;

                if (aboutFrame) {
                    const frameProg = Math.max(0, Math.min(1, (g - 0.16) / 0.68));
                    const wipePct = (1 - frameProg) * 100;
                    aboutFrame.style.clipPath = `inset(${wipePct.toFixed(1)}% 0 0 0)`;
                    aboutFrame.style.opacity = Math.max(0.12, frameProg).toFixed(3);
                }

                if (g > 0.86 && !landedInAbout && !isDragging) {
                    landedInAbout = true;
                    setExpr('smile');
                } else if (g < 0.42 && landedInAbout && !isDragging) {
                    landedInAbout = false;
                    setExpr(isHovering ? 'hovered' : 'base');
                }
            }

            const breathe = (!isDragging && currentExpr === 'base') ? Math.sin(now * 0.0024) * 0.006 : 0;
            rig.style.transform = `translate3d(${sx.x.toFixed(2)}px, ${sy.x.toFixed(2)}px, 0) rotate(${sRot.x.toFixed(2)}deg) skewX(${sSkew.x.toFixed(2)}deg) scale(${sScaleX.x.toFixed(4)}, ${(sScaleY.x + breathe).toFixed(4)})`;
            requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    }
}

// ===================================
// SITE-WIDE FRAMER MOTION ENHANCEMENTS
// (Hero Stagger, Velocity Marquee, Magnetic Buttons)
// ===================================

function initSiteWideFramerMotion() {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    // 1. Scroll-velocity reactive Tech Stack marquee
    const tickerTrack = document.querySelector('.ticker-track');
    if (tickerTrack) {
        tickerTrack.classList.add('is-js-marquee');
        let marqueeX = 0;
        let scrollVel = 0;
        let lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
        let marqueePaused = false;

        tickerTrack.addEventListener('pointerenter', () => { marqueePaused = true; });
        tickerTrack.addEventListener('pointerleave', () => { marqueePaused = false; });

        window.addEventListener('scroll', () => {
            const curY = window.pageYOffset || document.documentElement.scrollTop;
            scrollVel = Math.min(18, scrollVel + Math.abs(curY - lastScrollY) * 0.2);
            lastScrollY = curY;
        }, { passive: true });

        function tickMarquee() {
            scrollVel *= 0.92;
            if (!marqueePaused) {
                const speed = (window.innerWidth <= 768 ? 0.55 : 0.72) + scrollVel * 0.35;
                marqueeX -= speed;
                const halfW = tickerTrack.scrollWidth / 2 || 800;
                if (marqueeX <= -halfW) marqueeX += halfW;
                tickerTrack.style.transform = `translate3d(${marqueeX.toFixed(1)}px, 0, 0)`;
            }
            requestAnimationFrame(tickMarquee);
        }
        requestAnimationFrame(tickMarquee);
    }

    // 2. Magnetic hover + spring press on architectural buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.style.transition = `${btn.style.transition ? btn.style.transition + ', ' : ''}transform 0.28s cubic-bezier(0.22, 1, 0.36, 1)`;
        let bx = 0;
        let by = 0;
        btn.addEventListener('pointermove', (e) => {
            const r = btn.getBoundingClientRect();
            bx = ((e.clientX - r.left) / (r.width || 1) - 0.5) * 8;
            by = ((e.clientY - r.top) / (r.height || 1) - 0.5) * 6;
            btn.style.transform = `translate3d(${bx.toFixed(1)}px, ${by.toFixed(1)}px, 0) scale(1.03)`;
        });
        btn.addEventListener('pointerleave', () => {
            bx = 0;
            by = 0;
            btn.style.transform = 'translate3d(0, 0, 0) scale(1)';
        });
        btn.addEventListener('pointerdown', () => {
            btn.style.transform = `translate3d(${bx.toFixed(1)}px, ${by.toFixed(1)}px, 0) scale(0.96)`;
        });
        btn.addEventListener('pointerup', () => {
            btn.style.transform = `translate3d(${bx.toFixed(1)}px, ${by.toFixed(1)}px, 0) scale(1.03)`;
        });
    });

    // 3. Initial Hero entrance choreography once preloader clears
    const bgNameEl = document.querySelector('.hero-bg-name');
    const heroContentEl = document.querySelector('.hero-content');
    const heroActionsEl = document.querySelector('.hero-actions');
    const entranceEls = [bgNameEl, heroContentEl, heroActionsEl].filter(Boolean);

    entranceEls.forEach((el, idx) => {
        el.style.opacity = '0';
        el.style.transform = idx === 0 ? 'translate3d(-50%, 34px, 0)' : 'translate3d(0, 26px, 0)';
    });

    function runHeroEntrance() {
        entranceEls.forEach((el, idx) => {
            const delay = 140 + idx * 110;
            el.style.transition = `opacity 0.6s ease ${delay}ms, transform 0.72s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`;
            el.style.opacity = idx === 0 ? '0.94' : '1';
            el.style.transform = idx === 0 ? 'translate3d(-50%, 0, 0)' : 'translate3d(0, 0, 0)';
        });
        setTimeout(() => {
            entranceEls.forEach(el => { el.style.transition = ''; });
        }, 1250);
    }

    if (document.readyState === 'complete') {
        setTimeout(runHeroEntrance, 380);
    } else {
        window.addEventListener('load', () => setTimeout(runHeroEntrance, 580), { once: true });
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
        initHeroCharacterRig();
        initSiteWideFramerMotion();
    });
} else {
    initHeroCharacterRig();
    initSiteWideFramerMotion();
}

// ===================================
// CONSOLE MESSAGE
// ===================================

console.log('%c👋 Hey there! Welcome to my portfolio!',
    'color: #01B36C; font-size: 20px; font-weight: bold;');
console.log('%cLooking for talented developers? Let\'s connect!',
    'color: #FB6912; font-size: 14px;');
