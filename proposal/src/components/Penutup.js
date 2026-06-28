export const PenutupComponent = (data) => {
  const paragraphs = data.content || [];

  return `
    <div class="relative w-full h-full flex flex-col items-center justify-center pt-4">
      
      <div class="absolute -top-20 -right-20 z-0 opacity-10">
        <svg width="300" height="300" viewBox="0 0 100 100">
           <circle cx="50" cy="50" r="50" fill="var(--color-ec-blue)"/>
        </svg>
      </div>

      <div class="absolute top-[20%] left-10 z-0 opacity-40">
        <svg width="40" height="200" viewBox="0 0 40 200">
          <line x1="20" y1="0" x2="20" y2="200" stroke="var(--color-ec-red)" stroke-width="6" stroke-dasharray="10 10"/>
        </svg>
      </div>

      <div class="relative z-10 w-[80%] text-center">
        
        <h1 class="font-['Playfair_Display',_serif] text-[48px] font-black text-[var(--color-ec-blue)] mb-8">
          ${data.title}
        </h1>

        <div class="bg-white p-8 border-4 border-[var(--color-ec-blue)] shadow-[15px_15px_0px_0px_var(--color-ec-red)] relative">
          
          ${paragraphs.map((p, i) => `
            <p class="text-[15px] text-gray-800 leading-relaxed mb-6 last:mb-0 text-justify ${i === paragraphs.length - 1 ? 'font-bold italic text-center' : ''}">
              ${p}
            </p>
          `).join('')}

          <div class="mt-8 flex justify-center gap-4">
            <div class="w-12 h-1 bg-[var(--color-ec-red)]"></div>
            <div class="w-12 h-1 bg-[var(--color-ec-blue)]"></div>
            <div class="w-12 h-1 bg-[var(--color-ec-red)]"></div>
          </div>
        </div>

      </div>

      <div class="mt-12 text-[var(--color-ec-blue)] font-bold tracking-widest text-sm uppercase opacity-70">
        English Club — Universitas Teknologi Bandung
      </div>

    </div>
  `;
};