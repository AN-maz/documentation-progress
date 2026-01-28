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

    <style>
        html {
            scroll-behavior: smooth;
        }

        /* Kelas awal: Tersembunyi & Turun sedikit */
        .reveal-up {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s cubic-bezier(0.5, 0, 0, 1);
        }

        /* Kelas aktif: Muncul & Naik ke posisi asli */
        .reveal-up.active {
            opacity: 1;
            transform: translateY(0);
        }
    </style>
</head>

<body class="bg-gray-50 font-sans">

    <nav id="navbar" class="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-transparent text-white border-b border-transparent">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex justify-between items-center py-4 sm:py-6 transition-all duration-300" id="navbar-container">

            <div class="md:static z-50">
                <a href="<?= BASEURL; ?>/home">
                    <img id="logo"
                        src="<?= BASEURL; ?>/images/nav-logo_p.png"
                        class="transition-transform duration-300 w-[140px] sm:w-[160px] md:w-[150px]"
                        alt="logo">
                </a>
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
                    <a href="<?= BASEURL; ?>/auth" class="bg-ec-red text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-700 transition-all shadow-lg hover:shadow-red-500/30 inline-block">
                        Login
                    </a>
                </li>
            </ul>

            <button type="button" id="menu-btn" class="md:hidden flex flex-col justify-center items-end gap-[6px] w-10 h-10 z-[60] cursor-pointer group outline-none">
                <span class="burger-line block h-[3px] w-8 bg-white rounded-full transition-all duration-300 origin-center shadow-sm"></span>
                <span class="burger-line block h-[3px] w-8 bg-white rounded-full transition-all duration-300 origin-center shadow-sm"></span>
                <span class="burger-line block h-[3px] w-5 bg-white rounded-full transition-all duration-300 origin-center group-hover:w-8 shadow-sm"></span>
            </button>

        </div>

        <div id="mobile-menu"
            class="absolute top-full left-0 w-full bg-ec-blue/95 backdrop-blur-xl text-white shadow-2xl 
            overflow-hidden max-h-0 transition-all duration-700 ease-in-out border-t border-white/5">

            <div class="px-8 py-10 flex flex-col gap-8">
                <div class="flex flex-col gap-2">
                    <a href="<?= BASEURL; ?>/home" id="menu-item-0"
                        class="mobile-link group flex items-center justify-between py-3 transition-all duration-500 ">
                        <span class="text-xl font-bold tracking-widest group-hover:text-ec-red transition-colors">HOME</span>
                        <span class="text-[10px] text-white/30 font-mono">01</span>
                    </a>

                    <a href="<?= BASEURL; ?>/about" id="menu-item-1"
                        class="mobile-link group flex items-center justify-between py-3 transition-all duration-500">
                        <span class="text-xl font-bold tracking-widest group-hover:text-ec-red transition-colors">ABOUT</span>
                        <span class="text-[10px] text-white/30 font-mono">02</span>
                    </a>
                </div>

                <div class="flex items-center gap-4 transition-all duration-500" id="menu-item-divider">
                    <div class="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    <span class="text-[9px] tracking-[0.3em] text-white/40 uppercase font-black">Portal</span>
                    <div class="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </div>

                <div id="menu-item-2" class="transition-all duration-500">
                    <a href="<?= BASEURL; ?>/auth"
                        class="block w-full bg-ec-red text-white py-4 rounded-xl font-black text-center tracking-widest shadow-lg shadow-ec-red/20 active:scale-95 transition-all uppercase text-sm">
                        Login Account
                    </a>
                </div>
            </div>
        </div>

    </nav>