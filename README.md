# ✈️ Traveloop

**Traveloop** is a full-stack travel planning app. Build multi-city itineraries, track your budget, manage packing lists, discover local activities, and share your trips with anyone.

---

## Features

- 🗺️ **Itinerary Builder** — Add city stops, set dates, and reorder them with drag-and-drop
- 💸 **Budget Tracker** — Log transport, accommodation, and meal costs; activity costs roll up automatically
- ✅ **Packing Checklist** — Categorized checklist with live progress tracking
- 📝 **Trip Notes** — Write notes at the trip or stop level
- 🌍 **City Explorer** — Browse destinations and add curated activities to your stops
- 🔗 **Public Sharing** — Share a read-only link to any trip

---

## Tech Stack

| | |
|---|---|
| **Frontend** | React 19, Vite, Tailwind CSS v4, Framer Motion, React Router DOM |
| **Backend** | Node.js, Express |
| **Database** | PostgreSQL via Sequelize ORM |
| **Auth** | JWT (7-day tokens), bcrypt |
| **Deployment** | Render (API + DB), Vercel (frontend) |

---

## Getting Started

You'll need **Node.js v18+** and a running **PostgreSQL** instance.

### 1. Clone the repo

```bash
git clone https://github.com/your-username/traveloop.git
cd traveloop
```

### 2. Set up the backend

```bash
cd Backend
```

Create a `.env` file:

```env
PORT=5050
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=traveloop
JWT_SECRET=your_super_secret_jwt_key
```

```bash
npm install
npm run seed   # optional: seed cities and activities
npm run dev    # starts on http://localhost:5050
```

### 3. Set up the frontend

```bash
cd ../frontend
npm install
npm run dev    # starts on http://localhost:5173
```

The frontend points to `http://localhost:5050/api` by default. Override with a `.env` file if needed:

```env
VITE_API_URL=http://localhost:5050/api
```

---

## Project Structure

```
traveloop/
├── Backend/
│   ├── config/        # Database connection
│   ├── middleware/    # Auth & admin guards
│   ├── models/        # Sequelize models & associations
│   ├── routes/        # REST API routes
│   └── server.js      # Entry point
│
└── frontend/
    └── src/
        ├── pages/         # Route-level views
        ├── components/ui/ # Shared design system
        ├── context/       # Auth state (AuthContext)
        └── services/      # Axios API wrappers
```

---

## API Overview

| Resource | Endpoint | Auth |
|---|---|---|
| Auth | `POST /api/auth/register` `POST /api/auth/login` | Public |
| Trips | `GET/POST /api/trips` | Required |
| Trip detail | `GET/PUT/DELETE /api/trips/:id` | Required |
| Stops | `GET/POST /api/trips/:id/stops` | Required |
| Stop management | `PUT/DELETE /api/stops/:id` | Required |
| Activities on stop | `POST/DELETE /api/stops/:id/activities/:activityId` | Required |
| Budget | `GET/PUT /api/budget/trips/:id` | Required |
| Checklist | `GET/POST /api/checklist/trips/:id` | Required |
| Notes | `GET/POST /api/notes/trips/:id` | Required |
| Cities | `GET /api/cities` | Required |
| Activities | `GET /api/activities?city_id=` | Required |
| Profile | `GET/PUT/DELETE /api/users/me` | Required |
| Public trip | `GET /api/trips/:id/public` | Public |
| Admin | `GET /api/admin/stats` `GET /api/admin/users` | Admin only |

For full request/response details, see [TRAVELOOP_DOCUMENTATION.md](./TRAVELOOP_DOCUMENTATION.md).

---

## Deployment

The project deploys to **Render** (backend + database) and **Vercel** (frontend) out of the box.

**Backend:** Push to your repo and connect it on [render.com](https://render.com). The `render.yaml` in the root defines the web service and PostgreSQL database automatically — including auto-generated `JWT_SECRET`.

**Frontend:** Import the repo on [vercel.com](https://vercel.com). Set one environment variable:

```
VITE_API_URL=https://your-render-service.onrender.com/api
```

Vercel's SPA routing is already configured via `vercel.json`.

---

## Contributing

1. Fork the repo and create a feature branch
2. Make your changes — keep backend and frontend concerns separate
3. Open a pull request with a clear description of what changed and why
