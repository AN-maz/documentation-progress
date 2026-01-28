document.addEventListener("DOMContentLoaded", () => {
    
    // -------------------------------------------------------
    // 1. PARALLAX EFFECT (Untuk Hero Section)
    // -------------------------------------------------------
    const parallaxBg = document.getElementById("hero-bg");
    const parallaxContent = document.getElementById("hero-content");

    if (parallaxBg) {
        window.addEventListener("scroll", () => {
            const scrollValue = window.scrollY;
            
            // Background bergerak pelan (speed 0.5)
            parallaxBg.style.transform = `translateY(${scrollValue * 0.5}px)`;
            
            // Konten bergerak sedikit lebih cepat dari bg tapi lebih lambat dari scroll (speed 0.2)
            // Ini opsional, bisa dihapus jika ingin konten diam normal
            if (parallaxContent) {
                parallaxContent.style.transform = `translateY(${scrollValue * 0.2}px)`;
            }
        });
    }

    // -------------------------------------------------------
    // 2. SCROLL REVEAL (Elemen Muncul Saat di-Scroll)
    // -------------------------------------------------------
    const revealElements = document.querySelectorAll(".reveal-up");

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                // Hapus observer agar animasi hanya jalan sekali (lebih performant)
                revealObserver.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.15 // Animasi jalan saat 15% elemen terlihat
    });

    revealElements.forEach((el) => {
        revealObserver.observe(el);
    });
});