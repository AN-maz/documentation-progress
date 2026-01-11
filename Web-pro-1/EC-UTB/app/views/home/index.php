<section class="relative w-full min-h-screen bg-ec-blue overflow-hidden flex items-center">

  <div class="absolute inset-0 opacity-10 pointer-events-none z-0">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" stroke-width="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  </div>

  <!-- GAMBAR GEDUNG - MOBILE (ABSOLUTE CENTERED DI BELAKANG) & DESKTOP (KANAN FULL) -->
  <div class="absolute lg:absolute lg:right-0 lg:top-0 z-10 lg:z-20
              top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:translate-x-0 lg:translate-y-0
              w-[80%] sm:w-[70%] h-[50vh] sm:h-[60vh]
              lg:w-1/2 lg:h-full
              pointer-events-none">

    <img src="<?= BASEURL; ?>/images/utb-gedung-1.png"
      alt="Gedung UTB"
      class="w-full h-full object-contain"
      style="-webkit-mask-image: linear-gradient(to bottom, black 20%, transparent 100%);
              mask-image: linear-gradient(to bottom, black 20%, transparent 100%);
              -webkit-mask-image: linear-gradient(to right, black 100%, black 70%, transparent) !important;
              mask-image: linear-gradient(to right, black 100%, black 70%, transparent) !important;">
  </div>

  <!-- CONTENT - TEXT & BUTTONS -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-full w-full relative z-30 flex items-center lg:items-center pt-24 sm:pt-28 lg:pt-0">

    <div class="w-full lg:w-1/2 h-full flex items-center justify-center lg:justify-start">

      <div class="text-center lg:text-left space-y-4 sm:space-y-6 py-8 sm:py-10 lg:py-20">

        <div class="inline-block px-3 sm:px-4 py-1 sm:py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-xs sm:text-sm font-medium text-white mx-auto lg:mx-0">
          WELCOME TO EC-UTB
        </div>

        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
          LEARN TOGETHER <br>
          GROW TO BE
          <span class="text-ec-red">BETTER</span>
        </h1>

        <p class="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque eaque ipsum distinctio aut cum dicta vitae esse nemo.
        </p>

        <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-6 sm:pt-8">
          <a href="<?= BASEURL; ?>/auth/register"
            class="px-6 sm:px-8 py-2.5 sm:py-3 bg-ec-red text-white text-sm sm:text-base font-semibold rounded-lg shadow-lg hover:bg-red-700 transition-all duration-300 hover:-translate-y-1">
            Join Now
          </a>
          <a href="#" class="px-6 sm:px-8 py-2.5 sm:py-3 bg-transparent text-white text-sm sm:text-base font-semibold border-2 border-white rounded-lg hover:bg-white hover:text-ec-blue transition-all duration-300">
            Learn More
          </a>
        </div>
      </div>
    </div>
  </div>

</section>


<!-- NEWS -->
<section id="news" class="py-12 sm:py-16 lg:py-20 bg-gray-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

    <div class="text-center mb-12 sm:mb-16 space-y-3 sm:space-y-4">
      <h2 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ec-blue">
        LATEST <span class="text-ec-red">UPDATES</span>
      </h2>
      <div class="w-20 sm:w-24 h-1 bg-ec-red mx-auto rounded-full"></div>
      <p class="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
        Stay connected with our latest activities, announcements, and articles.
      </p>
    </div>

    <?php if (empty($data['news'])) : ?>

      <div class="text-center py-8 sm:py-10">
        <p class="text-gray-500 text-base sm:text-lg">Belum ada berita terbaru saat ini.</p>
      </div>

    <?php else : ?>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">

        <?php foreach ($data['news'] as $post) : ?>
          <article class="bg-white rounded-2xl shadow-lg overflow-hidden group hover:-translate-y-2 transition-all duration-300 border border-gray-100">

            <div class="relative h-56 overflow-hidden">
              <?php 
              $newsPath = '../public/images/news/' . $post['image'];
              $oldPath = '../public/images/' . $post['image'];
              
              if(file_exists($newsPath)) {
                  $imagePath = BASEURL . '/images/news/' . $post['image'];
              } elseif(file_exists($oldPath)) {
                  $imagePath = BASEURL . '/images/' . $post['image'];
              } else {
                  $imagePath = BASEURL . '/images/news/' . $post['image']; 
              }
              ?>
              <img src="<?= $imagePath; ?>"
                alt="<?= $post['title']; ?>"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onerror="this.src='<?= BASEURL; ?>/images/<?= $post['image']; ?>'">

              <div class="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-sm font-bold text-ec-blue shadow-sm">
                <?= date('d M Y', strtotime($post['created_at'] ?? 'now')); ?>
              </div>
            </div>

            <div class="p-6">
              <h3 class="text-xl font-bold text-ec-blue mb-3 line-clamp-2 group-hover:text-ec-red transition-colors">
                <?= $post['title']; ?>
              </h3>

              <p class="text-gray-600 mb-6 line-clamp-3 text-sm leading-relaxed">
                <?= substr($post['content'], 0, 100) . '...'; ?>
              </p>

              <a href="#" class="btn-coming-soon inline-flex items-center text-ec-red font-semibold hover:tracking-wide transition-all duration-300">
                Read More
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </article>
        <?php endforeach; ?>
      </div>

    <?php endif; ?>

    <div class="mt-16 text-center">
      <button class="btn-coming-soon px-8 py-3 border-2 border-ec-blue text-ec-blue font-bold rounded-full hover:bg-ec-blue hover:text-white transition-all duration-300">
        View All News
      </button>
    </div>

  </div>
