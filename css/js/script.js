/* =========================================================
   SMART MANAGEMENT
   B.Sc. Information Technology Project

   Student       : Arsath
   Register No.  : RCAS2024BIT035
   College       : Rathinam Global Deemed to be University
   ========================================================= */


document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       1. MOBILE NAVIGATION
    ===================================================== */

    const menuToggle =
        document.getElementById("menuToggle");

    const navLinks =
        document.getElementById("navLinks");


    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                navLinks.classList.toggle("open");


            menuToggle.classList.toggle("active");


            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

        });


        // Close the mobile menu when a navigation
        // link is clicked.
        document
            .querySelectorAll(".nav-link")
            .forEach(link => {

                link.addEventListener("click", () => {

                    navLinks.classList.remove("open");

                    menuToggle.classList.remove(
                        "active"
                    );

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                });

            });

    }


    /* =====================================================
       2. SMOOTH SCROLLING
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(anchor => {

            anchor.addEventListener(
                "click",
                function (event) {

                    const targetId =
                        this.getAttribute("href");


                    // Ignore empty links
                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    // Prevent errors for missing sections
                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });


    /* =====================================================
       3. ACTIVE NAVIGATION LINK
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    const navigationLinks =
        document.querySelectorAll(
            ".nav-link"
        );


    const updateActiveLink = () => {

        let currentSection = "";


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;


            const sectionBottom =
                sectionTop +
                section.offsetHeight;


            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navigationLinks.forEach(link => {

            link.classList.remove("active");


            if (
                link.getAttribute("href") ===
                `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    };


    window.addEventListener(
        "scroll",
        updateActiveLink,
        { passive: true }
    );


    updateActiveLink();


    /* =====================================================
       4. SCROLL REVEAL ANIMATIONS
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if (
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12,

                    rootMargin:
                        "0px 0px -50px 0px"
                }
            );


        revealElements.forEach(element => {

            revealObserver.observe(
                element
            );

        });

    } else {

        // Fallback for older browsers
        revealElements.forEach(element => {

            element.classList.add(
                "visible"
            );

        });

    }


    /* =====================================================
       5. CONTACT FORM VALIDATION
    ===================================================== */

    const contactForm =
        document.getElementById(
            "contactForm"
        );


    const formSuccess =
        document.getElementById(
            "formSuccess"
        );


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const name =
                    document.getElementById(
                        "name"
                    );


                const email =
                    document.getElementById(
                        "email"
                    );


                const message =
                    document.getElementById(
                        "message"
                    );


                let isValid = true;


                // Clear previous errors
                clearError(
                    name,
                    "nameError"
                );


                clearError(
                    email,
                    "emailError"
                );


                clearError(
                    message,
                    "messageError"
                );


                /* -----------------------------------------
                   NAME VALIDATION
                ----------------------------------------- */

                if (
                    name.value.trim().length < 2
                ) {

                    showError(
                        name,
                        "nameError",
                        "Please enter your name."
                    );


                    isValid = false;

                }


                /* -----------------------------------------
                   EMAIL VALIDATION
                ----------------------------------------- */

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (
                    !emailPattern.test(
                        email.value.trim()
                    )
                ) {

                    showError(
                        email,
                        "emailError",
                        "Please enter a valid email address."
                    );


                    isValid = false;

                }


                /* -----------------------------------------
                   MESSAGE VALIDATION
                ----------------------------------------- */

                if (
                    message.value.trim().length < 10
                ) {

                    showError(
                        message,
                        "messageError",
                        "Message must contain at least 10 characters."
                    );


                    isValid = false;

                }


                /* -----------------------------------------
                   SUCCESS
                ----------------------------------------- */

                if (isValid) {

                    formSuccess.classList.add(
                        "show"
                    );


                    contactForm.reset();


                    // Hide the success message
                    // after five seconds.
                    setTimeout(() => {

                        formSuccess.classList.remove(
                            "show"
                        );

                    }, 5000);

                }

            }
        );

    }


    /* =====================================================
       6. FORM ERROR FUNCTIONS
    ===================================================== */

    function showError(
        input,
        errorId,
        message
    ) {

        const errorElement =
            document.getElementById(
                errorId
            );


        const formGroup =
            input.closest(
                ".form-group"
            );


        if (formGroup) {

            formGroup.classList.add(
                "error"
            );

        }


        if (errorElement) {

            errorElement.textContent =
                message;

        }

    }


    function clearError(
        input,
        errorId
    ) {

        const errorElement =
            document.getElementById(
                errorId
            );


        const formGroup =
            input.closest(
                ".form-group"
            );


        if (formGroup) {

            formGroup.classList.remove(
                "error"
            );

        }


        if (errorElement) {

            errorElement.textContent =
                "";

        }

    }


    /* =====================================================
       7. CLEAR ERRORS WHILE TYPING
    ===================================================== */

    [
        "name",
        "email",
        "message"
    ].forEach(fieldId => {

        const field =
            document.getElementById(
                fieldId
            );


        if (!field) {
            return;
        }


        field.addEventListener(
            "input",
            () => {

                const errorId =
                    `${fieldId}Error`;


                clearError(
                    field,
                    errorId
                );

            }
        );

    });


    /* =====================================================
       8. AUTOMATIC COPYRIGHT YEAR
    ===================================================== */

    const currentYear =
        document.getElementById(
            "currentYear"
        );


    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }

});