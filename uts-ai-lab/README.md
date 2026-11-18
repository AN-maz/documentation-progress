# UTS AI — Kasus 9: Pilihan Moda Transportasi

Take-home UTS Intelegensi Buatan (TIF RP 23B). Dataset: `dataset/kasus09_mode_choice.csv`
(survei perjalanan non-bisnis Sydney–Canberra–Melbourne, 1987).

Target: `mode` — moda yang dipilih tiap individu (1–4).
Data berformat **panjang**: 840 baris = 210 individu × 4 alternatif, jadi wajib
di-transformasi jadi **satu baris per individu** sebelum modeling.

## Struktur

```
uts-ai-lab/
├── dataset/kasus09_mode_choice.csv   # data mentah (long format)
├── fitur.py      # audit + transformasi long→wide + fitur turunan + split
├── latih.py      # CV di train, evaluasi test sekali, simpan models/*.joblib
├── app.py        # Streamlit: input mentah → prediksi + probabilitas + metrik
├── models/       # best_pipeline.joblib, metadata.joblib/.json (hasil latih.py)
├── requirements.txt
└── Laporan.md    # laporan singkat 1–2 halaman
```

## Jalankan

```bash
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt

python fitur.py              # audit + cek transformasi (opsional)
python latih.py              # training + evaluasi + simpan model
streamlit run app.py         # aplikasi prediksi
```

## Catatan aturan yang dipatuhi

- Split train/test **sebelum** imputasi/scaling/encoding (semua di dalam
  Pipeline, di-fit hanya pada data train).
- Pemilihan model **hanya** via 5-fold Stratified CV di data train;
  data test dievaluasi **sekali** di akhir.
- `choice` dan `individual` dibuang: `choice` = leakage (hasil pemilihan sudah
  diketahui), `individual` = ID baris tanpa makna prediktif.
- Path selalu relatif (`Path(__file__).parent`), tanpa kredensial.

## Hasil (seed 42)

| Model | CV f1_macro (train) | Test accuracy | Test f1_macro |
|---|---|---|---|
| Random Forest ✔ terpilih | 0.8641 ± 0.0727 | 0.9286 | 0.9357 |
| Logistic Regression | 0.7591 ± 0.1100 | — | — |

Metrik utama: **f1_macro** — kelas tidak seimbang (Moda 3 hanya 30 sampel) dan
semua kelas sama pentingnya.