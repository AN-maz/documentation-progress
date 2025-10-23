document.getElementById("learnMoreBtn").addEventListener("click", () => {
  const modalHTML = `
    <div class="modal fade" id="myModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title">Tentang Saya</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <p><strong>Nama:</strong> Andrian Maulana Dzikwan</p>
            <p><strong>Universitas:</strong> Universitas Teknologi Bandung</p>
            <p><strong>Semester:</strong> 3</p>
            <p><strong>Kemampuan:</strong></p>
            <ul>
              <li>Java (CLI & GUI)</li>
              <li>HTML, CSS, JS, Bootstrap</li>
            </ul>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
          </div>
        </div>
      </div>
    </div>`;

  document.getElementById("modalContainer").innerHTML = modalHTML;
  new bootstrap.Modal(document.getElementById("myModal")).show();
});

