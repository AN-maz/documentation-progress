"""app.py — Aplikasi Streamlit untuk Kasus 9 (Pilihan Moda Transportasi).

Input : data mentah bentuk panjang (satu baris per alternatif moda),
        persis seperti file dataset asli -> dikonversi ke fitur lebar
        dengan fungsi yang sama seperti saat training (fitur.py).
Output: prediksi moda + probabilitas tiap kelas + metrik evaluasi.

Jalankan:  streamlit run app.py
"""

from __future__ import annotations

import json
from pathlib import Path

import joblib
import numpy as np
import pandas as pd
import streamlit as st

from fitur import raw_long_ke_fitur

BASE = Path(__file__).resolve().parent
PIPE_PATH = BASE / "models" / "best_pipeline.joblib"
META_PATH = BASE / "models" / "metadata.joblib"

st.set_page_config(page_title="Prediksi Moda Transportasi", layout="wide")


@st.cache_resource
def muat_model():
    if not PIPE_PATH.exists() or not META_PATH.exists():
        st.error(
            "Model belum ada. Jalankan `python latih.py` dulu untuk membuat "
            "`models/*.joblib`."
        )
        st.stop()
    return joblib.load(PIPE_PATH), joblib.load(META_PATH)


pipe, meta = muat_model()
feature_cols: list[str] = meta["feature_columns"]
class_labels: dict[int, str] = {int(k): v for k, v in meta["class_labels"].items()}


st.title("🚆 Prediksi Moda Transportasi")
st.caption(
    "Kasus 9 UTS AI — survei perjalanan non-bisnis Sydney–Canberra–Melbourne (1987). "
    "Isi 4 alternatif moda, lalu model memprediksi moda mana yang dipilih."
)

with st.form("input_form"):
    st.subheader("Atribut per individu")
    c1, c2 = st.columns(2)
    hinc = c1.number_input(
        "Pendapatan rumah tangga (hinc)", min_value=0.0, value=60.0, step=5.0
    )
    psize = c2.number_input(
        "Ukuran rombongan (psize)", min_value=1.0, value=2.0, step=1.0
    )

    st.subheader("Empat alternatif moda (1–4)")
    rows = {}
    cols = st.columns(4)
    mode_names = ["Moda 1", "Moda 2", "Moda 3", "Moda 4"]
    for i, name in enumerate(mode_names):
        with cols[i]:
            st.markdown(f"**{name}**")
            rows[i + 1] = {
                "ttme": st.number_input(
                    f"ttme — waktu tempuh ({name})", 0.0, 600.0, 30.0, key=f"ttme{i}"
                ),
                "invc": st.number_input(
                    f"invc — biaya dalam kendaraan ({name})",
                    0.0, 600.0, 20.0, key=f"invc{i}",
                ),
                "invt": st.number_input(
                    f"invt — waktu dalam kendaraan ({name})",
                    0.0, 900.0, 60.0, key=f"invt{i}",
                ),
                "gc": st.number_input(
                    f'gc — generalized cost ({name})',
                    0.0, 600.0, 40.0, key=f"gc{i}",
                ),
            }

    submitted = st.form_submit_button("Prediksi")

if submitted:
    # bangun frame mentah long (identik strukturnya dgn dataset)
    recs = []
    for mode, attrs in rows.items():
        rec = {"individual": 1.0, "mode": float(mode), "choice": 0.0, **attrs,
               "hinc": hinc, "psize": psize}
        recs.append(rec)
    raw = pd.DataFrame(recs)

    X_new = raw_long_ke_fitur(raw, feature_cols)
    proba = pipe.predict_proba(X_new)[0]
    # proba berurutan sesuai pipe.classes_ -> kode kelas asli (1-4), bukan indeks 0-3
    pred = int(pipe.classes_[int(np.argmax(proba))])
    label = class_labels.get(pred, str(pred))

    st.subheader("Hasil prediksi")
    st.success(f"**Moda yang diprediksi dipilih: {label}**  (kode kelas {pred})")

    st.subheader("Probabilitas tiap kelas")
    prob_df = pd.DataFrame(
        {
            "Moda": [class_labels[int(c)] for c in pipe.classes_],
            "Probabilitas": proba,
        }
    ).set_index("Moda")
    st.bar_chart(prob_df)

    with st.expander("Lihat probabilitas numerik"):
        st.dataframe(prob_df.style.format("{:.4f}"))

st.divider()
st.subheader("📊 Metrik evaluasi (data test)")
ev = meta["evaluasi_test"]
m1, m2, m3 = st.columns(3)
m1.metric("Accuracy", f"{ev['accuracy']:.4f}")
m2.metric("F1 macro", f"{ev['f1_macro']:.4f}")
m3.metric("Jumlah sampel test", ev["jumlah_test"])

st.caption(f"Model terpilih: **{meta['nama_model']}** (via 5-fold CV di data train)")

with st.expander("Classification report (per kelas)"):
    rep = pd.DataFrame(ev["classification_report"]).T
    st.dataframe(rep.style.format("{:.4f}"))

with st.expander("Confusion matrix (baris=aktual, kolom=prediksi)"):
    cm = pd.DataFrame(
        ev["confusion_matrix"],
        index=[class_labels[c] for c in sorted(class_labels)],
        columns=[class_labels[c] for c in sorted(class_labels)],
    )
    st.dataframe(cm)

with st.expander("Hasil cross-validation di data train"):
    st.json(json.dumps(meta["cv_hasil"], indent=2))