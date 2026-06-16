# Roadmap React
by react Roadmap SH

## 1. CLI tools: 
- vite

## 2. Components
- Functional COmponents
- Components Basic: [jsx, props vs state, condisional rendering, composition]

## 3. Rendering 
- components lifecycle
- lists and keys 
- render props
- refs 
- events 
- high order components

## 4. Hooks 
- Basic hooks: [useState, useEffect] [useContext, useMemo, useRef, useCallback, useReducer]
- Common hooks: [creating custom hooks, hooks best practices]

## 5. Routers
- React Router
- Tanstack Router

## 6. State Management
- Mobx
- Context 
- zustand
- jotal 


## 7. Writing CSS 
- Panda CSS
- CSS modules
- Tailwind CSS

## 8. Components/Libraries
- Material UI
- Chakra UI
- Shadcn UI 

## 9. Headless components Libraries 
- Radix UI
- React Aria
- Ark UI 

## 10. API calls
- GraphQL [Apolio, Relay, urql]
- REST [Tanstack, axios, swr, rtk-query]

## 11. Testing 
- Cypress
- playwright
- react-testing-libraries 
- vitest
- jest

## 12. Framework 
- react router 
- next.js
- astr0

## 13. Forms
- React hooks form
- formik 

## 14. Types & Validation 
- TypeScript
- Zod 

[ Advanced Topics]

## 15. Animation
- Framer Motion
- React Spring 
- GSock 

## 16. Error Boudaries
## 17. Server's API
## 18. Suspense
## 19. Portals

## 20. Mobile Applications
- React Native 

---

# Rekomendasi Project belajar 

## Fase 1: Fondasi UI & Interaksi (Roadmap 1-4, 7)
- Lakukan inisialisasi aplikasi menggunakan Vite.
- Bangun kerangka antarmuka dan komponen dasar menggunakan Tailwind CSS.
- Buat daftar modul pelajaran statis dan gunakan useState serta useEffect untuk mengontrol interaksi UI sederhana, seperti membuka dan menutup ringkasan materi.

## Fase 2: Navigasi, Form & State (Roadmap 5, 6, 13, 14)

- Implementasikan React Router untuk memfasilitasi navigasi dari halaman dasbor utama ke halaman detail materi atau profil pengguna.
- Gunakan Zustand untuk menyimpan state global yang lebih ringan (misalnya, menyimpan tema dark/light mode atau status kelulusan modul pengguna).
- Kembangkan form untuk menambahkan materi baru menggunakan kombinasi React Hook Form, Zod, dan TypeScript agar validasi input berjalan ketat.

## Fase 3: Integrasi Data & Polish (Roadmap 8-10, 11)

- Gantikan data statis (dummy) dengan pemanggilan API sungguhan menggunakan Axios atau Tanstack Query.
- Pada tahap ini, antarmuka React-mu akan sangat siap untuk dihubungkan ke layanan backend Node.js dan database MySQL yang mengeksekusi native SQL query langsung.
- Rapikan tampilan aplikasi menggunakan komponen dari Shadcn UI atau Radix UI, lalu pastikan tidak ada bug dengan menulis tes menggunakan Vitest atau React Testing Library.

## Fase 4: Optimasi Lanjutan (Roadmap 15-19)

- Tambahkan animasi transisi perpindahan halaman menggunakan Framer Motion.
- Bungkus pemanggilan API dengan komponen Suspense untuk memberikan pengalaman loading yang modern, dan gunakan Error Boundaries agar aplikasi tidak crash total jika ada kegagalan server.