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
      const userId = ctx.session?.user?.id;

      const transaction = await ctx.prisma.transaction.create({
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
              id: userId,
            },
          },
        },
      });

      const previousBalance = await ctx.prisma.balance.findUnique({
        where: {
          userId,
        },
      });

      if (previousBalance) {
        await ctx.prisma.balance.update({
          data: {
            currency: 'USD',
            balance: previousBalance.balance.sub(transaction.amount),
          },
          where: {
            userId,
          },
        });
      }

      return transaction;
    }),
  createIncome: protectedProcedure
    .input(createTransactionSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user?.id;

      const transaction = await ctx.prisma.transaction.create({
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
              id: userId,
            },
          },
        },
      });

      const previousBalance = await ctx.prisma.balance.findUnique({
        where: {
          userId,
        },
      });

      if (previousBalance) {
        await ctx.prisma.balance.update({
          data: {
            currency: 'USD',
            balance: previousBalance.balance.add(transaction.amount),
          },
          where: {
            userId,
          },
        });
      }

      return transaction;
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
