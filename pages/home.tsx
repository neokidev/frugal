import Layout from '@/components/Layout';
import { getSession } from 'next-auth/react';
import { useMemo } from 'react';
import dayjs from 'dayjs';
import { faker } from '@faker-js/faker';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import colors from 'tailwindcss/colors';
import minMax from 'dayjs/plugin/minMax';
import isBetween from 'dayjs/plugin/isBetween';
import isToday from 'dayjs/plugin/isToday';
import { Divider, Paper, Progress, Title } from '@mantine/core';

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

function IconOne() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <path
        d="M24 11L35.2583 17.5V30.5L24 37L12.7417 30.5V17.5L24 11Z"
        stroke="#FB923C"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.7417 19.8094V28.1906L24 32.3812L31.2584 28.1906V19.8094L24 15.6188L16.7417 19.8094Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.7417 22.1196V25.882L24 27.7632L27.2584 25.882V22.1196L24 20.2384L20.7417 22.1196Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
    </svg>
  );
}

function IconTwo() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <path
        d="M28.0413 20L23.9998 13L19.9585 20M32.0828 27.0001L36.1242 34H28.0415M19.9585 34H11.8755L15.9171 27"
        stroke="#FB923C"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.804 30H29.1963L24.0001 21L18.804 30Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
    </svg>
  );
}

function IconThree() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <rect x="13" y="32" width="2" height="4" fill="#FDBA74" />
      <rect x="17" y="28" width="2" height="8" fill="#FDBA74" />
      <rect x="21" y="24" width="2" height="12" fill="#FDBA74" />
      <rect x="25" y="20" width="2" height="16" fill="#FDBA74" />
      <rect x="29" y="16" width="2" height="20" fill="#FB923C" />
      <rect x="33" y="12" width="2" height="24" fill="#FB923C" />
    </svg>
  );
}

const solutions = [
  {
    id: 1,
    name: 'Insights',
    description: 'Measure actions your users take',
    amount: '$2,456.00',
    icon: IconOne,
    date: dayjs().format('MMM DD'),
  },
  {
    id: 2,
    name: 'Automations',
    description: 'Create your own targeted content',
    href: '##',
    amount: '$1,456.00',
    icon: IconTwo,
    date: dayjs().format('MMM DD'),
  },
  {
    id: 3,
    name: 'Reports',
    description: 'Keep track of your growth',
    href: '##',
    amount: '$1,234.00',
    icon: IconThree,
    date: dayjs().format('MMM DD'),
  },
];

export default function Home({
  expenses = [],
  chartData = { datasets: [] },
  totalExpenses = { thisMonth: 0, thisWeek: 0, today: 0 },
}) {
  const now = useMemo(() => dayjs(), []);

  return (
    <Layout>
      <div className="mx-auto max-w-[54rem]">
        <div className="mt-8 mb-4">
          <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-3xl font-extrabold text-transparent">
            Welcome back !
          </span>
        </div>

        <Paper
          className="grid grid-flow-col grid-cols-[1fr_1px_1fr] grid-rows-[1fr_1px_1fr] rounded-2xl bg-white"
          shadow="xs"
          radius="lg"
          mb="md"
        >
          <div className="m-5 flex flex-col justify-center">
            <h3 className="text-lg font-semibold text-gray-500">
              Total Income
            </h3>
            <div className="text-2xl font-medium">$10,456.00</div>
            <div className="mt-auto">↑ +12.1 % from last weeks</div>
          </div>

          <Divider />

          <div className="m-5 flex flex-col justify-center">
            <h3 className="text-lg font-semibold text-gray-500">
              Total Expenses
            </h3>
            <div className="text-2xl font-medium">$2,456.00</div>
            <div className="mt-auto">↓ -2.5 % from last weeks</div>
          </div>

          <Divider className="row-span-3" orientation="vertical" />

          <div className="m-5 flex flex-col justify-center">
            <h3 className="text-lg font-semibold text-gray-500">
              Spending Limit
            </h3>
            <div>$2,456.00 used from $10,000.00</div>
            <Progress
              className="mt-auto"
              sections={[{ value: 40, color: '#68b5e8' }]}
            />
          </div>

          <Divider />

          <div className="m-5 flex flex-col justify-center">
            <h3 className="text-lg font-semibold text-gray-500">
              Expense Analytics
            </h3>
            <Progress
              className="my-auto"
              radius="xl"
              size={20}
              sections={[
                {
                  value: 33,
                  color: 'pink',
                  label: 'Documents',
                },
                {
                  value: 28,
                  color: 'grape',
                  label: 'Apps',
                },
                {
                  value: 5,
                  color: 'violet',
                  label: 'Other',
                },
              ]}
            />
          </div>
        </Paper>

        <Paper shadow="xs" radius="lg" p="lg">
          <Title order={2} mb="xs">
            Transitions
          </Title>
          <div className="grid bg-white lg:grid-cols-2">
            {solutions.map((item) => (
              <div
                key={item.id}
                className="m-2 flex items-center rounded-lg hover:bg-orange-100/50"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                  <item.icon aria-hidden="true" />
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {item.name}
                  </p>
                  <p className="text-sm font-light text-gray-500">
                    {item.description}
                  </p>
                </div>
                <div className="ml-4 text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {item.amount}
                  </p>
                  <p className="text-sm font-light text-gray-500">
                    {item.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Paper>
      </div>
    </Layout>
  );
}
