import Layout from '@/components/Layout';
import { Tab } from '@headlessui/react';
import { getSession } from 'next-auth/react';
import { useState } from 'react';
import dayjs from 'dayjs';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { TextInput } from '@mantine/core';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export async function getServerSideProps(context: any) {
  // Check if user is authenticated
  const session = await getSession(context);

  // If not, redirect to the homepage
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Home() {
  let [categories] = useState(['支出', '収入']);

  const form = useForm({
    initialValues: {
      date: new Date(),
      amount: 0,
      description: '',
    },

    transformValues: (values) => ({
      amount: Number(values.amount) || 0,
    }),
  });

  return (
    <Layout>
      <div className="bg-gray-100 h-screen">
        <div className="max-w-screen-sm mx-auto">
          <div className="w-full max-w-md px-2 py-16 sm:px-0">
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
                    className={classNames(
                      'rounded-xl bg-white p-3',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-gray-400 focus:outline-none focus:ring-2'
                    )}
                  >
                    <form>
                      <DatePicker
                        label="日付"
                        minDate={dayjs(new Date()).startOf('month').toDate()}
                        maxDate={dayjs(new Date()).endOf('month').toDate()}
                        {...form.getInputProps('date')}
                      />
                      <TextInput
                        type="number"
                        label="金額"
                        mt="md"
                        {...form.getInputProps('amount')}
                      />
                      <TextInput
                        label="内容"
                        mt="md"
                        {...form.getInputProps('description')}
                      />
                      <button
                        type="submit"
                        className="w-full bg-sky-400 hover:bg-sky-300 py-1 mt-4 rounded-lg text-white"
                      >
                        入力
                      </button>
                    </form>
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
    </Layout>
  );
}
