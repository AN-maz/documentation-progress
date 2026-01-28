document.addEventListener("DOMContentLoaded", () => {

    const navbar = document.getElementById("navbar");
    const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const burgerLines = document.querySelectorAll(".burger-line");

    const menuItems = document.querySelectorAll('#mobile-menu [id^="menu-item-"]'); 
    const divider = document.getElementById("menu-item-divider");

    let isMenuOpen = false;


    // Active State

    function setActiveLink() {
        const currentUrl = window.location.href;
        const navLinks = document.querySelectorAll("nav a");

        navLinks.forEach(link => {
            if (link.href === currentUrl) {
                // A. Menu Desktop
                const spanUnderline = link.querySelector("span");
                if (spanUnderline) {
                    link.classList.add("text-ec-red");
                    link.classList.remove("hover:text-gray-300");
                    spanUnderline.classList.remove("scale-x-0", "origin-right");
                    spanUnderline.classList.add("scale-x-100", "origin-left");
                } 
                // B. Menu Mobile
                else if (link.classList.contains("mobile-link")) {
                    const textSpan = link.querySelector("span:first-child");
                    if (textSpan) {
                        textSpan.classList.add("text-ec-red");
                    }
                }
            }
        });
    }

    setActiveLink();


    // Helper Animasi Item 

    function animateItems(show) {
        if (show) {
            menuItems.forEach((item, index) => {

                item.style.transitionDelay = `${150 + (index * 100)}ms`;
                item.classList.remove("opacity-0", "translate-y-4");
                item.classList.add("opacity-100", "translate-y-0");
            });
            if (divider) {
                 divider.style.transitionDelay = "350ms";
                 divider.classList.remove("opacity-0", "translate-y-4");
                 divider.classList.add("opacity-100", "translate-y-0");
            }
        } else {
            menuItems.forEach((item) => {

                item.style.transitionDelay = "0ms"; 
                item.classList.add("opacity-0", "translate-y-4");
                item.classList.remove("opacity-100", "translate-y-0");
            });
            if (divider) {
                divider.style.transitionDelay = "0ms";
                divider.classList.add("opacity-0", "translate-y-4");
                divider.classList.remove("opacity-100", "translate-y-0");
            }
        }
    }

    // Toggle Menu (Buka/Tutup)
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {

            mobileMenu.style.maxHeight = "100vh"; 
            
            navbar.classList.add("bg-ec-blue");
            navbar.classList.remove("bg-transparent");

            // Animasi Hamburger jadi X 
            burgerLines[0].style.transform = "translateY(9px) rotate(45deg)";
            burgerLines[0].style.backgroundColor = "#ffffff"; 

            burgerLines[1].style.opacity = "0";
            burgerLines[1].style.transform = "translateX(20px)";

            burgerLines[2].style.transform = "translateY(-9px) rotate(-45deg)";
            burgerLines[2].style.width = "32px";
            burgerLines[2].style.backgroundColor = "#ffffff"; 

            // Jalankan animasi item muncul
            setTimeout(() => animateItems(true), 50);

        } else {
            // --- STATE: TUTUP MENU ---
            
            mobileMenu.style.maxHeight = "0";

            if (window.scrollY < 50) {
                navbar.classList.add("bg-transparent");
                navbar.classList.remove("bg-ec-blue");
            }

            burgerLines[0].style.transform = "translateY(0) rotate(0)";
            burgerLines[0].style.backgroundColor = ""; 

            burgerLines[1].style.opacity = "1";
            burgerLines[1].style.transform = "translateX(0)";

            burgerLines[2].style.transform = "translateY(0) rotate(0)";
            burgerLines[2].style.width = "20px";
            burgerLines[2].style.backgroundColor = ""; 

            animateItems(false);
        }
    }


    if (menuBtn) {
        menuBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleMenu();
        });
    }


    document.addEventListener("click", (e) => {
        if (isMenuOpen && !navbar.contains(e.target) && !mobileMenu.contains(e.target)) {
            toggleMenu();
        }
    });

    window.addEventListener("scroll", () => {
        if (!isMenuOpen) {
            if (window.scrollY > 50) {
                navbar.classList.add("bg-ec-blue", "py-3", "shadow-lg");
                navbar.classList.remove("bg-transparent", "py-4");
            } else {
                navbar.classList.add("bg-transparent", "py-4");
                navbar.classList.remove("bg-ec-blue", "py-3", "shadow-lg");
            }
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && isMenuOpen) {
            toggleMenu();
        }
    });
});