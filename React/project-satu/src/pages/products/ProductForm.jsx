import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProduct, createProduct, updateProduct } from '../../services/productService'
import Sidebar from '../../components/layout/Sidebar'
import Navbar from '../../components/layout/Navbar'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'

export default function ProductForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = !!id
  const [form, setForm] = useState({ title: '', price: '', description: '' })
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(isEdit)

  useEffect(() => {
    if (isEdit) {
      getProduct(id)
        .then((p) => setForm({ title: p.title, price: String(p.price), description: p.description }))
        .catch(() => alert('Gagal memuat produk'))
        .finally(() => setFetchLoading(false))
    }
  }, [id, isEdit])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = { ...form, price: Number(form.price) }
      if (isEdit) {
        await updateProduct(id, payload)
      } else {
        await createProduct(payload)
      }
      navigate('/products')
    } catch {
      alert('Gagal menyimpan produk')
    } finally {
      setLoading(false)
    }
  }

  if (fetchLoading) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6"><p className="text-secondary">Loading...</p></div>
      </div>
    )
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 p-6 bg-gray-50">
          <h1 className="text-2xl font-bold text-primary mb-6">
            {isEdit ? 'Edit Product' : 'Add Product'}
          </h1>

          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 max-w-lg space-y-4">
            <Input
              label="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
            <Input
              label="Price"
              type="number"
              step="0.01"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
            />
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-secondary">Description</label>
              <textarea
                className="border border-secondary-light rounded-lg px-3 py-2 outline-none focus:border-primary transition-colors resize-none h-24"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
              />
            </div>

            <div className="flex gap-2 pt-2">
              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product'}
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate('/products')}>
                Cancel
              </Button>
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}
