import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

createRoot(document.getElementById("root")!).render(
  <>
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId="739062353379-9rq3ojkbgogues6ldrs2eid2sn98llfs.apps.googleusercontent.com">
        <StrictMode>
          <Router>
            <AppRoutes />
          </Router>
        </StrictMode>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  </>
);
