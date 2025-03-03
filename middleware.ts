import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get("isLoggedIn")?.value === "true"
  const isSignInPage = request.nextUrl.pathname === "/signin"

  // if (!isLoggedIn && !isSignInPage) {
  //   return NextResponse.redirect(new URL("/signin", request.url))
  // }

  // if (isLoggedIn && isSignInPage) {
  //   return NextResponse.redirect(new URL("/dashboard", request.url))
  // }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

