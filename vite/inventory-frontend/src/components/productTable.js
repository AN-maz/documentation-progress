import { formatRupiah } from "../utils/formatter";

export function renderTabel(produkList, onEdit, onHapus) {
  const tbody = document.getElementById("tabel-body");
  if (!tbody) return;

  if (produkList.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="5" class="px-4 py-6 text-center text-gray-400">Belum ada produk</td></tr>';
    return;
  }

  tbody.innerHTML = produkList
    .map(
      (produk) => /*html*/ `
    <tr class="border-t border-gray-100 hover:bg-gray-50">
      <td class="px-4 py-3 text-gray-500">${produk.id}</td>
      <td class="px-4 py-3 font-medium text-gray-800">${produk.name}</td>
      <td class="px-4 py-3 text-gray-600">${formatRupiah(produk.price)}</td>
      <td class="px-4 py-3">
        <span class="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">${produk.category_name}</span>
      </td>
      <td class="px-4 py-3 flex gap-2">
        <button class="btn-edit bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded"
          data-id="${produk.id}" 
          data-name="${produk.name}" 
          data-price="${produk.price}" 
          data-category="${produk.category_name}"> Edit
        </button>
        <button class="btn-hapus bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded"
          data-id="${produk.id}">
          Hapus
        </button>
      </td>
    </tr>
  `,
    )
    .join("");

  // Event delegation attachment via callbacks
  tbody.querySelectorAll(".btn-edit").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const d = e.target.dataset;
      onEdit(d.id, d.name, d.price, d.category);
    });
  });

  tbody.querySelectorAll(".btn-hapus").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      onHapus(e.target.dataset.id);
    });
  });
}
