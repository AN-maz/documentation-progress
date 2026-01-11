document.addEventListener("DOMContentLoaded", function () {
  const ctxBar = document.getElementById("userChart").getContext("2d");
  const ctxPie = document.getElementById("userPieChart").getContext("2d");
  const filterJurusan = document.getElementById("filterJurusan");

  let myBarChart;
  let myPieChart;

  function initChart(labels, values) {
    const colors = ["#3b82f6", "#10b981", "#f59e0b"];

    if (myBarChart) {
      myBarChart.data.labels = labels;
      myBarChart.data.datasets[0].data = values;
      myBarChart.update();
    } else {
      myBarChart = new Chart(ctxBar, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Jumlah Anggota Terdaftar",
              data: values,
              backgroundColor: colors.map(color => color + "CC"), 
              borderRadius: 8,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 1000,
            easing: 'easeOutQuart'
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: { stepSize: 1 },
            },
          },
        },
      });
    }

    if (myPieChart) {
      myPieChart.data.labels = labels;
      myPieChart.data.datasets[0].data = values;
      myPieChart.update();
    } else {
      myPieChart = new Chart(ctxPie, {
        type: "pie",
        data: {
          labels: labels,
          datasets: [
            {
              data: values,
              backgroundColor: colors,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false, 
          animation: {
            duration: 1000,
            easing: 'easeOutQuart'
          },
        },
      });
    }
  }

  function fetchData(jurusan = "All") {

    const jurusanUrl = jurusan.replace(/\s+/g, "_");

    fetch(`${window.base_url}/api/dashboardapi/stats/${jurusanUrl}`)
      .then((response) => {
        if (!response.ok) {
           throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((res) => {
        // Validasi data sebelum melakukan pemetaan (map)
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          const labels = res.data.map((item) =>
            item.status_keanggotaan.replace("_", " ").toUpperCase()
          );
          const values = res.data.map((item) => item.total);
          initChart(labels, values);
        } else {
          // Jika data kosong, reset grafik ke angka 0
          initChart(["PENGURUS", "ANGGOTA AKTIF", "ANGGOTA PASIF"], [0, 0, 0]);
        }
      })
      .catch((err) => console.error("Error loading stats:", err));
  }

  // Event listener untuk dropdown filter
  filterJurusan.addEventListener("change", (e) => {
    fetchData(e.target.value);
  });

  // Load awal saat halaman dibuka
  fetchData();
});
