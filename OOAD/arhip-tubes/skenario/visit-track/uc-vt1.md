# UC_VT01 - Mencatat Koordinat Lokasi Kunjungan

| Atribut                      | Keterangan                                                                                                                                                                      |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Use Case Name**            | Mencatat Koordinat Lokasi Kunjungan                                                                                                                                             |
| **ID**                       | UC_VT01                                                                                                                                                                         |
| **Importance Level**         | High                                                                                                                                                                            |
| **Primary Actor**            | Sales                                                                                                                                                                           |
| **Secondary Actor**          | -                                                                                                                                                                               |
| **Use Case Type**            | Main Case                                                                                                                                                                       |
| **Stakeholder and Interest** | **Sales:** Ingin mencatat lokasi kunjungannya sebagai bukti kerja lapangan dengan akurat.<br>**Manajemen:** Ingin melacak aktivitas dan keabsahan titik lokasi kunjungan sales. |
| **Brief Description**        | Di dalam use case ini dijelaskan bagaimana Sales merekam titik koordinat GPS lokasi kunjungan calon pelanggan menggunakan aplikasi VisitTrack.                                  |
| **Trigger**                  | Sales tiba di lokasi calon pelanggan.                                                                                                                                           |
| **Type**                     | External                                                                                                                                                                        |
| **Relationship**             | **Association:** Sales<br>**Include:** -<br>**Extend:** -                                                                                                                       |

### Normal Flow of Events

1. Sales membuka aplikasi VisitTrack dan memilih menu **"Catat Kunjungan"**.
2. Sistem mendeteksi lokasi GPS Sales saat ini.
3. Sistem menampilkan titik koordinat dan alamat pada peta.
4. Sales menekan tombol **Simpan Koordinat**.
5. Sistem menyimpan data koordinat kunjungan ke dalam database.

### Alternate Flows

**2A.** Sistem tidak dapat mendeteksi lokasi secara otomatis.

**2B.** Sales menentukan titik lokasi secara manual pada peta.

### Exceptional Flows

**2E.** Koneksi internet atau sensor GPS pada perangkat Sales dalam keadaan mati/tidak aktif, sistem menampilkan pesan error.

---

