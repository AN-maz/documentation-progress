// File: js/modules/register.js

export function initRegister() {
    if (window.sessionStorage.getItem('userData')) {
        window.location.href = 'dashboard.html';
        return;
    }

    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
}

function showAlert(message, type) {
    const alertContainer = document.getElementById('alertContainer');
    if (alertContainer) {
        alertContainer.innerHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
    }
}

// Ubah jadi Async
async function handleRegister(event) {
    event.preventDefault();

    const nama = document.getElementById('nama').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validasi Frontend
    if (nama === '') return showAlert('Nama tidak boleh kosong!', 'danger');
    if (nama.length < 3) return showAlert('Nama minimal 3 karakter!', 'danger');
    if (email === '') return showAlert('Email tidak boleh kosong!', 'danger');
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return showAlert('Format email tidak valid!', 'danger');

    if (password === '') return showAlert('Password tidak boleh kosong!', 'danger');
    if (password.length < 6) return showAlert('Password minimal 6 karakter!', 'danger');
    if (confirmPassword === '') return showAlert('Konfirmasi password tidak boleh kosong!', 'danger');
    if (password !== confirmPassword) return showAlert('Password dan konfirmasi password tidak cocok!', 'danger');

    // Kirim ke Backend
    try {
        const response = await fetch('api/auth/register.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nama: nama,
                email: email,
                password: password
            })
        });

        const result = await response.json();

        if (result.success) {
            showAlert(result.message, 'success');
            document.getElementById('registerForm').reset();

            // Redirect ke login setelah 2 detik
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        } else {
            showAlert(result.message, 'danger'); // Misal: Email sudah ada
        }

    } catch (error) {
        console.error('Error:', error);
        showAlert('Terjadi kesalahan sistem. Coba lagi nanti.', 'danger');
    }
}