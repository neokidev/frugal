import { Tab } from '@headlessui/react';

import { AddExpenseForm } from '@/components/AddTransactionForm/AddExpenseForm';
import { AddIncomeForm } from '@/components/AddTransactionForm/AddIncomeForm';

export const AddTransactionForm = () => {
  return (
    <Tab.Group>
      <Tab.List className="mb-4 flex text-center text-sm font-medium text-gray-500">
        <Tab
          className={({ selected }) =>
            `flex inline-flex w-full items-center justify-center rounded-t-lg border-b-2 p-1 focus:outline-none ${
              selected
                ? 'border-blue-600 text-blue-600'
                : 'border-gray-200 hover:border-gray-300 hover:text-gray-600'
            }`
          }
        >
          Expense
        </Tab>
        <Tab
          className={({ selected }) =>
            `flex inline-flex w-full items-center justify-center rounded-t-lg border-b-2 p-1 focus:outline-none ${
              selected
                ? 'border-blue-600 text-blue-600'
                : 'border-gray-200 hover:border-gray-300 hover:text-gray-600'
            }`
          }
        >
          Income
        </Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <AddExpenseForm />
        </Tab.Panel>
        <Tab.Panel>
          <AddIncomeForm />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};
