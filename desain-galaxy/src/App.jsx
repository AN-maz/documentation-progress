import React, { useRef } from 'react';
import { toJpeg } from 'html-to-image';
import { Code, Cpu, Gamepad2 } from 'lucide-react';

export default function App() {
  const posterRef = useRef(null);

  const handleExport = async () => {
    if (posterRef.current === null) return;
    
    try {
      // Proses export menjadi JPG dengan kualitas maksimal (1.0)
      const dataUrl = await toJpeg(posterRef.current, { 
        quality: 1.0,
        canvasWidth: 1080,
        canvasHeight: 608 
      });
      
      const link = document.createElement('a');
      link.download = 'tanabata-poster.jpg';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Gagal mengekspor gambar:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center py-10 font-sans">
      
      {/* Tombol Export */}
      <button 
        onClick={handleExport}
        className="mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-2 px-6 rounded-full shadow-[0_0_15px_rgba(79,70,229,0.5)] transition-all"
      >
        Export to JPG
      </button>

      {/* 
        CONTAINER POSTER 
        Ukuran Landscape IG Feed: 1080x608
      */}
      <div 
        ref={posterRef} 
        className="relative w-[1080px] h-[608px] bg-slate-950 overflow-hidden flex flex-col justify-between"
        style={{
          // Gunakan backgroundImage: "url('/gambar-anda.png')" jika Anda punya gambar aslinya
          background: 'radial-gradient(circle at 50% 50%, #1e1b4b 0%, #020617 80%)'
        }}
      >
        {/* Ornamen Background Glow & Grid pattern */}
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="absolute top-20 right-20 w-64 h-64 bg-cyan-500 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-pink-600 rounded-full blur-[120px]"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9zdmc+')] opacity-30"></div>
        </div>

        {/* --- BAGIAN ATAS & TENGAH (JUDUL) --- */}
        <div className="relative z-10 flex flex-col items-center pt-16">
          <h3 className="text-white text-2xl font-light tracking-[1em] ml-[1em] mb-2 [text-shadow:0_0_10px_#fff]">
            七夕
          </h3>
          <p className="text-cyan-300 text-sm tracking-widest mb-6 font-medium">
            テクノロジー <span className="text-pink-500 mx-2">×</span> 文化
          </p>

          <h1 className="text-7xl font-bold text-white tracking-wider mb-1 [text-shadow:0_0_20px_#3b82f6,0_0_40px_#3b82f6]">
            TANABATA
          </h1>
          <p className="text-white text-lg tracking-[0.5em] mb-1 font-light">TO</p>
          <h1 className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-200 to-pink-400 [text-shadow:0_0_30px_rgba(236,72,153,0.6)]">
            ALGORITHM
          </h1>
          <p className="text-gray-400 text-xs tracking-[0.4em] mt-3 uppercase">
            タナバタ トゥ アルゴリズム
          </p>
          
          {/* Ikon Bintang Tengah */}
          <div className="mt-8 text-yellow-100 [filter:drop-shadow(0_0_15px_#fef08a)]">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
        </div>

        {/* --- BAGIAN BAWAH --- */}
        <div className="relative z-10 bg-gradient-to-t from-black via-black/80 to-transparent pt-16 pb-8 px-12">
          
          <div className="text-center mb-8">
            <h2 className="text-2xl font-medium text-white">
              Satu <span className="text-yellow-400">Hoshi</span>, 
              Satu <span className="text-cyan-400">Koneksi</span>, 
              Banyak <span className="text-pink-400">Inovasi!</span>
            </h2>
            <p className="text-sm text-gray-400 mt-2 tracking-widest font-medium">
              Teknologi <span className="text-pink-500 mx-1">×</span> Budaya
            </p>
          </div>

          {/* Grid 4 Kolom */}
          <div className="grid grid-cols-4 gap-6">
            
            {/* Software */}
            <div className="flex items-start gap-3">
              <Code className="text-green-400 w-8 h-8 mt-1 shrink-0 [filter:drop-shadow(0_0_8px_#4ade80)]" />
              <div>
                <h4 className="text-green-400 font-bold text-sm mb-1 tracking-wider">SOFTWARE</h4>
                <p className="text-gray-300 text-[10px] leading-relaxed pr-2">
                  Kreativitas tanpa batas, membangun solusi digital.
                </p>
              </div>
            </div>

            {/* Hardware */}
            <div className="flex items-start gap-3 border-l border-white/20 pl-6">
              <Cpu className="text-cyan-400 w-8 h-8 mt-1 shrink-0 [filter:drop-shadow(0_0_8px_#22d3ee)]" />
              <div>
                <h4 className="text-cyan-400 font-bold text-sm mb-1 tracking-wider">HARDWARE</h4>
                <p className="text-gray-300 text-[10px] leading-relaxed pr-2">
                  Ide menjadi nyata, menghubungkan dunia.
                </p>
              </div>
            </div>

            {/* Game */}
            <div className="flex items-start gap-3 border-l border-white/20 pl-6">
              <Gamepad2 className="text-fuchsia-400 w-8 h-8 mt-1 shrink-0 [filter:drop-shadow(0_0_8px_#e879f9)]" />
              <div>
                <h4 className="text-fuchsia-400 font-bold text-sm mb-1 tracking-wider">GAME</h4>
                <p className="text-gray-300 text-[10px] leading-relaxed pr-2">
                  Bermain, berimajinasi, menciptakan pengalaman.
                </p>
              </div>
            </div>

            {/* SNN (Torii Custom SVG) */}
            <div className="flex items-start gap-3 border-l border-white/20 pl-6">
              <div className="text-red-500 shrink-0 [filter:drop-shadow(0_0_8px_#ef4444)] mt-1">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 6h16M6 6v16M18 6v16M4 10h16M9 10v12M15 10v12" />
                </svg>
              </div>
              <div>
                <h4 className="text-red-500 font-bold text-sm mb-1 tracking-wider">SNN (SEMON NO NIHON)</h4>
                <p className="text-gray-300 text-[10px] leading-relaxed">
                  Bahasa, seni, dan budaya Jepang sebagai jembatan inspirasi.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}