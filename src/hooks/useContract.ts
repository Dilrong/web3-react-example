import { useWeb3React } from "@web3-react/core";
import { useMemo } from "react";
import { getRegisterContract } from "../utils/contractHelpers";

export const useRegister = () => {
  const { library } = useWeb3React();
  return useMemo(() => getRegisterContract(library?.getSigner()), [library]);
};
