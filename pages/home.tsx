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
  // let [categories] = useState(['支出', '収入']);

  // const form = useForm({
  //   initialValues: {
  //     date: new Date(),
  //     amount: 0,
  //     description: '',
  //   },

  //   transformValues: (values) => ({
  //     amount: Number(values.amount) || 0,
  //   }),
  // });

  const now = useMemo(() => dayjs(), []);

  return (
    <Layout>
      <div className="m-0 font-open-sans antialiased font-normal text-left leading-default text-base bg-gray-50 text-slate-500 relative h-full max-h-screen transition-all duration-200 ease-soft-in-out xl:ml-68 rounded-xl max-w-[60rem] mx-auto">
        <div className="w-full p-6 mx-auto bg-sky-100">
          <div className="flex flex-wrap -mx-3">
            <div className="relative z-20 w-full max-w-full px-3 lg:flex-0 shrink-0">
              <div className="relative flex flex-col min-w-0 mb-6 break-words bg-transparent border-0 border-solid shadow-none border-black-125 rounded-2xl bg-clip-border">
                <div className="flex-auto p-4">
                  <div className="flex justify-center">
                    <h2 className="mb-0 font-bold text-4xl text-gray-700">
                      {now.format('MMMM YYYY')}
                    </h2>
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <div className="w-full max-w-full px-3 sm:flex-0 shrink-0 md:w-1/2">
                  <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
                    <div className="flex-auto p-4">
                      <div className="flex flex-wrap -mx-3">
                        <div className="flex-none w-2/3 max-w-full px-3">
                          <div>
                            <p className="mb-0 font-open-sans font-semibold leading-normal text-sm">
                              This Month's Expenses
                            </p>
                            <h5 className="mb-0 font-bold text-lg text-gray-700">
                              {`$${totalExpenses.thisMonth}`}
                              <span className="leading-normal text-sm font-weight-bolder text-lime-500 ml-1">
                                +55%
                              </span>
                            </h5>
                          </div>
                        </div>
                        <div className="w-4/12 max-w-full px-3 text-right flex-0">
                          <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-2xl">
                            <i
                              className="ni leading-none ni-money-coins text-lg relative top-3.5 text-white"
                              aria-hidden="true"
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
                    <div className="flex-auto p-4">
                      <div className="flex flex-wrap -mx-3">
                        <div className="flex-none w-2/3 max-w-full px-3">
                          <div>
                            <p className="mb-0 font-open-sans font-semibold leading-normal text-sm">
                              This Week's Expenses
                            </p>
                            <h5 className="mb-0 font-bold text-lg text-gray-700">
                              {`$${totalExpenses.thisWeek}`}
                              <span className="leading-normal text-sm font-weight-bolder text-red-600 ml-1">
                                -20%
                              </span>
                            </h5>
                          </div>
                        </div>
                        <div className="w-4/12 max-w-full px-3 text-right flex-0">
                          <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-2xl">
                            <i
                              className="ni leading-none ni-money-coins text-lg relative top-3.5 text-white"
                              aria-hidden="true"
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
                    <div className="flex-auto p-4">
                      <div className="flex flex-wrap -mx-3">
                        <div className="flex-none w-2/3 max-w-full px-3">
                          <div>
                            <p className="mb-0 font-open-sans font-semibold leading-normal text-sm">
                              Today's Expenses
                            </p>
                            <h5 className="mb-0 font-bold text-lg text-gray-700">
                              {`$${totalExpenses.today}`}
                              <span className="leading-normal text-sm font-weight-bolder text-lime-500 ml-1">
                                +15%
                              </span>
                            </h5>
                          </div>
                        </div>
                        <div className="w-4/12 max-w-full px-3 text-right flex-0">
                          <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-2xl">
                            <i
                              className="ni leading-none ni-money-coins text-lg relative top-3.5 text-white"
                              aria-hidden="true"
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full pl-16 pr-4">
                  <Doughnut data={chartData} />;
                </div>
              </div>

              <div className="flex flex-wrap mt-6 -mx-3">
                <div className="w-full max-w-full px-3 flex-0">
                  <div className="relative flex flex-col min-w-0 break-words bg-white border-0 border-solid border-black-125 shadow-soft-xl rounded-2xl bg-clip-border">
                    <div className="p-4 pb-0 mb-0 rounded-t-4">
                      <div className="flex justify-between">
                        <h6 className="mb-2 text-gray-700">Expenses</h6>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="items-center w-full mb-4 align-top border-gray-200">
                        <tbody>
                          {expenses.map((expense: any) => (
                            <tr key={expense.id}>
                              <td className="p-2 align-middle bg-transparent border-b w-3/10 whitespace-nowrap">
                                <div className="flex items-center px-2 py-1">
                                  {expense.category === 'food' && (
                                    <div className="flex items-center justify-center w-6 h-6 mr-2 text-center bg-center rounded fill-current shadow-soft-2xl bg-gradient-to-tl from-blue-600 to-cyan-400 text-neutral-900">
                                      <ImSpoonKnife color="white" />
                                    </div>
                                  )}

                                  {expense.category === 'rent' && (
                                    <div className="flex items-center justify-center w-6 h-6 mr-2 text-center bg-center rounded fill-current shadow-soft-2xl bg-gradient-to-tl from-red-600 to-rose-400 text-neutral-900">
                                      <IoIosHome color="white" />
                                    </div>
                                  )}

                                  {expense.category === 'entertainment' && (
                                    <div className="flex items-center justify-center w-6 h-6 mr-2 text-center bg-center rounded fill-current shadow-soft-2xl bg-gradient-to-tl from-purple-700 to-pink-500 text-neutral-900">
                                      <IoLogoGameControllerB color="white" />
                                    </div>
                                  )}

                                  {expense.category === 'dailyNecessities' && (
                                    <div className="flex items-center justify-center w-6 h-6 mr-2 text-center bg-center rounded fill-current shadow-soft-2xl bg-gradient-to-tl from-red-500 to-yellow-400 text-neutral-900">
                                      <RiShoppingCart2Fill color="white" />
                                    </div>
                                  )}

                                  <div className="ml-6">
                                    <p className="mb-0 font-semibold leading-tight text-xs">
                                      Description:
                                    </p>
                                    <h6 className="mb-0 leading-normal text-sm text-gray-700">
                                      {expense.description}
                                    </h6>
                                  </div>
                                </div>
                              </td>
                              <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                                <div className="text-center">
                                  <p className="mb-0 font-semibold leading-tight text-xs">
                                    Date:
                                  </p>
                                  <h6 className="mb-0 leading-normal text-sm text-gray-700">
                                    {dayjs(expense.date).format('D MMM')}
                                  </h6>
                                </div>
                              </td>
                              <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                                <div className="text-center">
                                  <p className="mb-0 font-semibold leading-tight text-xs">
                                    Amount:
                                  </p>
                                  <h6 className="mb-0 leading-normal text-sm text-gray-700">
                                    {`\$${expense.amount}`}
                                  </h6>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );

  // return (
  //   <Layout>
  //     <div className="bg-gray-100 h-screen">
  //       <div className="max-w-screen-sm mx-auto">
  //         <div className="w-full max-w-md px-2 py-16 sm:px-0">
  //           <Tab.Group>
  //             <Tab.List className="flex space-x-1 rounded-xl bg-gray-600/20 p-1">
  //               {categories.map((category) => (
  //                 <Tab
  //                   key={category}
  //                   className={({ selected }) =>
  //                     classNames(
  //                       'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-gray-500',
  //                       'ring-white ring-opacity-60 ring-offset-2 ring-offset-gray-400 focus:outline-none focus:ring-2',
  //                       selected
  //                         ? 'bg-white shadow'
  //                         : 'text-gray-100 hover:bg-white/[0.12] hover:text-white'
  //                     )
  //                   }
  //                 >
  //                   {category}
  //                 </Tab>
  //               ))}
  //             </Tab.List>
  //             <Tab.Panels className="mt-2">
  //               {categories.map((_, idx) => (
  //                 <Tab.Panel
  //                   key={idx}
  //                   className={classNames(
  //                     'rounded-xl bg-white p-3',
  //                     'ring-white ring-opacity-60 ring-offset-2 ring-offset-gray-400 focus:outline-none focus:ring-2'
  //                   )}
  //                 >
  //                   <form>
  //                     <DatePicker
  //                       label="日付"
  //                       minDate={dayjs(new Date()).startOf('month').toDate()}
  //                       maxDate={dayjs(new Date()).endOf('month').toDate()}
  //                       {...form.getInputProps('date')}
  //                     />
  //                     <TextInput
  //                       type="number"
  //                       label="金額"
  //                       mt="md"
  //                       {...form.getInputProps('amount')}
  //                     />
  //                     <TextInput
  //                       label="内容"
  //                       mt="md"
  //                       {...form.getInputProps('description')}
  //                     />
  //                     <button
  //                       type="submit"
  //                       className="w-full bg-sky-400 hover:bg-sky-300 py-1 mt-4 rounded-lg text-white"
  //                     >
  //                       入力
  //                     </button>
  //                   </form>
  //                 </Tab.Panel>
  //               ))}
  //             </Tab.Panels>
  //           </Tab.Group>
  //         </div>
  //       </div>
  //     </div>
  //   </Layout>
  // );
}
