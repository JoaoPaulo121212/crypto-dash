export interface CoinData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
  sparkline_in_7d: {
    price: number[];
  };
}

export type TimeRange = '1h' | '24h' | '7d';