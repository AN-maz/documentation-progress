// Komponen Wrapper (Hanya mengurus kotak dan border)
function Card({ judul, children }) {
  return (
    <div className="border-2 border-gray-200 rounded-xl p-4 max-w-md my-4 shadow-md">
      {judul && (
        <div className="border-b pb-2 mb-2">
          <h2 className="font-semibold text-lg">{judul}</h2>
        </div>
      )}
      {/* Di sinilah konten apapun dari parent akan dirender */}
      <div>{children}</div>
    </div>
  );
}

// Menggunakan Card dengan berbagai macam isi
export default function Composition() {
  return (
    <div className="p-4">
      <Card judul="Kartu Profil">
        <p className="text-gray-600">Ini adalah isi dari kartu profil. Bisa berisi teks.</p>
      </Card>

      <Card judul="Kartu Aksi">
        <button className="bg-red-500 text-white px-4 py-2 rounded">
          Hapus Akun
        </button>
      </Card>

      <Card>
        <p>Kartu ini tidak punya props judul, tapi tetep bisa punya children.</p>
      </Card>
    </div>
  );
}