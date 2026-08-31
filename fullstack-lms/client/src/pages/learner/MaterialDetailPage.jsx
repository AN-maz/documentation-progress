import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { materialService } from '../../api/materi.service';
import { useAuthStore } from '../../store/useAuthStore';
import { useThemeStore } from '../../store/useThemeStore';
import { 
  Loader2, 
  ArrowLeft, 
  CheckCircle2, 
  User, 
  Tag, 
  Clock, 
  Zap, 
  Award 
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function MaterialDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const updateUserStats = useAuthStore((state) => state.updateUserStats);
  
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  const [material, setMaterial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [completing, setCompleting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth', { state: { from: `/dashboard/materi/${slug}` }, replace: true });
    }
  }, [isAuthenticated, navigate, slug]);

  useEffect(() => {
    const fetchDetailAndUserProgress = async () => {
      if (!isAuthenticated) return;

      try {
        setLoading(true);
        
        // 1. Fetch Detail Materi berdasarkan Slug
        const res = await materialService.getMaterialBySlug(slug);
        
        if (res.success && res.data) {
          const currentMaterial = res.data;
          setMaterial(currentMaterial);

          // Cek awal dari field bawaan detail (jika backend mengembalikannya)
          let completed = Boolean(currentMaterial.is_completed || currentMaterial.isCompleted);

          // 2. Cek silang ke daftar materi user jika belum terdeteksi completed
          if (!completed) {
            try {
              const userMatRes = await materialService.getUserMaterials();
              const userMaterials = userMatRes.data?.materials || userMatRes.data || [];

              // Cek apakah ID atau Slug materi ini ada di dalam daftar materi user yang sudah selesai
              completed = userMaterials.some(
                (item) => item.id === currentMaterial.id || item.slug === currentMaterial.slug
              );
            } catch (userErr) {
              console.error('Gagal memuat status progress user:', userErr);
            }
          }

          setIsCompleted(completed);
        } else {
          setError('Materi tidak ditemukan.');
        }
      } catch (err) {
        console.error('Error fetching detail:', err);
        setError('Gagal memuat materi pembelajaran.');
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchDetailAndUserProgress();
  }, [slug, isAuthenticated]);

  const handleComplete = async () => {
    const materialId = material?.id;

    if (!materialId) {
      toast.error('ID Materi tidak valid.');
      return;
    }

    try {
      setCompleting(true);
      const res = await materialService.completeMaterial(materialId);
      
      if (res.success) {
        toast.success(`Selamat! Kamu mendapatkan +${res.data?.gained_exp || 50} EXP! 🎉`);
        setIsCompleted(true);
        if (res.data?.user && updateUserStats) {
          updateUserStats(res.data.user);
        }
      }
    } catch (err) {
      console.error('Pesan Error dari Backend:', err.response?.data);
      
      const messages = err.response?.data?.messages;
      const errorMsg = Array.isArray(messages) && messages.length > 0 
        ? messages[0]?.message 
        : err.response?.data?.message;

      if (errorMsg && (errorMsg.includes('sudah klaim') || errorMsg.includes('sudah menyelesaikan'))) {
        setIsCompleted(true);
        toast.error('Kamu sudah klaim EXP dari materi ini sebelumnya.');
      } else {
        toast.error(errorMsg || 'Gagal menyelesaikan materi.');
      }
    } finally {
      setCompleting(false);
    }
  };

  if (!isAuthenticated) return null;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin mb-3" />
        <p className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          Memuat isi materi...
        </p>
      </div>
    );
  }

  if (error || !material) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
        <h2 className={`text-xl font-bold ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
          Materi Tidak Ditemukan
        </h2>
        <p className={`text-sm mt-2 mb-6 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{error}</p>
        <Link 
          to="/dashboard/materi" 
          className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition"
        >
          Kembali ke Katalog Materi
        </Link>
      </div>
    );
  }

  return (
    <div className={`max-w-4xl mx-auto space-y-6 ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
      
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link 
          to="/dashboard/materi" 
          className={`inline-flex items-center gap-2 text-xs font-semibold transition ${
            isDark ? 'text-slate-400 hover:text-indigo-400' : 'text-slate-500 hover:text-indigo-600'
          }`}
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Katalog Materi
        </Link>
      </div>

      {/* Main Card */}
      <article className={`p-6 sm:p-10 rounded-2xl border shadow-xl space-y-8 transition ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        
        {/* Header Materi */}
        <div className={`space-y-4 border-b pb-6 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
          <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight">
            {material.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
            {material.author && (
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-indigo-400" />
                <span>{material.author.name}</span>
              </div>
            )}
            {material.category && (
              <>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-indigo-400" />
                  <span>{material.category.name}</span>
                </div>
              </>
            )}
            {material.created_at && (
              <>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-indigo-400" />
                  <span>{new Date(material.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Gambar Cover (Jika Ada) */}
        {material.cover_image_url && (
          <div className="overflow-hidden rounded-xl max-h-[400px]">
            <img 
              src={material.cover_image_url} 
              alt={material.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Dynamic Markdown Content */}
        <div className={`prose max-w-none text-sm sm:text-base leading-relaxed ${
          isDark 
            ? 'prose-invert text-slate-200 prose-headings:text-slate-100 prose-a:text-indigo-400 prose-code:text-indigo-300' 
            : 'text-slate-800 prose-headings:text-slate-900 prose-a:text-indigo-600 prose-code:text-indigo-600'
        }`}>
          <ReactMarkdown>{material.content}</ReactMarkdown>
        </div>

        {/* Gamification Completion Footer */}
        <div className={`pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${
          isDark ? 'border-slate-800' : 'border-slate-100'
        }`}>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20 text-xs font-bold">
              <Zap className="w-4 h-4" /> +50 EXP
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-xs font-bold">
              <Award className="w-4 h-4" /> +10 Poin
            </div>
          </div>

          <button
            onClick={handleComplete}
            disabled={isCompleted || completing}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition shadow-lg ${
              isCompleted
                ? isDark
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-not-allowed'
                  : 'bg-emerald-600 text-white cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/30'
            }`}
          >
            {completing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Memproses...
              </>
            ) : isCompleted ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Materi Selesai
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" /> Tandai Selesai & Klaim EXP
              </>
            )}
          </button>
        </div>

      </article>

    </div>
  );
}