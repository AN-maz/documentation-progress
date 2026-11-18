"""latih.py — Pelatihan, evaluasi, dan penyimpanan model Kasus 9.

Aturan UTS yang dipegang di file ini:
  1. Split train/test SEBELUM imputasi/scaling/encoding (imputasi/scaling
     berada di dalam Pipeline, yang di-fit hanya pada train).
  2. Pemilihan model hanya dengan Cross-Validation di DATA TRAIN.
  3. Data test dievaluasi TEPAT SATU KALI, di akhir, untuk model terpilih.
  4. Model disimpan di folder models/ dengan path relatif (tanpa path absolut).

Jalankan:  python latih.py
"""

from __future__ import annotations

import json
from pathlib import Path

import joblib
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
    f1_score,
)
from sklearn.model_selection import StratifiedKFold, cross_val_score
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

from fitur import TARGET, build_features, split_stratified

BASE = Path(__file__).resolve().parent          # relatif terhadap file ini
DATASET = BASE / "dataset" / "kasus09_mode_choice.csv"
MODELS_DIR = BASE / "models"
SEED = 42
CV_FOLDS = 5
TEST_SIZE = 0.2

# Label kelas: dokumentasi sumber TIDAK menjelaskan urutan kode moda 1-4,
# jadi label dipertahankan sebagai kode angka + deskripsi generik agar
# tidak mengarang makna yang tidak ada di sumber.
CLASS_LABELS = {1: "Moda 1", 2: "Moda 2", 3: "Moda 3", 4: "Moda 4"}


def buat_pipelines() -> dict[str, Pipeline]:
    """Dua kandidat algoritma, masing-masing dengan preprocessing di dalamnya.

    - LogisticRegression: butuh scaling (skala fitur beda jauh: hinc vs ttme),
      solver lbfgs multi-class.
    - RandomForestClassifier: tidak butuh scaling, tetap dipasangi scaler
      agar perbandingan adil dan pipeline seragam.
    Tidak ada imputasi di data Kasus 9 (audit fitur.py: 0 missing value),
    tetapi SimpleImputer tetap dipasang sebagai jaring pengaman bila data
    baru dari aplikasi mengandung kosong.
    """
    from sklearn.impute import SimpleImputer

    return {
        "logistic_regression": Pipeline(
            [
                ("imputer", SimpleImputer(strategy="median")),
                ("scaler", StandardScaler()),
                ("clf", LogisticRegression(max_iter=2000, random_state=SEED)),
            ]
        ),
        "random_forest": Pipeline(
            [
                ("imputer", SimpleImputer(strategy="median")),
                ("scaler", StandardScaler()),
                (
                    "clf",
                    RandomForestClassifier(
                        n_estimators=400, random_state=SEED, n_jobs=-1
                    ),
                ),
            ]
        ),
    }


def pilih_model_dengan_cv(
    pipelines: dict[str, Pipeline], X_train: pd.DataFrame, y_train: pd.Series
) -> tuple[str, Pipeline, dict[str, dict]]:
    """Pemilihan model HANYA dari cross-validation di data train.

    StratifiedKFold menjaga proporsi 4 kelas tetap di tiap fold
    (kelas 3 minoritas, 30 sampel).
    """
    cv = StratifiedKFold(n_splits=CV_FOLDS, shuffle=True, random_state=SEED)
    hasil: dict[str, dict] = {}
    for nama, pipe in pipelines.items():
        skor_acc = cross_val_score(pipe, X_train, y_train, cv=cv, scoring="accuracy")
        skor_f1 = cross_val_score(
            pipe, X_train, y_train, cv=cv, scoring="f1_macro"
        )
        hasil[nama] = {
            "accuracy_mean": float(skor_acc.mean()),
            "accuracy_std": float(skor_acc.std()),
            "f1_macro_mean": float(skor_f1.mean()),
            "f1_macro_std": float(skor_f1.std()),
        }
        print(
            f"[CV {nama}] acc={skor_acc.mean():.4f}±{skor_acc.std():.4f} "
            f"| f1_macro={skor_f1.mean():.4f}±{skor_f1.std():.4f}"
        )

    # Metrik utama: f1_macro (kelas tidak seimbang, semua kelas penting)
    terbaik = max(hasil, key=lambda n: hasil[n]["f1_macro_mean"])
    return terbaik, pipelines[terbaik], hasil


