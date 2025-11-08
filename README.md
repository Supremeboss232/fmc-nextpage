CapitalFlowX Admin - Standalone (LowDB + Express + Guru Able theme)

Run:
  npm install
  npm run dev

Open:
  http://localhost:5000/login.html  -> admin login (admin@example.com / password123)
  http://localhost:5000/users.html  -> users management (requires login token)

Notes:
- Uses LowDB (db.json) for storage.
- Default admin created on first run.
- Login stores JWT in JavaScript localStorage for frontend pages.
