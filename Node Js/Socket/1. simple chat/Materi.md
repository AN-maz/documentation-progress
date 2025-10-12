🧩 Konsep Inti: Apa Itu Socket.IO?

***Gambaran Umum
Socket.IO merupakan sebuah library JavaScript yang memungkinkan terjadinya komunikasi real-time dan dua arah (bi-directional) antara client dan server melalui koneksi yang bersifat persisten.

***Analogi Konseptual

Untuk memahami perbedaannya, bayangkan dua cara komunikasi di internet berikut:

- HTTP (Model Konvensional)
Dalam model HTTP tradisional, komunikasi antara client dan server bersifat request–response.
Ibarat seseorang mengirim surat ke temannya, pengirim harus menunggu balasan terlebih dahulu sebelum menerima informasi baru. Jika terdapat pembaruan informasi, pengirim harus kembali mengirim surat untuk menanyakannya. Pola ini kurang efisien untuk komunikasi interaktif secara langsung.

- Socket.IO (Model Real-time)
Berbeda dengan HTTP, Socket.IO memungkinkan terjadinya komunikasi seperti percakapan melalui telepon.
Setelah koneksi terbentuk, baik client maupun server dapat saling mengirimkan data secara langsung tanpa harus menunggu permintaan terlebih dahulu. Hal ini menciptakan komunikasi yang bersifat real-time dan dua arah.

---

⚙️ Hubungan Socket.IO dan WebSocket

Meskipun sering disamakan, Socket.IO bukanlah WebSocket.
Socket.IO adalah library yang menggunakan WebSocket sebagai transport utama, namun memiliki kemampuan tambahan berupa mekanisme fallback.

Jika koneksi WebSocket tidak dapat digunakan (misalnya karena adanya firewall atau konfigurasi proxy yang tidak mendukung), Socket.IO akan secara otomatis beralih ke metode komunikasi lain seperti HTTP long-polling agar koneksi tetap terjaga.
Dengan demikian, keunggulan utama Socket.IO terletak pada keandalannya dalam menjaga kestabilan koneksi di berbagai kondisi jaringan.

---

🧠 Konsep Fundamental dalam Socket.IO

Seluruh proses komunikasi di Socket.IO berpusat pada konsep event-driven programming, yaitu interaksi yang didasarkan pada peristiwa (event).

1. Emitting (Memancarkan Event)
Ketika client atau server ingin mengirimkan data, mereka akan “memancarkan” sebuah event dengan nama tertentu.
Contoh:
        socket.emit('pesan_baru', 'Halo semua!');

2. Listening (Mendengarkan Event)
Pihak penerima akan “mendengarkan” event dengan nama yang sama untuk menangkap data yang dikirimkan.
Contoh:

        socket.on('pesan_baru', (data) => {
            console.log(data);
        });

---

🔑 Objek Utama pada Socket.IO
1. io (Server Object)

Objek utama pada sisi server yang digunakan untuk:

Mendeteksi dan mengatur koneksi dari berbagai client

Memancarkan event ke semua client yang terhubung

2. socket (Client Connection Object)
Objek yang merepresentasikan satu koneksi individu antara client dan server.
Setiap kali ada pengguna baru yang terhubung, Socket.IO akan membuat objek socket baru untuk menangani komunikasi dengan pengguna tersebut.