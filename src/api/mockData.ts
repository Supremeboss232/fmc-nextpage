import type { Market, Trade, User, MarketDetail } from '../types/global';

function seededRandom(seed: number) {
  let t = seed >>> 0;
  return function () {
    t += 0x6D2B79F5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

const marketSymbols = [
  ['BTC', 'Bitcoin'],
  ['ETH', 'Ethereum'],
  ['SOL', 'Solana'],
  ['BNB', 'Binance Coin'],
  ['ADA', 'Cardano'],
  ['DOGE', 'Dogecoin'],
  ['XRP', 'Ripple'],
  ['DOT', 'Polkadot'],
  ['LTC', 'Litecoin'],
  ['LINK', 'Chainlink']
];

export function generateMarkets(count = 10, seed = 42): Market[] {
  const rnd = seededRandom(seed);
  const markets: Market[] = [];
  for (let i = 0; i < Math.max(1, count); i++) {
    const idx = i % marketSymbols.length;
    const [symbol, name] = marketSymbols[idx];
    const price = Number((50 + rnd() * 60000).toFixed(2));
    const change24h = Number((rnd() * 20 - 10).toFixed(2)); // -10% to +10%
    const volume24h = Number((rnd() * 1_000_000).toFixed(2));
    const marketCap = Number((price * (10_000_000 * (1 + rnd()))).toFixed(2));
    markets.push({ symbol, name, price, change24h, volume24h, marketCap });
  }
  return markets;
}

export function generateTrades(symbol: string, count = 20, seed = 123): Trade[] {
  const rnd = seededRandom(seed + symbol.length);
  const trades: Trade[] = [];
  for (let i = 0; i < count; i++) {
    const side: 'buy' | 'sell' = rnd() > 0.5 ? 'buy' : 'sell';
    const price = Number((100 + rnd() * 60000).toFixed(2));
    const amount = Number((rnd() * 5).toFixed(6));
    trades.push({
      id: `${symbol}-${Date.now()}-${i}`,
      timestamp: Date.now() - Math.floor(rnd() * 1000 * 60 * 60),
      price,
      amount,
      side
    });
  }
  return trades;
}

export const sampleUsers: User[] = [
  {
    id: 'u-1',
    name: 'Alice Trader',
    email: 'alice@example.com',
    avatarUrl: 'https://i.pravatar.cc/40?u=alice'
  },
  {
    id: 'u-2',
    name: 'Bob Builder',
    email: 'bob@example.com',
    avatarUrl: 'https://i.pravatar.cc/40?u=bob'
  }
];

export function generateMarketDetail(symbol: string, seed = 99): MarketDetail {
  const base = generateMarkets(1, seed)[0];
  return {
    ...base,
    symbol,
    description: `${base.name} (${symbol}) is a financial instrument mock used for UI demos.`,
    orderBook: [
      { bid: Number((base.price - 1).toFixed(2)), ask: Number((base.price + 1).toFixed(2)), size: 12 },
      { bid: Number((base.price - 2).toFixed(2)), ask: Number((base.price + 2).toFixed(2)), size: 5 },
      { bid: Number((base.price - 3).toFixed(2)), ask: Number((base.price + 3).toFixed(2)), size: 1 }
    ]
  };
}
