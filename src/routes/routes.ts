import { publicRoutes } from "./publicRoutes";
import { protectedRoutes } from "./protected";
import { RouteType } from "./route.utils";

export const routes: RouteType[] = [...protectedRoutes, ...publicRoutes];
