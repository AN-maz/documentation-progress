document.addEventListener("DOMContentLoaded", function () {
    const ctxBar = document.getElementById("userChart").getContext("2d");
    const ctxPie = document.getElementById("userPieChart").getContext("2d");

    const filterJurusan = document.getElementById("filterJurusan");
    const filterAngkatan = document.getElementById("filterAngkatan"); 
  
    let myBarChart;
    let myPieChart;

    const colorMap = {
        "PENGURUS": "#3b82f6",      
        "ANGGOTA AKTIF": "#10b981",  
        "ANGGOTA PASIF": "#f59e0b"   
    };
  
    function initChart(labels, values) {

      const backgroundColors = labels.map(label => colorMap[label] || "#9ca3af");
  
      if (myBarChart) {
        myBarChart.data.labels = labels;
        myBarChart.data.datasets[0].data = values;
        myBarChart.data.datasets[0].backgroundColor = backgroundColors;
        myBarChart.update();
      } else {
        myBarChart = new Chart(ctxBar, {
          type: "bar",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Jumlah Anggota",
                data: values,
                backgroundColor: backgroundColors,
                borderRadius: 6,
                barPercentage: 0.6,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false } 
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: { stepSize: 1 },
                grid: { borderDash: [2, 2] }
              },
              x: {
                grid: { display: false }
              }
            },
          },
        });
      }
  
      if (myPieChart) {
        myPieChart.data.labels = labels;
        myPieChart.data.datasets[0].data = values;
        myPieChart.data.datasets[0].backgroundColor = backgroundColors;
        myPieChart.update();
      } else {
        myPieChart = new Chart(ctxPie, {
          type: "doughnut", 
          data: {
            labels: labels,
            datasets: [
              {
                data: values,
                backgroundColor: backgroundColors,
                borderWidth: 2,
                hoverOffset: 4
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' }
            },
            cutout: '60%',
          },
        });
      }
    }
  
    function fetchData() {

      const jurusanVal = filterJurusan ? filterJurusan.value : 'All';
  
      const angkatanVal = filterAngkatan && filterAngkatan.value ? filterAngkatan.value : 'All';

      const url = new URL(`${window.base_url}/api/DashboardApi/stats`);
      url.searchParams.append('jurusan', jurusanVal);
      url.searchParams.append('angkatan', angkatanVal);
  
      fetch(url)
        .then((response) => {
          if (!response.ok) throw new Error('Network response was not ok');
          return response.json();
        })
        .then((res) => {
          if (res.data && Array.isArray(res.data) && res.data.length > 0) {
            
            // Format Label (Ganti underscore jadi spasi)
            const labels = res.data.map((item) =>
              item.status_keanggotaan.replace(/_/g, " ").toUpperCase()
            );
            const values = res.data.map((item) => item.total);
            
            initChart(labels, values);
          } else {
            // Jika data kosong (misal: Angkatan 2020 tidak ada yang aktif)
            // Tampilkan chart kosong
            initChart(["DATA KOSONG"], [0]);
          }
        })
        .catch((err) => console.error("Error loading stats:", err));
    }
  
    // Event listener untuk KEDUA dropdown
    if(filterJurusan) {
        filterJurusan.addEventListener("change", fetchData);
    }
    
    // Khusus Angkatan: Karena isinya diload via JS (async), kita pasang event listener
    // tapi fetchData baru akan efektif setelah option-nya terisi.
    if(filterAngkatan) {
        filterAngkatan.addEventListener("change", fetchData);
        
        // OBSERVER: Kita perlu mentrigger fetchData sekali lagi SETELAH opsi angkatan selesai dimuat oleh script di index.php
        // Cara simpel: Kita set timeout kecil atau panggil dari script index.php.
        // Tapi cara paling aman: Kita biarkan script di index.php yang memanggil populate selesai, baru chart update.
        // Agar tidak ribet, kita cukup set interval cek apakah dropdown sudah ada isinya.
        const checkExist = setInterval(() => {
            if (filterAngkatan.options.length > 1) { // Lebih dari 1 artinya 'All' + Tahun2
               fetchData(); // Refresh chart dengan data tahun yang default (All)
               clearInterval(checkExist);
            }
         }, 500);
    }
  
    // Load awal
    fetchData();
  });