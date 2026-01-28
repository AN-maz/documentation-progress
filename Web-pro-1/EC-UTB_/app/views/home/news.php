<div class="bg-ec-blue pt-24 pb-12 px-4 sm:px-6 lg:px-8 text-center text-white py-3 ">
    <h1 class="text-3xl font-bold mb-2 reveal-up">Berita & Kegiatan Terbaru</h1>
    <p class="text-blue-100 max-w-2xl mx-auto reveal-up">Ikuti perkembangan terbaru dan cerita seru dari English Club UTB.</p>
</div>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

    <div class="flex flex-col md:flex-row justify-between items-center mb-10 gap-4 reveal-up">
        <p class="text-gray-600">Halaman <strong><?= $data['halamanAktif']; ?></strong> dari <?= $data['jumlahHalaman']; ?></p>

        <div class="relative w-80 md:w-[1000px]">
            <input type="text" id="searchNews" placeholder="Filter di halaman ini..."
                class="w-full pl-8 r-4 py-2 border border-gray-300 rounded-lg focus:ring-ec-blue focus:border-ec-blue">
        </div>
    </div>

    <?php if (empty($data['news'])): ?>
        <div class="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300 reveal-up">
            <p class="text-gray-500 text-lg">Belum ada berita yang dipublish.</p>
        </div>
    <?php else: ?>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24" id="newsContainer reveal-up">
            <?php foreach ($data['news'] as $news): ?>
                <article class="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100 overflow-hidden flex flex-col h-full news-item">

                    <div class="h-48 bg-gray-200 relative overflow-hidden group reveal-up">
                        <?php if (!empty($news['gambar']) && file_exists('../public/images/news/' . $news['gambar'])): ?>
                            <img src="<?= BASEURL; ?>/images/news/<?= $news['gambar']; ?>" alt="<?= $news['judul']; ?>" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
                        <?php else: ?>
                            <div class="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-blue-300">
                                <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                            </div>
                        <?php endif; ?>

                        <div class="reveal-up absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-ec-blue shadow-sm">
                            <?= date('d M Y', strtotime($news['created_at'])); ?>
                        </div>
                    </div>

                    <div class="p-6 flex-1 flex flex-col reveal-up">
                        <h3 class="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-ec-blue transition-colors">
                            <a href="<?= BASEURL; ?>/home/newsDetail/<?= $news['slug']; ?>">
                                <?= $news['judul']; ?>
                            </a>
                        </h3>

                        <p class="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                            <?= substr(strip_tags($news['konten']), 0, 150); ?>...
                        </p>

                        <div class="pt-4 border-t border-gray-100 flex justify-between items-center mt-auto reveal-up">
                            <span class="text-xs text-gray-400">By Admin</span>
                            <a href="<?= BASEURL; ?>/home/newsDetail/<?= $news['slug']; ?>" class="text-sm font-semibold text-ec-blue hover:text-blue-800 flex items-center gap-1 group">
                                Baca Selengkapnya <span class="transition-transform group-hover:translate-x-1">→</span>
                            </a>
                        </div>
                    </div>
                </article>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>

    <?php if ($data['jumlahHalaman'] > 1): ?>
        <div class="flex justify-center mt-16 reveal-up">
            <nav class="flex items-center gap-1 bg-white p-2 rounded-lg shadow-sm border border-gray-200">

                <?php if ($data['halamanAktif'] > 1): ?>
                    <a href="<?= BASEURL; ?>/home/news?page=<?= $data['halamanAktif'] - 1; ?>" class="px-3 py-2 rounded-md hover:bg-gray-100 text-gray-600">
                        ← Prev
                    </a>
                <?php else: ?>
                    <span class="px-3 py-2 text-gray-300 cursor-not-allowed">← Prev</span>
                <?php endif; ?>

                <?php for ($i = 1; $i <= $data['jumlahHalaman']; $i++): ?>
                    <?php if ($i == $data['halamanAktif']): ?>
                        <span class="px-4 py-2 rounded-md bg-ec-blue text-white font-bold"><?= $i; ?></span>
                    <?php else: ?>
                        <a href="<?= BASEURL; ?>/home/news?page=<?= $i; ?>" class="px-4 py-2 rounded-md hover:bg-gray-100 text-gray-600 transition-colors">
                            <?= $i; ?>
                        </a>
                    <?php endif; ?>
                <?php endfor; ?>

                <?php if ($data['halamanAktif'] < $data['jumlahHalaman']): ?>
                    <a href="<?= BASEURL; ?>/home/news?page=<?= $data['halamanAktif'] + 1; ?>" class="px-3 py-2 rounded-md hover:bg-gray-100 text-gray-600">
                        Next →
                    </a>
                <?php else: ?>
                    <span class="px-3 py-2 text-gray-300 cursor-not-allowed">Next →</span>
                <?php endif; ?>
            </nav>
        </div>
    <?php endif; ?>

</div>

<script>
    // Script search tetap sama (Hanya filter yang terlihat di halaman ini)
    document.getElementById('searchNews').addEventListener('keyup', function() {
        let filter = this.value.toLowerCase();
        let items = document.querySelectorAll('.news-item');
        items.forEach(function(item) {
            let text = item.innerText.toLowerCase();
            item.style.display = text.includes(filter) ? "flex" : "none";
        });
    });
</script>