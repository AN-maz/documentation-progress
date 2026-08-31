import { Outlet } from 'react-router-dom';
import Navbar from '../../features/landing/Navbar'; 
import Footer from '../../features/landing/Footer'; 

export default function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800 font-sans">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}