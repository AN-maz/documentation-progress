# React Roadmap 2: Interaktivitas dan Siklus Hidup Komponen

## Daftar Isi

1. [Pendahuluan](#pendahuluan)
2. [Event dan Forms](#event-dan-forms)
3. [Conditional Rendering](#conditional-rendering)
4. [List Rendering](#list-rendering)
5. [Siklus Hidup Komponen](#siklus-hidup-komponen)
6. [Effect Hook (useEffect)](#effect-hook-useeffect)
7. [Tugas Mandiri](#tugas-mandiri)

---

#  Pendahuluan

Di Pertemuan 8, kita sudah belajar terkait pengenalan react, meliputi:
- apa itu JSX dan penulisan react
- apa itu components 
- bagaimana caranya components bisa menerima sebuat data (props)
- dan bagaimana cara components berinteraksi dengan data yang sering berubah (useState)

ini pengenalan yg menjadi dasar temen-temen untuk upgrade pemahaman lebih lanjut dengan react, di materi lanjutan ini kita akan mempelajari:
- Event dan forms (event handling, Controlled Components)
- conditional rendering 
- list rendering 
- effect hook (useEffect)

**Korelasi dengan materi sebelumnya:**

Di Pertemuan 8, `useState` sudah mengajarkan kita bagaimana component **menyimpan** dan **mengubah** data (state). Tapi selama ini perubahan state itu masih pasif — hanya berubah lewat contoh kode yang sudah kita tulis manual, belum benar-benar dipicu oleh interaksi user secara nyata (klik, ketik, submit).

Nah, di modul ini state itu akan "dihidupkan" oleh **event** dari user:
- **Event & Forms** → bagaimana caranya `setState` dipanggil ketika user klik atau mengetik.
- **Conditional Rendering** → begitu state berubah, tampilan yang muncul juga ikut berubah.
- **List Rendering** → menampilkan data yang biasanya datang dalam bentuk array (misalnya dari API).
- **useEffect** → menjalankan efek samping (side effect) *setelah* state atau props tertentu berubah, termasuk memahami kapan sebuah component "lahir" (mount), "diperbarui" (update), dan "dimatikan" (unmount) — inilah yang disebut **siklus hidup komponen**.

Singkatnya: Pertemuan 8 = component yang *diam*, Pertemuan ini = component yang *hidup dan merespons*.

---

# Event dan Forms

Dalam React, menangani interaksi (*event*) seperti klik tombol atau mengetik di form sangat mirip dengan HTML biasa, tapi dengan sedikit gaya JavaScript.

## Event Handling

Penulisan *event* di React menggunakan **camelCase** (contoh: `onClick`, `onChange`, `onSubmit`), bukan *lowercase* seperti di HTML. Beberapa event yang paling sering dipakai:

| Event | Kapan dipicu |
|---|---|
| `onClick` | saat elemen diklik |
| `onChange` | saat isi input/textarea/select berubah |
| `onSubmit` | saat form dikirim |
| `onKeyDown` / `onKeyUp` | saat tombol keyboard ditekan/dilepas |
| `onMouseEnter` / `onMouseLeave` | saat kursor masuk/keluar dari elemen |
| `onFocus` / `onBlur` | saat elemen mendapat/kehilangan fokus |

```jsx
// Contoh dari Navbar.jsx — tombol navigasi
{navLinks.map((link) => (
  <button onClick={() => onNavigate(link.id)}>
    {link.label}
  </button>
))}
```

```jsx
// Contoh dari Navbar.jsx — toggle menu mobile
<button onClick={() => setOpen(!open)}>
  {open ? <IconX /> : <IconHamburger />}
</button>
```

> ⚠️ **Awas Error yang Sering Terjadi!**
> ```jsx
> // ❌ SALAH — fungsi langsung dipanggil saat render, bukan saat diklik
> <button onClick={handleClick()}>Klik</button>
>
> // ✅ BENAR — cukup berikan referensi fungsinya
> <button onClick={handleClick}>Klik</button>
>
> // ✅ BENAR juga — kalau perlu mengirim parameter, bungkus dengan arrow function
> <button onClick={() => handleClick(id)}>Klik</button>
> ```
> Kalau kamu menulis `onClick={handleClick()}`, fungsi itu akan langsung jalan setiap kali component di-*render*, bukan saat tombolnya diklik.

## Menangani Forms (Controlled Components)

Di React, kita sering menghubungkan *input form* dengan `useState`. Ini disebut ***Controlled Components***, di mana React (lewat *state*) memegang kendali penuh atas nilai/data yang ada di dalam input — nilai input **selalu** sinkron dengan *state*, bukan disimpan sendiri oleh DOM.

Sebagai perbandingan, kalau sebuah input **tidak** diberi `value` dari state (hanya dibiarkan mengatur dirinya sendiri lewat DOM bawaan browser), itu disebut ***Uncontrolled Component***. React tetap mendukungnya (biasanya lewat `useRef`), tapi di materi ini kita fokus ke *Controlled Components* karena lebih mudah dipahami dan lebih umum dipakai untuk pemula.

```jsx
// Contoh dari ContactView.jsx
import { useState } from 'react';

function ContactView() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Pesan terkirim dari ${form.name}`);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Nama" required />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
      <textarea name="message" value={form.message} onChange={handleChange} placeholder="Pesan" required />
      <button type="submit">Kirim Pesan</button>
    </form>
  );
}
```

> 💡 **Cara kerja `handleChange`:** `[e.target.name]` adalah *computed property name* JavaScript. Karena setiap input punya atribut `name` yang berbeda (`name`, `email`, `message`), satu fungsi `handleChange` bisa dipakai untuk semua input tanpa perlu bikin fungsi terpisah untuk masing-masing field.

> 💡 **Pro-Tip:** Selalu gunakan `e.preventDefault()` di dalam fungsi `onSubmit`. Jika tidak, browsermu akan *refresh* dan semua data *state* kamu akan hilang ter-reset!

> ⚠️ **Awas Error!** Kalau kamu memberi `value={form.name}` tapi lupa menambahkan `onChange`, React akan menganggap input itu *read-only* dan memunculkan warning di console, karena user tidak bisa mengubah nilainya sama sekali.

---

# Conditional Rendering

*Conditional Rendering* adalah cara kita menampilkan *component* atau elemen yang berbeda berdasarkan kondisi tertentu (misal: menu terbuka vs tertutup, halaman aktif vs tidak aktif, form terkirim vs belum).

## 1. Menggunakan Ternary Operator (`kondisi ? true : false`)

Cara paling sering digunakan di dalam JSX, cocok untuk kondisi dengan 2 kemungkinan hasil.

```jsx
// Contoh dari Navbar.jsx — icon toggle menu mobile
{open ? (
  <path d="M6 18L18 6M6 6l12 12" />  // Icon X (tutup)
) : (
  <path d="M4 6h16M4 12h16M4 18h16" />  // Icon hamburger (buka)
)}
```

```jsx
// Contoh dari Navbar.jsx — styling link aktif
<button className={`px-4 py-2 rounded-lg transition-all duration-200 ${
  activePage === link.id
    ? 'bg-primary text-white'
    : 'text-white/70 hover:text-white hover:bg-white/10'
}`}>
  {link.label}
</button>
```

## 2. Menggunakan Logical AND (`&&`)

Sangat berguna jika kamu **hanya** ingin menampilkan sesuatu ketika kondisinya `true`, dan tidak menampilkan apa-apa jika `false`.

```jsx
// Contoh dari Navbar.jsx — menu mobile hanya muncul saat open = true
{open && (
  <div className="md:hidden bg-dark px-4 pb-4">
    {/* menu links untuk mobile */}
  </div>
)}
```

```jsx
// Contoh dari ContactView.jsx — pesan sukses setelah submit
const [submitted, setSubmitted] = useState(false);

{submitted && (
  <p className="text-green-500">
    Terima kasih! Pesan Anda berhasil dikirim.
  </p>
)}
```

> ⚠️ **Jebakan Klasik `&&`:** Hati-hati kalau kondisinya berupa angka, bukan boolean murni.
> ```jsx
> {cartItems.length && <p>Kamu punya barang di keranjang</p>}
> ```
> Kalau `cartItems.length` bernilai `0`, React akan menampilkan tulisan **"0"** di layar (karena `0` dianggap valid untuk dirender), bukan menyembunyikan elemennya! Perbaikannya, ubah jadi boolean eksplisit:
> ```jsx
> {cartItems.length > 0 && <p>Kamu punya barang di keranjang</p>}
> ```

## 3. Menggunakan If/Else Sebelum `return`

Kalau logikanya cukup kompleks atau ingin me-*return* component yang benar-benar berbeda (bukan cuma sebagian elemen), lebih rapi menulis if/else di atas `return`, bukan di dalam JSX.

```jsx
function StatusPesanan({ status }) {
  if (status === 'loading') {
    return <p>Memuat data pesanan...</p>;
  }

  if (status === 'error') {
    return <p className="text-red-500">Gagal memuat data.</p>;
  }

  return <p>Pesanan berhasil ditemukan!</p>;
}
```

## 4. Switch Statement untuk Routing

```jsx
// Contoh dari App.jsx — routing manual
function renderView() {
  switch (activePage) {
    case 'about':
      return <AboutView />;
    case 'contact':
      return <ContactView />;
    default:
      return <HomeView onNavigate={setActivePage} />;
  }
}
```

---

# List Rendering

Punya banyak data dalam bentuk *Array* dan ingin menampilkannya satu per satu? Kita tidak perlu menulis kode berulang kali. Di React, kita menggunakan fungsi `map()` dari JavaScript untuk mengubah setiap item array menjadi elemen JSX.

```jsx
// Contoh dari HomeView.jsx — menampilkan daftar layanan
import { services } from '../data/mockData';

function HomeView() {
  return (
    <section>
      <h2>Layanan Kami</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => (
          <FeatureCard
            key={service.id}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
    </section>
  );
}
```

```jsx
// Contoh dari AboutView.jsx — menampilkan daftar misi
{companyInfo.mission.map((item, index) => (
  <li key={index} className="flex items-start gap-3">
    <span className="text-secondary mt-1">✦</span>
    {item}
  </li>
))}
```

```jsx
// Contoh dari AboutView.jsx — menampilkan tim
{team.map((member) => (
  <ProfileCard
    key={member.id}
    name={member.name}
    role={member.role}
    photo={member.photo}
  />
))}
```

> ⚠️ **Awas Error!:** Selalu berikan atribut `key` yang unik saat menggunakan `.map()`. `key` membantu React mengenali item mana yang berubah, ditambah, atau dihapus. Gunakan `id` jika ada, jangan pakai `index` kalau data bisa berubah urutannya (ditambah, dihapus, atau di-*sort* ulang) — karena bisa membuat React salah mencocokkan elemen lama dengan yang baru, dan menyebabkan bug tampilan/state yang aneh (misalnya input di posisi yang salah menyimpan data milik item lain).

> 💡 **Tips tambahan:** Kamu juga bisa menggabungkan `map()` dengan `filter()` untuk menampilkan sebagian data saja, misalnya `services.filter(s => s.active).map(...)`.

---

# Siklus Hidup Komponen

Sebelum masuk ke `useEffect`, penting untuk paham dulu bahwa setiap component React punya "siklus hidup" (*lifecycle*) — sama seperti makhluk hidup: **lahir → tumbuh/berubah → mati**.

1. **Mount (lahir)** — component pertama kali dibuat dan ditampilkan ke layar (DOM).
2. **Update (berubah)** — component dirender ulang karena *state* atau *props*-nya berubah.
3. **Unmount (mati)** — component dihapus/dilepas dari layar (misalnya karena user pindah halaman, atau elemen disembunyikan lewat *conditional rendering*).

*Analogi:* Bayangkan component itu seperti kamu menyalakan lampu (mount), mengganti warna lampunya berkali-kali (update), lalu akhirnya mematikan lampunya (unmount).

Di masa lalu (React versi lama / class component), ketiga fase ini punya nama method masing-masing (`componentDidMount`, `componentDidUpdate`, `componentWillUnmount`). Sekarang dengan **function component**, ketiganya bisa kita atur cukup dengan satu hook saja: `useEffect`.

---

# Effect Hook (useEffect)

`useEffect` memungkinkan kita menjalankan efek samping (*side effects*) di dalam *component* — yaitu hal-hal yang "keluar" dari proses render biasa. Contoh efek samping: mengubah judul tab browser, scroll otomatis ke atas, mengambil data dari API, memasang *timer*, atau berlangganan (*subscribe*) ke event tertentu.

*Analogi: `useEffect` itu seperti instruksi tambahan yang kamu berikan ke component. "Hei component, kalau kamu sudah selesai nampil di layar, tolong ubah judul tab browser-nya ya."*

## Cara Menggunakan useEffect

```jsx
// Contoh dari hooks/useDocumentTitle.js
import { useEffect } from 'react';

export function useDocumentTitle(pageName) {
  useEffect(() => {
    document.title = pageName ? `OXIGEN | ${pageName}` : 'OXIGEN';
    window.scrollTo(0, 0);  // Scroll ke atas setiap ganti halaman
  }, [pageName]);  // Hanya jalan saat pageName berubah
}
```

```jsx
// Cara pakai di App.jsx
import { useDocumentTitle } from './hooks/useDocumentTitle';

function App() {
  const [activePage, setActivePage] = useState('home');
  useDocumentTitle(activePage);  // Panggil custom hook

  // ... sisanya
}
```

## Aturan Dependency Array (`[]`)

Array di akhir `useEffect` sangat penting untuk menentukan **kapan** efek tersebut dijalankan:

1. `useEffect(() => {...})` ➡️ **Tanpa array sama sekali.** Dijalankan **setiap kali** component selesai render (mount maupun update). Jarang dipakai karena bisa boros performa.
2. `useEffect(() => {...}, [])` ➡️ **Array kosong.** Hanya dijalankan **SATU KALI**, tepat setelah component pertama kali muncul di layar (fase *mount*).
3. `useEffect(() => {...}, [data])` ➡️ Dijalankan saat mount, lalu dijalankan ulang **HANYA JIKA** nilai `data` berubah dari render sebelumnya (fase *update*, tapi hanya untuk dependency yang disebutkan).

## Cleanup Function (Fase Unmount)

Ini bagian yang sering terlewat: `useEffect` bisa me-*return* sebuah fungsi, yang disebut ***cleanup function***. Fungsi ini otomatis dijalankan React tepat sebelum efek dijalankan ulang, atau saat component benar-benar di-*unmount* (dihapus dari layar).

Cleanup ini penting supaya kita tidak meninggalkan "sampah" seperti *timer* yang masih jalan, *event listener* yang masih terpasang, atau koneksi API yang belum ditutup — padahal component-nya sudah tidak ada.

```jsx
import { useEffect, useState } from 'react';

function JamDigital() {
  const [waktu, setWaktu] = useState(new Date());

  useEffect(() => {
    // Efek: menyalakan interval setiap 1 detik
    const interval = setInterval(() => {
      setWaktu(new Date());
    }, 1000);

    // Cleanup: mematikan interval saat component unmount
    // atau sebelum efek ini dijalankan ulang
    return () => clearInterval(interval);
  }, []); // array kosong -> interval hanya dipasang sekali saat mount

  return <p>Waktu sekarang: {waktu.toLocaleTimeString()}</p>;
}
```

> 💡 **Kapan cleanup function wajib dipakai?** Setiap kali efekmu memasang sesuatu yang "hidup terus" di luar React, seperti `setInterval`/`setTimeout`, `addEventListener`, atau subscription ke WebSocket/API. Kalau tidak dibersihkan, efek itu bisa tetap jalan di *background* walaupun component-nya sudah tidak ditampilkan lagi — ini disebut ***memory leak***.

---

# Latihan

## Latihan 1: Tombol Navigasi (Event Handling + Conditional Rendering)

Buat komponen navigasi sederhana seperti `Navbar.jsx`. Ada sebuah state `activePage` dan tombol-tombol navigasi. Saat tombol diklik, halaman aktif berubah dan tombol yang aktif mendapat gaya berbeda.

```jsx
// File: NavigasiSederhana.jsx
import { useState } from 'react';

function NavigasiSederhana() {
  const [activePage, setActivePage] = useState('beranda');
  const menu = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'tentang', label: 'Tentang' },
    { id: 'kontak', label: 'Kontak' },
  ];

  return (
    <nav>
      <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none' }}>
        {/* TODO: map menu dan tampilkan tombol untuk setiap item.
            Jika activePage === item.id, beri gaya background biru dan teks putih.
            Jika tidak, beri gaya teks abu-abu.
            Jangan lupa beri key unik untuk setiap tombol! */}
      </ul>
      <div>
        {/* TODO: Tampilkan konten berdasarkan activePage.
            Jika 'beranda' → "Selamat datang di Beranda"
            Jika 'tentang' → "Tentang Kami"
            Jika 'kontak' → "Hubungi Kami" */}
      </div>
    </nav>
  );
}
export default NavigasiSederhana;
```

🌟 **Reward Selesai:** Gelar **Navigation Master** 🥉

---

## Latihan 2: Form Pendaftaran (Event & Forms)

Buat form pendaftaran seperti `ContactView.jsx` dengan field: nama, email, dan pesan.

```jsx
// File: FormDaftar.jsx
import { useState } from 'react';

function FormDaftar() {
  // TODO: Buat state form dengan field { nama, email, pesan }
  // TODO: Buat state submitted dengan default false

  // TODO: Buat fungsi handleChange untuk update form
  // TODO: Buat fungsi handleSubmit dengan e.preventDefault,
  //       set submitted ke true, reset form,
  //       dan setTimeout untuk reset submitted setelah 3 detik

  return (
    <form>
      {/* TODO: Tampilkan pesan sukses jika submitted true */}
      {/* TODO: Buat input nama (controlled), email, dan textarea pesan */}
      {/* TODO: Buat tombol submit */}
    </form>
  );
}
export default FormDaftar;
```

🌟 **Reward Selesai:** Gelar **Form Handler** 🥈

---

## Latihan 3: Daftar Layanan (List Rendering)

Buat komponen yang menampilkan daftar layanan seperti di `HomeView.jsx`.

```jsx
// File: DaftarLayanan.jsx
function DaftarLayanan() {
  const layanan = [
    { id: 1, judul: 'Kursus Bahasa', deskripsi: 'Belajar bahasa Inggris, Mandarin, dan Korea' },
    { id: 2, judul: 'Cultural Exchange', deskripsi: 'Program pertukaran budaya internasional' },
    { id: 3, judul: 'Debat & Diskusi', deskripsi: 'Forum diskusi bahasa Inggris mingguan' },
  ];

  return (
    <section>
      <h2>Layanan Kami</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        {/* TODO: Map array layanan dan tampilkan setiap item.
            Jangan lupa key menggunakan id.
            Format: judul sebagai heading, deskripsi sebagai paragraf */}
      </div>
    </section>
  );
}
export default DaftarLayanan;
```

🌟 **Reward Selesai:** Gelar **List Mapper** 🥉

---

## Latihan 4: Custom Hook Document Title (useEffect)

Buat custom hook untuk mengubah judul halaman secara otomatis, seperti `useDocumentTitle.js`.

```jsx
// File: usePageTitle.js
import { useEffect } from 'react';

export function usePageTitle(title) {
  // TODO: Gunakan useEffect untuk mengubah document.title
  //       Format: "OXIGEN | {title}"
  //       Dependency array: [title]
}

// Cara pakai di komponen:
// usePageTitle('Beranda');
```

🌟 **Reward Selesai:** Gelar **Effect Wizard** 🥈

---

## Latihan 5: Timer Sederhana (Cleanup Function)

Buat komponen *stopwatch* sederhana yang menghitung detik berjalan, untuk melatih pemahaman *cleanup function* pada `useEffect`.

```jsx
// File: Stopwatch.jsx
import { useState, useEffect } from 'react';

function Stopwatch() {
  const [detik, setDetik] = useState(0);
  const [aktif, setAktif] = useState(false);

  // TODO: Gunakan useEffect yang bergantung pada `aktif`.
  //       Jika aktif === true, pasang setInterval yang menambah `detik` tiap 1000ms.
  //       Jangan lupa return cleanup function yang memanggil clearInterval!

  return (
    <div>
      <p>Waktu: {detik} detik</p>
      {/* TODO: Tombol untuk toggle `aktif` (Mulai / Berhenti) */}
      {/* TODO: Tombol reset yang mengembalikan detik ke 0 */}
    </div>
  );
}
export default Stopwatch;
```

🌟 **Reward Selesai:** Gelar **Lifecycle Guardian** 🥇

---

# 📚 Referensi

* [React Docs: Responding to Events](https://react.dev/learn/responding-to-events)
* [React Docs: Conditional Rendering](https://react.dev/learn/conditional-rendering)
* [React Docs: Rendering Lists](https://react.dev/learn/rendering-lists)
* [React Docs: Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)
* [React Docs: Lifecycle of Reactive Effects](https://react.dev/learn/lifecycle-of-reactive-effects)

---

**Selamat Berlatih!**

Jangan takut *error*, karena *error* adalah cara React mengajakmu berbicara. Jika mentok, lihat kembali kode project OXIGEN sebagai referensi, istirahat sejenak, minum air, dan mari diskusikan kembali!