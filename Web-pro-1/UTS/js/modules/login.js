export function initLogin() {
    // Cek session dulu
    if (window.sessionStorage.getItem('userData')) {
        window.location.href = 'dashboard.html';
        return;
    }

    const loginForm = document.querySelector('form');

    // Pastikan form ada sebelum pasang event listener
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
}

function showAlert(message, type) {
    const alertContainer = document.getElementById('alertContainer');
    alertContainer.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
}

async function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validasi kosong
    if (email === '') return showAlert('Email tidak boleh kosong!', 'danger');
    if (password === '') return showAlert('Password tidak boleh kosong!', 'danger');

    // Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return showAlert('Format email tidak valid!', 'danger');

    // Validasi panjang password
    if (password.length < 6) return showAlert('Password minimal 6 karakter!', 'danger');

    // Login Logic

    // Mulai proses login ke API
    try {
        const response = await fetch('api/auth/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const result = await response.json();

        if (result.success) {
            // Login Sukses

            // Tambahkan waktu login ke data user
            const userData = {
                ...result.data, // Mengambil data dari database (nama, email, dll)
                loginTime: new Date().toISOString()
            };

            // Simpan ke Session Storage
            window.sessionStorage.setItem('userData', JSON.stringify(userData));

            showAlert('Login berhasil! Mengalihkan...', 'success');

            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);

        } else {
            // Login Gagal (Password salah / Email tidak ada)
            showAlert(result.message, 'danger');
        }

    } catch (error) {
        console.error('Error:', error);
        showAlert('Terjadi kesalahan sistem. Coba lagi nanti.', 'danger');
    }

}