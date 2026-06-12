import { getSemuaProduk, tambahProduk, updateProduk, hapusProduk } from './api/productApi';
import { ProductForm } from './components/productForm';
import { renderTabel } from './components/productTable';
import { tampilkanNotifikasi } from './components/notification';
import './style.css';

// Core Flow: Ambil data lalu Render ulang
async function muatUlangData() {
  try {
    const produkList = await getSemuaProduk();
    renderTabel(produkList, handleKlikEdit, handleKlikHapus);
  } catch (error) {
    tampilkanNotifikasi('Gagal memuat data: ' + error.message, 'gagal');
  }
}

// Handlers
function handleKlikEdit(id, name, price, categoryId) {
  ProductForm.isiForm(id, name, price, categoryId);
}

async function handleKlikHapus(id) {
  if (!confirm(`Yakin ingin menghapus produk dengan ID ${id}?`)) return;
  try {
    await hapusProduk(id);
    tampilkanNotifikasi('Produk berhasil dihapus!');
    await muatUlangData();
  } catch (error) {
    tampilkanNotifikasi('Gagal menghapus: ' + error.message, 'gagal');
  }
}

async function handleSubmit() {
  const { id, name, price, categoryId } = ProductForm.getValues();

  if (!name || !price || !categoryId) {
    tampilkanNotifikasi('Semua field harus diisi!', 'gagal');
    return;
  }

  const dataProduk = { name, price: Number(price), category_id: Number(categoryId) };

  try {
    if (id) {
      await updateProduk(id, dataProduk);
      tampilkanNotifikasi('Produk berhasil diupdate!');
    } else {
      await tambahProduk(dataProduk);
      tampilkanNotifikasi('Produk berhasil ditambahkan!');
    }
    ProductForm.reset();
    await muatUlangData();
  } catch (error) {
    tampilkanNotifikasi('Gagal menyimpan: ' + error.message, 'gagal');
  }
}

// Inisialisasi Event Listener Utama
document.addEventListener('DOMContentLoaded', () => {
  const btnSubmit = document.getElementById('btn-submit');
  const btnCancel = document.getElementById('btn-cancel');

  // Defensive programming: pastikan elemennya memang ada sebelum dipasang listener
  if (btnSubmit) {
    btnSubmit.addEventListener('click', handleSubmit);
  } else {
    console.error("Elemen 'btn-submit' tidak ditemukan di HTML!");
  }

  if (btnCancel) {
    btnCancel.addEventListener('click', () => ProductForm.reset());
  } else {
    console.error("Elemen 'btn-cancel' tidak ditemukan di HTML!");
  }

  // Jalankan data pertama kali
  muatUlangData();
});
