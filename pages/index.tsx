import { getSession } from 'next-auth/react';

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  return {
    redirect: {
      destination: session ? '/home' : '/login',
      permanent: false,
    },
  };
}

export default function Index() {}
