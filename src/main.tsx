import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ReactNode } from "react";
import AppRoutes from "./AppRoutes";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { decodeToken } from "./services/auth.utils";
import { setCredentials, setLoading } from "./store/slices/authReducer";

interface AuthInitializerProps {
  children: ReactNode;
}

const AuthInitializer = ({ children }: AuthInitializerProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Start loading while checking the authentication state
    dispatch(setLoading(true));

    const token = localStorage.getItem("token");
    if (token) {
      const userData = decodeToken(token);
      if (userData) {
        dispatch(setCredentials({ token, user: userData }));
      }
    }

    // Authentication check complete
    dispatch(setLoading(false));
  }, [dispatch]);

  return <>{children}</>; // Ensure children render after useEffect runs
};

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

createRoot(document.getElementById("root")!).render(
  <>
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId="739062353379-9rq3ojkbgogues6ldrs2eid2sn98llfs.apps.googleusercontent.com">
        <Provider store={store}>
          <StrictMode>
            <Router>
              <AuthInitializer>
                {" "}
                <AppRoutes />
              </AuthInitializer>
            </Router>
          </StrictMode>
        </Provider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  </>
);
