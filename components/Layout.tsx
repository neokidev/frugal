import { ReactNode } from 'react';
import Head from 'next/head';
import LoginPageHeader from './LoginPageHeader';
import Header from './Header';

type LayoutProps = {
  isLoginPage?: boolean;
  children?: ReactNode;
};

const Layout = ({ isLoginPage = false, children = null }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>Frugal</title>
        <meta name="title" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex flex-col">
        {isLoginPage ? <LoginPageHeader /> : <Header />}
        <main className="flex-1 lg:mt-40">{children}</main>
      </div>
    </>
  );
};

export default Layout;
