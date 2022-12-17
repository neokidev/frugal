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
    },
  });

  return { createExpenseMutation, createIncomeMutation };
};
