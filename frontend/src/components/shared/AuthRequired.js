import React, { useEffect } from "react";

import { useRouter } from "next/router";

import PT from "prop-types";

function AuthRequired({ children }) {
  const router = useRouter();
  const isAuthenticated = true;

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
