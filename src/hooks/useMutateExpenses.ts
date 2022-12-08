import { trpc } from "../utils/trpc";

export const useMutateExpenses = () => {
  const createExpenseMutation = trpc.expenses.createExpense.useMutation();
  return { createExpenseMutation };
};
