document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("grid-container");

    // Dataset V2 Pendek - Fokus Pencapaian Karya Major (5 Mahakarya Supabase)
    const achievements = [
        {
            title: "Cetak Biru Integrasi Tabel Entitas (ERD)",
            icon: "fa-solid fa-sitemap",
            image: "Media/Affan11.png",
            author: "Affan (11)",
            desc: "Peta relasional matang membagi informasi menjadi tabel Buku, Siswa, dan Rak tanpa redudansi sampah data ganda.",
            tujuan: [
                "Draft Desain Blueprint Diagram Database Bisnis",
                "Fondasi tipe data kuat (UUID) tanpa crash file",
                "Integritas Tabel Data Anti-Duplikasi Otomatis"
            ],
            colorTheme: "#60A5FA",
            delay: "0.1s"
        },
        {
            title: "Mesin Logika Sirkulasi Pustaka",
            icon: "fa-solid fa-calculator",
            image: "Media/Rayhan11.png",
            author: "Rayhan (11)",
            desc: "Kerangka algoritma di balik layar yang sanggup mencatat masuknya buku, melacak yang dipinjam, hingga pendataan hitungan telat harian.",
            tujuan: [
                "Dashboard Fitur Input Log Peminjaman Massal",
                "Hitungan Stok Keluar Masuk Otomatis 24 Jam",
                "Nota Struk Silang Transaksi Permanen Tercipta"
            ],
            colorTheme: "var(--supa-green)",
            delay: "0.2s"
        },

        {
            title: "Pusat Endpoint Pelayanan Awan Siap Rilis",
            icon: "fa-solid fa-rocket",
            image: "Media/Muadz11.png",
            author: "Mu'adz (11)",
            desc: "Puncak kebanggaan! Database sukses di Orbitkan ke penyimpanan internet publik berkecepatan tinggi yang terus menyala dan menjawab data ke Aplikasi Frontend (API).",
            tujuan: [
                "Instalasi Server Database Mandiri Platform Supabase Cloud",
                "Sajian Portal Link Endpoint siap dimakan Aplikasi HP Siswa",
                "Peluncuran Demonstrasi Layanan Proyek ke Jajaran Guru"
            ],
            colorTheme: "#1ABCFE",
            delay: "0.3s"
        }
    ];

    let html = "";
    achievements.forEach((achieve, index) => {
        let resultLis = achieve.tujuan.map(t => `<li><i class="fa-solid fa-check-circle" style="color:${achieve.colorTheme}"></i> ${t}</li>`).join("");

        // Alternasi gambar kiri-kanan
        let alignmentClass = (index % 2 === 0) ? '' : 'image-right';

        html += `
            <div class="achievement-card ${alignmentClass}" style="animation-delay: ${achieve.delay}">
                <div class="project-image-box">
                    ${achieve.image ? `<img src="${achieve.image}" alt="${achieve.title}" class="project-image">
                    <div class="project-author"><i class="fa-solid fa-user-pen"></i> Karya: ${achieve.author}</div>` :
                `<div style="opacity: 0.2; color: var(--text-secondary);"><i class="fa-solid fa-database fa-4x"></i><br>Belum Ada Snapshot</div>`}
                </div>
                <div class="achievement-content">
                    <div class="achievement-icon" style="color: ${achieve.colorTheme}; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.5));">
                        <i class="${achieve.icon}"></i>
                    </div>
                    <h3 class="achievement-title">${achieve.title}</h3>
                    <p class="achievement-desc">${achieve.desc}</p>
                    
                    <ul class="result-list" style="border-left-color: ${achieve.colorTheme}">
                        ${resultLis}
                    </ul>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
});
