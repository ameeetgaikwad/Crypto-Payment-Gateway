import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Header from "@/components/Header/Header";
import Layout from "@/components/layout/Layout";
import Head from "next/head";
import Image from "next/image";
import { useFaucet } from "@/hooks/useFaucet";
import { useAccount } from "wagmi";
function Faucet() {
  const account = useAccount();
  const [loadingStatus, setLoadingStatus] = useState({
    loading: false,
    success: false,
    error: false,
    idle: true,
  });
  const { writeAsync: getFaucet } = useFaucet();
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session === null) {
      router.push("/");
    }
  }, [session]);
  async function claimFaucet() {
    setLoadingStatus({
      loading: true,
      success: false,
      error: false,
      idle: false,
    });
    try {
      await getFaucet();
      setLoadingStatus({
        loading: false,
        success: true,
        error: false,
        idle: true,
      });
    } catch (e) {
      console.log("error at claim faucet in Faucet.tsx", e);
      setLoadingStatus({
        loading: false,
        success: false,
        error: true,
        idle: true,
      });
    }
  }
  async function addTokenToMetamask() {
    const tokenAddress = "0xA27612ea3e47750DD1Ff27223cfBAEE99BC9a401";
    const tokenSymbol = "MFT";
    const tokenDecimals = 18;
    const tokenImage =
      "https://img.icons8.com/?size=96&id=mzvW3kr6rmg4&format=png";

    try {
      // 'wasAdded' is a boolean. Like any RPC method, an error can be thrown.
      if (window !== undefined) {
        const wasAdded = await (window as any)?.ethereum?.request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20",
            options: {
              address: tokenAddress, // The address of the token.
              symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 characters.
              decimals: tokenDecimals, // The number of decimals in the token.
              image: tokenImage, // A string URL of the token logo.
            },
          },
        });
        if (wasAdded) {
          console.log("Thanks for your interest!");
        } else {
          console.log("Your loss!");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Head>
        <title>Faucet</title>
      </Head>
      <Layout>
        {session?.user ? (
          <div className="h-screen">
            <div className="flex flex-row justify-center items-center h-[80%] gap-5">
              <button
                onClick={addTokenToMetamask}
                className="bg-white border border-gray-300 text-gray-800 py-2 px-4 rounded-md hover:scale-105 transition duration-200 flex flex-row items-center gap-2"
              >
                <Image
                  src={"/metamask.png"}
                  alt="metamask"
                  width={20}
                  height={20}
                />{" "}
                Add token to Metamask
              </button>
              <button
                onClick={() => claimFaucet()}
                className="bg-gradient-to-r from-blue-800 to-purple-800 text-white py-2 px-4 rounded-md hover:scale-105 transition duration-200"
                disabled={!account.isConnected}
              >
                Get Tokens
              </button>
            </div>
            <div className="flex flex-row justify-center">
              {!loadingStatus.idle ? (
                <span className="loading loading-spinner text-primary "></span>
              ) : (
                ""
              )}
            </div>
            {account.isConnected == false ? (
              <div
                role="alert"
                className="alert alert-warning absolute top-3 w-[40%] mx-auto left-0 right-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span>Connect your wallet!</span>
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
      </Layout>
    </>
  );
}

export default Faucet;
