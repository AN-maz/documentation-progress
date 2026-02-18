import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* SIDEBAR SEMENTARA */}
      <aside className="w-64 bg-oxigen-dark text-white p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-8">OXIGEN</h1>
        
        <nav className="flex-1 space-y-4">
          <div className="text-gray-400 text-xs uppercase font-bold">Menu</div>
          <a href="#" className="block px-4 py-2 bg-white/10 rounded-lg">Dashboard</a>
          <a href="#" className="block px-4 py-2 hover:bg-white/5 rounded-lg">Profile Saya</a>
          
          {/* Menu Khusus Admin (Logic Render) */}
          {user?.role === 'super_admin' && (
            <>
              <div className="text-gray-400 text-xs uppercase font-bold mt-6">Admin Zone</div>
              <a href="#" className="block px-4 py-2 text-yellow-300 hover:bg-white/5">Manage Users</a>
            </>
          )}
        </nav>

        <button onClick={handleLogout} className="mt-auto bg-red-600 px-4 py-2 rounded-lg text-sm">
          Logout
        </button>
      </aside>

      {/* KONTEN UTAMA */}
      <main className="flex-1 overflow-y-auto p-8">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
          <div className="flex items-center gap-3">
            <span className="text-right">
              <p className="font-bold text-sm">{user?.nama_lengkap}</p>
              <p className="text-xs text-gray-500">{user?.role || 'Member'}</p>
            </span>
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
          </div>
        </header>

        {/* INI TEMPAT HALAMAN BERUBAH-UBAH */}
        <Outlet /> 
      </main>
    </div>
  );
};

export default DashboardLayout;