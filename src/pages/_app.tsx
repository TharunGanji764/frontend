import type { AppProps } from "next/app";
import { Provider, useDispatch } from "react-redux";
import { persistor, store } from "@/store";
import ThemeProvider from "@/theme/ThemeProvider";
import MainLayout from "@/layouts/MainLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import AppSnackbar from "@/components/atoms/AppSnackbar";
import { PersistGate } from "redux-persist/integration/react";
import { PageTransitionLoader } from "@/utils/PageTransitionLoader";

const AppContent = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setIsloading] = useState(false);

  useEffect(() => {
    const handleScrollTop = () => window.scrollTo(0, 0);

    router.events.on("routeChangeComplete", handleScrollTop);
    router.events.on("routeChangeStart", () => {
      setIsloading(true);
    });
    router.events.on("routeChangeComplete", () => {
      setIsloading(false);
    });

    return () => {
      router.events.off("routeChangeComplete", handleScrollTop);
      router.events.off("routeChangeComplete", () => {
        setIsloading(false);
      });
    };
  }, [router.events, dispatch]);

  return (
    <>
      <PageTransitionLoader />
      {!loading && (
        <MainLayout>
          <Component {...pageProps} />
          <AppSnackbar />
        </MainLayout>
      )}
    </>
  );
};

export default function App(props: AppProps) {
  return (
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <ThemeProvider>
          <AppContent {...props} />
        </ThemeProvider>
      </Provider>
    </PersistGate>
  );
}
