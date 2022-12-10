import { trpc } from '@/utils/trpc';

export const useMutateExpense = () => {
  const utils = trpc.useContext();

  const createExpenseMutation = trpc.expense.createExpense.useMutation({
    onSuccess: (res) => {
      const previousExpenses = utils.expense.getExpenses.getData();
      if (previousExpenses) {
        utils.expense.getExpenses.setData(undefined, [
          res,
          ...previousExpenses,
        ]);
      }
    },
  });

  return { createExpenseMutation };
};
