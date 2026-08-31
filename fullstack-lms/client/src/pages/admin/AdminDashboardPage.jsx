import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useThemeStore } from '../../store/useThemeStore';
import { adminService } from '../../api/admin.service';
import { 
  FileText, 
  Clock, 
  FolderKanban, 
  CheckCircle, 
  ArrowRight,
  AlertCircle
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  const [stats, setStats] = useState({
    totalMaterials: 0,
    pendingMaterials: 0,
    approvedMaterials: 0,
    totalCategories: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await adminService.getStats();
        // Menyesuaikan response statistik dari backend
        setStats({
          totalMaterials: data?.data?.total_materials || data?.total_materials || 0,
          pendingMaterials: data?.data?.pending_materials || data?.pending_materials || 0,
          approvedMaterials: data?.data?.approved_materials || data?.approved_materials || 0,
          totalCategories: data?.data?.total_categories || data?.total_categories || 0,
        });
      } catch (err) {
        console.error('Gagal mengambil statistik admin:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Pending Moderasi',
      value: stats.pendingMaterials,
      icon: Clock,
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
      description: 'Materi menunggu persetujuan'
    },
    {
      title: 'Materi Disetujui',
      value: stats.approvedMaterials,
      icon: CheckCircle,
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      description: 'Materi terpublikasi di katalog'
    },
    {
      title: 'Total Materi',
      value: stats.totalMaterials,
      icon: FileText,
      color: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20',
      description: 'Keseluruhan materi dalam sistem'
    },
    {
      title: 'Total Kategori',
      value: stats.totalCategories,
      icon: FolderKanban,
      color: 'text-sky-500 bg-sky-500/10 border-sky-500/20',
      description: 'Kategori materi aktif'
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className={`p-6 rounded-2xl border ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <h1 className="text-2xl font-bold mb-2">Selamat Datang di Admin Console 👋</h1>
        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Kelola publikasi materi dari kreator dan atur struktur kategori platform dari satu tempat.
        </p>
      </div>

      {/* Grid Cards Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className={`p-5 rounded-2xl border transition-all ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`p-2.5 rounded-xl border ${card.color}`}>
                  <Icon className="w-5 h-5" />
                </span>
                {loading ? (
                  <div className="w-8 h-6 bg-slate-700/40 animate-pulse rounded"></div>
                ) : (
                  <span className="text-2xl font-extrabold">{card.value}</span>
                )}
              </div>
              <h3 className="font-semibold text-sm">{card.title}</h3>
              <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {card.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`p-6 rounded-2xl border flex flex-col justify-between ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Antrean Moderasi Materi</h3>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Terdapat <strong className="text-amber-500">{stats.pendingMaterials} materi</strong> yang memerlukan peninjauan status.
              </p>
            </div>
          </div>
          <Link
            to="/admin/moderation"
            className="mt-6 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-medium text-sm hover:bg-indigo-500 transition"
          >
            Tinjau Antrean <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className={`p-6 rounded-2xl border flex flex-col justify-between ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-sky-500/10 text-sky-500 border border-sky-500/20">
              <FolderKanban className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Manajemen Kategori</h3>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Tambah, ubah, atau hapus taksonomi kategori materi pembelajaran.
              </p>
            </div>
          </div>
          <Link
            to="/admin/categories"
            className={`mt-6 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm border transition ${
              isDark 
                ? 'border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700' 
                : 'border-slate-300 bg-slate-100 text-slate-800 hover:bg-slate-200'
            }`}
          >
            Kelola Kategori <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}