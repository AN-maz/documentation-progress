import { useState } from 'react';

// Komponen Logika: Hanya bertugas melacak mouse
function PelacakMouse({ render }) {
  const [posisi, setPosisi] = useState({ x: 0, y: 0 });

  return (
    <div 
      className="h-40 bg-gray-200 border-2 border-dashed p-2"
      onMouseMove={(e) => setPosisi({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })}
    >
      {/* Memanggil fungsi dari props dan mengirim data posisi */}
      {render(posisi)}
    </div>
  );
}

export default function RenderProps() {
  return (
    <div className="p-4">
      <h3 className="mb-2">Gerakkan mouse di kotak bawah:</h3>
      <PelacakMouse 
        // Mengirimkan fungsi sebagai props bernama 'render'
        render={(posisi) => (
          <p className="text-red-500 font-bold">
            Posisi X: {posisi.x}, Y: {posisi.y}
          </p>
        )} 
      />
    </div>
  );
}