# Spokeny

Spokeny is a full-stack learning platform with a React + Vite frontend and a Node.js + Express backend. It includes:

- language and programming course browsing
- detailed lesson pages
- user auth and progress tracking
- cart and payment flow scaffolding
- AI-powered translation through the backend

## Tech Stack

- Frontend: React, Vite, Redux Toolkit, Nodemailer
- Backend: Node.js, Express, MongoDB, Mongoose
- AI: Gemini via backend translation route

## Deployment Links
Deployed at:
https://spokeny.vercel.app/

## Project Structure

```text
SPOKENY/
├─ backend/
│  ├─ controllers/
│  ├─ middleware/
│  ├─ models/
│  ├─ routes/
│  ├─ utils/
│  ├─ server.js
│  └─ package.json
├─ frontend/
│  ├─ public/
│  ├─ src/
│  ├─ .env.example
│  ├─ vite.config.js
│  └─ package.json
└─ .gitignore
```

## Local Setup

### 1. Install dependencies

Backend:

```powershell
cd backend
npm install
```

Frontend:

```powershell
cd frontend
npm install
```

### 2. Configure environment variables

Backend file: `backend/.env`

Example:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/spokeny
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
FRONTEND_URL=http://localhost:5173
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_WEBHOOK_SECRET=your_webhook_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_email_user
SMTP_PASS=your_email_password
```

Frontend file: `frontend/.env`

```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Start the backend

```powershell
cd backend
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

Quick health check:

```text
http://localhost:5000/
```

Expected response:

```text
Spokeny API is running...
```

### 4. Start the frontend

```powershell
cd frontend
npm run dev
```

The frontend usually runs on:

```text
http://localhost:5173
```

## Build Commands

Frontend production build:

```powershell
cd frontend
npm run build
```

Backend production start:

```powershell
cd backend
npm start
```

## Deployment

### Frontend on Vercel

Use Vercel for the `frontend` app.

Settings:

- Root Directory: `frontend`
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `dist`

Environment variable on Vercel:

```env
VITE_API_URL=https://your-render-backend.onrender.com/api
```

Important:

- `VITE_API_URL` must include `/api`
- if you use only `https://your-backend.onrender.com`, translator requests will fail because routes are mounted under `/api/*`

### Backend on Render

Use Render for the `backend` service.

Settings:

- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`

Environment variables on Render:

- `PORT`
- `MONGO_URI`
- `JWT_SECRET`
- `GEMINI_API_KEY`
- `FRONTEND_URL`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`

### Recommended Deployment Flow

1. Deploy backend to Render
2. Confirm backend base URL works
3. Copy backend URL into Vercel as `VITE_API_URL=https://your-backend.onrender.com/api`
4. Deploy frontend to Vercel

## Troubleshooting

### Translator error: `Unexpected token '<', "<!DOCTYPE "... is not valid JSON`

This usually means the frontend received HTML instead of JSON.

Most common cause:

- `VITE_API_URL` is wrong

Correct:

```env
VITE_API_URL=https://your-backend.onrender.com/api
```

Wrong:

```env
VITE_API_URL=https://your-backend.onrender.com
```

Why:

- frontend calls `${VITE_API_URL}/ai/translate`
- backend route is mounted at `/api/ai/translate`

### Backend check on Render

Open:

```text
https://your-backend.onrender.com/
```

If it is running, you should see:

```text
Spokeny API is running...
```

### Gemini API key issues

If you see `403 Forbidden` with a leaked-key message:

- the current Gemini key has been blocked by Google
- generate a new key
- update `backend/.env`
- restart the backend

## Security Notes

- Never commit `.env` files
- Keep API keys only in local env files or hosting platform environment settings
- Rotate any secret that was ever pushed to GitHub

## Scripts Summary

Backend:

```json
"dev": "nodemon server.js",
"start": "node server.js"
```

Frontend:

```json
"dev": "vite",
"build": "vite build",
"preview": "vite preview"
```
