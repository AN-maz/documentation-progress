# 📖 Panduan Lengkap — UTS AI Kasus 9: Pilihan Moda Transportasi

Dokumen ini menjelaskan **seluruh project dari nol**: apa masalahnya, kenapa
kode ditulis begitu, dan arti tiap fungsi/import/variabel di dalamnya.
Ditujukan untuk yang baru kenal Python dan machine learning.

---

## 1. Masalah yang Diselesaikan

**Data:** Survei perjalanan non-bisnis antara Sydney–Canberra–Melbourne tahun 1987.
Setiap responden memilih **satu** dari empat moda transportasi:

| Kode | Arti |
|---|---|
| 1 | Pesawat |
| 2 | Mobil |
| 3 | Bus |
| 4 | Kereta |

Kita ingin membangun model yang bisa **memprediksi moda mana yang dipilih seseorang**
berdasarkan karakteristik perjalanan (waktu tempuh, biaya) dan karakteristik
responden (pendapatan, jumlah rombongan).

### Kenapa datanya "susah"? Format Panjang (Long Format)

File `dataset/kasus09_mode_choice.csv` punya **840 baris**, tapi hanya
**210 orang**. Kenapa? Karena **tiap orang mendapat 4 baris** — satu baris
untuk tiap alternatif moda:

```
individu | mode | choice | ttme | invc | invt | gc  | hinc | psize
---------|------|--------|------|------|------|-----|------|-----
1        | 1    | 0      | 69   | 59   | 100  | 70  | 35   | 1     ← baris alternatif pesawat
1        | 2    | 0      | 34   | 31   | 372  | 71  | 35   | 1     ← baris alternatif mobil
1        | 3    | 0      | 35   | 25   | 417  | 70  | 35   | 1     ← baris alternatif bus
1        | 4    | 1      | 0    | 10   | 180  | 30  | 35   | 1     ← baris alternatif kereta ✔
```

Kolom `choice = 1` menandai **moda yang benar-benar dipilih** orang nomor 1:
dia memilih kereta (mode 4). Kolom `mode` di keempat baris orang nomor 1
**semuanya sama (4)** — jadi `mode` itu sebenarnya "target" sang individu,
bukan karakteristik tiap baris.

**Masalah utama:** model klasifikasi scikit-learn butuh **satu baris = satu sampel**
dengan satu label. Kalau kita langsung pakai 840 baris:
1. Labelnya ambigu — mana yang "target"? (jawaban: hanya baris `choice=1`)
2. Data bocor (leakage) — tiap orang muncul 4×, bisa jadi barisnya
   ada di train **dan** test sekaligus, bikin hasil evaluasi palsu.

**Solusi:** transformasi **long → wide** (pivot). Hasilnya **210 baris**,
satu baris per orang, dengan kolom seperti `ttme_1`, `ttme_2`, ... `gc_4`.

---

## 2. Arsitektur Project

```
uts-ai-lab/
├── dataset/kasus09_mode_choice.csv   ← data mentah (840 baris, long format)
├── fitur.py      ← Tahap 1: baca data, audit, ubah long→wide, buat fitur turunan, split
├── latih.py      ← Tahap 2-5: banding model (CV), evaluasi test, simpan model
├── app.py        ← Tahap 6: aplikasi Streamlit untuk prediksi + tampil metrik
├── models/
│   ├── best_pipeline.joblib   ← model siap pakai
│   ├── metadata.joblib        ← metadata untuk app (urutan kolom, label, metrik)
│   └── metadata.json          ← metadata versi JSON (mudah dibaca manusia)
├── requirements.txt   ← daftar library yang dibutuhkan
└── README.md, Laporan.md
```

**Alur datanya:**

```
CSV mentah (840 baris long)
      │
      ▼
  fitur.py  ──► 210 baris wide + 30 fitur + target
      │
      ▼
  latih.py  ──► split 168 train / 42 test
      │            └─► CV pilih model ──► eval test sekali ──► simpan models/*.joblib
      ▼
  app.py    ──► user isi form ──► konversi ke fitur ──► prediksi + probabilitas
```

---

## 3. Penjelasan `fitur.py` — Persiapan Data

### 3.1 Import (pustaka yang dipakai)

```python
from __future__ import annotations
```
**Artinya:** mengaktifkan penulisan tipe data versi modern, misal
`str | Path` (artinya "string ATAU Path"). Tanpa baris ini, Python versi lama
akan error membaca `str | Path`. Ini **hanya sintaks tipe**, tidak mengubah
cara program berjalan.

```python
from pathlib import Path
```
**Artinya:** modul untuk menangani **path file** dengan cara yang aman lintas
operasi sistem. Contoh: `Path(__file__).parent` = "folder tempat file ini
berada". Ini dipakai supaya **tidak ada path absolut** di kode (aturan soal UTS) —
kode tetap jalan walau folder dipindah atau di-clone orang lain.

