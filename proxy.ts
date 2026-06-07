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
    const userInfo = await getCurrentUser()
    const role = userInfo?.role ?? null;
    if (!role || !allowedRoles.includes(role)) {
      await logout();
      return NextResponse.redirect(new URL("/login", request.url));
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
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
  console.log(userInfo)

  if (!userInfo) {
    await logout()
    return NextResponse.redirect(
      new URL(`/login?redirectPath=${pathname}`, request.url),
    );
  }

  const role = userInfo?.role ?? null;
  if (!role || !allowedRoles.includes(role)) {
    await logout()
    return NextResponse.redirect(new URL(`/login`, request.url));
  }

  return response;
};

export const config = {
  matcher: ["/", "/dashboard", "/dashboard/:path*", "/login", "/register"],
};
