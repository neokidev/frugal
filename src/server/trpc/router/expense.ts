import { createExpenseSchema } from '@/schemas/expense';
import {
  protectedProcedure,
  publicProcedure,
  router,
} from '@/server/trpc/trpc';

export const expenseRouter = router({
  createExpense: protectedProcedure
    .input(createExpenseSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.expense.create({
        data: {
          name: input.name,
          description: input.description,
          amount: input.amount,
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
  getExpenses: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.expense.findMany({
      where: {
        userId: ctx.session?.user?.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }),
  getAllExpenseCategories: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.expenseCategory.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }),
});
