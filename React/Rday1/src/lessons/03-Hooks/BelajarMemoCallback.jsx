import { useState, useMemo, useCallback } from 'react';

export default function BelajarMemoCallback() {
  const [angka, setAngka] = useState(0);
  const [teks, setTeks] = useState("");

  // useMemo: Fungsi ini HANYA akan dijalankan ulang kalau 'angka' berubah.
  // Kalau kita cuma ngetik di input 'teks', perhitungan ini tidak akan jalan ulang.
  const hasilPerhitunganBerat = useMemo(() => {
    console.log("Menghitung ulang sesuatu yang berat...");
    return angka * 1000;
  }, [angka]);

  // useCallback: Fungsi ini diingat dan tidak dibuat ulang tiap render,
  // sangat berguna kalau fungsi ini mau dioper sebagai props ke komponen anak.
  const handleKlik = useCallback(() => {
    setAngka((prev) => prev + 1);
  }, []);

  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl">Hasil: {hasilPerhitunganBerat}</h2>
      <button onClick={handleKlik} className="bg-green-500 text-white p-2 rounded my-2">
        Tambah Angka
      </button>
      
      <div className="mt-4">
        <input 
          type="text" 
          value={teks} 
          onChange={(e) => setTeks(e.target.value)} 
          placeholder="Ketik sesuatu..."
          className="border p-2 rounded"
        />
      </div>
    </div>
  );
}