</section>

<!-- VISI MISI -->

<section id="visi-misi" class="py-20 bg-white overflow-hidden relative">

  <div class="absolute -bottom-20 -left-20 w-96 h-96 bg-ec-red/5 rounded-full blur-3xl -z-10"></div>

  <div class="max-w-7xl mx-auto px-6 md:px-12">

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

      <div class="relative order-last lg:order-first group">

        <div class="absolute top-4 -left-4 w-full h-full border-2 border-ec-blue rounded-2xl -z-10 transition-transform duration-300 group-hover:translate-x-2 group-hover:translate-y-2"></div>
        <div class="absolute -bottom-4 -right-4 w-2/3 h-2/3 bg-ec-red/10 rounded-2xl -z-10"></div>

        <div class="rounded-2xl overflow-hidden shadow-2xl">
          <img src="<?= BASEURL; ?>/images/our-team.jpg"
            alt="Foto Pengurus English Club"
            class="w-full h-auto object-cover transform transition duration-700 group-hover:scale-105">
        </div>

        <div class="absolute bottom-6 left-6 bg-white/90 backdrop-blur px-6 py-3 rounded-lg shadow-lg border-l-4 border-ec-red hidden md:block">
          <p class="text-ec-blue font-bold text-lg">Cabinet 2025</p>
          <p class="text-sm text-gray-500">Synergy & Innovation</p>
        </div>
      </div>


      <div class="order-first lg:order-last">

        <div class="mb-8">
          <h4 class="text-ec-red font-bold tracking-wider uppercase mb-2">Our Goals</h4>
          <h2 class="text-3xl md:text-4xl font-extrabold text-ec-blue leading-tight">
            Building a Community of <br>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-ec-blue to-ec-red">Future Leaders</span>
          </h2>
        </div>

        <div class="space-y-8">

          <div class="relative pl-8 border-l-4 border-ec-blue">
            <h3 class="text-xl font-bold text-ec-blue mb-2">Our Vision</h3>
            <p class="text-gray-600 leading-relaxed text-justify">
              Menjadikan English Club sebagai wadah utama pengembangan kemampuan bahasa Inggris yang inklusif, inovatif, dan berdaya saing global bagi seluruh mahasiswa Universitas Teknologi Bandung.
            </p>
          </div>

          <div class="relative">
            <h3 class="text-xl font-bold text-ec-blue mb-4 flex items-center">
              <span class="w-8 h-1 bg-ec-red mr-3 rounded-full"></span>
              Our Mission
            </h3>

            <ul class="space-y-4">
              <li class="flex items-start group">
                <div class="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mt-1 mr-4 group-hover:bg-ec-blue transition-colors duration-300">
                  <span class="text-ec-blue font-bold text-sm group-hover:text-white">1</span>
                </div>
                <p class="text-gray-600">Menyediakan program pembelajaran bahasa Inggris yang kreatif dan menyenangkan.</p>
              </li>

              <li class="flex items-start group">
                <div class="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mt-1 mr-4 group-hover:bg-ec-blue transition-colors duration-300">
                  <span class="text-ec-blue font-bold text-sm group-hover:text-white">2</span>
                </div>
                <p class="text-gray-600">Membangun jejaring antar anggota untuk kolaborasi dan pertukaran budaya.</p>
              </li>

              <li class="flex items-start group">
                <div class="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mt-1 mr-4 group-hover:bg-ec-blue transition-colors duration-300">
                  <span class="text-ec-blue font-bold text-sm group-hover:text-white">3</span>
                </div>
                <p class="text-gray-600">Memfasilitasi anggota untuk berkompetisi dalam ajang debat dan pidato bahasa Inggris.</p>
              </li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  </div>
</section>
