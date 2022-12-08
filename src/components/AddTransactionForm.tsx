import { useForm, zodResolver } from "@mantine/form";
import { NumberInput, TextInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { z } from "zod";
import dayjs from "dayjs";

export const AddTransactionForm = () => {
  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      amount: undefined,
      date: dayjs().toDate(),
    },

    validate: zodResolver(
      z.object({
        name: z
          .string({ required_error: "Name is required" })
          .min(1, "Name is required"),
        description: z.string().optional(),
        amount: z.number({ required_error: "Amount is required" }).min(0.01),
        date: z.date({
          required_error: "Date is required",
          invalid_type_error: "Date is required",
        }),
      })
    ),
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log("values:", values))}>
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
