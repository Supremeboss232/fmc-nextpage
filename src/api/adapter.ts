import type { Market, MarketDetail, Trade, User } from '../types/global';
import { generateMarkets, generateTrades, generateMarketDetail, sampleUsers } from './mockData';

function randomDelay(min = 300, max = 800) {
  return Math.floor(min + Math.random() * (max - min));
}

function shouldError(rate = 0.02) {
  return Math.random() < rate;
}

let tokenCounter = 1;

export async function fetchMarkets(params: { limit?: number; search?: string; page?: number } = {}) {
  await new Promise((res) => setTimeout(res, randomDelay()));
  if (shouldError()) {
    const err = new Error('Network Error: failed to fetch markets');
    // @ts-ignore
    err.code = 503;
    throw err;
  }
  const { limit = 20, search = '', page = 1 } = params;
  const all = generateMarkets(50);
  const filtered = all.filter((m) => m.symbol.toLowerCase().includes(search.toLowerCase()) || m.name.toLowerCase().includes(search.toLowerCase()));
  const start = (Math.max(1, page) - 1) * limit;
  const pageItems = filtered.slice(start, start + limit);
  return {
    items: pageItems,
    total: filtered.length,
    page,
    limit
  } as { items: Market[]; total: number; page: number; limit: number };
}

export async function fetchMarketDetail(symbol: string): Promise<MarketDetail> {
  await new Promise((res) => setTimeout(res, randomDelay()));
  if (shouldError()) {
    throw new Error('Network Error: failed to fetch market detail');
  }
  return generateMarketDetail(symbol);
}

export async function fetchTrades(symbol: string, limit = 50): Promise<Trade[]> {
  await new Promise((res) => setTimeout(res, randomDelay(100, 400)));
  if (shouldError(0.01)) {
    throw new Error('Network Error: failed to fetch trades');
  }
  return generateTrades(symbol, limit);
}

export async function authLogin(credentials: { email: string; password: string }): Promise<{ token: string; user: User }> {
  await new Promise((res) => setTimeout(res, randomDelay()));
  const found = sampleUsers.find((u) => u.email === credentials.email);
  if (!found || credentials.password.length < 4) {
    const err = new Error('Invalid credentials');
    // @ts-ignore
    err.status = 401;
    throw err;
  }
  const token = `mock-token-${tokenCounter++}`;
  return { token, user: found };
}

export async function authRegister(payload: { name: string; email: string; password: string }): Promise<{ token: string; user: User }> {
  await new Promise((res) => setTimeout(res, randomDelay()));
  if (!payload.email.includes('@')) {
    const err = new Error('Invalid email');
    // @ts-ignore
    err.status = 400;
    throw err;
  }
  const newUser: User = {
    id: `u-${Date.now()}`,
    name: payload.name,
    email: payload.email,
    avatarUrl: `https://i.pravatar.cc/40?u=${encodeURIComponent(payload.email)}`
  };
  const token = `mock-token-${tokenCounter++}`;
  // In a real adapter you'd persist; here we just return.
  return { token, user: newUser };
}
