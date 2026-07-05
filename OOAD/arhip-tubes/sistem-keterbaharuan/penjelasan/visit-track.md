

### Penjelasan Pembaruan Sistem (Alasan & Manfaat)

Saat kamu mempresentasikan atau menyusun laporannya, kamu bisa menggunakan argumen analitis berikut untuk mempertahankan gagasanmu di depan dosen:

**1. Penambahan Use Case "Mengecek Cakupan Jaringan (ODP)"**

* **Alasan:** Pada sistem lama, Sales seringkali sudah berhasil meyakinkan pelanggan (Status: *Hot*), namun saat dieskalasi ke tim teknis, ternyata pelabuhan jaringan (port ODP) di area tersebut sudah penuh atau belum terjangkau.
* **Manfaat:** Fitur ini mengintegrasikan VisitTrack secara langsung dengan *database* Sistem Operasional (tergambar dari garis ke aktor `SysOp`). Sales bisa memverifikasi status ODP secara *real-time* di depan rumah pelanggan sebelum menjanjikan jadwal pemasangan. Ini mencegah pembatalan sepihak dan meminimalisir komplain pelanggan.

**2. Penambahan Use Case "Mengatur Jadwal Kunjungan Ulang" (Alur *Extend*)**

* **Alasan:** Tidak semua calon pelanggan menolak dengan tegas atau langsung setuju berlangganan. Mayoritas berada di fase "pikir-pikir dulu" atau meminta Sales kembali saat mereka sudah gajian (*Warm Lead*).
* **Manfaat:** Daripada Sales lupa, ketika status prospek diubah menjadi "Warm", sistem memicu alur perluasan (*extend*) yang meminta Sales menjadwalkan kalender *follow-up*. Aplikasi akan memberikan notifikasi pengingat secara otomatis saat tanggal kunjungan ulang tiba, sehingga meningkatkan angka konversi penjualan.

**3. Penambahan Use Case "Melihat Dashboard Performa Harian"**

* **Alasan:** Sales lapangan membutuhkan transparansi mengenai pencapaian target harian mereka secara instan tanpa harus menunggu rekapan HR.
* **Manfaat:** Sales dapat melihat metrik seperti "Jumlah Kunjungan Hari Ini", "Target Tersisa", dan "Persentase Penutupan (*Closing Rate*)". Fitur layanan mandiri ini secara psikologis meningkatkan motivasi kerja agen Sales di lapangan.

Dengan 3 fitur usulan ini, **Sistem VisitTrack** tidak lagi hanya bertindak sebagai "mandor" untuk melacak koordinat Sales, melainkan benar-benar menjadi "asisten pintar" yang memfasilitasi kebutuhan penjualan di lapangan secara terintegrasi!