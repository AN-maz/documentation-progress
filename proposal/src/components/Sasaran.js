export const SasaranComponent = (data) => {
  const listItems = data.content || [];
  
  // Persentase target audiens berdasarkan referensi PDF Anda
  const percentages = [40, 30, 20, 10]; 
  
  let barsHTML = '';

  listItems.forEach((item, index) => {
    // Logika variasi gaya Memphis (Ganjil/Genap)
    const isEven = index % 2 === 0;
    const percentage = percentages[index] || 25; // Default 25% jika data lebih dari 4
    
    // Kombinasi Warna Bersilang
    const fillColor = isEven ? 'bg-[var(--color-ec-blue)]' : 'bg-[var(--color-ec-red)]';
    const shadowColor = isEven ? 'shadow-[6px_6px_0px_0px_var(--color-ec-red)]' : 'shadow-[6px_6px_0px_0px_var(--color-ec-blue)]';
    const hoverShadow = isEven ? 'hover:shadow-[10px_10px_0px_0px_var(--color-ec-red)]' : 'hover:shadow-[10px_10px_0px_0px_var(--color-ec-blue)]';
    const percentTextColor = isEven ? 'text-[var(--color-ec-red)]' : 'text-[var(--color-ec-blue)]';
    const iconColor = isEven ? 'text-[var(--color-ec-blue)]' : 'text-[var(--color-ec-red)]';

    barsHTML += `
      <div class="mb-10 relative z-10 group">
        
        <div class="flex justify-between items-end mb-3">
          <div class="flex items-center gap-3">
            <svg class="w-6 h-6 ${iconColor}" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            <h3 class="text-[17px] font-bold text-gray-800 m-0">${item}</h3>
          </div>
          <span class="text-3xl font-black ${percentTextColor} font-['Playfair_Display'] transform group-hover:scale-110 transition-transform">${percentage}%</span>
        </div>

        <div class="w-full h-8 bg-white border-4 border-[var(--color-ec-blue)] ${shadowColor} p-[2px] transition-all duration-300 ${hoverShadow} hover:-translate-y-1 hover:-translate-x-1">
          <div class="h-full ${fillColor} w-[${percentage}%] relative overflow-hidden">
             <div class="absolute top-0 -left-10 w-8 h-full bg-white opacity-20 transform skew-x-[-20deg]"></div>
          </div>
        </div>

      </div>
    `;
  });

  return `
    <div class="relative w-full h-full flex flex-col pt-4">
      
      <div class="absolute top-10 right-0 z-0 opacity-40 overflow-hidden w-[150px] h-[150px]">
        <svg width="200" height="200" viewBox="0 0 200 200">
          <circle cx="200" cy="0" r="150" fill="none" stroke="var(--color-ec-blue)" stroke-width="4"/>
          <circle cx="200" cy="0" r="110" fill="none" stroke="var(--color-ec-red)" stroke-width="4" stroke-dasharray="10,10"/>
          <circle cx="200" cy="0" r="70" fill="none" stroke="var(--color-ec-blue)" stroke-width="4"/>
        </svg>
      </div>

      <div class="absolute bottom-16 left-8 z-0">
        <svg width="60" height="60" viewBox="0 0 50 50">
          <polyline points="10,20 25,35 40,20" fill="none" stroke="var(--color-ec-blue)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
          <polyline points="10,35 25,50 40,35" fill="none" stroke="var(--color-ec-red)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>

      <div class="absolute bottom-32 right-12 z-0 opacity-80">
        <svg width="40" height="40" viewBox="0 0 50 50">
          <polygon points="25,0 32,15 50,20 38,32 40,50 25,40 10,50 12,32 0,20 18,15" fill="var(--color-ec-red)" stroke="var(--color-ec-blue)" stroke-width="2"/>
        </svg>
      </div>


      <div class="mb-14 relative z-10">
        <div class="flex items-center gap-2 mb-3">
          <div class="w-6 h-6 bg-[var(--color-ec-blue)] border-2 border-[var(--color-ec-red)] flex items-center justify-center transform rotate-45">
             <div class="w-2 h-2 bg-white"></div>
          </div>
          <span class="font-bold text-sm text-[var(--color-ec-red)] uppercase tracking-widest">Demografi</span>
        </div>
        
        <h1 class="font-['Playfair_Display',_serif] text-[48px] font-black text-[var(--color-ec-blue)] m-0 leading-none">
          Sasaran Audiens
        </h1>
      </div>

      <div class="relative z-10 w-[90%] mx-auto mt-4">
        ${barsHTML}
      </div>

    </div>
  `;
};