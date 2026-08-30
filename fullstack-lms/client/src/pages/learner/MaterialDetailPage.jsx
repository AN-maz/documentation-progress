import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown'; // Import library markdown
import { materialService } from '../../api/materi.service';
import { useAuthStore } from '../../store/useAuthStore';
import { Loader2, ArrowLeft } from 'lucide-react';

export default function MaterialDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [material, setMaterial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth', { state: { from: `/materi/${slug}` }, replace: true });
    }
  }, [isAuthenticated, navigate, slug]);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!isAuthenticated) return;

      try {
        setLoading(true);
        const res = await materialService.getMaterialBySlug(slug);
        if (res.success) {
          setMaterial(res.data);
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

    if (slug) fetchDetail();
  }, [slug, isAuthenticated]);

  if (!isAuthenticated) return null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (error || !material) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 text-center">
        <h2 className="text-xl font-bold text-slate-800">Materi Tidak Ditemukan</h2>
        <p className="text-sm text-slate-500 mt-2 mb-6">{error}</p>
        <Link to="/materi" className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold">
          Kembali ke Katalog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm">
        <Link to="/materi" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-blue-600 mb-6 transition">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Katalog
        </Link>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{material.title}</h1>
        
        {/* Render Markdown dengan ReactMarkdown */}
        <div className="mt-6 prose max-w-none text-slate-700">
          <ReactMarkdown>{material.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}