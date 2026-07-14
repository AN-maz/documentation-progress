import { createContext, useContext, useState } from 'react';

// 1. Buat Context
const TemaContext = createContext(null);

// Komponen Anak (Bisa langsung ambil data tanpa terima props)
function KomponenAnak() {
  const tema = useContext(TemaContext); // 3. Ambil data dari Context
  return (
    <div className={`p-4 mt-4 ${tema === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}>
      Ini adalah komponen anak dengan tema: {tema}
    </div>
  );
}

// Komponen Parent
export default function BelajarUseContext() {
  const [tema, setTema] = useState('light');

  return (
    // 2. Bungkus semua anak dengan Provider dan beri 'value'
    <TemaContext.Provider value={tema}>
      <div className="p-4 border rounded">
        <button 
          className="bg-indigo-500 text-white p-2 rounded"
          onClick={() => setTema(tema === 'light' ? 'dark' : 'light')}
        >
          Ubah Tema
        </button>
        <KomponenAnak />
      </div>
    </TemaContext.Provider>
  );
}