def main() -> None:
    print("=" * 60)
    print("UTS AI — Kasus 9: Pilihan Moda Transportasi")
    print("=" * 60)

    # 1. Feature engineering + audit (masih satu kesatuan data mentah)
    wide, feature_cols, info = build_features(DATASET)
    print("\n[1] Audit data mentah:")
    print(json.dumps(info, indent=2, ensure_ascii=False))

    # 2. Split SEBELUM preprocessing
    X_train, X_test, y_train, y_test = split_stratified(
        wide, feature_cols, test_size=TEST_SIZE, seed=SEED
    )
    print(
        f"\n[2] Split: train={len(X_train)} | test={len(X_test)} "
        f"(stratified, test_size={TEST_SIZE})"
    )
    print("    distribusi train:", y_train.value_counts().sort_index().to_dict())
    print("    distribusi test :", y_test.value_counts().sort_index().to_dict())

    # 3. Pemilihan model via CV di train saja
    print("\n[3] Cross-validation di data train:")
    nama_terbaik, pipeline, hasil_cv = pilih_model_dengan_cv(
        buat_pipelines(), X_train, y_train
    )
    print(f"    -> model terpilih: {nama_terbaik} (f1_macro tertinggi)")

    # 4. Fit ulang di train, evaluasi TEST TEPAT SATU KALI
    pipeline.fit(X_train, y_train)
    y_pred = pipeline.predict(X_test)

    acc = accuracy_score(y_test, y_pred)
    f1m = f1_score(y_test, y_pred, average="macro")
    rep = classification_report(
        y_test, y_pred, target_names=[CLASS_LABELS[c] for c in sorted(CLASS_LABELS)],
        output_dict=True, zero_division=0,
    )
    cm = confusion_matrix(y_test, y_pred)

    print("\n[4] Evaluasi data test (sekali):")
    print(f"    accuracy   = {acc:.4f}")
    print(f"    f1_macro   = {f1m:.4f}")
    print(classification_report(
        y_test, y_pred,
        target_names=[CLASS_LABELS[c] for c in sorted(CLASS_LABELS)],
        zero_division=0,
    ))
    print("    confusion matrix (baris=aktual, kolom=prediksi):")
    print(cm)

    # 5. Simpan pipeline + metadata (path relatif, tanpa kredensial)
    MODELS_DIR.mkdir(exist_ok=True)
    joblib.dump(pipeline, MODELS_DIR / "best_pipeline.joblib")

    metadata = {
        "kasus": 9,
        "nama_model": nama_terbaik,
        "feature_columns": feature_cols,
        "class_labels": CLASS_LABELS,
        "target_column": TARGET,
        "cv_hasil": hasil_cv,
        "evaluasi_test": {
            "jumlah_test": int(len(y_test)),
            "accuracy": float(acc),
            "f1_macro": float(f1m),
            "classification_report": rep,
            "confusion_matrix": cm.tolist(),
        },
    }
    joblib.dump(metadata, MODELS_DIR / "metadata.joblib")
    # salin ringkas juga sebagai JSON biar gampang dibaca laporan
    with open(MODELS_DIR / "metadata.json", "w", encoding="utf-8") as fh:
        json.dump(metadata, fh, indent=2, ensure_ascii=False)

    print(f"\n[5] Tersimpan: models/best_pipeline.joblib, models/metadata.joblib")
    print("    Siap dipakai app.py.")


if __name__ == "__main__":
    main()