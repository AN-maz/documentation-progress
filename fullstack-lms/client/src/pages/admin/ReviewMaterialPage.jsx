import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useThemeStore } from '../../store/useThemeStore';
import { adminService } from '../../api/admin.service';
import { 
  ArrowLeft, 
  Check, 
  X, 
  User, 
  Tag, 
  Calendar, 
  AlertCircle 
} from 'lucide-react';

export default function ReviewMaterialPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  const [material, setMaterial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Modal State untuk Reject
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    let isMounted = true;

    const fetchDetail = async () => {
      try {
        setLoading(true);
        const res = await adminService.getPendingMaterials();
        const list = res?.data || res || [];
        const found = list.find((m) => String(m.id) === String(id));
        
        if (!isMounted) return;

        if (found) {
          setMaterial(found);
        } else {
          navigate('/admin/moderation');
        }
      } catch (err) {
        console.error('Gagal mengambil materi:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (id) {
      fetchDetail();
    }

    return () => {
      isMounted = false;
    };
  }, [id, navigate]);

  const handleApprove = async () => {
    if (!confirm('Apakah Anda yakin ingin menyetujui materi ini?')) return;
    try {
      setActionLoading(true);
      await adminService.updateMaterialStatus(id, 'approved');
      alert('Materi berhasil disetujui!');
      navigate('/admin/moderation');
    } catch (err) {
      alert('Gagal menyetujui materi: ' + (err.response?.data?.message || err.message));
    } finally {
      setActionLoading(false);
    }
  };

  const handleRejectSubmit = async (e) => {
    e.preventDefault();
    if (!rejectionReason.trim()) {
      alert('Alasan penolakan wajib diisi!');
      return;
    }

    try {
      setActionLoading(true);
      await adminService.updateMaterialStatus(id, 'rejected', rejectionReason);
      alert('Materi telah ditolak.');
      navigate('/admin/moderation');
    } catch (err) {
      alert('Gagal menolak materi: ' + (err.response?.data?.message || err.message));
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-slate-400">
        <div className="inline-block w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mb-2"></div>
        <p className="text-sm">Memuat detail materi...</p>
      </div>
    );
  }

  if (!material) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/admin/moderation')}
          className={`flex items-center gap-2 text-sm font-medium transition ${
            isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Antrean
        </button>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowRejectModal(true)}
            disabled={actionLoading}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-rose-500/10 text-rose-500 border border-rose-500/20 hover:bg-rose-500 hover:text-white transition disabled:opacity-50"
          >
            <X className="w-4 h-4" /> Tolak Materi
          </button>
          <button
            onClick={handleApprove}
            disabled={actionLoading}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-500 transition shadow-lg shadow-emerald-600/20 disabled:opacity-50"
          >
            <Check className="w-4 h-4" /> Setujui & Publikasikan
          </button>
        </div>
      </div>

      {/* Main Material Detail Container */}
      <div className={`p-6 sm:p-8 rounded-2xl border space-y-6 ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        {/* Cover Image */}
        {material.cover_image_url && (
          <img
            src={material.cover_image_url}
            alt={material.title}
            className="w-full h-64 sm:h-80 object-cover rounded-xl border border-slate-800"
          />
        )}

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
            <Tag className="w-3.5 h-3.5" />
            {material.category_name || material.category?.name || 'Umum'}
          </span>
          <span className="flex items-center gap-1 text-slate-400">
            <User className="w-3.5 h-3.5" />
            {material.author_name || material.author?.name || 'Kreator'}
          </span>
          <span className="flex items-center gap-1 text-slate-400">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(material.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold">{material.title}</h1>

        {/* Divider */}
        <hr className={isDark ? 'border-slate-800' : 'border-slate-100'} />

        {/* Content Body */}
        <div className={`prose max-w-none text-sm leading-relaxed whitespace-pre-line ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
          {material.content}
        </div>
      </div>

      {/* REJECT MODAL */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className={`w-full max-w-md p-6 rounded-2xl border shadow-xl ${
            isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
          }`}>
            <div className="flex items-center gap-3 mb-4 text-rose-500">
              <AlertCircle className="w-6 h-6" />
              <h3 className="text-lg font-bold">Tolak Pengajuan Materi</h3>
            </div>
            
            <p className="text-xs text-slate-400 mb-4">
              Berikan alasan penolakan yang jelas agar penulis/kreator dapat memperbaiki materinya.
            </p>

            <form onSubmit={handleRejectSubmit} className="space-y-4">
              <textarea
                rows={4}
                required
                placeholder="Contoh: Format penulisan belum rapi atau konten mengandung unsur hak cipta..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className={`w-full p-3 text-sm rounded-xl border outline-none transition ${
                  isDark 
                    ? 'bg-slate-950 border-slate-800 text-slate-100 focus:border-rose-500' 
                    : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-rose-500'
                }`}
              />

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowRejectModal(false)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold border ${
                    isDark ? 'border-slate-700 hover:bg-slate-800' : 'border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 text-white hover:bg-rose-500 transition disabled:opacity-50"
                >
                  Kirim Penolakan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}