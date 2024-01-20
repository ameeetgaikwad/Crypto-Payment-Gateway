import Image from "next/image";
import { Inter } from "next/font/google";
import { useSession, signIn, signOut } from "next-auth/react";
import Login from "@/components/Login/Login";

import Head from "next/head";
import HomePage from "@/views/Home/Home";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      {session !== null ? (
        <div className="flex flex-row justify-center h-screen">
          <HomePage />
        </div>
      ) : (
        <div>
          <Login />
        </div>
      )}
    </>
  );
}
