import * as React from "react";
import { AppProps } from "next/app";
import { ChakraProvider, Box, theme } from "@chakra-ui/react";
import { TopNav } from "../components/layout/top-nav";
import { PageFooter } from "../components/layout/page-footer";
import "assets/stylesheets/carousel.css";

const App = ({ Component, pageProps }: AppProps) => {

  return (
    <Box maxW="1050px" mx="auto">
      <ChakraProvider theme={theme}>
        <Box textAlign="center" fontSize="xl" p={5}>
          <TopNav />
          <Component {...pageProps} />
          <PageFooter />
        </Box>
      </ChakraProvider>
    </Box>
  );
};

export default App;
