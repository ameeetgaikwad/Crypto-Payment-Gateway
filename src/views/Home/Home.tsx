import Header from "@/components/Header/Header";
import { useAccount } from "wagmi";
import { useApprove, useMoveFunds } from "@/hooks/useMoveFunds";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import Layout from "@/components/layout/Layout";
function Home() {
  const router = useRouter();

  const { data: session } = useSession();
  const [loadingStatus, setLoadingStatus] = useState({
    loading: false,
    success: false,
    error: false,
    idle: true,
  });
  const account = useAccount();
  const {
    writeAsync: approve,
    isSuccess: isApproveSuccess,
    status: approveStatus,
  } = useApprove();
  const {
    writeAsync: moveFunds,
    isSuccess: isMoveFundsSuccess,
    data: moveFundsData,
    status: moveFundsStatus,
  } = useMoveFunds();
  async function buyCourse() {
    setLoadingStatus({
      loading: true,
      success: false,
      error: false,
      idle: false,
    });
    try {
      if (account.isConnected) {
        const approveTokens = await approve({
          args: ["0x21A14df46428681954AcEB96C7F39BD26D283d75", 2 * 10 ** 18], // payment contract address
        });

        setTimeout(async () => {
          try {
            const data2 = await moveFunds({
              args: [account.address, 2 * 10 ** 18, session?.user?.email],
            });
            await axios.post("/api/addToDatabase", {
              email: session?.user?.email,
            });
            setLoadingStatus({
              loading: false,
              success: true,
              error: false,
              idle: true,
            });
          } catch (e) {
            console.log("error at move funds in Home.tsx", e);
            setLoadingStatus({
              loading: false,
              success: false,
              error: true,
              idle: true,
            });
          }
        }, 25000);
      }
    } catch (e) {
      console.log(e);
      setLoadingStatus({
        loading: false,
        success: false,
        error: true,
        idle: true,
      });
    }
  }
  const modalRef = useRef<HTMLDialogElement | null>(null);
  useEffect(() => {
    async function checkDatabase() {
      try {
        const data = await axios.post("/api/checkDatabase", {
          email: session?.user?.email,
        });
        if (data.data.data) {
          router.push("/dashboard");
        }
      } catch (e) {
        console.log(e);
      }
    }
    checkDatabase();
  }, [session]);
  useEffect(() => {
    if (loadingStatus.error) {
      setTimeout(() => {
        setLoadingStatus({
          loading: false,
          success: false,
          error: false,
          idle: true,
        });
      }, 3000);
    }
    if (loadingStatus.success) {
      setTimeout(() => {
        setLoadingStatus({
          loading: false,
          success: false,
          error: false,
          idle: true,
        });
      }, 2000);
      router.push("/dashboard");
    }
  }, [loadingStatus, isMoveFundsSuccess]);

  return (
    <>
      <main className="">
        <Layout>
          {session?.user ? (
            <div className="flex flex-col justify-center items-center h-64">
              <p>
                As this project is for testing purpose, we are using testnet
                (mumbai polygon). So you need to have testnet ERC20 tokens. You
                can get it at{" "}
                <Link className="text-blue-700" target="blank" href={"/faucet"}>
                  Faucet
                </Link>
                .
              </p>
              <br />
              <p>
                Also it is advised to use metamask and, only the tokens obtained
                using the given faucet can be used to purchase the course other
                ERC20 tokens won&apos;t work. Course price is 2 tokens.
              </p>
              <button
                onClick={buyCourse}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mx-auto mt-4"
                disabled={!loadingStatus.idle || !account.isConnected}
              >
                Buy Harkirat Course
              </button>
            </div>
          ) : (
            ""
          )}
          <div className="flex flex-row justify-center">
            {!loadingStatus.idle ? (
              <span className="loading loading-spinner text-primary "></span>
            ) : (
              ""
            )}
          </div>
          {loadingStatus.loading && (
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
              <span>
                Your transaction is being confirmed, it will take 30 seconds.
                Please don&apos;t refresh the window!
              </span>
            </div>
          )}
          {loadingStatus.error && (
            <div
              role="alert"
              className="alert alert-error absolute top-3 w-[40%] mx-auto left-0 right-0"
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
              <span>
                Your transaction reverted, please try again after some time. It
                might be due to network congestion.
              </span>
            </div>
          )}
          {loadingStatus.success && (
            <div
              role="alert"
              className="alert alert-success absolute top-3 w-[40%] mx-auto left-0 right-0"
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
              <span>Your transaction is successfull</span>
            </div>
          )}
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
        </Layout>
      </main>
    </>
  );
}

export default Home;
