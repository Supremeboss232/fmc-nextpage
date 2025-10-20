export type Market = {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
};

export type MarketDetail = Market & {
  orderBook: { bid: number; ask: number; size: number }[];
  description: string;
};

export type Trade = {
  id: string;
  timestamp: number;
  price: number;
  amount: number;
  side: 'buy' | 'sell';
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
};
