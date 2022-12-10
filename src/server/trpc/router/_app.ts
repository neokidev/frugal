import { router } from '@/server/trpc/trpc';

import { authRouter } from './auth';
import { exampleRouter } from './example';
import { expenseRouter } from './expense';

export const appRouter = router({
  example: exampleRouter,
  expense: expenseRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
