/* =========================================================
   NEXORA — JAVASCRIPT
   ========================================================= */

"use strict";


/* =========================
   HELPERS
   ========================= */

const $ = (selector, parent = document) =>
    parent.querySelector(selector);

const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];


/* =========================
   HEADER SCROLL
   ========================= */

const header = $("#header");

const handleHeaderScroll = () => {

    if (window.scrollY > 30) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

};

window.addEventListener(
    "scroll",
    handleHeaderScroll,
    { passive: true }
);

handleHeaderScroll();


/* =========================
   MOBILE MENU
   ========================= */

const menuToggle = $("#menuToggle");
const mobileNav = $("#mobileNav");

menuToggle.addEventListener("click", () => {

    const isOpen =
        menuToggle.classList.toggle("active");

    mobileNav.classList.toggle(
        "show",
        isOpen
    );

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

});


$$(".mobile-nav a").forEach(link => {

    link.addEventListener("click", () => {

        menuToggle.classList.remove("active");

        mobileNav.classList.remove("show");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    });

});


/* Close menu with Escape */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        menuToggle.classList.remove("active");

        mobileNav.classList.remove("show");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }

});


/* =========================
   ACTIVE NAV LINK
   ========================= */

const sections = $$("main section[id]");
const navLinks = $$(".nav-link");

const updateActiveNav = () => {

    const scrollPosition =
        window.scrollY + 150;

    let currentSection = "home";

    sections.forEach(section => {

        const top = section.offsetTop;
        const height = section.offsetHeight;

        if (
            scrollPosition >= top &&
            scrollPosition < top + height
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        const href = link.getAttribute("href");

        link.classList.toggle(
            "active",
            href === `#${currentSection}`
        );

    });

};

window.addEventListener(
    "scroll",
    updateActiveNav,
    { passive: true }
);

updateActiveNav();


/* =========================
   THEME
   ========================= */

const themeToggle = $("#themeToggle");
const themeIcon = $(".theme-icon");

const savedTheme =
    localStorage.getItem("nexora-theme");

if (savedTheme === "light") {

    document.body.classList.add("light");

    themeIcon.textContent = "☾";

}


themeToggle.addEventListener("click", () => {

    const isLight =
        document.body.classList.toggle("light");

    localStorage.setItem(
        "nexora-theme",
        isLight ? "light" : "dark"
    );

    themeIcon.textContent =
        isLight ? "☾" : "☼";

});


/* =========================
   REVEAL ON SCROLL
   ========================= */

const revealElements =
    $$(".reveal");

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: .12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================
   COUNTERS
   ========================= */

const counters =
    $$("[data-counter]");

let countersStarted = false;

const animateCounter = element => {

    const target =
        Number(
            element.dataset.counter
        );

    const duration = 1400;

    const startTime =
        performance.now();

    const update = currentTime => {

        const elapsed =
            currentTime - startTime;

        const progress =
            Math.min(
                elapsed / duration,
                1
            );

        const eased =
            1 - Math.pow(
                1 - progress,
                3
            );

        const value =
            Math.floor(
                target * eased
            );

        element.textContent =
            value.toLocaleString("en-US");

        if (progress < 1) {

            requestAnimationFrame(update);

        } else {

            element.textContent =
                target.toLocaleString("en-US");

        }

    };

    requestAnimationFrame(update);

};


const statsObserver =
    new IntersectionObserver(
        entries => {

            if (
                entries.some(
                    entry => entry.isIntersecting
                ) &&
                !countersStarted
            ) {

                countersStarted = true;

                counters.forEach(
                    animateCounter
                );

                statsObserver.disconnect();

            }

        },
        {
            threshold: .3
        }
    );


const statsSection =
    $(".stats-section");

statsObserver.observe(statsSection);


/* =========================
   SERVICES DATA
   ========================= */

const servicesData = {

    design: {

        label: "UI / UX DESIGN",

        title: "التصميم الذي يخدم <span>الهدف.</span>",

        description:
            "نبدأ من المشكلة قبل أن نبدأ من الشكل. يتم بناء كل شاشة حول مسار استخدام منطقي يساعد الزائر على فهم المنتج والتفاعل معه بدون تعقيد.",

        tags: [
            "Wireframes",
            "Design Systems",
            "Responsive UI",
            "Micro Interactions"
        ],

        number: "01"

    },


    development: {

        label: "WEB DEVELOPMENT",

        title: "كود نظيف. تجربة <span>سريعة.</span>",

        description:
            "تحويل التصميم إلى واجهة ويب حقيقية باستخدام HTML وCSS وJavaScript مع فصل واضح بين الهيكل والتنسيق والمنطق البرمجي.",

        tags: [
            "HTML5",
            "CSS3",
            "JavaScript",
            "Responsive"
        ],

        number: "02"

    },


    optimization: {

        label: "PERFORMANCE",

        title: "كل ميلي ثانية لها <span>قيمة.</span>",

        description:
            "مراجعة بنية الصفحة والموارد والأنماط والحركات بهدف الحصول على تجربة أكثر سرعة واستقرارًا على الشبكات والأجهزة المختلفة.",

        tags: [
            "Page Speed",
            "Optimization",
            "Clean CSS",
            "Lazy Loading"
        ],

        number: "03"

    },


    strategy: {

        label: "DIGITAL STRATEGY",

        title: "نبني الخطة قبل أن نبني <span>المنتج.</span>",

        description:
            "تحديد الجمهور، الأهداف، المحتوى، هيكل الصفحات، ومسار المستخدم قبل الانتقال إلى التصميم والتطوير.",

        tags: [
            "UX Strategy",
            "Information Architecture",
            "Content Flow",
            "User Journey"
        ],

        number: "04"

    }

};


const serviceCards =
    $$(".service-card");

const serviceDetail =
    $("#serviceDetail");


const renderService = serviceKey => {

    const data =
        servicesData[serviceKey];

    if (!data) return;

    serviceDetail.innerHTML = `

        <span class="detail-label">
            ${data.label}
        </span>

        <h3>
            ${data.title}
        </h3>

        <p>
            ${data.description}
        </p>

        <div class="detail-tags">

            ${data.tags
                .map(
                    tag =>
                        `<span>${tag}</span>`
                )
                .join("")
            }

        </div>

    `;


    const detailNumber =
        $(".detail-number");

    if (detailNumber) {

        detailNumber.textContent =
            data.number;

    }

};


serviceCards.forEach(card => {

    card.addEventListener("click", () => {

        serviceCards.forEach(
            item =>
                item.classList.remove("active")
        );

        card.classList.add("active");

        renderService(
            card.dataset.service
        );

        serviceDetail.animate(
            [
                {
                    opacity: 0,
                    transform:
                        "translateY(7px)"
                },
                {
                    opacity: 1,
                    transform:
                        "translateY(0)"
                }
            ],
            {
                duration: 280,
                easing: "ease-out"
            }
        );

    });

});


/* =========================
   CONTACT FORM
   ========================= */

const contactForm =
    $("#contactForm");

const formMessage =
    $("#formMessage");


contactForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();

        const name =
            $("#name").value.trim();

        const email =
            $("#email").value.trim();

        const service =
            $("#service").value;

        const message =
            $("#message").value.trim();


        formMessage.classList.remove(
            "error"
        );


        /* Validation */

        if (name.length < 2) {

            formMessage.classList.add(
                "error"
            );

            formMessage.textContent =
                "اكتب الاسم بشكل صحيح.";

            $("#name").focus();

            return;

        }


        if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
                .test(email)
        ) {

            formMessage.classList.add(
                "error"
            );

            formMessage.textContent =
                "اكتب بريدًا إلكترونيًا صحيحًا.";

            $("#email").focus();

            return;

        }


        if (!service) {

            formMessage.classList.add(
                "error"
            );

            formMessage.textContent =
                "اختر نوع المشروع.";

            $("#service").focus();

            return;

        }


        if (message.length < 12) {

            formMessage.classList.add(
                "error"
            );

            formMessage.textContent =
                "اكتب بعض التفاصيل عن المشروع.";

            $("#message").focus();

            return;

        }


        /* Demo submission */

        formMessage.textContent =
            `تم استلام طلبك يا ${name}. هذه الواجهة جاهزة للربط مع API أو Backend عند الإطلاق.`;

        contactForm.reset();

    }
);


