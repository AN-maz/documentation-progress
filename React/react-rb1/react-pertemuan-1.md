1r# React - Pertemuan 1: Pengenalan dan Dasar-Dasar React

## Daftar Isi
1. [Pendahuluan](#pendahuluan)
2. [Setup Environment](#setup-environment)
3. [JSX (JavaScript XML)](#jsx-javascript-xml)
4. [Components](#components)
5. [Props](#props)
6. [State dengan useState](#state-dengan-usestate)
7. [Latihan](#latihan)
8. [Tugas Mandiri](#tugas-mandiri)

---

## Pendahuluan

### Apa itu React?
React adalah library JavaScript untuk membangun user interface (UI). Dikembangkan oleh Facebook (Meta), React memungkinkan kita membuat aplikasi web yang interaktif dengan pendekatan **component-based**.

### Mengapa Belajar React?
- **Populer** - Digunakan oleh Facebook, Instagram, Netflix, Airbnb, dll
- **Component-Based** - Kode lebih terorganisir dan reusable
- **Virtual DOM** - Performa lebih cepat
- **Ekosistem Besar** - Banyak library pendukung
- **Peluang Karir** - Banyak lowongan kerja membutuhkan skill React

### Prasyarat
Sebelum belajar React, pastikan sudah memahami:
- HTML dasar
- CSS dasar
- JavaScript (variabel, function, array, object, arrow function, destructuring)

---

## Setup Environment

### 1. Install Node.js
Download dan install Node.js dari [nodejs.org](https://nodejs.org)

Verifikasi instalasi:
```bash
node --version
npm --version
```

### 2. Membuat Project React dengan Vite
```bash
npm create vite@latest nama-project -- --template react
cd nama-project
npm install
npm run dev
```

### Struktur Folder Project
```
nama-project/
├── node_modules/
├── public/
├── src/
│   ├── App.jsx        # Komponen utama
│   ├── App.css        # Style untuk App
│   ├── main.jsx       # Entry point
│   └── index.css      # Style global
├── index.html
├── package.json
└── vite.config.js
```

---

## JSX (JavaScript XML)

JSX adalah sintaks yang memungkinkan kita menulis kode mirip HTML di dalam JavaScript.

### Contoh JSX
```jsx
// Ini adalah JSX
const element = <h1>Hello, React!</h1>;

// JSX dengan ekspresi JavaScript
const name = "Budi";
const greeting = <h1>Hello, {name}!</h1>;

// JSX dengan atribut
const link = <a href="https://react.dev">Belajar React</a>;
```

### Aturan JSX
1. **Harus memiliki satu parent element**
```jsx
// SALAH
return (
  <h1>Judul</h1>
  <p>Paragraf</p>
);

// BENAR - menggunakan div atau Fragment
return (
  <div>
    <h1>Judul</h1>
    <p>Paragraf</p>
  </div>
);

// BENAR - menggunakan Fragment shorthand
return (
  <>
    <h1>Judul</h1>
    <p>Paragraf</p>
  </>
);
```

2. **Gunakan `className` bukan `class`**
```jsx
<div className="container">Konten</div>
```

3. **Self-closing tag harus ditutup**
```jsx
<img src="gambar.jpg" alt="Gambar" />
<input type="text" />
```

---

## Components

Component adalah blok bangunan utama dalam React. Setiap bagian UI adalah sebuah component.

### Functional Component
```jsx
// Cara membuat component
function Welcome() {
  return <h1>Selamat Datang!</h1>;
}

// Atau dengan arrow function
const Welcome = () => {
  return <h1>Selamat Datang!</h1>;
};

// Menggunakan component
function App() {
  return (
    <div>
      <Welcome />
      <Welcome />
      <Welcome />
    </div>
  );
}
```

### Aturan Penamaan Component
- Nama component harus diawali huruf **KAPITAL**
- Gunakan PascalCase (contoh: `UserProfile`, `ProductCard`)

---

## Props

Props (properties) adalah cara untuk mengirim data dari parent component ke child component.

### Menggunakan Props
```jsx
// Component menerima props
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// Atau dengan destructuring (lebih umum)
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// Menggunakan component dengan props
function App() {
  return (
    <div>
      <Greeting name="Budi" />
      <Greeting name="Ani" />
      <Greeting name="Citra" />
    </div>
  );
}
```

### Multiple Props
```jsx
function UserCard({ name, age, email }) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p>Umur: {age} tahun</p>
      <p>Email: {email}</p>
    </div>
  );
}

function App() {
  return (
    <UserCard
      name="Budi Santoso"
      age={25}
      email="budi@email.com"
    />
  );
}
```

### Props Children
```jsx
function Card({ children, title }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="card-body">
        {children}
      </div>
    </div>
  );
}

function App() {
  return (
    <Card title="Profil Saya">
      <p>Ini adalah konten di dalam card</p>
      <button>Klik Saya</button>
    </Card>
  );
}
```

---

## State dengan useState

State adalah data yang dapat berubah dalam component. Ketika state berubah, component akan di-render ulang.

### Menggunakan useState
```jsx
import { useState } from 'react';

function Counter() {
  // Deklarasi state
  // count = nilai state saat ini
  // setCount = function untuk mengubah state
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Nilai: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Tambah
      </button>
      <button onClick={() => setCount(count - 1)}>
        Kurang
      </button>
    </div>
  );
}
```

### Contoh State dengan Input
```jsx
import { useState } from 'react';

function FormNama() {
  const [nama, setNama] = useState('');

  return (
    <div>
      <input
        type="text"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
        placeholder="Masukkan nama"
      />
      <p>Nama kamu: {nama}</p>
    </div>
  );
}
```

### State dengan Object
```jsx
import { useState } from 'react';

function FormUser() {
  const [user, setUser] = useState({
    nama: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,        // spread operator untuk copy data lama
      [name]: value   // update field yang berubah
    });
  };

  return (
    <form>
      <input
        name="nama"
        value={user.nama}
        onChange={handleChange}
        placeholder="Nama"
      />
      <input
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <p>Nama: {user.nama}</p>
      <p>Email: {user.email}</p>
    </form>
  );
}
```

---

## Latihan

### Latihan 1: Membuat Component Sederhana
Buat component `Profile` yang menampilkan nama dan pekerjaan.

```jsx
// File: Profile.jsx
function Profile() {
  // TODO: Return JSX yang menampilkan:
  // - Nama: [nama kamu]
  // - Pekerjaan: [pekerjaan kamu]
}

export default Profile;
```

**Hasil yang diharapkan:**
```
Nama: Budi Santoso
Pekerjaan: Web Developer
```

---

### Latihan 2: Menggunakan Props
Buat component `ProductCard` yang menerima props: `name`, `price`, dan `image`.

```jsx
// File: ProductCard.jsx
function ProductCard({ name, price, image }) {
  // TODO: Return JSX yang menampilkan:
  // - Gambar produk
  // - Nama produk
  // - Harga produk (format: Rp xxx.xxx)
}

export default ProductCard;

// Penggunaan di App.jsx:
<ProductCard
  name="Laptop ASUS"
  price={12000000}
  image="https://via.placeholder.com/150"
/>
```

---

### Latihan 3: Menggunakan State
Buat aplikasi Todo List sederhana dengan fitur:
- Input untuk menambah todo
- Tombol untuk menambah todo ke list
- Menampilkan daftar todo

```jsx
// File: TodoList.jsx
import { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    // TODO: Implementasi fungsi untuk menambah todo
  };

  return (
    <div>
      <h1>Todo List</h1>
      {/* TODO: Buat input dan tombol */}
      {/* TODO: Tampilkan daftar todos */}
    </div>
  );
}

export default TodoList;
```

---

## Tugas Mandiri

### Challenge: Aplikasi Kartu Kontak

Buat aplikasi **Kartu Kontak** dengan ketentuan:

1. **Component `ContactCard`** yang menampilkan:
   - Foto (gunakan placeholder)
   - Nama
    - Nomor telepon
    - Email
    - Tombol "Hubungi" (tidak perlu berfungsi)

  2. **Component `ContactList`** yang:
    - Menyimpan array kontak dalam state
    - Menampilkan beberapa `ContactCard`
    - Memiliki form untuk menambah kontak baru

  3. **Styling** (opsional):
    - Beri style sederhana menggunakan CSS

  **Contoh Data:**
  ```javascript
  const contacts = [
    {
      id: 1,
      name: "Budi Santoso",
      phone: "081234567890",
      email: "budi@email.com",
      photo: "https://via.placeholder.com/100"
    },
    {
      id: 2,
      name: "Ani Wijaya",
      phone: "089876543210",
      email: "ani@email.com",
      photo: "https://via.placeholder.com/100"
    }
  ];
  ```

  **Kriteria Penilaian:**
  - [ ] Component terstruktur dengan baik
  - [ ] Props digunakan dengan benar
  - [ ] State berfungsi untuk menyimpan data
  - [ ] Form dapat menambah kontak baru
  - [ ] Kode bersih dan mudah dibaca

  ---

  ## Referensi

  - [Dokumentasi Resmi React](https://react.dev)
  - [Vite Documentation](https://vitejs.dev)
  - [JavaScript Modern (ES6+)](https://javascript.info)

  ---

  **Selamat Belajar!**

  Jika ada pertanyaan, jangan ragu untuk bertanya.
