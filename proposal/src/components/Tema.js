export const TemaComponent = (data) => {
  // Jika di file data Anda isinya masih "...", saya otomatis ubah
  // ke tema asli dari dokumen referensi Anda ("Your Best TOEFL Score")
  const themeText =
    data.content === '"..."' || data.content === "..."
      ? "English Club TOEFL Fest: Let's Crack It Together"
      : data.content;

  return `
    <div class="relative w-full h-full flex flex-col items-center justify-center min-h-[850px]">
      
      <div class="absolute top-0 left-0 z-0 opacity-80">
        <svg width="180" height="180" viewBox="0 0 150 150">
          <circle cx="75" cy="75" r="60" fill="none" stroke="var(--color-ec-blue)" stroke-width="6" stroke-dasharray="15,15" />
        </svg>
      </div>

      <div class="absolute bottom-10 right-0 z-0 opacity-90">
        <svg width="140" height="140" viewBox="0 0 120 120">
          <polygon points="120,0 120,120 0,120" fill="var(--color-ec-red)" />
        </svg>
      </div>

      <div class="absolute top-10 right-10 z-0">
        <svg width="80" height="80" viewBox="0 0 80 80">
          <defs>
            <pattern id="dots-tema" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="5" cy="5" r="3" fill="var(--color-ec-blue)"/>
            </pattern>
          </defs>
          <rect width="80" height="80" fill="url(#dots-tema)"/>
        </svg>
      </div>

      <div class="absolute bottom-20 left-10 z-0">
        <svg width="120" height="80" viewBox="0 0 100 60">
          <path d="M 0 30 Q 12.5 0 25 30 T 50 30 T 75 30 T 100 30" fill="none" stroke="var(--color-ec-blue)" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>


      <div class="relative z-10 w-full flex flex-col items-center mt-[-50px]">
        
        <div class="bg-[var(--color-ec-red)] text-white px-8 py-2.5 font-bold tracking-[0.3em] uppercase text-sm mb-8 border-2 border-[var(--color-ec-blue)] shadow-[5px_5px_0px_0px_var(--color-ec-blue)] relative z-20">
          ${data.title}
        </div>

        <div class="relative bg-white border-[6px] border-[var(--color-ec-blue)] shadow-[15px_15px_0px_0px_var(--color-ec-red)] px-10 py-16 w-[85%] text-center transition-transform hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[20px_20px_0px_0px_var(--color-ec-red)] duration-300 flex items-center justify-center min-h-[250px]">
          
          <span class="absolute -top-6 left-4 text-[150px] font-black text-gray-100 leading-none select-none z-0 font-serif">“</span>
          <span class="absolute -bottom-16 right-4 text-[150px] font-black text-gray-100 leading-none select-none z-0 font-serif">”</span>

          <h2 class="relative z-10 font-['Playfair_Display',_serif] text-[56px] leading-[1.2] font-black text-[var(--color-ec-blue)]">
            ${themeText}
          </h2>
          
        </div>
        
        <div class="mt-16 flex gap-5">
          <div class="w-4 h-4 bg-[var(--color-ec-blue)] rounded-full"></div>
          <div class="w-4 h-4 bg-[var(--color-ec-red)] rounded-full transform scale-125"></div>
          <div class="w-4 h-4 bg-[var(--color-ec-blue)] rounded-full"></div>
        </div>

      </div>

    </div>
  `;
};
