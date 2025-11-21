export function initDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const infoId = urlParams.get('id');
    
    loadDetail(infoId);
}

async function loadDetail(infoId) {
    if (!infoId) {
        window.location.href = 'index.html';
        return;
    }

    try {
        const response = await fetch(`api/read.php?id=${infoId}`);
        const data = await response.json();
        const container = document.getElementById('detailContent');

        if (!container) return;

        if (data.success && data.data) {
            const info = data.data;
            container.innerHTML = `
                <div class="detail-content">
                    <div class="row">
                        <div class="col-md-6 mb-4">
                            <img src="${info.image_url}" alt="${info.title}" class="detail-image">
                        </div>
                        <div class="col-md-6">
                            <span class="badge bg-primary mb-3">${info.category}</span>
                            <h1 class="mb-4">${info.title}</h1>
                            <p class="lead">${info.description}</p>
                            <hr>
                            <p class="text-muted">
                                <i class="fas fa-clock"></i> 
                                Dibuat: ${new Date(info.created_at).toLocaleDateString('id-ID')}
                            </p>
                        </div>
                    </div>
                </div>
            `;
        } else {
            container.innerHTML = `
                <div class="alert alert-warning text-center">
                    <i class="fas fa-exclamation-triangle"></i> Data tidak ditemukan
                </div>
            `;
        }
    } catch (error) {
        console.error('Error:', error);
        const container = document.getElementById('detailContent');
        if(container) {
            container.innerHTML = `
                <div class="alert alert-danger text-center">
                    <i class="fas fa-times-circle"></i> Gagal memuat data
                </div>
            `;
        }
    }
}