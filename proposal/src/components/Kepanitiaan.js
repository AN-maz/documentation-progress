export const KepanitiaanComponent = (data, page = 1) => {
  const divisions = data.content || [];
  
  // Fungsi memisahkan Nama dan Jabatan
  const parseName = (rawString) => {
    const match = rawString.match(/^(.*?)\s*\((.*?)\)$/);
    if (match) return { name: match[1].trim(), role: match[2].trim() };
    return { name: rawString.trim(), role: null };
  };

  // LOGIKA PEMBAGIAN DIPERBARUI:
  // Halaman 1: Topman + 3 Divisi (agar tidak over-capacity di halaman 1)
  // Halaman 2: Sisa Divisi
  const splitIndex = 4; 
  const currentDivisions = page === 1 
    ? divisions.slice(0, splitIndex) 
    : divisions.slice(splitIndex);

  const topmanDiv = currentDivisions.find(d => d.divisi.toLowerCase() === 'topman');
  const regularDivs = currentDivisions.filter(d => d.divisi.toLowerCase() !== 'topman');

  // --- 1. RENDER TOPMAN ---
  let topmanHTML = '';
  if (topmanDiv) {
    let topmanMembers = topmanDiv.anggota.map(member => {
      const { name, role } = parseName(member.nama);
      return `
        <div class="relative flex flex-col p-2 bg-white border-2 border-[var(--color-ec-blue)] shadow-[4px_4px_0px_0px_var(--color-ec-red)]">
          <span class="absolute -top-2.5 -right-2 bg-[var(--color-ec-red)] text-white text-[8px] px-2 py-0.5 border-2 border-[var(--color-ec-blue)] font-black uppercase z-10 transform rotate-3">
            ${role || 'Pengurus'}
          </span>
          <span class="block font-black text-[12px] text-[var(--color-ec-blue)] leading-tight mt-1 pr-6">${name}</span>
          <span class="block font-mono text-[9px] text-gray-600 font-bold mt-0.5">${member.nim}</span>
        </div>
      `;
    }).join('');

    topmanHTML = `
      <div class="mb-5 border-4 border-[var(--color-ec-blue)] bg-amber-50 shadow-[6px_6px_0px_0px_var(--color-ec-blue)] w-full block break-inside-avoid">
        <div class="bg-[var(--color-ec-blue)] border-b-4 border-[var(--color-ec-blue)] py-1.5 px-3">
          <h3 class="text-white font-black text-center text-[14px] uppercase tracking-widest m-0 flex items-center justify-center gap-2">
            <span class="text-[var(--color-ec-red)]">★</span> 
            PENGURUS INTI (TOPMAN) 
            <span class="text-[var(--color-ec-red)]">★</span>
          </h3>
        </div>
        <div class="p-3 grid grid-cols-2 gap-x-3 gap-y-4">
          ${topmanMembers}
        </div>
      </div>
    `;
  }

  // --- 2. RENDER DIVISI REGULER ---
  let cardsHTML = '';
  regularDivs.forEach((div, index) => {
    const isEven = index % 2 === 0;
    const headerBg = isEven ? 'bg-[var(--color-ec-blue)]' : 'bg-[var(--color-ec-red)]';
    const shadowColor = isEven ? 'shadow-[4px_4px_0px_0px_var(--color-ec-red)]' : 'shadow-[4px_4px_0px_0px_var(--color-ec-blue)]';

    let membersHTML = div.anggota.map(member => {
      const { name, role } = parseName(member.nama);
      const isKadiv = role && role.toLowerCase().includes('kadiv');

      const wrapperClass = isKadiv 
        ? "p-2 bg-amber-100 border-2 border-[var(--color-ec-blue)] mb-1.5 mt-0.5 relative" 
        : "py-1 border-b border-dashed border-gray-300 last:border-0";
        
      const roleBadge = role 
        ? `<span class="bg-[var(--color-ec-red)] text-white text-[7px] px-1.5 py-0.5 ml-1 rounded-sm font-bold uppercase inline-block -translate-y-0.5 border border-black">${role}</span>`
        : '';

      return `
        <div class="${wrapperClass}">
          <span class="block font-bold text-[11px] text-gray-800 leading-tight">
            ${name} ${!isKadiv && role ? roleBadge : ''}
          </span>
          <span class="block font-mono text-[9px] text-[var(--color-ec-red)] font-semibold mt-0.5">${member.nim}</span>
          
          ${isKadiv ? `
            <span class="absolute top-1/2 -translate-y-1/2 right-2 text-[var(--color-ec-blue)] font-black text-[9px] uppercase opacity-80 rotate-[-5deg]">
              ★ KADIV
            </span>
          ` : ''}
        </div>
      `;
    }).join('');

    // PERBAIKAN PENTING: Tambah "inline-block w-full break-inside-avoid" agar kotak tidak pernah terpotong setengah
    cardsHTML += `
      <div class="inline-block w-full break-inside-avoid mb-4 border-4 border-[var(--color-ec-blue)] bg-white ${shadowColor}">
        <div class="${headerBg} border-b-4 border-[var(--color-ec-blue)] py-1.5 px-2">
          <h3 class="text-white font-black text-center text-[11px] uppercase tracking-wider m-0">${div.divisi}</h3>
        </div>
        <div class="p-2.5">${membersHTML}</div>
      </div>
    `;
  });

  // --- 3. RETURN KOMPONEN ---
  return `
    <div class="relative w-full h-full flex flex-col pt-2">
      <div class="mb-4 relative z-10">
        <h1 class="font-['Playfair_Display',_serif] text-[36px] font-black text-[var(--color-ec-blue)] m-0">
          Kepanitiaan ${page === 1 ? 'I' : 'II'}
        </h1>
      </div>
      <div class="relative z-10 w-full flex-1">
        ${topmanHTML}
        
        <div class="columns-2 gap-4">
          ${cardsHTML}
        </div>
      </div>
    </div>
  `;
};