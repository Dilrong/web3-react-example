import React from "react";
import { Button } from "@material-ui/core";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import Layout from "./Layout";

const Home = () => {
  const context = useWeb3React<Web3Provider>();
  const { library, account } = context;

  return (
    <Layout>
      {!!(library && account) && (
        <Button
          onClick={() => {
            library
              ?.getSigner(account)
              .signMessage("👋")
              .then((signature: any) => {
                window.alert(`Success!\n\n${signature}`);
              })
              .catch((error: any) => {
                window.alert(
                  "Failure!" +
                    (error && error.message ? `\n\n${error.message}` : "")
                );
              });
          }}
        >
          get Message 👋
        </Button>
      )}
    </Layout>
  );
};

export default Home;
