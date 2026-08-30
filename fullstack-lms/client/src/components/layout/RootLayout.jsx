import { Outlet } from 'react-router-dom';
import Navbar from '../../features/landing/Navbar'; // Atau komponen Navbar shared milikmu
import Footer from '../../features/landing/Footer'; // Atau komponen Footer shared milikmu

export default function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Navbar Publik (Muncul di Landing Page, Katalog Materi, Leaderboard, dll) */}
      <Navbar />

      {/* Konten Halaman Aktif Ditempatkan di Outlet ini */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer Publik */}
      <Footer />
    </div>
  );
}