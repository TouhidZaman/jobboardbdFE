import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import Loading from "components/reusable/Loading";

const PrivateRoute = ({ children }) => {
  const { user: {email}, isLoading } = useSelector((state) => state.auth);
  const { pathname } = useLocation();


  if (isLoading) {
    return <Loading />;
  }

  if (!isLoading && !email) {
    return <Navigate to='/login' state={{ path: pathname }} />;
  }

  return children;
};

export default PrivateRoute;
