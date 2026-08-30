import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { materialService } from '../../api/materi.service';
import { Search, Filter, Star, BookOpen, User, ArrowRight, Loader2 } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

export default function MaterialCatalogPage() {
  const [materials, setMaterials] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({ current_page: 1, total_pages: 1 });
  
  // State Filter & Query
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Fetch Daftar Kategori
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await materialService.getCategories();
        if (res.success) setCategories(res.data);
      } catch (err) {
        console.error('Gagal memuat kategori:', err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch Daftar Materi (dengan debounce & cleanup)
  useEffect(() => {
    const fetchMaterials = async () => {
      setLoading(true);
      try {
        const params = {
          category_id: selectedCategory || undefined,
          search: searchQuery || undefined,
          sort: sortBy,
          page: currentPage,
          limit: 9,
        };

        const res = await materialService.getMaterials(params);
        if (res.success) {
          setMaterials(res.data.materials);
          setPagination(res.data.pagination);
        }
      } catch (err) {
        console.error('Gagal memuat katalog materi:', err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchMaterials();
    }, 300);

    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery, sortBy, currentPage]);

  const handleReadClick = (slug) => {
    if (!isAuthenticated) {
      navigate('/auth', { state: { from: `/materi/${slug}` } });
    } else {
      navigate(`/materi/${slug}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Katalog Pembelajaran
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Eksplorasi Modul & Materi Terbaik
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Tingkatkan keahlianmu, kumpulkan EXP, dan naikkan peringkat di papan skor platform gamifikasi.
          </p>
        </div>

        {/* Filter, Search Bar, & Sort Options */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-200/80 mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Input Search */}
            <div className="relative md:col-span-6">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Cari materi pembelajaran..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
              />
            </div>

            {/* Select Category */}
            <div className="relative md:col-span-3">
              <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition appearance-none cursor-pointer"
              >
                <option value="">Semua Kategori</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Select Sort */}
            <div className="md:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition cursor-pointer"
              >
                <option value="latest">Terbaru</option>
                <option value="popular">Terpopuler</option>
              </select>
            </div>

          </div>
        </div>

        {/* Content Section / Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-2" />
            <p className="text-sm text-slate-500 font-medium">Memuat katalog materi...</p>
          </div>
        ) : materials.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto my-8">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-800">Materi Tidak Ditemukan</h3>
            <p className="text-sm text-slate-500 mt-1">
              Coba sesuaikan kata kunci pencarian atau ubah filter kategori yang kamu pilih.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {materials.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col group"
              >
                {/* Cover Image */}
                <div className="relative h-48 bg-slate-100 overflow-hidden">
                  <img
                    src={item.cover_image_url || 'https://via.placeholder.com/600x400?text=LMS+Materi'}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-xs font-semibold text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200">
                    {item.category?.name || 'Umum'}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition line-clamp-2">
                      {item.title}
                    </h3>

                    {/* Author & Rating Info */}
                    <div className="flex items-center justify-between text-xs text-slate-500 mt-4 pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-medium text-slate-700">{item.author?.name || 'Anonim'}</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500 font-semibold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{Number(item.average_rating || 0).toFixed(1)}</span>
                        <span className="text-slate-400">({item.ratings_count || 0})</span>
                      </div>
                    </div>
                  </div>

                  {/* Read Button */}
                  <button
                    onClick={() => handleReadClick(item.slug)}
                    className="mt-5 w-full flex items-center justify-center gap-2 py-2.5 bg-slate-50 hover:bg-blue-600 hover:text-white text-slate-700 text-xs font-bold rounded-xl transition group/btn border border-slate-200/80 hover:border-blue-600"
                  >
                    <span>Mulai Membaca</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Control */}
        {!loading && pagination.total_pages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-white text-slate-600 disabled:opacity-50 hover:bg-slate-50"
            >
              Sebelumnya
            </button>
            <span className="text-xs text-slate-500 font-medium px-2">
              Halaman {pagination.current_page} dari {pagination.total_pages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pagination.total_pages))}
              disabled={currentPage === pagination.total_pages}
              className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-white text-slate-600 disabled:opacity-50 hover:bg-slate-50"
            >
              Selanjutnya
            </button>
          </div>
        )}

      </div>
    </div>
  );
}