export const DeskripsiComponent = (data) => {
  // Karena teksnya cukup panjang, kita bisa memisahkan paragrafnya (opsional) 
  // agar tidak menumpuk dalam satu elemen HTML.
  const contentText = data.content || "Konten belum tersedia.";

  return `
    <div class="relative w-full h-full flex flex-col pt-4">
      
      <div class="absolute top-0 right-4 z-0 opacity-80">
        <svg width="80" height="80" viewBox="0 0 100 100">
          <polyline points="10,20 30,50 50,20 70,50 90,20" fill="none" stroke="var(--color-ec-blue)" stroke-width="6" stroke-linejoin="miter"/>
          <polyline points="10,40 30,70 50,40 70,70 90,40" fill="none" stroke="var(--color-ec-red)" stroke-width="6" stroke-linejoin="miter"/>
        </svg>
      </div>

      <div class="absolute top-[350px] -left-6 z-0">
        <svg width="40" height="100" viewBox="0 0 40 100">
          <circle cx="20" cy="10" r="4" fill="var(--color-ec-red)"/>
          <circle cx="20" cy="30" r="4" fill="var(--color-ec-blue)"/>
          <circle cx="20" cy="50" r="4" fill="var(--color-ec-red)"/>
          <circle cx="20" cy="70" r="4" fill="var(--color-ec-blue)"/>
          <circle cx="20" cy="90" r="4" fill="var(--color-ec-red)"/>
        </svg>
      </div>

      <div class="mb-8 relative z-10">
        <div class="flex items-center gap-2 mb-3">
          <div class="w-6 h-6 bg-[var(--color-ec-blue)] rounded-full border-2 border-[var(--color-ec-red)] flex items-center justify-center">
             <div class="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <span class="font-bold text-sm text-[var(--color-ec-red)] uppercase tracking-widest">Tentang Program</span>
        </div>
        
        <h1 class="font-['Playfair_Display',_serif] text-[48px] font-black text-[var(--color-ec-blue)] m-0 leading-none">
          ${data.title}
        </h1>
      </div>

      <div class="relative z-10 w-[95%]">
        
        <div class="bg-white border-4 border-[var(--color-ec-blue)] p-6 shadow-[10px_10px_0px_0px_var(--color-ec-red)] mb-10 transition-transform hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[14px_14px_0px_0px_var(--color-ec-red)]">
          <p class="text-[15px] text-gray-800 leading-relaxed text-justify m-0 font-medium">
            <span class="text-xl font-black text-[var(--color-ec-blue)] float-left text-5xl leading-[0.8] mr-2 mt-1">T</span>
            OEFL Crash Course: "..." merupakan program pelatihan singkat yang diselenggarakan oleh English Club Universitas Teknologi Bandung untuk membantu mahasiswa dalam memahami format tes TOEFL, meningkatkan keterampilan bahasa Inggris akademik, serta menguasai strategi mengerjakan soal secara efektif.
          </p>
        </div>

        <div class="w-full flex items-center gap-4 mb-6">
          <div class="h-[3px] bg-[var(--color-ec-blue)] flex-1"></div>
          <span class="font-bold text-[14px] text-[var(--color-ec-red)] uppercase">Fokus Pelatihan</span>
          <div class="h-[3px] bg-[var(--color-ec-blue)] w-12"></div>
        </div>

        <div class="flex gap-6 items-start">
          
          <div class="flex-1 bg-[#f2f7fb] p-5 border-l-4 border-[var(--color-ec-red)] text-[13px] text-gray-700 text-justify leading-relaxed">
            Kegiatan ini dikemas dalam bentuk workshop intensif dengan pendekatan interaktif, mencakup materi dan latihan yang dipandu oleh narasumber berpengalaman. Pelatihan ini diharapkan dapat memberikan pembekalan praktis bagi peserta yang hendak mengikuti TOEFL resmi, baik sebagai syarat kelulusan, beasiswa, maupun studi lanjut.
          </div>

          <div class="w-[200px] grid grid-cols-2 gap-3 shrink-0">
            <div class="bg-white border-2 border-[var(--color-ec-blue)] shadow-[4px_4px_0px_0px_var(--color-ec-blue)] h-[70px] flex flex-col items-center justify-center p-2 text-center">
              <span class="block w-4 h-1 bg-[var(--color-ec-red)] mb-1"></span>
              <span class="font-bold text-[12px] text-[var(--color-ec-blue)]">Reading</span>
            </div>
            <div class="bg-white border-2 border-[var(--color-ec-blue)] shadow-[4px_4px_0px_0px_var(--color-ec-red)] h-[70px] flex flex-col items-center justify-center p-2 text-center">
              <span class="block w-1 h-4 bg-[var(--color-ec-blue)] mb-1"></span>
              <span class="font-bold text-[12px] text-[var(--color-ec-blue)]">Listening</span>
            </div>
            <div class="bg-white border-2 border-[var(--color-ec-blue)] shadow-[4px_4px_0px_0px_var(--color-ec-red)] h-[70px] flex flex-col items-center justify-center p-2 text-center">
              <span class="block w-2 h-2 rounded-full bg-[var(--color-ec-blue)] mb-1"></span>
              <span class="font-bold text-[12px] text-[var(--color-ec-blue)]">Structure</span>
            </div>
            <div class="bg-white border-2 border-[var(--color-ec-blue)] shadow-[4px_4px_0px_0px_var(--color-ec-blue)] h-[70px] flex flex-col items-center justify-center p-2 text-center">
              <span class="block w-3 h-3 bg-[var(--color-ec-red)] mb-1 transform rotate-45"></span>
              <span class="font-bold text-[12px] text-[var(--color-ec-blue)]">Writing</span>
            </div>
          </div>
          
        </div>

      </div>

      <div class="absolute bottom-8 right-8 z-0">
         <div class="w-12 h-12 border-4 border-[var(--color-ec-blue)] absolute top-0 left-0"></div>
         <div class="w-12 h-12 border-4 border-[var(--color-ec-red)] absolute top-3 left-3 bg-white/50 backdrop-blur-sm"></div>
      </div>

    </div>
  `;
};