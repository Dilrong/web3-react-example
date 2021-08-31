import React, { useState } from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { useRegister } from "../hooks/useContract";
import Layout from "./Layout";

const Home = () => {
  const context = useWeb3React<Web3Provider>();
  const { library, account } = context;
  const [info, setInfo] = useState("");
  const registerContract = useRegister();

  const setInfoContract = async () => {
    await registerContract.setInfo("Hello, Contract!");
  };

  const getInfoContract = async () => {
    const _info = await registerContract.getInfo();
    setInfo(_info);
  };

  return (
    <Layout>
      <Typography variant="h6">Infomation: {info}</Typography>
      <Grid container spacing={3}>
        {!!(library && account) && (
          <Grid item>
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
                        (error && error.message ? `${error.message}` : "")
                    );
                  });
              }}
            >
              get Message 👋
            </Button>
          </Grid>
        )}
        <br />
        {!!(library && account) && (
          <Grid item>
            <Button
              onClick={() => {
                setInfoContract();
              }}
            >
              Register Contract - setInfo("Hello, Contract!")
            </Button>
          </Grid>
        )}
        <br />
        {!!(library && account) && (
          <Grid item>
            <Button
              onClick={() => {
                getInfoContract();
              }}
            >
              Register Contract - getInfo()
            </Button>
          </Grid>
        )}
      </Grid>
    </Layout>
  );
};

export default Home;