```python
import numpy as np
```
**Artinya:** pustaka **numpy** — mesin hitung angka/matriks di Python,
dipakai ML untuk operasi vektor. Di sini dipakai untuk `np.nan` (penanda
"nilai kosong").

```python
import pandas as pd
```
**Artinya:** pustaka **pandas** — mesin tabel data (DataFrame). Ini tulang
punggung semua manipulasi data: baca CSV, filter baris, pivot, groupby, dll.

### 3.2 Variabel konstanta (penamaan huruf besar = "jangan diubah")

```python
PER_MODE_ATTRS = ["ttme", "invc", "invt", "gc"]  # nilainya beda tiap moda
PER_PERSON_ATTRS = ["hinc", "psize"]              # sama untuk tiap individu
TARGET = "target_mode"
```

- `PER_MODE_ATTRS` — kolom yang **nilainya beda tiap alternatif moda**, jadi
  harus dipivot jadi kolom terpisah per kode (`ttme_1`, `ttme_2`, ...).
- `PER_PERSON_ATTRS` — kolom yang **sama untuk keempat baris seorang**
  (pendapatan `hinc` dan ukuran rombongan `psize` tidak berubah antar moda),
  jadi cukup disimpan sekali.
- `TARGET` — nama kolom target hasil transformasi (yang diprediksi model).

### 3.3 Fungsi `load_raw(path)`

```python
def load_raw(path: str | Path) -> pd.DataFrame:
```
- **`def`** = awal definisi fungsi. Nama fungsi: `load_raw`.
- **`(path: str | Path)`** = parameter `path` bertipe string atau Path.
  Tipe di sini **hanya dokumentasi**, Python tidak memeriksanya saat jalan.
- **`-> pd.DataFrame`** = fungsi ini mengembalikan (return) sebuah DataFrame.

**Isinya:** baca CSV lalu **cek apakah semua kolom yang dibutuhkan ada**.
Kalau ada yang hilang, langsung `raise ValueError` ("gagal cepat" /
*fail fast*) — lebih baik error di awal daripada hasil aneh di akhir.

```python
expected = ["individual", "mode", "choice", *PER_MODE_ATTRS, *PER_PERSON_ATTRS]
```
Tanda **`*`** di depan list = "sebarkan isi list ini ke dalam list luar".
Jadi hasilnya: `["individual", "mode", "choice", "ttme", "invc", "invt", "gc", "hinc", "psize"]`.

```python
missing = [c for c in expected if c not in df.columns]
```
Ini **list comprehension** (cara singkat bikin list): "ambil semua `c` dari
`expected` yang TIDAK ada di kolom DataFrame". Kalau `missing` tidak kosong → error.

### 3.4 Fungsi `audit(df)`

```python
def audit(df: pd.DataFrame) -> dict:
```
Mengembalikan **dict** (kamus) berisi laporan kesehatan data:

| Kunci | Arti |
|---|---|
| `jumlah_baris` | `len(df)` = 840 |
| `jumlah_individu` | `df["individual"].nunique()` = jumlah nilai unik = 210 |
| `duplikat` | `df.duplicated().sum()` = jumlah baris identik = 0 |
| `missing` | `df.isna().sum()` = jumlah nilai kosong per kolom = {} (tidak ada) |
| `total_choice_1` | jumlah `choice==1` = 210 (harus = jumlah individu) |
| `individu_tanpa_tepat_1_pilihan` | orang yang jumlah pilihannya ≠ 1 = 0 |
| `distribusi_target` | sebaran kelas: {1: 58, 2: 63, 3: 30, 4: 59} |

**Penting:** `df.groupby("individual")["choice"].sum()` = kelompokkan baris per
orang lalu jumlahkan `choice`-nya. Harus selalu **1** per orang (tiap orang
tepat memilih satu moda). Kalau tidak 1 → data bermasalah.

**Kenapa kelas tidak seimbang?** Moda 3 (bus) cuma 30 sampel, moda 2 (mobil) 63.
Ketidakseimbangan ini **alasan utama kenapa kita pakai F1-macro, bukan accuracy**.

### 3.5 Fungsi `long_to_wide(df)` — inti transformasi

```python
def long_to_wide(df) -> tuple[pd.DataFrame, list[str]]:
```
`tuple[...]` artinya fungsi mengembalikan **dua nilai sekaligus**: DataFrame + list string.

**Langkah demi langkah:**

**(a) Ambil target** — hanya dari baris `choice==1`:
```python
target = (df.loc[df["choice"] == 1, ["individual", "mode"]]   # filter baris terpilih
          .set_index("individual")                              # jadikan individual sebagai indeks
          ["mode"]                                              # ambil kolom mode
          .astype(int)                                          # ubah 1.0 → 1
          .rename(TARGET))                                      # ganti nama jadi "target_mode"
```
- `df.loc[...]` = akses baris berdasarkan **kondisi** (boolean indexing).
- `set_index` = jadikan kolom sebagai indeks baris (pengganti nomor baris).
- `astype(int)` = ubah tipe float ke integer.

