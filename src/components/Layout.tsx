import type { ReactNode } from "react";
import Head from "next/head";
import { signOut } from "next-auth/react";

type Props = {
  title: string;
  hideHeader?: boolean;
  children: ReactNode;
};

export const Layout = ({ title, hideHeader = false, children }: Props) => {
  return (
    <div className="leading-default h-full min-h-screen bg-gray-100 font-open-sans text-base font-normal text-slate-500 antialiased">
      <Head>
        <title>{title}</title>
      </Head>
      {!hideHeader && (
        <header>
          <nav className="w-screen bg-gray-800">
            <div className="flex h-14 items-center pl-8">
              <div className="flex space-x-4">
                <button
                  className="rounded px-3 py-2 text-gray-300 hover:bg-gray-700"
                  onClick={() => signOut()}
                >
                  Logout
                </button>
              </div>
            </div>
          </nav>
        </header>
      )}
      <main>{children}</main>
    </div>
  );
};
