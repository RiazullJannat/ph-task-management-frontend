import {
  Activity,
  House,
  List,
  LucideIcon,
  PenSquare,
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
    title: "Tasks",
    icon: List,
    path: "/dashboard/tasks",
  },
  {
    title: "Annotation",
    icon: PenSquare,
    path: "/dashboard/annotate",
  },
  {
    title: "Activity Log",
    icon: Activity,
    path: "/dashboard/activity-log",
    roles: ["ADMIN"],
  },
];