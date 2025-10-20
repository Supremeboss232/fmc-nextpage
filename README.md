# CapitalFlowX - UI Clone

A frontend-only static SPA (React + TypeScript + Vite + Tailwind) that mimics a trading platform UI. The app uses a local mock API adapter to simulate markets, trades and authentication. It's designed for local development and static deployment (Netlify, Vercel, S3).

Features
- Market listing, market detail pages with order book and recent trades.
- Authentication (mock) with login and registration flows.
- Dashboard (protected) with portfolio stored in localStorage.
- Tailwind-based responsive UI components.
- Mock API with realistic latency and error simulation.
- Unit + integration test examples (Jest + Testing Library).
- Dockerfile for static hosting with nginx.
- CI workflow example.

Prerequisites
- Node.js >= 18
- npm (or use pnpm/yarn but package.json scripts assume npm)
- Optional: Docker (for container build)

Installation
1. Clone the repository
   git clone <repo-url>
   cd capitalflowx-ui-clone

2. Install dependencies
   npm ci

Development
- Start the dev server:
  npm run dev
  Open http://localhost:5173

Production build
- Build:
  npm run build
- Preview production:
  npm run preview

Configuration (.env)
- Copy .env.example to .env.local or set environment variables in your hosting platform.
  VITE_API_BASE_URL - (optional) when replacing the mock adapter with a real API.
  VITE_APP_TITLE - App title for meta usage.

Replacing mock adapter with a real API
- Implement real HTTP calls in src/api/adapter.ts (currently returns mock data).
- Use axios and VITE_API_BASE_URL env variable.
- Ensure returned shapes conform to src/types/global.d.ts.

Docker (optional)
- Build container:
  docker build -t capitalflowx-ui-clone .
- Run:
  docker run -p 8080:80 capitalflowx-ui-clone

Testing
- Run tests:
  npm test
- Run in watch mode:
  npm run test:watch

CI
- Example GitHub Actions workflow included: tests-workflow.yml. It runs typechecking, tests and build on push/pull_request.

Project structure
- src/
  - api/ - mock API adapter and mock data
  - components/ - UI components (Header, Footer, Table, Modal, forms)
  - context/ - Global and Toast contexts
  - hooks/ - reusable React hooks (useAuth, useMarkets, useTrades, debounce, polling)
  - pages/ - route pages (Home, Markets, MarketDetail, Dashboard, Login, Register)
  - styles/ - Tailwind entry CSS
  - types/ - shared TypeScript types
  - utils/ - formatters, validators, csv export
- public/ - static assets for SPA configuration
- tests-workflow.yml - CI workflow example
- Dockerfile - multi-stage static build
- netlify.toml - Netlify config

Usage examples
- Search markets from header: type "BTC" and press enter or wait for debounced navigation.
- Click a market to view details, trades, order book.
- Register or login using any sample email from src/api/mockData.ts (e.g., alice@example.com) and password length >= 4.
- Visit /dashboard after login to view portfolio and export CSV.

Troubleshooting
- Dev server fails to start:
  - Ensure Node 18+ is installed.
  - Delete node_modules and run `npm ci`.
- Tailwind styles not applying:
  - Ensure PostCSS and Tailwind are installed (see package.json).
  - Restart dev server after config changes.
- Tests failing:
  - Run `npm run typecheck` to see TS errors.
  - Ensure jest environment has proper mocks (see src/tests).

Developer notes
- For production, replace the mock adapter with backend calls and secure auth flows.
- Keep types in src/types/global.d.ts in sync with backend contracts.

License
MIT
