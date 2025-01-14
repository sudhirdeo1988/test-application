import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Header from "Components/Header";
import Sidebar from "Components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { userTypes } from "../../Utilities/user";

const PageSkeleton = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // ! Get list of users and add it into redux store on login
  useEffect(() => {
    if (["super_admin", "admin"].includes(user?.role)) {
      dispatch({
        type: "USER_LIST_SUCCESS",
        payload: { loading: false, error: false, data: userTypes },
      });
    }
  }, []);

  // ! If not authorized then redirect to login page
  if (!isAuthenticated) return <Navigate to="/login" />;

  // ! If authorized and not mentioned any path then redirect to dashboard page
  if (isAuthenticated && location.pathname === "/") {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="containerWrapper">
      {/* Sidebar */}
      <Sidebar />

      <div className="containerBody">
        {/* Header of page */}
        <Header />

        {/* Here page content will be rendered */}
        <Outlet />
      </div>
    </div>
  );
};

export default PageSkeleton;
