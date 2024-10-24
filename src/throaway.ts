import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/layouts/layout";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import AuthSignupPage from "./pages/AuthSignupPage";
const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      <Route
        path="/auth"
        element={
          <Layout>
            <AuthPage />
          </Layout>
        }
      />
      <Route
        path="/auth/signup"
        element={
          <Layout>
            <AuthSignupPage />
          </Layout>
        }
      />
      <Route path="/user-profile" element={<span>User Profile Page</span>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
