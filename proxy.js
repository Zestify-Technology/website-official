import { NextResponse } from "next/server";

export function proxy(request) {
  const currentPath = request.nextUlr.pathname;

  const authCookie = request.cookies.get("pb_auth")?.value;

  let isAuthenticated = false;
  let userRole = "";

  if (authCookie) {
    try {
      const parseAuth = JSON.parse(decodeURIComponent(authCookie));
      if (parseAuth && parseAuth.token) {
        isAuthenticated = true;
        userRole = parseAuth.model?.role || "";
      }
    } catch (error) {
      console.log("gagal membaca cookie auth proxy");
    }
  }

  if (
    !isAuthenticated &&
    (currentPath.startsWith("/dashboard/admin-angkatiga") ||
      currentPath.startsWith("/dashboard/angkatiga"))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthenticated && currentPath === "/login") {
    if (userRole === "admin angkatiga") {
      return NextResponse.redirect(
        new URL("/dashboard/admin-angkatiga", request.url),
      );
    }
    if (userRole === "angkatiga") {
      return NextResponse.redirect(
        new URL("/dashboard/angkatiga", request.url),
      );
    }
  }

  if (
    isAuthenticated &&
    currentPath.startsWith("/dashboard/admin-angkatiga") &&
    userRole !== "admin angkatiga"
  ) {
    NextResponse.redirect(new URL("/dashboard/angkatiga"));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/dashboard/admin-angkatiga", "dashboard/angkatiga"],
};
