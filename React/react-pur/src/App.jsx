import { useState, useEffect } from 'react';

// 1. MEMBUAT CUSTOM HOOK: useLocalStorage
// Semua logika penyimpanan kita pindahkan ke sini agar rapi
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const savedValue = localStorage.getItem(key);
    if (savedValue) return JSON.parse(savedValue);
    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// (Komponen Card dan ModuleItem TETAP SAMA seperti sebelumnya)
function Card({ children, title }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', marginTop: '15px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', backgroundColor: '#fff' }}>
      <h2 style={{ marginTop: 0, color: '#333' }}>{title}</h2>
      {children}
    </div>
  );
}

function ModuleItem({ title, isCompleted, onToggleStatus }) {
  return (
    <li style={{ margin: '12px 0', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px', borderBottom: '1px dashed #eee' }}>
      <span>
        {isCompleted ? '✅ ' : '⏳ '} 
        <span style={{ textDecoration: isCompleted ? 'line-through' : 'none', color: isCompleted ? '#888' : '#000' }}>{title}</span>
      </span>
      <button onClick={onToggleStatus} style={{ padding: '5px 10px', backgroundColor: isCompleted ? '#f0f0f0' : '#007bff', color: isCompleted ? '#555' : '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        {isCompleted ? 'Ubah ke Belum Selesai' : 'Tandai Selesai'}
      </button>
    </li>
  );
}

// 2. Komponen Induk (Sekarang jauh lebih bersih!)
function App() {
  // Menggunakan Custom Hook yang baru saja dibuat
  const [modules, setModules] = useLocalStorage('curriculum-data', [
    { id: 1, title: 'Fundamental HTML (Struktur Halaman)', isCompleted: true },
    { id: 2, title: 'Styling Dasar dengan CSS', isCompleted: false },
    { id: 3, title: 'Logika Pemrograman JavaScript', isCompleted: false }
  ]);

  // State baru khusus untuk mengontrol Input Form
  const [inputValue, setInputValue] = useState('');

  const handleToggleModule = (id) => {
    const updatedModules = modules.map((modul) =>
      modul.id === id ? { ...modul, isCompleted: !modul.isCompleted } : modul
    );
    setModules(updatedModules);
  };

  // Fungsi untuk menangani Submit Form
  const handleAddModule = (e) => {
    e.preventDefault(); // Mencegah browser me-refresh halaman saat form disubmit
    
    if (inputValue.trim() === '') return; // Cegah input kosong

    const newModule = {
      id: Date.now(), // Menggunakan timestamp sebagai ID unik sementara
      title: inputValue,
      isCompleted: false
    };

    setModules([...modules, newModule]); // Copy array lama, tambahkan data baru di akhir
    setInputValue(''); // Kosongkan kolom input setelah berhasil ditambah
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif', backgroundColor: '#f9f9f9', minHeight: '100vh', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Curriculum Planner Dashboard</h1>
      
      {/* 3. Menambahkan Form untuk Input Data Baru */}
      <form onSubmit={handleAddModule} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          type="text" 
          value={inputValue} // Dikendalikan oleh State (Controlled Component)
          onChange={(e) => setInputValue(e.target.value)} // Update state setiap ada ketikan
          placeholder="Ketik materi atau jadwal baru..."
          style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Tambah
        </button>
      </form>

      <Card title="Daftar Aktivitas & Modul">
        <ul style={{ padding: 0, margin: 0 }}>
          {modules.map((modul) => (
            <ModuleItem 
              key={modul.id} 
              title={modul.title} 
              isCompleted={modul.isCompleted} 
              onToggleStatus={() => handleToggleModule(modul.id)} 
            />
          ))}
        </ul>
      </Card>
    </div>
  );
}

export default App;