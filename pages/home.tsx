import Layout from '@/components/Layout';
import { getSession } from 'next-auth/react';

export async function getServerSideProps(context: any) {
  // Check if user is authenticated
  const session = await getSession(context);
  console.log('=========================session:', session);

  // If not, redirect to the homepage
  if (!session) {
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
}

export default function Home() {
  return (
    <Layout>
      <h1>Home</h1>
    </Layout>
  );
}
