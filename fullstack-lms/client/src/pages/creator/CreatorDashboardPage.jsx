import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useThemeStore } from '../../store/useThemeStore';
import { materialService } from '../../api/materi.service';
import { Plus, BookOpen, Clock, CheckCircle, XCircle, Trophy, Zap, Award, Loader2 } from 'lucide-react';

export default function CreatorDashboardPage() {
  const { user } = useAuthStore();
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  const [myMaterials, setMyMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyMaterials = async () => {
      try {
        setLoading(true);
        const res = await materialService.getUserMaterials();
        if (res.success) {
          setMyMaterials(res.data || []);
        }
      } catch (err) {
        console.error('Gagal memuat materi saya:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyMaterials();
  }, []);

  const renderStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return (
          <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${
            isDark 
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
              : 'bg-emerald-50 text-emerald-600 border-emerald-200'
          }`}>
            <CheckCircle className="w-3.5 h-3.5" /> Approved
          </span>
        );
      case 'rejected':
        return (
          <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${
            isDark 
              ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' 
              : 'bg-rose-50 text-rose-600 border-rose-200'
          }`}>
            <XCircle className="w-3.5 h-3.5" /> Rejected
          </span>
        );
      default:
        return (
          <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${
            isDark 
              ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' 
              : 'bg-amber-50 text-amber-600 border-amber-200'
          }`}>
            <Clock className="w-3.5 h-3.5" /> Pending Review
          </span>
        );
    }
  };

  return (
    <div className={`max-w-6xl mx-auto space-y-8 ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold">
            Selamat Datang, {user?.name || 'Kreator'}! 👋
          </h1>
          <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Pantau progres gamifikasi dan kelola modul pembelajaran yang kamu buat.
          </p>
        </div>
        <Link
          to="/dashboard/materi/create"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl transition shadow-lg shadow-indigo-600/20"
        >
          <Plus className="w-4 h-4" /> Buat Materi Baru
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className={`p-5 rounded-2xl border shadow-sm flex items-center gap-4 transition ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Level Saat Ini</p>
            <h3 className="text-xl font-extrabold">Level {user?.level || 1}</h3>
          </div>
        </div>

        <div className={`p-5 rounded-2xl border shadow-sm flex items-center gap-4 transition ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center border border-indigo-500/20">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total EXP</p>
            <h3 className="text-xl font-extrabold">{user?.exp || 0} EXP</h3>
          </div>
        </div>

        <div className={`p-5 rounded-2xl border shadow-sm flex items-center gap-4 transition ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Poin Saya</p>
            <h3 className="text-xl font-extrabold">{user?.points || 0} PTS</h3>
          </div>
        </div>
      </div>

      <div className={`rounded-2xl border shadow-sm overflow-hidden transition ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className={`p-5 border-b flex items-center justify-between ${
          isDark ? 'border-slate-800' : 'border-slate-100'
        }`}>
          <h2 className="text-lg font-bold flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-500" /> Materi yang Saya Buat
          </h2>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
            isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'
          }`}>
            Total: {myMaterials.length}
          </span>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-7 h-7 text-indigo-500 animate-spin mb-2" />
            <p className="text-sm text-slate-400 font-medium">Memuat data materi...</p>
          </div>
        ) : myMaterials.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-slate-400 text-sm">Kamu belum pernah membuat materi pembelajaran.</p>
            <Link
              to="/dashboard/materi/create"
              className="mt-4 inline-block text-xs font-bold text-indigo-500 hover:underline"
            >
              + Mulai tulis materi pertamamu
            </Link>
          </div>
        ) : (
          <div className={`divide-y ${isDark ? 'divide-slate-800' : 'divide-slate-100'}`}>
            {myMaterials.map((item) => (
              <div 
                key={item.id} 
                className={`p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition ${
                  isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'
                }`}
              >
                <div className="space-y-1">
                  <h3 className="font-bold text-base">{item.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span>Kategori: <strong className={isDark ? 'text-slate-300' : 'text-slate-600'}>{item.category?.name || 'Umum'}</strong></span>
                    <span>•</span>
                    <span>Dibuat: {new Date(item.created_at).toLocaleDateString('id-ID')}</span>
                  </div>
                </div>
                <div>
                  {renderStatusBadge(item.status)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}