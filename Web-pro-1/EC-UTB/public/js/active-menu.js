document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("#nav-menu a");

  let currentPath = window.location.pathname;
  currentPath = currentPath.replace(/\/$/, "");

  // Split path and filter empty parts
  const parts = currentPath.split("/").filter(p => p);
  
  // Find the segment right after "public"
  // e.g., /path/to/public/home -> 'home'
  // e.g., /path/to/public/about/division/xxx -> 'about'
  let currentSegment = "home";
  
  const publicIndex = parts.indexOf("public");
  if (publicIndex !== -1 && publicIndex + 1 < parts.length) {
    currentSegment = parts[publicIndex + 1];
  }

  navLinks.forEach(link => {
    let linkParts = new URL(link.href).pathname
      .replace(/\/$/, "")
      .split("/")
      .filter(p => p);

    let linkSegment = "home";
    const linkPublicIndex = linkParts.indexOf("public");
    if (linkPublicIndex !== -1 && linkPublicIndex + 1 < linkParts.length) {
      linkSegment = linkParts[linkPublicIndex + 1];
    }

    // Match only if segments are equal
    if (linkSegment === currentSegment) {
      const span = link.querySelector("span");

      if (span) {
        span.classList.remove("scale-x-0", "origin-right");
        span.classList.add("scale-x-100", "origin-left");
      }

      link.classList.add("text-ec-red", "font-bold");
    }
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const burgerLines = document.querySelectorAll(".burger-line");
  const mobileMenuLinks = document.querySelectorAll("#mobile-menu a");

  if (!menuBtn || !mobileMenu || burgerLines.length === 0) {
    console.error("Hamburger menu elements not found!");
    return;
  }

  // Function to close mobile menu
  function closeMenu() {
    mobileMenu.classList.remove("max-h-screen");
    mobileMenu.classList.add("max-h-0");

    burgerLines.forEach((line, index) => {
      line.classList.remove("bg-ec-blue");
      line.classList.add("bg-white");
      
      if (index === 0) line.classList.remove("rotate-45", "translate-y-[9px]");
      if (index === 1) line.classList.remove("opacity-0");
      if (index === 2) line.classList.remove("-rotate-45", "-translate-y-[9px]");
    });
  }

  // Function to open mobile menu
  function openMenu() {
    mobileMenu.classList.remove("max-h-0");
    mobileMenu.classList.add("max-h-screen");

    burgerLines.forEach((line, index) => {
      line.classList.remove("bg-white");
      line.classList.add("bg-ec-blue");
      
      if (index === 0) line.classList.add("rotate-45", "translate-y-[9px]");
      if (index === 1) line.classList.add("opacity-0");
      if (index === 2) line.classList.add("-rotate-45", "-translate-y-[9px]");
    });
  }

  // Toggle menu on button click
  menuBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (mobileMenu.classList.contains("max-h-0")) {
      openMenu();
    } else {
      closeMenu();
    }
  });

  // Close menu when clicking on a link
  mobileMenuLinks.forEach(link => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
      if (!mobileMenu.classList.contains("max-h-0")) {
        closeMenu();
      }
    }
  });
});
