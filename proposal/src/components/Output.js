export const OutputComponent = (data) => {
  const listItems = data.content || [];

  let listHTML = "";
  listItems.forEach((item, index) => {
    listHTML += `
      <div class="flex items-start gap-4 mb-6 group">
        <div class="w-8 h-8 shrink-0 border-4 border-[var(--color-ec-blue)] bg-white shadow-[4px_4px_0px_0px_var(--color-ec-red)] flex items-center justify-center transition-all group-hover:rotate-12 group-hover:bg-[var(--color-ec-blue)]">
          <svg class="w-5 h-5 text-[var(--color-ec-red)] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <p class="text-[15px] text-gray-700 leading-relaxed font-medium mt-0.5">
          ${item}
        </p>
      </div>
    `;
  });

  return `
    <div class="relative w-full h-full flex flex-col pt-4">
      
      <div class="absolute top-10 right-10 z-0 opacity-40">
        <svg width="100" height="100" viewBox="0 0 50 50">
          <line x1="0" y1="0" x2="50" y2="50" stroke="var(--color-ec-blue)" stroke-width="8"/>
          <line x1="50" y1="0" x2="0" y2="50" stroke="var(--color-ec-red)" stroke-width="8"/>
        </svg>
      </div>

      <div class="absolute bottom-10 -left-10 z-0 opacity-20">
         <svg width="200" height="200" viewBox="0 0 100 100">
           <path d="M 50 0 A 50 50 0 0 1 100 50 A 50 50 0 0 1 50 100 A 50 50 0 0 1 0 50 A 50 50 0 0 1 50 0 Z" fill="var(--color-ec-red)"/>
         </svg>
      </div>

      <div class="mb-10 relative z-10">
        <div class="flex items-center gap-2 mb-3">
          <div class="w-6 h-6 bg-[var(--color-ec-blue)] border-2 border-[var(--color-ec-red)] flex items-center justify-center">
             <div class="w-3 h-3 border-2 border-white"></div>
          </div>
          <span class="font-bold text-sm text-[var(--color-ec-red)] uppercase tracking-widest">Expected Outcomes</span>
        </div>
        
        <h1 class="font-['Playfair_Display',_serif] text-[40px] font-black text-[var(--color-ec-blue)] m-0 leading-none">
          Output yang<br>Diharapkan
        </h1>
      </div>

      <div class="relative z-10 w-[90%] mx-auto mt-6">
        <div class="bg-[#f2f7fb] p-8 border-4 border-[var(--color-ec-blue)] shadow-[10px_10px_0px_0px_var(--color-ec-blue)]">
          ${listHTML}
        </div>
      </div>

    </div>
  `;
};
