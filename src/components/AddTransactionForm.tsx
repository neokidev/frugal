import { useForm, zodResolver } from "@mantine/form";
import { NumberInput, TextInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { z } from "zod";
import dayjs from "dayjs";
import type { CreateExpenseInput } from "../schemas/expenses";
import { createExpenseSchema } from "../schemas/expenses";
import { useMutateExpenses } from "../hooks/useMutateExpenses";

export const AddTransactionForm = () => {
  const { createExpenseMutation } = useMutateExpenses();

  const form = useForm<CreateExpenseInput>({
    initialValues: {
      name: "",
      description: "",
      amount: 0,
      date: dayjs().toDate(),
    },
    validate: zodResolver(createExpenseSchema),
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        createExpenseMutation.mutate(values);
        form.reset();
      })}
    >
      <TextInput label="Name" {...form.getInputProps("name")} withAsterisk />
      <TextInput
        mt="sm"
        label="Description"
        {...form.getInputProps("description")}
      />
      <NumberInput
        mt="sm"
        label="Amount"
        min={0.01}
        step={0.01}
        precision={2}
        withAsterisk
        {...form.getInputProps("amount")}
      />
      <DatePicker
        mt="sm"
        label="Date"
        inputFormat="YYYY MMM DD"
        withAsterisk
        {...form.getInputProps("date")}
      />
      <button
        type="submit"
        className="mt-4 w-full rounded-md bg-sky-400 p-2 text-center text-sm font-bold text-white shadow hover:bg-sky-500 focus:ring-2 focus:ring-sky-500/30"
      >
        Save
      </button>
    </form>
  );
};
