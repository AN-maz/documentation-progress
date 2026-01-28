<div class="w-full h-[400px] relative bg-gray-900">
    <?php if (!empty($data['news']['gambar']) && file_exists('../public/images/news/' . $data['news']['gambar'])): ?>
        <img src="<?= BASEURL; ?>/images/news/<?= $data['news']['gambar']; ?>" class="w-full h-full object-cover opacity-60 reveal-up">
    <?php else: ?>
        <div class="w-full h-full bg-gradient-to-r from-ec-blue to-blue-900 opacity-80 reveal-up"></div>
    <?php endif; ?>

    <div class="absolute inset-0 flex items-center justify-center">
        <div class="max-w-4xl px-6 text-center text-white reveal-up">
            <span class="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">News</span>
            <h1 class="text-3xl md:text-5xl font-bold mt-4 mb-4 leading-tight">
                <?= $data['news']['judul']; ?>
            </h1>
            <div class="flex items-center justify-center gap-4 text-sm text-gray-200 reveal-up">
                <span class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <?= date('d F Y', strtotime($data['news']['created_at'])); ?>
                </span>
                <span>•</span>
                <span class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    Admin
                </span>
            </div>
        </div>
    </div>
</div>

<article class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 reveal-up">

    <a href="<?= BASEURL; ?>/home/news" class="inline-flex items-center text-gray-500 hover:text-ec-blue mb-8 transition-colors">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        Kembali ke Daftar Berita
    </a>

    <div class="prose prose-lg max-w-none text-gray-800 leading-relaxed space-y-4 reveal-up">
        
        <?= $data['news']['konten']; ?>
    </div>
    

    <div class="mt-12 pt-8 border-t border-gray-200 reveal-up">
        <h4 class="font-bold text-gray-900 mb-4">Bagikan artikel ini:</h4>

        <?php

        $shareUrl = urlencode(BASEURL . '/home/newsDetail/' . $data['news']['slug']);
        $shareTitle = urlencode($data['news']['judul']);
        ?>

        <div class="flex flex-wrap gap-2 reveal-up">

            <a href="https://wa.me/?text=<?= $shareTitle; ?>%0A<?= $shareUrl; ?>" target="_blank"
                class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm font-semibold flex items-center gap-2 transition-colors">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                WhatsApp
            </a>

            <button onclick="navigator.clipboard.writeText(window.location.href); alert('Link berhasil disalin!');"
                class="reveal-up px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm font-semibold transition-colors">
                Copy Link
            </button>
        </div>
    </div>
</article>

<style>

    .prose img {
        max-width: 100%;
        height: auto;
        border-radius: 0.5rem;
        margin: 1.5rem 0;
    }

    .prose h2 {
        font-size: 1.5rem;
        font-weight: bold;
        margin-top: 2rem;
        margin-bottom: 1rem;
        color: #1f2937;
    }

    .prose p {
        margin-bottom: 1.25rem;
        line-height: 1.8;
    }

    .prose ul {
        list-style-type: disc;
        padding-left: 1.5rem;
        margin-bottom: 1.25rem;
    }

    .prose ol {
        list-style-type: decimal;
        padding-left: 1.5rem;
        margin-bottom: 1.25rem;
    }
</style>