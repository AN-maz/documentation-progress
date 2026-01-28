document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const navbarContainer = document.getElementById("navbar-container");
  const logo = document.getElementById("logo");
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-link");
  const burgerLines = document.querySelectorAll(".burger-line");
  const menuItemDivider = document.getElementById("menu-item-divider");
  const menuItemLogin = document.getElementById("menu-item-2");

  if (!navbar) return;

  function isMobile() {
    return window.innerWidth < 768;
  }

  // Toggle Mobile Menu
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.contains("max-h-screen");

      // Toggle Menu Visibility
      if (isOpen) {
        mobileMenu.classList.remove("max-h-screen", "opacity-100");
        mobileMenu.classList.add("max-h-0");
        document.body.classList.remove("overflow-hidden");
      } else {
        mobileMenu.classList.add("max-h-screen", "opacity-100");
        mobileMenu.classList.remove("max-h-0");
        document.body.classList.add("overflow-hidden");
      }

      // Animate Burger Icon
      burgerLines[0].classList.toggle("rotate-45");
      burgerLines[0].classList.toggle("translate-y-[9px]");
      
      burgerLines[1].classList.toggle("opacity-0");
      
      burgerLines[2].classList.toggle("-rotate-45");
      burgerLines[2].classList.toggle("-translate-y-[9px]");
      burgerLines[2].classList.toggle("w-8"); // Make third line full width when X

      // Animate Menu Items
      const delayBase = isOpen ? 0 : 300; // Delay start if opening
      
      // Links
      mobileLinks.forEach((link, index) => {
        setTimeout(() => {
          link.classList.toggle("opacity-0");
          link.classList.toggle("translate-y-4");
        }, delayBase + (index * 100));
      });

      // Divider & Login
      setTimeout(() => {
        if (menuItemDivider) {
          menuItemDivider.classList.toggle("opacity-0");
          menuItemDivider.classList.toggle("translate-y-4");
        }
      }, delayBase + 200);

      setTimeout(() => {
        if (menuItemLogin) {
          menuItemLogin.classList.toggle("opacity-0");
          menuItemLogin.classList.toggle("translate-y-4");
        }
      }, delayBase + 300);
    });
  }

  window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
      navbar.classList.remove("bg-transparent");
      navbar.classList.add("bg-ec-blue/90", "backdrop-blur-md", "shadow-lg");

      if (!isMobile()) {
        navbarContainer.classList.remove("py-6");
        navbarContainer.classList.add("py-4");

        logo.classList.add("scale-90");
      }
    } else {
      navbar.classList.remove("bg-ec-blue/90", "backdrop-blur-md", "shadow-lg");
      navbar.classList.add("bg-transparent");

      if (!isMobile()) {
        navbarContainer.classList.remove("py-4");
        navbarContainer.classList.add("py-6");

        logo.classList.remove("scale-90");
      }
    }
  });
});
