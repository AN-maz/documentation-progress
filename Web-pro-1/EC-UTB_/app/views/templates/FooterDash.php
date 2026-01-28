<div id="global-loader" class="fixed inset-0 z-[9999] bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center transition-opacity duration-500 ease-in-out opacity-100 pointer-events-auto">

    <div class="relative">
        <div class="absolute inset-0 bg-blue-400 rounded-full blur-xl opacity-20 animate-pulse"></div>
        <img src="<?= BASEURL; ?>/images/nav-logo.png"
            alt="Loading..."
            class="relative w-24 h-auto md:w-32 object-contain animate-bounce"
            style="animation-duration: 2s;">
    </div>

    <div class="mt-6 flex flex-col items-center gap-1">
        <span class="text-ec-blue font-bold text-lg tracking-wider animate-pulse">
            Wait a moment...
        </span>
        <div class="w-24 h-1 bg-gray-200 rounded-full overflow-hidden mt-2">
            <div class="h-full bg-ec-blue animate-[loading_1s_ease-in-out_infinite] w-full origin-left"></div>
        </div>
    </div>
</div>

<style>
    @keyframes loading {
        0% { transform: translateX(-100%); }
        50% { transform: translateX(0); }
        100% { transform: translateX(100%); }
    }

    body.loading-state {
        overflow: hidden !important;
    }
</style>

<script>
    document.addEventListener("DOMContentLoaded", function() {
        const loader = document.getElementById('global-loader');

        setTimeout(() => {
            if (loader) {
                loader.classList.remove('opacity-100');
                loader.classList.add('opacity-0');


                loader.classList.remove('pointer-events-auto');
                loader.classList.add('pointer-events-none');
                document.body.classList.remove('loading-state');
            }
        }, 500); 

        const links = document.querySelectorAll('a[href^="<?= BASEURL; ?>"]');

        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                const target = this.getAttribute('target');
            
                if (!href || href === '#' || href.startsWith('#') || target === '_blank' || e.metaKey || e.ctrlKey) {
                    return; 
                }

                e.preventDefault();
                const targetUrl = this.href;

                if (loader) {
                    loader.classList.remove('opacity-0', 'pointer-events-none');
                    loader.classList.add('opacity-100', 'pointer-events-auto');
                    document.body.classList.add('loading-state');
                }

                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu) mobileMenu.classList.add('opacity-0');

                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 500); 
            });
        });
    });
</script>

</body>
</html>