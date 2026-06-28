export const TujuanComponent = (data) => {
  const listItems = data.content || [];
  let gridHTML = '';

  listItems.forEach((item, index) => {
    // Logika variasi bentuk dan warna untuk gaya Memphis
    const isEven = index % 2 === 0;
    
    // Bentuk Badge Angka (Berbeda-beda tiap kotak)
    const badgeShapes = [
      'rounded-full', // 1: Lingkaran
      'rounded-none transform rotate-12', // 2: Kotak miring
      'rounded-tl-2xl rounded-br-2xl', // 3: Daun/Mata
      'rounded-none' // 4: Kotak lurus
    ];
    
    const badgeShape = badgeShapes[index % 4];
    
    // Warna bergantian
    const mainColor = isEven ? 'var(--color-ec-blue)' : 'var(--color-ec-red)';
    const accentColor = isEven ? 'var(--color-ec-red)' : 'var(--color-ec-blue)';

    gridHTML += `
      <div class="relative bg-white border-4 border-[${mainColor}] p-6 shadow-[8px_8px_0px_0px_${accentColor}] transition-transform duration-300 hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[12px_12px_0px_0px_${accentColor}] flex flex-col justify-center min-h-[140px] z-10 group">
        
        <div class="absolute -top-6 -left-6 w-12 h-12 bg-[${mainColor}] border-[3px] border-[${accentColor}] ${badgeShape} flex items-center justify-center z-20 transition-transform group-hover:scale-110">
          <span class="font-black text-xl text-white transform ${index === 1 ? '-rotate-12' : ''}">${index + 1}</span>
        </div>

        <p class="m-0 text-[15px] font-semibold text-gray-800 leading-relaxed text-center relative z-10 mt-2">
          ${item}
        </p>

        <div class="absolute bottom-2 right-2 opacity-20">
           ${isEven 
             ? `<svg width="20" height="20"><circle cx="10" cy="10" r="5" fill="${mainColor}"/></svg>` 
             : `<svg width="20" height="20"><rect x="5" y="5" width="10" height="10" fill="${mainColor}"/></svg>`
           }
        </div>
      </div>
    `;
  });

  return `
    <div class="relative w-full h-full flex flex-col pt-4">
      
      <div class="absolute top-[80px] right-[-20px] z-0 opacity-20">
        <svg width="250" height="250" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="var(--color-ec-red)" stroke-width="4"/>
          <circle cx="50" cy="50" r="30" fill="none" stroke="var(--color-ec-blue)" stroke-width="4"/>
          <circle cx="50" cy="50" r="15" fill="var(--color-ec-red)"/>
        </svg>
      </div>

      <div class="absolute bottom-20 left-10 z-0">
        <svg width="80" height="80" viewBox="0 0 100 100">
          <line x1="10" y1="90" x2="90" y2="10" stroke="var(--color-ec-blue)" stroke-width="8" stroke-linecap="round"/>
          <polyline points="40,10 90,10 90,60" fill="none" stroke="var(--color-ec-blue)" stroke-width="8" stroke-linejoin="round" stroke-linecap="round"/>
        </svg>
      </div>

      <div class="absolute top-[40%] -left-4 z-0 opacity-80">
        <svg width="60" height="100" viewBox="0 0 60 100">
          <line x1="0" y1="20" x2="60" y2="0" stroke="var(--color-ec-red)" stroke-width="3"/>
          <line x1="0" y1="40" x2="60" y2="20" stroke="var(--color-ec-red)" stroke-width="3"/>
          <line x1="0" y1="60" x2="60" y2="40" stroke="var(--color-ec-red)" stroke-width="3"/>
          <line x1="0" y1="80" x2="60" y2="60" stroke="var(--color-ec-red)" stroke-width="3"/>
        </svg>
      </div>


      <div class="mb-16 relative z-10">
        <div class="flex items-center gap-2 mb-3">
          <div class="w-6 h-6 bg-[var(--color-ec-red)] rounded-full border-2 border-[var(--color-ec-blue)] flex items-center justify-center">
             <div class="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <span class="font-bold text-sm text-[var(--color-ec-blue)] uppercase tracking-widest">Target & Sasaran</span>
        </div>
        
        <h1 class="font-['Playfair_Display',_serif] text-[48px] font-black text-[var(--color-ec-blue)] m-0 leading-none">
          Tujuan Kegiatan
        </h1>
      </div>

      <div class="relative z-10 w-[85%] mx-auto grid grid-cols-2 gap-x-10 gap-y-12 mt-8">
        ${gridHTML}
      </div>

      <div class="absolute bottom-12 right-[40%] z-0 flex gap-2">
         <div class="w-3 h-3 bg-[var(--color-ec-blue)] rounded-full"></div>
         <div class="w-3 h-3 bg-[var(--color-ec-red)] rounded-full"></div>
         <div class="w-3 h-3 bg-[var(--color-ec-blue)] rounded-full"></div>
      </div>

    </div>
  `;
};