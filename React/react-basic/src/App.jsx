import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Module1 from './modules/Module1';

function App() {
  return (
    <Router>
      {/* Navbar diletakkan di luar Routes agar selalu tampil di semua halaman */}
      <Navbar />

      {/* Kontainer utama untuk isi materi */}
      <main className="container mx-auto p-8">
        <Routes>
          {/* Rute untuk halaman awal */}
          <Route path="/" element={<h1 className="text-2xl">Selamat Datang di React Learning Journal! 🚀</h1>} />

          {/* Rute untuk Modul 1 */}
          <Route path="/module1" element={<Module1 />} />

          {/* Rute untuk Modul 2 nanti */}
          <Route path="/module2" element={<h1 className="text-2xl text-gray-500">Materi Modul 2 Belum Tersedia.</h1>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;