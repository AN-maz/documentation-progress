import { useState } from 'react';

export default function Events() {
  const [teks, setTeks] = useState("");

  // Handler event onSubmit
  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah halaman reload
    alert(`Data disubmit: ${teks}`);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <input 
        type="text" 
        value={teks}
        // Handler event onChange
        onChange={(e) => setTeks(e.target.value)} 
        className="border p-2 rounded w-full mb-2"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Kirim
      </button>
    </form>
  );
}