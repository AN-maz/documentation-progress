# Praktik demo kan terkait QoS 

## Soal no 3:
Berikan contoh kasus untuk mengimplementasikan QoS pada jaringan computer , silahakan buat contoh kasus sederhana nya!

## Jawaban
Contoh Kasus: Jaringan Lab / Sekretariat Mahasiswa
Sebuah sekretariat organisasi mahasiswa (misalnya UKM) memiliki koneksi internet dengan total bandwidth sebesar 20 Mbps. Terdapat dua aktivitas utama yang sering bentrok:

### 1. Pengguna A: 
Sedang melakukan Video Conference (rapat koordinasi) yang membutuhkan koneksi stabil (latensi rendah), tetapi kebutuhan bandwidth-nya sebenarnya kecil (sekitar 2 Mbps).

### 2. Pengguna B:
Sedang mengunduh file berukuran besar (misalnya ISO sistem operasi atau aset aplikasi) menggunakan Download Manager. Aktivitas ini rakus bandwidth dan bisa menyedot seluruh kapasitas 20 Mbps.

**Implementasi QoS**: Tanpa QoS, Pengguna B akan mendominasi jaringan, menyebabkan rapat Pengguna A terputus-putus (lag). Menggunakan Mikrotik, administrator dapat menerapkan metode QoS seperti **Simple Queue**.

### • Pengguna A
 Diberikan prioritas tinggi (Priority 1) dengan jaminan bandwidth (Limit At) sebesar 3 Mbps.
### • Pengguna B 
Diberikan batas maksimal kecepatan unduh (Max Limit) sebesar 15 Mbps agar tidak menyedot habis jalur internet, sehingga menyisakan ruang minimal 5 Mbps untuk lalu lintas aplikasi lain yang lebih krusial.

---

# Konfigurasi MikroTik dan Windows 10 VM di VirtualBox

## Langkah 1: Kenali Interface Dulu

Di Winbox, klik menu **Interfaces**.

Kamu akan melihat ada:

- **ether1**
- **ether2**

Penjelasannya:

- **ether1** = Bridged Adapter (jalur ke internet / router rumah)
- **ether2** = Internal Network (jalur khusus ke VM Windows 10)

---

## Langkah 2: Beri Internet ke MikroTik (ether1)

Kita akan membuat **ether1** mendapatkan IP secara otomatis dari router rumah atau Wi-Fi host.

### Cara Konfigurasi

1. Masuk ke menu **IP > DHCP Client**.
2. Klik tombol **Tambah (+)**.
3. Pada bagian **Interface**, pilih **ether1**.
4. Klik **Apply** lalu **OK**.

### Verifikasi

Tunggu hingga status berubah menjadi:

```text
bound
```

Jika berhasil, MikroTik akan mendapatkan IP otomatis (misalnya `192.168.x.x`).

### Test Koneksi

Buka **New Terminal** di Winbox lalu jalankan:

```bash
ping google.com
```

Jika mendapat reply, berarti MikroTik sudah terhubung ke internet.

---

## Langkah 3: Buat IP untuk Jalur ke VM Windows 10 (ether2)

Sekarang kita akan membuat IP statis yang akan menjadi **gateway** untuk VM Windows 10.

### Cara Konfigurasi

1. Masuk ke menu **IP > Addresses**.
2. Klik tombol **Tambah (+)**.
3. Isi:

| Parameter | Nilai |
|------------|--------|
| Address | `192.168.10.1/24` |
| Interface | `ether2` |

4. Klik **Apply** lalu **OK**.

---

## Langkah 4: Bagikan Internet ke Windows 10 (NAT Masquerade)

Tanpa konfigurasi NAT, Windows 10 hanya bisa terhubung ke MikroTik tetapi tidak dapat mengakses internet.

### Cara Konfigurasi

1. Masuk ke menu **IP > Firewall**.
2. Pilih tab **NAT**.
3. Klik tombol **Tambah (+)**.

### Tab General

| Parameter | Nilai |
|------------|--------|
| Chain | `srcnat` |
| Out. Interface | `ether1` |

### Tab Action

| Parameter | Nilai |
|------------|--------|
| Action | `masquerade` |

4. Klik **Apply** lalu **OK**.

---

## Langkah 5: Setting IP di VM Windows 10

Pindah ke VM Windows 10.

### Buka Pengaturan Network

Bisa melalui:

```text
Control Panel > Network and Internet > Network Connections
```

atau tekan:

```text
Win + R
```

lalu ketik:

```text
ncpa.cpl
```

### Konfigurasi IPv4

1. Klik kanan pada adapter **Ethernet**.
2. Pilih **Properties**.
3. Klik dua kali **Internet Protocol Version 4 (TCP/IPv4)**.
4. Pilih **Use the following IP address**.

Isi sebagai berikut:

| Parameter | Nilai |
|------------|--------|
| IP Address | `192.168.10.2` |
| Subnet Mask | `255.255.255.0` |
| Default Gateway | `192.168.10.1` |

### Konfigurasi DNS

Pilih **Use the following DNS server addresses** lalu isi:

| Parameter | Nilai |
|------------|--------|
| Preferred DNS Server | `8.8.8.8` |

Klik **OK** untuk menyimpan.

---

# Topologi Jaringan

```text
Internet
    │
    ▼
Router Rumah
    │
    ▼
ether1 (MikroTik)
    │
[MikroTik]
    │
ether2 (192.168.10.1)
    │
    ▼
Windows 10 VM
IP: 192.168.10.2
Gateway: 192.168.10.1
DNS: 8.8.8.8
```

## Hasil Akhir

Jika seluruh langkah berhasil:

- MikroTik mendapatkan internet melalui **ether1**.
- MikroTik menjadi gateway pada **192.168.10.1**.
- Windows 10 menggunakan gateway MikroTik.
- NAT Masquerade memungkinkan Windows 10 mengakses internet melalui MikroTik.
