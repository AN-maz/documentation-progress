import { useState } from 'react';

// 1. Ini adalah Custom Hook kita
function useToggle(nilaiAwal = false) {
  const [status, setStatus] = useState(nilaiAwal);
  
  const toggle = () => setStatus(!status);
  
  return [status, toggle];
}

// 2. Ini komponen yang menggunakannya
export default function BelajarCustomHook() {
  // Panggil custom hook kita seolah-olah itu bawaan React
  const [isLampuNyala, toggleLampu] = useToggle(false);

  return (
    <div className={`p-8 border rounded ${isLampuNyala ? 'bg-yellow-200' : 'bg-gray-800 text-white'}`}>
      <h3>Status Lampu: {isLampuNyala ? "NYALA" : "MATI"}</h3>
      <button onClick={toggleLampu} className="mt-2 p-2 bg-blue-500 text-white rounded">
        {isLampuNyala ? "Matikan" : "Nyalakan"}
      </button>
    </div>
  );
}