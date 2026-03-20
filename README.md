# 🚀 AI-Powered Portfolio — Mirangga Jakti

A premium, production-grade portfolio built with Next.js App Router, showcasing real AI systems, advanced frontend engineering, and full-stack capabilities.

> **This is not a template. This is a system built from scratch.**

---

## Overview

This portfolio represents my work as an **AI-Powered Full-Stack Engineer**, combining:

- Interactive frontend systems
- Real AI SaaS applications
- Production-ready integrations
- Analytics & performance tracking

Built with a strong focus on engineering quality, not just visuals.

---

## Tech Stack

```
Frontend    Next.js 14 · TypeScript · TailwindCSS · Framer Motion
Animation   Canvas API · Custom physics · CSS animations
Backend     Next.js API Routes · Resend (email delivery)
Analytics   Google Analytics 4 (custom App Router implementation)
Deployment  Vercel · GitHub CI/CD
AI Systems  Django · PostgreSQL · Groq API · LLaMA · Prophet
```

---

## Key Features

### Interactive Frontend System
- Canvas-based particle engine (80 particles + connection graph)
- 3D tilt cards with real-time mouse tracking
- Magnetic cursor with spring physics
- Scroll-triggered animations & parallax effects
- Typewriter role animation
- Fully responsive (mobile-first)

### Contact System (Production)
- Integrated with **Resend API**
- Sends real emails directly to inbox
- Includes validation, loading states, and success feedback

### Analytics System (GA4)

Standard GA4 setup breaks in Next.js App Router due to SSR + SPA behavior.

**Custom solution:**
- Client-side tracking using `usePathname`
- Manual `page_view` dispatch on route changes
- Safe handling of `window` to avoid SSR crashes
- Verified using:
  - DevTools (`collect` requests → 204)
  - GA4 Realtime dashboard

---

## AI Projects Featured

### TrendPulse AI
Real-time market intelligence platform

| Component | Detail |
|-----------|--------|
| Data pipeline | Google Trends + News RSS |
| Scoring | Custom Virality Score algorithm |
| AI insights | LLaMA 3.3 via Groq API |
| Forecasting | Prophet (7–30 day predictions) |
| Automation | APScheduler background jobs |

**Stack:** Django · PostgreSQL · LLM · Time-series ML

### VentureLens AI
AI-powered startup idea validator

| Feature | Detail |
|---------|--------|
| Analysis | SWOT · viability score · competitor mapping |
| Output | Exportable PDF reports |
| Speed | Full analysis in seconds |

**Stack:** Django · PostgreSQL · LLM

---

## Engineering Challenges Solved

- Solved GA4 tracking issues in Next.js App Router (SSR vs Client)
- Debugged `window is not defined` and missing analytics data
- Fixed SPA navigation tracking gaps using `usePathname`
- Handled Vercel deployment blocking due to Next.js CVE
- Resolved dependency conflicts (React 19 vs Next.js 14)
- Recovered broken states using `git revert` without losing history
- Fixed build failures (ESLint, duplicate imports, config format)

---

## Getting Started (Windows 10)

### 1. Install Node.js
Download: https://nodejs.org (LTS version)

```bash
node -v
npm -v
```

### 2. Clone Repository

```bash
git clone https://github.com/rangga-jakti/portfolio.git
cd portfolio
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Setup Environment Variables

Create `.env.local` in the root folder:

```env
RESEND_API_KEY=your_resend_api_key_here
NEXT_PUBLIC_GA_ID=your_ga4_measurement_id
```

### 5. Run Development Server

```bash
npm run dev
```

Open: http://localhost:3000

---

## Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Run production build |
| `npm run lint` | Run ESLint |

---

## Customization

**Update personal data:**
```
src/lib/data.ts
```

**Replace resume:**
```
public/resume.pdf
```

**Update theme colors:**
```
tailwind.config.ts
```

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx            # Root layout + GA4 setup
│   ├── page.tsx              # Main page assembly
│   └── api/contact/          # Resend email API route
├── components/
│   ├── ui/                   # Reusable UI components
│   │   ├── MagneticCursor    # Custom cursor with physics
│   │   ├── ParticleField     # Canvas particle system
│   │   ├── HeroCard          # Glassmorphism profile card
│   │   ├── SocialLinks       # Social icons with tooltips
│   │   ├── GATracker         # GA4 route change tracker
│   │   └── ScrollProgress    # Scroll progress indicator
│   ├── sections/             # Page sections
│   │   ├── Hero              # Landing + typewriter + parallax
│   │   ├── About             # Bio + skills + terminal card
│   │   ├── Projects          # Featured + ML projects grid
│   │   ├── Experience        # Timeline / tab layout
│   │   └── Contact           # Form + social links
│   └── layout/
│       ├── Navbar            # Fixed navbar + mobile menu
│       └── Footer            # Footer with social links
├── lib/
│   ├── data.ts               # All portfolio content
│   ├── gtag.ts               # GA4 event helpers
│   └── utils.ts              # Utility functions
public/
├── resume.pdf                # Your resume PDF
└── images/
    └── profile.jpeg          # Your profile photo
```

---

## Live

- **Portfolio:** https://mirangga-jakti.vercel.app/
- **GitHub:** https://github.com/rangga-jakti
- **LinkedIn:** https://www.linkedin.com/in/mirangga-jakti-8b0a69334/

---

## License

MIT — free to use and modify.

---

*Built from scratch. Deployed to production. Tracking analytics. Sending real emails.*
*Every line written intentionally.*
