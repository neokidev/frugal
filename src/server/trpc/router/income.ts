import { Decimal } from '@prisma/client/runtime';

import { createIncomeSchema } from '@/schemas/income';
import {
  protectedProcedure,
  publicProcedure,
  router,
} from '@/server/trpc/trpc';

export const incomeRouter = router({
  createIncome: protectedProcedure
    .input(createIncomeSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.income.create({
        data: {
          name: input.name,
          description: input.description,
          amount: input.amount,
          date: input.date,
          user: {
            connect: {
              id: ctx.session?.user?.id,
            },
          },
        },
      });
    }),
  getIncomes: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.income.findMany({
      where: {
        userId: ctx.session?.user?.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }),
  getTotalIncomesAmount: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.income
      .findMany({
        where: {
          userId: ctx.session?.user?.id,
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
      .then((incomes) => {
        return incomes.reduce(
          (total, income) => total.add(income.amount),
          new Decimal(0)
        );
      });
  }),
});
