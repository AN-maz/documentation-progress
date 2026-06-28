export const RABComponent = (rabData, isLastPage = false, grandTotal = 0) => {
  const formatRp = (angka) => (angka === 0 ? "-" : angka.toLocaleString('id-ID').replace(/,/g, '.'));

  let tableRows = '';
  rabData.forEach(group => {
    tableRows += `<tr class="bg-[#1e3a8a] text-white text-sm font-semibold"><td colspan="6" class="border border-black px-2 py-1 text-center">${group.kategori}</td></tr>`;
    group.items.forEach(item => {
      tableRows += `
        <tr class="text-[13px] text-black">
          <td class="border border-black px-2 py-1 text-center">${item.no}</td>
          <td class="border border-black px-2 py-1">${item.uraian}</td>
          <td class="border border-black px-2 py-1">${item.subUraian}</td>
          <td class="border border-black px-2 py-1 text-center">${item.qty}</td>
          <td class="border border-black px-2 py-1 text-right">${formatRp(item.harga)}</td>
          <td class="border border-black px-2 py-1 text-right">${formatRp(item.total)}</td>
        </tr>`;
    });
    tableRows += `<tr class="bg-[#f59e0b] font-bold text-black text-sm"><td colspan="5" class="border border-black px-2 py-1 text-center">Total</td><td class="border border-black px-2 py-1 text-right">${formatRp(group.subtotal)}</td></tr>`;
  });

  return `
    <h2 class="text-xl font-bold text-[var(--color-ec-blue)] mb-4 border-b-2 border-[var(--color-ec-red)] pb-2 inline-block">IX. Rancangan Anggaran Biaya</h2>
    <table class="w-full border-collapse border border-black text-left mt-2">
      <thead>
        <tr class="bg-[#bbf7d0] text-[#1e3a8a] font-bold text-sm">
          <th class="border border-black px-2 py-2 text-center">No.</th>
          <th class="border border-black px-2 py-2 text-center">Uraian</th>
          <th class="border border-black px-2 py-2 text-center">Sub</th>
          <th class="border border-black px-2 py-2 text-center">Qty</th>
          <th class="border border-black px-2 py-2 text-center">Harga</th>
          <th class="border border-black px-2 py-2 text-center">Total</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows}
        ${isLastPage ? `
          <tr class="bg-[#bbf7d0] text-black font-bold text-[15px]">
            <td colspan="5" class="border border-black px-2 py-3 text-center">Total Keseluruhan</td>
            <td class="border border-black px-2 py-3 text-right">Rp ${formatRp(grandTotal)}</td>
          </tr>` : ''}
      </tbody>
    </table>
  `;
};