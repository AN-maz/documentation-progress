import {useEffect, useState} from 'react';

export default function Lifecycle() {
    const [count, setCount] = useState(0);

    useEffect(()=> {
        console.log("Komponen dipasang")

        console.log(`Nilai count sekarang: ${count}`)

        return () => {
            console.log("Mempersilahkan effect sebelum hilang/berubah")
        };
    }, [count]);
    
return(
    <div className="p-4 bg-yellow-50 rounded">

        <p>Cek Console (F12) untuk melihat Lifecycle berjalan.</p>
      <button onClick={() => setCount(count + 1)} className="mt-2 p-2 bg-blue-500 text-white rounded">
        Klik saya: {count}
      </button>
    </div>
)

}