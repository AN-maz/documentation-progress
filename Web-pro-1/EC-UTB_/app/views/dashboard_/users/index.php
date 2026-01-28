<div class="flex min-h-screen bg-gray-50">
    <main class="flex-1 p-4 sm:p-6 lg:p-8 md:ml-64 transition-all duration-300 w-full">
        
        <div class="bg-gradient-to-r from-ec-blue to-blue-800 rounded-2xl shadow-lg p-6 lg:p-10 mb-8 text-white relative overflow-hidden">
            <div class="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
            <div class="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>

            <div class="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 class="text-3xl lg:text-4xl font-bold mb-2">
                        Welcome back, <?= htmlspecialchars(explode(' ', $data['user']['nama'])[0]); ?>! 👋
                    </h1>
                    <p class="text-blue-100 text-lg">Dashboard Users English Club UTB</p>
                </div>
                
                <?php
                $status = $data['user']['status_keanggotaan'];
                $badgeClass = match ($status) {
                    'pengurus' => 'bg-purple-500 text-white',
                    'anggota_aktif' => 'bg-green-500 text-white',
                    'anggota_pasif' => 'bg-yellow-500 text-white',
                    default => 'bg-gray-500 text-white'
                };
                ?>
                <span class="px-4 py-2 rounded-lg font-bold shadow-sm <?= $badgeClass; ?> border border-white/20 backdrop-blur-sm uppercase text-sm tracking-wider">
                    <?= str_replace('_', ' ', $status); ?>
                </span>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            
            <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                <div class="p-4 bg-blue-50 text-ec-blue rounded-full">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                </div>
                <div>
                    <p class="text-sm font-medium text-gray-500 uppercase">Agenda Diikuti</p>
                    <h3 class="text-2xl font-bold text-gray-900"><?= $data['total_agenda']; ?> Kegiatan</h3>
                </div>
            </div>

            <?php if ($data['user']['status_keanggotaan'] == 'pengurus'): ?>
            <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                <div class="p-4 bg-purple-50 text-purple-600 rounded-full">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                </div>
                <div>
                    <p class="text-sm font-medium text-gray-500 uppercase">Internal Meeting</p>
                    <h3 class="text-2xl font-bold text-gray-900"><?= $data['total_rapat']; ?> Hadir</h3>
                </div>
            </div>
            <?php endif; ?>

        </div>

        <div class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div class="p-6 border-b border-gray-50 bg-gray-50">
                <h2 class="text-lg font-bold text-gray-800">Informasi Pribadi</h2>
            </div>
            <div class="p-6 lg:p-8">
                <div class="flex flex-col md:flex-row gap-8 items-center md:items-start">


                    <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        <div class="space-y-1">
                            <label class="text-xs font-bold text-gray-400 uppercase">Nama Lengkap</label>
                            <p class="text-lg font-semibold text-gray-900"><?= htmlspecialchars($data['user']['nama']); ?></p>
                        </div>
                        <div class="space-y-1">
                            <label class="text-xs font-bold text-gray-400 uppercase">NIM</label>
                            <p class="text-lg font-mono font-semibold text-gray-700"><?= htmlspecialchars($data['user']['nim']); ?></p>
                        </div>
                        <div class="space-y-1">
                            <label class="text-xs font-bold text-gray-400 uppercase">Jurusan</label>
                            <p class="text-gray-900"><?= htmlspecialchars($data['user']['jurusan']); ?></p>
                        </div>
                        <div class="space-y-1">
                            <label class="text-xs font-bold text-gray-400 uppercase">Email</label>
                            <p class="text-gray-900"><?= htmlspecialchars($data['user']['email']); ?></p>
                        </div>
                        <div class="space-y-1 md:col-span-2">
                            <label class="text-xs font-bold text-gray-400 uppercase">Alasan Bergabung</label>
                            <p class="text-gray-600 italic">"<?= htmlspecialchars($data['user']['alasan']); ?>"</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </main>
</div>