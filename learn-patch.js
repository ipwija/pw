/**
 * learn-patch.js
 * Patch: Prev / Next navigation untuk learningModule (DonatJS)
 * Cara pakai: sertakan SETELAH script.js di index.html
 *   <script src="learn-patch.js"></script>
 *
 * Yang di-patch:
 *  1. web.resolveLearningModule  — menghitung prevId & nextId dari flat list semua modul
 *  2. components.learningModule  — menambahkan tombol Prev/Next di bawah konten modul
 *  3. Keyboard shortcut          — ArrowLeft / ArrowRight saat halaman learn aktif
 */

(function () {

    /* ── 1. PATCH: web.resolveLearningModule ───────────────────────────── */
    web.resolveLearningModule = function (id) {
        let raw = pages.learn;
        if (Array.isArray(raw)) raw = raw[0] || {};
        if (!raw || typeof raw !== 'object') raw = {};

        const categories = raw.categories || [];
        // Rata-kan semua item dari semua kategori menjadi satu array linear
        const allItems  = categories.flatMap(cat => cat.items || []);
        const defaultId = allItems[0]?.id || '';
        const activeId  = id || defaultId;
        const exists    = allItems.some(i => i.id === activeId);

        const resolvedId = exists ? activeId : defaultId;
        const activeIdx  = allItems.findIndex(i => i.id === resolvedId);

        const prevId = activeIdx > 0                   ? allItems[activeIdx - 1].id : null;
        const nextId = activeIdx < allItems.length - 1 ? allItems[activeIdx + 1].id : null;

        return [
            {
                section: 'titleHero',
                title:   exists ? 'Learning Module' : 'Modul Tidak Ditemukan'
            },
            {
                section:  'learningModule',
                activeId: resolvedId,
                prevId,
                nextId,
                data:     raw
            }
        ];
    };


    /* ── 2. PATCH: components.learningModule ───────────────────────────── */
    components.learningModule = function (d) {
        const categories = d.data.categories || [];

        // Cari konten aktif
        let activeContent = { title: 'Materi', lines: ['Pilih materi di samping.'] };
        categories.forEach(cat => {
            const found = cat.items.find(i => i.id === d.activeId);
            if (found) activeContent = found;
        });

        // Hitung nomor urut modul (1-based) dari flat list
        const allItems  = categories.flatMap(cat => cat.items || []);
        const activeIdx = allItems.findIndex(i => i.id === d.activeId);
        const totalMods = allItems.length;
        const modNum    = activeIdx >= 0 ? activeIdx + 1 : '?';

        // Tombol Prev
        const prevBtn = d.prevId
            ? `<button class="lm-nav-btn lm-prev"
                   onclick="web.navigate('learn/${d.prevId}')"
                   title="Modul sebelumnya">&#8592; Sebelumnya</button>`
            : `<button class="lm-nav-btn lm-prev" disabled
                   title="Ini modul pertama">&#8592; Sebelumnya</button>`;

        // Tombol Next
        const nextBtn = d.nextId
            ? `<button class="lm-nav-btn lm-next"
                   onclick="web.navigate('learn/${d.nextId}')"
                   title="Modul berikutnya">Berikutnya &#8594;</button>`
            : `<button class="lm-nav-btn lm-next" disabled
                   title="Ini modul terakhir">Berikutnya &#8594;</button>`;

        // Label posisi modul
        const posLabel = totalMods > 0
            ? `<span class="lm-nav-pos">${modNum} / ${totalMods}</span>`
            : '';

        return `
            <div class="row page4">
                <div class="col-1-3 artikel sidebar">
                    <h3>Daftar Modul</h3><hr>
                    ${categories.map(cat => `
                        <div class="cat-box">
                            <strong>${cat.name}</strong>
                            <ul>${cat.items.map(item => `
                                <li>
                                    <a href="javascript:void(0)"
                                       class="${item.id === d.activeId ? 'active' : ''}"
                                       onclick="web.navigate('learn/${item.id}')">
                                        ${item.title}
                                    </a>
                                </li>`).join('')}
                            </ul>
                        </div>`).join('')}
                </div>
                <div class="col-2-3 artikel content">
                    <h2>${activeContent.title}</h2><hr>
                    <div class="module-body">
                        ${components.lineRenderer(activeContent.lines || [], activeContent)}
                    </div>
                    <div class="lm-nav-bar" id="lm-nav-bar"
                         data-prev="${d.prevId || ''}"
                         data-next="${d.nextId || ''}">
                        ${prevBtn}
                        ${posLabel}
                        ${nextBtn}
                    </div>
                </div>
            </div>`;
    };


    /* ── 3. PATCH: CSS tambahan untuk label posisi ─────────────────────── */
    const style = document.createElement('style');
    style.textContent = `
        .lm-nav-pos {
            font-size: 12px;
            font-family: monospace;
            color: var(--pDarkColor, #004761);
            background: #e8f4f8;
            padding: 4px 12px;
            border-radius: 20px;
            white-space: nowrap;
        }
        .lm-nav-bar { position: relative; }
    `;
    document.head.appendChild(style);


    /* ── 4. KEYBOARD NAVIGATION (ArrowLeft / ArrowRight) ──────────────── */
    document.addEventListener('keydown', function (e) {
        // Abaikan jika user sedang mengetik di input/textarea
        const tag = document.activeElement?.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

        // Cek apakah halaman learn sedang aktif
        const currentPath = window.location.search.substring(1) || 'home';
        if (!currentPath.startsWith('learn')) return;

        const bar = document.getElementById('lm-nav-bar');
        if (!bar) return;

        const prevId = bar.dataset.prev;
        const nextId = bar.dataset.next;

        if (e.key === 'ArrowLeft'  && prevId) { e.preventDefault(); web.navigate('learn/' + prevId); }
        if (e.key === 'ArrowRight' && nextId) { e.preventDefault(); web.navigate('learn/' + nextId); }
    });

})();


