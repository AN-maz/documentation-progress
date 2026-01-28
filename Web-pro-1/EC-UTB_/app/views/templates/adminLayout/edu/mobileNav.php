<nav class="md:hidden sticky top-0 left-0 w-full bg-gradient-to-r from-ec-blue to-blue-800 text-white z-40 shadow-xl h-[80px] backdrop-blur-sm border-b border-white/10 transition-all duration-300">
    <div class="flex items-center justify-between px-4 h-full">
        <div class="flex items-center gap-2">
             <span class="font-bold text-lg tracking-wide">Edu Admin</span>
        </div>

        <button id="mobile-menu-btn" class="flex flex-col justify-center items-center gap-1.5 w-10 h-10 group focus:outline-none transition-all duration-300">
            <span id="line-1" class="block h-[3px] w-6 bg-white rounded-full transition-all duration-300 origin-center"></span>
            <span id="line-2" class="block h-[3px] w-6 bg-white rounded-full transition-all duration-300"></span>
            <span id="line-3" class="block h-[3px] w-6 bg-white rounded-full transition-all duration-300 origin-center"></span>
        </button>
    </div>

    <div id="mobile-menu" class="absolute top-[80px] left-0 w-full bg-ec-blue shadow-2xl overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] max-h-0 opacity-0 border-t border-white/10">
        <div class="flex flex-col py-2 pb-6">
            
            <?php 
            $mobActiveClass = "bg-white/10 border-l-4 border-white text-white font-semibold";
            $mobInactiveClass = "border-l-4 border-transparent text-blue-100 hover:bg-white/5 hover:text-white hover:pl-7";
            $baseLinkClass = "flex items-center gap-4 px-6 py-4 border-b border-white/5 transition-all duration-300 group";
            ?>

            <a href="<?= BASEURL; ?>/edu/dashboard" 
               class="<?= $baseLinkClass; ?> <?= ($data['active_page'] == 'dashboard') ? $mobActiveClass : $mobInactiveClass; ?> transition-link">
               <svg class="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
               Dashboard
            </a>

        

            <a href="<?= BASEURL; ?>/edu/agenda" 
               class="<?= $baseLinkClass; ?> <?= ($data['active_page'] == 'agenda') ? $mobActiveClass : $mobInactiveClass; ?> transition-link">
               <svg class="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
               Agenda
            </a>

            <a href="<?= BASEURL; ?>/auth/logout" 
               class="<?= $baseLinkClass; ?> text-red-300 hover:bg-red-900/20 hover:text-red-200 transition-link mt-4 border-t border-white/10 pt-4">
               <svg class="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
               Logout
            </a>
        </div>
    </div>
</nav>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const btn = document.getElementById('mobile-menu-btn');
        const menu = document.getElementById('mobile-menu');
        const line1 = document.getElementById('line-1');
        const line2 = document.getElementById('line-2');
        const line3 = document.getElementById('line-3');
        let isMenuOpen = false;

        btn.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;

            if (isMenuOpen) {
                // BUKA MENU
                menu.classList.remove('max-h-0', 'opacity-0');
                menu.classList.add('max-h-[800px]', 'opacity-100'); 

                // ANIMASI BURGER JADI X
                line1.classList.add('rotate-45', 'translate-y-[9px]');
                line2.classList.add('opacity-0', 'translate-x-3');
                line3.classList.add('-rotate-45', '-translate-y-[9px]');
            } else {
                // TUTUP MENU
                menu.classList.remove('max-h-[800px]', 'opacity-100');
                menu.classList.add('max-h-0', 'opacity-0');

                // ANIMASI X JADI BURGER
                line1.classList.remove('rotate-45', 'translate-y-[9px]');
                line2.classList.remove('opacity-0', 'translate-x-3');
                line3.classList.remove('-rotate-45', '-translate-y-[9px]');
            }
        });
    });
</script>

