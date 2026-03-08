import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { persistor, store } from "@/store";
import ThemeProvider from "@/theme/ThemeProvider";
import MainLayout from "@/layouts/MainLayout";
import { useRouter } from "next/router";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import AppSnackbar from "@/components/atoms/AppSnackbar";
import { PersistGate } from "redux-persist/integration/react";
import { PageTransitionLoader } from "@/utils/PageTransitionLoader";
import { SellerLayout } from "@/layouts/seller/SellerLayout";

const AppContent = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const isSeller = router?.asPath?.includes("seller");
  const Layout = isSeller ? SellerLayout : MainLayout;

  
  return (
    <>
      <Layout>
        <PageTransitionLoader isComponentLevel={isSeller ? true : false} />
        <Component {...pageProps} />
        <AppSnackbar />
      </Layout>
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
