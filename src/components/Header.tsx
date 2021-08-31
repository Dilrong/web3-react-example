import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { formatEther } from "@ethersproject/units";
import { connectorsByName, ConnectorNames } from "../utils/web3React";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import { useEagerConnect } from "../hooks/useEagerConnect";
import { useInactiveListener } from "../hooks/useInactiveListener";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
}));

function getErrorMessage(error: Error) {
  if (error instanceof NoEthereumProviderError) {
    return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
  } else if (error instanceof UserRejectedRequestErrorInjected) {
    return "Please authorize this website to access your Ethereum account.";
  } else {
    console.error(error);
    return "An unknown error occurred. Check the console for more details.";
  }
}

const Header = () => {
  const classes = useStyles();
  const { connector, account, activate, deactivate, active, error } =
    useWeb3React<Web3Provider>();

  const [activatingConnector, setActivatingConnector] = useState<any>();
  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  const triedEager = useEagerConnect();

  useInactiveListener(!triedEager);

  const Balance = () => {
    const { account, library, chainId } = useWeb3React();

    const [balance, setBalance] = useState();

    useEffect((): any => {
      if (!!account && !!library) {
        let stale = false;

        library
          .getBalance(account)
          .then((balance: any) => {
            if (!stale) {
              setBalance(balance);
            }
          })
          .catch(() => {
            if (!stale) {
              setBalance(undefined);
            }
          });

        return () => {
          stale = true;
          setBalance(undefined);
        };
      }
    }, [account, library, chainId]);

    return (
      <>
        <Typography variant="body2">
          {balance === null
            ? "Error"
            : balance
            ? `🤑${formatEther(balance)}`
            : ""}
        </Typography>
        <Button
          onClick={() => {
            deactivate();
          }}
        >
          {account === null
            ? "-"
            : account
            ? `${account.substring(0, 6)}...${account.substring(
                account.length - 4
              )}`
            : ""}
        </Button>
      </>
    );
  };

  return (
    <div>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="caption">
            {active ? "🟢" : error ? `🔴 ${getErrorMessage(error)}` : "🟠"}
          </Typography>
          <div className={classes.grow} />
          {account === undefined ? (
            <Button
              onClick={() => {
                activate(
                  connectorsByName[ConnectorNames.Injected],
                  async (error: Error) => {
                    console.log(error);
                  }
                );
              }}
            >
              Connect Wallet
            </Button>
          ) : (
            <Balance />
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
