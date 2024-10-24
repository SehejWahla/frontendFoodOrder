import { userRoutes } from "./user";
import { RouteType } from "../route.utils";

export const protectedRoutes: RouteType[] = [...userRoutes];
