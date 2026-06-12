import {
  getSemuaProduk,
  tambahProduk,
  updateProduk,
  hapusProduk,
} from "./api/productApi";
import { ProductForm } from "./components/productForm";
import { renderTabel } from "./components/productTable";
import { tampilkanNotifikasi } from "./components/notification";
import "./style.css";

async function muatUlangData() {
  try {
    const produkList = await getSemuaProduk();
    renderTabel(produkList, handleKlikEdit, handleKlikHapus);
  } catch (error) {
    tampilkanNotifikasi("Gagal memuat data: " + error.message, "gagal");
  }
}

function handleKlikEdit(id, name, price, categoryId) {
  ProductForm.isiForm(id, name, price, categoryId);
}

async function handleKlikHapus(id) {
  if (!confirm(`Yakin ingin menghapus produk dengan ID ${id}?`)) return;
  try {
    await hapusProduk(id);
    tampilkanNotifikasi("Produk berhasil dihapus!");
    await muatUlangData();
  } catch (error) {
    tampilkanNotifikasi("Gagal menghapus: " + error.message, "gagal");
  }
}

async function handleSubmit() {
  const { id, name, price, categoryName } = ProductForm.getValues();

  if (!name || !price || !categoryName) {
    tampilkanNotifikasi("Semua field harus diisi!", "gagal");
    return;
  }

  const dataProduk = {
    name,
    price: price,
    category_name: categoryName,
  };

  try {
    if (id) {
      await updateProduk(id, dataProduk);
      tampilkanNotifikasi("Produk berhasil diupdate!");
    } else {
      await tambahProduk(dataProduk);
      tampilkanNotifikasi("Produk berhasil ditambahkan!");
    }
    ProductForm.reset();
    await muatUlangData();
  } catch (error) {
    tampilkanNotifikasi("Gagal menyimpan: " + error.message, "gagal");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const btnSubmit = document.getElementById("btn-submit");
  const btnCancel = document.getElementById("btn-cancel");
  const inputPrice = document.getElementById("input-price");

  if (btnSubmit) {
    btnSubmit.addEventListener("click", handleSubmit);
  } else {
    console.error("Elemen 'btn-submit' tidak ditemukan di HTML!");
  }

  if (btnCancel) {
    btnCancel.addEventListener("click", () => ProductForm.reset());
  } else {
    console.error("Elemen 'btn-cancel' tidak ditemukan di HTML!");
  }

  if (inputPrice) {
    inputPrice.addEventListener("input", (e) => {
      const angkaMurni = e.target.value.replace(/[^0-9]/g, "");
      if (angkaMurni) {
        e.target.value = Number(angkaMurni).toLocaleString("id-ID");
      }
    });
  }

  muatUlangData();
});
