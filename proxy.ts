import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser, getNewToken, logout } from "./service/authService";
import { isTokenExpired } from "./service/authService/validToken";
import { hasPermission, permissionBasedRoutes } from "./utills/hasPermission";
import { getRedirectPath } from "./utills/getRedirectPath";

const allowedRoles = ["admin", "team_member", "project_manager"];

const authRoutes = [
  "/login",
  "/forgot-password",
  "/reset-password",
  "/register",
];

export const proxy = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

 
  const token = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  if (!refreshToken) {
    response.cookies.delete("accessToken");
  }

  if (token && authRoutes.includes(pathname)) {
    const userInfo = await getCurrentUser();
    const permissions = userInfo?.permissions ?? [];
    const role = userInfo?.role ?? null;
    if (!role || !allowedRoles.includes(role)) {
      await logout();
      return NextResponse.redirect(new URL("/login", request.url));
    } else {
      const redirectPath = getRedirectPath(
        role,
        [role, ...permissions].filter(Boolean),
        permissionBasedRoutes,
      );

      return NextResponse.redirect(new URL(redirectPath, request.url));
    }
  }
  // ✅ Logged-out users can access auth routes
  if (!token && authRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  if (!token || (await isTokenExpired(token))) {
    try {
      const data = await getNewToken();
      const accessToken = data?.data?.token as string;
      if (data?.success && accessToken) {
        response.cookies.set("accessToken", accessToken as string, {
          maxAge: 60 * 60 * 24 * 7,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          path: "/",
          sameSite: "lax",
        });
        return response;
      } else {
        await logout();
        const redirect = NextResponse.redirect(
          new URL(`/login?redirectPath=${pathname}`, request.url),
        );
        redirect.cookies.delete("accessToken");
        return redirect;
      }
    } catch (error) {
      console.error("Refresh token failed", error);
      return NextResponse.redirect(
        new URL(`/login?redirectPath=${pathname}`, request.url),
      );
    }
  }

  // ✅ Step 2: Get user info using valid token
  const userInfo = await getCurrentUser();
  const permission = userInfo?.permissions ?? [];

  if (!userInfo) {
    if (authRoutes.includes(pathname)) return response;
    return NextResponse.redirect(
      new URL(`/login?redirectPath=${pathname}`, request.url),
    );
  }

  const role = userInfo?.role ?? null;
  if (!role || !allowedRoles.includes(role)) {
    return NextResponse.redirect(new URL(`/login`, request.url));
  }

  const matchedRoute = permissionBasedRoutes
    .sort((a, b) => (b?.path?.length ?? 0) - (a?.path?.length ?? 0))
    .find((route) => new RegExp(`^${route?.path ?? ""}$`).test(pathname));

  if (!matchedRoute) {
    return response;
  }
  const isPublicRoute =
    !matchedRoute?.ownerOnly &&
    (!matchedRoute?.permissions || matchedRoute.permissions.length === 0);



  // ✅ Public route (everyone logged-in)
  if (isPublicRoute) {
    return response;
  }

  // ✅ Permission-based route
  const userRolesAndPermissions = [role, ...permission].filter(Boolean);
  const hasUserThePermission = hasPermission(
    userRolesAndPermissions,
    matchedRoute?.permissions ?? [],
  );

  if (!hasUserThePermission) {
    await logout();
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
};

export const config = {
  matcher: ["/", "/dashboard", "/dashboard/:path*", "/login", "/register"],
};
