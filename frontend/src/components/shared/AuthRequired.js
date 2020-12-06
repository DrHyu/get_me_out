import React, { useEffect } from "react";

import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import PT from "prop-types";

function AuthRequired({ children }) {
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated]);

  if (isAuthenticated) {
    return <>{children}</>;
  }
  return <div />;
}

AuthRequired.propTypes = {
  children: PT.node.isRequired,
};

export default AuthRequired;
