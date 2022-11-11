import { Fragment } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { HiOutlineLogout } from 'react-icons/hi';
import { HiOutlineUser, HiOutlineChevronDown, HiPlus } from 'react-icons/hi2';
import { HiChartBar } from 'react-icons/hi2';
import Image from 'next/image';
import { Menu, Transition, Tab } from '@headlessui/react';
import dayjs from 'dayjs';
import ListingForm, { ListingFormValues } from './ListingForm';
import axios from 'axios';

const menuItems = [
  {
    label: 'home',
    href: '/home',
  },
  {
    label: 'summary',
    href: '/summary',
  },
  {
    label: '',
    icon: HiPlus,
    onClick: () => null,
    href: '',
  },
];

const menuItems_ = [
  {
    label: 'Logout',
    icon: HiOutlineLogout,
    onClick: signOut,
  },
];

const Header = () => {
  const { data: session, status } = useSession();
  const user = session?.user;
  const isLoadingUser = status === 'loading';

  const addExpense = (data: ListingFormValues) =>
    axios.post('/api/expenses', {
      ...data,
      date: dayjs(data.date).format('YYYY-MM-DD'),
    });

  return (
    <header className="bg-white border-b lg:fixed lg:w-full lg:top-0 lg:left-0 lg:z-30">
      <div
        className="container px-4 py-4 mx-auto space-y-4 lg:space-y-0 lg:flex lg:items-center lg:justify-between lg:space-x-10"
        style={{ maxWidth: '80rem' }}
      >
        <div className="flex justify-between">
          <Link href="/" className="text-gray-800">
            <div className="flex items-center">
              <HiChartBar className="shrink-0 w-6 h-6 text-sky-400" />
              <p className="text-2xl ml-0.5">
                <strong>Frugal</strong>
              </p>
            </div>
          </Link>
          <div className="flex items-center space-x-2 lg:hidden">
            <button className="p-1 rounded-md hover:bg-gray-100 focus:bg-gray-100 focus:outline-none">
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-6 h-6 text-gray-700"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <div className="hidden lg:flex lg:flex-row lg:items-center lg:justify-between lg:flex-1 lg:space-x-2">
          <div className="flex flex-col space-y-3 lg:space-y-0 lg:flex-row lg:space-x-6 xl:space-x-8 lg:items-center" />

          <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:items-center lg:space-x-4">
            {menuItems.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-gray-500 hover:text-gray-800 transition-colors duration-300"
              >
                <span>{label}</span>
              </Link>
            ))}

            <button
              type="button"
              aria-label="Color Mode"
              className="flex justify-center p-2 text-gray-500 transition duration-150 ease-in-out bg-gray-100 border border-transparent rounded-md lg:bg-white lg:hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:bg-gray-50 active:bg-gray-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 transform -rotate-90"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
              </svg>
            </button>

            <Menu as="div" className="relative z-50">
              <Menu.Button className="flex items-center space-x-px group">
                <div className="shrink-0 flex items-center justify-center rounded-full overflow-hidden relative w-9 h-9">
                  <HiPlus className="text-gray-500 w-6 h-6" />
                </div>
                <HiOutlineChevronDown className="w-5 h-5 shrink-0 text-gray-500 group-hover:text-current" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 w-96 mt-1 divide-y divide-gray-100 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <ListingForm buttonText="Add Expense" onSubmit={addExpense} />
                </Menu.Items>
              </Transition>
            </Menu>

            {isLoadingUser ? (
              <div className="h-8 w-[75px] bg-gray-200 animate-pulse rounded-md" />
            ) : user ? (
              <Menu as="div" className="relative z-50">
                <Menu.Button className="flex items-center space-x-px group">
                  <div className="shrink-0 flex items-center justify-center rounded-full overflow-hidden relative bg-gray-200 w-9 h-9">
                    {user?.image ? (
                      <Image
                        src={user?.image}
                        alt={user?.name || 'Avatar'}
                        fill
                      />
                    ) : (
                      <HiOutlineUser className="text-gray-400 w-6 h-6" />
                    )}
                  </div>
                  <HiOutlineChevronDown className="w-5 h-5 shrink-0 text-gray-500 group-hover:text-current" />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 w-72 overflow-hidden mt-1 divide-y divide-gray-100 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="flex items-center space-x-2 py-4 px-4 mb-2">
                      <div className="shrink-0 flex items-center justify-center rounded-full overflow-hidden relative bg-gray-200 w-9 h-9">
                        {user?.image ? (
                          <Image
                            src={user?.image}
                            alt={user?.name || 'Avatar'}
                            fill
                          />
                        ) : (
                          <HiOutlineUser className="text-gray-400 w-6 h-6" />
                        )}
                      </div>
                      <div className="flex flex-col truncate">
                        <span>{user?.name}</span>
                        <span className="text-sm text-gray-500">
                          {user?.email}
                        </span>
                      </div>
                    </div>

                    <div className="py-2">
                      {menuItems_.map(({ label, onClick, icon: Icon }: any) => (
                        <div
                          key={label}
                          className="px-2 last:border-t last:pt-2 last:mt-2"
                        >
                          <Menu.Item>
                            <button
                              className="w-full flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-gray-100"
                              onClick={onClick}
                            >
                              <Icon className="w-5 h-5 shrink-0 text-gray-500" />
                              <span>{label}</span>
                            </button>
                          </Menu.Item>
                        </div>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <Link
                href="/login"
                className="flex items-center justify-center h-12 px-4 mt-2 text-sm text-center text-gray-600 transition-colors duration-300 transform border rounded-lg lg:h-10 hover:bg-gray-100 focus:outline-none"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
