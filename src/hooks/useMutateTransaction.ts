import { trpc } from '@/utils/trpc';

export const useMutateTransaction = () => {
  const utils = trpc.useContext();

  const createExpenseMutation = trpc.transaction.createExpense.useMutation({
    onSuccess: () => {
      utils.transaction.getTransactions
        .invalidate()
        .catch((error) => console.error(error));
      utils.user.getCurrentUserBalance
        .invalidate()
        .catch((error) => console.error(error));
    },
  });

  const createIncomeMutation = trpc.transaction.createIncome.useMutation({
    onSuccess: () => {
      utils.transaction.getTransactions
        .invalidate()
        .catch((error) => console.error(error));
      utils.user.getCurrentUserBalance
        .invalidate()
        .catch((error) => console.error(error));
    },
  });

  return { createExpenseMutation, createIncomeMutation };
};