**(b) Validasi** — pastikan jumlah target == jumlah individu (210), kalau tidak
berarti ada orang tanpa pilihan atau lebih dari satu pilihan → error.

**(c) Pivot atribut per moda:**
```python
wide = df.pivot(index="individual", columns="mode", values=PER_MODE_ATTRS)
wide.columns = [f"{attr}_{int(mode)}" for attr, mode in wide.columns]
```
`pivot` adalah operasi **long → wide**:
- `index` = jadi baris (individual),
- `columns` = jadi kolom (mode),
- `values` = isinya (ttme, invc, invt, gc).

Hasilnya kolom berlapis `(ttme, 1.0), (ttme, 2.0), ...` lalu digabung jadi nama
datar `ttme_1, ttme_2, ttme_3, ttme_4, invc_1, ... gc_4` → **16 kolom**.

**F-string** `f"{attr}_{int(mode)"` = sisipkan nilai variabel ke dalam string
(hasil: `ttme_1`).

**(d) Gabung atribut per orang + target:**
```python
per_person = df.groupby("individual")[PER_PERSON_ATTRS].first().reset_index()
wide = wide.merge(per_person, on="individual").set_index("individual")
wide = wide.join(target)
```
- `groupby(...).first()` = ambil **baris pertama** tiap kelompok (karena
  `hinc`/`psize` identik di 4 baris, ambil satu saja cukup).
- `.merge(..., on="individual")` = **gabung dua tabel** berdasarkan kolom kunci.
- `.join(target)` = gabung kolom target ke tabel.

**(e) Buat fitur turunan lewat `engineer()`, lalu return.**

### 3.6 Fungsi `engineer(wide)` — fitur turunan

```python
def engineer(wide: pd.DataFrame) -> list[str]:
```
Menambahkan kolom baru ke `wide` (**in-place**, langsung mengubah DataFrame),
lalu mengembalikan **daftar nama semua kolom fitur**.

**Tiga jenis fitur baru:**

**(1) Selisih biaya termurah — `gc_1_selisih_min`, dst.**
```python
gc_min = wide[gc_cols].min(axis=1)      # gc terkecil tiap baris (per orang)
wide[f"{c}_selisih_min"] = wide[c] - gc_min
```
`axis=1` = operasi **mendatar** (per baris), bukan per kolom.
Artinya: "moda ini berapa lebih mahal dari alternatif termurah orang itu?"
**Kenapa berguna:** orang memilih berdasarkan **perbandingan relatif**, bukan
angka absolut. Sinyal relatif biasanya lebih kuat.

**(2) Peringkat biaya — `gc_rank_1`..`gc_rank_4`**
```python
ranks = wide[gc_cols].rank(axis=1, method="min").astype(int)
```
`rank(axis=1)` = urutkan keempat `gc` dalam satu baris, kasih nomor urut.
`gc_rank = 1` berarti **paling murah**. Kode `method="min"` = kalau ada nilai
sama, ambil peringkat terkecil.

**(3) Keterjangkauan — `gc_per_hinc_1`..`gc_per_hinc_4`**
```python
safe_hinc = wide["hinc"].replace(0, np.nan)   # hindari pembagian nol!
wide[f"gc_per_hinc_{m}"] = wide[f"gc_{m}"] / safe_hinc
```
Rasio biaya vs pendapatan: "biaya moda ini seberapa besar dibanding pendapatan?"
`replace(0, np.nan)` = ganti 0 jadi NaN supaya **tidak terjadi ZeroDivisionError**
(pembagian dengan nol). NaN-nya nanti ditangani imputer di dalam Pipeline.

**Kolom yang DIBUANG (dan alasannya):**

| Kolom | Alasan dibuang |
|---|---|
| `choice` | **Leakage** — `choice` = hasil pemilihan; kalau dipakai fitur, model hafal jawabannya. Hanya dipakai untuk konstruksi, lalu dibuang. |
| `individual` | ID baris — angka identitas tanpa makna prediktif. Model bisa hafal ID tanpa belajar pola. |

**Kenapa fitur turunan aman dilakukan SEBELUM split?**
Karena semuanya dihitung **hanya dari baris orang yang sama** (tanpa
mengambil statistik dari seluruh data), jadi tidak ada informasi bocor
dari data test ke data train.

### 3.7 Fungsi `split_stratified(...)`

```python
def split_stratified(wide, feature_cols, test_size=0.2, seed=42):
    X = wide[feature_cols]      # X = semua kolom FITUR (input model)
    y = wide[TARGET]            # y = kolom TARGET (jawaban)
    from sklearn.model_selection import train_test_split
    return train_test_split(X, y, test_size=test_size, random_state=seed, stratify=y)
```

