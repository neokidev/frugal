import type { ReactNode } from "react";
import Head from "next/head";
import { signOut, useSession } from "next-auth/react";
import { Menu, Transition } from "@headlessui/react";
import { ArrowRightOnRectangleIcon, UserIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { Fragment } from "react";

type Props = {
  title: string;
  hideHeader?: boolean;
  children: ReactNode;
};

export const Layout = ({ title, hideHeader = false, children }: Props) => {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="leading-default h-full min-h-screen bg-gray-100 font-open-sans text-base font-normal text-slate-500 antialiased">
      <Head>
        <title>{title}</title>
      </Head>
      {!hideHeader && (
        <header>
          <div className="flex justify-center border-b bg-white py-2">
            <div className="flex w-full max-w-[80rem] justify-between px-8">
              <div />
              <div>
                <Menu as="div" className="ml-5">
                  <div>
                    <Menu.Button className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full">
                      {user?.image ? (
                        <Image
                          src={user?.image}
                          alt={user?.name || "Avatar"}
                          fill
                        />
                      ) : (
                        <UserIcon className="h-6 w-6 text-gray-400" />
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
                    <Menu.Items className="absolute mt-2 min-w-[10rem] -translate-x-[calc(100%-3rem)] divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                      <Menu.Item>
                        <div className="px-4 py-3">
                          <div className="text-left text-sm text-gray-700">
                            {"Signed in as "}
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
                                  ? "bg-blue-500 text-white"
                                  : "text-gray-700"
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
