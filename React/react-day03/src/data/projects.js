export const showcaseContent = {
    title: "Showcase Angkatan 24",
    subtitle: "Bukti Nyata Dedikasi & Integritas",
    description: "Saksikan bagaimana ide-ide liar berubah menjadi produk digital yang bermanfaat. Ini adalah milestone pertama dari perjalanan panjang kami.",
    videoUrl: "/videos/demo.mp4",
    posterUrl: "/assets/thumbnail-video.png",
    videoPlaceholderText: "Video Recap Angkatan 24 Coming Soon"
};

export const projectsData = [
    {
        id: "smart-trash-bin",
        division: "Hardware",
        title: "Smart Trash Bin IoT",
        shortDescription: "Tempat sampah pintar dengan sensor otomatis dan monitoring via aplikasi Android.",
        fullDescription: "Smart Trash Bin ini dikembangkan untuk menjawab permasalahan sampah di lingkungan kampus. Menggunakan sensor ultrasonic dan servo, alat ini dapat mendeteksi keberadaan sampah dan membuka tutup otomatis. Integrasi modul ESP8266 memungkinkan data volume sampah dikirim realtime ke server. Sistem ini juga dilengkapi dengan notifikasi jika tempat sampah sudah penuh.",
        thumnail: "/thumnail/oxichat.png",
        videoDemoUrl: "/videos/demo.mp4", // Dummy path
        team: [
            { name: "Rizky", role: "Hardware Engineer" },
            { name: "Sari", role: "Software Integration" },
            { name: "Dimas", role: "Mechanic Design" }
        ]
    },
    {
        id: "oxichat",
        division: "Software",
        title: "Oxichat App",
        shortDescription: "Aplikasi absensi berbasis QR Code dan Geolocation untuk event kampus.",
        fullDescription: "Aplikasi ini dibuat menggunakan Flutter dan Firebase untuk memudahkan pendataan kehadiran. Fitur utamanya mencakup scan QR Code unik per event, validasi lokasi GPS radius 50m untuk mencegah kecurangan, dan rekapitulasi kehadiran otomatis yang bisa diekspor ke format Excel atau PDF.",
        thumnail: "/thumnail/oxichat.png", // User provided path
        videoDemoUrl: "/videos/demo.mp4", // Dummy path
        team: [
            { name: "Aditya Beckham", role: "Frontend Developer" },
            { name: "Alif Ihsan", role: "UI/UX Designer" },
            { name: "Andrian Maulana", role: "Backend Engineer" }
        ]
    },
    {
        id: "cyber-runner",
        division: "Game",
        title: "Cyber Runner 2077",
        shortDescription: "Game Endless Runner 3D dengan tema futuristic cyberpunk yang memacu adrenalin.",
        fullDescription: "Cyber Runner 2077 adalah game pertama dari divisi Game tahun ini yang dibangun dengan Unity Engine. Player mengontrol karakter cyborg yang harus menghindari rintangan neon di kota masa depan. Game ini memiliki fitur High Score global, power-up unik, dan sound design original yang imersif.",
        thumnail: "/thumnail/oxichat.png", // Placeholder using same path for now
        videoDemoUrl: "/videos/demo.mp4", // Dummy path
        team: [
            { name: "Aldi", role: "Game Designer" },
            { name: "Citra", role: "3D Artist" },
            { name: "Eko", role: "Gameplay Programmer" }
        ]
    }
];

export const heroContent = {
    tagline: "Build the Future, or Just Watch It Happen?",
    subTagline: "Jangan sampai Kelewatan Dah pokoknya. Saatnya beraksi bersama Oxigen.",
    ctaText: "Lihat Karya Kami",
};
