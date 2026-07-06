import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser, getNewToken, logout } from "./service/authService";
import { isTokenExpired } from "./service/authService/validToken";
import { getRestrictedRoutesForRole } from "./utills/filterRoutesByPermissions";

const authRoutes = ["/login", "/forgot-password", "/reset-password"];

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
    const role = userInfo?.role ?? null;
    if (!role) {
      await logout();
      return NextResponse.redirect(new URL("/login", request.url));
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Logged-out users can access auth routes
  if (!token && authRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  if (!token || (await isTokenExpired(token))) {
    try {
      const data = await getNewToken();
      const accessToken = data?.data?.accessToken as string;
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

  const userInfo = await getCurrentUser();
  if (!userInfo) {
    if (authRoutes.includes(pathname)) return response;
    return NextResponse.redirect(
      new URL(`/login?redirectPath=${pathname}`, request.url),
    );
  }

  const role = userInfo?.role ?? null;
  if (!role) {
    return NextResponse.redirect(new URL(`/login`, request.url));
  }

  if (role) {
    const restrictedRoutes = getRestrictedRoutesForRole(role);

    const isBlocked = restrictedRoutes.some((route) =>
      pathname.startsWith(route),
    );

    if (isBlocked) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return response;
};

export const config = {
  matcher: [
    "/users/:path*",
    "/agents/:path*",
    "/customers/:path*",
    "/targets/:path*",
    "/activity-log/:path",
    "/login",
  ],
};
