import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

import Header from "../components/Header";

const useStyles = makeStyles((theme) => ({
  root: { height: "100%", padding: theme.spacing(8, 0, 6) },
}));

const Layout: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
}) => {
  const classes = useStyles();

  return (
    <>
      <Header />
      <Container className={classes.root} component="main">
        {children!}
      </Container>
    </>
  );
};

export default Layout;
