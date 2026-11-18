"""fitur.py — Feature engineering untuk Kasus 9 (Pilihan Moda Transportasi).

Dataset kasus09_mode_choice.csv berformat PANJANG: 1 baris = 1 alternatif moda,
1 individu = 4 baris (mode 1..4). Target 'mode' hanya berlaku untuk baris
choice == 1 (tepat 1 per individu).

Alur:
    raw (long) -> audit -> pivot ke wide (1 baris per individu)
                 -> fitur turunan -> split stratified train/test

Prinsip keamanan:
  * Kolom 'choice' DIBUANG setelah dipakai untuk verifikasi — memakainya
    sebagai fitur = leakage (hasil pemilihan sudah diketahui).
  * Kolom 'individual' DIBUANG — ID baris, tidak punya makna prediktif.
  * Fitur turunan hanya memakai kolom dalam baris individu yang sama
    (tanpa statistik populasi), sehingga aman dilakukan sebelum split.
  * Imputasi/scaling/encoding TIDAK ada di file ini — semuanya di dalam
    Pipeline scikit-learn di latih.py, yang di-fit HANYA pada data train.
"""

from __future__ import annotations

from pathlib import Path

import numpy as np
import pandas as pd

PER_MODE_ATTRS = ["ttme", "invc", "invt", "gc"]  # nilainya beda tiap moda
PER_PERSON_ATTRS = ["hinc", "psize"]              # sama untuk tiap individu
TARGET = "target_mode"


def load_raw(path: str | Path) -> pd.DataFrame:
    """Baca CSV mentah dan cek strukturnya. Gagal cepat kalau format salah."""
    df = pd.read_csv(path)
    expected = ["individual", "mode", "choice", *PER_MODE_ATTRS, *PER_PERSON_ATTRS]
    missing = [c for c in expected if c not in df.columns]
    if missing:
        raise ValueError(f"Kolom hilang: {missing}. File harus punya: {expected}")
    return df


def audit(df: pd.DataFrame) -> dict:
    """Audit data mentah: baris, duplikat, missing value, konsistensi pilihan.

    Hasilnya dilaporkan apa adanya di laporan — bukan disembunyikan.
    """
    n_pilihan = int(df["choice"].sum())
    per_orang = df.groupby("individual")["choice"].sum()
    return {
        "jumlah_baris": int(len(df)),
        "jumlah_individu": int(df["individual"].nunique()),
        "duplikat": int(df.duplicated().sum()),
        "missing": {c: int(n) for c, n in df.isna().sum().items() if n > 0},
        "total_choice_1": n_pilihan,
        "individu_tanpa_tepat_1_pilihan": int((per_orang != 1).sum()),
        "distribusi_target": df.loc[df["choice"] == 1, "mode"]
        .value_counts()
        .sort_index()
        .astype(int)
        .to_dict(),
    }


def long_to_wide(df: pd.DataFrame) -> tuple[pd.DataFrame, list[str]]:
    """Transformasi format panjang -> satu baris per individu (tahap wajib soal).

    Tiap atribut per moda (ttme, invc, invt, gc) dipivot menjadi kolom terpisah
    per kode moda -> 16 kolom. hinc/psize cukup sekali (nilai sama di 4 baris).
    Target diambil dari baris choice == 1 (tepat satu per individu).

    Kembalikan (wide, feature_cols) di mana feature_cols sudah termasuk fitur
    turunan.
    """
    # target: hanya dari baris yang dipilih
    target = (
        df.loc[df["choice"] == 1, ["individual", "mode"]]
        .set_index("individual")["mode"]
        .astype(int)
        .rename(TARGET)
    )
    n_unik = df["individual"].nunique()
    if len(target) != n_unik:
        raise ValueError(
            f"Target tidak satu-per-individu: {len(target)} vs {n_unik} individu. "
            "Periksa kolom choice."
        )

    # pivot menghasilkan level (attr, mode) sesuai urutan values
    wide = df.pivot(index="individual", columns="mode", values=PER_MODE_ATTRS)
    wide.columns = [f"{attr}_{int(mode)}" for attr, mode in wide.columns]
    wide = wide.reset_index()

    # atribut per-individu (ambil satu baris per individu, nilai identik)
    per_person = df.groupby("individual")[PER_PERSON_ATTRS].first().reset_index()
    wide = wide.merge(per_person, on="individual").set_index("individual")
    wide = wide.join(target)

    # target harus int kelas (bukan float) supaya class_names cocok
    wide[TARGET] = wide[TARGET].astype(int)

    feature_cols = engineer(wide)
    return wide, feature_cols


