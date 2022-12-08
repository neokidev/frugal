import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { expensesRouter } from "./expenses";

export const appRouter = router({
  example: exampleRouter,
  expenses: expensesRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
