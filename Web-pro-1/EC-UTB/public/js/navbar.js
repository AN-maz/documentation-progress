document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const navbarContainer = document.getElementById("navbar-container");
  const logo = document.getElementById("logo");

  if (!navbar) return;

  function isMobile() {
    return window.innerWidth < 768;
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
