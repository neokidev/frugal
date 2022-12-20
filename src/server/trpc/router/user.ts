import {
  protectedProcedure,
  publicProcedure,
  router,
} from '@/server/trpc/trpc';

export const userRouter = router({
  createCurrentUserAdditionalData: protectedProcedure.mutation(
    async ({ ctx }) => {
      return await ctx.prisma.balance.create({
        data: {
          currency: 'USD',
          balance: 0,
          user: {
            connect: {
              id: ctx.session?.user?.id,
            },
          },
        },
      });
    }
  ),
  getCurrentUserBalance: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.balance.findUnique({
      where: {
        userId: ctx.session?.user?.id,
      },
    });
  }),
});
