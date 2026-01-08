// JavaScript extracted from index.html

// --- 1. Theme Toggling Logic ---
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;
const htmlElement = document.documentElement;

// Check Local Storage or System Preference
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

if ((savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) && htmlElement) {
    htmlElement.setAttribute('data-theme', 'dark');
    if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Switch Icon
        if (themeIcon) {
            if (newTheme === 'dark') {
                themeIcon.classList.replace('fa-moon', 'fa-sun');
            } else {
                themeIcon.classList.replace('fa-sun', 'fa-moon');
            }
        }
    });
}

// --- 2. Mobile Menu Logic ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

function toggleMenu() {
    if (window.innerWidth <= 768 && navLinks && hamburger) {
        navLinks.classList.toggle('open');
        // Toggle icon shape
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('open')) {
            if (icon) icon.classList.replace('fa-bars', 'fa-times');
        } else {
            if (icon) icon.classList.replace('fa-times', 'fa-bars');
        }
    }
}

if (hamburger) hamburger.addEventListener('click', toggleMenu);

// --- 3. Scroll Animation (Intersection Observer) ---
// Simulates Framer Motion "whileInView"
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Optional: Stop observing once revealed
            // observer.unobserve(entry.target); 
        }
    });
}, {
    root: null,
    threshold: 0.15, // Trigger when 15% visible
    rootMargin: "0px"
});

revealElements.forEach(el => revealObserver.observe(el));

// --- 4. Contact Form Handling & Toast ---
const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('toast');
const toastMsg = document.getElementById('toastMsg');
let toastTimeout;

function showToast(message) {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.classList.add('show');
    
    // Clear existing timeout if multiple toasts trigger quickly
    clearTimeout(toastTimeout);
    
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate form submission
        const btn = contactForm.querySelector('button');
        const originalText = btn ? btn.textContent : '';
        
        if (btn) {
            btn.textContent = 'Sending...';
            btn.disabled = true;
        }

        setTimeout(() => {
            showToast('Thanks for contacting Karthik!');
            contactForm.reset();
            if (btn) {
                btn.textContent = originalText;
                btn.disabled = false;
            }
        }, 1500);
    });
}
