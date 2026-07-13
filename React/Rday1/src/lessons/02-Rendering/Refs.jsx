import { useRef } from 'react';

export default function Refs() {
  // Membuat referensi kosong
  const inputRef = useRef(null);

  const fokusKeInput = () => {
    // Mengakses elemen DOM asli secara langsung
    inputRef.current.focus();
  };

  return (
    <div className="p-4">
      {/* Menyambungkan referensi ke elemen input */}
      <input 
        ref={inputRef} 
        type="text" 
        placeholder="Ketik sesuatu..." 
        className="border p-2 rounded mr-2"
      />
      <button onClick={fokusKeInput} className="bg-green-500 text-white p-2 rounded">
        Fokuskan Input
      </button>
    </div>
  );
}