import React, { lazy, Suspense } from "react";

const UserManagement = lazy(() =>
  import(
    /* webpackChunkName: "UserManagement" */ "Components/UserManagement/UserManagement"
  )
);

const UserContainer = () => {
  return (
    <Suspense fallback={<></>}>
      <UserManagement />
    </Suspense>
  );
};

export default UserContainer;
