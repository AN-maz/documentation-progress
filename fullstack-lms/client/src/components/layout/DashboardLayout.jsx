import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useThemeStore } from '../../store/useThemeStore';
import { 
  LayoutDashboard, 
  BookOpen, 
  PlusCircle, 
  CheckSquare, 
  LogOut, 
  User,
  Award,
  Sun,
  Moon,
  Compass
} from 'lucide-react';

export default function DashboardLayout({ isAdmin = false }) {
  const { user, logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const navigate = useNavigate();
  const location = useLocation();

  const isDark = theme === 'dark';

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const isActive = (path) => {
    if (path === '/dashboard' || path === '/admin' || path === '/dashboard/materi') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  // Menu Creator / Learner
  const creatorMenus = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Buat Materi', path: '/dashboard/materi/create', icon: PlusCircle },
    { name: 'Materi Saya', path: '/dashboard/materi/my-materials', icon: BookOpen },
    { name: 'Eksplorasi Materi', path: '/dashboard/materi', icon: Compass },
  ];

  // Menu Admin
  const adminMenus = [
    { name: 'Admin Overview', path: '/admin', icon: LayoutDashboard },
    { name: 'Antrean Moderasi', path: '/admin/moderation', icon: CheckSquare },
  ];

  const menus = isAdmin ? adminMenus : creatorMenus;

  return (
    <div className={`flex min-h-screen ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* FIXED SIDEBAR */}
      <aside className={`w-64 h-screen sticky top-0 flex flex-col justify-between p-4 border-r shrink-0 transition-colors z-20 ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        
        {/* Top Section: Logo & Nav Options */}
        <div className="flex flex-col min-h-0">
          {/* Logo Header */}
          <div className={`flex items-center gap-3 px-2 py-4 mb-4 border-b ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
              L
            </div>
            <div>
              <h1 className="font-bold text-base leading-none">LMS Platform</h1>
              <span className="text-xs text-indigo-500 font-medium">
                {isAdmin ? 'Admin Console' : 'Creator Studio'}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 overflow-y-auto pr-1">
            {menus.map((menu) => {
              const Icon = menu.icon;
              const active = isActive(menu.path);
              return (
                <Link
                  key={menu.path}
                  to={menu.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${
                    active
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold'
                      : isDark
                      ? 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {menu.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* BOTTOM SECTION: Theme Toggle & Fixed User Profile */}
        <div className={`border-t pt-4 space-y-3 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
          
          {/* Theme Mode Switcher */}
          <button
            onClick={toggleTheme}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold border transition ${
              isDark 
                ? 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800' 
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <span className="flex items-center gap-2">
              {isDark ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
              {isDark ? 'Dark Mode' : 'Light Mode'}
            </span>
            <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-500">
              {theme}
            </span>
          </button>

          {/* User Profile Info */}
          <div className="flex items-center gap-3 px-2">
            {user?.avatar_url ? (
              <img 
                src={user.avatar_url} 
                alt={user.name} 
                className="w-8 h-8 rounded-full object-cover border border-slate-700" 
              />
            ) : (
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-600'
              }`}>
                <User className="w-4 h-4" />
              </div>
            )}
            <div className="overflow-hidden">
              <p className={`text-sm font-semibold truncate ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
                {user?.name || 'User'}
              </p>
              <p className="text-xs text-slate-400 capitalize">{user?.role || 'Learner'}</p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-rose-500 hover:bg-rose-500/10 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Keluar
          </button>
        </div>

      </aside>

      {/* Dynamic Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Header */}
        <header className={`h-16 border-b flex items-center justify-between px-8 sticky top-0 z-10 backdrop-blur-md ${
          isDark ? 'border-slate-800 bg-slate-900/80 text-slate-200' : 'border-slate-200 bg-white/80 text-slate-800'
        }`}>
          <h2 className="font-semibold text-sm sm:text-base">
            {isAdmin ? 'Panel Moderasi & Admin' : 'Dashboard Saya'}
          </h2>

          {!isAdmin && (
            <div className="flex items-center gap-4 text-xs font-semibold">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500">
                <Award className="w-4 h-4" />
                <span>Level {user?.level || 1}</span>
              </div>
              <div className="px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500">
                ⚡ {user?.total_exp || 0} EXP
              </div>
            </div>
          )}
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>

    </div>
  );
}