<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EC-UTB | <?= $data['judul']; ?> Page</title>

    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">

    <link href="<?= BASEURL; ?>/css/output.css" rel="stylesheet">
    <script>
        const BASEURL = '<?= BASEURL; ?>';
    </script>
</head>

<body class="bg-gray-50 font-sans">

    <nav id="navbar"
        class="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-transparent text-white border-b border-transparent">

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex justify-between items-center py-4 sm:py-6 transition-all duration-300" id="navbar-container">

            <div class="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 z-50">
                <img id="logo"
                    src="<?= BASEURL; ?>/images/nav-logo_p.png"
                    class="transition-transform duration-300 w-[140px] sm:w-[160px] md:w-[150px]"
                    alt="logo">
            </div>

            <ul id="nav-menu" class="hidden md:flex gap-8 items-center">
                <li class="relative group">
                    <a href="<?= BASEURL; ?>/home" class="font-medium hover:text-gray-300 transition-colors duration-300">
                        Home
                        <span class="absolute left-0 -bottom-2 h-[2px] w-full bg-ec-red scale-x-0 origin-right group-hover:scale-x-100 group-hover:origin-left transition-transform duration-300"></span>
                    </a>
                </li>

                <li class="relative group">
                    <a href="<?= BASEURL; ?>/about" class="font-medium hover:text-gray-300 transition-colors duration-300">
                        About
                        <span class="absolute left-0 -bottom-2 h-[2px] w-full bg-ec-red scale-x-0 origin-right group-hover:scale-x-100 group-hover:origin-left transition-transform duration-300"></span>
                    </a>
                </li>

                <li>
                    <a href="<?= BASEURL; ?>/auth"
                        class="bg-ec-red text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-700 transition-all shadow-lg hover:shadow-red-500/30 inline-block">
                        Login
                    </a>
                </li>
            </ul>

            <button type="button" id="menu-btn" class="md:hidden absolute right-6 top-1/2 -translate-y-1/2 flex flex-col justify-center items-end gap-[6px] w-10 h-10 z-50 cursor-pointer">
                <span class="burger-line block h-[3px] w-8 bg-white rounded-full transition-all duration-300 origin-center"></span>
                <span class="burger-line block h-[3px] w-8 bg-white rounded-full transition-all duration-300 origin-center"></span>
                <span class="burger-line block h-[3px] w-8 bg-white rounded-full transition-all duration-300 origin-center"></span>
            </button>

        </div>

        <!-- MOBILE MENU -->
        <div id="mobile-menu"
            class="absolute top-full left-0 w-full bg-gradient-to-b from-ec-blue to-ec-blue/95 text-white shadow-2xl backdrop-blur-md
            overflow-hidden max-h-0 transition-all duration-500 ease-in-out">

            <div class="px-4 py-6 sm:px-6 sm:py-8 flex flex-col gap-6">
                <!-- Mobile Menu Links -->
                <div class="space-y-3">
                    <a href="<?= BASEURL; ?>/home" 
                        class="block text-base sm:text-lg font-bold hover:text-white transition-colors duration-300 pb-2 sm:pb-3 border-b border-white/10 hover:border-ec-red">
                        🏠 Home
                    </a>
                    <a href="<?= BASEURL; ?>/about" 
                        class="block text-base sm:text-lg font-bold hover:text-white transition-colors duration-300 pb-2 sm:pb-3 border-b border-white/10 hover:border-ec-red">
                        ℹ️ About
                    </a>
                </div>

                <!-- Divider -->
                <div class="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                <!-- Login Button -->
                <a href="<?= BASEURL; ?>/auth"
                    class="w-full bg-ec-red text-white py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-bold text-base sm:text-lg hover:bg-red-700 transition-all duration-300 text-center shadow-lg hover:shadow-red-500/30 transform hover:scale-105">
                    Login
                </a>
            </div>
        </div>
    </nav>
