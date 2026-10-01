
document.addEventListener("DOMContentLoaded", function () {

    console.log("Portfolio JavaScript is running!");

    /* =================================
       1. MOBILE NAVIGATION MENU
    ================================= */

    const menuButton = document.querySelector("#menu-toggle");
    const navMenu = document.querySelector("nav ul");

    if (menuButton && navMenu) {

        menuButton.addEventListener("click", function () {

            navMenu.classList.toggle("active");

            const isOpen = navMenu.classList.contains("active");

            menuButton.setAttribute("aria-expanded", isOpen);

        });

        // Close menu after clicking a navigation link
        const navLinks = navMenu.querySelectorAll("a");

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                navMenu.classList.remove("active");

                menuButton.setAttribute("aria-expanded", "false");

            });

        });

    }


    /* =================================
       2. SMOOTH NAVIGATION
    ================================= */

    const pageLinks = document.querySelectorAll('a[href^="#"]');

    pageLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            let targetSection;

            try {
                targetSection = document.querySelector(targetId);
            } catch (error) {
                return;
            }

            if (targetSection) {

                event.preventDefault();

                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =================================
       3. ACTIVE NAVIGATION LINK
    ================================= */

    const sections = document.querySelectorAll("section");
    const navigationLinks = document.querySelectorAll("nav a");

    function updateActiveLink() {

        let currentSection = "";

        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // Highlight the last section when the user reaches the bottom
        if (scrollPosition + windowHeight >= documentHeight - 5) {

            const lastSection = sections[sections.length - 1];

            if (lastSection) {
                currentSection = lastSection.getAttribute("id");
            }

        } else {

            sections.forEach(function (section) {

                const sectionTop = section.offsetTop - 120;
                const sectionHeight = section.offsetHeight;

                if (
                    scrollPosition >= sectionTop &&
                    scrollPosition < sectionTop + sectionHeight
                ) {

                    currentSection = section.getAttribute("id");

                }

            });

        }

        navigationLinks.forEach(function (link) {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + currentSection) {

                link.classList.add("active");

            }

        });

    }

    window.addEventListener("scroll", updateActiveLink);
    window.addEventListener("resize", updateActiveLink);

    updateActiveLink();


    /* =================================
       4. DARK AND LIGHT MODE
    ================================= */

    

    const themeButton = document.querySelector("#theme-toggle");

    if (themeButton) {

        // Restore the saved theme when available
        const savedTheme = localStorage.getItem("portfolio-theme");

        if (savedTheme === "dark") {

            document.body.classList.add("dark-mode");

        }

        function updateThemeButton() {

            const isDark = document.body.classList.contains("dark-mode");

            themeButton.textContent = isDark
                ? "Switch to Light Mode"
                : "Switch to Dark Mode";

            themeButton.setAttribute("aria-pressed", isDark);

        }

        updateThemeButton();

        themeButton.addEventListener("click", function () {

            document.body.classList.toggle("dark-mode");

            const isDark = document.body.classList.contains("dark-mode");

            localStorage.setItem(
                "portfolio-theme",
                isDark ? "dark" : "light"
            );

            updateThemeButton();

        });

    }


    /* =================================
       5. TYPING ANIMATION
    ================================= */

    const typingElement = document.querySelector("#typing-text");

    if (typingElement) {

        const word = "Computer Science Engineer";

        
        let characterIndex = 0;
        

        function typeEffect() {

        if (characterIndex < word.length) {

            typingElement.textContent += word.charAt(characterIndex);
            characterIndex++;

            setTimeout(typeEffect, 120);

        }

    }

            

       
        typingElement.textContent = "";
        typeEffect();

    }


    /* =================================
       6. SCROLL TO TOP BUTTON
    ================================= */

    const topButton = document.querySelector("#back-to-top");

    if (topButton) {

        function toggleTopButton() {

            if (window.scrollY > 300) {

                topButton.classList.add("show");

            } else {

                topButton.classList.remove("show");

            }

        }

        window.addEventListener("scroll", toggleTopButton);

        toggleTopButton();

        topButton.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =================================
       7. UPDATE FOOTER YEAR
    ================================= */

    const yearElement = document.querySelector("#year");

    if (yearElement) {

        yearElement.textContent = new Date().getFullYear();

    }

});

