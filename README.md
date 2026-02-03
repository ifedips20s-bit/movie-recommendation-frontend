🎬 Movie Recommendation App

A Next.js + TypeScript web application that allows users to browse trending movies, view movie details, and save favorites. This project demonstrates real-world frontend skills including API integration, dynamic routing, SSR, PWA features, dark mode, and user personalization.

🌟 Features

Trending Movies Dashboard – Fetches trending movies from the backend API.

Movie Details Pages – Dynamic routing with detailed information for each movie.

Favorites – Users can save movies to favorites (JWT protected).

Search & Pagination – Quickly find movies and navigate large lists.

Dark Mode – Toggle between light and dark themes.

Progressive Web App (PWA) – Offline support and installable on devices.

Server-Side Rendering (SSR) – Optimized performance and SEO-friendly pages.

Responsive UI – Works seamlessly on mobile, tablet, and desktop.

Error Handling & Loading States – Skeleton loaders and clear error messages.

🛠 Technologies Used

Next.js 16 – Framework for SSR and dynamic routing.

TypeScript – Type-safe development.

Styled Components – Modular and reusable UI components.

Axios – API requests with JWT authentication support.

next-pwa – PWA support.

Vercel – Deployment platform.

📁 Project Structure
src/
├─ api/           # Axios API setup & request functions
├─ components/    # Reusable UI components (MovieCard, Navbar, etc.)
├─ context/       # Theme and auth context
├─ pages/         # Next.js pages: index, /movies/[id], /favorites
├─ services/      # Business logic or helpers (optional)
├─ styles/        # Global styles & themes
├─ utils/         # Utility functions

⚡ Getting Started
1. Clone the repo
git clone https://github.com/<your-username>/movie-recommendation-frontend.git
cd movie-recommendation-frontend

2. Install dependencies
npm install

3. Configure environment variables

Create a .env.local file in the project root:

NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000/api
NEXT_PUBLIC_TEST_TOKEN=your_access_token_here

4. Run locally
npm run dev --webpack


Open http://localhost:3000
 to view the app.

🖥 Pages Overview

Dashboard: pages/index.tsx – Shows trending movies with favorites button.

Movie Details: pages/movies/[id].tsx – Detailed movie info and add to favorites.

Favorites: pages/favorites.tsx – Shows all favorite movies (JWT required).

🎯 API Integration

Trending Movies: GET /movies/trending/

Movie Details: GET /movies/:id/

Favorites:

GET /movies/favorites/

POST /movies/favorites/ (JWT protected)

All API calls are proxied via Axios using the base URL from .env.local.

🌙 Dark Mode

Toggle between light and dark themes.

Fully responsive with styled-components.

📦 PWA Support

Offline caching of pages and assets.

Service worker auto-generated in public/.

Installable on desktop and mobile devices.

✅ Deployment

Push to GitHub:

git add .
git commit -m "Final FE build ready for deployment"
git push origin main


Deploy on Vercel:

Connect your repo.

Vercel automatically detects Next.js project.

Set .env variables in Vercel dashboard.

Visit the live app link provided by Vercel.

💡 Notes for Evaluators

JWT is optional for testing favorites; default token provided in .env.local.

All API URLs use environment variables for flexibility.

No console errors, all pages SSR-enabled, and PWA features are functional.

🛠 Future Improvements

Infinite scrolling for movie lists.

User authentication & profile management.

Movie rating and reviews functionality.

Animations & micro-interactions for enhanced UX.

Project Status: Complete ✅
Demo & Live App: [https://movie-recommendation-frontend-3xx4w0kkb.vercel.app]