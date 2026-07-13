import { useState } from 'react';

// Komponen Child menerima Props (teks, dan fungsi onClick)
function Tombol({ teks, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      {teks}
    </button>
  );
}

// Komponen Parent memiliki State
export default function App() {
  // Deklarasi state: [namaVariabel, fungsiPengubah] = useState(nilaiAwal)
  const [angka, setAngka] = useState(0);

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Angka saat ini: {angka}</h2>
      
      <div className="space-x-2">
        {/* Mengirim props ke komponen Tombol */}
        <Tombol teks="Tambah 1" onClick={() => setAngka(angka + 1)} />
        <Tombol teks="Reset" onClick={() => setAngka(0)} />
      </div>
    </div>
  );
}