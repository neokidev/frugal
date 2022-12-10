import type { Decimal } from '@prisma/client/runtime';

export const decimalToString = (
  value: Decimal,
  fractionDigits: number
): string => {
  return Number(value)
    .toFixed(fractionDigits)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};
