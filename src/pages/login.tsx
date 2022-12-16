import type { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

import { Auth } from '@/components/Auth';
import { Layout } from '@/components/Layout';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (session) {
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
};

const Login = () => {
  return (
    <Layout title="Login" hideHeader>
      <Auth />
    </Layout>
  );
};

export default Login;
