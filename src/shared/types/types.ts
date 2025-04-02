export interface Asset {
  symbol: string;
  quantity: number;
}

export interface Prices {
  [key: string]: {
    price: number;
    change24h: number;
  };
}

export interface BinanceTicker {
  stream: string;
  data: { c: string; P: string };
}