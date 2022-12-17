import { Prisma } from '@prisma/client';

import { createTransactionSchema } from '@/schemas/transaction';
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
  getTransactions: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.transaction.findMany({
      where: {
        userId: ctx.session?.user?.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }),
  getExpenses: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.transaction.findMany({
      where: {
        userId: ctx.session?.user?.id,
        type: 'expense',
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }),
  getIncomes: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.transaction.findMany({
      where: {
        userId: ctx.session?.user?.id,
        type: 'income',
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }),
  getTotalExpensesAmount: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.transaction
      .findMany({
        where: {
          userId: ctx.session?.user?.id,
          type: 'expense',
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
      .then((expenses) => {
        return expenses.reduce(
          (total, expense) => total.add(expense.amount),
          new Prisma.Decimal(0)
        );
      });
  }),
  getTotalIncomesAmount: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.transaction
      .findMany({
        where: {
          userId: ctx.session?.user?.id,
          type: 'income',
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
      .then((incomes) => {
        return incomes.reduce(
          (total, income) => total.add(income.amount),
          new Prisma.Decimal(0)
        );
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
