# 🎬 Script Video: "CSRF Attack — Jangan Klik Sembarangan!"

---

## 🎙️ BAGIAN 1: PEMBUKAAN / HOOK
**[Visual: Layar gelap, kemudian muncul notifikasi "Saldo berkurang Rp 2.000.000"]**

> "Kamu belum beli apa-apa. Tapi saldo kamu baru aja terpotong dua juta rupiah."
>
> "Gimana bisa? Kamu cuma klik link promo cashback yang keliatan sah."
>
> "Ini bukan sulap. Ini CSRF — dan di video ini, kita bakal demo langsung gimana serangan ini bekerja."

---

## 🎙️ BAGIAN 2: PENJELASAN CSRF

**[Visual: Diagram sederhana — Browser → Server → Response]**

> "CSRF, atau *Cross-Site Request Forgery*, adalah serangan di mana browser kamu dipaksa ngirim request ke server lain — tanpa kamu sadari."
>
> "Cara kerjanya simpel: ketika kamu login ke suatu web, browser kamu nyimpen sesi. Nah, kalau kamu buka halaman lain yang berbahaya, halaman itu bisa manfaatin sesi yang udah ada itu buat ngirim request atas nama kamu."
>
> "Servernya nerima request itu — dan karena sesinya valid, server anggap itu permintaan sah dari kamu."

**[Visual: Highlight alur: User Login → Cookie Tersimpan → Buka Link Jahat → Request Otomatis Terkirim]**

> "Kuncinya ada di sini: server percaya browser, dan browser percaya halaman yang kamu buka. Kalau kamu buka halaman jahat, rantai kepercayaan ini dieksploitasi."

---

## 🎙️ BAGIAN 3: DEMO

**[Visual: Screen recording — buka dashboard e-commerce lab]**

> "Oke, kita masuk ke lab demo. Di sini ada aplikasi e-commerce sederhana — anggap aja ini dompet digital. User 'Andrian' udah login, dan punya saldo aktif."

**[Visual: Buka file `promo.html` di browser]**

> "Sekarang, misalnya Andrian nerima link promo cashback — keliatannya legit banget. Ada branding kece, kode kupon, tombol 'Klaim Hadiah Sekarang'."
>
> "Tapi coba kita lihat source code-nya."

**[Visual: Inspect element / buka source — highlight bagian form]**

> "Di balik tampilan yang meyakinkan ini, ada sebuah HTML form. Dan perhatiin: action-nya ngarah ke `http://localhost:5000/checkout` — itu server e-commerce kita."
>
> "Terus ada dua hidden input: `total_harga` nilainya 2 juta, dan `kirim_ke` nilainya alamat si penyerang. User sama sekali nggak bisa lihat ini."

**[Visual: Klik tombol "Klaim Hadiah Sekarang"]**

> "Begitu Andrian klik tombol itu..."

**[Visual: Muncul halaman sukses — 'Saldo terpotong Rp 2.000.000']**

> "Request POST dikirim ke server. Server nerima, karena sesi Andrian masih aktif. Saldo terpotong. Barang 'dikirim' ke alamat penyerang."
>
> "Andrian nggak pernah niat checkout. Tapi server nggak tau itu."

---

## 🎙️ BAGIAN 4: PENUTUP — WASPADA TAPI JANGAN PANIK

**[Visual: Kembali ke tampilan tenang, mungkin ikon shield atau gembok]**

> "Sekarang, kabar baiknya — serangan seperti ini udah jauh lebih susah dilakukan di era modern."
>
> "Browser-browser terkini udah implementasi proteksi seperti `SameSite Cookie`, yang nyegah cookie dikirim ke request dari situs lain. Ditambah, framework backend modern kayak Laravel, Django, atau Express udah otomatis generate CSRF Token buat validasi setiap form."
>
> "Jadi kalau kamu pakai aplikasi dari platform besar yang terus diupdate, kemungkinan besar kamu udah terlindungi secara default."
>
> "Tapi — dan ini penting — proteksi teknis nggak ada artinya kalau kamu sendiri yang klik linknya."
>
> "Social engineering masih jalan. Halaman phishing masih bisa dibuat semeyakinkan apapun. Satu klik di tempat yang salah bisa jadi titik awal dari serangan yang lebih kompleks."
>
> "Jadi pesannya simpel: **jangan klik link sembarangan.** Kalau ada promo yang terlalu bagus buat jadi kenyataan — curigai dulu sebelum klik."
>
> "Stay curious, stay secure."

---

## 📌 CATATAN PRODUKSI

| Segmen | Durasi Estimasi |
|---|---|
| Hook | ~30 detik |
| Penjelasan CSRF | ~60–90 detik |
| Demo | ~2–3 menit |
| Penutup | ~45 detik |
| **Total** | **~5 menit** |

> 💡 Tip: Untuk bagian demo, aktifkan browser dev tools dan tunjukkan tab Network agar penonton bisa melihat POST request yang terkirim secara real-time — ini bikin momen "wow"-nya lebih terasa.