def engineer(wide: pd.DataFrame) -> list[str]:
    """Fitur turunan (semua dari baris individu yang sama — aman sebelum split).

    1. Selisih biaya/waktu antar moda: orang cenderung memilih alternatif yang
       lebih murah/cepat RELATIF terhadap pilihan lain -> sinyal lebih kuat
       daripat nilai absolut.
    2. Rank gc per moda: posisi tiap moda dalam urutan biaya gabungan.
    3. Rasio gc/hinc: keterjangkauan biaya terhadap pendapatan rumah tangga.
    """
    base_cols = [c for c in wide.columns if c != TARGET]

    # 1. selisih thd gc terkecil dalam barisnya
    gc_cols = [f"gc_{m}" for m in (1, 2, 3, 4)]
    gc_min = wide[gc_cols].min(axis=1)
    for c in gc_cols:
        wide[f"{c}_selisih_min"] = wide[c] - gc_min

    # 2. rank gc (1 = paling murah)
    ranks = wide[gc_cols].rank(axis=1, method="min").astype(int)
    for m in (1, 2, 3, 4):
        wide[f"gc_rank_{m}"] = ranks[f"gc_{m}"]

    # 3. keterjangkauan: gc / pendapatan (guard pembagian nol)
    safe_hinc = wide["hinc"].replace(0, np.nan)
    for m in (1, 2, 3, 4):
        wide[f"gc_per_hinc_{m}"] = wide[f"gc_{m}"] / safe_hinc

    derived = [c for c in wide.columns if c not in base_cols + [TARGET]]
    feature_cols = base_cols + derived
    # buang kolom mentah yang jadi redundan setelah selisih/rank dibuat?
    # TIDAK — nilai absolut tetap dipertahankan, model yang menilai relevansinya.
    return feature_cols


def split_stratified(
    wide: pd.DataFrame, feature_cols: list[str], test_size: float = 0.2, seed: int = 42
) -> tuple[pd.DataFrame, pd.Series, pd.DataFrame, pd.Series]:
    """Split train/test SEBELUM preprocessing, stratified per kelas.

    Semua statistik preprocessing nanti dihitung Pipeline dari train saja.
    """
    X = wide[feature_cols]
    y = wide[TARGET]
    from sklearn.model_selection import train_test_split

    return train_test_split(
        X, y, test_size=test_size, random_state=seed, stratify=y
    )


def raw_long_ke_fitur(raw: pd.DataFrame, feature_cols: list[str]) -> pd.DataFrame:
    """Konversi input mentah bentuk panjang (4 baris per individu) -> fitur lebar.

    Dipakai app.py saat inference, dengan logika IDENTIK seperti training:
    pivot per atribut per moda + fungsi engineer yang sama. Kolom dipaksa
    urut sesuai feature_cols dari metadata supaya tidak ada beda train/serve.
    """
    # index tiruan supaya hasil pivot = 1 baris (bukan 4 baris penuh NaN)
    raw = raw.copy()
    raw["__id"] = 0
    wide = raw.pivot(index="__id", columns="mode", values=PER_MODE_ATTRS)
    wide.columns = [f"{attr}_{int(mode)}" for attr, mode in wide.columns]
    for col in PER_PERSON_ATTRS:
        wide[col] = float(raw[col].iloc[0])
    wide = wide.reset_index(drop=True)
    engineer(wide)  # menambahkan kolom turunan in-place pada `wide`
    return wide[feature_cols]


def build_features(path: str | Path) -> tuple[pd.DataFrame, list[str], dict]:
    """Satu panggilan: raw CSV -> (wide + target, feature_cols, audit)."""
    raw = load_raw(path)
    info = audit(raw)
    wide, feature_cols = long_to_wide(raw)
    return wide, feature_cols, info


if __name__ == "__main__":
    import json
    import sys

    csv = sys.argv[1] if len(sys.argv) > 1 else "dataset/kasus09_mode_choice.csv"
    wide, cols, info = build_features(csv)
    print(json.dumps(info, indent=2, ensure_ascii=False))
    print(f"\nBentuk wide: {wide.shape} (harus 210 individu)")
    print(f"Jumlah fitur: {len(cols)}")
    print("Contoh kolom:", cols[:8], "...")
    print(wide[cols + [TARGET]].head(3).to_string())