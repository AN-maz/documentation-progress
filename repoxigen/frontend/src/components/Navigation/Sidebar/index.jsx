import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  User, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  Settings
} from 'lucide-react';

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const menuItems = [
    { path: '/dashboard/user', name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/dashboard/profile', name: 'Profile Saya', icon: <User size={20} /> },
    // Tambah menu lain disini
    { path: '/dashboard/settings', name: 'Pengaturan', icon: <Settings size={20} /> },
  ];

  return (
    <aside 
      className={`
        hidden md:flex flex-col h-screen bg-oxigen-dark text-white 
        transition-all duration-300 ease-in-out shadow-xl z-50 fixed left-0 top-0
        ${isCollapsed ? 'w-20' : 'w-64'}
      `}
    >
      {/* 1. Header Logo & Toggle */}
      <div className="h-20 flex items-center justify-between px-4 border-b border-white/10">
        {!isCollapsed && (
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <div className="w-8 h-8 bg-oxigen-light rounded-lg flex items-center justify-center font-bold text-white">
              OX
            </div>
            <span className="font-bold text-xl tracking-wide">OXIGEN</span>
          </div>
        )}
        
        {/* Tombol Toggle Ukuran Sidebar */}
        <button 
          onClick={toggleSidebar}
          className={`
            p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors
            ${isCollapsed ? 'mx-auto' : ''}
          `}
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* 2. Menu Navigation */}
      <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 group
              ${isActive 
                ? 'bg-gradient-to-r from-oxigen-light to-blue-600 text-white shadow-lg shadow-blue-900/50' 
                : 'text-gray-400 hover:bg-white/5 hover:text-white'}
              ${isCollapsed ? 'justify-center' : ''}
            `}
          >
            <div className={`${isCollapsed ? '' : 'group-hover:scale-110 transition-transform'}`}>
              {item.icon}
            </div>
            
            {!isCollapsed && (
              <span className="font-medium text-sm whitespace-nowrap overflow-hidden">
                {item.name}
              </span>
            )}

            {/* Tooltip saat collapsed */}
            {isCollapsed && (
              <div className="absolute left-16 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                {item.name}
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* 3. Footer / Logout */}
      <div className="p-4 border-t border-white/10">
        <button 
          onClick={handleLogout}
          className={`
            w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-400 
            hover:bg-red-500/10 hover:text-red-300 transition-all duration-300
            ${isCollapsed ? 'justify-center' : ''}
          `}
        >
          <LogOut size={20} />
          {!isCollapsed && <span className="font-medium text-sm">Keluar</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;