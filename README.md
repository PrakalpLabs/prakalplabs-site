# Prakalp Labs — Enterprise Technology & Digital Product Engineering Platform

> **"Turning Ideas Into Powerful Solutions."**  
> *Prakalp Labs is a modern technology and software engineering company that transforms complex business challenges into resilient digital products, scalable web applications, and intelligent automated systems.*

---

## ⚡ Monorepo Overview & MERN Architecture

This repository is built as a **pure MERN stack** (MongoDB, Express.js, React, Node.js) monorepo configured with npm workspaces. There is **zero Next.js** in this codebase — the frontend is a standalone, ultra-responsive **React SPA** built with **Vite**, and the backend is a hardened **Express REST API** with **MongoDB / Mongoose**.

```
prakalp-labs/
├── frontend/                     # React 18 SPA (Vite + TypeScript + Tailwind CSS v4)
│   ├── src/
│   │   ├── components/           # UI, Layout, Home, and Section Components
│   │   ├── config/               # Safe environment configuration & metadata
│   │   ├── data/mock/            # Offline demonstration datasets (services, projects, company)
│   │   ├── lib/api/              # Data source abstraction layer (Mock / API auto-switching)
│   │   ├── pages/                # Home, About, Services, Projects, Contact, Admin, Legal
│   │   ├── types/                # Strict TypeScript contracts & domain models
│   │   ├── App.tsx               # Client-side router & scroll-to-top controller
│   │   └── main.tsx              # React DOM entry point
│   ├── public/                   # Static assets, SVG icons, and theme reference video
│   ├── vite.config.ts            # Vite 6 config with Tailwind v4 & backend proxy
│   └── package.json              # Frontend dependencies and scripts
│
├── backend/                      # Node.js + Express.js REST API (TypeScript + Mongoose + Zod)
│   ├── src/
│   │   ├── config/               # Database, JWT, CORS, and environment configuration
│   │   ├── controllers/          # Services, Projects, Inquiries, and Auth controllers
│   │   ├── middleware/           # JWT authentication, error handling, Zod validation
│   │   ├── models/               # Mongoose schemas (Service, Project, Inquiry, Admin)
│   │   ├── routes/               # Modular Express v1 route definitions
│   │   ├── scripts/              # Seed script (idempotent bootstrap of services & admin)
│   │   └── server.ts             # Express application & HTTP server entrypoint
│   ├── tests/                    # Integration test suite (Vitest + Supertest)
│   ├── tsconfig.json             # Backend TypeScript configuration
│   └── package.json              # Backend dependencies and scripts
│
├── theme.mp4                     # Design reference video
├── package.json                  # Root monorepo workspace configuration
└── README.md                     # Master documentation
```

---

## 🎨 Visual Identity & Theme Inspiration

The interface is modeled directly after the **dark futuristic aerospace operations platform** featured in `theme.mp4`:

- **Curated Dark Palette:** Deep space backgrounds (`#080B12`, `#101521`, `#141B29`) with subtle borders (`#1F293D`, `#2E3A52`) and vibrant dual accents:
  - **Primary Electric Violet:** `#7C5CFC` (hover: `#6A48F0`)
  - **Secondary High-Tech Cyan:** `#27D9C3` (hover: `#1EC2AD`)
- **Curved Hero Container:** Signature `hero-curved-container` with radial ambient backlights, floating status pill, dynamic typography, and an interactive 3D abstract aerodynamic node.
- **Bento Operations Grid:** High-density telemetry cards highlighting operational efficiency, sparklines, and latency tables.
- **Live Interactive Showcase:** Tabbed preview module (*Analytics Core*, *Automation Stream*, *Telemetry Hub*) with simulated dynamic filtering and live pipeline monitors.
- **Enterprise Verification Seals:** Dark pill banner displaying circular security stamps: **SOC2 Type II Ready**, **ISO 27001 Aligned**, **GDPR Compliant**, and **99.99% Uptime SLA**.
- **Supersonic CTA Emblem:** Central aerospace aircraft emblem with glowing horizontal neural circuit traces and clear call to action.

---

## 🔄 Dual Data Source Abstraction (`mock` vs `api`)

To ensure **zero deployment hurdles**, the frontend features a seamless data-access abstraction layer (`frontend/src/lib/api/`):

1. **`VITE_DATA_SOURCE=mock` (Default / Standalone):**
   - The frontend runs completely standalone without requiring a running database.
   - All 8 core services, realistic demonstration projects, company philosophy, and process timelines load instantly from curated, realistic local datasets (`frontend/src/data/mock/`).
   - Contact form submissions validate locally and store inquiries in-memory with visual feedback.
2. **`VITE_DATA_SOURCE=api` (Full MERN Mode):**
   - The frontend connects directly to the Express backend (`http://localhost:5000/api/v1` or production API URL).
   - Inquiries, services, and projects are fetched and mutated live against **MongoDB**.
