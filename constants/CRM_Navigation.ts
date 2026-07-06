import {
  Activity,
  House,
  LucideIcon,
  Users,
} from "lucide-react";

export interface NavRoute {
  title: string;
  path?: string;
  icon?: LucideIcon;
  roles?: TRole[];
  children?: NavRoute[];
  group?: string;
}

export type TRole = "TEAM_MEMBER" | "ADMIN" | "PROJECT_MANAGER";

export const navigationRoute: NavRoute[] = [
  {
    title: "Home",
    icon: House,
    path: "/",
  },
  {
    title: "Users",
    icon: Users,
    path: "/users",
    roles: ["ADMIN"],
  },
  {
    title: "Activity Log",
    icon: Activity,
    path: "/activity-log",
    roles: ["ADMIN"],
  },
];