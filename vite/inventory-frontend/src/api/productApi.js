import { BASE_URL } from '../config/constants';

export async function getSemuaProduk() {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error('Gagal mengambil data produk');
  const data = await response.json();
  return data.data;
}

export async function tambahProduk(produk) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(produk),
  });
  if (!response.ok) throw new Error('Gagal menambah produk');
  return await response.json();
}

export async function updateProduk(id, produk) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(produk),
  });
  if (!response.ok) throw new Error('Gagal mengupdate produk');
  return await response.json();
}

export async function hapusProduk(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Gagal menghapus produk');
  return await response.json();
}