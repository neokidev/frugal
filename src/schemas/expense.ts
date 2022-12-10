import { z } from 'zod';

export const createExpenseSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(1, 'Name is required'),
  description: z.string().nullish(),
  amount: z
    .number({ required_error: 'Amount is required' })
    .min(0.01, 'Amount must be grater than 0'),
  date: z.date({
    required_error: 'Date is required',
    invalid_type_error: 'Date is required',
  }),
  categoryId: z.string({ required_error: 'Category is required' }).cuid('Category is required'),
});

export type CreateExpenseInput = z.TypeOf<typeof createExpenseSchema>;
