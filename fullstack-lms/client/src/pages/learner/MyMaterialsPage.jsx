import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { materialService } from '../../api/materi.service';
import { useAuthStore } from '../../store/useAuthStore';
import { useThemeStore } from '../../store/useThemeStore';
import { 
  Loader2, 
  PlusCircle, 
  BookOpen, 
  Clock, 
  Eye, 
  Edit3, 
  Trash2, 
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

export default function MyMaterialsPage() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State Modal
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null, title: '' });
  const [deleting, setDeleting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth', { replace: true });
      return;
    }

    const fetchMyMaterials = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const res = await materialService.getUserMaterials();
        
        if (res.success && res.data) {
          const dataList = Array.isArray(res.data) 
            ? res.data 
            : res.data.materials || [];
          setMaterials(dataList);
        } else {
          setError('Gagal memuat daftar materi.');
        }
      } catch (err) {
        console.error('Error fetching my materials:', err);
        setError('Terjadi kesalahan saat mengambil data materi.');
      } finally {
        setLoading(false);
      }
    };

    fetchMyMaterials();
  }, [isAuthenticated, navigate]);

  // Handler Buka Modal Konfirmasi Hapus
  const openDeleteModal = (id, title) => {
    setDeleteModal({ show: true, id, title });
  };

  // Handler Eksekusi Hapus Materi
  const handleConfirmDelete = async () => {
    const { id, title } = deleteModal;
    if (!id) return;

    try {
      setDeleting(true);
      await materialService.deleteMaterial(id);
      setMaterials((prev) => prev.filter((item) => item.id !== id));
      setDeleteModal({ show: false, id: null, title: '' });
      setSuccessMessage(`Materi "${title}" berhasil dihapus!`);
    } catch (err) {
      console.error('Gagal menghapus materi:', err);
      alert('Gagal menghapus materi. Silakan coba lagi.');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin mb-3" />
        <p className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          Memuat materi kamu...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 relative">
      
      {/* Header & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className={`text-2xl font-bold ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
            Materi Saya
          </h1>
          <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Kelola materi pembelajaran yang telah kamu buat dan publikasikan.
          </p>
        </div>

        <Link
          to="/dashboard/materi/create"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-indigo-600/20"
        >
          <PlusCircle className="w-4 h-4" /> Buat Materi Baru
        </Link>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-medium flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" /> {error}
        </div>
      )}

      {/* Empty State */}
      {!error && materials.length === 0 && (
        <div className={`min-h-[40vh] flex flex-col items-center justify-center p-8 text-center rounded-2xl border ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-4">
            <BookOpen className="w-8 h-8" />
          </div>
          <h2 className={`text-lg font-bold ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
            Belum Ada Materi Ditambahkan
          </h2>
          <p className={`text-xs max-w-md mt-1 mb-6 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Kamu belum membuat materi pembelajaran apapun. Mulai bagikan pengetahuanmu dengan membuat materi pertama!
          </p>
          <Link
            to="/dashboard/materi/create"
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition"
          >
            Buat Materi Pertama
          </Link>
        </div>
      )}

      {/* Grid Materials List */}
      {!error && materials.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((item) => {
            const status = item.status || 'pending';
            const isApproved = status === 'approved' || status === 'PUBLISHED';

            return (
              <div
                key={item.id}
                className={`flex flex-col rounded-2xl border overflow-hidden transition shadow-sm hover:shadow-md ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                {/* Cover Image */}
                {item.cover_image_url ? (
                  <div className="h-40 overflow-hidden bg-slate-800 relative">
                    <img 
                      src={item.cover_image_url} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                    <span className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                      isApproved 
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 backdrop-blur-md'
                        : 'bg-amber-500/20 text-amber-400 border-amber-500/30 backdrop-blur-md'
                    }`}>
                      {status}
                    </span>
                  </div>
                ) : (
                  <div className={`h-40 flex items-center justify-center relative ${
                    isDark ? 'bg-slate-800/50' : 'bg-slate-100'
                  }`}>
                    <BookOpen className="w-10 h-10 text-slate-400/50" />
                    <span className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                      isApproved 
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 backdrop-blur-md'
                        : 'bg-amber-500/20 text-amber-400 border-amber-500/30 backdrop-blur-md'
                    }`}>
                      {status}
                    </span>
                  </div>
                )}

                {/* Body Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {item.category && (
                      <span className="text-[10px] font-bold text-indigo-500 tracking-wider uppercase">
                        {item.category.name}
                      </span>
                    )}
                    <h3 className={`text-base font-bold line-clamp-2 mt-1 ${
                      isDark ? 'text-slate-100' : 'text-slate-800'
                    }`}>
                      {item.title}
                    </h3>
                  </div>

                  {/* Actions & Meta */}
                  <div className={`pt-4 border-t flex items-center justify-between text-xs ${
                    isDark ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'
                  }`}>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>
                        {item.created_at ? new Date(item.created_at).toLocaleDateString('id-ID') : '-'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Link
                        to={`/dashboard/materi/${item.slug}`}
                        className={`p-2 rounded-lg transition ${
                          isDark ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-600'
                        }`}
                        title="Lihat Detail"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>

                      <Link
                        to={`/dashboard/materi/edit/${item.id}`}
                        className={`p-2 rounded-lg transition ${
                          isDark ? 'hover:bg-slate-800 text-indigo-400' : 'hover:bg-slate-100 text-indigo-600'
                        }`}
                        title="Edit Materi"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Link>

                      <button
                        onClick={() => openDeleteModal(item.id, item.title)}
                        className="p-2 rounded-lg text-rose-500 hover:bg-rose-500/10 transition"
                        title="Hapus Materi"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* POPUP KONFIRMASI HAPUS */}
      {deleteModal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className={`w-full max-w-md p-6 rounded-2xl border shadow-2xl space-y-4 ${
            isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
          }`}>
            <div className="flex items-center gap-3 text-rose-500">
              <div className="p-3 bg-rose-500/10 rounded-xl">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold">Hapus Materi</h3>
            </div>
            
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Apakah Anda yakin ingin menghapus materi <span className="font-semibold text-rose-400">"{deleteModal.title}"</span>? Tindakan ini tidak dapat dibatalkan.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                disabled={deleting}
                onClick={() => setDeleteModal({ show: false, id: null, title: '' })}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                Batal
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={handleConfirmDelete}
                className="inline-flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition disabled:opacity-50"
              >
                {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Hapus'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* POPUP BERHASIL HAPUS */}
      {successMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className={`w-full max-w-sm p-6 rounded-2xl border shadow-2xl text-center space-y-4 ${
            isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
          }`}>
            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-base font-bold">Berhasil!</h3>
              <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {successMessage}
              </p>
            </div>
            <button
              onClick={() => setSuccessMessage(null)}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

    </div>
  );
}