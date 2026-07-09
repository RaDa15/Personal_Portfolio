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
    // {
    //     title: "Task Management System",
    //     description: "A collaborative project management tool designed for teams. Real-time synchronization ensures all team members stay updated with task progress and changes.",
    //     image: "https://via.placeholder.com/800x400",
    //     features: [
    //         "Real-time task updates",
    //         "Team collaboration tools",
    //         "Kanban board interface",
    //         "Task assignment and tracking",
    //         "File attachments and comments",
    //         "Progress analytics and reporting"
    //     ],
    //     technologies: ["Vue.js", "Firebase", "Socket.io", "Vuex"],
    //     liveLink: "https://example.com",
    //     githubLink: "https://github.com"
    // },
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

const handleScrollUpdates = () => {
    // 1. Update Reading Progress Bar
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (progressBar) progressBar.style.width = scrolled + "%";

    // 2. Update Active Navigation Link
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 100) {
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
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
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

viewButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const projectIndex = parseInt(button.getAttribute('data-project'));
        openProjectModal(projectIndex);
    });
});

function openProjectModal(index) {
    const project = projectsData[index];

    document.querySelector('.modal-image').src = project.image;
    document.querySelector('.modal-title').textContent = project.title;
    document.querySelector('.modal-description').textContent = project.description;

    // Populate features list
    const featuresList = document.querySelector('.features-list');
    featuresList.innerHTML = '';
    project.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });

    // Populate technologies
    const modalTech = document.querySelector('.modal-tech');
    modalTech.innerHTML = '';
    project.technologies.forEach(tech => {
        const span = document.createElement('span');
        span.className = 'tech-tag';
        span.textContent = tech;
        modalTech.appendChild(span);
    });

    // Update links
    document.querySelector('.modal-links .btn-primary').href = project.liveLink;
    document.querySelector('.modal-links .btn-secondary').href = project.githubLink;

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
// ================= CONTACT FORM EMAILJS =================

const contactForm = document.getElementById("contactForm");
const formMessage = document.querySelector(".form-message");

contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // ===== reCAPTCHA Validation =====
    // const recaptchaResponse = grecaptcha.getResponse();
    // if (!recaptchaResponse) {
    //     formMessage.textContent = "⚠️ Please complete the reCAPTCHA verification.";
    //     formMessage.className = "form-message error";
    //     formMessage.style.display = "block";
    //     setTimeout(() => { formMessage.style.display = "none"; }, 4000);
    //     return; // Stop form submission
    // }

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
        from_name: contactForm.name.value,
        from_email: contactForm.email.value,
        subject: contactForm.subject.value,
        message: contactForm.message.value,
    };

    emailjs
        .send(
            "service_8mguzri",   // ✅ YOUR SERVICE ID
            "template_73gpdz4",  // ✅ YOUR TEMPLATE ID
            templateParams
        )
        .then(() => {
            formMessage.textContent =
                "✅ Message sent successfully! I'll get back to you soon.";
            formMessage.classList.add("success");
            formMessage.style.display = "block";

            contactForm.reset();
            // grecaptcha.reset(); // ✅ Reset reCAPTCHA after success
        })
        .catch((error) => {
            console.error("EmailJS Error:", error);

            const errorDetail = error?.text || error?.message || JSON.stringify(error);
            formMessage.textContent = `❌ Failed: ${errorDetail}`;
            formMessage.classList.add("error");
            formMessage.style.display = "block";

            // grecaptcha.reset(); // ✅ Reset reCAPTCHA on error too
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

// ===================================
// BACK TO TOP BUTTON
// ===================================

const backToTop = document.querySelector('.back-to-top');


backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// SMOOTH SCROLL FOR ALL LINKS
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const offsetTop = target.offsetTop - 70;

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
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

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');

    if (heroImage && scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

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
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#6366f1'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.5,
                random: false
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#6366f1',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
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
// CONSOLE MESSAGE
// ===================================

console.log('%c👋 Hey there! Welcome to my portfolio!',
    'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cLooking for talented developers? Let\'s connect!',
    'color: #8b5cf6; font-size: 14px;');
