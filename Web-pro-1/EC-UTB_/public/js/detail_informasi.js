function formatDateIndo(dateString) {
  if (!dateString) return "-";
  const date = new Date(dateString);
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return date.toLocaleDateString("id-ID", options);
}

function openDetailModal(user) {
  // 1. Isi Data ke Element HTML
  document.getElementById("detail_nama").innerText = user.nama;
  document.getElementById("detail_email").innerText = user.email;
  document.getElementById("detail_nim").innerText = user.nim;
  document.getElementById("detail_jurusan").innerText = user.jurusan;
  document.getElementById("detail_angkatan").innerText = user.angkatan;
  // Handle jika alasan null/kosong
  document.getElementById("detail_alasan").innerText = user.alasan
    ? `"${user.alasan}"`
    : "- Tidak ada alasan -";

  const initials = user.nama
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  document.getElementById("detail_initials").innerText = initials;

  const statusBadge = document.getElementById("detail_status_badge");
  let statusText = "";
  let statusClass = "";

  if (user.is_approved == 0) {
    statusText = "Pending Approval";
    statusClass = "bg-gray-100 text-gray-800";
  } else {
    switch (user.status_keanggotaan) {
      case "pengurus":
        statusText = "Pengurus";
        statusClass = "bg-purple-100 text-purple-800";
        break;
      case "anggota_aktif":
        statusText = "Anggota Aktif";
        statusClass = "bg-green-100 text-green-800";
        break;
      case "anggota_pasif":
        statusText = "Anggota Pasif";
        statusClass = "bg-yellow-100 text-yellow-800";
        break;
      default:
        statusText = user.status_keanggotaan;
        statusClass = "bg-gray-100 text-gray-800";
    }
  }

  statusBadge.innerText = statusText;
  statusBadge.className = `px-2 py-1 rounded text-xs font-semibold ${statusClass}`;

  // 4. Paraphrase Created_at dan Updated_at
  // Contoh: "Bergabung sejak 12 Januari 2025"
  document.getElementById("detail_created_at").innerText =
    "Bergabung sejak: " + formatDateIndo(user.created_at);

  // Contoh: "Data terakhir diperbarui pada 13 Januari 2025"
  document.getElementById("detail_updated_at").innerText =
    "Terakhir diperbarui: " + formatDateIndo(user.updated_at);

  // 5. Tampilkan Modal
  document.getElementById("detailModal").classList.remove("hidden");

}

function closeDetailModal() {
  document.getElementById("detailModal").classList.add("hidden");
}

// Tutup modal jika klik di luar area modal
window.onclick = function (event) {
  const modal = document.getElementById("detailModal");
  if (event.target == modal) {
    closeDetailModal();
  }
};
