import { Tab } from '@headlessui/react';
import { NumberInput, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm, zodResolver } from '@mantine/form';
import dayjs from 'dayjs';

import { useMutateExpenses } from '@/hooks/useMutateExpenses';
import type { CreateExpenseInput } from '@/schemas/expenses';
import { createExpenseSchema } from '@/schemas/expenses';

export const AddTransactionForm = () => {
  const { createExpenseMutation } = useMutateExpenses();

  const form = useForm<CreateExpenseInput>({
    initialValues: {
      name: '',
      description: '',
      amount: 0,
      date: dayjs().toDate(),
    },
    validate: zodResolver(createExpenseSchema),
  });

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
          <form
            onSubmit={form.onSubmit((values) => {
              createExpenseMutation.mutate(values);
              form.reset();
            })}
          >
            <TextInput
              label="Name"
              {...form.getInputProps('name')}
              withAsterisk
            />
            <TextInput
              mt="sm"
              label="Description"
              {...form.getInputProps('description')}
            />
            <NumberInput
              mt="sm"
              label="Amount"
              min={0.01}
              step={0.01}
              precision={2}
              withAsterisk
              {...form.getInputProps('amount')}
            />
            <DatePicker
              mt="sm"
              label="Date"
              inputFormat="YYYY MMM DD"
              withAsterisk
              {...form.getInputProps('date')}
            />
            <button
              type="submit"
              className="mt-4 w-full rounded-md bg-sky-400 p-2 text-center text-sm font-bold text-white shadow hover:bg-sky-500 focus:ring-2 focus:ring-sky-500/30"
            >
              Save
            </button>
          </form>
        </Tab.Panel>
        <Tab.Panel>
          <div className="flex items-center justify-center">
            Not Implemented
          </div>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};
