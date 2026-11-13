
/* =========================================
   SHUBHAM'S PERSONAL PORTFOLIO
   File: script.js
   Purpose: Website interactions and effects
========================================= */

// Wait until the HTML document is fully loaded
document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // 1. MOBILE NAVIGATION MENU
    // =====================================

    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    // Check whether both navigation elements exist
    if (menuBtn && navLinks) {

        // Open and close the mobile navigation menu
        menuBtn.addEventListener("click", function () {

            navLinks.classList.toggle("active");

            // Update accessibility information
            const isOpen = navLinks.classList.contains("active");
            menuBtn.setAttribute("aria-expanded", isOpen);

        });

        // Close the menu after clicking a navigation link
        navLinks.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.classList.remove("active");
                menuBtn.setAttribute("aria-expanded", "false");

            });

        });

        // Close the menu when Escape is pressed
        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {
                navLinks.classList.remove("active");
                menuBtn.setAttribute("aria-expanded", "false");
            }

        });
    }


    // =====================================
    // 2. SMOOTH SCROLLING
    // =====================================

    // Select all navigation links that point to page sections
    const sectionLinks = document.querySelectorAll(
        '.nav-links a[href^="#"]'
    );

    sectionLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");
            const targetSection = document.querySelector(targetId);

            // Scroll only if the target section exists
            if (targetSection) {

                event.preventDefault();

                targetSection.scrollIntoView({
                    behavior: window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches ? "auto" : "smooth"
                });

            }

        });

    });


    // =====================================
    // 3. ACTIVE NAVIGATION LINK
    // =====================================

    const sections = document.querySelectorAll(
        "section[id]"
    );

    const navigationItems = document.querySelectorAll(
        ".nav-links a[href^='#']"
    );

    // Highlight the navigation link for the visible section
    if ("IntersectionObserver" in window) {

        const sectionObserver = new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        const currentId = entry.target.id;

                        navigationItems.forEach(function (link) {

                            const isActive =
                                link.getAttribute("href") === "#" + currentId;

                            link.classList.toggle("active", isActive);

                            if (isActive) {
                                link.setAttribute("aria-current", "location");
                            } else {
                                link.removeAttribute("aria-current");
                            }

                        });

                    }

                });

            },
            {
                threshold: 0.35
            }
        );

        // Observe every section on the page
        sections.forEach(function (section) {
            sectionObserver.observe(section);
        });

    }

});
