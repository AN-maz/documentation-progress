<aside class="hidden md:flex flex-col 
              w-20 lg:w-64 
              h-screen fixed left-0 top-0 z-30 
              bg-ec-blue border-r border-white/10 
              transition-all duration-300 ease-in-out font-sans overflow-y-auto overflow-x-hidden">

    <div class="flex items-center justify-center lg:justify-start gap-3 px-2 lg:px-4 py-6 mb-4">
        <div class="w-10 h-10 min-w-[2.5rem] bg-white rounded-xl flex items-center justify-center text-ec-blue font-extrabold text-lg shadow-lg">
            SA
        </div>

        <div class="flex flex-col hidden lg:block opacity-0 lg:opacity-100 transition-opacity duration-300">
            <span class="text-lg font-bold text-white tracking-wide leading-tight whitespace-nowrap">
                Super Admin
            </span>
            <br>
            <span class="text-xs text-blue-200 font-light">
                TopMan Mode
            </span>
        </div>
    </div>

    <nav class="flex-1 px-2 lg:px-4 space-y-2">
        <?php
        $activeClass = "bg-white text-ec-blue shadow-lg shadow-blue-900/50 relative";
        $inactiveClass = "text-white hover:bg-white/10 transition-all duration-200";
        ?>

        <a href="<?= BASEURL; ?>/super/dashboard"
            class="flex items-center justify-center lg:justify-start gap-3 px-3 py-3 rounded-lg group transition-all duration-300 <?= ($data['active_page'] == 'dashboard') ? $activeClass : $inactiveClass; ?>">
            <div class="relative">
                <svg class="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
            </div>
            <span class="font-medium tracking-wide hidden lg:block whitespace-nowrap">Dashboard</span>
        </a>

        <a href="<?= BASEURL; ?>/super/news"
            class="flex items-center justify-center lg:justify-start gap-3 px-3 py-3 rounded-lg group transition-all duration-300 <?= ($data['active_page'] == 'news') ? $activeClass : $inactiveClass; ?>">
            <div class="relative">
                <svg class="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
            </div>
            <span class="font-medium tracking-wide hidden lg:block whitespace-nowrap">News</span>
        </a>

        <a href="<?= BASEURL; ?>/super/users"
            class="flex items-center justify-center lg:justify-start gap-3 px-3 py-3 rounded-lg group transition-all duration-300 <?= ($data['active_page'] == 'users') ? $activeClass : $inactiveClass; ?>">
            <div class="relative">
                <svg class="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            </div>
            <span class="font-medium tracking-wide hidden lg:block whitespace-nowrap">Account Users</span>
        </a>

        <a href="<?= BASEURL; ?>/super/agenda"
            class="flex items-center justify-center lg:justify-start gap-3 px-3 py-3 rounded-lg group transition-all duration-300 <?= ($data['active_page'] == 'agenda') ? $activeClass : $inactiveClass; ?>">
            <div class="relative">
                <svg class="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            </div>
            <span class="font-medium tracking-wide hidden lg:block whitespace-nowrap">Agenda</span>
        </a>

        <a href="<?= BASEURL; ?>/super/rapat"
            class="flex items-center justify-center lg:justify-start gap-3 px-3 py-3 rounded-lg group transition-all duration-300 <?= ($data['active_page'] == 'rapat') ? $activeClass : $inactiveClass; ?>">
            <div class="relative">
                <svg class="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            </div>
            <span class="font-medium tracking-wide hidden lg:block whitespace-nowrap">internal meeting</span>
        </a>

        <a href="<?= BASEURL; ?>/super/structure"
            class="flex items-center justify-center lg:justify-start gap-3 px-3 py-3 rounded-lg group transition-all duration-300 <?= ($data['active_page'] == 'structure') ? $activeClass : $inactiveClass; ?>">
            <div class="relative">
                <svg class="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            </div>
            <span class="font-medium tracking-wide hidden lg:block whitespace-nowrap">Structure</span>
        </a>
    </nav>

    <div class="mt-auto p-4 border-t border-white/10">
        <a href="<?= BASEURL; ?>/auth/logout"
            class="flex items-center justify-center lg:justify-start gap-3 px-3 py-3 rounded-lg text-white bg-ec-red hover:bg-red-800 transition-all duration-300 group">
            <svg class="w-5 h-5 shrink-0 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span class="font-bold hidden lg:block whitespace-nowrap">Logout</span>
        </a>
    </div>

</aside>