- **`X` dan `y`**: konvensi ML — `X` (huruf besar) = fitur/input, `y` = label/target.
- **`test_size=0.2`** = 20% data test (42 dari 210 orang), 80% train (168).
- **`random_state=42`** = "benih acak" — hasil pembagian **selalu sama** tiap
  dijalankan, supaya bisa direproduksi.
- **`stratify=y`** = pembagian **menjaga proporsi tiap kelas** di train & test.
  Tanpa ini, kelas minoritas (Moda 3, 30 sampel) bisa nyasar semua ke test.

**Kenapa split di sini, bukan di dalam Pipeline?**
Aturan soal UTS: **split SEBELUM imputasi/scaling/encoding**. Kalau scaling
dijalankan dulu lalu split, statistik data test ikut terpakai → bocor.
Di sini split dilakukan dulu, lalu semua preprocessing **di-fit hanya pada train**.

### 3.8 Fungsi `raw_long_ke_fitur(raw, feature_cols)` — untuk prediksi

```python
def raw_long_ke_fitur(raw, feature_cols) -> pd.DataFrame:
```
Fungsi ini dipakai **app.py saat user mengisi form**, supaya input mentah
(bentuk long, 4 baris) diubah dengan **logika yang persis sama** seperti
training. Ini krusial: kalau train dan serve pakai cara berbeda → prediksi salah.

```python
raw = raw.copy()
raw["__id"] = 0
wide = raw.pivot(index="__id", columns="mode", values=PER_MODE_ATTRS)
```
**Trik `__id` = 0:** tanpa `index`, pivot menghasilkan **4 baris** (penuh NaN)
karena tiap mode punya nilai sendiri. Dengan index tiruan `__id` yang sama
(0) untuk keempat baris → hasilnya **tepat 1 baris**.

```python
engineer(wide)   # menambah kolom turunan IN-PLACE
return wide[feature_cols]
```
`wide[feature_cols]` = **paksa urutan kolom persis seperti saat training**
(urutan kolom harus identik, kalau tidak prediksi bisa salah baca).

### 3.9 Blok `if __name__ == "__main__":`

```python
if __name__ == "__main__":
    ...
```
Artinya: "jalankan blok ini **hanya jika file dijalankan langsung**"
(`python fitur.py`), **bukan saat di-import** oleh file lain (`from fitur import ...`).
Ini pola Python standar — supaya `latih.py` bisa memakai fungsi di `fitur.py`
tanpa ikut menjalankan kode percobaannya.

---

## 4. Penjelasan `latih.py` — Training & Evaluasi

### 4.1 Import scikit-learn (library ML utama)

```python
import joblib        # simpan/muat objek Python ke file (.joblib)
import numpy as np    # hitung angka
import pandas as pd   # tabel data

from sklearn.ensemble import RandomForestClassifier    # model Random Forest
from sklearn.linear_model import LogisticRegression    # model Logistic Regression
from sklearn.metrics import (accuracy_score, classification_report,
                             confusion_matrix, f1_score)   # metrik evaluasi
from sklearn.model_selection import StratifiedKFold, cross_val_score   # cross-validation
from sklearn.pipeline import Pipeline                   # rangkaian langkah preprocessing + model
from sklearn.preprocessing import StandardScaler        # normalisasi skala fitur

from fitur import TARGET, build_features, split_stratified   # impor dari file fitur.py
```

### 4.2 Variabel konstanta

```python
BASE = Path(__file__).resolve().parent   # folder tempat file ini berada (relatif!)
DATASET = BASE / "dataset" / "kasus09_mode_choice.csv"
MODELS_DIR = BASE / "models"
SEED = 42          # benih acak → hasil selalu sama
CV_FOLDS = 5       # 5-fold cross-validation
TEST_SIZE = 0.2    # 20% data test
```

`Path(__file__).resolve().parent` = lokasi folder script **relatif terhadap
file itu sendiri** — inilah cara supaya **tidak ada path absolut** di kode.

```python
CLASS_LABELS = {1: "Moda 1", 2: "Moda 2", 3: "Moda 3", 4: "Moda 4"}
```
Kamus (dict) pemetaan kode kelas → nama tampilan. **Catatan:** dokumentasi
sumber TIDAK menjelaskan urutan kode 1–4, jadi label dipertahankan generik
(`Moda 1`) — supaya tidak mengarang makna yang tidak ada di sumber data.

### 4.3 Fungsi `buat_pipelines()`

```python
def buat_pipelines() -> dict[str, Pipeline]:
    from sklearn.impute import SimpleImputer
    return {
        "logistic_regression": Pipeline([...]),
        "random_forest": Pipeline([...]),
    }
```
Mengembalikan **dict** berisi dua kandidat model. **Pipeline** = rangkaian
langkah yang dijalankan berurutan otomatis:

