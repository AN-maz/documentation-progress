export const WaktuTempatComponent = (data) => {
  // Ekstrak data dari object content
  const content = data.content || {};
  const waktu = content.waktu || "Waktu belum ditentukan";
  const tempat = content.tempat || "Tempat belum ditentukan";
  const deskripsi = content.deskripsi || "";

  return `
    <div class="relative w-full h-full flex flex-col pt-4 min-h-[800px]">
      
      <div class="absolute bottom-[-50px] left-[-80px] z-0 opacity-20 transform -rotate-12">
        <svg width="400" height="400" viewBox="0 0 100 100">
          <polygon points="50,0 60,35 98,25 70,50 98,75 60,65 50,100 40,65 2,75 30,50 2,25 40,35" fill="var(--color-ec-blue)" />
        </svg>
      </div>

      <div class="absolute top-[100px] right-10 z-0 opacity-80">
        <svg width="80" height="80" viewBox="0 0 100 100">
          <polygon points="50,0 60,35 98,25 70,50 98,75 60,65 50,100 40,65 2,75 30,50 2,25 40,35" fill="var(--color-ec-red)" stroke="var(--color-ec-blue)" stroke-width="4"/>
        </svg>
      </div>

      <div class="absolute top-[400px] right-[-20px] z-0 opacity-50">
        <svg width="80" height="120" viewBox="0 0 40 60">
          <defs>
            <pattern id="dots-waktu" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="2" fill="var(--color-ec-red)"/>
            </pattern>
          </defs>
          <rect width="40" height="60" fill="url(#dots-waktu)"/>
        </svg>
      </div>


      <div class="mb-12 relative z-10">
        <div class="flex items-center gap-2 mb-3">
          <div class="w-6 h-6 bg-[var(--color-ec-blue)] rounded-none border-2 border-[var(--color-ec-red)] flex items-center justify-center transform rotate-45">
             <div class="w-2 h-2 bg-white rounded-none"></div>
          </div>
          <span class="font-bold text-sm text-[var(--color-ec-red)] uppercase tracking-widest">Detail Pelaksanaan</span>
        </div>
        
        <h1 class="font-['Playfair_Display',_serif] text-[48px] font-black text-[var(--color-ec-blue)] m-0 leading-none">
          Waktu & Tempat
        </h1>
      </div>

      <div class="relative z-10 w-[90%] mx-auto mt-4 flex flex-col gap-8">
        
        <div class="flex gap-8">
          
          <div class="flex-1 bg-[var(--color-ec-blue)] border-4 border-[var(--color-ec-blue)] p-6 shadow-[10px_10px_0px_0px_var(--color-ec-red)] transition-transform hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[14px_14px_0px_0px_var(--color-ec-red)] group">
            <div class="flex items-center gap-4 mb-4 border-b-2 border-white/30 pb-4">
              <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <svg class="w-6 h-6 text-[var(--color-ec-red)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white uppercase tracking-wider m-0">Waktu</h3>
            </div>
            <p class="text-[18px] font-black text-white m-0 leading-snug">
              ${waktu.toUpperCase()}
            </p>
          </div>

          <div class="flex-1 bg-white border-4 border-[var(--color-ec-blue)] p-6 shadow-[10px_10px_0px_0px_var(--color-ec-red)] transition-transform hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[14px_14px_0px_0px_var(--color-ec-red)] group">
            <div class="flex items-center gap-4 mb-4 border-b-2 border-[var(--color-ec-red)] pb-4">
              <div class="w-12 h-12 bg-[var(--color-ec-red)] rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-[var(--color-ec-blue)] uppercase tracking-wider m-0">Tempat</h3>
            </div>
            <p class="text-[17px] font-black text-[var(--color-ec-blue)] m-0 leading-snug">
              ${tempat.toUpperCase()}
            </p>
          </div>

        </div>

        <div class="w-full bg-[#f2f7fb] border-4 border-[var(--color-ec-blue)] p-6 shadow-[8px_8px_0px_0px_var(--color-ec-blue)] relative mt-4">
          <div class="absolute -top-5 -right-5 w-10 h-10 bg-[var(--color-ec-red)] border-2 border-[var(--color-ec-blue)] flex items-center justify-center text-white font-serif text-3xl font-bold pt-2">
            "
          </div>
          
          <p class="text-[15px] font-medium text-gray-800 leading-relaxed text-justify m-0">
            ${deskripsi}
          </p>
        </div>

      </div>

    </div>
  `;
};