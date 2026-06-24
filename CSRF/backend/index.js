const express = require("express");
const db = require("./db");
require("dotenv").config();

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/dashboard", async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM users WHERE username = "Andrian"',
    );
    const user = rows[0];

    const transactions = [
      {
        id: 1,
        name: "Top Up OxiPay",
        corp: "Transfer via BCA",
        icon: "💳",
        amount: "+ Rp 500.000",
        change: "Berhasil",
        color: "text-green-400",
      },
      {
        id: 2,
        name: "Supergame Data",
        corp: "Paket Internet 15GB",
        icon: "📱",
        amount: "- Rp 75.000",
        change: "Berhasil",
        color: "text-gray-400",
      },
      {
        id: 3,
        name: "Mie Galaxy",
        corp: "Food Delivery",
        icon: "🍜",
        amount: "- Rp 45.500",
        change: "+ 15 OxiPoints",
        color: "text-blue-400",
      },
    ];

    res.render("dashboard", {
      user: user,
      transactions: transactions,
      oxiLight: "#0051D2",
      oxiDark: "#001A57",
    });
  } catch (err) {
    res.status(500).send("Database Error");
  }
});

app.post("/checkout", async (req, res) => {
  const { total_harga, kirim_ke } = req.body;

  try {
    await db.query(
      'UPDATE users SET shopeepay_saldo = shopeepay_saldo - ? WHERE username = "Andrian"',
      [total_harga],
    );

    console.log(
      `[ALERT] Berhasil checkout sebesar Rp ${total_harga} dikirim ke ${kirim_ke}`,
    );

    res.send(`
    <!DOCTYPE html>
    <html lang="id">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pesanan Berhasil</title>
        <!-- Tailwind CSS CDN -->
        <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-[#0d1117] h-screen w-screen flex items-center justify-center overflow-hidden font-sans">
        
        <!-- Background Overlay -->
        <div class="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"></div>

        <!-- Custom Pop-up Modal -->
        <div class="relative z-50 bg-[#1b2838] border border-sky-500 rounded-lg shadow-[0_0_30px_rgba(71,191,255,0.2)] max-w-sm w-full p-6 text-center transform scale-100 animate-[bounce_0.3s_ease-out]">
            
            <!-- Icon Success (Checkmark) -->
            <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-500/20 border border-green-400 mb-4 shadow-[0_0_15px_rgba(74,222,128,0.4)]">
                <svg class="h-8 w-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
            </div>

            <!-- Title & Message -->
            <h3 class="text-xl font-black text-white mb-2 tracking-wide text-shadow">Pesanan Berhasil!</h3>
            <p class="text-sm text-gray-400 mb-6 leading-relaxed">
                Saldo terpotong <span class="text-sky-400 font-bold">Rp. ${total_harga}</span>.<br>
                Barang segera dikirim ke:<br>
                <span class="text-white bg-[#101822] px-2 py-1 rounded inline-block mt-2 border border-gray-700">${kirim_ke}</span>
            </p>

            <!-- Action Button -->
            <button id="btn-dashboard" class="w-full bg-gradient-to-r from-[#47bfff] to-[#1a44c2] hover:from-[#5ac8ff] hover:to-[#2255d4] text-white font-bold py-2.5 px-4 rounded shadow-[0_0_15px_rgba(71,191,255,0.3)] transition duration-200">
                Lanjutkan ke Dashboard
            </button>
        </div>

        <!-- Logic Redirect -->
        <script>
            // Menunggu user klik tombol untuk redirect
            document.getElementById('btn-dashboard').addEventListener('click', function() {
                // Opsional: Beri efek loading di tombol sebelum pindah
                this.innerHTML = 'Memuat...';
                window.location.href = '/dashboard';
            });

            // Opsional: Otomatis redirect setelah 5 detik jika user tidak klik
            setTimeout(function() {
                window.location.href = '/dashboard';
            }, 5000);
        </script>
    </body>
    </html>
`);
  } catch (err) {
    res.status(500).send("Gagal memproses pesanan");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Oxi-Shop berjalan di http://localhost:${PORT}/dashboard`),
);
