import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (sectionId) => {
    setIsOpen(false);
    if (location.pathname !== '/') {
      navigate('/', { replace: false });
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <nav className="max-w-6xl mx-auto px-6 mt-4">
        <div className="glass rounded-2xl px-5 py-3 flex items-center justify-between text-white shadow-lg border border-white/10 relative">
          
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"/>
              </svg>
            </div>
            <div>
              <div className="font-extrabold leading-none">LMS Gamifikasi</div>
              <div className="text-white/50 text-[10px] mt-0.5">Belajar tidak ada kata terlambat</div>
            </div>
          </Link>

          {/* Navigation Links Desktop */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/80">
            <button onClick={() => handleNavClick('hero')} className="hover:text-white transition">Beranda</button>
            <button onClick={() => handleNavClick('why')} className="hover:text-white transition">Kenapa Kami</button>
            <button onClick={() => handleNavClick('fitur')} className="hover:text-white transition">Fitur</button>
            <button onClick={() => handleNavClick('tim')} className="hover:text-white transition">Team</button>
          </div>

          {/* Action Buttons Desktop */}
          <div className="hidden sm:flex items-center gap-4">
            <Link to="/materi" className="text-white/80 hover:text-white text-sm font-medium transition">
              Materi
            </Link>
            <button onClick={() => handleNavClick('footer')} className="text-white/80 hover:text-white text-sm font-medium transition">
              Kontak
            </button>
            <Link
              to="/auth"
              className="bg-primary hover:bg-blue-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition shadow-lg shadow-primary/30"
            >
              Masuk
            </Link>
          </div>
          <button onClick={() => setIsOpen(!isOpen)} className="sm:hidden p-2 text-white/80">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {isOpen && (
            <div className="absolute top-full left-0 right-0 mt-3 p-5 glass rounded-2xl border border-white/10 flex flex-col gap-4 text-sm font-medium text-white/90 sm:hidden shadow-xl">
              <button onClick={() => handleNavClick('hero')} className="text-left hover:text-white">Beranda</button>
              <button onClick={() => handleNavClick('why')} className="text-left hover:text-white">Kenapa Kami</button>
              <button onClick={() => handleNavClick('fitur')} className="text-left hover:text-white">Fitur</button>
              <button onClick={() => handleNavClick('tim')} className="text-left hover:text-white">Team</button>
              <hr className="border-white/10 my-1" />
              <Link to="/materi" onClick={() => setIsOpen(false)} className="hover:text-white">Materi</Link>
              <button onClick={() => handleNavClick('footer')} className="text-left hover:text-white">Kontak</button>
              <Link to="/auth" onClick={() => setIsOpen(false)} className="bg-primary text-center font-bold px-5 py-2.5 rounded-xl">Masuk</Link>
            </div>
          )}

        </div>
      </nav>
    </header>
  );
}