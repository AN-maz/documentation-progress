# catatan

`npm init -y` buat file `package.json` secara otomatis dengan konfigurasi default

## Apa itu `Package.json`?

Identitas dan konfigurasi project Node.js.

Di dalamnya terdapat:

- Nama project
- Versi project
- Dependency yang digunakan
- Script yang bisa dijalankan
- Informasi author dan lisensi

## Apa itu `Dependency`

library atau paket yang dibutuhkan oleh aplikasi agar bisa menjalankan fitur tertentu.

Sederhananya:

> kode buatan orang lain yang kita gunakan dalam project

## Kenapa Disebut `Dependency`?

Karena project kamu bergantung pada paket tersebut.
Misalnya:

```js
const express = require("express");
```
Kalau Express tidak terinstall:

```
Error: Cannot find module 'express'
```

---
# Start project 

- `src/app.js`

```js
const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

module.exports = app;
```

- `index.js`
```js
const app = require("./src/app");

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

```

jalankan di terminal `node index.js`

## Apa itu `nodemon?`
tool yang memantau perubahan file.

Ketika kamu menyimpan perubahan pada file .js, Nodemon akan:
1. Menghentikan server lama 
2. Menjalankan ulang server secara otomatis 

Tidak perlu: 
CTRL + C 
index.js

## Install nodemoon

```bash
npm install --save-dev nodemon
```

kemudian di `package.json` tambahkan:

```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  }
}
```

## Apa itu `.env`?
File yang digunakan untuk menyimpan `enviroment variables`

## Kenapa ga ditulis aja di kode?


---

