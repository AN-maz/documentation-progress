export const RundownComponent = (rundownData) => {
  let tableRows = '';
  rundownData.forEach((item, index) => {
    const isEven = index % 2 === 0;
    tableRows += `
      <tr class="${isEven ? 'bg-white' : 'bg-[#f2f7fb]'} hover:bg-[#fff7ed] transition-colors">
        <td class="border-b border-gray-300 px-4 py-3 font-mono font-bold text-[var(--color-ec-blue)]">${item.waktu}</td>
        <td class="border-b border-gray-300 px-4 py-3 font-medium text-gray-800">${item.kegiatan}</td>
        <td class="border-b border-gray-300 px-4 py-3 text-center font-bold text-[var(--color-ec-red)]">${item.durasi}</td>
      </tr>
    `;
  });

  return `
    <div class="relative w-full h-full pt-4">
      <h2 class="text-3xl font-black text-[var(--color-ec-blue)] mb-6 border-l-8 border-[var(--color-ec-red)] pl-4">
        Rundown Acara
      </h2>
      
      <div class="border-4 border-[var(--color-ec-blue)] shadow-[8px_8px_0px_0px_var(--color-ec-red)] overflow-hidden">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-[var(--color-ec-blue)] text-white text-sm uppercase tracking-widest">
              <th class="px-4 py-3 border-r border-white/20">Waktu</th>
              <th class="px-4 py-3 border-r border-white/20">Kegiatan</th>
              <th class="px-4 py-3 text-center">Durasi</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      </div>
    </div>
  `;
};