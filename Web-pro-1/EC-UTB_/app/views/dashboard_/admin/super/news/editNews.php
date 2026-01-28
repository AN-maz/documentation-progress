<main class="flex-1 p-4 sm:p-6 lg:p-8 md:pl-32 lg:pl-80 transition-all min-h-screen w-full"> 
    
    <div class="max-w-4xl mx-auto flex flex-col justify-center">

        <div class="mb-8">
            <a href="<?= BASEURL; ?>/super/news" class="inline-flex items-center gap-2 text-gray-500 hover:text-ec-blue transition-colors mb-4 group">
                <div class="p-1.5 rounded-full bg-white border border-gray-200 group-hover:bg-blue-50 transition-colors shadow-sm">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                </div>
                <span class="text-sm font-medium">Kembali ke News Management</span>
            </a>
            
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 class="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Edit Berita</h1>
            </div>
        </div>

        <div class="mb-6">
            <?php Flasher::flash(); ?>
        </div>

        <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden relative z-0">
            <div class="h-1.5 bg-ec-blue w-full"></div>

            <div class="p-6 md:p-8 lg:p-10">
                <form action="<?= BASEURL; ?>/super/news/update/<?= $data['news']['id_post']; ?>" method="POST" enctype="multipart/form-data">
                    <div class="space-y-6">
                        
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Judul Berita</label>
                            <input type="text" name="judul" 
                                value="<?= htmlspecialchars($data['news']['judul'] ?? $data['news']['title']); ?>" 
                                required 
                                class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ec-blue focus:border-ec-blue focus:bg-white outline-none transition-all placeholder-gray-400 text-gray-800 shadow-sm">
                        </div>

                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Konten</label>
                            <textarea name="konten" rows="8" required 
                                class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ec-blue focus:border-ec-blue focus:bg-white outline-none transition-all placeholder-gray-400 text-gray-800 leading-relaxed shadow-sm"><?= htmlspecialchars($data['news']['konten'] ?? $data['news']['content']); ?></textarea>
                        </div>

                        <div class="p-5 border border-dashed border-gray-300 rounded-xl bg-gray-50/50 hover:bg-gray-50 transition-colors">
                            <label class="block text-sm font-medium text-gray-700 mb-3">Gambar Berita</label>
                            
                            <div class="flex flex-col md:flex-row gap-6 items-start">
                                <?php $imgName = $data['news']['gambar'] ?? $data['news']['image'] ?? null; ?>
                                <div class="shrink-0">
                                    <?php if ($imgName): ?>
                                        <div class="relative group rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-white w-full md:w-48 h-32">
                                            <img src="<?= BASEURL; ?>/images/news/<?= htmlspecialchars($imgName); ?>" 
                                                 alt="Current" 
                                                 class="w-full h-full object-cover" 
                                                 onerror="this.src='<?= BASEURL; ?>/images/default.jpg'">
                                            <div class="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-medium">
                                                Gambar Saat Ini
                                            </div>
                                        </div>
                                    <?php else: ?>
                                        <div class="w-full md:w-48 h-32 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs italic border border-gray-200">
                                            No Image
                                        </div>
                                    <?php endif; ?>
                                </div>

                                <div class="flex-1 w-full">
                                    <input type="file" name="gambar" accept="image/*" 
                                        class="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-ec-blue hover:file:bg-blue-100 transition-all cursor-pointer border border-gray-300 rounded-lg p-1 bg-white shadow-sm">
                                    <p class="mt-2 text-xs text-gray-500">
                                        Format: JPG, PNG, WEBP (Max 2MB). Biarkan kosong jika tidak ingin mengubah.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Waktu Publikasi</label>
                            <input type="datetime-local" name="created_at" 
                                value="<?= date('Y-m-d\TH:i', strtotime($data['news']['created_at'])); ?>" 
                                required 
                                class="w-full md:w-1/2 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ec-blue focus:border-ec-blue outline-none transition-all shadow-sm">
                        </div>
                    </div>

                    <div class="flex flex-col-reverse sm:flex-row gap-3 mt-8 pt-6 border-t border-gray-100">
                        <a href="<?= BASEURL; ?>/super/news" 
                           class="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all text-center">
                            Batal
                        </a>
                        <button type="submit" 
                                class="flex-1 px-6 py-3 bg-ec-blue text-white rounded-lg font-bold hover:bg-blue-800 transition-all shadow-md hover:shadow-lg flex justify-center items-center gap-2">
                            <span>Simpan Perubahan</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
        
    </div>
</main>