import { useState, useEffect } from 'react';

function App() {
  const [materi, setMateri] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fungsi Async di dalam useEffect
    const ambilData = async () => {
      try {
        setLoading(true);
        // Memanggil API publik (contoh)
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        
        if (!response.ok) throw new Error('Gagal mengambil data dari server');
        
        const data = await response.json();
        setMateri(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Matikan loading, baik sukses maupun gagal
      }
    };

    ambilData();
  }, []); // Array kosong = hanya dipanggil sekali saat halaman dibuka

  // Tampilan berdasarkan state
  if (loading) return <h3>Memuat data kelas... ⏳</h3>;
  if (error) return <h3>Terjadi kesalahan: {error} ❌</h3>;

  return (
    <ul>
      {materi.slice(0, 4).map(item => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
}

export default App;