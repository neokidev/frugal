import { Menu, Transition } from '@headlessui/react';
import {
  ArrowRightOnRectangleIcon,
  MoonIcon,
  SunIcon,
  UserIcon,
} from '@heroicons/react/20/solid';
import Head from 'next/head';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import type { ReactNode } from 'react';
import { Fragment, useEffect } from 'react';

import { useToggleTheme } from '@/hooks/useToggleTheme';

type Props = {
  title: string;
  hideHeader?: boolean;
  children: ReactNode;
};

export const Layout = ({ title, hideHeader = false, children }: Props) => {
  const { data: session } = useSession();
  const user = session?.user;

  const { isDarkMode, toggleTheme } = useToggleTheme();

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="leading-default h-full min-h-screen bg-gray-100 text-base font-normal text-slate-500 antialiased dark:bg-gray-800 dark:text-slate-400">
      <Head>
        <title>{title}</title>
      </Head>
      {!hideHeader && (
        <header>
          <div className="flex justify-center border-b bg-white py-2 dark:border-gray-700 dark:bg-gray-900">
            <div className="flex w-full max-w-[80rem] justify-between px-8">
              <div className="relative flex w-full">
                <Image
                  src="/frugal.svg"
                  alt="Frugal"
                  width={160}
                  height={0}
                  className="-mt-2.5"
                />
              </div>
              <div className="flex w-full justify-end">
                <div
                  className="flex cursor-pointer items-center justify-center"
                  onClick={toggleTheme}
                >
                  {isDarkMode ? (
                    <MoonIcon className="h-8 w-8 rounded-lg p-1.5 text-gray-400 dark:hover:bg-gray-800" />
                  ) : (
                    <SunIcon className="h-8 w-8 rounded-lg p-1 text-gray-400 hover:bg-gray-100" />
                  )}
                </div>
                <Menu as="div" className="ml-5">
                  <div>
                    <Menu.Button className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full">
                      {user?.image ? (
                        <Image
                          src={user?.image}
                          alt={user?.name || 'Avatar'}
                          fill
                        />
                      ) : (
                        <UserIcon className="h-6 w-6 text-gray-400 dark:text-gray-500" />
                      )}
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute mt-2 min-w-[10rem] -translate-x-[calc(100%-3rem)] divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none dark:divide-gray-800 dark:bg-gray-700 dark:ring-white/5">
                      <Menu.Item>
                        <div className="px-4 py-3">
                          <div className="text-left text-sm text-gray-700 dark:text-gray-300">
                            {'Signed in as '}
                            <span className="font-semibold">{user?.name}</span>
                          </div>
                        </div>
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <div className="py-2">
                            <button
                              className={`${
                                active
                                  ? 'bg-blue-500 text-white dark:bg-blue-600 dark:text-gray-900 dark:text-white'
                                  : 'text-gray-700 dark:text-gray-200'
                              } flex w-full items-center justify-start px-4 py-1 text-sm`}
                              onClick={() => signOut()}
                            >
                              <ArrowRightOnRectangleIcon
                                width={18}
                                className="mr-1"
                              />
                              Log out
                            </button>
                          </div>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </header>
      )}
      <main>{children}</main>
    </div>
  );
};
