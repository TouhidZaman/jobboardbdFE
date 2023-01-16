import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import Loading from "components/reusable/Loading";

const ProtectGuestRoute = ({ children }) => {
  const {
    user: { role },
    isLoading,
  } = useSelector((state) => state.auth);
  const { pathname } = useLocation();

  if (isLoading) {
    return <Loading />;
  }

  if (!isLoading && role) {
    return <Navigate to="/dashboard" state={{ path: pathname }} />;
  }

  return children;
};

export default ProtectGuestRoute;
