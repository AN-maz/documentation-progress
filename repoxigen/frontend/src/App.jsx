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
    <div className="">
      <h1>Hallo MasPur!</h1>

      <div className="">
        <h2>Status Koneksi backend:</h2>

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

      <button onClick={() => window.location.reload()}>
        Refresh Data
      </button>
    </div>
  );
}

export default App