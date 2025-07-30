import "../styles/globals.css";
import "../styles/variables.less";
import Layout from "../layout/Layout";
import store from "../store";
import { Provider } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PageLoading from "../components/PageLoading";
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false);
  useEffect(() => {
    const handleStart = () => {
      console.log(router);
      if (router.pathname !== "/product/[platform]/[code]") {
        setPageLoading(true);
      }
    };
    const handleComplete = () => {
      setPageLoading(false);
    };

    store.dispatch({ type: "SET_PRODUCT_INFO", payload: null });

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);

  return (
    <Provider store={store}>
      <Layout>
        <NextNProgress
          color="#fff"
          startPosition={0.6}
          stopDelayMs={200}
          height={3}
          showOnShallow={true}
          options={{ showSpinner: false }}
        />
        {pageLoading ? <PageLoading /> : null}
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
