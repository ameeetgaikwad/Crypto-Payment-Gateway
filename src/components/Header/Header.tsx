import { ConnectButton } from "@rainbow-me/rainbowkit";
import { signOut } from "next-auth/react";
import Link from "next/link";

const Header = () => {
  // Add your component logic here

  return (
    <>
      <div className="flex flex-row justify-between w-screen p-4">
        <Link href={"/"}>CryptoPay</Link>
        <div className="flex flex-row gap-5">
          <div>
            <ConnectButton />
          </div>
          <div className="mr-2 flex flex-row rounded-xl border bg-gray-200 px-2 hover:scale-[102%] transition-all duration-150">
            <button
              onClick={() => {
                signOut();
              }}
              className="p-2"
            >
              Sign out from google
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