/* =========================
   YEAR
   ========================= */

$("#year").textContent =
    new Date().getFullYear();


/* =========================
   MAGNETIC BUTTON EFFECT
   ========================= */

const magneticElements =
    $$(".btn, .nav-cta, .submit-btn");


magneticElements.forEach(element => {

    element.addEventListener(
        "mousemove",
        event => {

            if (
                window.innerWidth < 800
            ) return;

            const rect =
                element.getBoundingClientRect();

            const x =
                event.clientX -
                rect.left -
                rect.width / 2;

            const y =
                event.clientY -
                rect.top -
                rect.height / 2;

            element.style.transform =
                `translate(${x * .08}px, ${y * .08}px)`;

        }
    );


    element.addEventListener(
        "mouseleave",
        () => {

            element.style.transform = "";

        }
    );

});


/* =========================
   HERO TILT
   ========================= */

const heroVisual =
    $(".hero-visual");

const visualCard =
    $(".visual-card");


heroVisual.addEventListener(
    "mousemove",
    event => {

        if (
            window.innerWidth < 800
        ) return;

        const rect =
            heroVisual.getBoundingClientRect();

        const x =
            (event.clientX - rect.left) /
            rect.width;

        const y =
            (event.clientY - rect.top) /
            rect.height;

        const rotateY =
            -5 + (x * 8);

        const rotateX =
            3 - (y * 6);

        visualCard.style.transform =
            `
            perspective(1200px)
            rotateY(${rotateY}deg)
            rotateX(${rotateX}deg)
            translateY(-3px)
            `;

    }
);


heroVisual.addEventListener(
    "mouseleave",
    () => {

        visualCard.style.transform =
            `
            perspective(1200px)
            rotateY(-5deg)
            rotateX(3deg)
            `;

    }
);
