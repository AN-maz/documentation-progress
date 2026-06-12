export function tampilkanNotifikasi(pesan, tipe = 'sukses') {
  const el = document.getElementById('notifikasi');
  if (!el) return;

  el.textContent = pesan;
  el.className = 'px-4 py-3 rounded mb-4 text-sm block';
  
  if (tipe === 'sukses') {
    el.classList.add('bg-green-100', 'text-green-800', 'border', 'border-green-300');
  } else {
    el.classList.add('bg-red-100', 'text-red-800', 'border', 'border-red-300');
  }

  setTimeout(() => {
    el.classList.add('hidden');
  }, 3000);
}