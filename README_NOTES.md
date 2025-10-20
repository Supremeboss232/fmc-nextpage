Developer Notes - Replacing Mock Adapter

To connect to a real backend:
1. Update src/api/adapter.ts to use axios or fetch to call VITE_API_BASE_URL.
2. Keep function signatures (fetchMarkets, fetchMarketDetail, fetchTrades, authLogin, authRegister).
3. Map backend response fields to types in src/types/global.d.ts.
4. Handle HTTP errors and return informative Error objects with status codes.
5. Remove random latency and low-probability errors once connected to real endpoints.
6. Update .env.local with VITE_API_BASE_URL and redeploy.

Example axios usage:
import axios from 'axios';
const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });

export async function fetchMarkets(params) {
  const res = await api.get('/markets', { params });
  return { items: res.data.items, total: res.data.total, page: res.data.page, limit: res.data.limit };
}
