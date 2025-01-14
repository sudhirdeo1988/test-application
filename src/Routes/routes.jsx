import React, { Suspense, lazy } from "react";
import UnauthorizedContainer from "../Pages/UnauthorizedContainer/UnauthorizedContainer";

const Login = lazy(() => import(/* webpackChunkName: "Login" */ "Pages/Login"));
const Dashboard = lazy(() =>
  import(/* webpackChunkName: "Dashboard" */ "Pages/Dashboard")
);
const Insights = lazy(() =>
  import(/* webpackChunkName: "Insights" */ "Pages/Insights")
);

const DataContainer = lazy(() =>
  import(/* webpackChunkName: "DataContainer" */ "Pages/DataContainer")
);
const WorkflowContainer = lazy(() =>
  import(/* webpackChunkName: "WorkflowContainer" */ "Pages/WorkflowContainer")
);
const UserContainer = lazy(() =>
  import(/* webpackChunkName: "UserContainer" */ "Pages/UserContainer")
);

// Main Routes
export const routes = [
  {
    path: "/login",
    isExact: true,
    isProtected: false,
    component: (
      <Suspense fallback={<></>}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/unauthorized",
    isExact: true,
    isProtected: false,
    component: (
      <Suspense fallback={<></>}>
        <UnauthorizedContainer />
      </Suspense>
    ),
  },
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
    isExact: true,
    isProtected: true,
    component: (
      <Suspense fallback={<></>}>
        <Dashboard />
      </Suspense>
    ),
  },
  {
    id: "insights",
    label: "Insights",
    path: "/insights",
    isExact: true,
    isProtected: true,
    component: (
      <Suspense fallback={<></>}>
        <Insights />
      </Suspense>
    ),
  },
  {
    id: "data",
    label: "Data",
    path: "/data",
    isExact: true,
    isProtected: true,
    component: (
      <Suspense fallback={<></>}>
        <DataContainer />
      </Suspense>
    ),
  },
  {
    id: "workflow",
    label: "Workflow",
    path: "/workflow",
    isExact: true,
    isProtected: true,
    component: (
      <Suspense fallback={<></>}>
        <WorkflowContainer />
      </Suspense>
    ),
  },
  {
    id: "user",
    label: "user",
    path: "/user",
    isExact: true,
    isProtected: true,
    component: (
      <Suspense fallback={<></>}>
        <UserContainer />
      </Suspense>
    ),
  },
];
