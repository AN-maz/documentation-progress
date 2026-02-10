import { useState, useEffect } from 'react'
import { getHallo } from './services/api';

function App() {

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const result = await getHallo();
        setData(result)

      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    };
    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className='text-3xl font-bold text-blue-600 mb-4'>Hallo MasPur!</h1>

      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md text-center">
        <h2 className='text-xl font-semibold mb-2'>Status Koneksi backend:</h2>

        {loading && <p>Sedang memuat data...</p>}

        {error && (
          <div className="">
            Gagal tersambung: {error}
          </div>
        )}

        {data && (
          <div className="">
            <p>{data.message}</p>
            <p>Status: {data.status}</p>
          </div>
        )}
      </div>

      <button onClick={() => window.location.reload()} className='mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition'>
        Refresh Data
      </button>
    </div>
  );
}

export default App