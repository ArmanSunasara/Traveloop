# Traveloop Backend API

The backend service for Traveloop, built with Node.js, Express, and PostgreSQL using Sequelize ORM.

## Prerequisites
- Node.js (v18+ recommended)
- PostgreSQL

## Environment Variables
Create a `.env` file in this directory with the following variables:
```env
PORT=5050
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=traveloop
JWT_SECRET=your_super_secret_jwt_key
```

## Installation & Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. (Optional) Run the database seed to populate initial data:
   ```bash
   npm run seed
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The server will run with `nodemon` and auto-restart on changes.
4. To start in production mode:
   ```bash
   npm start
   ```

## API Structure
- `/api/auth` - User registration and authentication
- `/api/trips` - Trip management and stop creation
- `/api/stops` - Manage individual stops in a trip
- `/api/cities` - City discovery
- `/api/activities` - Activities and attractions per city
- `/api/budget` - Expense tracking per trip
- `/api/checklist` - Packing checklist items
- `/api/notes` - Trip journaling and notes
- `/api/users` - User profile management