```python
Pipeline([
    ("imputer", SimpleImputer(strategy="median")),  # 1. isi nilai kosong dgn median
    ("scaler", StandardScaler()),                   # 2. normalisasi skala (mean=0, std=1)
    ("clf", LogisticRegression(...)),               # 3. model klasifikator
])
```

**Kenapa Pipeline?** Semua langkah preprocessing **di-fit hanya pada data train**,
dan saat prediksi di test/data baru, langkah yang sama dipakai ulang
(statistik train tidak tercampur data test). Ini cara scikit-learn mencegah bocor.

**Kenapa tiap langkah ada nama (`"imputer"`, `"scaler"`)?**
Pipeline = daftar `(nama, objek)` — namanya dipakai saat mengakses/mengubah
langkah: `pipe.named_steps["scaler"]`.

**Kenapa dua model dibandingkan?**
Aturan soal: banding **minimal 2 algoritma**.

| Model | Cara kerja singkat | Butuh scaling? |
|---|---|---|
| **Logistic Regression** | menggambar batas garis/hiperplan antar kelas pakai regresi logistik | **Ya** — skala fitur beda jauh (`hinc` ~35, `invt` ~417) bikin konvergensi bias |
| **Random Forest** | kumpulan pohon keputusan yang divoting | Tidak wajib, tapi tetap dipasang supaya **perbandingan adil** |

Parameter:
- `max_iter=2000` = iterasi maksimum Logistic Regression (biar konvergen).
- `n_estimators=400` = jumlah pohon di Random Forest.
- `n_jobs=-1` = pakai **semua CPU core** (lebih cepat).
- `random_state=42` = hasil acak dibuat deterministik.

**Kenapa `SimpleImputer` tetap dipasang walau data Kasus 9 tidak ada nilai kosong?**
Sebagai **jaring pengaman** — kalau user aplikasi mengisi form dengan nilai kosong,
program tidak crash.

### 4.4 Fungsi `pilih_model_dengan_cv(...)`

```python
def pilih_model_dengan_cv(pipelines, X_train, y_train) -> tuple[str, Pipeline, dict]:
    cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
    ...
```

**Cross-Validation (CV) — apa dan kenapa?**
Daripada cuma satu kali split train/test untuk memilih model (hasilnya bisa
kebetulan bagus/jelek), data train (168 orang) dibagi jadi **5 bagian (fold)**:

```
Fold 1: [test] [train] [train] [train] [train]
Fold 2: [train] [test] [train] [train] [train]
Fold 3: [train] [train] [test] [train] [train]
Fold 4: [train] [train] [train] [test] [train]
Fold 5: [train] [train] [train] [train] [test]
```
Tiap fold sekali jadi "test", sisanya train → **5 skor**, lalu diambil
**rata-rata (mean)** dan **sebaran (std)**. Skor yang stabil (std kecil)
= model bisa diandalkan.

**`StratifiedKFold`** = tiap fold **menjaga proporsi kelas** (kelas 3 minoritas
tetap terwakili di tiap fold). `KFold` biasa bisa membuat fold tanpa kelas 3 sama sekali.

```python
skor_acc = cross_val_score(pipe, X_train, y_train, cv=cv, scoring="accuracy")
skor_f1 = cross_val_score(pipe, X_train, y_train, cv=cv, scoring="f1_macro")
hasil[nama] = {"accuracy_mean": ..., "f1_macro_mean": ...}
```
`cross_val_score` = jalankan pipeline di tiap fold, kumpulkan skor.
Diulang dua kali: dengan `accuracy` dan `f1_macro`.

```python
terbaik = max(hasil, key=lambda n: hasil[n]["f1_macro_mean"])
```
**`max` dengan `key=`** = cari model dengan nilai `f1_macro_mean` **tertinggi**.
`lambda n: ...` = fungsi anonim (singkat) yang menghitung kunci pembanding.

**Kenapa f1_macro jadi kriteria utama?** Karena kelas **tidak seimbang**
(30 vs 63) dan **semua kelas sama pentingnya** — accuracy bisa tinggi walau
kelas minoritas sering salah. (Lihat §5.)

### 4.5 Fungsi `main()` — alur utama

```
[1] build_features()  → audit + transformasi long→wide
[2] split_stratified() → 168 train / 42 test (SEBELUM preprocessing)
[3] pilih_model_dengan_cv() → CV di train, pemenang: Random Forest
[4] pipeline.fit(X_train) → train model TEPAT SATU KALI di train
      pipeline.predict(X_test) → evaluasi test TEPAT SATU KALI
[5] joblib.dump() → simpan model + metadata
```

**Kenapa `fit` hanya sekali di train, `predict` di test hanya sekali?**
Aturan UTS: **"Evaluasi model pada data test sebanyak satu kali."**
Kalau test dipakai berulang untuk memilih model → otomatis bocor (kita
secara tidak sengaja "menghafal" test). Test = "ujian akhir", boleh dilihat sekali.

