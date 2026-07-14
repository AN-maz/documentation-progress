import { useReducer } from 'react';

// 1. Buat fungsi 'reducer' untuk menentukan bagaimana state berubah
function reducer(state, action) {
  switch (action.type) {
    case 'tambah': return { hitung: state.hitung + 1 };
    case 'kurang': return { hitung: state.hitung - 1 };
    case 'reset': return { hitung: 0 };
    default: throw new Error();
  }
}

export default function BelajarUseReducer() {
  // 2. Gunakan useReducer(fungsiReducer, nilaiAwal)
  const [state, dispatch] = useReducer(reducer, { hitung: 0 });

  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl mb-4">Angka: {state.hitung}</h2>
      <div className="space-x-2">
        {/* 3. Gunakan 'dispatch' untuk mengirim perintah (action) */}
        <button className="bg-blue-500 text-white p-2 rounded" onClick={() => dispatch({ type: 'tambah' })}>+</button>
        <button className="bg-red-500 text-white p-2 rounded" onClick={() => dispatch({ type: 'kurang' })}>-</button>
        <button className="bg-gray-500 text-white p-2 rounded" onClick={() => dispatch({ type: 'reset' })}>Reset</button>
      </div>
    </div>
  );
}