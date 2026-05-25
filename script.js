const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

window.addEventListener("mousemove", (e) => {

    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, {
        duration: 300,
        fill: "forwards"
    });

});

const hoverElements = document.querySelectorAll(
    "a, button, .project-card, .skill-card"
);

hoverElements.forEach((element) => {

    element.addEventListener("mouseenter", () => {

        cursorOutline.style.transform = "translate(-50%, -50%) scale(1.8)";
        cursorOutline.style.background =
            "rgba(56, 189, 248, 0.15)";

    });

    element.addEventListener("mouseleave", () => {

        cursorOutline.style.transform = "translate(-50%, -50%) scale(1)";
        cursorOutline.style.background = "transparent";

    });

});

const texts = [
    "AI & Data Science Student",
    "Frontend Developer",
    "Machine Learning Enthusiast",
    "Future AI Engineer"
];

let count = 0;
let index = 0;
let currentText = "";
let letter = "";

(function type() {

    if (count === texts.length) {
        count = 0;
    }

    currentText = texts[count];
    letter = currentText.slice(0, ++index);

    document.querySelector(".typing").textContent = letter;

    if (letter.length === currentText.length) {

        count++;
        index = 0;

        setTimeout(type, 1800);

    } else {

        setTimeout(type, 100);

    }

})();

window.addEventListener("scroll", reveal);

function reveal() {

    const reveals = document.querySelectorAll(".reveal");

    for (let i = 0; i < reveals.length; i++) {

        const windowHeight = window.innerHeight;
        const revealTop =
            reveals[i].getBoundingClientRect().top;

        const revealPoint = 120;

        if (revealTop < windowHeight - revealPoint) {

            reveals[i].classList.add("active");

        }

    }

}

const menuToggle =
    document.getElementById("menu-toggle");

const navLinks =
    document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});

document.querySelectorAll(".nav-links a")
    .forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

        });

    });

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.clientHeight;

        if (pageYOffset >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navItems.forEach(a => {

        a.classList.remove("active-link");

        if (a.getAttribute("href") === `#${current}`) {

            a.classList.add("active-link");

        }

    });

});