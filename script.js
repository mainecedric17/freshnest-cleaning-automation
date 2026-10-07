/* ==========================================
   FRESHNEST
   Website + GoHighLevel Automation Demo
========================================== */


/* ==========================================
   ELEMENTS
========================================== */

const body = document.body;

const header = document.querySelector("#header");

const scrollProgress =
    document.querySelector("#scrollProgress");

const themeToggle =
    document.querySelector("#themeToggle");

const menuToggle =
    document.querySelector("#menuToggle");

const navLinks =
    document.querySelector("#navLinks");

const floatingQuote =
    document.querySelector("#floatingQuote");

const backToTop =
    document.querySelector("#backToTop");

const currentYear =
    document.querySelector("#currentYear");


/* ==========================================
   CURRENT YEAR
========================================== */

currentYear.textContent =
    new Date().getFullYear();


/* ==========================================
   DARK MODE
========================================== */

const savedTheme =
    localStorage.getItem("freshnest-theme");


if (savedTheme === "dark") {

    body.classList.add("dark");

    themeToggle.textContent = "☀";

}


themeToggle.addEventListener("click", () => {

    body.classList.toggle("dark");

    const darkMode =
        body.classList.contains("dark");


    themeToggle.textContent =
        darkMode ? "☀" : "☾";


    localStorage.setItem(
        "freshnest-theme",
        darkMode ? "dark" : "light"
    );

});


/* ==========================================
   MOBILE MENU
========================================== */

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("open");

    body.classList.toggle("menu-open");


    const open =
        navLinks.classList.contains("open");


    menuToggle.textContent =
        open ? "×" : "☰";

});


document
    .querySelectorAll(".nav-links a")
    .forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("open");

            body.classList.remove("menu-open");

            menuToggle.textContent = "☰";

        });

    });


/* ==========================================
   HEADER + SCROLL PROGRESS
========================================== */

window.addEventListener("scroll", () => {

    const scrollTop =
        window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;


    const progress =
        documentHeight > 0
            ? (scrollTop / documentHeight) * 100
            : 0;


    scrollProgress.style.width =
        `${progress}%`;


    header.classList.toggle(
        "scrolled",
        scrollTop > 30
    );


    floatingQuote.classList.toggle(
        "show",
        scrollTop > 600
    );


    backToTop.classList.toggle(
        "show",
        scrollTop > 900
    );

});


/* ==========================================
   BACK TO TOP
========================================== */

backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* ==========================================
   SCROLL REVEAL
========================================== */

const revealElements =
    document.querySelectorAll(".reveal");


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
            threshold: 0.12
        }

    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* ==========================================
   CLEANING COST ESTIMATOR
========================================== */

const propertyType =
    document.querySelector("#propertyType");

const cleaningType =
    document.querySelector("#cleaningType");

const bedroomDisplay =
    document.querySelector("#bedrooms");

const bathroomDisplay =
    document.querySelector("#bathrooms");

const priceMin =
    document.querySelector("#priceMin");

const priceMax =
    document.querySelector("#priceMax");

const estimateSummary =
    document.querySelector("#estimateSummary");

const addonCheckboxes =
    document.querySelectorAll(".addon");


let bedrooms = 2;
let bathrooms = 1;


/* FORMAT PESO */

function formatPeso(value) {

    return new Intl.NumberFormat(
        "en-PH",
        {
            style: "currency",
            currency: "PHP",
            maximumFractionDigits: 0
        }
    ).format(value);

}


/* CALCULATE PRICE */

function calculateEstimate() {

    const propertyAdjustment =
        Number(propertyType.value);

    const serviceBase =
        Number(cleaningType.value);


    let total =
        serviceBase +
        propertyAdjustment;


    /* Extra bedrooms */

    if (bedrooms > 1) {

        total +=
            (bedrooms - 1) * 300;

    }


    /* Extra bathrooms */

    if (bathrooms > 1) {

        total +=
            (bathrooms - 1) * 250;

    }


    /* Add-ons */

    addonCheckboxes.forEach(addon => {

        if (addon.checked) {

            total += Number(addon.value);

        }

    });


    /*
        Prevent estimate from becoming
        unrealistically low
    */

    total = Math.max(total, 900);


    const lowerEstimate = total;

    const upperEstimate =
        total + Math.max(
            400,
            Math.round(total * 0.18)
        );


    priceMin.textContent =
        formatPeso(lowerEstimate);

    priceMax.textContent =
        formatPeso(upperEstimate);


    const serviceName =
        cleaningType
            .options[
                cleaningType.selectedIndex
            ]
            .text
            .trim();


    estimateSummary.textContent =
        `${serviceName} · ` +
        `${bedrooms} ` +
        `${bedrooms === 1
            ? "Bedroom"
            : "Bedrooms"} · ` +
        `${bathrooms} ` +
        `${bathrooms === 1
            ? "Bathroom"
            : "Bathrooms"}`;

}


