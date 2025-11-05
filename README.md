# HD Booking - Fullstack Booking Platform

A complete end-to-end web application for booking travel experiences, built with React + TypeScript and Node.js + Express.

## Features

- 🏨 Browse and explore travel experiences
- 📅 Select available dates and time slots
- 💳 Complete booking with promo code support
- ✅ Booking confirmation with reference ID
- 📱 Fully responsive design matching Figma specifications

## Tech Stack

### Frontend
- React 19 + TypeScript
- Vite
- TailwindCSS
- React Router
- Axios

### Backend
- Node.js + Express
- TypeScript
- MongoDB with Mongoose
- RESTful API

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas)

## Setup Instructions

### 1. Clone and Navigate

```bash
cd hd-booking
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/hd-booking
```

Or use MongoDB Atlas:

```env
MONGODB_URI=your_mongodb_atlas_connection_string
```

### 3. Seed Database

```bash
npm run seed
```

This will populate the database with sample experiences and promo codes.

### 4. Start Backend Server

```bash
npm run dev
```

The backend will run on `http://localhost:3000`

### 5. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:3000/api
```

### 6. Start Frontend Server

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## Available Promo Codes

- `SAVE10` - 10% discount
- `FLAT100` - ₹100 flat discount
- `WELCOME20` - 20% discount

## API Endpoints

### Experiences
- `GET /api/experiences` - Get all experiences
- `GET /api/experiences/:id` - Get experience by ID

### Bookings
- `POST /api/bookings` - Create a new booking

### Promo Codes
- `POST /api/promo/validate` - Validate promo code

## Project Structure

```
hd-booking/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── types/           # TypeScript types
│   └── ...
├── backend/
│   ├── src/
│   │   ├── models/         # MongoDB models
│   │   ├── routes/          # API routes
│   │   └── seed.ts          # Database seeder
│   └── ...
└── README.md
```

## Deployment

### Backend (Render/Railway/AWS)

1. Set environment variables:
   - `PORT`
   - `MONGODB_URI`

2. Build command: `npm run build`
3. Start command: `npm start`

### Frontend (Vercel/Netlify)

1. Set environment variable:
   - `VITE_API_URL` (your backend URL)

2. Build command: `npm run build`
3. Output directory: `dist`

## Development

- Backend dev server: `npm run dev` (with nodemon)
- Frontend dev server: `npm run dev` (with Vite HMR)

## License

ISC