```python
pipeline.fit(X_train, y_train)      # belajar dari train
y_pred = pipeline.predict(X_test)   # tebak jawaban test
```

**Metrik yang dihitung:**

```python
acc = accuracy_score(y_test, y_pred)     # proporsi prediksi benar
f1m = f1_score(y_test, y_pred, average="macro")   # rata-rata F1 tiap kelas
rep = classification_report(..., output_dict=True) # precision/recall/F1 per kelas
cm = confusion_matrix(y_test, y_pred)    # matriks salah tebak
```

**Penyimpanan:**
```python
MODELS_DIR.mkdir(exist_ok=True)          # bikin folder models/ kalau belum ada
joblib.dump(pipeline, MODELS_DIR / "best_pipeline.joblib")   # simpan objek model
joblib.dump(metadata, MODELS_DIR / "metadata.joblib")        # simpan metadata
with open(MODELS_DIR / "metadata.json", "w", encoding="utf-8") as fh:
    json.dump(metadata, fh, indent=2)                        # versi JSON utk dibaca
```
- `joblib.dump` = serialisasi objek Python ke file (bisa dibaca ulang pakai `joblib.load`).
- Metadata = "petunjuk pemakaian model": urutan kolom fitur, label kelas, metrik —
  **app.py wajib tahu ini** supaya inputnya urut dan labelnya benar.

---

## 5. Metrik Evaluasi — Arti & Kenapa Pilih Ini

### Confusion matrix (contoh hasil aktual)

Baris = **aktual (benar)**, kolom = **prediksi model**:

```
            pred: M1  M2  M3  M4
aktual M1  [   9    0   0   2  ]   ← 9 benar, 2 salah dikira M4
aktual M2  [   0   13   0   0  ]   ← semua benar
aktual M3  [   0    0   6   0  ]   ← semua benar
aktual M4  [   0    1   0  11  ]   ← 11 benar, 1 salah dikira M2
```
Angka di **diagonal utama** = prediksi benar; di luar diagonal = kesalahan.

### Tiga metrik utama

**1. Accuracy** = jumlah benar / total = (9+13+6+11)/42 = **0.9286**
> "Dari 42 orang, berapa persen tebakannya tepat?"
> **Kelemahan:** kalau kelas timpang, accuracy bisa menipu (model yang cuma
> menebak kelas mayoritas terus tetap terlihat bagus).

**2. Precision** (per kelas) = dari yang diprediksi kelas X, berapa yang benar
> "Kalau model bilang Moda 1, seberapa sering dia benar?" → Moda 1 precision 1.00
> (semua yang ditebak Moda 1 memang Moda 1).

**3. Recall** (per kelas) = dari yang ACTUAL kelas X, berapa yang tertangkap
> "Dari semua orang yang benar-benar Moda 1, berapa yang berhasil ditebak?" → 0.82
> (2 dari 11 orang Moda 1 lolos, dikira Moda 4).

**4. F1-score** = harmonik antara precision & recall:
`F1 = 2 × (precision × recall) / (precision + recall)`
> Kompromi: tinggi hanya kalau precision **dan** recall sama-sama tinggi.

**5. F1-macro** (METRIK UTAMA project ini)
> Rata-rata F1 keempat kelas **tanpa peduli jumlah sampel tiap kelas**.
> Kenapa: kelas tidak seimbang (30 vs 63), dan **semua moda sama pentingnya** —
> F1-macro tidak "dicuri" oleh kelas mayoritas seperti accuracy.

**Hasil akhir (seed 42):**

| Model | CV f1_macro (train) | Test accuracy | Test f1_macro |
|---|---|---|---|
| **Random Forest ✔ terpilih** | **0.8641 ± 0.0727** | 0.9286 | 0.9357 |
| Logistic Regression | 0.7591 ± 0.1100 | — | — |

Random Forest menang di CV (0.864 > 0.760) → dialah yang dievaluasi di test.

---

## 6. Penjelasan `app.py` — Aplikasi Streamlit

**Streamlit** = pustaka Python untuk bikin **web app interaktif** dari script
Python biasa — tanpa perlu HTML/JS/CSS.

### 6.1 Import

```python
import streamlit as st     # pustaka UI; alias "st" = konvensi standar
from fitur import raw_long_ke_fitur   # pakai fungsi konversi dari fitur.py (logika sama!)
```

### 6.2 Konfigurasi & path

```python
st.set_page_config(page_title="Prediksi Moda Transportasi", layout="wide")
```
Setel judul tab browser + tata letak lebar. **Harus dipanggil paling atas** file.

```python
BASE = Path(__file__).resolve().parent
PIPE_PATH = BASE / "models" / "best_pipeline.joblib"
META_PATH = BASE / "models" / "metadata.joblib"
```
Lagi-lagi **path relatif** (aturan soal: tanpa path absolut/kredensial).

