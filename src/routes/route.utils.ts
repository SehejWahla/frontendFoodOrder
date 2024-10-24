import { LazyExoticComponent } from "react";

export interface RouteType {
  name: string;
  component: React.ComponentType<any>;
  path: string;
  access: string[];
}
