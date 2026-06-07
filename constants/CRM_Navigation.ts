import {
  Activity,
  CircleGauge,
  CircleUserRound,
  FolderKanban,
  ListTodo,
  UsersRound,
  LucideIcon,
} from "lucide-react";

export interface NavRoute {
  title: string;
  path?: string;
  icon?: LucideIcon;
  ownerOnly?: boolean;
  permissions?: string[];
  roles?: string[];
  children?: NavRoute[];
  group?: string;
}

export const crmRoutes: NavRoute[] = [
  {
    title: "Profile",
    icon: CircleUserRound,
    path: "/dashboard/profile",
  },
  {
    title: "Dashboard",
    icon: CircleGauge,
    path: "/dashboard",
    roles: ["admin", "project_manager", "team_member"],
  },
  {
    group: "Project Management",
    title: "Projects",
    icon: FolderKanban,
    children: [
      {
        title: "All Projects",
        path: "/dashboard/projects",
        roles: ["admin", "project_manager", "team_member"],
      },
      // {
      //   title: "Create Project",
      //   path: "/dashboard/projects/create",
      //   roles: ["admin", "project_manager"],
      // },
    ],
  },
  {
    group: "Project Management",
    title: "Tasks",
    icon: ListTodo,
    children: [
      {
        title: "All Tasks",
        path: "/dashboard/tasks",
        roles: ["admin", "project_manager", "team_member"],
      },
      // {
      //   title: "Create Task",
      //   path: "/dashboard/tasks/create",
      //   roles: ["admin", "project_manager"],
      // },
    ],
  },
  {
    group: "Team Collaboration",
    title: "Team Members",
    icon: UsersRound,
    children: [
      {
        title: "All Members",
        path: "/dashboard/team",
        roles: ["admin", "project_manager", "team_member"],
      },
      {
        title: "Workload Summary",
        path: "/dashboard/team/workload",
        roles: ["admin", "project_manager"],
      },
    ],
  },
  {
    title: "Activity Log",
    icon: Activity,
    group: "Analytics and Settings",
    path: "/dashboard/activity-log",
    roles: ["admin", "project_manager"],
  },
];