/* =====================================================
   PATCH: info-card Auto-Grid
   Auto-wrap .info-card berurutan → .info-card-row (CSS Grid)

   CARA PAKAI:
   1. Tambahkan patch-info-card-grid.css ke <head>
   2. Tambahkan file ini setelah script.js di index.html:
      <script src="patch-info-card-grid.js"></script>
   ===================================================== */

(function () {

    /**
     * autoGridInfoCards
     * Cari semua .info-card yang tampil berurutan langsung
     * dalam satu parent, lalu bungkus dengan .info-card-row.
     * Dipanggil setiap kali ui.render selesai.
     */
    function autoGridInfoCards(root) {
        const scope = root || document;

        // Target semua container yang mungkin berisi info-card berurutan
        const containers = scope.querySelectorAll(
            '.module-body, .artikel, .acc-content, #preview-area'
        );

        containers.forEach(parent => {
            // Kumpulkan run (deretan) .info-card yang adjacent
            const runs = [];
            let current = [];

            [...parent.childNodes].forEach(node => {
                const isCard = node.nodeType === 1 &&
                               node.classList.contains('info-card') &&
                               !node.closest('.info-card-row'); // skip yang sudah di-wrap

                if (isCard) {
                    current.push(node);
                } else {
                    if (current.length >= 2) runs.push([...current]);
                    current = [];
                }
            });
            if (current.length >= 2) runs.push([...current]);

            // Bungkus setiap run dengan .info-card-row
            runs.forEach(group => {
                const wrapper = document.createElement('div');
                wrapper.className = 'info-card-row';
                // Sisipkan wrapper sebelum card pertama
                group[0].parentNode.insertBefore(wrapper, group[0]);
                group.forEach(card => wrapper.appendChild(card));
            });
        });
    }

    // ─── Hook ke ui.render ────────────────────────────────────
    // Tunggu sampai ui dan web terdefinisi, lalu patch
    function hookRender() {
        if (typeof ui === 'undefined' || typeof ui.render !== 'function') {
            setTimeout(hookRender, 50);
            return;
        }

        const _original = ui.render;
        ui.render = function (id, dataArray) {
            _original.call(this, id, dataArray);
            // Jalankan auto-grid setelah DOM diupdate
            const el = document.getElementById(id);
            if (el) autoGridInfoCards(el);
        };

        // Jalankan sekali untuk konten yang sudah ada saat patch dimuat
        autoGridInfoCards(document);
    }

    // Mulai hook setelah DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', hookRender);
    } else {
        hookRender();
    }

})();
