export const ProfilPemateriComponent = (data) => {
  const { nama, asal, deskripsi, pencapaian } = data.content;

  let listHTML = "";
  pencapaian.forEach((item, index) => {
    // Ornamen bentuk bergantian
    const shape =
      index % 2 === 0 ? "rounded-full" : "rounded-none transform rotate-45";

    listHTML += `
      <div class="flex items-start gap-4 mb-4 group">
        <div class="mt-1 w-6 h-6 bg-[var(--color-ec-red)] border-2 border-[var(--color-ec-blue)] flex items-center justify-center shrink-0 ${shape} transition-transform group-hover:scale-125">
          <div class="w-2 h-2 bg-white ${index % 2 !== 0 ? "transform -rotate-45" : ""}"></div>
        </div>
        <p class="text-[14px] text-gray-700 leading-relaxed font-medium m-0 flex-1">
          ${item}
        </p>
      </div>
    `;
  });

  return /*html*/`
    <div class="relative w-full h-full flex flex-col pt-4">
      
      <div class="absolute top-10 right-0 z-0 opacity-40">
        <svg width="120" height="120" viewBox="0 0 100 100">
          <defs>
            <pattern id="dots-pemateri" x="0" y="0" width="15" height="15" patternUnits="userSpaceOnUse">
              <circle cx="3" cy="3" r="3" fill="var(--color-ec-blue)"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#dots-pemateri)"/>
        </svg>
      </div>

      <div class="absolute bottom-10 left-[-20px] z-0 opacity-60">
         <svg width="80" height="80" viewBox="0 0 100 100">
           <polygon points="50,10 90,90 10,90" fill="none" stroke="var(--color-ec-red)" stroke-width="6"/>
         </svg>
      </div>

      <div class="mb-12 relative z-10">
        <div class="flex items-center gap-2 mb-3">
          <div class="w-6 h-6 bg-[var(--color-ec-blue)] rounded-none border-2 border-[var(--color-ec-red)] flex items-center justify-center transform rotate-45">
             <div class="w-2 h-2 bg-white rounded-none"></div>
          </div>
          <span class="font-bold text-sm text-[var(--color-ec-red)] uppercase tracking-widest">Guest Speaker</span>
        </div>
        
        <h1 class="font-['Playfair_Display',_serif] text-[48px] font-black text-[var(--color-ec-blue)] m-0 leading-none">
          Profil Pemateri
        </h1>
      </div>

      <div class="relative z-10 w-[95%] mx-auto flex gap-10 items-start">
        
        <div class="w-[220px] shrink-0 relative group">
          <div class="absolute top-4 left-4 w-full h-[280px] bg-[var(--color-ec-red)] border-4 border-[var(--color-ec-blue)]"></div>
          <div class="relative w-full h-[280px] bg-gray-200 border-4 border-[var(--color-ec-blue)] overflow-hidden transition-transform group-hover:-translate-y-2 group-hover:-translate-x-2 bg-white flex items-center justify-center">
            
            <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=600&auto=format&fit=crop" alt="Foto Pemateri" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500">
            
            <svg class="absolute w-20 h-20 text-gray-400 opacity-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
          </div>
        </div>

        <div class="flex-1">
          <div class="mb-6 border-b-4 border-[var(--color-ec-blue)] pb-4 inline-block pr-10">
            <h2 class="font-black text-3xl text-[var(--color-ec-blue)] m-0 leading-tight">${nama}</h2>
            <p class="font-bold text-[16px] text-[var(--color-ec-red)] tracking-widest uppercase m-0 mt-1">${asal}</p>
          </div>

          <div class="bg-[#f2f7fb] border-l-8 border-[var(--color-ec-blue)] p-5 mb-8 text-justify">
            <p class="m-0 text-[14px] text-gray-800 leading-relaxed font-medium">
              ${deskripsi}
            </p>
          </div>

          <div class="flex flex-col">
            ${listHTML}
          </div>
        </div>

      </div>

    </div>
  `;
};
