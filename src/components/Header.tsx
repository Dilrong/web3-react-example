import React from "react";
import { AppBar, Toolbar, Button, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SettingsIcon from "@material-ui/icons/Settings";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <IconButton size="small">
            <SettingsIcon />
          </IconButton>
          <div className={classes.grow} />
          <Button>Connect Wallet</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
