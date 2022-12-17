import { transactionRouter } from '@/server/trpc/router/transaction';
import { router } from '@/server/trpc/trpc';

import { authRouter } from './auth';
import { exampleRouter } from './example';

export const appRouter = router({
  example: exampleRouter,
  transaction: transactionRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
