export const KepanitiaanComponent = (data, page = 1) => {
  const divisions = data.content || [];
  
  // LOGIKA PEMBAGIAN:
  // Halaman 1: Divisi 1-5 (Inti/Pengurus)
  // Halaman 2: Divisi 6-10 (Operasional/Lapangan)
  const splitIndex = 5; 
  const currentDivisions = page === 1 
    ? divisions.slice(0, splitIndex) 
    : divisions.slice(splitIndex);

  let cardsHTML = '';
  currentDivisions.forEach((div, index) => {
    const isEven = index % 2 === 0;
    const headerBg = isEven ? 'bg-[var(--color-ec-blue)]' : 'bg-[var(--color-ec-red)]';
    const shadowColor = isEven ? 'shadow-[6px_6px_0px_0px_var(--color-ec-red)]' : 'shadow-[6px_6px_0px_0px_var(--color-ec-blue)]';

    let membersHTML = div.anggota.map(member => `
      <div class="py-1.5 border-b border-dashed border-gray-200 last:border-0">
        <span class="block font-bold text-[12px] text-gray-800 leading-tight">${member.nama}</span>
        <span class="block font-mono text-[10px] text-[var(--color-ec-red)] font-semibold">${member.nim}</span>
      </div>
    `).join('');

    cardsHTML += `
      <div class="break-inside-avoid mb-6 border-4 border-[var(--color-ec-blue)] bg-white ${shadowColor}">
        <div class="${headerBg} border-b-4 border-[var(--color-ec-blue)] py-2 px-2">
          <h3 class="text-white font-black text-center text-[12px] uppercase tracking-wider m-0">${div.divisi}</h3>
        </div>
        <div class="p-3">${membersHTML}</div>
      </div>
    `;
  });

  return `
    <div class="relative w-full h-full flex flex-col pt-4">
      <div class="mb-8 relative z-10">
        <h1 class="font-['Playfair_Display',_serif] text-[40px] font-black text-[var(--color-ec-blue)] m-0">
          Kepanitiaan ${page === 1 ? 'I' : 'II'}
        </h1>
      </div>
      <div class="relative z-10 w-full columns-2 gap-6">
        ${cardsHTML}
      </div>
    </div>
  `;
};