import { ReactNode } from 'react';
import Head from 'next/head';
import LoginPageHeader from './LoginPageHeader';
import Header from './Header';
import Link from 'next/link';

type LayoutProps = {
  isLoginPage?: boolean;
  children: ReactNode;
  title: string;
};

const Layout = ({
  isLoginPage = false,
  children,
  title = 'Frugal',
}: LayoutProps) => {
  return (
    // <div className="leading-default flex min-h-screen flex-col items-center justify-center bg-gray-100 font-open-sans text-base font-normal text-gray-600 text-slate-500 antialiased">
    <div className="leading-default h-full min-h-screen bg-gray-100 font-open-sans text-base font-normal text-slate-500 antialiased">
      <Head>
        <title>{title}</title>
      </Head>
      <header>
        <nav className="w-screen bg-gray-800">
          <div className="flex h-14 items-center pl-8">
            <div className="flex space-x-4">
              <Link
                href="/home"
                className="rounded px-3 py-2 text-gray-300 hover:bg-gray-700"
              >
                Home
              </Link>
            </div>
          </div>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
