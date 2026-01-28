<div class="flex min-h-screen bg-gray-50">
    <main class="flex-1 p-4 sm:p-8 md:ml-64 w-full transition-all duration-300">

        <div class="flex items-center gap-4 mb-6 pt-16 md:pt-0">
            <a href="<?= BASEURL; ?>/dashboard/rapat" class="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-100 text-gray-600 transition">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
            </a>
            <div>
                <h1 class="text-2xl font-bold text-gray-900"><?= htmlspecialchars($data['agenda']['judul']); ?></h1>
                <p class="text-gray-500 text-sm">Rapat Internal Pengurus</p>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

            <div class="lg:col-span-1 space-y-6">
                <div class="bg-white rounded-xl shadow-md p-6 border-t-4 <?= $data['sudah_absen'] ? 'border-green-500' : 'border-gray-300'; ?>">
                    <h3 class="font-bold text-gray-900 text-lg mb-4">Status Kehadiran</h3>

                    <div class="mb-4"><?php Flasher::flash(); ?></div>

                    <?php if ($data['sudah_absen']): ?>
                        <div class="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                            <div class="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl font-bold">
                                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <h4 class="font-bold text-green-800 text-lg">Hadir</h4>
                            <p class="text-sm text-green-600 mt-1">Dicatat pada: <?= date('H:i', strtotime($data['sudah_absen']['waktu_absen'])); ?> WIB</p>
                        </div>

                    <?php else: ?>
                        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                            <div class="w-16 h-16 bg-gray-200 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-3">
                                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <h4 class="font-bold text-gray-700 text-lg">Belum Tercatat</h4>
                            <p class="text-sm text-gray-500 mt-2 leading-relaxed">
                                Absensi rapat dilakukan secara manual oleh pihak yang berwajib ygy.
                            </p>
                        </div>
                    <?php endif; ?>
                </div>

                <div class="bg-white rounded-xl shadow-sm p-6">
                    <h4 class="font-bold text-gray-900 mb-4">Detail Info</h4>
                    <div class="space-y-3 text-sm">
                        <div>
                            <span class="block text-gray-500 text-xs uppercase font-bold">Tanggal</span>
                            <span class="font-medium"><?= date('l, d F Y', strtotime($data['agenda']['tanggal'])); ?></span>
                        </div>
                        <div>
                            <span class="block text-gray-500 text-xs uppercase font-bold">Lokasi</span>
                            <span class="font-medium"><?= htmlspecialchars($data['agenda']['lokasi']); ?></span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="lg:col-span-2">
                <div class="bg-white rounded-xl shadow-md p-6 h-[600px] flex flex-col relative">
                    <div class="flex-shrink-0 flex items-center justify-between mb-4 border-b pb-2">
                        <h3 class="font-bold text-gray-800 text-lg">📝 Hasil Notulensi</h3>
                        <?php if ($data['agenda']['file_materi']): ?>
                            <a href="<?= BASEURL; ?>/materi/<?= $data['agenda']['file_materi']; ?>" target="_blank" class="text-sm text-indigo-600 hover:underline flex items-center gap-1">📄 Download Lampiran</a>
                        <?php endif; ?>
                    </div>

                    <div class="flex-1 overflow-y-auto custom-scrollbar pr-2">
                        <?php if ($data['agenda']['notulensi']): ?>
                            <div class="prose max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
                                <?= $data['agenda']['notulensi']; ?>
                            </div>
                        <?php else: ?>
                            <div class="flex flex-col items-center justify-center h-full text-center text-gray-400">
                                <p class="text-lg font-medium">Notulensi belum diupload oleh sekretaris.</p>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
            </div>

        </div>
    </main>
</div>