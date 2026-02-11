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
        
        <div className="grid grid-cols-2 gap-4">
          {/* Nama Depan */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Nama Depan</label>
            <input type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-oxigen-light focus:outline-none transition-all" placeholder="John" />
          </div>
          {/* Nama Belakang */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Nama Belakang</label>
            <input type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-oxigen-light focus:outline-none transition-all" placeholder="Doe" />
          </div>
        </div>

        {/* NIM */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">NIM Mahasiswa</label>
          <input type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-oxigen-light focus:outline-none transition-all" placeholder="1011xxxx" />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Email Kampus</label>
          <input type="email" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-oxigen-light focus:outline-none transition-all" placeholder="email@mahasiswa.ac.id" />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
          <input type="password" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-oxigen-light focus:outline-none transition-all" placeholder="••••••••" />
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-start gap-3 mt-2">
          <input type="checkbox" className="mt-1 w-4 h-4 text-oxigen-light border-gray-300 rounded focus:ring-oxigen-light" />
          <p className="text-xs text-gray-500 leading-tight">
            Saya setuju dengan <a href="#" className="text-oxigen-light font-bold hover:underline">Aturan Organisasi</a> dan berkomitmen untuk aktif dalam kegiatan UKM.
          </p>
        </div>

        {/* Submit Button */}
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