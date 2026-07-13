// Ini adalah fungsi HOC. Biasanya diawali dengan kata 'with'
function withAuth(KomponenBawaan) {
  return function KomponenYangDiperkaya(props) {
    // Simulasi ngecek user login atau tidak
    const isLogin = true; 

    if (!isLogin) {
      return <p className="text-red-500 p-4">Akses Ditolak! Anda belum login.</p>;
    }
    
    // Kalau login, tampilkan komponen aslinya sambil meneruskan props-nya
    return <KomponenBawaan {...props} />;
  };
}

// Komponen biasa
function DashboardRahasia({ nama }) {
  return <div className="p-4 bg-green-100 rounded">Selamat datang di Dashboard, {nama}!</div>;
}

// Membungkus komponen biasa dengan HOC
const DashboardDenganAuth = withAuth(DashboardRahasia);

export default function HighOrderComponents() {
  return (
    <div>
      <DashboardDenganAuth nama="Developer" />
    </div>
  );
}