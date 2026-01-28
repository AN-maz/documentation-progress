// Fungsi Fetch Data Universal (Dipakai untuk Export & Populate Dropdown)
async function fetchExportData() {
  try {
    // Ambil nilai filter saat ini
    const jurusanElement = document.getElementById("filterJurusan");
    const angkatanElement = document.getElementById("filterAngkatan");

    const jurusanVal = jurusanElement ? jurusanElement.value : "All";
    const angkatanVal = angkatanElement ? angkatanElement.value : "All";

    // Buat URL dengan parameter
    const url = new URL(window.base_url + "/api/dashboardApi/export");

    url.searchParams.append("jurusan", jurusanVal);
    url.searchParams.append("angkatan", angkatanVal);

    const response = await fetch(url);
    if (!response.ok) throw new Error("Gagal mengambil data export");

    const result = await response.json();
    return result.data || []; // Pastikan return array
  } catch (error) {
    console.error("Error fetching export data:", error);
    return [];
  }
}

// --- POPULATE DROPDOWN TAHUN OTOMATIS (Jalan saat load) ---
document.addEventListener("DOMContentLoaded", async () => {
  console.log("Mengambil data angkatan...");
  const data = await fetchExportData();

  if (data.length > 0) {
    // Ambil tahun unik, buang yang null/kosong, urutkan terbaru
    const uniqueYears = [...new Set(data.map((item) => item.angkatan))]
      .filter((y) => y != null && y != "" && y != 0)
      .sort()
      .reverse();

    console.log("Angkatan ditemukan:", uniqueYears);

    const select = document.getElementById("filterAngkatan");
    // Reset opsi
    select.innerHTML = '<option value="All">Semua Angkatan</option>';

    uniqueYears.forEach((year) => {
      const option = document.createElement("option");
      option.value = year;
      option.textContent = `Angkatan ${year}`;
      select.appendChild(option);
    });
  } else {
    console.warn("Data anggota kosong atau angkatan belum diset.");
  }
});

// --- FUNGSI DOWNLOAD EXCEL ---
async function downloadExcel() {
  // (Isi fungsi downloadExcel kamu yang lama tetap sama,
  // karena dia memanggil fetchExportData yang sudah kita perbaiki di atas)
  try {
    const data = await fetchExportData();
    if (data.length === 0) {
      alert("Tidak ada data untuk diexport!");
      return;
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Daftar Anggota");

    // Definisi Kolom
    worksheet.columns = [
      {
        header: "NO",
        key: "no",
        width: 5,
      },
      {
        header: "ANGKATAN",
        key: "angkatan",
        width: 15,
      },
      {
        header: "NAMA LENGKAP",
        key: "nama",
        width: 35,
      },
      {
        header: "NIM",
        key: "nim",
        width: 20,
      },
      {
        header: "PROGRAM STUDI",
        key: "jurusan",
        width: 30,
      },
      {
        header: "STATUS",
        key: "status",
        width: 25,
      },
    ];

    data.forEach((u, index) => {
      worksheet.addRow({
        no: index + 1,
        angkatan: u.angkatan || "-",
        nama: u.nama.toUpperCase(),
        nim: u.nim,
        jurusan: u.jurusan,
        status: u.status_keanggotaan.replace("_", " ").toUpperCase(),
      });
    });

    // Style Header
    worksheet.getRow(1).font = {
      bold: true,
      color: {
        argb: "FFFFFF",
      },
    };
    worksheet.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: {
        argb: "4F81BD",
      },
    };

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), "Laporan_Anggota_EC.xlsx");
  } catch (error) {
    console.error("Excel Error:", error);
    alert("Gagal download Excel.");
  }
}

// --- FUNGSI DOWNLOAD PDF ---
async function downloadPDF() {
  // (Isi fungsi downloadPDF kamu yang lama tetap sama)
  try {
    const data = await fetchExportData();
    if (data.length === 0) {
      alert("Tidak ada data!");
      return;
    }

    const body = [
      [
        {
          text: "NO",
          style: "tableHeader",
        },
        {
          text: "ANGKATAN",
          style: "tableHeader",
        },
        {
          text: "NAMA",
          style: "tableHeader",
        },
        {
          text: "NIM",
          style: "tableHeader",
        },
        {
          text: "JURUSAN",
          style: "tableHeader",
        },
        {
          text: "STATUS",
          style: "tableHeader",
        },
      ],
    ];

    data.forEach((u, index) => {
      body.push([
        index + 1,
        u.angkatan || "-",
        u.nama,
        u.nim,
        u.jurusan,
        u.status_keanggotaan.toUpperCase(),
      ]);
    });

    const docDefinition = {
      content: [
        {
          text: "Laporan Data Anggota",
          style: "header",
          alignment: "center",
          margin: [0, 0, 0, 10],
        },
        {
          table: {
            headerRows: 1,
            widths: [20, 50, "*", "auto", "auto", "auto"],
            body: body,
          },
          layout: "lightHorizontalLines",
        },
      ],
      styles: {
        tableHeader: {
          bold: true,
          fontSize: 10,
          fillColor: "#eeeeee",
        },
      },
    };

    pdfMake.createPdf(docDefinition).download("Laporan_Anggota_EC.pdf");
  } catch (error) {
    console.error("PDF Error:", error);
  }
}
