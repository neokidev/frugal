import type { Transaction } from '@prisma/client';
import { Prisma } from '@prisma/client';

export const calcTotalAmount = (transactions: Transaction[]) => {
  return transactions.reduce((total, transaction) => {
    return transaction.type === 'income'
      ? total.add(transaction.amount)
      : total.sub(transaction.amount);
  }, new Prisma.Decimal(0));
};

export const calcTotalExpensesAmount = (transactions: Transaction[]) => {
  return transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((total, transaction) => {
      return total.add(transaction.amount);
    }, new Prisma.Decimal(0));
};

export const calcTotalIncomeAmount = (transactions: Transaction[]) => {
  return transactions
    .filter((transaction) => transaction.type === 'income')
    .reduce((total, transaction) => {
      return total.add(transaction.amount);
    }, new Prisma.Decimal(0));
};
