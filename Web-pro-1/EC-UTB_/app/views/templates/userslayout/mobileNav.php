<nav class="md:hidden fixed w-full z-40 top-0 bg-ec-blue border-b border-white/10 shadow-lg transition-all duration-300">
    <div class="px-4 py-3 flex justify-between items-center bg-ec-blue relative z-50">

        <a href="<?= BASEURL; ?>/DashboardUsers" class="flex items-center gap-3 group">
            <div class="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 z-50">
                <img id="logo"
                    src="<?= BASEURL; ?>/images/nav-logo_p.png"
                    class="transition-transform duration-300 w-[140px] sm:w-[160px] md:w-[150px]"
                    alt="logo">
            </div>
        </a>

        <button id="mobile-menu-btn" class="p-2 rounded-lg text-white hover:bg-white/10 focus:outline-none transition-colors duration-200 relative w-10 h-10 flex items-center justify-center">

            <svg id="icon-hamburger" class="w-6 h-6 transform transition-all duration-300 absolute" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>

            <svg id="icon-close" class="w-6 h-6 transform transition-all duration-300 absolute opacity-0 scale-0 rotate-[-180deg]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>

        </button>
    </div>

    <div id="mobile-menu" class="overflow-hidden max-h-0 opacity-0 transition-all duration-500 ease-in-out bg-white shadow-xl relative -z-10">
        <div class="flex flex-col p-4 space-y-2 border-b border-gray-200">

            <div class="flex items-center gap-3 px-4 py-3 mb-2 bg-blue-50 rounded-xl border border-blue-100 transform transition-transform duration-500 translate-y-[-10px] opacity-0" id="menu-item-0">
                <div class="w-10 h-10 rounded-full bg-ec-blue flex items-center justify-center text-white font-bold text-sm shadow-md">
                    <?= substr($data['user']['nama'], 0, 2); ?>
                </div>
                <div class="flex-1 min-w-0">
                    <p class="text-sm font-bold text-gray-900 truncate"><?= $data['user']['nama']; ?></p>
                    <p class="text-xs text-ec-blue font-medium truncate capitalize flex items-center gap-1">
                        <span class="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
                        <?= str_replace('_', ' ', $data['user']['status_keanggotaan']); ?>
                    </p>
                </div>
            </div>

            <div class="border-t border-gray-100 my-1"></div>

            <a href="<?= BASEURL; ?>/DashboardUsers"
                class="flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 transform translate-y-[-10px] opacity-0 <?= ($data['active_page'] == 'dashboard') ? 'bg-ec-blue text-white shadow-md' : 'text-gray-600 hover:bg-gray-50 hover:text-ec-blue'; ?>" id="menu-item-1">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                </svg>
                Dashboard
            </a>

            <a href="<?= BASEURL; ?>/DashboardUsers/agenda"
                class="flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 transform translate-y-[-10px] opacity-0 delay-75 <?= ($data['active_page'] == 'agenda') ? 'bg-ec-blue text-white shadow-md' : 'text-gray-600 hover:bg-gray-50 hover:text-ec-blue'; ?>" id="menu-item-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                Agenda Kegiatan
            </a>

            <?php if ($data['user']['status_keanggotaan'] == 'pengurus'): ?>
                <a href="<?= BASEURL; ?>/DashboardUsers/rapat"
                    class="flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 transform translate-y-[-10px] opacity-0 delay-100 <?= ($data['active_page'] == 'rapat') ? 'bg-purple-600 text-white shadow-md' : 'text-gray-600 hover:bg-purple-50 hover:text-purple-600'; ?>" id="menu-item-3">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                    Rapat Internal
                </a>
            <?php endif; ?>

            <a href="<?= BASEURL; ?>/auth/logout" class="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-600 hover:bg-red-50 transition-all duration-300 transform translate-y-[-10px] opacity-0 delay-150 mt-2 border-t border-gray-100" id="menu-item-4">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                </svg>
                Logout
            </a>

        </div>
    </div>
</nav>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const btn = document.getElementById('mobile-menu-btn');
        const menu = document.getElementById('mobile-menu');
        const iconHam = document.getElementById('icon-hamburger');
        const iconClose = document.getElementById('icon-close');

        // Ambil semua item menu untuk animasi berurutan (stagger)
        const menuItems = document.querySelectorAll('[id^="menu-item-"]');

        let isMenuOpen = false;

        if (btn && menu) {
            btn.addEventListener('click', function() {
                isMenuOpen = !isMenuOpen;

                if (isMenuOpen) {
                    // --- BUKA MENU ---

                    // 1. Animasi Container (Slide Down)
                    menu.classList.remove('max-h-0', 'opacity-0');
                    menu.classList.add('max-h-screen', 'opacity-100');

                    // 2. Animasi Ikon (Hamburger Hilang & Putar, X Muncul)
                    iconHam.classList.add('opacity-0', 'rotate-180', 'scale-0');
                    iconClose.classList.remove('opacity-0', 'scale-0', 'rotate-[-180deg]');
                    iconClose.classList.add('rotate-0', 'scale-100');

                    // 3. Animasi Item Menu (Muncul satu per satu)
                    menuItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.remove('translate-y-[-10px]', 'opacity-0');
                            item.classList.add('translate-y-0', 'opacity-100');
                        }, index * 50); // Delay 50ms per item
                    });

                } else {
                    // --- TUTUP MENU ---

                    // 1. Animasi Container (Slide Up)
                    menu.classList.remove('max-h-screen', 'opacity-100');
                    menu.classList.add('max-h-0', 'opacity-0');

                    // 2. Animasi Ikon (X Hilang & Putar Balik, Hamburger Muncul)
                    iconHam.classList.remove('opacity-0', 'rotate-180', 'scale-0');
                    iconClose.classList.add('opacity-0', 'scale-0', 'rotate-[-180deg]');
                    iconClose.classList.remove('rotate-0', 'scale-100');

                    // 3. Reset Posisi Item Menu (Supaya siap animasi lagi nanti)
                    menuItems.forEach(item => {
                        item.classList.add('translate-y-[-10px]', 'opacity-0');
                        item.classList.remove('translate-y-0', 'opacity-100');
                    });
                }
            });

            // Tutup menu jika klik di luar
            document.addEventListener('click', function(e) {
                if (isMenuOpen && !menu.contains(e.target) && !btn.contains(e.target)) {
                    // Trigger click event di tombol untuk menutup (biar animasinya jalan)
                    btn.click();
                }
            });
        }
    });
</script>