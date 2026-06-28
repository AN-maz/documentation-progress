export const LandasanComponent = (data) => {
  const listItems = data.content || [];
  let listHTML = '';

  listItems.forEach((item, index) => {
    // Logika untuk warna dan bentuk berselang-seling (Ganjil/Genap)
    const isEven = index % 2 !== 0; // index dimulai dari 0
    
    // Variabel class Tailwind dinamis
    const shape = isEven ? 'rounded-none transform -rotate-6' : 'rounded-full';
    const borderColor = isEven ? 'border-[var(--color-ec-red)]' : 'border-[var(--color-ec-blue)]';
    const shadowColor = isEven ? 'shadow-[5px_5px_0px_0px_var(--color-ec-blue)]' : 'shadow-[5px_5px_0px_0px_var(--color-ec-red)]';
    const hoverShadow = isEven ? 'hover:shadow-[8px_8px_0px_0px_var(--color-ec-blue)]' : 'hover:shadow-[8px_8px_0px_0px_var(--color-ec-red)]';
    const textColor = isEven ? 'text-[var(--color-ec-red)]' : 'text-[var(--color-ec-blue)]';

    listHTML += `
      <div class="relative flex items-center gap-6 mb-8 group z-10 w-[90%] mx-auto">
        
        ${index !== listItems.length - 1 
          ? `<div class="absolute left-[26px] top-[50px] w-[4px] h-[calc(100%+20px)] bg-[var(--color-ec-blue)] z-0"></div>` 
          : ''
        }

        <div class="w-14 h-14 shrink-0 bg-white border-4 ${borderColor} ${shadowColor} flex items-center justify-center z-10 ${shape} transition-transform duration-300 group-hover:scale-110">
          <span class="font-black text-2xl ${textColor} transform ${isEven ? 'rotate-6' : ''}">${index + 1}</span>
        </div>

        <div class="flex-1 bg-white border-2 ${borderColor} p-5 ${shadowColor} transition-all duration-300 hover:-translate-y-1 hover:-translate-x-1 ${hoverShadow}">
          <p class="m-0 text-[14.5px] font-medium text-gray-800 leading-relaxed text-justify">
            ${item}
          </p>
        </div>
      </div>
    `;
  });

  return `
    <div class="relative w-full h-full flex flex-col pt-4">
      
      <div class="absolute top-4 right-10 z-0 opacity-80">
        <svg width="60" height="60" viewBox="0 0 100 100">
          <polygon points="50,10 90,90 10,90" fill="none" stroke="var(--color-ec-red)" stroke-width="6"/>
          <polygon points="50,25 75,75 25,75" fill="var(--color-ec-blue)"/>
        </svg>
      </div>

      <div class="absolute top-[300px] left-2 z-0 opacity-60">
         <svg width="40" height="40" viewBox="0 0 40 40">
          <line x1="10" y1="10" x2="30" y2="30" stroke="var(--color-ec-blue)" stroke-width="4" stroke-linecap="round"/>
          <line x1="30" y1="10" x2="10" y2="30" stroke="var(--color-ec-blue)" stroke-width="4" stroke-linecap="round"/>
        </svg>
      </div>

      <div class="absolute bottom-[200px] right-4 z-0 opacity-60">
         <svg width="30" height="30" viewBox="0 0 40 40">
          <line x1="10" y1="10" x2="30" y2="30" stroke="var(--color-ec-red)" stroke-width="4" stroke-linecap="round"/>
          <line x1="30" y1="10" x2="10" y2="30" stroke="var(--color-ec-red)" stroke-width="4" stroke-linecap="round"/>
        </svg>
      </div>

      <div class="mb-12 relative z-10">
        <div class="flex items-center gap-2 mb-3">
          <div class="w-6 h-6 bg-[var(--color-ec-blue)] rounded-none border-2 border-[var(--color-ec-red)] flex items-center justify-center transform rotate-45">
             <div class="w-2 h-2 bg-white rounded-none"></div>
          </div>
          <span class="font-bold text-sm text-[var(--color-ec-red)] uppercase tracking-widest">Dasar Pemikiran</span>
        </div>
        
        <h1 class="font-['Playfair_Display',_serif] text-[48px] font-black text-[var(--color-ec-blue)] m-0 leading-none">
          Landasan Kegiatan
        </h1>
      </div>

      <div class="relative z-10 flex-1">
        ${listHTML}
      </div>

      <div class="absolute -bottom-4 left-10 z-0">
        <svg width="150" height="40" viewBox="0 0 150 40">
          <path d="M 0 20 Q 20 0 40 20 T 80 20 T 120 20" fill="none" stroke="var(--color-ec-blue)" stroke-width="4"/>
          <path d="M 10 30 Q 30 10 50 30 T 90 30 T 130 30" fill="none" stroke="var(--color-ec-red)" stroke-width="4"/>
        </svg>
      </div>

    </div>
  `;
};