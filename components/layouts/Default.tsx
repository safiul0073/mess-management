import React from "react";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import type { NextComponentType, NextPageContext } from "next";

const Default: NextComponentType<NextPageContext, any, any> = ({
  Component,
  pageProps,
}: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default Default;
