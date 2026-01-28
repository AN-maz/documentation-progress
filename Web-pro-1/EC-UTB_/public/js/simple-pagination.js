document.addEventListener('DOMContentLoaded', function () {

    // ===== KONFIGURASI =====
    const rowsPerPage = 5;
    // ======================

    const tableBody = document.getElementById('tableBody');
    const paginationContainer = document.getElementById('paginationBtnContainer');
    const searchInput = document.getElementById('searchInput');

    if (!tableBody || !paginationContainer) return;

    // Ambil semua baris awal
    const allRows = Array.from(tableBody.querySelectorAll('.table-row-item'));
    let filteredRows = [...allRows];
    let currentPage = 1;

    // Info text
    const startRowEl = document.getElementById('startRow');
    const endRowEl = document.getElementById('endRow');
    const totalRowsEl = document.getElementById('totalRows');

    // ===== SEARCH =====
    if (searchInput) {
        searchInput.addEventListener('keyup', function (e) {
            const keyword = e.target.value.toLowerCase();

            filteredRows = allRows.filter(row =>
                row.textContent.toLowerCase().includes(keyword)
            );

            currentPage = 1;
            updateTable();
        });
    }

    // ===== CORE FUNCTION =====
    function updateTable() {
        const totalRows = filteredRows.length;
        const totalPages = Math.ceil(totalRows / rowsPerPage);

        // Validasi halaman
        if (currentPage < 1) currentPage = 1;
        if (currentPage > totalPages && totalPages > 0) currentPage = totalPages;

        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        // 1. Sembunyikan semua baris
        allRows.forEach(row => row.style.display = 'none');

        // 2. Tampilkan data sesuai search + pagination
        filteredRows.forEach((row, index) => {
            if (index >= start && index < end) {
                row.style.display = '';
            }
        });

        // 3. Update info text
        if (startRowEl) startRowEl.textContent = totalRows === 0 ? 0 : start + 1;
        if (endRowEl) endRowEl.textContent = Math.min(end, totalRows);
        if (totalRowsEl) totalRowsEl.textContent = totalRows;

        // 4. Render tombol
        renderButtons(totalPages);
    }

    // ===== PAGINATION BUTTON =====
    function renderButtons(totalPages) {
        paginationContainer.innerHTML = '';

        if (totalPages <= 1) return;

        // Prev
        const prevBtn = document.createElement('button');
        prevBtn.innerText = 'Prev';
        prevBtn.className = `px-3 py-1 rounded-l border border-gray-300 text-sm font-medium
            ${currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50'}`;
        prevBtn.disabled = currentPage === 1;
        prevBtn.onclick = () => {
            if (currentPage > 1) {
                currentPage--;
                updateTable();
            }
        };
        paginationContainer.appendChild(prevBtn);

        // Next
        const nextBtn = document.createElement('button');
        nextBtn.innerText = 'Next';
        nextBtn.className = `px-3 py-1 rounded-r border-t border-b border-r border-gray-300 text-sm font-medium
            ${currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50'}`;
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.onclick = () => {
            if (currentPage < totalPages) {
                currentPage++;
                updateTable();
            }
        };
        paginationContainer.appendChild(nextBtn);
    }

    // ===== INIT =====
    updateTable();
});
