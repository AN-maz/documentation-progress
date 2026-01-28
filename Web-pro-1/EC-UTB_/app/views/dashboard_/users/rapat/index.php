<div class="flex min-h-screen bg-gray-50">
    <main class="flex-1 p-4 sm:p-8 md:ml-64 w-full transition-all duration-300">
        <div class="mb-8 pt-16 md:pt-0">
            <h1 class="text-3xl font-bold text-gray-900">Rapat Internal Pengurus</h1>
            <p class="text-gray-500 mt-1">Halaman khusus pengurus. Jadwal dan notulensi rapat divisi.</p>
        </div>

        <div class="grid gap-6">
            <?php if (empty($data['agenda_list'])): ?>
                <div class="bg-white p-12 rounded-xl text-center shadow-sm border border-gray-100">
                    <p class="text-gray-500 italic">Belum ada jadwal rapat internal.</p>
                </div>
            <?php else: ?>
                <?php foreach ($data['agenda_list'] as $agenda): ?>
                    <div class="bg-white rounded-xl p-6 shadow-sm border-l-4 border-indigo-500 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow">
                        
                        <div class="flex-shrink-0 text-center bg-indigo-50 text-indigo-700 rounded-lg p-4 min-w-[80px] h-fit">
                            <span class="block text-2xl font-bold"><?= date('d', strtotime($agenda['tanggal'])); ?></span>
                            <span class="block text-xs uppercase font-bold"><?= date('M', strtotime($agenda['tanggal'])); ?></span>
                        </div>

                        <div class="flex-1">
                            <h3 class="text-xl font-bold text-gray-900 mb-2"><?= htmlspecialchars($agenda['judul']); ?></h3>
                            <p class="text-gray-600 text-sm mb-4 line-clamp-2"><?= htmlspecialchars($agenda['deskripsi']); ?></p>
                            
                            <div class="flex flex-wrap gap-4 text-sm text-gray-500">
                                <span class="flex items-center gap-1">🕒 <?= date('H:i', strtotime($agenda['waktu_mulai'])); ?> WIB</span>
                                <span class="flex items-center gap-1">📍 <?= htmlspecialchars($agenda['lokasi']); ?></span>
                                <?php if($agenda['notulensi']): ?>
                                    <span class="text-green-600 font-bold text-xs px-2 py-1 bg-green-50 rounded-full border border-green-100">✓ Ada Notulensi</span>
                                <?php endif; ?>
                            </div>
                        </div>

                        <div class="flex items-center">
                            <a href="<?= BASEURL; ?>/DashboardUsers/rapatDetail/<?= $agenda['id_agenda']; ?>" 
                               class="w-full md:w-auto px-6 py-2 border border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-colors text-center">
                                Buka Notulensi
                            </a>
                        </div>
                    </div>
                <?php endforeach; ?>
            <?php endif; ?>
        </div>
    </main>
</div>