/* COUNTERS */

document
    .querySelectorAll(".counter-btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const target =
                    button.dataset.target;

                const action =
                    button.dataset.action;


                if (target === "bedrooms") {

                    if (
                        action === "plus" &&
                        bedrooms < 8
                    ) {

                        bedrooms++;

                    }


                    if (
                        action === "minus" &&
                        bedrooms > 1
                    ) {

                        bedrooms--;

                    }


                    bedroomDisplay.textContent =
                        bedrooms;

                }


                if (target === "bathrooms") {

                    if (
                        action === "plus" &&
                        bathrooms < 6
                    ) {

                        bathrooms++;

                    }


                    if (
                        action === "minus" &&
                        bathrooms > 1
                    ) {

                        bathrooms--;

                    }


                    bathroomDisplay.textContent =
                        bathrooms;

                }


                calculateEstimate();

            }
        );

    });


propertyType.addEventListener(
    "change",
    calculateEstimate
);


cleaningType.addEventListener(
    "change",
    calculateEstimate
);


addonCheckboxes.forEach(addon => {

    addon.addEventListener(
        "change",
        calculateEstimate
    );

});


calculateEstimate();


/* ==========================================
   BEFORE / AFTER SLIDER
========================================== */

const comparison =
    document.querySelector("#comparison");

const afterLayer =
    document.querySelector("#afterLayer");

const comparisonSlider =
    document.querySelector("#comparisonSlider");


let isDragging = false;


function updateComparison(clientX) {

    const rect =
        comparison.getBoundingClientRect();


    let position =
        clientX - rect.left;


    position =
        Math.max(
            0,
            Math.min(position, rect.width)
        );


    const percentage =
        (position / rect.width) * 100;


    afterLayer.style.width =
        `${percentage}%`;


    comparisonSlider.style.left =
        `${percentage}%`;

}


comparison.addEventListener(
    "mousedown",
    event => {

        isDragging = true;

        updateComparison(event.clientX);

    }
);


window.addEventListener(
    "mousemove",
    event => {

        if (!isDragging) return;

        updateComparison(event.clientX);

    }
);


window.addEventListener(
    "mouseup",
    () => {

        isDragging = false;

    }
);


/* Touch support */

comparison.addEventListener(
    "touchstart",
    event => {

        isDragging = true;

        updateComparison(
            event.touches[0].clientX
        );

    },
    {
        passive: true
    }
);


comparison.addEventListener(
    "touchmove",
    event => {

        if (!isDragging) return;

        updateComparison(
            event.touches[0].clientX
        );

    },
    {
        passive: true
    }
);


comparison.addEventListener(
    "touchend",
    () => {

        isDragging = false;

    }
);


/* Click anywhere */

comparison.addEventListener(
    "click",
    event => {

        updateComparison(
            event.clientX
        );

    }
);


/* ==========================================
   TESTIMONIAL CAROUSEL
========================================== */

/*
    These are intentionally sample testimonials
    because FreshNest is a demo project.
*/

const testimonials = [

    {
        name: "Sample Customer A",

        initials: "A",

        text:
            "The quote process was simple and easy to understand. I could submit everything I needed without going through multiple steps."
    },

    {
        name: "Sample Customer B",

        initials: "B",

        text:
            "I liked being able to choose the service and preferred date directly from the website. The overall experience felt straightforward."
    },

    {
        name: "Sample Customer C",

        initials: "C",

        text:
            "The online process made it clear what happens after submitting a request, which makes the experience feel more organized."
    }

];


const testimonialText =
    document.querySelector(
        "#testimonialText"
    );

const testimonialName =
    document.querySelector(
        "#testimonialName"
    );

const testimonialAvatar =
    document.querySelector(
        "#testimonialAvatar"
    );