### 6.3 Fungsi `muat_model()` + decorator `@st.cache_resource`

```python
@st.cache_resource
def muat_model():
    ...
    return joblib.load(PIPE_PATH), joblib.load(META_PATH)
```

**Decorator `@...`** = "sesuaikan fungsi di bawahnya". `@st.cache_resource`
artinya: **muat model sekali, simpan di memori** — tiap kali user klik tombol,
model **tidak dimuat ulang** (lebih cepat).

Kalau file model belum ada → `st.error(...)` tampilkan pesan + `st.stop()`
(hentikan app, sarankan jalankan `python latih.py` dulu).

### 6.4 Variabel hasil muat

```python
pipe, meta = muat_model()
feature_cols = meta["feature_columns"]          # urutan 30 kolom fitur
class_labels = {int(k): v for k, v in ...}      # {1: "Moda 1", ...}
```
`pipe` = model siap prediksi; `meta` = petunjuk (urutan kolom, label, metrik).

### 6.5 UI: judul & form input

```python
st.title("🚆 Prediksi Moda Transportasi")   # judul besar
st.caption("...")                            # teks kecil keterangan
```

```python
with st.form("input_form"):
    ...
    submitted = st.form_submit_button("Prediksi")
```
**`with st.form(...)`** = kelompokkan input dalam satu **form**. Semua
`number_input` baru **diproses saat tombol "Prediksi" diklik** (bukan tiap
karakter diketik) — lebih efisien.

```python
c1, c2 = st.columns(2)     # bikin 2 kolom tampilan berdampingan
hinc = c1.number_input("Pendapatan rumah tangga (hinc)", min_value=0.0,
                       value=60.0, step=5.0)
```
`st.number_input` = kotak angka. `value=60.0` = nilai awal, `step=5.0` =
kenaikan saat tombol panah diklik.

```python
cols = st.columns(4)       # 4 kolom utk 4 alternatif moda
for i, name in enumerate(mode_names):
    with cols[i]:
        rows[i + 1] = {"ttme": st.number_input(..., key=f"ttme{i}"), ...}
```
- `enumerate(...)` = iterasi sambil dapat nomor urut (`i`) — dipakai untuk
  memilih kolom `cols[i]` dan membuat `key` unik.
- **`key=f"ttme{i}"`** = kunci unik tiap input. **Wajib** kalau label teks
  bisa sama antar kolom — Streamlit butuh key unik untuk membedakan widget.
- `rows` = dict sementara menampung input user: `{1: {ttme:.., invc:..}, 2: {...}, ...}`.

### 6.6 Saat tombol diklik (`if submitted:`)

```python
recs = []
for mode, attrs in rows.items():
    rec = {"individual": 1.0, "mode": float(mode), "choice": 0.0,
           **attrs, "hinc": hinc, "psize": psize}
    recs.append(rec)
raw = pd.DataFrame(recs)
```
Bangun **frame mentah bentuk long** (4 baris, persis struktur CSV asli).
- `**attrs` = "sebarkan" isi dict `attrs` ke dict `rec` (gabung jadi satu).
- `choice` diisi `0.0` — hanya placeholder, **tidak dipakai fitur** (leakage).

```python
X_new = raw_long_ke_fitur(raw, feature_cols)   # konversi ke 30 fitur (logika SAMA dgn training)
proba = pipe.predict_proba(X_new)[0]           # probabilitas tiap kelas
pred = int(pipe.classes_[int(np.argmax(proba))])   # kelas dgn probabilitas tertinggi
```

**Penjelasan penting (bug klasik yang sudah diperbaiki):**
- `predict_proba` mengembalikan array `[0.04, 0.01, 0.005, 0.94]` —
  urutannya sesuai `pipe.classes_` = `[1, 2, 3, 4]`.
- `np.argmax(proba)` = **indeks** posisi tertinggi (0–3), **bukan** kode kelas (1–4)!
- Maka kode yang benar: `pipe.classes_[argmax]` → ambil kode asli.
  Kalau pakai `argmax` langsung → prediksi **meleset satu** (kelas 4 dikira 3).

```python
st.success(f"**Moda yang diprediksi dipilih: {label}** ...")
```
`st.success` = kotak hijau hasil. F-string menyisipkan `label`.

```python
prob_df = pd.DataFrame({"Moda": [...], "Probabilitas": proba}).set_index("Moda")
st.bar_chart(prob_df)              # grafik batang probabilitas
st.dataframe(prob_df.style.format("{:.4f}"))   # tabel angka 4 desimal
```

### 6.7 Bagian metrik (selalu tampil)

```python
ev = meta["evaluasi_test"]          # metrik dari metadata
m1, m2, m3 = st.columns(3)
m1.metric("Accuracy", f"{ev['accuracy']:.4f}")   # kartu angka besar
```
`:.4f` = format angka **4 digit desimal**.

