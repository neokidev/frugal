import { getSession } from "next-auth/react";
import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
    redirect: {
      destination: session ? "/home" : "/login",
      permanent: false,
    },
  };
};

export default function Index() {
  return;
}
