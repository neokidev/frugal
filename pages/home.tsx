import Layout from '@/components/Layout';
import { getSession } from 'next-auth/react';
import { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { useForm } from '@mantine/form';
import { ImSpoonKnife } from 'react-icons/im';
import { IoIosHome, IoLogoGameControllerB } from 'react-icons/io';
import { RiShoppingCart2Fill } from 'react-icons/ri';
import { faker } from '@faker-js/faker';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import colors from 'tailwindcss/colors';
import minMax from 'dayjs/plugin/minMax';
import isBetween from 'dayjs/plugin/isBetween';
import isToday from 'dayjs/plugin/isToday';
import { Transaction } from '@/components/Transaction';
import {
  HiAdjustmentsVertical,
  HiMagnifyingGlass,
  HiOutlineMagnifyingGlass,
} from 'react-icons/hi2';
import { HiSearch } from 'react-icons/hi';

dayjs.extend(minMax);
dayjs.extend(isBetween);
dayjs.extend(isToday);

ChartJS.register(ArcElement, Tooltip, Legend);

const categories = ['food', 'rent', 'entertainment', 'dailyNecessities'];

const createExpensesMock = () => {
  const now = dayjs();

  return [
    {
      id: 1,
      description: faker.lorem.sentence(),
      date: faker.date
        .between(now.startOf('month').toDate(), now.endOf('month').toDate())
        .toString(),
      amount: faker.datatype.number({ min: 5, max: 200 }),
      category: faker.helpers.arrayElement(categories),
    },
    {
      id: 2,
      description: faker.lorem.sentence(),
      date: faker.date
        .between(now.startOf('month').toDate(), now.endOf('month').toDate())
        .toString(),
      amount: faker.datatype.number({ min: 5, max: 200 }),
      category: faker.helpers.arrayElement(categories),
    },
    {
      id: 3,
      description: faker.lorem.sentence(),
      date: faker.date
        .between(now.startOf('month').toDate(), now.endOf('month').toDate())
        .toString(),
      amount: faker.datatype.number({ min: 5, max: 200 }),
      category: faker.helpers.arrayElement(categories),
    },
    {
      id: 4,
      description: faker.lorem.sentence(),
      date: faker.date
        .between(now.startOf('month').toDate(), now.endOf('month').toDate())
        .toString(),
      amount: faker.datatype.number({ min: 5, max: 200 }),
      category: faker.helpers.arrayElement(categories),
    },
  ];
};

const calcTotalExpenses = (expenses: any) => {
  return expenses.reduce((total: number, expense: any) => {
    return total + expense.amount;
  }, 0);
};

const calcTotalExpensesOfThisMonth = (expenses: any) => {
  const startOfThisMonth = dayjs().startOf('month');
  const endOfThisMonth = dayjs().endOf('month');

  const expensesInThisMonth = expenses.filter((expense: any) =>
    dayjs(expense.date).isBetween(startOfThisMonth, endOfThisMonth)
  );

  return calcTotalExpenses(expensesInThisMonth);
};

const calcTotalExpensesOfThisWeek = (expenses: any) => {
  const startOfThisWeek = dayjs.max(
    dayjs().startOf('month'),
    dayjs().startOf('week')
  );

  const endOfThisWeek = dayjs.min(
    dayjs().endOf('month'),
    dayjs().endOf('week')
  );

  const expensesInThisWeek = expenses.filter((expense: any) =>
    dayjs(expense.date).isBetween(startOfThisWeek, endOfThisWeek)
  );

  return calcTotalExpenses(expensesInThisWeek);
};

const calcTotalExpensesOfToday = (expenses: any) => {
  const expensesInToday = expenses.filter((expense: any) =>
    dayjs(expense.date).isToday()
  );

  return calcTotalExpenses(expensesInToday);
};

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

  const expenses = createExpensesMock();

  const chartData = {
    labels: ['food', 'rent', 'entertainment', 'dailyNecessities'],
    datasets: [
      {
        data: [
          expenses
            .filter((expense) => expense.category === 'food')
            .reduce((total, expense) => total + expense.amount, 0),
          expenses
            .filter((expense) => expense.category === 'rent')
            .reduce((total, expense) => total + expense.amount, 0),
          expenses
            .filter((expense) => expense.category === 'entertainment')
            .reduce((total, expense) => total + expense.amount, 0),
          expenses
            .filter((expense) => expense.category === 'dailyNecessities')
            .reduce((total, expense) => total + expense.amount, 0),
        ],
        backgroundColor: [
          colors.blue[500],
          colors.red[500],
          colors.purple[500],
          colors.yellow[500],
        ],
      },
    ],
  };

  console.log(
    'this week:',
    dayjs(),
    dayjs().startOf('week').add(9, 'hour'),
    dayjs().endOf('week').add(9, 'hour'),
    dayjs.max(dayjs().startOf('month'), dayjs().startOf('week')),
    dayjs.min(dayjs().endOf('month'), dayjs().endOf('week'))
  );

  return {
    props: {
      expenses,
      chartData,
      totalExpenses: {
        thisMonth: calcTotalExpensesOfThisMonth(expenses),
        thisWeek: calcTotalExpensesOfThisWeek(expenses),
        today: calcTotalExpensesOfToday(expenses),
      },
    },
  };
}

