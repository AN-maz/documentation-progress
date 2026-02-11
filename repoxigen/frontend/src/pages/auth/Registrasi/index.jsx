// src/pages/auth/Registrasi/index.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Registrasi = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-oxigen-dark px-4 py-20">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-2xl">
        
        {/* Header Form */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Join OXIGEN</h2>
          <p className="text-gray-400 text-sm">
            Daftarkan dirimu dan kembangkan skill teknologi!
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5">
          {/* Nama Lengkap */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Nama Lengkap</label>
            <input 
              type="text" 
              placeholder="Masukkan nama lengkap"
              className="w-full px-4 py-3 rounded-lg bg-black/20 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-software-bright focus:ring-1 focus:ring-software-bright transition-all"
            />
          </div>

          {/* NIM */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">NIM</label>
            <input 
              type="text" 
              placeholder="Contoh: 10123xxx"
              className="w-full px-4 py-3 rounded-lg bg-black/20 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-hardware-cyan focus:ring-1 focus:ring-hardware-cyan transition-all"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email Mahasiswa</label>
            <input 
              type="email" 
              placeholder="nama@mahasiswa.university.ac.id"
              className="w-full px-4 py-3 rounded-lg bg-black/20 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-oxigen-light focus:ring-1 focus:ring-oxigen-light transition-all"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg bg-black/20 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-game-red focus:ring-1 focus:ring-game-red transition-all"
            />
          </div>

          {/* Tombol Daftar */}
          <button 
            type="submit" 
            className="w-full py-3 bg-gradient-to-r from-oxigen-light to-blue-600 hover:from-blue-600 hover:to-oxigen-light text-white font-bold rounded-lg transition-all transform active:scale-95 shadow-lg shadow-oxigen-light/30"
          >
            Daftar Sekarang
          </button>
        </form>

        {/* Footer Form (Link ke Login) */}
        <div className="mt-6 text-center text-sm text-gray-400">
          Sudah punya akun?{' '}
          <Link to="/login" className="text-software-bright hover:underline font-medium">
            Login di sini
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Registrasi;