// Theme Toggle
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
const themeIcon = themeToggle.querySelector("i");

updateThemeIcon();

themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-theme");
    const isDark = body.classList.contains("dark-theme");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    updateThemeIcon();
});

function updateThemeIcon() {
    const isDark = body.classList.contains("dark-theme");
    themeIcon.className = isDark ? "bx bx-sun" : "bx bx-moon";
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    });
});

// Active navigation highlighting
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveNav() {
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute("id");

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach((link) => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${sectionId}`) {
                    link.classList.add("active");
                }
            });
        }
    });
}

window.addEventListener("scroll", updateActiveNav);

// Header background on scroll
const header = document.querySelector(".header");
window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        header.style.background = body.classList.contains("dark-theme")
            ? "rgba(17, 24, 39, 0.95)"
            : "rgba(255, 255, 255, 0.95)";
    } else {
        header.style.background = body.classList.contains("dark-theme")
            ? "rgba(17, 24, 39, 0.9)"
            : "rgba(255, 255, 255, 0.9)";
    }
});

// Initialize Swiper
const swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
            spaceBetween: 40,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 50,
        },
    },
});

ScrollReveal({
    reset: false,
    distance: "60px",
    duration: 1000,
    delay: 200,
});

ScrollReveal().reveal(".hero-content", { origin: "left" });
ScrollReveal().reveal(".hero-visual", { origin: "right" });
ScrollReveal().reveal(".section-header", { origin: "top" });
ScrollReveal().reveal(".skill-card", { origin: "bottom", interval: 200 });
ScrollReveal().reveal(".project-card", { origin: "bottom", interval: 200 });
ScrollReveal().reveal(".about-content", { origin: "left" });
ScrollReveal().reveal(".about-image", { origin: "right" });
ScrollReveal().reveal(".contact-form", { origin: "left" });
ScrollReveal().reveal(".contact-info", { origin: "right" });

document
    .querySelector(".contact-form form")
    .addEventListener("submit", function (e) {
        e.preventDefault();
        const form = this;
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';

        fetch(form.action, {
            method: form.method,
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                submitBtn.innerHTML = '<i class="bx bx-check"></i> Message Sent!';
                submitBtn.classList.add("btn-success");
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.classList.remove("btn-success");
                    form.reset();
                }, 3000);
            } else {
                submitBtn.innerHTML = '<i class="bx bx-x"></i> Error!';
                submitBtn.classList.add("btn-error");
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.classList.remove("btn-error");
                }, 3000);
            }
        }).catch(error => {
            submitBtn.innerHTML = '<i class="bx bx-x"></i> Error!';
            submitBtn.classList.add("btn-error");
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.classList.remove("btn-error");
            }, 3000);
        });
    });

// Mobile menu functionality (basic implementation)
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const navMenu = document.querySelector(".nav-menu");

mobileMenuToggle.addEventListener("click", () => {
    navMenu.style.display = navMenu.style.display === "flex" ? "none" : "flex";
});

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
            navMenu.style.display = "none";
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
    if (
        window.innerWidth <= 768 &&
        navMenu.style.display === "flex" &&
        !navMenu.contains(e.target) &&
        !mobileMenuToggle.contains(e.target)
    ) {
        navMenu.style.display = "none";
    }
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        navMenu.style.display = "";
    }
});

// Set current year in footer
const yearElement = document.getElementById("current-year");
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}
