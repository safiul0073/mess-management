/* eslint-disable react/react-in-jsx-scope */
import "../styles/globals.css";
import Router from "next/router";
import ProgressBar from "@badrap/bar-of-progress";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "../store";
import RequireAuth from "../components/RequireAuth";
const progress = new ProgressBar({
    size: 4,
    color: "#38a169",
    className: "bar-of-progress",
    delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

function MyApp({ Component, pageProps }: any) {
    return (
        <Provider store={store}>
            <RequireAuth>
                <>
                    <Component {...pageProps} />
                    <Toaster />
                </>
            </RequireAuth>
        </Provider>
    );
}

export default MyApp;
