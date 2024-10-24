import { routes } from "./routes/routes";
import Layout from "./layouts/layout";
import React from "react";
import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/protectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {routes.map((route, key) => {
        const Element = (
          <Suspense fallback={<div>Loading...</div>}>
            <Layout>{React.createElement(route.component)}</Layout>
          </Suspense>
        );

        // If route is protected, wrap it with PrivateRoute
        if (route.access?.length) {
          return (
            <Route
              key={key}
              path={route.path}
              element={
                <PrivateRoute accessRoles={route.access}>
                  {Element}
                </PrivateRoute>
              }
            />
          );
        }

        // Public route
        return <Route key={key} path={route.path} element={Element} />;
      })}

      {/* Redirect to dashboard if token exists */}
      <Route path="/" element={<Navigate to="/dashboard" />} />

      {/* Catch-all route to redirect to auth if not found */}
      <Route path="*" element={<Navigate to="/auth" />} />
    </Routes>
  );
};

export default AppRoutes;
