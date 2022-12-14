import { NumberInput, Select, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm, zodResolver } from '@mantine/form';
import dayjs from 'dayjs';

import { useMutateExpense } from '@/hooks/useMutateExpense';
import type { CreateExpenseInput } from '@/schemas/expense';
import { createExpenseSchema } from '@/schemas/expense';
import { trpc } from '@/utils/trpc';

export const AddExpenseForm = () => {
  const { data, isLoading, error } =
    trpc.expense.getAllExpenseCategories.useQuery();

  const { createExpenseMutation } = useMutateExpense();

  const form = useForm<CreateExpenseInput>({
    initialValues: {
      name: '',
      description: '',
      amount: 0,
      categoryId: '',
      date: dayjs().toDate(),
    },
    validate: zodResolver(createExpenseSchema),
  });

  if (isLoading) {
    return <p>Loading transactions...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        createExpenseMutation.mutate(values);
        form.reset();
      })}
    >
      <TextInput
        classNames={{
          label: 'dark:text-white',
          input: 'dark:bg-gray-800 dark:border-gray-600 dark:text-white',
        }}
        label="Name"
        withAsterisk
        {...form.getInputProps('name')}
      />
      <TextInput
        classNames={{
          label: 'dark:text-white',
          input: 'dark:bg-gray-800 dark:border-gray-600 dark:text-white',
        }}
        mt="sm"
        label="Description"
        {...form.getInputProps('description')}
      />
      <NumberInput
        classNames={{
          label: 'dark:text-white',
          input: 'dark:bg-gray-800 dark:border-gray-600 dark:text-white',
          control:
            'dark:text-white dark:border-gray-600 dark:enabled:hover:bg-gray-700 dark:disabled:text-gray-600',
        }}
        mt="sm"
        label="Amount"
        min={0.01}
        step={0.01}
        precision={2}
        withAsterisk
        {...form.getInputProps('amount')}
      />
      <DatePicker
        classNames={{
          label: 'dark:text-white',
          input: 'dark:bg-gray-800 dark:border-gray-600 dark:text-white',
        }}
        mt="sm"
        label="Date"
        inputFormat="YYYY MMM DD"
        withAsterisk
        {...form.getInputProps('date')}
      />
      <Select
        classNames={{
          label: 'dark:text-white',
          input: 'dark:bg-gray-800 dark:border-gray-600 dark:text-white',
          dropdown: 'dark:bg-gray-800 dark:border-gray-600 dark:text-white',
          item: 'dark:bg-gray-800 dark:border-gray-600 dark:text-white',
        }}
        mt="sm"
        label="Category"
        data={data.map((value) => ({
          value: value.id,
          label: value.name,
        }))}
        value={form.values.categoryId}
        onChange={(value) => value && form.setFieldValue('categoryId', value)}
        nothingFound="Nobody here"
        searchable
        withAsterisk
        {...form.getInputProps('categoryId')}
      />
      <button
        type="submit"
        className="mt-4 w-full rounded-md bg-sky-400 p-2 text-center text-sm font-bold text-white shadow hover:bg-sky-500 focus:ring-2 focus:ring-sky-500/30 dark:bg-sky-500 dark:hover:bg-sky-600"
      >
        Save
      </button>
    </form>
  );
};
