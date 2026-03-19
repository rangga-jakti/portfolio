# 🚀 Portfolio — Alex Rivera

Portfolio website premium yang dibangun dengan Next.js 15, TailwindCSS, dan Framer Motion.

---

## 📦 Prerequisites (Syarat)

Pastikan kamu sudah menginstall:

- **Node.js** v18+ → https://nodejs.org
- **npm** v9+ (otomatis terpasang bersama Node.js)
- **Git** (opsional) → https://git-scm.com

---

## ⚡ Cara Menjalankan di Windows 10

### Langkah 1 — Install Node.js
1. Buka https://nodejs.org
2. Download versi **LTS** (Long Term Support)
3. Jalankan installer, ikuti wizard instalasi
4. Verifikasi instalasi di Command Prompt:
   ```
   node --version
   npm --version
   ```

### Langkah 2 — Extract / Clone Project
Option A - Extract ZIP:
1. Extract file `portfolio.zip` ke folder pilihan kamu, misalnya `C:\Projects\portfolio`

Option B - Clone (jika menggunakan Git):
```bash
git clone <repo-url>
cd portfolio
```

### Langkah 3 — Install Dependencies
Buka **Command Prompt** atau **PowerShell**, masuk ke folder project:
```bash
cd C:\Projects\portfolio
npm install
```
Tunggu hingga selesai (biasanya 1-2 menit tergantung koneksi internet).

### Langkah 4 — Jalankan Development Server
```bash
npm run dev
```

### Langkah 5 — Buka di Browser
Buka browser dan akses:
```
http://localhost:3000
```

🎉 **Portfolio kamu sudah berjalan!**

---

## 🛠️ Perintah yang Tersedia

| Perintah | Fungsi |
|----------|--------|
| `npm run dev` | Jalankan development server (hot-reload) |
| `npm run build` | Build untuk production |
| `npm start` | Jalankan production server (butuh build dulu) |
| `npm run lint` | Cek error kode dengan ESLint |

---

## ✏️ Cara Kustomisasi

### 1. Ganti Data Personal
Edit file: `src/lib/data.ts`

```typescript
export const siteConfig = {
  name: "Nama Kamu",          // ← ganti ini
  title: "Full-Stack Engineer",
  email: "kamu@email.com",    // ← ganti ini
  github: "https://github.com/username",  // ← ganti ini
  linkedin: "https://linkedin.com/in/username",
  twitter: "https://twitter.com/username",
  location: "Jakarta, Indonesia",
};
```

### 2. Ganti Project
Edit array `projects` di `src/lib/data.ts`:
```typescript
export const projects = [
  {
    id: 1,
    title: "Nama Project Kamu",
    description: "Deskripsi singkat project...",
    tech: ["React", "Node.js", "PostgreSQL"],
    github: "https://github.com/...",
    live: "https://project.com",
    featured: true,
    gradient: "from-cyan-glow/10 to-blue-500/5",
  },
  // tambah project lainnya...
];
```

### 3. Ganti Pengalaman Kerja
Edit array `experiences` di `src/lib/data.ts`.

### 4. Ganti Warna Tema
Edit `tailwind.config.ts` bagian `colors`:
```typescript
cyan: {
  glow: "#00FFE0",  // ← warna aksen utama
},
```

### 5. Ganti Resume
Taruh file PDF resume kamu di `public/resume.pdf`

---

## 📁 Struktur Project

```
portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout, metadata SEO
│   │   ├── page.tsx            # Halaman utama (assembly semua sections)
│   │   └── globals.css         # Global styles, CSS variables
│   ├── components/
│   │   ├── ui/
│   │   │   ├── MagneticCursor.tsx    # Custom animated cursor
│   │   │   ├── ParticleField.tsx     # Canvas particle animation
│   │   │   ├── ScrollProgress.tsx    # Progress bar scroll
│   │   │   ├── AnimatedCounter.tsx   # Number counter animasi
│   │   │   └── SectionReveal.tsx     # Wrapper animasi reveal
│   │   ├── sections/
│   │   │   ├── Hero.tsx         # Landing + typewriter + parallax
│   │   │   ├── About.tsx        # Bio + tech stack + terminal card
│   │   │   ├── Projects.tsx     # Grid cards dengan 3D tilt hover
│   │   │   ├── Experience.tsx   # Timeline / tab layout pengalaman
│   │   │   └── Contact.tsx      # Form kontak + social links
│   │   └── layout/
│   │       ├── Navbar.tsx       # Fixed navbar + mobile menu
│   │       └── Footer.tsx       # Footer dengan social links
│   └── lib/
│       ├── data.ts              # ⭐ SEMUA DATA PORTFOLIO DI SINI
│       └── utils.ts             # Utility functions (cn helper)
├── public/
│   └── resume.pdf               # ← taruh resume kamu di sini
├── tailwind.config.ts           # Konfigurasi Tailwind + custom colors
├── next.config.ts               # Konfigurasi Next.js
├── tsconfig.json                # Konfigurasi TypeScript
└── package.json                 # Dependencies
```

---

## 🎨 Fitur Unggulan

| Fitur | Detail |
|-------|--------|
| **Magnetic Cursor** | Custom cursor dengan trailing ring effect |
| **Particle Field** | Canvas WebGL-like particles di hero section |
| **Scroll Progress** | Progress bar cyan di top halaman |
| **Typewriter Effect** | Animasi ketik role di hero |
| **3D Tilt Cards** | Kartu project tilt mengikuti mouse |
| **Mouse Parallax** | Orb background bergerak ikuti kursor |
| **Section Reveal** | Animasi fade+slide saat scroll |
| **Scan Line** | Subtle CRT scan effect di hero |
| **Tab Experience** | Komponen tab interaktif untuk pengalaman |
| **Form Contact** | Form dengan animasi success state |
| **Mobile Menu** | Fullscreen overlay dengan animasi stagger |
| **Scroll-aware Navbar** | Navbar glassmorphism saat scroll |

---

## 🚀 Deploy ke Production

### Vercel (Direkomendasikan — GRATIS)
1. Push ke GitHub
2. Login ke https://vercel.com
3. Klik "New Project" → Import repo kamu
4. Klik Deploy → selesai! Auto dapat domain `.vercel.app`

### Build Manual
```bash
npm run build
npm start
```

---

## ⚠️ Troubleshooting Windows

**Error: "node is not recognized"**
→ Install Node.js dari https://nodejs.org, restart Command Prompt

**Error: "Cannot find module"**
→ Jalankan `npm install` lagi di folder project

**Port 3000 sudah dipakai**
→ Jalankan di port lain: `npm run dev -- -p 3001`

**Layar cursor tidak muncul**
→ Normal di touch device, cursor custom hanya muncul di desktop dengan mouse

---

## 📄 License
MIT — bebas digunakan dan dimodifikasi.
