// PrivateRoute.tsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../store/store";

interface PrivateRouteProps {
  children: JSX.Element;
  accessRoles?: string[]; // Roles allowed to access the route
}

const PrivateRoute = ({ children, accessRoles = [] }: PrivateRouteProps) => {
  const { user, token } = useSelector((state: RootState) => state.auth);

  // Check if user is authenticated
  if (!token || !user) {
    return <Navigate to="/auth" />;
  }

  // Check if user has the required role to access the route
  if (accessRoles.length && !accessRoles.includes(user.role)) {
    return <Navigate to="/auth" />;
  }

  return children;
};

export default PrivateRoute;
