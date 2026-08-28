# Analisis Implementasi Materi React — Project Dua (OXIGEN)

| No | Materi                   | Status      | Keterangan |
|----|--------------------------|-------------|------------|
| 1  | **JSX**                  | ✅ Terimplementasi | Seluruh komponen menggunakan JSX (`App.jsx`, `Navbar.jsx`, `HomeView.jsx`, dll) |
| 2  | **Components**           | ✅ Terimplementasi | 10 functional components: `App`, `Navbar`, `Footer`, `Button`, `FeatureCard`, `ProfileCard`, `HomeView`, `AboutView`, `ContactView` |
| 3  | **Props**                | ✅ Terimplementasi | `Button({ children, variant, onClick, type })`, `FeatureCard({ title, description })`, `ProfileCard({ name, role, photo })`, props drilling dari `App` ke `Navbar` dan `HomeView` |
| 4  | **useState**             | ✅ Terimplementasi | `activePage` di `App.jsx`, `open` di `Navbar.jsx`, `form` & `submitted` di `ContactView.jsx` |
| 5  | **useEffect**            | ✅ Terimplementasi | Di custom hook `useDocumentTitle` untuk update `document.title` dan `window.scrollTo` saat halaman berubah |
| 6  | **Events & Forms**       | ✅ Terimplementasi | `handleChange` & `handleSubmit` di `ContactView.jsx` (controlled form), `onClick` di `Navbar.jsx` (hamburger toggle), `onClick` di `Button.jsx` |
| 7  | **Conditional Rendering**| ✅ Terimplementasi | `switch` di `App.jsx` untuk routing, ternary `open ? X : hamburger`, `{open && (...)}` untuk mobile menu, `{submitted && (...)}` untuk success message, ternary class active page |
| 8  | **List Rendering**       | ✅ Terimplementasi | `.map()` untuk `services` di `HomeView`, `mission` & `team` di `AboutView`, `navLinks` di `Navbar` |
| 9  | **React Router**         | ❌ Belum        | Navigasi manual via `switch` + `useState('activePage')` di `App.jsx` |
| 10 | **Context API**          | ❌ Belum        | State management via props drilling saja |
| 11 | **Axios**                | ❌ Belum        | Data dari `mockData.js` langsung; form simulasi via `setTimeout` |
| 12 | **CRUD React**           | ❌ Belum        | Project read-only (profile/landing page) |
| 13 | **Authentication**       | ❌ Belum        | Tidak ada login, register, protected routes, atau JWT |

## Catatan

- **Custom Hooks**: ✅ Terimplementasi — `useDocumentTitle.js` mengekstrak logika `useEffect` ke hook reusable
- **Routing**: Menggunakan state-based routing manual (bukan React Router), sesuai PRD
- **HTTP Client**: Tidak menggunakan Axios sesuai PRD, data dari mock internal
- **State Management**: Hanya `useState` + props drilling, belum menggunakan Context API
