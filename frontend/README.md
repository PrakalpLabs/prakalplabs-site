# Prakalp Labs — Frontend (React SPA)

The modern, high-performance web frontend for **Prakalp Labs**, engineered with **React 18**, **Vite**, **TypeScript**, **Tailwind CSS v4**, and **React Router DOM v6**.

## 🚀 Features

- **Design Aesthetic:** Dark futuristic theme inspired by advanced aerospace telemetry systems (`#080B12`, `#101521`, `#141B29`, with `#7C5CFC` violet and `#27D9C3` cyan accents).
- **Curved Hero:** Distinctive `hero-curved-container` with glow highlights and modern typography.
- **Bento Operations Grid:** High-density telemetry cards showcasing operational intelligence, sparklines, and latency metrics.
- **Interactive Technology Showcase:** Live tabbed operations console (Analytics Core, Automation Stream, Telemetry Hub) with dynamic simulated data filters and pipeline status monitors.
- **8 Core Services:** Complete catalog from Website Development to Cloud & DevOps Architecture with deep-dive detail pages.
- **Demonstration Builds:** Showcase of realistic digital products with architecture breakdowns, measurable outcomes, and technology badges.
- **Dual Data Source Abstraction:** Switch effortlessly between offline self-contained demonstration mode (`VITE_DATA_SOURCE=mock`) and live Express/MongoDB backend (`VITE_DATA_SOURCE=api`).
- **Interactive Contact Form:** Validated with Zod, equipped with honeypot bot trap, submission feedback, and input recovery.
- **Admin Management Portal:** Dedicated dashboard at `/admin` for reviewing project inquiries, managing published projects, and checking real-time system metrics.

## 🛠️ Tech Stack

- **Framework:** React 18 + Vite 6
- **Language:** TypeScript 5.8
- **Routing:** React Router DOM 6
- **Styling:** Tailwind CSS v4 with `@tailwindcss/vite`
- **Icons:** Lucide React + custom SVG icons for developer networks

## 💻 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Copy the example environment configuration:
```bash
cp .env.example .env
```

Available environment variables:
| Variable | Description | Default |
|---|---|---|
| `VITE_SITE_URL` | Base public URL of the application | `http://localhost:3000` |
| `VITE_API_URL` | Express API endpoint base path | `/api/v1` |
| `VITE_DATA_SOURCE` | `mock` (self-contained) or `api` (connects to Express & MongoDB) | `mock` |

### 3. Run Development Server
```bash
npm run dev
```
The app will run at `http://localhost:3000` and automatically proxies `/api` requests to `http://localhost:5000` during local development.

### 4. Build for Production
```bash
npm run build
```
Build output is saved to `dist/`.
