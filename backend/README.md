# Prakalp Labs — Backend REST API

The robust, type-safe REST API for **Prakalp Labs**, engineered with **Node.js**, **Express.js**, **TypeScript**, **MongoDB & Mongoose**, **Zod**, **Helmet**, and **JWT Authentication**.

## 🚀 Architectural Highlights

- **Stateless & Resilient:** Fail-fast database handling with `bufferCommands: false` to ensure graceful 503 degraded responses when MongoDB is temporarily unreachable or offline.
- **Strict Input Validation:** Runtime validation on all payload boundaries using **Zod** schemas.
- **Enterprise Security:** Hardened with **Helmet** HTTP headers, strictly controlled **CORS** credentials whitelist, and secure **HTTP-only Cookie + Bearer JWT** authentication tokens.
- **Anti-Spam Honeypot:** Public inquiry endpoint (`/api/v1/inquiries`) features a zero-impact honeypot field (`website_source`) to silently reject automated web scrapers and spam bots without hindering real users.
- **Comprehensive Test Suite:** Integration test suite powered by **Vitest** and **Supertest** covering status codes, validation, honeypot protection, unauthorized blocks, and data access.

## 🛠️ Tech Stack

- **Runtime:** Node.js 18+
- **Framework:** Express.js 4.21
- **Language:** TypeScript 5.8
- **Database:** MongoDB via Mongoose 8
- **Validation:** Zod 3.24
- **Security:** Helmet, CORS, Cookie-Parser, BcryptJS, JSONWebToken
- **Testing:** Vitest 3.0 + Supertest 7.0

## 📡 API Endpoints

### Public Endpoints
- `GET /api/v1/health` — System uptime, status, and environment telemetry.
- `GET /api/v1/services` — List of all technology services.
- `GET /api/v1/services/:slug` — Single service detail.
- `GET /api/v1/projects` — Published projects and demonstration builds.
- `GET /api/v1/projects/:slug` — Project case study detail.
- `POST /api/v1/inquiries` — Submit project inquiries (Zod validated + spam honeypot).

### Authentication Endpoints
- `POST /api/v1/auth/setup-admin` — Bootstrap initial administrator (guarded by `ADMIN_SETUP_SECRET`).
- `POST /api/v1/auth/login` — Administrator authentication (returns JWT & sets HTTP-only cookie).
- `POST /api/v1/auth/logout` — Invalidate session and clear auth cookie.
- `GET /api/v1/auth/me` — Verify authenticated administrator session.

### Admin-Protected Endpoints (Requires valid JWT)
- `GET /api/v1/admin/inquiries` — Fetch client inquiries with status filters.
- `GET /api/v1/admin/inquiries/:id` — Read individual inquiry with full details.
- `PATCH /api/v1/admin/inquiries/:id` — Update inquiry status (`new`, `in_review`, `contacted`, `converted`, `archived`) and append internal notes.
- `POST /api/v1/services` — Create new service.
- `PATCH /api/v1/services/:id` — Update service.
- `DELETE /api/v1/services/:id` — Delete service.
- `POST /api/v1/projects` — Create new project.
- `PATCH /api/v1/projects/:id` — Update project.
- `DELETE /api/v1/projects/:id` — Delete project.

## 💻 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Ensure `PORT=5000` and `MONGODB_URI` points to your MongoDB instance (or MongoDB Atlas connection string).

### 3. Seed Initial Data
Populates the 8 core services, demonstration case studies, and an initial admin account:
```bash
npm run seed
```

### 4. Run Development Server
```bash
npm run dev
```
Starts server with `tsx watch` at `http://localhost:5000`.

### 5. Run Automated Tests
```bash
npm test
```
Executes all integration tests using Vitest and Supertest.

### 6. Build for Production
```bash
npm run build
```
Compiles TypeScript into `dist/server.js`.