const testimonialDots =
    document.querySelector(
        "#testimonialDots"
    );

const testimonialPrev =
    document.querySelector(
        "#testimonialPrev"
    );

const testimonialNext =
    document.querySelector(
        "#testimonialNext"
    );


let testimonialIndex = 0;


/* CREATE DOTS */

testimonials.forEach(
    (_, index) => {

        const dot =
            document.createElement(
                "button"
            );


        dot.classList.add(
            "testimonial-dot"
        );


        dot.setAttribute(
            "aria-label",
            `Show testimonial ${index + 1}`
        );


        dot.addEventListener(
            "click",
            () => {

                testimonialIndex =
                    index;

                renderTestimonial();

            }
        );


        testimonialDots.appendChild(
            dot
        );

    }
);


/* RENDER TESTIMONIAL */

function renderTestimonial() {

    const testimonial =
        testimonials[
            testimonialIndex
        ];


    testimonialText.textContent =
        testimonial.text;

    testimonialName.textContent =
        testimonial.name;

    testimonialAvatar.textContent =
        testimonial.initials;


    document
        .querySelectorAll(
            ".testimonial-dot"
        )
        .forEach(
            (dot, index) => {

                dot.classList.toggle(
                    "active",
                    index === testimonialIndex
                );

            }
        );

}


testimonialNext.addEventListener(
    "click",
    () => {

        testimonialIndex =
            (
                testimonialIndex + 1
            ) % testimonials.length;


        renderTestimonial();

    }
);


testimonialPrev.addEventListener(
    "click",
    () => {

        testimonialIndex =
            (
                testimonialIndex -
                1 +
                testimonials.length
            ) % testimonials.length;


        renderTestimonial();

    }
);


renderTestimonial();


/* ==========================================
   FAQ ACCORDION
========================================== */

const faqItems =
    document.querySelectorAll(
        ".faq-item"
    );


faqItems.forEach(item => {

    const button =
        item.querySelector(
            ".faq-question"
        );

    const answer =
        item.querySelector(
            ".faq-answer"
        );


    button.addEventListener(
        "click",
        () => {

            const alreadyOpen =
                item.classList.contains(
                    "active"
                );


            /*
                Close other FAQs
            */

            faqItems.forEach(
                otherItem => {

                    otherItem.classList.remove(
                        "active"
                    );


                    const otherAnswer =
                        otherItem.querySelector(
                            ".faq-answer"
                        );


                    otherAnswer.style.maxHeight =
                        null;

                }
            );


            /*
                Open selected FAQ
            */

            if (!alreadyOpen) {

                item.classList.add(
                    "active"
                );


                answer.style.maxHeight =
                    answer.scrollHeight +
                    "px";

            }

        }
    );

});


/* ==========================================
   ANIMATED METRICS
========================================== */

const statCounters =
    document.querySelectorAll(
        ".counter-stat"
    );


const statsObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }


                const element =
                    entry.target;

                const target =
                    Number(
                        element.dataset.count
                    );


                let current = 0;


                const interval =
                    setInterval(
                        () => {

                            current++;

                            element.textContent =
                                current;


                            if (
                                current >= target
                            ) {

                                clearInterval(
                                    interval
                                );

                            }

                        },
                        150
                    );


                statsObserver.unobserve(
                    element
                );

            });

        },

        {
            threshold: 0.5
        }

    );


statCounters.forEach(counter => {

    statsObserver.observe(counter);

});


/* ==========================================
   ACTIVE NAVIGATION SECTION
========================================== */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );


const navigationLinks =
    document.querySelectorAll(
        ".nav-links a[href^='#']"
    );


const navigationObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }


                navigationLinks.forEach(
                    link => {

                        link.classList.remove(
                            "active-link"
                        );

                    }
                );


                const activeLink =
                    document.querySelector(
                        `.nav-links a[href="#${entry.target.id}"]`
                    );


                if (activeLink) {

                    activeLink.classList.add(
                        "active-link"
                    );

                }

            });

        },

        {
            rootMargin:
                "-40% 0px -50% 0px"
        }

    );


sections.forEach(section => {

    navigationObserver.observe(section);

});


/* ==========================================
   ESCAPE KEY CLOSES MENU
========================================== */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            navLinks.classList.remove(
                "open"
            );

            body.classList.remove(
                "menu-open"
            );

            menuToggle.textContent =
                "☰";

        }

    }
);