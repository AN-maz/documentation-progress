export const DaftarIsiComponent = () => {
  // Data Daftar Isi (Disesuaikan dengan file PDF yang Anda lampirkan sebelumnya)
  const tocData = [
    { title: "Pendahuluan", page: "03" },
    { title: "Deskripsi Kegiatan", page: "04" },
    { title: "Landasan Kegiatan", page: "05" },
    { title: "Tema Kegiatan", page: "06" },
    { title: "Tujuan Kegiatan", page: "07" },
    { title: "Sasaran Audiens", page: "07" },
    { title: "Waktu dan Tempat Pelaksanaan", page: "08" },
    { title: "Kepanitiaan", page: "09" },
    { title: "Rancangan Anggaran Biaya", page: "10" },
    { title: "Rundown Acara", page: "12" },
    { title: "Output yang Diharapkan", page: "14" },
    { title: "Evaluasi dan Tindak Lanjut", page: "15" },
    { title: "Penutup", page: "16" }
  ];

  // Render list item
  let listItemsHTML = '';
  tocData.forEach((item, index) => {
    // Membuat warna kotak kecil bergantian (Merah dan Biru)
    const isEven = index % 2 === 0;
    const accentColor = isEven ? 'var(--color-ec-red)' : 'var(--color-ec-blue)';

    listItemsHTML += `
      <div class="flex items-center gap-4 mb-3 z-10 relative">
        <div class="w-5 h-5 border-2 border-[var(--color-ec-blue)] bg-[${accentColor}] shadow-[3px_3px_0px_0px_var(--color-ec-blue)] shrink-0"></div>

        <div class="flex-1 bg-white border-2 border-[var(--color-ec-blue)] shadow-[5px_5px_0px_0px_var(--color-ec-blue)] px-5 py-2.5 flex justify-between items-center transition-transform hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[7px_7px_0px_0px_var(--color-ec-blue)]">
          <span class="font-semibold text-[var(--color-ec-blue)] text-[15px]">${item.title}</span>
          <span class="font-bold text-[var(--color-ec-blue)] text-[15px]">${item.page}</span>
        </div>
      </div>
    `;
  });

  return `
    <div class="relative w-full h-full flex flex-col pt-4">
      
      <div class="absolute top-0 right-0 opacity-80 z-0">
        <svg width="120" height="40" viewBox="0 0 120 40">
          <defs>
            <pattern id="checkers" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect width="10" height="10" fill="var(--color-ec-blue)"/>
              <rect x="10" y="10" width="10" height="10" fill="var(--color-ec-blue)"/>
            </pattern>
          </defs>
          <rect width="120" height="40" fill="url(#checkers)"/>
        </svg>
      </div>

      <div class="absolute -top-4 right-[150px] z-0">
        <svg width="40" height="40" viewBox="0 0 40 40">
          <line x1="20" y1="0" x2="20" y2="40" stroke="var(--color-ec-blue)" stroke-width="2"/>
          <line x1="0" y1="20" x2="40" y2="20" stroke="var(--color-ec-red)" stroke-width="2"/>
        </svg>
      </div>

      <div class="mb-10 relative z-10">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-6 h-6 bg-[var(--color-ec-red)] rounded-full border-2 border-[var(--color-ec-blue)] flex items-center justify-center">
            <div class="w-3 h-[2px] bg-white transform -rotate-45"></div>
          </div>
          <span class="font-bold text-sm text-[var(--color-ec-blue)]">English Club UTB</span>
        </div>
        
        <h1 class="font-['Playfair_Display',_serif] text-[52px] font-black text-[var(--color-ec-blue)] m-0 leading-none">
          Daftar Isi.
        </h1>
      </div>

      <div class="w-full flex-1 z-10 pl-2">
        ${listItemsHTML}
      </div>

      <div class="absolute -bottom-8 -left-4 z-0">
        <svg width="100" height="30" viewBox="0 0 100 30">
          <polygon points="0,0 20,15 0,30" fill="var(--color-ec-red)" stroke="var(--color-ec-blue)" stroke-width="2"/>
          <polygon points="20,0 40,15 20,30" fill="white" stroke="var(--color-ec-blue)" stroke-width="2"/>
          <polygon points="40,0 60,15 40,30" fill="var(--color-ec-blue)" stroke="var(--color-ec-blue)" stroke-width="2"/>
        </svg>
      </div>

      <div class="absolute -bottom-4 right-10 z-0">
        <svg width="40" height="40" viewBox="0 0 50 50">
          <polyline points="10,10 30,30 10,50" fill="none" stroke="var(--color-ec-blue)" stroke-width="4"/>
          <polyline points="20,10 40,30 20,50" fill="none" stroke="var(--color-ec-red)" stroke-width="4"/>
        </svg>
      </div>

      <div class="absolute top-[250px] -left-8 z-0">
        <svg width="50" height="20" viewBox="0 0 50 20">
          <line x1="0" y1="5" x2="40" y2="5" stroke="var(--color-ec-blue)" stroke-width="2"/>
          <line x1="10" y1="15" x2="50" y2="15" stroke="var(--color-ec-red)" stroke-width="2"/>
        </svg>
      </div>

    </div>
  `;
};