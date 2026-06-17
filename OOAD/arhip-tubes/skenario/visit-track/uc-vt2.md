# UC_VT02 - Mencatat Data Prospek Pelanggan (Status & Keluhan)

| Atribut                      | Keterangan                                                                                                                                                                                               |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Use Case Name**            | Mencatat Data Prospek Pelanggan (Status & Keluhan)                                                                                                                                                       |
| **ID**                       | UC_VT02                                                                                                                                                                                                  |
| **Importance Level**         | High                                                                                                                                                                                                     |
| **Primary Actor**            | Sales                                                                                                                                                                                                    |
| **Secondary Actor**          | Calon Pelanggan                                                                                                                                                                                          |
| **Use Case Type**            | Main Case                                                                                                                                                                                                |
| **Stakeholder and Interest** | **Sales:** Ingin mendata status minat dan keluhan calon pelanggan ke dalam sistem.<br>**Calon Pelanggan:** Ingin keluhan dan status ketersediaan jaringannya tersampaikan kepada pihak penyedia layanan. |
| **Brief Description**        | Di dalam use case ini dijelaskan bagaimana Sales mewawancarai Calon Pelanggan dan menginputkan data status serta keluhan mereka ke dalam sistem.                                                         |
| **Trigger**                  | Sales selesai melakukan wawancara dengan calon pelanggan di lapangan.                                                                                                                                    |
| **Type**                     | External                                                                                                                                                                                                 |
| **Relationship**             | **Association:** Sales, Calon Pelanggan<br>**Include:** -<br>**Extend:** Mengajukan Eskalasi Pemasangan (UC_VT03)                                                                                        |

### Normal Flow of Events

1. Sales mewawancarai Calon Pelanggan.
2. Calon Pelanggan memberikan informasi mengenai status internet dan keluhan jaringan harian.
3. Sales membuka form pendataan prospek di aplikasi.
4. Sales memasukkan catatan keluhan dan memilih kategori status prospek (misalnya: **Warm** atau **Cold**).
5. Sistem memproses dan menyimpan data prospek reguler ke dalam database.

### Alternate Flows

**4A.** Sales memilih kategori status **"Hot"** (sangat berminat berlangganan), yang kemudian memicu alur perluasan (**Extend**) menuju **UC_VT03**.

### Exceptional Flows

**4E.** Form data prospek tidak terisi lengkap oleh Sales, sistem menolak penyimpanan dan meminta Sales melengkapi data.

---

