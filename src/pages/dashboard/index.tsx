import Header from "@/components/Header/Header";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Layout from "@/components/layout/Layout";
import axios from "axios";
import Head from "next/head";
function Dashboard() {
  const router = useRouter();
  const { data: session } = useSession();
  useEffect(() => {
    if (session === null) {
      router.push("/");
    }
    async function checkDatabase() {
      try {
        const data = await axios.post("/api/checkDatabase", {
          email: session?.user?.email,
        });

        if (data.data.data === false) {
          router.push("/");
        }
      } catch (e) {
        console.log(e);
      }
    }
    checkDatabase();
  }, [session]);

  useEffect(() => {}, []);
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Layout>
        {session?.user ? (
          <div className="h-screen flex flex-row justify-center items-center">
            <div>You have access to Harkirat&apos;s course!</div>
          </div>
        ) : (
          ""
        )}
      </Layout>
    </>
  );
}

export default Dashboard;
