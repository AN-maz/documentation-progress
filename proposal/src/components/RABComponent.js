export const RABComponent = (rabData, isFirstPage = false, isLastPage = false, totals = {}) => {
  
  // Format angka ke format Rupiah dengan pengaman (Safe Fallback)
  const formatRp = (angka) => {
    if (!angka || angka === 0 || angka === "-") return "-";
    return "Rp " + Number(angka).toLocaleString('id-ID');
  };

  let tableRows = '';

  rabData.forEach(group => {
    // Header Kategori
    tableRows += `
      <tr class="bg-[var(--color-ec-blue)] text-white text-[13px] font-black uppercase tracking-wider">
        <td colspan="6" class="border-2 border-[var(--color-ec-blue)] px-3 py-2">${group.kategori}</td>
      </tr>
    `;

    // Looping Item
    group.items.forEach(item => {
      // Mengatasi undefined pada keterangan
      const keterangan = item.ket || "-"; 
      
      tableRows += `
        <tr class="text-[12px] text-gray-800 bg-white font-medium hover:bg-gray-100 transition-colors">
          <td class="border-2 border-[var(--color-ec-blue)] px-2 py-1.5 text-center font-bold">${item.no}</td>
          <td class="border-2 border-[var(--color-ec-blue)] px-2 py-1.5">${item.uraian}</td>
          <td class="border-2 border-[var(--color-ec-blue)] px-2 py-1.5 text-center">${item.qty}</td>
          <td class="border-2 border-[var(--color-ec-blue)] px-2 py-1.5 text-right">${formatRp(item.harga)}</td>
          <td class="border-2 border-[var(--color-ec-blue)] px-2 py-1.5 text-right font-bold">${formatRp(item.total)}</td>
          <td class="border-2 border-[var(--color-ec-blue)] px-2 py-1.5 text-center">${keterangan}</td>
        </tr>
      `;
    });

    // Subtotal Kategori
    tableRows += `
      <tr class="bg-[#fde8e8] text-[var(--color-ec-red)] text-[12px] font-black">
        <td colspan="4" class="border-2 border-[var(--color-ec-blue)] px-3 py-1.5 text-right uppercase">Total</td>
        <td class="border-2 border-[var(--color-ec-blue)] px-2 py-1.5 text-right">${formatRp(group.subtotal)}</td>
        <td class="border-2 border-[var(--color-ec-blue)]"></td>
      </tr>
    `;
  });

  return `
    <div class="relative w-full h-full flex flex-col pt-4 pb-6">
      
      ${isFirstPage ? `
        <h2 class="text-3xl font-black text-[var(--color-ec-blue)] mb-6 border-l-8 border-[var(--color-ec-red)] pl-4">
          IX. Rancangan Anggaran Biaya
        </h2>
      ` : ''}
      
      <div class="w-full border-4 border-[var(--color-ec-blue)] shadow-[8px_8px_0px_0px_var(--color-ec-red)] bg-white overflow-hidden">
        <table class="w-full border-collapse text-left">
          <thead>
            <tr class="bg-[var(--color-ec-red)] text-white font-black text-[11px] uppercase tracking-widest">
              <th class="border-2 border-[var(--color-ec-blue)] px-2 py-3 text-center w-[5%]">No.</th>
              <th class="border-2 border-[var(--color-ec-blue)] px-2 py-3 text-center w-[30%]">Uraian Pengeluaran</th>
              <th class="border-2 border-[var(--color-ec-blue)] px-2 py-3 text-center w-[10%]">Qty</th>
              <th class="border-2 border-[var(--color-ec-blue)] px-2 py-3 text-center w-[18%]">Harga Satuan</th>
              <th class="border-2 border-[var(--color-ec-blue)] px-2 py-3 text-center w-[20%]">Jumlah</th>
              <th class="border-2 border-[var(--color-ec-blue)] px-2 py-3 text-center w-[17%]">Keterangan</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
            
            ${isLastPage ? `
              <tr class="bg-[var(--color-ec-blue)] text-white font-black text-[14px]">
                <td colspan="4" class="border-2 border-[var(--color-ec-blue)] px-3 py-3 text-right uppercase">Total Keseluruhan</td>
                <td class="border-2 border-[var(--color-ec-blue)] px-2 py-3 text-right">${formatRp(totals.totalKeseluruhan)}</td>
                <td class="border-2 border-[var(--color-ec-blue)]"></td>
              </tr>
              <tr class="bg-[#fefce8] text-gray-800 font-bold text-[12px]">
                <td colspan="4" class="border-2 border-[var(--color-ec-blue)] px-3 py-3 text-right">
                  <span class="text-[var(--color-ec-red)]">Biaya tak terduga (10%)</span> <br>
                  <span class="font-normal text-[11px]">Digunakan untuk mengantisipasi kebutuhan mendadak diluar rencana.</span>
                </td>
                <td class="border-2 border-[var(--color-ec-blue)] px-2 py-3 text-right text-[var(--color-ec-red)]">${formatRp(totals.biayaTakTerduga)}</td>
                <td class="border-2 border-[var(--color-ec-blue)]"></td>
              </tr>
              <tr class="bg-[var(--color-ec-red)] text-white font-black text-[16px]">
                <td colspan="4" class="border-2 border-[var(--color-ec-blue)] px-3 py-4 text-right uppercase">Total Keseluruhan</td>
                <td class="border-2 border-[var(--color-ec-blue)] px-2 py-4 text-right">${formatRp(totals.grandTotal)}</td>
                <td class="border-2 border-[var(--color-ec-blue)]"></td>
              </tr>
            ` : ''}
          </tbody>
        </table>
      </div>
    </div>
  `;
};