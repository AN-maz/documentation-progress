import { createContext, useContext, useState } from 'react';

// 1. Buat Context-nya (Wadah Teleportasi)
const TemaContext = createContext();

// 2. Buat Provider-nya (Pemancar Data)
function TemaProvider({ children }) {
  const [tema, setTema] = useState('terang');

  const gantiTema = () => {
    setTema(tema === 'terang' ? 'gelap' : 'terang');
  };

  return (
    <TemaContext.Provider value={{ tema, gantiTema }}>
      {children}
    </TemaContext.Provider>
  );
}

// 3. Pakai Datanya (Penerima Teleportasi)
function TombolTema() {
  const { tema, gantiTema } = useContext(TemaContext);

  return (
    <button 
      onClick={gantiTema}
      style={{
        background: tema === 'terang' ? '#fff' : '#333',
        color: tema === 'terang' ? '#000' : '#fff'
      }}
    >
      Ganti ke Tema {tema === 'terang' ? 'Gelap 🌙' : 'Terang ☀️'}
    </button>
  );
}

// 4. Bungkus Aplikasi dengan Provider
function App() {
  return (
    <TemaProvider>
      <div>
        <h1>Aplikasi Keren</h1>
        <TombolTema /> {/* Tombol ini bisa langsung akses Context! */}
      </div>
    </TemaProvider>
  );
}

export default App;