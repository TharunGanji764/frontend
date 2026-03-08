import { useState, useEffect } from "react";
import Router from "next/router";
import Loader from "@/components/atoms/Loader";

export const PageTransitionLoader = ({ isComponentLevel = false }: any) => {
  const [loading, setLoading] = useState(false);

  const toggleSellerElement = (display: string) => {
    const element = document.getElementById("seller-content");
    if (element) {
      element.style.display = display;
    }
  };

  useEffect(() => {
    let prevPathName = window.location.pathname;

    const handleRouteStart = (url: string) => {
      const currentPathName = url.split("?")[0];
      if (currentPathName === prevPathName) return;
      setLoading(true);
      toggleSellerElement("none");
    };

    const handleRouteComplete = (url: string) => {
      const currentPathName = url.split("?")[0];
      if (currentPathName === prevPathName) return;

      setLoading(false);
      toggleSellerElement("block");
      prevPathName = currentPathName;
    };

    Router.events.on("routeChangeStart", handleRouteStart);
    Router.events.on("routeChangeComplete", handleRouteComplete);

    return () => {
      Router.events.off("routeChangeStart", handleRouteStart);
      Router.events.off("routeChangeComplete", handleRouteComplete);
    };
  }, []);

  return <>{loading && <Loader isComponentLevel={isComponentLevel} />}</>;
};
