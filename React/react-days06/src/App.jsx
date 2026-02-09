import { useState } from 'react';
import { searchMeals, testTimeOutConnection } from './services/api';

function App() {

  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null)
    setMeals([])

    try {
      const data = await searchMeals(query)

      if (data.meals) {
        setMeals(data.meals);
      } else {
        setError("Makanan tidak ditemukan")
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleTestTimeout = async () => {
    setLoading(true)
    setError(null)

    try {
      await testTimeOutConnection;
      alert("Success Conect!")
    } catch (err) {
      setError(`Test Timeout Berhasil: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-800">

      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-4xl mx-auto text-orange-600 mb-4">Restoran Fetch API</h1>
        <p className="text-gray-600">Belajar implementasi service pattern di React</p>
      </div>

      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md mb-8">
        <form onSubmit={handleSearch} className='flex gap-2'>
          <input
            type="text"
            className='flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500'
            placeholder='Cari makanan (misal: Chicken, beef)'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />


          <button
            className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 disable:opacity-50 transition"
            disabled={loading}
            type='submit'
          >
            {loading ? "Mencari..." : "Cari"}

          </button>
        </form>

        <div className="mt-4 flex gap-2 justify-center">
          <button
            className="text-xs text-gray-500 underline hover:text-red-500"
            onClick={handleTestTimeout}
          >
            Test Timeout logic

          </button>
        </div>
      </div>

      {error && (
        <div className="max-2-4xl mx-auto mb-6 bg-red-100 birder-1-4 border-red-500 text-red-700 p-4 rounded">
          <p className="font-bold">Terjadi Kesalahan</p>
          <p>{error}</p>
        </div>
      )}

      <div className="max-2-6xl mx-auto grid:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {meals.map((meal) => (
          <div key={meal.idMeal} className="bg-white rounded-xl shadow-lg overflow-hidden hover:-translate-y-1 transition duration-300" >
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full h-48 object-cover"
            />

            <div className="p-5">
              <span className='text-xs font-bold text-orange-500 bg-orange-100 px-2 py-1 rounded-full'>
                {meal.strCategory}
              </span>

              <h3 className='text-xl font-bold mt-2 mb-2'>{meal.strMeal}</h3>
              <p className='text-gray-500 text-sm line-clamp-2'>Asal: {meal.strArea}</p>
              <a href={meal.strYoutube} target='_blank' rel='noneferrer' className='mt-4 inline-block text-orange-600 font-semibold hover:underline'>
                Tonton Vidio Cara Masal &rarr;
              </a>
            </div>
          </div>
        ))}
      </div>
    </div >
  );
}

export default App