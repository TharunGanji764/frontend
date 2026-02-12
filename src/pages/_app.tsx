import type { AppProps } from "next/app";
import { Provider, useDispatch, useSelector } from "react-redux";
import { persistor, RootState, store } from "@/store";
import ThemeProvider from "@/theme/ThemeProvider";
import MainLayout from "@/layouts/MainLayout";
import { useRouter } from "next/router";
import { useEffect } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import AppSnackbar from "@/components/atoms/AppSnackbar";
import { PersistGate } from "redux-persist/integration/react";
import Loader from "@/components/atoms/Loader";
import { showLoader, hideLoader } from "@/store/slices/loaderSlice";

const AppContent = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.loader.open);

  useEffect(() => {
    const handleScrollTop = () => window.scrollTo(0, 0);

    const start = () => dispatch(showLoader());
    const end = () => dispatch(hideLoader());

    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);
    router.events.on("routeChangeComplete", handleScrollTop);

    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
      router.events.off("routeChangeComplete", handleScrollTop);
    };
  }, [router.events, dispatch]);

  return (
    <>
      <Loader />
      {!isLoading && (
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
