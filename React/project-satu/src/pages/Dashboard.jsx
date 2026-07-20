import { useEffect, useState } from 'react'
import { getProducts } from '../services/productService'
import Sidebar from '../components/layout/Sidebar'
import Navbar from '../components/layout/Navbar'

export default function Dashboard() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    getProducts().then((products) => {
      const total = products.length
      const totalStock = products.reduce((sum, p) => sum + p.stock, 0)
      const avgPrice = (products.reduce((sum, p) => sum + p.price, 0) / total).toFixed(2)
      setStats({ total, totalStock, avgPrice })
    }).catch(() => {})
  }, [])

  const cards = [
    { label: 'Total Products', value: stats?.total ?? '-', color: 'bg-primary' },
    { label: 'Total Stock', value: stats?.totalStock ?? '-', color: 'bg-accent' },
    { label: 'Avg Price', value: stats ? `$${stats.avgPrice}` : '-', color: 'bg-secondary' },
  ]

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 p-6 bg-gray-50">
          <h1 className="text-2xl font-bold text-primary mb-6">Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cards.map((card) => (
              <div key={card.label} className="bg-white rounded-xl shadow p-6 border-l-4 border-primary">
                <p className="text-sm text-secondary">{card.label}</p>
                <p className="text-3xl font-bold text-primary mt-1">{card.value}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
