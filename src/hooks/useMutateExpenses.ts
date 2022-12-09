import { trpc } from "../utils/trpc";

export const useMutateExpenses = () => {
  const utils = trpc.useContext();

  const createExpenseMutation = trpc.expenses.createExpense.useMutation({
    onSuccess: (res) => {
      const previousExpenses = utils.expenses.getExpenses.getData();
      if (previousExpenses) {
        utils.expenses.getExpenses.setData(undefined, [
          ...previousExpenses,
          res,
        ]);
      }
    },
  });

  return { createExpenseMutation };
};
