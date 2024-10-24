import { RouteType } from "../route.utils";
import React from "react";
const DashboardPage = React.lazy(() => import("@/pages/DashboardPage"));

export const userRoutes: RouteType[] = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardPage,
    access: ["user"],
  },
];
