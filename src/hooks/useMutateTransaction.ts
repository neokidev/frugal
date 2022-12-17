import { Prisma } from '@prisma/client';

import { trpc } from '@/utils/trpc';

export const useMutateTransaction = () => {
  const utils = trpc.useContext();

  const createExpenseMutation = trpc.transaction.createExpense.useMutation({
    onSuccess: (res) => {
      const previousExpenses = utils.transaction.getTransactions.getData();
      if (previousExpenses) {
        utils.transaction.getTransactions.setData(undefined, [
          res,
          ...previousExpenses,
        ]);
      }

      const previousTotalExpensesAmount =
        utils.transaction.getTotalExpensesAmount.getData();
      if (previousTotalExpensesAmount) {
        utils.transaction.getTotalExpensesAmount.setData(
          undefined,
          new Prisma.Decimal(previousTotalExpensesAmount).add(res.amount)
        );
      }
    },
  });

  const createIncomeMutation = trpc.transaction.createIncome.useMutation({
    onSuccess: (res) => {
      const previousIncomes = utils.transaction.getTransactions.getData();
      if (previousIncomes) {
        utils.transaction.getTransactions.setData(undefined, [
          res,
          ...previousIncomes,
        ]);
      }

      const previousTotalIncomesAmount =
        utils.transaction.getTotalIncomesAmount.getData();
      if (previousTotalIncomesAmount) {
        utils.transaction.getTotalIncomesAmount.setData(
          undefined,
          new Prisma.Decimal(previousTotalIncomesAmount).add(res.amount)
        );
      }
    },
  });

  return { createExpenseMutation, createIncomeMutation };
};
