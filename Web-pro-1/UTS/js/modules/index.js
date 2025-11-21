export function initIndex() {
    // Jadikan fungsi ini global agar bisa dipanggil dari onclick di HTML string
    window.goToDetail = (id) => {
        window.location.href = `detail.html?id=${id}`;
    };

    loadCompanyInfo();
}

async function loadCompanyInfo() {
    try {
        // Pastikan path API benar relatif dari file HTML
        const response = await fetch('api/read.php');
        const data = await response.json();
        const container = document.getElementById('infoContainer');
        
        if (!container) return; // Jaga-jaga kalau elemen tidak ada

        container.innerHTML = '';

        if (data.success && data.data.length > 0) {
            data.data.forEach(info => {
                container.innerHTML += `
                    <div class="col-md-4 mb-4">
                        <div class="card info-card" onclick="goToDetail(${info.id})">
                            <img src="imgs/${info.image_url}" class="card-img-top" alt="${info.title}">
                            <div class="card-body">
                                <h5 class="card-title">${info.title}</h5>
                                <p class="card-text">${info.description.substring(0, 100)}...</p>
                                <span class="badge bg-primary">${info.category}</span>
                            </div>
                        </div>
                    </div>
                `;
            });
        } else {
            container.innerHTML = '<p class="text-center">Data tidak tersedia</p>';
        }
    } catch (error) {
        console.error('Error:', error);
        const container = document.getElementById('infoContainer');
        if(container) container.innerHTML = '<p class="text-center text-danger">Gagal memuat data</p>';
    }
}