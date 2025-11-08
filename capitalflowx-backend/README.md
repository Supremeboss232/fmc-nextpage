# CapitalFlowX Backend

### 🚀 Setup
1. `npm install`
2. Copy `.env.example` → `.env` and set:
   - MONGO_URI
   - JWT_SECRET
   - EMAIL_USER / EMAIL_PASS
3. Start: `npm start`
4. API runs at `http://localhost:5000`

### 📡 API Endpoints
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/contact`
- `POST /api/analytics/track`
- `GET /api/analytics/stats`
