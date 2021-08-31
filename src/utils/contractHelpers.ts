import { ethers } from "ethers";

import { REGISTER_ADDRESS, REGISTER_ABI } from "../config/abi/register";

const getContract = (
  abi: any,
  address: string,
  signer?: ethers.Signer | ethers.providers.Provider
) => {
  return new ethers.Contract(address, abi, signer);
};

export const getRegisterContract = (signer?: ethers.Signer) => {
  return getContract(REGISTER_ABI, REGISTER_ADDRESS, signer);
};
