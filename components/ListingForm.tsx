import { useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import { DatePicker } from '@mantine/dates';
import dayjs from 'dayjs';
import { Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

const categories = ['expense', 'income'];

export type ListingFormValues = {
  date: Date;
  amount: number;
  description: string;
};

type ListingFormProps = {
  initialValues?: ListingFormValues;
  redirectPath?: string;
  buttonText?: string;
  onSubmit?: (value: ListingFormValues) => void;
};

const ListingForm = ({
  initialValues,
  redirectPath = '',
  buttonText = 'Submit',
  onSubmit,
}: ListingFormProps) => {
  const router = useRouter();

  const [disabled, setDisabled] = useState(false);

  const form = useForm({
    initialValues: initialValues ?? {
      date: new Date(),
      amount: 0,
      description: '',
    },

    transformValues: (values) => ({
      ...values,
      amount: Number(values.amount) || 0,
    }),
  });

  const handleOnSubmit = form.onSubmit((values) => {
    let toastId;
    try {
      setDisabled(true);
      toastId = toast.loading('Submitting...');
      // Submit data
      if (onSubmit) {
        onSubmit({ ...values });
      }
      toast.success('Successfully submitted', { id: toastId });
      // Redirect user
      if (redirectPath) {
        router.push(redirectPath);
      }
    } catch (e) {
      toast.error('Unable to submit', { id: toastId });
      setDisabled(false);
    }
  });

  return (
    <div className="m-4">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-gray-600/20 p-1">
          {categories.map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-gray-500',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-gray-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-gray-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {categories.map((_, idx) => (
            <Tab.Panel
              key={idx}
              className={
                'rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-gray-400 focus:outline-none focus:ring-2'
              }
            >
              <form onSubmit={handleOnSubmit}>
                <DatePicker
                  label="date"
                  minDate={dayjs().startOf('month').toDate()}
                  maxDate={dayjs().endOf('month').toDate()}
                  {...form.getInputProps('date')}
                />
                <TextInput
                  type="number"
                  label="amount"
                  mt="md"
                  {...form.getInputProps('amount')}
                />
                <TextInput
                  label="description"
                  mt="md"
                  {...form.getInputProps('description')}
                />
                <Button
                  type="submit"
                  disabled={disabled}
                  className="w-full bg-sky-400 hover:bg-sky-300 py-1 mt-4 rounded-lg text-white"
                >
                  {buttonText}
                </Button>
              </form>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default ListingForm;
