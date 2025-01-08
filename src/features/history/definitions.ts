export const HISTORY_PERIODS = ['1M', '1Y', '5Y'] as const;
export type HistoryPeriod = (typeof HISTORY_PERIODS)[number];

export type StarHistory = {
  date: string;
  totalStars: number;
};
