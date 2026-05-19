// ==================== CUSTOM CURSOR ==================== //
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

let mouseX = 0;
let mouseY = 0;
let outlineX = 0;
let outlineY = 0;
let isMoving = false;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    isMoving = true;
    
    // Immediate cursor dot position
    if (cursorDot) {
        cursorDot.style.left = mouseX + "px";
        cursorDot.style.top = mouseY + "px";
    }
});

// Smooth trailing cursor outline
function animateCursorOutline() {
    if (!isMoving || !cursorOutline) {
        requestAnimationFrame(animateCursorOutline);
        return;
    }
    
    // Easing for smooth trailing effect
    const dx = mouseX - outlineX;
    const dy = mouseY - outlineY;
    
    outlineX += dx * 0.25;
    outlineY += dy * 0.25;
    
    cursorOutline.style.left = outlineX + "px";
    cursorOutline.style.top = outlineY + "px";
    
    requestAnimationFrame(animateCursorOutline);
}

if (window.innerWidth > 768) {
    animateCursorOutline();
}

// Cursor enlargement on hover
const interactiveElements = document.querySelectorAll(".btn, .skill-card, .project-card, .social-link, .nav-link, a");

interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
        if (cursorOutline) {
            cursorOutline.style.width = "60px";
            cursorOutline.style.height = "60px";
            cursorOutline.style.borderWidth = "3px";
        }
    });
    
    element.addEventListener("mouseleave", () => {
        if (cursorOutline) {
            cursorOutline.style.width = "40px";
            cursorOutline.style.height = "40px";
            cursorOutline.style.borderWidth = "2px";
        }
    });
});

// Hide cursor on mobile
if (window.innerWidth <= 768) {
    const cursorContainer = document.querySelector(".cursor-container");
    if (cursorContainer) cursorContainer.style.display = "none";
}

// ==================== TYPING ANIMATION ==================== //
const typingText = document.querySelector(".typing-text");

const texts = [
    "AI & Data Science Student",
    "Frontend Developer",
    "Machine Learning Enthusiast",
    "AI & Web Technology Enthusiast"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeAnimation() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(typeAnimation, 500);
            return;
        }
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeAnimation, 2000);
            return;
        }
    }
    
    setTimeout(typeAnimation, isDeleting ? 50 : 100);
}

typeAnimation();

// ==================== SCROLL REVEAL ANIMATIONS ==================== //
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll(".reveal").forEach((element) => {
    observer.observe(element);
});

// ==================== NAVBAR FUNCTIONALITY ==================== //
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-link");

// Toggle mobile menu
if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        menuToggle.classList.toggle("active");
        navLinks.classList.toggle("active");
    });
}

// Close mobile menu when link is clicked
navItems.forEach((link) => {
    link.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        navLinks.classList.remove("active");
    });
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
    if (!e.target.closest("nav") && !e.target.closest(".menu-toggle")) {
        menuToggle.classList.remove("active");
        navLinks.classList.remove("active");
    }
});

// ==================== ACTIVE NAV LINK ON SCROLL ==================== //
window.addEventListener("scroll", () => {
    let current = "";
    const sections = document.querySelectorAll("section");
    
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute("id");
        }
    });
    
    navItems.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

// ==================== NAVBAR BLUR ON SCROLL ==================== //
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.style.background = "rgba(10, 14, 39, 0.85)";
        navbar.style.boxShadow = "0 4px 30px rgba(0, 217, 255, 0.1)";
    } else {
        navbar.style.background = "rgba(10, 14, 39, 0.7)";
        navbar.style.boxShadow = "none";
    }
});

// ==================== SMOOTH SCROLL BEHAVIOR ==================== //
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

// ==================== SKILL CARD TILT EFFECT ==================== //
const skillCards = document.querySelectorAll(".skill-card");

skillCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    
    card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
    });
});

// ==================== PARALLAX EFFECT ==================== //
window.addEventListener("scroll", () => {
    const scrollAmount = window.scrollY;
    const parallaxElements = document.querySelectorAll(".glow-orb");
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.05 + index * 0.02;
        element.style.transform = `translateY(${scrollAmount * speed}px)`;
    });
});

// ==================== WINDOW RESIZE HANDLING ==================== //
let resizeTimer;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Recheck if mobile
        if (window.innerWidth <= 768) {
            const cursorContainer = document.querySelector(".cursor-container");
            if (cursorContainer) cursorContainer.style.display = "none";
        } else {
            const cursorContainer = document.querySelector(".cursor-container");
            if (cursorContainer) cursorContainer.style.display = "block";
        }
    }, 250);
});

// ==================== PREVENT CONTEXT MENU ON PRODUCTION ==================== //
// Uncomment below for production
// document.addEventListener('contextmenu', (e) => e.preventDefault());