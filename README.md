# DonatJS LMS — Web Programming Courseware

![Vanilla JS](https://img.shields.io/badge/Vanilla%20JS-ES6%2B-yellow)
![Zero Dependency](https://img.shields.io/badge/Zero-Dependency-green)
![No Build Step](https://img.shields.io/badge/No--Build-Step-blue)
![License: MIT](https://img.shields.io/badge/License-MIT-lightgrey)
![DOI](https://img.shields.io/badge/DOI-10.5281%2Fzenodo.XXXXXXXX-blue)

Open courseware platform for the **Pemrograman Web** course at Universitas IPWIJA, Jakarta. Built on DonatJS — a zero-dependency, no-build-step, JSON-driven micro-framework that renders structured page data as dynamic web interfaces entirely in the browser.

Covers 16 structured learning modules from HTML5 semantics through Single Page Application architecture, with an integrated quiz engine and certificate verifier.

---

## Key Features

- **JSON-Driven Architecture** — All layout and content are defined as plain JavaScript objects (`pages.*`). No templates, no JSX, no DSL.
- **Zero-Dependency Runtime** — No Node.js, Webpack, Babel, or any external library required. Runs in any ES6+ browser.
- **No-Build Step** — Drop `script.js` into a directory, define your data, open in browser. Done.
- **Micro Routing System** — Query-string-based SPA routing with automatic content resolution and History API support.
- **Modular Page Loader** — `loadPageScripts()` dynamically loads page modules (`home.js`, `learn.js`, `kuis.js`, `cert.js`) and merges them into the global `pages` registry.
- **Integrated Quiz Engine** — Password-protected quiz module with `btoa`-encoded answer keys, passing grade enforcement, and start-time gating.
- **Certificate Verifier** — Credential lookup system with unique ID validation (`SLS-YYYY-NNN` format).
- **Prev/Next Navigation** — `learn-patch.js` adds sequential module navigation with keyboard shortcuts (←/→) and position indicator.
- **Auto-Grid Info Cards** — Automatic CSS Grid wrapping for adjacent `.info-card` elements via JS hook on `ui.render`.
- **16-Module Curriculum** — Covers HTML5 → CSS3 → JavaScript ES6+ → LocalStorage → Fetch API → SPA architecture.

---

## Prerequisites & Installation

**No runtime dependencies.** Only a modern browser supporting ES6+ is required.

1. Clone or download this repository:
   ```bash
   git clone https://github.com/ipwija/pw.git
   cd pw
   ```
2. Serve with any static file server (e.g., VS Code Live Server extension, Python's `http.server`, or Nginx).
3. Open `index.html` in the browser. No build step needed.

> **Note:** `script.js` and `svg.js` are loaded from the DonatJS Core CDN (`https://donatjs.github.io/core/`). An internet connection is required on first load, or self-host the files for offline use.

---

## Quick Start

Define a minimal page in `pages/home.js`:

```javascript
pages.home = [
    {
        section: 'titleHero',
        title: 'Halo Dunia',
        description: 'Konten berbasis JSON-driven.'
    }
];
```

Declare modules to load in `pages/index.js`:

```javascript
const pageFiles = ['home', 'learn', 'kuis', 'cert'];
```

Define the loader in `dataset.js`:

```javascript
const pages = {};

function loadPageScripts(files, callback) {
    let loaded = 0;
    files.forEach(name => {
        const script = document.createElement('script');
        script.src = `pages/${name}.js`;
        script.onload = () => {
            loaded++;
            if (loaded === files.length) callback();
        };
        document.head.appendChild(script);
    });
}
```

Bootstrap in `index.html` before `</body>`:

```html
<script src="pages/index.js"></script>
<script src="dataset.js"></script>
<script>
    loadPageScripts(pageFiles, () => { renderMenu(); });
</script>
```

---

## Usage

### Page Section Types

| Section | Purpose |
|---|---|
| `hero` | Full-width hero with title, tagline, badges, and CTA button |
| `titleHero` | Centered section heading |
| `features` | Icon + title + content cards (3-column grid) |
| `article` | Two-column split layout (`leftCol` / `rightCol`) |
| `learningModule` | Sidebar module list + main content area with Prev/Next |

### Inline Directives (inside `lines` arrays)

```
skill:84%:Label:Tag          → Skill progress bar
card:Title:Description       → Feature card (auto-gridded)
step:year:Label:Detail       → Timeline step
table:[{...}]                → Rendered data table
code:lang:theme:ln:content   → Syntax-highlighted code block
form:quiz                    → Protected quiz form
form:validate-cert           → Certificate lookup form
```

### Quiz Module

```javascript
pages.kuis = [
    {
        section: 'article',
        rightCol: {
            lines: ['form:quiz'],
            startTime: '2026-05-12T08:00:00',
            password: 'YourPassword',
            questions: [
                {
                    q: 'Question text?',
                    options: ['A', 'B', 'C', 'D'],
                    ans: btoa('B')   // base64-encoded correct answer
                }
            ]
        }
    }
];
```

### Certificate Registry

```javascript
pages.certificates = {
    'SLS-2026-001': {
        name: 'Full Name',
        exam: 'Exam Title',
        score: '98/100',
        date: '19 April 2026'
    }
};
```

### Prev/Next Navigation (`learn-patch.js`)

Include after `script.js` in `index.html`:

```html
<script src="learn-patch.js"></script>
```

The patch automatically computes `prevId` / `nextId` from a flat list of all items across all categories. Keyboard shortcuts ArrowLeft / ArrowRight work when the `learn/*` route is active.

---

## How to Cite

```bibtex
@software{sismadi_donatjs_lms_2026,
  author       = {Sismadi, Wawan},
  title        = {{DonatJS LMS: Minimalist Client-Side Router \& UI Engine
                   for Web Programming Courses}},
  year         = {2026},
  publisher    = {Zenodo},
  doi          = {10.5281/zenodo.XXXXXXXX},
  url          = {https://doi.org/10.5281/zenodo.XXXXXXXX},
  note         = {Open courseware for Pemrograman Web, Universitas IPWIJA.
                  Zero-dependency, JSON-driven micro-framework.
                  Repository: https://github.com/ipwija/pw}
}
```
