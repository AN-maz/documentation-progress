# UC_VT03 - Mengajukan Eskalasi Pemasangan

| Atribut                      | Keterangan                                                                                                                                                                                                                                |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Use Case Name**            | Mengajukan Eskalasi Pemasangan                                                                                                                                                                                                            |
| **ID**                       | UC_VT03                                                                                                                                                                                                                                   |
| **Importance Level**         | High                                                                                                                                                                                                                                      |
| **Primary Actor**            | Sales                                                                                                                                                                                                                                     |
| **Secondary Actor**          | -                                                                                                                                                                                                                                         |
| **Use Case Type**            | Extension Case                                                                                                                                                                                                                            |
| **Stakeholder and Interest** | **Sales:** Ingin segera meneruskan data calon pelanggan berstatus **Hot** agar dapat segera dijadwalkan pemasangan oleh teknisi.<br>**Tim Operasional:** Ingin menerima tiket eskalasi pemasangan baru dengan data lapangan yang lengkap. |
| **Brief Description**        | Di dalam use case ini dijelaskan bagaimana sistem memicu formulir eskalasi ketika calon pelanggan teridentifikasi memiliki minat tinggi untuk berlangganan.                                                                               |
| **Trigger**                  | Kategori status pelanggan dipilih sebagai **"Hot"** pada proses pencatatan data prospek.                                                                                                                                                  |
| **Type**                     | Internal                                                                                                                                                                                                                                  |
| **Relationship**             | **Association:** Sales<br>**Include:** -<br>**Extend:** Perluasan (*Extend*) dari use case **Mencatat Data Prospek Pelanggan (UC_VT02)**.                                                                                                 |

### Normal Flow of Events

1. Sistem otomatis memunculkan form tambahan pengajuan eskalasi.
2. Sales melengkapi data pendukung:

   * Nama Lengkap
   * Nomor WhatsApp
   * Detail Alamat
3. Sales menekan tombol **"Eskalasi ke Tim Teknis"**.
4. Sistem memverifikasi kelengkapan form.
5. Sistem menggabungkan data diri dengan koordinat lokasi menjadi tiket pemasangan.
6. Sistem mengirim tiket ke Sistem Operasional dan menampilkan notifikasi berhasil.

### Alternate Flows

Tidak ada.

### Exceptional Flows

**4E.** Terdapat kolom data pendukung wajib yang dibiarkan kosong oleh Sales, sistem menampilkan pesan peringatan dan menahan proses pengiriman tiket sementara.

---