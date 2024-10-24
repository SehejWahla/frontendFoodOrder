// PrivateRoute.tsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../store/store";
import { ReactNode } from "react";

interface PrivateRouteProps {
  children: ReactNode;
  accessRoles?: string[]; // Roles allowed to access the route
}

const PrivateRoute = ({ children, accessRoles = [] }: PrivateRouteProps) => {
  const { user, token, isLoading } = useSelector(
    (state: RootState) => state.auth
  );

  // Show a loader while checking authentication
  if (isLoading) {
    return <div>Loading...</div>; // Replace with a custom spinner if needed
  }

  // If not authenticated, redirect to /auth
  if (!token || !user) {
    return <Navigate to="/auth" />;
  }

  // Check role access
  if (accessRoles.length && !accessRoles.includes(user.role)) {
    return <Navigate to="/auth" />;
  }

  // User authenticated and has access, render children
  return <>{children}</>;
};

export default PrivateRoute;
