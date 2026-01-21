import { useEffect, useState } from "react";

const useIsLoggedIn = () => {
  const token = global?.window?.localStorage?.getItem("accessToken") || "";
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(Boolean(token));

  useEffect(() => {
    if (token?.length > 0) setIsLoggedIn(true);
    else setIsLoggedIn(false);
  }, [token]);

  return isLoggedIn;
};

export default useIsLoggedIn;