```python
with st.expander("..."):    # bagian bisa dibuka/tutup (lipat)
    st.dataframe(...)
    st.json(...)
```
`st.expander` = konten terlipat — menjaga UI tetap rapi tapi detail tetap bisa dilihat.

---

## 7. Menjalankan Project

```bash
cd /home/purwa/devepolur/documentation-progress/uts-ai-lab
source .venv/bin/activate          # aktifkan virtual environment (sekali per terminal)

python fitur.py                    # (opsional) lihat audit + hasil transformasi
python latih.py                    # training + evaluasi + simpan model ke models/
streamlit run app.py               # jalankan aplikasi → buka http://localhost:8500
```

**Virtual environment (`.venv`)** = "kamar khusus" berisi library project ini
terpisah dari Python sistem — supaya versi pandas/sklearn tidak bentrok
dengan project lain. `source .venv/bin/activate` = masuk kamar;
`deactivate` = keluar.

**Urutan wajib:** `latih.py` dulu (membuat `models/*.joblib`) → baru
`streamlit run app.py` (app butuh file model itu).

---

## 8. Aturan UTS yang Dipatuhi (Ringkasan)

| Aturan soal | Diimplementasikan di |
|---|---|
| Split **SEBELUM** imputasi/scaling/encoding | `split_stratified()` dipanggil dulu; preprocessing di dalam Pipeline (di-fit train saja) |
| Pilih model **hanya via CV di train** | `pilih_model_dengan_cv()` — CV di `X_train` |
| Evaluasi test **sekali** | `main()` bagian [4] — sekali `predict(X_test)` |
| Buang kolom tak layak + jelaskan | `choice` (leakage), `individual` (ID) dibuang di `long_to_wide()` |
| Simpan di `models/` + tanpa path absolut | `joblib.dump` ke `MODELS_DIR`; semua path via `Path(__file__).parent` |
| Transformasi format + alasan | `long_to_wide()` (§3.5) + dokumentasi di `fitur.py` |
| Fitur interaksi + encoding | fitur turunan `engineer()` (selisih, rank, rasio) — semua numerik, tidak perlu encoding kategori |

---

## 9. Glosarium Cepat

| Istilah | Arti singkat |
|---|---|
| **DataFrame** | tabel data (kayak Excel di Python), dari pandas |
| **Series** | satu kolom DataFrame |
| **dict (kamus)** | pasangan `kunci: nilai`, `{1: "Moda 1"}` |
| **tuple** | pasangan/tuple nilai terkurung `()` |
| **fitur (feature)** | kolom input yang dipakai model menebak |
| **target/label** | kolom jawaban yang diprediksi (`target_mode`) |
| **long format** | 1 baris = 1 observasi (840 baris) |
| **wide format** | 1 baris = 1 entitas (210 baris) |
| **pivot** | operasi long → wide |
| **leakage / bocor** | info data test masuk ke training → hasil palsu |
| **train/test split** | bagi data jadi data belajar + data uji |
| **cross-validation (CV)** | ulang split train jadi beberapa fold, ambil rata-rata |
| **stratify** | jaga proporsi kelas tiap pembagian |
| **Pipeline** | rangkaian preprocessing+model otomatis |
| **scaling (StandardScaler)** | normalisasi fitur ke mean 0, std 1 |
| **imputer** | isi nilai kosong (dgn median/mean) |
| **encoding** | ubah kategori jadi angka (tidak perlu di sini — semua fitur numerik) |
| **fit / predict** | `fit` = belajar dari data; `predict` = menebak |
| **serialisasi (joblib)** | simpan objek Python ke file agar bisa dimuat ulang |
| **decorator (`@`)** | "sesuaikan fungsi di bawah" (mis. `@st.cache_resource`) |
| **f-string** | string dengan sisipan variabel: `f"nilai: {x}"` |

---

## 10. Bug yang Ditemukan & Diperbaiki (Pelajaran)

1. **Pivot tanpa index → 4 baris penuh NaN.**
   *Gejala:* `IntCastingNaNError: Cannot convert non-finite values`.
   *Fix:* kasih index tiruan `raw["__id"] = 0` supaya hasil pivot = 1 baris.

2. **Salah tipe return:** `wide = engineer(wide)` — `engineer()` balikin
   **list**, bukan DataFrame → `TypeError: list indices must be integers`.
   *Fix:* `engineer(wide)` saja (mutasi in-place), return list-nya diabaikan.

3. **`argmax` vs kode kelas (paling penting):**
   `np.argmax(proba)` = indeks **0–3**, tapi kelas **1–4** → prediksi meleset satu.
   *Fix:* `pipe.classes_[int(np.argmax(proba))]`.

**Inti pelajaran:** selalu **uji inference konsisten dengan training**
(bandingkan fitur hasil konversi input == fitur dari pipeline training)
— selisih kecil di konversi = prediksi salah semua.