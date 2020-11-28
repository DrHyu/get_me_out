import React, { useEffect } from "react";

import { useRouter } from "next/router";
import { useSelector } from "react-redux";

function AuthRequired({ children }) {
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    console.log(isAuthenticated);
    if (!isAuthenticated) {
      console.log("Not authorised");
      router.push("/");
    }
  }, [isAuthenticated]);

  if (isAuthenticated) {
    return <>{children}</>;
  } else {
    return <div></div>;
  }
}

export default AuthRequired;
