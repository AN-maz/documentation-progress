// src/pages/auth/Login/index.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../AuthLayout';

const Login = () => {
  return (
    <AuthLayout
      title="Welcome Back!"
      subtitle="Masuk untuk mengakses materi pembelajaran."
    >
      <form className="space-y-5">

        {/* Email Input */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Alamat Email</label>
          <input
            type="email"
            placeholder="nama@mahasiswa.sttbandung.ac.id"
            className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-oxigen-light focus:ring-2 focus:ring-oxigen-light/20 transition-all"
          />
        </div>

        {/* Password Input */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-bold text-gray-700">Password</label>
            <a href="#" className="text-xs font-semibold text-oxigen-light hover:underline">Lupa Password?</a>
          </div>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-oxigen-light focus:ring-2 focus:ring-oxigen-light/20 transition-all"
          />
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="remember"
            className="w-4 h-4 text-oxigen-light border-gray-300 rounded focus:ring-oxigen-light cursor-pointer"
          />
          <label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer select-none">
            Remember Me
          </label>
        </div>
        
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-4 bg-oxigen-dark hover:bg-blue-900 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
        >
          Masuk Sekarang
        </button>

      </form>

      {/* Register Link */}
      <div className="mt-8 text-center text-sm text-gray-500">
        Belum menjadi anggota?{' '}
        <Link to="/register" className="text-oxigen-light font-bold hover:underline">
          Daftar Yuk..
        </Link>
      </div>
    </AuthLayout>
  );
};

export default Login;