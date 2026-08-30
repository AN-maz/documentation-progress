import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { 
  LayoutDashboard, 
  BookOpen, 
  PlusCircle, 
  Award, 
  CheckSquare, 
  LogOut, 
  User 
} from 'lucide-react';

export default function DashboardLayout({ isAdmin = false }) {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const isActive = (path) => location.pathname === path;

  // Menu untuk Creator / Learner
  const creatorMenus = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Buat Materi', path: '/dashboard/materi/create', icon: PlusCircle },
    { name: 'Materi Saya', path: '/dashboard/materi/my-materials', icon: BookOpen },
  ];

  // Menu untuk Admin
  const adminMenus = [
    { name: 'Admin Overview', path: '/admin', icon: LayoutDashboard },
    { name: 'Antrean Moderasi', path: '/admin/moderation', icon: CheckSquare },
  ];

  const menus = isAdmin ? adminMenus : creatorMenus;

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900 flex flex-col justify-between p-4 shrink-0">
        <div>
          <div className="flex items-center gap-3 px-2 py-4 mb-4 border-b border-slate-800">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
              L
            </div>
            <div>
              <h1 className="font-bold text-base leading-none">LMS Platform</h1>
              <span className="text-xs text-indigo-400 font-medium">
                {isAdmin ? 'Admin Console' : 'Creator Studio'}
              </span>
            </div>
          </div>

          <nav className="space-y-1">
            {menus.map((menu) => {
              const Icon = menu.icon;
              const active = isActive(menu.path);
              return (
                <Link
                  key={menu.path}
                  to={menu.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${
                    active
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {menu.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer / User Info */}
        <div className="border-t border-slate-800 pt-4 space-y-3">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
              <User className="w-4 h-4 text-slate-300" />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold truncate">{user?.name || 'User'}</p>
              <p className="text-xs text-slate-400 capitalize">{user?.role || 'Learner'}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Keluar
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-10">
          <h2 className="font-semibold text-slate-200">
            {isAdmin ? 'Panel Moderasi & Admin' : 'Dashboard Saya'}
          </h2>

          {/* User Gamification Stats Header Badge */}
          {!isAdmin && (
            <div className="flex items-center gap-4 text-xs font-semibold">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                <Award className="w-4 h-4" />
                <span>Level {user?.level || 1}</span>
              </div>
              <div className="px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400">
                ⚡ {user?.total_exp || 0} EXP
              </div>
            </div>
          )}
        </header>

        {/* Dynamic Route Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}