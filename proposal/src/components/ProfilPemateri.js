export const ProfilPemateriComponent = (data) => {
  const { nama, asal, deskripsi, pencapaian, foto } = data.content;

  let listHTML = "";
  pencapaian.forEach((item, index) => {
    listHTML += `
      <div class="flex items-start gap-2 bg-white border-2 border-[var(--color-ec-blue)] p-2.5 shadow-[3px_3px_0px_0px_var(--color-ec-red)] hover:-translate-y-1 hover:shadow-[5px_5px_0px_0px_var(--color-ec-red)] transition-all h-full">
        <div class="w-7 h-7 bg-[var(--color-ec-blue)] text-white font-black flex items-center justify-center shrink-0 border border-black shadow-[2px_2px_0px_0px_white]">
          ${index + 1}
        </div>
        <p class="text-[11px] md:text-[12px] text-gray-800 leading-snug font-bold m-0 text-left flex-1">
          ${item}
        </p>
      </div>
    `;
  });

  return /*html*/`
    <div class="relative w-full max-w-[750px] mx-auto bg-white flex flex-col py-6 px-8 items-center justify-center text-center overflow-hidden box-border shadow-xl aspect-[1/1.414] print:shadow-none print:w-[210mm] print:h-[297mm] print:aspect-auto">
      
      <div class="absolute top-6 left-6 z-0 opacity-30">
        <svg width="100" height="100" viewBox="0 0 100 100">
          <defs>
            <pattern id="dots-pemateri" x="0" y="0" width="15" height="15" patternUnits="userSpaceOnUse">
              <circle cx="3" cy="3" r="3" fill="var(--color-ec-blue)"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#dots-pemateri)"/>
        </svg>
      </div>

      <div class="absolute bottom-8 right-6 z-0 opacity-40">
         <svg width="80" height="80" viewBox="0 0 100 100">
           <polygon points="50,10 90,90 10,90" fill="none" stroke="var(--color-ec-red)" stroke-width="8"/>
         </svg>
      </div>
      
      <div class="absolute top-1/4 right-6 z-0 opacity-80 animate-pulse">
        <svg width="35" height="35" viewBox="0 0 24 24" fill="var(--color-ec-red)">
          <path d="M12 0l2.5 8.5H24l-7.5 5.5 2.5 8.5-7.5-5.5-7.5 5.5 2.5-8.5-7.5-5.5h9.5z" stroke="var(--color-ec-blue)" stroke-width="1.5"/>
        </svg>
      </div>

      <div class="mb-3 relative z-10 flex flex-col items-center">
        </div>
      <h1 class="relative z-10 font-['Playfair_Display',_serif] text-[36px] md:text-[40px] font-black text-[var(--color-ec-blue)] m-0 mb-4 leading-none">
        Profil Pemateri
      </h1>

      <div class="relative z-10 mb-4">
         <div class="inline-block transform rotate-2">
           <div class="w-32 h-44 md:w-36 md:h-48 bg-gray-200 border-4 border-[var(--color-ec-blue)] shadow-[6px_6px_0px_0px_var(--color-ec-red)] flex items-center justify-center overflow-hidden">
             <img src="./public/pemateri1.jpg" alt="${nama}" class="w-full h-full object-cover object-top" onerror="this.style.display='none'" />
           </div>
         </div>
      </div>

      <div class="relative z-10 w-[90%] mx-auto mb-5">
        <div class="bg-[var(--color-ec-red)] border-[3px] border-[var(--color-ec-blue)] shadow-[6px_6px_0px_0px_var(--color-ec-blue)] py-2.5 px-4 transform -rotate-1 inline-block w-full">
          <h2 class="font-black text-[20px] md:text-[24px] text-white m-0 leading-tight uppercase tracking-wide">
            ${nama}
          </h2>
          <div class="mt-2 inline-block bg-white px-3 py-1 border-2 border-[var(--color-ec-blue)]">
            <p class="font-black text-[11px] md:text-[12px] text-[var(--color-ec-red)] tracking-widest uppercase m-0">
              ${asal}
            </p>
          </div>
        </div>
      </div>

      <div class="relative z-10 w-[95%] mx-auto mb-6">
        <div class="bg-[#fcfaf5] border-[3px] border-[var(--color-ec-blue)] p-3 md:p-4 shadow-[5px_5px_0px_0px_var(--color-ec-red)] relative">
          <span class="absolute -top-5 -left-2 text-4xl md:text-5xl text-[var(--color-ec-red)] font-serif block transform -rotate-12 leading-none">"</span>
          <p class="m-0 text-[12px] md:text-[13px] text-gray-800 leading-relaxed font-bold text-center px-1">
            ${deskripsi}
          </p>
          <span class="absolute -bottom-6 -right-2 text-4xl md:text-5xl text-[var(--color-ec-red)] font-serif block transform rotate-180 leading-none">"</span>
        </div>
      </div>

      <div class="relative z-10 w-[98%] mx-auto">
        <div class="mb-3 text-center">
          <span class="bg-[var(--color-ec-blue)] text-white font-black px-4 py-1.5 text-[11px] md:text-[12px] uppercase tracking-widest border-2 border-[var(--color-ec-red)] inline-block">
            Highlights & Pencapaian
          </span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
          ${listHTML}
        </div>
      </div>

    </div>
  `;
};