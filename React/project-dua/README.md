# Product Requirements Document (PRD)

**Project Name:** React Organization/Company Profile (SPA)
**Version:** 2.1 (Learning Edition)
**Difficulty:** Beginner - Intermediate
**Tech Stack:** React (Vite), Tailwind CSS

## 1. Project Overview

### Latar Belakang

Project ini bertujuan untuk memperkuat pemahaman fundamental React dengan membangun sebuah *website* profil menggunakan konsep *Single Page Application* (SPA) murni, tanpa *library* eksternal seperti React Router atau State Manager.

Fokus utama adalah memahami siklus *render* React, aliran data (Prop Drilling), manajemen *state* lokal dan global sederhana, serta *Component Composition*. Sangat ideal diimplementasikan sebagai *landing page* profil organisasi mahasiswa, klub bahasa, atau UKM untuk digunakan secara nyata.

### Objektif Pembelajaran

Setelah menyelesaikan project ini, *developer* mampu menguasai:

* Sintaks **JSX** dan pembuatan **Functional Components**.
* Aliran data menggunakan **Props**.
* Manajemen status komponen dengan **useState**.
* Pengkondisian tampilan (**Conditional Rendering**) dan iterasi data (**List Rendering**).
* Siklus hidup komponen dan efek samping dengan **useEffect**.
* Ekstraksi logika ke dalam **Custom Hooks**.

---

## 2. Ruang Lingkup (Scope) & Spesifikasi Halaman

Navigasi antar halaman tidak mengubah URL *browser*, melainkan memanipulasi *state* utama untuk me-*render* komponen *View* yang berbeda.

| View | Deskripsi Utama | Sumber Data |
| --- | --- | --- |
| **Home** | Beranda utama berisi Hero CTA dan layanan/program unggulan. | `mockData.js` (Services) |
| **About** | Menampilkan visi-misi, deskripsi, dan daftar pengurus/anggota. | `mockData.js` (Team) |
| **Contact** | Formulir interaktif untuk menghubungi pihak organisasi. | *Local State* (Controlled Form) |

---

## 3. Functional Requirements (FR)

### FR-01: Navigasi (Navbar)

* Memiliki menu: **Home**, **About**, dan **Contact**.
* Klik menu akan mengganti halaman secara instan tanpa *reload browser*.
* **Logo Behavior:** Mengklik logo di ujung kiri *navbar* berfungsi sebagai tombol *reset* yang selalu mengembalikan pengguna ke halaman **Home** (`setActivePage('home')`).

### FR-02: Home View

* **Hero Section:** Menampilkan judul besar organisasi, *tagline*, dan tombol *Call to Action* (CTA) yang mengarahkan ke *view* About.
* **Highlight Programs/Services:** Menampilkan minimal 3 kartu layanan atau program kerja unggulan. Data wajib di-*render* menggunakan metode `.map()` dari *array* data statis.

### FR-03: About View

* **Identitas:** Menampilkan deskripsi sejarah, Visi, dan Misi.
* **Team Roster:** Menampilkan struktur pengurus atau tim.
* Setiap kartu tim memuat Foto, Nama, dan Jabatan, yang di-*render* dinamis melalui *Props* dari data `.map()`.

### FR-04: Contact View (Form Handling)

* Menyediakan input: Nama, Email, dan Pesan (Textarea).
* **Controlled Components:** Seluruh nilai *input* wajib diikat dengan `value` dan dikendalikan melalui `onChange` menuju *local state*.
* **Form Submission:** Tombol "Kirim" memicu fungsi `onSubmit` dengan `e.preventDefault()`. Tampilkan pesan sukses sementara (misalnya menggunakan teks warna hijau) tanpa melakukan *request* API sungguhan.

---

## 4. Technical & Non-Functional Requirements

* **SPA Logic:** Dilarang menggunakan React Router, Redux, Context API, atau Axios.
* **Styling:** Menggunakan Tailwind CSS untuk *layouting* (Grid/Flexbox) dan harus *Responsive* (nyaman dibuka di *mobile*).
* **Accessibility (a11y):** Wajib menggunakan atribut `alt` pada setiap gambar dan tag semantik HTML (seperti `<nav>`, `<main>`, `<section>`, `<footer>`).
* **Clean Code:** Tidak menggunakan *Class Components*. Fungsi-fungsi pembantu (*helpers*) harus dipisahkan dari komponen visual.

---

## 5. Arsitektur & Manajemen State

### Aliran Data (Data Flow)

Navigasi dikendalikan penuh oleh komponen induk (`App.jsx`).

```text
User Klik Menu Navbar
       ↓
setActivePage('about') 
       ↓
State 'activePage' di App.jsx berubah
       ↓
React me-render ulang App.jsx
       ↓
Conditional Rendering menampilkan <AboutView />

```

### Implementasi Efek (useEffect & Custom Hook)

Project ini akan meningkatkan level standar dengan memisahkan logika `useEffect` menjadi **Custom Hook**.

1. **Dynamic Title (`useDocumentTitle.js`):** Hook ini memantau *state* navigasi dan secara otomatis mengubah judul *tab browser* (misal: "OXIGEN | About").
2. **Scroll to Top:** Setiap kali *state* navigasi berubah, halaman otomatis di-*scroll* kembali ke posisi atas (`window.scrollTo(0, 0)`).

---

## 6. Struktur Direktori Lengkap

```text
src/
├── assets/             # Logo dan gambar aset statis
├── components/
│   ├── layout/         # Komponen struktural (Navbar.jsx, Footer.jsx)
│   └── ui/             # Komponen visual (Button.jsx, FeatureCard.jsx, ProfileCard.jsx)
├── views/              # Komponen raksasa (HomeView.jsx, AboutView.jsx, ContactView.jsx)
├── data/               # Penyimpanan mock data
│   └── mockData.js     # Array of objects untuk list rendering
├── hooks/              # Custom React Hooks
│   └── useDocumentTitle.js 
├── utils/              # Fungsi helper opsional
├── App.jsx             # Induk aplikasi, pengatur state navigasi
├── index.css           # Konfigurasi Tailwind
└── main.jsx            # Entry point

```

---

## 7. Learning Objectives Mapping

Tabel ini memandu *developer* untuk memahami *alasan* mengapa suatu fitur dibangun.

| Fitur / Komponen | Konsep React yang Dilatih |
| --- | --- |
| **Navigasi SPA (App.jsx)** | `useState`, *Conditional Rendering*, *Prop Drilling* |
| **Hero CTA & Buttons** | *Props*, *Event Handling* (`onClick`) |
| **Service & Team Cards** | *List Rendering* (`.map()`), *Component Composition* |
| **Data Separation** | *ES6 Modules* (Export/Import), Pemisahan *Logic* & *View* |
| **Contact Form** | *Controlled Components*, `useState` (Object), `e.preventDefault()` |
| **Perubahan Judul Tab Browser** | `useEffect`, *Custom Hooks* (`useDocumentTitle`) |
| **Scroll to Top otomatis** | `useEffect` (Dependency Array) |

---

> **Improvement Note:** Struktur direktori di atas memisahkan logika ke dalam `hooks/` dan komponen ke dalam direktori fungsional (`layout/` vs `ui/`). Ini adalah standar struktur industri yang sangat skalabel saat *project* nanti diperbesar.