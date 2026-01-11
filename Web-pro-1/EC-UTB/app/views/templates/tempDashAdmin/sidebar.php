<aside class="hidden md:flex lg:w-64 md:w-20 bg-ec-blue text-white flex-col fixed top-0 left-0 h-screen z-40 shadow-xl transition-all duration-300">

    <div class="p-4 md:p-6 border-b border-blue-800 flex items-center justify-center md:justify-start gap-3 z-50 bg-ec-blue h-[80px] flex-shrink-0">
        <h2 class="hidden lg:block text-2xl font-bold tracking-wide">Admin Panel</h2>
        <svg class="lg:hidden w-6 h-6 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
    </div>

    <nav class="flex-1 p-2 md:p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-900">
        <ul class="space-y-1 md:space-y-2">

            <?php
            // Class untuk menu AKTIF
            $activeClass = "bg-blue-900 border-l-4 border-white shadow-md pl-6";
            // Class untuk menu TIDAK AKTIF
            $inactiveClass = "hover:bg-blue-900 hover:pl-6 border-l-4 border-transparent";
            ?>

            <li>
                <a href="<?= BASEURL; ?>/dashboard"
                    class="flex items-center justify-center md:justify-start gap-3 px-4 py-3 rounded-lg transition-all duration-200 group

                   <?= ($data['active_page'] == 'dashboard') ? $activeClass : $inactiveClass; ?>"

                    title="Home">
                    <svg class="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                    </svg>
                    <span class="hidden lg:block font-medium">Home</span>
                </a>
            </li>

            <li>
                <a href="<?= BASEURL; ?>/dashboard/news"
                    class="flex items-center justify-center md:justify-start gap-3 px-4 py-3 rounded-lg transition-all duration-200 group
       <?php
        // Cek apakah halaman aktif adalah 'news' ATAU 'editNews'
        echo ($data['active_page'] == 'news' || $data['active_page'] == 'editNews') ? $activeClass : $inactiveClass;
        ?>"
                    title="News">
                    <svg class="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
                    </svg>
                    <span class="hidden lg:block font-medium">News</span>
                </a>
            </li>

            <li>
                <a href="<?= BASEURL; ?>/dashboard/accounts"
                    class="flex items-center justify-center md:justify-start gap-3 px-4 py-3 rounded-lg transition-all duration-200 group

                   <?= ($data['active_page'] == 'accounts') ? $activeClass : $inactiveClass; ?>"

                    title="Account">
                    <svg class="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                    </svg>
                    <span class="hidden lg:block font-medium">Account</span>
                </a>
            </li>

        </ul>
    </nav>

    <div class="p-2 md:p-4 border-t border-blue-800 flex-shrink-0">
        <a href="<?= BASEURL; ?>/auth/logout"
            class="flex items-center justify-center md:justify-start gap-3 px-4 py-3 rounded-lg hover:bg-red-600 transition-all duration-200 text-gray-200 group hover:text-white"
            title="Logout">
            <svg class="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
            <span class="hidden lg:block font-medium">Logout</span>
        </a>
    </div>

</aside>