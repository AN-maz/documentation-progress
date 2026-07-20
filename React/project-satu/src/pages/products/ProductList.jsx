import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts, deleteProduct } from '../../services/productService'
import Sidebar from '../../components/layout/Sidebar'
import Navbar from '../../components/layout/Navbar'
import Button from '../../components/ui/Button'
import Table from '../../components/ui/Table'
import Modal from '../../components/ui/Modal'

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [deleteId, setDeleteId] = useState(null)
  const [loading, setLoading] = useState(true)
  
  // State untuk Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6 // Ubah angka ini untuk mengatur jumlah produk per halaman

  const fetchProducts = () => {
    setLoading(true)
    getProducts()
      .then(setProducts)
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchProducts() }, [])

  // --- Logika Pagination ---
  const totalPages = Math.ceil(products.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  
  // Mengambil hanya produk yang sesuai dengan halaman saat ini
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem)

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1))
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  // -------------------------

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      await deleteProduct(deleteId)
      setProducts((prev) => {
        const updatedProducts = prev.filter((p) => p.id !== deleteId)
        
        // Mencegah halaman kosong jika kita menghapus item terakhir di halaman terakhir
        const newTotalPages = Math.ceil(updatedProducts.length / itemsPerPage)
        if (currentPage > newTotalPages && newTotalPages > 0) {
          setCurrentPage(newTotalPages)
        }
        
        return updatedProducts
      })
    } catch {
      alert('Gagal menghapus produk')
    }
    setDeleteId(null)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col ">
        <Navbar />
        <main className="flex-1 p-6 bg-gray-50">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-primary">Products</h1>
            <Link to="/products/new">
              <Button variant="accent">+ Add Product</Button>
            </Link>
          </div>

          {loading ? (
            <p className="text-secondary">Loading...</p>
          ) : (
            <>
              <Table headers={['Image', 'Title', 'Price', 'Stock', 'Actions']}>
                {currentProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <img src={product.thumbnail} alt={product.title} className="w-12 h-12 object-cover rounded" />
                    </td>
                    <td className="px-4 py-3 font-medium">{product.title}</td>
                    <td className="px-4 py-3 text-accent font-semibold">${product.price}</td>
                    <td className="px-4 py-3">{product.stock}</td>
                    <td className="px-4 py-3 flex gap-2">
                      <Link to={`/products/edit/${product.id}`}>
                        <Button variant="secondary" className="text-xs px-3 py-1">Edit</Button>
                      </Link>
                      <Button variant="danger" className="text-xs px-3 py-1" onClick={() => setDeleteId(product.id)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </Table>

              {/* Komponen Kontrol Pagination */}
              {products.length > 0 && (
                <div className="flex items-center justify-between mt-6">
                  <p className="text-sm text-gray-500">
                    Menampilkan <span className="font-medium">{indexOfFirstItem + 1}</span> hingga{' '}
                    <span className="font-medium">{Math.min(indexOfLastItem, products.length)}</span> dari{' '}
                    <span className="font-medium">{products.length}</span> produk
                  </p>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="secondary" 
                      onClick={handlePrevPage} 
                      disabled={currentPage === 1}
                      className={currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}
                    >
                      Previous
                    </Button>
                    <div className="flex items-center px-4 font-medium text-gray-700 bg-white border rounded">
                      Page {currentPage} of {totalPages || 1}
                    </div>
                    <Button 
                      variant="secondary" 
                      onClick={handleNextPage} 
                      disabled={currentPage === totalPages || totalPages === 0}
                      className={currentPage === totalPages || totalPages === 0 ? 'opacity-50 cursor-not-allowed' : ''}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      <Modal open={!!deleteId} onClose={() => setDeleteId(null)} title="Confirm Delete">
        <p className="text-secondary mb-4">Yakin ingin menghapus produk ini?</p>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </div>
      </Modal>
    </div>
  )
}