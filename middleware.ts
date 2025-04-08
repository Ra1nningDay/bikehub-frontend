import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;
  const isAdmin = request.cookies.get("is-admin")?.value === "true"; // อ่านจาก cookie

  if (!token || !isAdmin) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/dashboard") && !isAdmin) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