3. **Admin Dashboard (`/admin`):**
   - Always provides direct authentication against the Express backend and MongoDB database.

---

## 🛠️ Tech Stack Breakdown

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite 6, TypeScript 5.8, Tailwind CSS v4 (`@tailwindcss/vite`), React Router DOM 6, Lucide Icons |
| **Backend** | Node.js 18+, Express.js 4.21, TypeScript 5.8, Mongoose 8, Zod 3.24 |
| **Database** | MongoDB (Local MongoDB Server or MongoDB Atlas Cloud) |
| **Security** | Helmet, CORS, Cookie-Parser, JSONWebToken, BcryptJS, Honeypot spam defense |
| **Quality** | Vitest 3, Supertest 7, TypeScript strict type checking |

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js:** v18.0.0 or higher
- **npm:** v9.0.0 or higher
- **MongoDB:** (Optional for frontend mock mode; required for live backend data persistence). You can run MongoDB locally (`mongodb://127.0.0.1:27017/prakalp_labs`) or use a free cloud cluster from [MongoDB Atlas](https://www.mongodb.com/atlas).

---

### Step 1: Install Dependencies
Run from the root directory to install all monorepo dependencies:
```bash
npm install
```

---

### Step 2: Environment Setup

#### Frontend (`frontend/.env`):
Create `frontend/.env` (or copy from `frontend/.env.example`):
```env
VITE_SITE_URL=http://localhost:3000
VITE_API_URL=/api/v1
VITE_DATA_SOURCE=mock
```
*(Set `VITE_DATA_SOURCE=api` once you have MongoDB and the backend running)*.

#### Backend (`backend/.env`):
Create `backend/.env` (or copy from `backend/.env.example`):
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/prakalp_labs
JWT_SECRET=prakalp_labs_jwt_secret_dev_key_do_not_use_in_prod_9876
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:3000
ADMIN_SETUP_SECRET=prakalp_admin_setup_key_2026
```

---

### Step 3: Seed Database (Optional for backend mode)
If running with a live MongoDB instance, populate the initial 8 services, demonstration projects, and admin user:
```bash
npm run seed
```
This sets up the default administrator account:
- **Email:** `admin@prakalplabs.internal`
- **Password:** `PrakalpAdmin2026!`

---

### Step 4: Run Development Servers

#### Option A: Run Both Frontend and Backend Concurrently
Open two terminal tabs:
```bash
# Terminal 1 (Frontend SPA on port 3000):
npm run dev:frontend

# Terminal 2 (Backend REST API on port 5000):
npm run dev:backend
```

#### Option B: Standalone Frontend
If you just want to preview or work on the UI and client experience:
```bash
npm run dev:frontend
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🧪 Automated Testing

The backend includes a comprehensive integration test suite written with **Vitest** and **Supertest**. Run all tests from the root:
```bash
npm test
```

### Verified Test Cases:
- `GET /api/v1/health` returns HTTP 200 with uptime and status.
- `POST /api/v1/inquiries` rejects invalid email addresses with Zod 400.
- `POST /api/v1/inquiries` rejects too-short project descriptions.
- `POST /api/v1/inquiries` detects honeypot bot submissions and silently handles them.
- `GET /api/v1/admin/inquiries` blocks unauthorized access without JWT token (HTTP 401).
- `POST /api/v1/projects` blocks unauthorized creation requests (HTTP 401).
- `GET /api/v1/services` and `GET /api/v1/projects` return publicly accessible data structures.

---

## 📦 Production Build

To compile both frontend and backend for production deployment:
```bash
npm run build
```
- **Backend output:** `backend/dist/server.js`
- **Frontend output:** `frontend/dist/` (static assets ready for CDN / static hosting)

---

## 🌐 Production Deployment

### 1. Frontend (Static SPA)
Deploy the `frontend/` directory to **Vercel**, **Netlify**, or **Cloudflare Pages**:
- **Framework Preset:** Vite
- **Root Directory:** `frontend`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Environment Variables:**
  - `VITE_SITE_URL`: `https://yourdomain.com`
  - `VITE_API_URL`: `https://api.yourdomain.com/api/v1`
  - `VITE_DATA_SOURCE`: `api`

### 2. Backend (Node.js REST API)
Deploy the `backend/` directory to **Render**, **Railway**, **Fly.io**, or **AWS / DigitalOcean**:
- **Root Directory:** `backend`
- **Build Command:** `npm run build`
- **Start Command:** `npm run start` (executes `node dist/server.js`)
- **Environment Variables:**
  - `PORT`: `5000` (or host provided)
  - `NODE_ENV`: `production`
  - `MONGODB_URI`: Your MongoDB Atlas connection URI
  - `JWT_SECRET`: Strong random 64-character secret
  - `FRONTEND_URL`: `https://yourdomain.com`
  - `ADMIN_SETUP_SECRET`: Secure admin onboarding token

---

## 🛡️ License

Copyright © 2026 Prakalp Labs. All rights reserved.
Distributed under the MIT License.