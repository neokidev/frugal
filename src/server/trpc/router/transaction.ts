import {
  createTransactionSchema,
  getTransactionsSchema,
} from '@/schemas/transaction';
import {
  protectedProcedure,
  publicProcedure,
  router,
} from '@/server/trpc/trpc';

export const transactionRouter = router({
  createExpense: protectedProcedure
    .input(createTransactionSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.transaction.create({
        data: {
          type: 'expense',
          name: input.name,
          description: input.description,
          amount: input.amount,
          currency: 'USD',
          date: input.date,
          category: {
            connect: {
              id: input.categoryId,
            },
          },
          user: {
            connect: {
              id: ctx.session?.user?.id,
            },
          },
        },
      });
    }),
  createIncome: protectedProcedure
    .input(createTransactionSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.transaction.create({
        data: {
          type: 'income',
          name: input.name,
          description: input.description,
          amount: input.amount,
          currency: 'USD',
          date: input.date,
          category: {
            connect: {
              id: input.categoryId,
            },
          },
          user: {
            connect: {
              id: ctx.session?.user?.id,
            },
          },
        },
      });
    }),
  getTransactions: publicProcedure
    .input(getTransactionsSchema)
    .query(({ ctx, input }) => {
      return ctx.prisma.transaction.findMany({
        where: {
          userId: ctx.session?.user?.id,
          date: {
            gte: input.startDate,
            lte: input.endDate,
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    }),
  getExpenseCategories: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.transactionCategory.findMany({
      where: {
        type: 'expense',
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }),
  getIncomeCategories: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.transactionCategory.findMany({
      where: {
        type: 'income',
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }),
});
