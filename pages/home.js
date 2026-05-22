pages.home = [
    // 1. CATCHY TITLE, BADGES, & SHORT DESCRIPTION (MENGGUNAKAN KOMPONEN HERO)
    {
        section: 'hero',
        title: 'Minimalist Client-Side Router & UI Engine',
        tagline: 'Zero-Dependency, Structured Data-Driven Micro-Framework for Modern Web Portals.',
        description: 'Sebuah framework rendering sisi klien (CSR) ultra-ringan yang mengubah data terstruktur (JSON) menjadi antarmuka dinamis secara langsung tanpa langkah build (no-build step). Dirancang khusus untuk efisiensi tinggi, modularitas berbasis komponen, dan eksekusi secepat kilat.',
        badges: [
            'Vanilla JS',
            'Zero-Dependency',
            'No-Build Step',
            'JSON-Driven Architecture',
            'License: MIT',
            'DOI: 10.5281/zenodo.XXXXXXXX'
        ],
        cta: {
            text: 'Mulai Belajar Modul',
            link: 'learn'
        },
        imgClass: 'di-donat' // Menggunakan class icon/SVG bawaan sistem Anda
    },

    // 2. KEY FEATURES (MENGGUNAKAN KOMPONEN FEATURES)
    {
        section: 'features',
        items: [
            {
                icon: 'di-code',
                title: 'JSON-Driven UI',
                content: 'Seluruh layout dan konten didefinisikan via skema data terstruktur (JSON). Mengurangi overhead pengelolaan DOM manual secara signifikan.',
                linkText: 'Lihat Editor &raquo;',
                linkTarget: 'editor'
            },
            {
                icon: 'di-web',
                title: 'Micro Routing System',
                content: 'Sistem rute berbasis query string dinamis dengan mekanisme resolusi konten otomatis (fallback default) dan dukungan riwayat browser (History API).',
                linkText: 'Pelajari Rute &raquo;',
                linkTarget: 'learn'
            },
            {
                icon: 'di-setting',
                title: 'Integrated Engines',
                content: 'Dilengkapi dengan modul bawaan terintegrasi: Quiz Engine terproteksi, Certificate Verifier, dan Slide Viewer presentasi berbasis metode P-R-E-P.',
                linkText: 'Coba Verifikasi &raquo;',
                linkTarget: 'cert'
            }
        ]
    },

    // 3. PREREQUISITES, USAGE EXAMPLE, & HOW TO CITE (MENGGUNAKAN KOMPONEN ARTICLE)
    {
        section: 'article',
        leftCol: {
            subtitle: 'Prerequisites & Installation',
            lines: [
                '### System Requirement',
                'Tidak membutuhkan Node.js, Webpack, Babel, atau build tools lainnya. Cukup peramban web (browser) modern yang mendukung ES6+.',
                '---',
                '### Quick Installation',
                '1. Salurkan berkas **script.js** ke direktori proyek Anda.',
                '2. Buat berkas berkas data terstruktur (misal: **dataset.js** atau **home.js**).',
                '3. Panggil script di dalam berkas HTML utama Anda sebelum tag penutup body:',
                '```html',
                '<script src="dataset.js"></script>',
                '<script src="script.js"></script>',
                '```'
            ]
        },
        rightCol: {
            subtitle: 'Quick Start & Citation Specification',
            lines: [
                '### Minimal Working Example (MWE)',
                'Definisikan data halaman Anda secara deklaratif seperti contoh di bawah ini:',
                '```javascript',
                'const pages = {',
                '    home: [',
                '        {',
                '            section: "titleHero",',
                '            title: "Halo Dunia",',
                '            description: "Ini adalah konten berbasis JSON-driven." ',
                '        }',
                '    ]',
                '};',
                '```',
                'Sistem akan otomatis membaca objek tersebut dan mengeksekusi fungsi `ui.render()` berdasarkan rute aktif.',
                '---',
                '### How to Cite This Software',
                'Jika Anda menggunakan arsitektur framework ini untuk keperluan riset, publikasi akademik, atau pengembangan komersial, silakan sitasi menggunakan format berikut:',
                '**Wawan Sismadi.** (2026). *Sistem Rendering Antarmuka Aplikasi Web Berbasis Dokumen Data Terstruktur dengan Mekanisme Pengiriman Polimorfik Tanpa Ketergantungan Framework*. Zenodo. DOI: 10.5281/zenodo.XXXXXXXX'
            ]
        }
    }
];
