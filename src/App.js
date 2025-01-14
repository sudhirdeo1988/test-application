import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store";
import ProtectedRoute from "./Routes/ProtectedRoute/ProtectedRoute.jsx";
import Dashboard from "./Pages/Dashboard";
import "@ant-design/v5-patch-for-react-19";

import { map as _map } from "lodash-es";
import { routes } from "./Routes/routes";

const PageSkeleton = lazy(() =>
  import(
    /* webpackChunkName: "PageSkeleton" */ "Pages/PageSkeleton/PageSkeleton"
  )
);

const App = () => {
  return (
    <Provider store={store}>
      <Suspense fallback={<></>}>
        <Router>
          <Routes>
            <Route path="/" element={<PageSkeleton />}>
              {_map(routes, (route) => {
                if (route?.isProtected) {
                  return (
                    <Route
                      key={route?.path}
                      exact={route?.isExact}
                      path={route?.path}
                      element={
                        <ProtectedRoute>{route?.component}</ProtectedRoute>
                      }
                    />
                  );
                }
              })}

              <Route path="*" element={<Dashboard />} />
            </Route>

            {_map(routes, (route) => {
              if (!route?.isProtected) {
                return (
                  <Route
                    key={route?.path}
                    exact={route?.isExact}
                    path={route?.path}
                    element={route?.component}
                  />
                );
              }
            })}
          </Routes>
        </Router>
      </Suspense>
    </Provider>
  );
};

export default App;
