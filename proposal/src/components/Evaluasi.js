export const EvaluasiComponent = (data) => {
  const points = data.content || [];
  
  // Ikon sederhana untuk setiap poin evaluasi
  const icons = [
    '<path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>', // Kuesioner
    '<path d="M13 10V3L4 14h7v7l9-11h-7z"/>', // Efektivitas
    '<path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>', // Dokumentasi
    '<path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>' // Lanjutan
  ];

  let cardsHTML = '';
  points.forEach((point, index) => {
    const isEven = index % 2 === 0;
    const color = isEven ? 'var(--color-ec-blue)' : 'var(--color-ec-red)';
    const shadow = isEven ? 'shadow-[8px_8px_0px_0px_var(--color-ec-red)]' : 'shadow-[8px_8px_0px_0px_var(--color-ec-blue)]';

    cardsHTML += `
      <div class="bg-white border-4 border-[${color}] p-6 ${shadow} flex gap-5 transition-transform duration-300 hover:scale-[1.02] z-10 relative">
        <div class="w-16 h-16 bg-[${color}]/10 border-2 border-[${color}] flex items-center justify-center shrink-0">
          <svg class="w-8 h-8 text-[${color}]" fill="none" stroke="currentColor" viewBox="0 0 24 24">${icons[index]}</svg>
        </div>
        <div>
          <h3 class="font-black text-[16px] text-[${color}] uppercase mb-1">${point.subtitle}</h3>
          <p class="text-[14px] text-gray-700 leading-relaxed">${point.text}</p>
        </div>
      </div>
    `;
  });

  return `
    <div class="relative w-full h-full flex flex-col pt-4">
      
      <div class="absolute top-20 left-10 z-0 opacity-40">
         <svg width="100" height="100" viewBox="0 0 100 100">
           <circle cx="50" cy="50" r="40" fill="none" stroke="var(--color-ec-blue)" stroke-width="8" stroke-dasharray="10 10"/>
         </svg>
      </div>

      <div class="absolute bottom-20 right-10 z-0 opacity-40">
         <svg width="80" height="80" viewBox="0 0 100 100">
           <rect x="10" y="10" width="80" height="80" fill="none" stroke="var(--color-ec-red)" stroke-width="8" transform="rotate(20 50 50)"/>
         </svg>
      </div>

      <div class="mb-10 relative z-10">
        <div class="flex items-center gap-2 mb-3">
          <div class="w-6 h-6 bg-[var(--color-ec-red)] rotate-45 border-2 border-[var(--color-ec-blue)]"></div>
          <span class="font-bold text-sm text-[var(--color-ec-blue)] uppercase tracking-widest">Quality Control</span>
        </div>
        <h1 class="font-['Playfair_Display',_serif] text-[40px] font-black text-[var(--color-ec-blue)] m-0 leading-none">
          Evaluasi &<br>Tindak Lanjut
        </h1>
      </div>

      <div class="relative z-10 w-[90%] mx-auto flex flex-col gap-6">
        ${cardsHTML}
      </div>

    </div>
  `;
};