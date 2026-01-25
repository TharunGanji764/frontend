import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { persistor, store } from "@/store";
import ThemeProvider from "@/theme/ThemeProvider";
import MainLayout from "@/layouts/MainLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AppSnackbar from "@/components/atoms/AppSnackbar";
import { PersistGate } from "redux-persist/integration/react";
import Loader from "@/components/atoms/Loader";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setisLoading] = useState(false);

  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo(0, 0);
    };
    const start = () => setisLoading(true);
    const end = () => setisLoading(false);
    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
    };
  }, [router.events]);
  return (
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <ThemeProvider>
          <MainLayout>
            <Loader loading={loading} />
            {!loading && <Component {...pageProps} />}
            <AppSnackbar />
          </MainLayout>
        </ThemeProvider>
      </Provider>
    </PersistGate>
  );
}
