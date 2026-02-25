document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("timeline-container");

    // Dataset lengkap Supabase dengan Deskripsi Premium & 3 Tujuan Pembelajaran
    const nodes = [
        // Bab 1
        {
            id: "1.1", group: "DL", title: "Setup Database Perpustakaan", icon: "fa-solid fa-server",
            desc: "Langkah inisiasi platform. Membuat environment ruang kerja baru di Supabase siap pakai layaknya infrastruktur Server Production mandiri.",
            tujuan: ["Membuat dan mengenali antarmuka Dashboard Supabase", "Mempersiapkan konfigurasi inisial project", "Memahami konsep Backend-as-a-Service (BaaS)"]
        },
        {
            id: "1.2", group: "DL", title: "Relasi Tabel Entitas (DDL)", icon: "fa-solid fa-table",
            desc: "Menyusun kerangka fondasi penyimpanan. Mendefinisikan tabel master Buku, Anggota, dan Petugas dilengkapi kolom tipe data spesifik.",
            tujuan: ["Mendefinisikan tipe data (Integer, Varchar, UUID)", "Mengatur Primary Key dan Not Null constraints", "Menyusun Foreign Key untuk relasional"]
        },
        {
            id: "1.3", group: "DL", title: "Modifikasi Struktur (Alter Table)", icon: "fa-solid fa-pen-to-square",
            desc: "Sistem yang baik harus fleksibel. Mempelajari instruksi pengubahan struktur tata letak (alter) ketika sudah terlanjur berjalan.",
            tujuan: ["Menambah dan menghapus kolom (Add/Drop Column)", "Mengganti tipe data kolom eksisting", "Menambahkan constraint unik baru"]
        },

        // Bab 2
        {
            id: "2.1", group: "BQ", title: "Input Data Dasar (Insert)", icon: "fa-solid fa-file-import",
            desc: "Menghidupkan tabel kosong dengan skema pengisian data (Data Manipulation). Mengisi katalog buku masuk dan peserta didik baru.",
            tujuan: ["Menulis kueri INSERT INTO dasar", "Menambahkan multiple records dalam 1 kueri (Bulk Insert)", "Menyisipkan data lewat visual antarmuka Editor"]
        },
        {
            id: "2.2", group: "BQ", title: "Pembaruan & Penghapusan (Update/Delete)", icon: "fa-solid fa-trash-can-arrow-up",
            desc: "Daur hidup data tidak statis. Merevisi stok buku yang dipinjam serta melenyapkan data anggota yang sudah kadaluarsa kelulusan.",
            tujuan: ["Menggunakan instruksi UPDATE aman dengan WHERE", "Memahami cara kerja DELETE hati-hati", "Memulihkan rekam jejak revisi (opsional)"]
        },
        {
            id: "2.3", group: "BQ", title: "Seleksi Berdasarkan Kategori (Select)", icon: "fa-solid fa-list-ul",
            desc: "Daftar pencarian. Memanggil sekumpulan laporan detail buku secara spesifik dari kategori pelajaran tertentu saja.",
            tujuan: ["Mempraktikan klausa pengkondisian dasar (WHERE)", "Mengkombinasikan filter persamaan spesifik", "Menampilkan sebagian kolom (Projection)"]
        },

        // Bab 3
        {
            id: "3.1", group: "RQ", title: "Filter Multi-Kondisional", icon: "fa-solid fa-filter",
            desc: "Mengecilkan cakupan laporan pencarian dengan gabungan dua syarat: Stok fisik masih tersedia DI ATAS 0 DALAM rak referensi spesifik.",
            tujuan: ["Menerapkan operator logika (AND, OR, NOT)", "Menerapkan operator perbandingan numerik (>, <, >=)", "Mengatur hierarki tanda kurung pencarian"]
        },
        {
            id: "3.2", group: "RQ", title: "Agregasi Fungsi SQL", icon: "fa-solid fa-calculator",
            desc: "Database bukan asisten pencatat biasa, ia juga pintar berhitung! Menjumlahkan keseluruhan total inventaris per barisan lemari.",
            tujuan: ["Menerapkan fungsi hitung (COUNT, SUM)", "Menghitung rata-rata frekuensi peminjaman (AVG)", "Mengelompokkan kalkulasi kategori (GROUP BY)"]
        },
        {
            id: "3.3", group: "RQ", title: "Pencarian Text Cerdas (LIKE/ILIKE)", icon: "fa-solid fa-magnifying-glass",
            desc: "Simulasi kolom 'Search Bar' di aplikasi. Mencari laporan jurnal hanya dari rentang tahun rilis atau potongan cuplikan judul.",
            tujuan: ["Praktik filter rentang waktu (BETWEEN)", "Melakukan pencarian kata kunci Wildcard (LIKE / ILIKE)", "Menangani huruf kapital dan kecil pencari (Case-insensitive)"]
        },

        // Bab 4
        {
            id: "4.1", group: "DL", title: "Analisis Status Anggota", icon: "fa-solid fa-scale-balanced",
            desc: "Memisahkan dua golongan peserta (aktif meminjam vs buronan tidak memulangkan) sebagai rujukan evaluasi kedisiplinan per semester.",
            tujuan: ["Menggunakan tipe data Boolean/Enum", "Menyusun skema klasifikasi IF/CASE bersyarat", "Mengisolasi dua himpunan data komparasi"]
        },
        {
            id: "4.2", group: "DL", title: "Limit & Ranking Query", icon: "fa-solid fa-clock-rotate-left",
            desc: "Menu utama pustakawan: Mencegah error macet server memuat jutaan buku dengan hanya memanggil ranking Top 10 Buku rilis teratas.",
            tujuan: ["Mengurutkan arah urutan data (ORDER BY ASC/DESC)", "Membatasi maksimum jumlah panggil (LIMIT)", "Membuat mekanisme penomoran halaman (Pagination)"]
        },

        // Bab 5
        {
            id: "5.1", group: "BQ", title: "Relasi Join Antar Tabel", icon: "fa-solid fa-link",
            desc: "Titik temu kekuatan rasio. Merangkum ID Buku, Nama Peserta, dan riwayat Pinjam menjadi 1 tampilan struk laporan gabungan utuh.",
            tujuan: ["Mempelajari konsep irisan data (INNER JOIN)", "Mempelajari penggabungan prioritas batas (LEFT/RIGHT JOIN)", "Menyelesaikan masalah relasi Many-to-Many"]
        },

        // Bab 6
        {
            id: "6.1", group: "RQ", title: "RLS & Akses Keamanan (Security)", icon: "fa-solid fa-user-shield",
            desc: "Sistem tanpa gembok akan diretas. Mengamankan tabel menggunakan Row Level Security Supabase pemisah akun Admin vs Anggota Umum.",
            tujuan: ["Menerapkan kebijakan pembatasan baca (SELECT Policies)", "Mengamankan otoritas pengubahan data (INSERT/UPDATE/DELETE)", "Mengunci perlindungan endpoint API otomatis"]
        },
        {
            id: "6.2", group: "RQ", title: "Mini Project: Sistem Peminjaman", icon: "fa-solid fa-book-open-reader",
            desc: "Waktunya menjahit semua puzzle. Menyatukan pendaftaran siswa, buku, dan tabel riwayat transaksi (trigger logika peminjaman) penuh.",
            tujuan: ["Menyusun skema sistem perpustakaan 100% jadi", "Menghubungkan setidaknya 4 tabel berelasi", "Mensimulasikan input transaksi kompleks via Supabase"]
        },
        {
            id: "6.3", group: "RQ", title: "Uji Coba Project (Debugging)", icon: "fa-solid fa-bug-slash",
            desc: "Sesi stres tes: Mencoba menemukan celah pada skema yang telah dirakit, menangani respon error saat meminjam buku ketika stok sudah habis.",
            tujuan: ["Mengedukasi pengecekan batas stok sistem", "Memperbaiki penamaan query/relasi rusak", "Menangani respon error database (Error Handling)"]
        },
        {
            id: "6.4", group: "DL", title: "Finalisasi & Demo Perpus", icon: "fa-solid fa-display",
            desc: "Pekan presentasi puncak: Mendemonstrasikan kelancaran operasi perpustakaan yang dibangun murni tanpa bantuan Frontend visual koding.",
            tujuan: ["Merapikan tata letak Source Code Query SQL", "Menjelaskan logika operasi secara publik", "Menanggapi studi kasus interaktif penguji"]
        },
        {
            id: "6.5", group: "DL", title: "Pemetaan ERD Terstruktur", icon: "fa-solid fa-diagram-project",
            desc: "Mengubah wujud abstraksi kode panjang ke dalam satu gambar bagan diagram Entity-Relationship profesional berskala industri.",
            tujuan: ["Menganalisis Entitas Utama", "Melukis relasi relasional Cardinalitas (1:N, N:M)", "Medokumentasikan Skema Visual (Database Blueprint)"]
        },
        {
            id: "6.6", group: "DL", title: "Evaluasi UAS & Refleksi", icon: "fa-solid fa-graduation-cap",
            desc: "Tahap reflektif akhir guna merivew kekuatan pemahaman siswa atas semua materi yang telah diajarkan pada semester ini.",
            tujuan: ["Mengerjakan evaluasi logika Query tulisan", "Merumuskan tantangan terbesar selama projek", "Melakukan self-assessment pencapaian target kerja"]
        },

        // Bab SDLC
        {
            id: "7.1", group: "BQ", title: "Analisis Kebutuhan (SDLC)", icon: "fa-solid fa-clipboard-list",
            desc: "Mundur selangkah layaknya Sistem Analis. Mempelajari praktik mewawancarai calon klien terkait kebutuhan entitas data perpustakaan sungguhan.",
            tujuan: ["Menganalisis Data Requirements dari narasi", "Mengeliminasi entitas yang tidak relevan", "Merumuskan scope ukuran database"]
        },
        {
            id: "7.2", group: "BQ", title: "Merancang ERD Konseptual", icon: "fa-solid fa-lightbulb",
            desc: "Draft awal. Menjabarkan garis besar objek-objek utama tanpa pusing masalah teknis atau relasi kunci tipe data (Brainstorming Entity).",
            tujuan: ["Mengidentifikasi objek nyata sistem", "Memberikan karakteristik awal pada objek", "Memetakan diagram konsep bebas batas"]
        },
        {
            id: "7.3", group: "BQ", title: "Merancang ERD Logis", icon: "fa-solid fa-sitemap",
            desc: "Mengasah draft dasar tersebut menjadi struktur teknikal pasti, siap dibaca oleh sistem Database Management manapun di dunia.",
            tujuan: ["Menspesifikasi panjang lebar Tipe Data akurat", "Mengkomunikasikan Primary & Foreign Keys lengkap", "Menstandarisasi nama kolom tabel"]
        },
        {
            id: "7.4", group: "RQ", title: "Normalisasi Skema Arsitektur", icon: "fa-solid fa-database",
            desc: "Mencegah data bertumpuk-ganda dan bengkak (Redudansi). Memecah tabel besar tunggal membosankan menjadi bagian efisien kecil gesit terhubung.",
            tujuan: ["Memenuhi aturan First Normal Form (1NF)", "Memenuhi aturan Second Normal Form (2NF)", "Menangani Dependency Transitive (3NF)"]
        },
        {
            id: "7.5", group: "RQ", title: "Implementasi Supabase Cloud", icon: "fa-solid fa-cloud-arrow-up",
            desc: "Menerbangkan rancangan kertas ERD matang menuju langit awan (Deployment Cloud). Migrasi skema konvensional ke platform canggih Supabase.",
            tujuan: ["Menerjemahkan ERD Diagram ke platform GUI Web", "Menetapkan batas Relasi Constraints via Cloud UI", "Memvalidasi keberhasilan Sinkronisasi Sink Table"]
        },
        {
            id: "7.6", group: "RQ", title: "Produk Proyek Backend Final", icon: "fa-solid fa-rocket",
            desc: "Puncak keahlian penuh. Mengakses database berbasis awan lalu membangunnya menjadi integrasi mandiri di produk asli pengembangan aplikasi sekolah.",
            tujuan: ["Menyajikan API terpadu (Application Programming Interface)", "Mampu melakukan testing POST/GET Data via RESTful Endpoint Supabase", "Menguasasi Fondasi Database Mutlak sebelum masuk Front-end."]
        }
    ];

    let html = "";
    nodes.forEach((node, index) => {
        let tujuanLis = node.tujuan.map(t => `<li><i class="fa-solid fa-check-circle" style="color:var(--supa-green); margin-right:8px;"></i>${t}</li>`).join("");

        // Alternasi kiri-kanan untuk desktop
        const positionClass = (index % 2 === 0) ? "left" : "right";

        let colorThemeIcon = "";
        let colorThemeLi = "";
        if (node.group === "DL") { colorThemeIcon = "#60A5FA"; }
        else if (node.group === "RQ") { colorThemeIcon = "#FBBF24"; }
        else { colorThemeIcon = "var(--supa-green)"; }

        let bulletLists = node.tujuan.map(t => `<li><i class="fa-solid fa-check-circle" style="color:${colorThemeIcon}; margin-right:8px;"></i>${t}</li>`).join("");

        html += `
            <div class="node-row ${positionClass}" data-group="${node.group}" id="row-${index}">
                <div class="node-card">
                    <div class="node-header">
                        <div class="header-content">
                            <div class="node-icon"><i class="${node.icon}"></i></div>
                            <h4 class="node-title">${node.title}</h4>
                        </div>
                        <div class="node-badge">Bab P.${node.id}</div>
                    </div>
                    <div class="node-body">
                        <p class="node-desc">${node.desc}</p>
                        <div class="tujuan-box">
                            <h5 class="tujuan-title"><i class="fa-solid fa-bullseye"></i> Tujuan Pembelajaran:</h5>
                            <ul class="tujuan-list">
                                ${bulletLists}
                            </ul>
                        </div>
                    </div>
                    <!-- Connector Dot Support Root line -->
                    <div class="connector-dot"></div>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;

    // --- LOGIKA MENGGAMBAR AKAR CABANG (SVG) RESPONSIVE ---
    function drawRoots() {
        const svg = document.getElementById("timeline-svg");
        const rows = document.querySelectorAll(".node-row");
        const wrapper = document.querySelector(".roadmap-wrapper");

        let svgHTML = `
            <defs>
                <linearGradient id="root-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#3ECF8E"/>
                    <stop offset="50%" stop-color="#24b47e"/>
                    <stop offset="100%" stop-color="#2A4365"/>
                </linearGradient>
            </defs>
        `;

        const isMobile = window.innerWidth <= 900;

        // Desktop = Tengah (50%), Mobile = Kiri Merapat (40px)
        const trunkX = isMobile ? 40 : wrapper.offsetWidth / 2;
        let lastTrunkY = 0;

        rows.forEach((row, index) => {
            const isLeft = !isMobile && row.classList.contains("left");
            const card = row.querySelector(".node-card");

            const wrapRect = wrapper.getBoundingClientRect();
            const rowRect = row.getBoundingClientRect();
            const cardRect = card.getBoundingClientRect();

            // Y di pertengahan Card
            const nodeY = (rowRect.top - wrapRect.top) + (cardRect.height / 2);

            let nodeX;
            if (isMobile) {
                // Tarik simpulan garis masuk ke pinggir Kiri Card
                nodeX = (cardRect.left - wrapRect.left);
            } else {
                // Tarik simpulan ke sisi dalam Card hadap ke Trunk
                nodeX = isLeft ? (cardRect.right - wrapRect.left) : (cardRect.left - wrapRect.left);
            }

            // Atur posisi CSS Connector Dot agar nempel presisi
            const dot = row.querySelector(".connector-dot");
            if (isMobile) {
                dot.style.left = "-8px"; dot.style.right = "auto";
                dot.style.top = "50%"; dot.style.transform = "translateY(-50%)";
            } else {
                if (isLeft) { dot.style.right = "-8px"; dot.style.left = "auto"; }
                else { dot.style.left = "-8px"; dot.style.right = "auto"; }
                dot.style.top = "50%"; dot.style.transform = "translateY(-50%)";
            }

            // Kurva menggambar sambungan dari batang ke kartu
            const controlY = Math.max(lastTrunkY, nodeY - 60);

            svgHTML += `
                <path class="root-path"
                      d="M ${trunkX},${controlY} C ${trunkX},${nodeY} ${(trunkX + nodeX) / 2},${nodeY} ${nodeX},${nodeY}" 
                      fill="none" stroke="url(#root-grad)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
            `;

            // Perpanjangan utama batang (trunk)
            if (controlY > lastTrunkY) {
                svgHTML += `<path class="trunk-path" d="M ${trunkX},${lastTrunkY} L ${trunkX},${controlY + 1}" fill="none" stroke="url(#root-grad)" stroke-width="8" stroke-linecap="round"/>`;
            }
            lastTrunkY = controlY;
        });

        // Mempertahankan sedikit juntaian ke bawah di akhir materi
        svgHTML += `<path class="trunk-path" d="M ${trunkX},${lastTrunkY} L ${trunkX},${lastTrunkY + 80}" fill="none" stroke="url(#root-grad)" stroke-width="8" stroke-linecap="round"/>`;

        svg.innerHTML = svgHTML;
    }

    setTimeout(drawRoots, 300);
    window.addEventListener("resize", () => {
        clearTimeout(window.resizeTimer);
        window.resizeTimer = setTimeout(drawRoots, 200);
    });

    // Menjalankan fade-in bergantian
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(".node-row").forEach((row, i) => {
        row.style.transitionDelay = `${(i % 5) * 0.1}s`;
        observer.observe(row);
    });
});
