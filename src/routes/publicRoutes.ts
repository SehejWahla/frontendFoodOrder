import React from "react";
import { RouteType } from "./route.utils";
const HomePage = React.lazy(() => import("@/pages/HomePage"));
const AuthPage = React.lazy(() => import("@/pages/AuthPage"));
const AuthSignupPage = React.lazy(() => import("@/pages/AuthSignupPage"));

export const publicRoutes: RouteType[] = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
    access: [],
  },
  {
    path: "/auth",
    name: "AuthPage",
    component: AuthPage,
    access: [],
  },
  {
    path: "/auth/signup",
    name: "AuthSignupPage",
    component: AuthSignupPage,
    access: [],
  },
];
