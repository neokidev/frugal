import { decimalToString } from '@/utils/decimal';
import { trpc } from '@/utils/trpc';

import { AddTransactionForm } from './AddTransactionForm/AddTransactionForm';
import { TransactionList } from './TransactionList';

export const Home = () => {
  const {
    data: totalExpenses,
    isLoading: isTotalExpensesLoading,
    error: getTotalExpensesError,
  } = trpc.expense.getTotalExpensesAmount.useQuery();

  const {
    data: totalIncomes,
    isLoading: isTotalIncomesLoading,
    error: getTotalIncomesError,
  } = trpc.income.getTotalIncomesAmount.useQuery();

  if (isTotalExpensesLoading && isTotalIncomesLoading) {
    return <p>Loading transactions...</p>;
  }

  if (getTotalExpensesError) {
    return <p>{getTotalExpensesError.message}</p>;
  }

  if (getTotalIncomesError) {
    return <p>{getTotalIncomesError.message}</p>;
  }

  return (
    <div className="mx-auto flex w-full max-w-[80rem] p-6">
      <div className="w-full px-3">
        <div className="text-2xl font-extrabold text-[#344767] dark:text-gray-100">
          Welcome Back!
        </div>

        <div className="flex w-full">
          <div className="w-full lg:mr-4">
            <div className="-mx-3 flex flex-wrap">
              <div className="mt-6 w-full max-w-full shrink-0 px-3 md:w-1/3">
                <div className="flex flex-col overflow-hidden break-words rounded-2xl border border-black/5 bg-white shadow-md shadow-black/5 dark:border-white/5 dark:bg-gray-900">
                  <div className="rounded-t-2xl p-4">
                    <p className="text-sm font-semibold capitalize leading-normal">
                      total balance
                    </p>
                    <h5 className="mb-0 text-xl font-bold">{' $130,832 '}</h5>
                    <p>
                      <span className="text-sm font-bold leading-normal text-lime-500">
                        {'+90% '}
                      </span>
                      <span className="text-xs font-semibold leading-normal text-slate-400 dark:text-slate-500">
                        from last weeks
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 w-full max-w-full shrink-0 px-3 md:w-1/3">
                <div className="flex flex-col overflow-hidden break-words rounded-2xl border border-black/5 bg-white shadow-md shadow-black/5 dark:border-white/5 dark:bg-gray-900">
                  <div className="rounded-t-2xl p-4">
                    <p className="text-sm font-semibold capitalize leading-normal">
                      income
                    </p>
                    {!!totalIncomes && (
                      <h5 className="mb-0 text-xl font-bold">{` $${decimalToString(
                        totalIncomes,
                        2
                      )} `}</h5>
                    )}
                    <p>
                      <span className="text-sm font-bold leading-normal text-lime-500">
                        {'+90% '}
                      </span>
                      <span className="text-xs font-semibold leading-normal text-slate-400 dark:text-slate-500">
                        from last weeks
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 w-full max-w-full shrink-0 px-3 md:w-1/3">
                <div className="flex flex-col overflow-hidden break-words rounded-2xl border border-black/5 bg-white shadow-md shadow-black/5 dark:border-white/5 dark:bg-gray-900 ">
                  <div className="rounded-t-2xl p-4">
                    <p className="text-sm font-semibold capitalize leading-normal">
                      expenses
                    </p>
                    {!!totalExpenses && (
                      <h5 className="mb-0 text-xl font-bold">{` $${decimalToString(
                        totalExpenses,
                        2
                      )} `}</h5>
                    )}
                    <p>
                      <span className="text-sm font-bold leading-normal text-red-500">
                        {'-90% '}
                      </span>
                      <span className="text-xs font-semibold leading-normal text-slate-400 dark:text-slate-500">
                        from last weeks
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap">
              <div className="flex-0 flex w-full max-w-full shrink-0 flex-col overflow-hidden break-words rounded-2xl border border-black/5 bg-white shadow-md shadow-black/5 dark:border-white/5 dark:bg-gray-900">
                <div className="p-4">
                  <h6 className="mb-2">Transitions</h6>

                  <TransactionList />
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:ml-4 lg:block lg:w-96">
            <div className="mt-6 flex flex-wrap">
              <div className="flex-0 flex w-full max-w-full shrink-0 flex-col overflow-hidden break-words rounded-2xl border border-black/5 bg-white shadow-md shadow-black/5 dark:border-white/5 dark:bg-gray-900">
                <div className="p-4">
                  <h6 className="mb-2">Add transaction</h6>
                  <AddTransactionForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
