/* eslint-disable react/react-in-jsx-scope */
import "../styles/globals.css";
import Default from "../components/layouts/Default";
import Router, { useRouter } from "next/router";
import { useEffect } from "react";
import { refreshToken } from "../functions/auth";
import { useStore } from "../store";
import { QueryClient, QueryClientProvider } from "react-query";
import ProgressBar from "@badrap/bar-of-progress";
import { updateAxiosToken } from "../config/exios.config";

const progress = new ProgressBar({
  size: 4,
  color: "#38a169",
  className: "bar-of-progress",
  delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);
const queryClient = new QueryClient();
function MyApp({ Component, pageProps }: any) {
  const store = useStore();
  const router = useRouter();

  useEffect(() => {
    refreshToken().then((data: any) => {
      if (data.ok === true) {
        store.setAccessToken(data.accessToken);
        updateAxiosToken(data.accessToken);
        store.setUser(data.user);
      }
    });

    setInterval(() => {
      refreshToken().then((data: any) => {
        if (data.ok === true) {
          store.setAccessToken(data.accessToken);
          updateAxiosToken(data.accessToken);
          store.setUser(data.user);
        }
      });
    }, 600000);
  }, []);
  if (router.pathname === "/auth/login") {
    return <Component {...pageProps} />;
  }
  return (
    <Default>
      <QueryClientProvider client={queryClient}>
        <>
          <Component {...pageProps} />
        </>
      </QueryClientProvider>
    </Default>
  );
}

export default MyApp;
