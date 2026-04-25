# Remote Telemedicine Platform

This repository contains:

- **Frontend**: Next.js app (root folder)
- **Backend**: Node.js + Express + MongoDB API (`Backend/`)

## Backend ↔ Frontend connection (MongoDB auth flow)

The frontend **login/signup/dashboard session flow** is connected to backend auth APIs:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile`

Users are stored and validated through MongoDB via Mongoose in `Backend/src/models/User.js`.

## Environment setup

### 1) Frontend env

Create `.env.local` in project root:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5001
```

### 2) Backend env

Use `Backend/.env` (already present) and ensure:

```env
PORT=5001
FRONTEND_URL=http://localhost:3000
MONGODB_URI=...
JWT_SECRET=...
JWT_EXPIRES_IN=7d
```

## Run locally

### Terminal 1 (backend)

```bash
cd Backend
npm install
npm run dev
```

### Terminal 2 (frontend)

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Notes

- Session is stored in browser localStorage by frontend (`src/lib/auth.ts`).
- Logout clears session and redirects to `/login`.
- Dashboard routes are protected client-side based on authenticated role.
