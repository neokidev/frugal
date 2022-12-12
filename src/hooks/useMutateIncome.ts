import { trpc } from '@/utils/trpc';

export const useMutateIncome = () => {
  const utils = trpc.useContext();

  const createIncomeMutation = trpc.income.createIncome.useMutation({
    onSuccess: (res) => {
      const previousExpenses = utils.income.getIncomes.getData();
      if (previousExpenses) {
        utils.income.getIncomes.setData(undefined, [res, ...previousExpenses]);
      }
    },
  });

  return { createIncomeMutation };
};
