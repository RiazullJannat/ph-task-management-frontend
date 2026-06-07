"use client";
import { SidebarGroup } from "@/components/ui/sidebar";
import CoreManagement from "./sidebarRoutes/CoreManagement";
import { useUser } from "@/provider/AuthProvider";
import { filterRoutesByPermissions } from "@/utills/filterRoutesByPermissions";
import { crmRoutes, NavRoute } from "@/constants/CRM_Navigation";

export function NavMain() {
  const { user } = useUser();
  const role = user?.role as string;
  const permissions = user?.permissions as string[];

  const permittedRoute = filterRoutesByPermissions({
    routes: crmRoutes,
    permissions,
    role,
  });
  const groupedRoutes = crmRoutes.reduce(
    (acc, route) => {
      const key = route?.group || "Others";
      if (!acc[key]) acc[key] = [];
      acc[key].push(route);
      return acc;
    },
    {} as Record<string, NavRoute[]>,
  );

  return (
    <SidebarGroup>
      {permittedRoute.length ? (
        <div className="space-y-3">
          {Object.entries(groupedRoutes).map(([groupName, routes], i) => {
            const visibleRoutes = filterRoutesByPermissions({
              routes,
              permissions,
              role,
            });

            return (
              <CoreManagement
                key={i}
                sidebarRoutes={visibleRoutes}
                platform={groupName}
              />
            );
          })}
        </div>
      ) : (
        <div>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-8 w-full bg-gray-200 animate-pulse rounded-md mb-2" />
          ))}
        </div>
      )}
    </SidebarGroup>
  );
}
