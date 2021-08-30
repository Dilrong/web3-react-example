import { Web3ReactProvider } from "@web3-react/core";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CssBaseline from "@material-ui/core/CssBaseline";

import { getLibrary } from "./utils/web3React";

const Providers: React.FC = ({ children }) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = createTheme(
    {
      typography: {
        fontFamily: ["IBM Plex Mono", "monospace"].join(","),
      },
    },
    [prefersDarkMode]
  );
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </Web3ReactProvider>
  );
};

export default Providers;
