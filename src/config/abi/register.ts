export const REGISTER_ADDRESS = "0xD289339835fBF53f399f48807252450109aC2a8D";

export const REGISTER_ABI = [
  {
    inputs: [],
    name: "getInfo",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_info",
        type: "string",
      },
    ],
    name: "setInfo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
