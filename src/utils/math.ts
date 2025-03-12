export const calculatePercent = (percent: number, totalValue: number) =>
  ((percent / 100) * totalValue).toFixed(2);
