import { faucetABI } from "@/config/faucetABI";
import { useContractWrite } from "wagmi";
const useERC20ContractWrite = ({ functionName, args, ...rest }: any) => {
  const chainId = 80001;
  const {
    data,
    isError,
    isLoading,
    error,
    write,
    writeAsync,
    reset,
    status,
    isSuccess,
  } = useContractWrite({
    // @ts-ignore
    address: "0xb910de2349eb28985f2140ff286f70046beba916",
    abi: faucetABI,
    functionName,
    args,
    chainId,
    ...rest,
  });
  return {
    data,
    isError,
    isLoading,
    error,
    write,
    writeAsync,
    reset,
    status,
    isSuccess,
  };
};
export const useFaucet = () => {
  // const chainId = useActiveChainId();

  const data = useERC20ContractWrite({
    functionName: "claimTokens",
    // // args: [label, owner, duration],
    // // TODO Dynamic domain fee
    // value: "1000000000000000000",
    // args: [
    //   label,
    //   owner,
    //   duration,
    //   // @ts-ignore
    //   contracts.publicResolver[chainId as any],
    //   owner,
    //   true,
    // ],

    // ...others,
  });
  return data;
};
