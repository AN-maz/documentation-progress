export function formatRupiah(angka) {
  return `Rp ${Number(angka).toLocaleString('id-ID')}`;
}

export function formatTitikRibuan(angka) {
  if (!angka) return '';
  const angkaMurni = Math.floor(Number(angka));
  return angkaMurni.toLocaleString('id-ID');
}
export function parseKeAngkaMurni(teksString) {
  if (!teksString) return 0;
  const angkaMurni = teksString.replace(/[^0-123456789]/g, '');
  return Number(angkaMurni);
}