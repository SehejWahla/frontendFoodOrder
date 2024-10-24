// AppRoutes.tsx
import { routes } from "./routes/routes";
import Layout from "./layouts/layout";
import React from "react";
import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import PrivateRoute from "./components/protectedRoute";
import { RootState } from "./store/store";

const AppRoutes = () => {
  const { token, isLoading } = useSelector((state: RootState) => state.auth);

  // Render loading screen if still checking authentication
  if (isLoading) {
    return <div>Loading...</div>; // Replace with your custom spinner if needed
  }

  return (
    <Routes>
      {routes.map((route, key) => {
        console.log("route is", route.name, route.path);
        const Element = (
          <Suspense fallback={<div>Loading...</div>}>
            <Layout>{React.createElement(route.component)}</Layout>
          </Suspense>
        );

        // If the user is authenticated and this is a public route, redirect to /dashboard
        if (token && !route.access?.length) {
          return (
            <Route
              key={key}
              path={route.path}
              element={<Navigate to="/dashboard" />}
            />
          );
        }

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

        // Public route for unauthenticated users
        return <Route key={key} path={route.path} element={Element} />;
      })}

      {/* Catch-all route to redirect to auth if not found */}
      <Route
        path="*"
        element={token ? <Navigate to="/dashboard" /> : <Navigate to="/auth" />}
      />
    </Routes>
  );
};

export default AppRoutes;
