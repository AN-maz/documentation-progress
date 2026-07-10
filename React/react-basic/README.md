# React-Sh roadMap


Materimu sebenarnya sudah bagus, tapi bisa dirapikan jadi lebih enak dibaca dan lebih mirip modul belajar. Aku coba susun ulang dengan bahasa yang santai tapi tetap profesional.

# React Dasar: JSX, Props, State, Conditional Rendering, dan Composition

React akan terasa jauh lebih mudah dipahami kalau langsung praktik sambil belajar konsep dasarnya. Ada 4 konsep yang hampir selalu dipakai saat membuat aplikasi React:

* JSX
* Props
* State
* Conditional Rendering
* Composition

---

# 1. JSX (JavaScript XML)

JSX adalah sintaks yang memungkinkan kita menulis kode yang mirip HTML langsung di dalam JavaScript.

Contoh:

```jsx
function App() {
  return <h1>Hello React!</h1>;
}
```

React nantinya akan mengubah JSX ini menjadi kode JavaScript biasa yang bisa dipahami browser.

## Aturan Penting JSX

### 1. Harus punya satu parent element

❌ Salah

```jsx
return (
  <h1>Judul</h1>
  <p>Deskripsi</p>
);
```

✅ Benar

```jsx
return (
  <div>
    <h1>Judul</h1>
    <p>Deskripsi</p>
  </div>
);
```

Atau menggunakan Fragment:

```jsx
return (
  <>
    <h1>Judul</h1>
    <p>Deskripsi</p>
  </>
);
```

---

### 2. Atribut HTML berbeda

Karena JSX ditulis di dalam JavaScript, beberapa atribut HTML berubah.

| HTML    | JSX       |
| ------- | --------- |
| class   | className |
| onclick | onClick   |
| for     | htmlFor   |

Contoh:

```jsx
<button className="btn">
  Klik Saya
</button>
```

---

### 3. Bisa menyisipkan JavaScript

Gunakan `{}` untuk menampilkan variabel atau ekspresi JavaScript.

```jsx
const nama = "Ahmad";

return <h1>Halo {nama}</h1>;
```

Hasil:

```text
Halo Ahmad
```

---

# 2. Props (Properties)

Props digunakan untuk mengirim data dari Parent Component ke Child Component.

Anggap saja seperti parameter pada function.

## Contoh

### Parent

```jsx
<UserCard nama="Ahmad" />
```

### Child

```jsx
function UserCard(props) {
  return <h1>{props.nama}</h1>;
}
```

Hasil:

```text
Ahmad
```

---

## Menggunakan Destructuring

Lebih sering digunakan karena lebih ringkas.

```jsx
function UserCard({ nama }) {
  return <h1>{nama}</h1>;
}
```

---

## Karakteristik Props

✅ Dikirim dari parent ke child

✅ Bisa berupa string, number, array, object, function

❌ Tidak boleh diubah oleh child component

---

# 3. State

State adalah data internal yang dimiliki dan dikelola oleh sebuah component.

Kalau state berubah, React akan otomatis me-render ulang tampilan.

State dibuat menggunakan hook `useState`.

## Contoh

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>{count}</h1>

      <button onClick={() => setCount(count + 1)}>
        Tambah
      </button>
    </>
  );
}
```

---

## Cara Kerja

Awalnya:

```js
count = 0
```

Klik tombol:

```js
setCount(1)
```

Klik lagi:

```js
setCount(2)
```

Dan seterusnya.

---

# Props vs State

| Props                           | State                       |
| ------------------------------- | --------------------------- |
| Data dari parent                | Data milik component        |
| Read Only                       | Bisa diubah                 |
| Dikirim ke child                | Dikelola sendiri            |
| Tidak memicu perubahan langsung | Saat berubah akan re-render |

---

# 4. Conditional Rendering

Conditional Rendering adalah teknik menampilkan UI berdasarkan kondisi tertentu.

Mirip seperti `if else` di JavaScript.

---

## Menggunakan Ternary Operator

Cocok kalau ada dua kemungkinan.

```jsx
{
  isLogin
    ? <Dashboard />
    : <Login />
}
```

Artinya:

```js
if (isLogin) {
  tampilkan Dashboard;
} else {
  tampilkan Login;
}
```

---

## Menggunakan Logical AND (&&)

Cocok kalau hanya ingin menampilkan sesuatu saat kondisi true.

```jsx
{
  hasError &&
  <p>Error terjadi</p>
}
```

Jika:

```js
hasError = true
```

Maka:

```html
<p>Error terjadi</p>
```

akan muncul.

---

# 5. Composition

React mendorong kita membuat komponen kecil yang bisa digabungkan menjadi UI yang lebih besar.

Daripada membuat satu komponen raksasa:

```jsx
Dashboard
```

Lebih baik dipecah:

```jsx
Navbar
Sidebar
ProfileCard
Footer
```

Lalu digabungkan.

---

## Props Children

Composition biasanya menggunakan props khusus bernama `children`.

### Card.jsx

```jsx
function Card({ children }) {
  return (
    <div className="border p-4 rounded">
      {children}
    </div>
  );
}
```

### Penggunaan

```jsx
<Card>
  <h1>Belajar React</h1>
  <p>Materi dasar React</p>
</Card>
```

Hasil:

```html
<div class="border p-4 rounded">
  <h1>Belajar React</h1>
  <p>Materi dasar React</p>
</div>
```

---