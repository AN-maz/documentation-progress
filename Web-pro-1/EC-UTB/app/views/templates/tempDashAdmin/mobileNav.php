<!-- Modern Sticky Mobile Navbar -->
<nav class="lg:hidden sticky top-0 left-0 w-full bg-gradient-to-r from-ec-blue to-blue-800 text-white z-40 shadow-xl h-[80px] backdrop-blur-sm border-b border-white/10">
    <div class="flex items-center justify-between px-4 h-full">
        <!-- Left: Logo/Branding -->
        <div class="flex items-center gap-2">
            <div class="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/20">
                <svg class="w-6 h-6 text-ec-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
            </div>
            <h1 class="text-lg font-bold tracking-wide">EC Admin</h1>
        </div>

        <!-- Right: Hamburger Menu Button -->
        <button id="mobile-menu-btn" class="flex flex-col gap-1.5 w-8 h-8 group relative focus:outline-none">
            <span class="burger-line block h-[3px] w-full bg-white rounded transition-all duration-300 origin-center group-hover:bg-ec-red"></span>
            <span class="burger-line block h-[3px] w-full bg-white rounded transition-all duration-300 origin-center group-hover:bg-ec-red"></span>
            <span class="burger-line block h-[3px] w-full bg-white rounded transition-all duration-300 origin-center group-hover:bg-ec-red"></span>
        </button>
    </div>

    <!-- Mobile Menu Dropdown -->
    <div id="mobile-menu" class="hidden absolute top-[80px] left-0 w-full bg-ec-blue shadow-2xl max-h-[calc(100vh-80px)] overflow-y-auto divide-y divide-blue-700/50 animate-in fade-in slide-in-from-top-2">
        <!-- Menu Items Container -->
        <div class="flex flex-col">
            <!-- Home -->
            <a href="<?= BASEURL; ?>/dashboard" class="px-6 py-4 hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-800 transition-all duration-200 group flex items-center gap-4">
                <div class="w-10 h-10 rounded-lg bg-white/10 group-hover:bg-ec-red/20 transition-colors flex items-center justify-center flex-shrink-0">
                    <svg class="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                    </svg>
                </div>
                <div class="flex-1">
                    <p class="font-semibold text-white">Home</p>
                    <p class="text-xs text-blue-200">Dashboard</p>
                </div>
                <svg class="w-5 h-5 text-white/30 group-hover:text-white/60 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
            </a>

            <!-- News -->
            <a href="<?= BASEURL; ?>/dashboard/news" class="px-6 py-4 hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-800 transition-all duration-200 group flex items-center gap-4">
                <div class="w-10 h-10 rounded-lg bg-white/10 group-hover:bg-ec-red/20 transition-colors flex items-center justify-center flex-shrink-0">
                    <svg class="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
                    </svg>
                </div>
                <div class="flex-1">
                    <p class="font-semibold text-white">News</p>
                    <p class="text-xs text-blue-200">Manage posts</p>
                </div>
                <svg class="w-5 h-5 text-white/30 group-hover:text-white/60 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
            </a>

            <!-- Accounts -->
            <a href="<?= BASEURL; ?>/dashboard/accounts" class="px-6 py-4 hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-800 transition-all duration-200 group flex items-center gap-4">
                <div class="w-10 h-10 rounded-lg bg-white/10 group-hover:bg-ec-red/20 transition-colors flex items-center justify-center flex-shrink-0">
                    <svg class="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                    </svg>
                </div>
                <div class="flex-1">
                    <p class="font-semibold text-white">Accounts</p>
                    <p class="text-xs text-blue-200">Manage users</p>
                </div>
                <svg class="w-5 h-5 text-white/30 group-hover:text-white/60 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
            </a>
        </div>

        <!-- Divider -->
        <div class="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

        <!-- Logout -->
        <a href="<?= BASEURL; ?>/auth/logout" class="px-6 py-4 hover:bg-red-600/20 transition-all duration-200 group flex items-center gap-4">
            <div class="w-10 h-10 rounded-lg bg-red-500/10 group-hover:bg-red-500/20 transition-colors flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-red-400 group-hover:text-red-300 group-hover:scale-110 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                </svg>
            </div>
            <div class="flex-1">
                <p class="font-semibold text-red-300">Logout</p>
                <p class="text-xs text-red-200">Sign out</p>
            </div>
            <svg class="w-5 h-5 text-red-300/30 group-hover:text-red-300/60 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
        </a>
    </div>
</nav>

<script>
    // Mobile menu toggle with hamburger animation - FIXED VERSION
    function initMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const burgerLines = document.querySelectorAll('.burger-line');

        if (!mobileMenuBtn || !mobileMenu) {
            console.warn('Mobile menu elements not found');
            return;
        }

        // Helper functions to open and close menu
        function openMenu() {
            mobileMenu.classList.remove('hidden');
            
            // Hamburger animation
            burgerLines[0].classList.add('rotate-45', 'translate-y-2');
            burgerLines[1].classList.add('opacity-0', 'scale-0');
            burgerLines[2].classList.add('-rotate-45', '-translate-y-2');
        }

        function closeMenu() {
            mobileMenu.classList.add('hidden');
            
            // Reset hamburger animation
            burgerLines[0].classList.remove('rotate-45', 'translate-y-2');
            burgerLines[1].classList.remove('opacity-0', 'scale-0');
            burgerLines[2].classList.remove('-rotate-45', '-translate-y-2');
        }

        function toggleMenu() {
            if (mobileMenu.classList.contains('hidden')) {
                openMenu();
            } else {
                closeMenu();
            }
        }

        // Toggle menu on button click
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        // Close menu when clicking on a link
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                closeMenu();
            }
        });

        // Prevent closing menu when clicking inside it
        mobileMenu.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileMenu);
    } else {
        initMobileMenu();
    }
</script>