export default function Home({
  expenses = [],
  chartData = { datasets: [] },
  totalExpenses = { thisMonth: 0, thisWeek: 0, today: 0 },
}) {
  const now = useMemo(() => dayjs(), []);

  return (
    <Layout>
      <div className="m-0 antialiased font-normal text-left leading-default relative h-full max-h-screen transition-all duration-200 ease-soft-in-out xl:ml-68 rounded-xl max-w-[60rem] mx-auto">
        <div className="w-full p-6 mx-auto">
          <div className="flex flex-wrap -mx-3">
            <div className="relative z-20 w-full max-w-full px-3 lg:flex-0 shrink-0">
              <div className="relative flex flex-col min-w-0 break-words bg-transparent border-0 border-solid shadow-none border-black-125 rounded-2xl bg-clip-border">
                <div className="flex-auto p-4">
                  <div className="flex justify-center">
                    <h2 className="inline-block mb-2 text-3xl font-extrabold tracking-tight text-black">
                      {now.format('MMMM YYYY')}
                    </h2>
                  </div>
                </div>
              </div>

              <div className="py-8 rounded-3xl">
                <div className="flex justify-center my-2">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-500">
                      Balance
                    </div>
                    <div className="text-4xl font-bold text-black">
                      <span className="mr-0.5">$</span>
                      400.00
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2">
                  <div className="text-center my-2 w-full rounded-2xl">
                    <div className="font-semibold text-gray-500">Income</div>
                    <div className="text-2xl font-bold text-[#00a86b]">
                      <span className="mr-0.5">$</span>
                      5,000.00
                    </div>
                  </div>
                  <div className="text-center my-2 w-full rounded-2xl">
                    <div className="font-semibold text-gray-500">Expenses</div>
                    <div className="text-2xl font-bold text-[#fd3c4a]">
                      <span className="mr-0.5">$</span>
                      1,200.00
                    </div>
                  </div>
                </div>
              </div>

              <div className="[&>*:not(:last-child)]:mb-4">
                <div>
                  <div className="flex">
                    <div className="text-black font-bold text-2xl my-2">
                      Transactions
                    </div>

                    <div className="flex justify-center items-center">
                      <div className="m-1 p-1 hover:bg-gray-200 rounded-lg">
                        <HiAdjustmentsVertical className="h-5 w-5 text-gray-500 " />
                      </div>
                    </div>
                  </div>

                  <div className="[&>*]:shadow-md [&>*]:m-1 grid md:grid-cols-2">
                    {[0, 0, 0, 0, 0, 0, 0, 0, 0].map((_, index) => (
                      <Transaction
                        key={index}
                        type={index % 3 <= 1 ? 'income' : 'expense'}
                        name="Spotify"
                        description="description"
                        amount={1000}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
