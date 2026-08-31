import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useThemeStore } from '../../store/useThemeStore';
import { adminService } from '../../api/admin.service';
import { CheckSquare, Search, Eye, Calendar, User, Tag, FileText } from 'lucide-react';

export default function ModerationListPage() {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    let isMounted = true;

    const fetchPendingMaterials = async () => {
      try {
        setLoading(true);
        const res = await adminService.getPendingMaterials();
        const list = res?.data || res || [];
        if (isMounted) {
          setMaterials(Array.isArray(list) ? list : []);
        }
      } catch (err) {
        console.error('Gagal mengambil antrean materi:', err);
      }  {
        if (isMounted) setLoading(false);
      }
    };

    fetchPendingMaterials();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredMaterials = materials.filter((m) =>
    m.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.author_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-indigo-500" />
            Antrean Moderasi Materi
          </h1>
          <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Daftar materi yang diajukan oleh kreator dan membutuhkan proses persetujuan.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari judul atau pembuat..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-9 pr-4 py-2 text-sm rounded-xl border outline-none transition ${
              isDark 
                ? 'bg-slate-900 border-slate-800 text-slate-100 focus:border-indigo-500' 
                : 'bg-white border-slate-200 text-slate-800 focus:border-indigo-500'
            }`}
          />
        </div>
      </div>

      {/* Content Table / List */}
      {loading ? (
        <div className="p-12 text-center text-slate-400">
          <div className="inline-block w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mb-2"></div>
          <p className="text-sm">Memuat antrean moderasi...</p>
        </div>
      ) : filteredMaterials.length === 0 ? (
        <div className={`p-12 text-center rounded-2xl border ${
          isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500'
        }`}>
          <FileText className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p className="font-semibold text-base">Tidak ada antrean materi</p>
          <p className="text-xs mt-1">Semua pengajuan materi telah diproses atau belum ada pengajuan baru.</p>
        </div>
      ) : (
        <div className={`rounded-2xl border overflow-hidden ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className={`border-b text-xs uppercase font-semibold ${
                isDark ? 'border-slate-800 bg-slate-950/50 text-slate-400' : 'border-slate-200 bg-slate-50 text-slate-600'
              }`}>
                <tr>
                  <th className="py-3.5 px-4">Judul Materi</th>
                  <th className="py-3.5 px-4">Kategori</th>
                  <th className="py-3.5 px-4">Kreator</th>
                  <th className="py-3.5 px-4">Tanggal Pengajuan</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-slate-800' : 'divide-slate-100'}`}>
                {filteredMaterials.map((item) => (
                  <tr key={item.id} className={`transition ${isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'}`}>
                    <td className="py-4 px-4 font-semibold">
                      <div className="flex items-center gap-3">
                        {item.cover_image_url && (
                          <img 
                            src={item.cover_image_url} 
                            alt={item.title} 
                            className="w-10 h-10 rounded-lg object-cover border border-slate-700/50" 
                          />
                        )}
                        <span className="line-clamp-1">{item.title}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                        <Tag className="w-3 h-3" />
                        {item.category_name || item.category?.name || 'Umum'}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1.5 text-xs">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.author_name || item.author?.name || 'Anonim'}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <Link
                        to={`/admin/moderation/${item.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500 transition"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Review
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}