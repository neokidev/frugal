import { expenseRouter } from '@/server/trpc/router/expense';
import { incomeRouter } from '@/server/trpc/router/income';
import { router } from '@/server/trpc/trpc';

import { authRouter } from './auth';
import { exampleRouter } from './example';

export const appRouter = router({
  example: exampleRouter,
  income: incomeRouter,
  expense: expenseRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
