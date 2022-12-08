import { router, protectedProcedure, publicProcedure } from "../trpc";
import { createExpenseSchema } from "../../../schemas/expenses";

export const expensesRouter = router({
  createExpense: protectedProcedure
    .input(createExpenseSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.expenses.create({
        data: {
          ...input,
          user: {
            connect: {
              id: ctx.session?.user?.id,
            },
          },
        },
      });
    }),
  getExpenses: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.expenses.findMany({
      where: {
        userId: ctx.session?.user?.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),
});
