import { useContractWrite } from "wagmi";
import { ERC20ABI } from "@/config/abi";
import { paymentABI } from "@/config/paymentABI";

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
    address: "0xA27612ea3e47750DD1Ff27223cfBAEE99BC9a401",
    abi: ERC20ABI,
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
const usePaymentContractWrite = ({ functionName, args, ...rest }: any) => {
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
    address: "0x21A14df46428681954AcEB96C7F39BD26D283d75",
    abi: paymentABI,
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
export const useApprove = () => {
  // const chainId = useActiveChainId();

  const data = useERC20ContractWrite({
    functionName: "approve",
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
export const useMoveFunds = () => {
  // const chainId = useActiveChainId();

  const data = usePaymentContractWrite({
    functionName: "moveFunds",
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
