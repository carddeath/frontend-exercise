export type StockItem = {
  close: string;
  count: number;
  endTime: { microseconds: number; seconds: number };
  high: string;
  low: string;
  open: string;
  pair: string;
  startTime: { microseconds: number; seconds: number };
  volume: string;
  vwap: string;
};
