import { useSession } from "next-auth/react";
import { Layout } from "../components/Layout";
import { Auth } from "../components/Auth";
import { Home } from "../components/Home";

export default function Index() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Layout title="Login" hideHeader>
        <Auth />
      </Layout>
    );
  }

  return (
    <Layout title="Home">
      <Home />
    </Layout>
  );
}
