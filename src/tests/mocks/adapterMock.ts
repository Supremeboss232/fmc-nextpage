import type { Market, MarketDetail, Trade, User } from '../../types/global';

export const fetchMarkets = jest.fn(async () => ({
  items: [
    { symbol: 'BTC', name: 'Bitcoin', price: 30000, change24h: 1.2, volume24h: 100000, marketCap: 600000000 },
    { symbol: 'ETH', name: 'Ethereum', price: 1800, change24h: -0.5, volume24h: 50000, marketCap: 200000000 }
  ],
  total: 2,
  page: 1,
  limit: 20
}));

export const fetchMarketDetail = jest.fn(async (symbol: string) => ({
  symbol,
  name: symbol,
  price: 100,
  change24h: 0,
  volume24h: 1000,
  marketCap: 100000,
  orderBook: [{ bid: 99, ask: 101, size: 1 }],
  description: 'mock'
} as MarketDetail));

export const fetchTrades = jest.fn(async () => [
  { id: 't1', timestamp: Date.now(), price: 100, amount: 0.1, side: 'buy' }
] as Trade[]);

export const authLogin = jest.fn(async ({ email }: { email: string }) => ({
  token: 'mock',
  user: { id: 'u1', name: 'Test', email, avatarUrl: '' } as User
}));

export const authRegister = jest.fn(async ({ name, email }: { name: string; email: string }) => ({
  token: 'mock',
  user: { id: 'u2', name, email, avatarUrl: '' } as User
}));
