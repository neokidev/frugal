import { transactionRouter } from '@/server/trpc/router/transaction';
import { userRouter } from '@/server/trpc/router/user';
import { router } from '@/server/trpc/trpc';

import { authRouter } from './auth';
import { exampleRouter } from './example';

export const appRouter = router({
  example: exampleRouter,
  user: userRouter,
  transaction: transactionRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
