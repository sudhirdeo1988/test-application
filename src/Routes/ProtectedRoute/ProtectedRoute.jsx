import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { isEmpty as _isEmpty, find as _find } from "lodash-es";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const isRoutePermitted =
    _find(user?.permittedRoutes, (item) => location.pathname === item?.route) ||
    {};

  if (!isAuthenticated) return <Navigate to="/login" />;

  if (!user.role || !isRoutePermitted || _isEmpty(isRoutePermitted)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
