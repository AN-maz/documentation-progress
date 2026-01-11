<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - <?= htmlspecialchars($data['user']['nama']); ?></title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="<?= BASEURL; ?>/js/config.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', sans-serif;
        }
    </style>
</head>
<body class="bg-gray-50">
    
    <!-- Mobile Navbar -->
    <nav class="lg:hidden fixed top-0 left-0 w-full bg-ec-blue text-white z-50 shadow-lg">
        <div class="flex items-center justify-between p-4">
            <h1 class="text-xl font-bold">Dashboard</h1>
            <button id="mobile-menu-btn" class="flex flex-col gap-1.5 w-8 h-8">
                <span class="block h-0.5 w-full bg-white rounded transition-all"></span>
                <span class="block h-0.5 w-full bg-white rounded transition-all"></span>
                <span class="block h-0.5 w-full bg-white rounded transition-all"></span>
            </button>
        </div>
        
        <!-- Mobile Menu -->
        <div id="mobile-menu" class="hidden bg-ec-blue border-t border-blue-800">
            <div class="flex flex-col">
                <a href="<?= BASEURL; ?>/dashboard" class="px-4 py-3 hover:bg-blue-900 transition-colors border-b border-blue-800">
                    <span class="flex items-center gap-3">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                        </svg>
                        Home
                    </span>
                </a>
                <a href="#" class="px-4 py-3 hover:bg-blue-900 transition-colors border-b border-blue-800 opacity-50 cursor-not-allowed">
                    <span class="flex items-center gap-3">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        Coming Soon
                    </span>
                </a>
                <a href="<?= BASEURL; ?>/auth/logout" class="px-4 py-3 hover:bg-blue-900 transition-colors">
                    <span class="flex items-center gap-3">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                        </svg>
                        Logout
                    </span>
                </a>
            </div>
        </div>
    </nav>

    <div class="flex min-h-screen pt-16 lg:pt-0">
        
        <!-- Desktop Sidebar -->
        <aside class="hidden lg:flex w-64 bg-ec-blue text-white flex-col shadow-xl">
            <div class="p-6 border-b border-blue-800">
                <h2 class="text-2xl font-bold">Dashboard</h2>
            </div>
            
            <nav class="flex-1 p-4">
                <ul class="space-y-2">
                    <li>
                        <a href="<?= BASEURL; ?>/dashboard" class="flex items-center gap-3 px-4 py-3 bg-blue-900 rounded-lg transition-colors">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                            </svg>
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="#" class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-900 transition-colors opacity-50 cursor-not-allowed">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            Coming Soon
                        </a>
                    </li>
                </ul>
            </nav>
            
            <div class="p-4 border-t border-blue-800">
                <a href="<?= BASEURL; ?>/auth/logout" class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-900 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                    </svg>
                    Logout
                </a>
            </div>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 p-6 lg:p-8">
            <div class="max-w-4xl mx-auto">
                
                <!-- Welcome Card -->
                <div class="bg-white rounded-xl shadow-lg p-6 lg:p-8 mb-6">
                    <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                        Selamat Datang, <?= htmlspecialchars($data['user']['nama']); ?>!
                    </h1>
                    <p class="text-gray-600 mb-6">Selamat datang di dashboard English Club UTB</p>
                    
                    <!-- Status Badge -->
                    <div class="inline-block">
                        <?php
                        $status = $data['user']['status_keanggotaan'];
                        $statusText = '';
                        $badgeColor = '';
                        
                        switch($status) {
                            case 'pengurus':
                                $statusText = 'Pengurus';
                                $badgeColor = 'bg-purple-100 text-purple-800 border-purple-300';
                                break;
                            case 'anggota_aktif':
                                $statusText = 'Anggota Aktif';
                                $badgeColor = 'bg-green-100 text-green-800 border-green-300';
                                break;
                            case 'anggota_pasif':
                                $statusText = 'Anggota Pasif';
                                $badgeColor = 'bg-yellow-100 text-yellow-800 border-yellow-300';
                                break;
                            case 'pending':
                                $statusText = 'Menunggu Persetujuan';
                                $badgeColor = 'bg-gray-100 text-gray-800 border-gray-300';
                                break;
                            default:
                                $statusText = 'Unknown';
                                $badgeColor = 'bg-gray-100 text-gray-800 border-gray-300';
                        }
                        ?>
                        <div class="px-4 py-2 rounded-lg border-2 <?= $badgeColor; ?> font-semibold">
                            Status: <?= $statusText; ?>
                        </div>
                    </div>
                </div>

                <!-- User Info Card -->
                <div class="bg-white rounded-xl shadow-lg p-6 lg:p-8">
                    <h2 class="text-2xl font-bold text-gray-900 mb-6">Informasi Akun</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="text-sm font-medium text-gray-500">Nama Lengkap</label>
                            <p class="text-lg font-semibold text-gray-900 mt-1"><?= htmlspecialchars($data['user']['nama']); ?></p>
                        </div>
                        <div>
                            <label class="text-sm font-medium text-gray-500">NIM</label>
                            <p class="text-lg font-semibold text-gray-900 mt-1"><?= htmlspecialchars($data['user']['nim']); ?></p>
                        </div>
                        <div>
                            <label class="text-sm font-medium text-gray-500">Jurusan</label>
                            <p class="text-lg font-semibold text-gray-900 mt-1"><?= htmlspecialchars($data['user']['jurusan']); ?></p>
                        </div>
                        <div>
                            <label class="text-sm font-medium text-gray-500">Email</label>
                            <p class="text-lg font-semibold text-gray-900 mt-1"><?= htmlspecialchars($data['user']['email']); ?></p>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    </div>

    <script>
        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if(mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }
    </script>

</body>
</html>

