# Traveloop Frontend

The sleek, modern user interface for Traveloop. Built with React, Vite, Tailwind CSS, and Framer Motion.

## Tech Stack
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **HTTP Client**: Axios

## Environment Variables
Create a `.env` file in this directory if you need to point to a custom backend URL (defaults to `http://localhost:5050/api`):
```env
VITE_API_URL=http://localhost:5050/api
```

## Installation & Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:5173` in your browser.

## Build for Production
To create an optimized production build:
```bash
npm run build
```
The output will be generated in the `dist` folder.
