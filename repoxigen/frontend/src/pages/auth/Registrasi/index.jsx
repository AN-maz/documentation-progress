import React from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../AuthLayout';

const Registrasi = () => {
  return (
    <AuthLayout
      title="Join the Squad"
      subtitle="Daftarkan dirimu dan pilih divisi untuk memulai perjalanan teknologi."
    >
      <form className="space-y-4">

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Nama Lengkap</label>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-oxigen-light focus:outline-none transition-all"
            placeholder="Masukkan nama lengkap"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* NIM */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">NIM</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-oxigen-light focus:outline-none transition-all"
              placeholder="2455XXXX"
            />
          </div>

      
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Jurusan</label>
            <select className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-oxigen-light focus:outline-none transition-all appearance-none cursor-pointer">
              <option value="" disabled selected>Pilih Jurusan</option>
              <option value="TIF">Teknik Informatika</option>
              <option value="TI">Teknik Industri</option>
              <option value="DKV">Desain Komunikasi Visual</option>
              <option value="BD">Bisnis Digital</option>
              <option value="MR">Manajemen Retail</option>
            </select>
          </div>
        </div>

  
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Alamat Email</label>
          <input
            type="email"
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-oxigen-light focus:outline-none transition-all"
            placeholder="purwa123@gmail.com"
          />
        </div>

  
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
          <input
            type="password"
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-oxigen-light focus:outline-none transition-all"
            placeholder="••••••••"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Menjadi Bagian Dari</label>
          <select className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-oxigen-light focus:outline-none transition-all appearance-none cursor-pointer">
            <option value="" disabled selected>Pilih Divisi Peminatan</option>
            <option value="SFT">Divisi Software</option>
            <option value="HRD">Divisi Hardware</option>
            <option value="GAM">Divisi Game</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Alasan Bergabung</label>
          <textarea
            rows="3"
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-oxigen-light focus:outline-none transition-all resize-none"
            placeholder="Ceritakan motivasi singkatmu..."
          ></textarea>
        </div>


        <button
          type="submit"
          className="w-full py-4 mt-2 bg-gradient-to-r from-oxigen-light to-software-tosca hover:to-oxigen-light text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
        >
          Buat Akun Baru
        </button>

      </form>

      {/* Login Link */}
      <div className="mt-8 text-center text-sm text-gray-500">
        Sudah punya akun?{' '}
        <Link to="/login" className="text-oxigen-light font-bold hover:underline">
          Masuk di sini
        </Link>
      </div>
    </AuthLayout>
  );
};

export default Registrasi;