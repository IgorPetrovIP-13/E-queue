import { NextRequest, NextResponse } from "next/server";
import { Tokens } from "@repo/core/enums/tokens";

import { ROUTES } from "./common/enums/routes-enum";

export function middleware(request: NextRequest) {
  const { url, cookies } = request;
  const { pathname } = new URL(url);

  const headers = new Headers(request.headers);

  headers.set("x-current-path", request.nextUrl.pathname);

  const refreshToken = cookies.get(Tokens.REFRESH_TOKEN)?.value;

  const isApiRoute = pathname.startsWith("/api/");
  const isAuthRoute = [`${ROUTES.SIGN_IN}`, `${ROUTES.SIGN_UP}`].includes(
    pathname
  );
  const isProtectedRoute =
    ![`${ROUTES.WELCOME}`].includes(pathname) && pathname.startsWith("/i/");

  if (isApiRoute) {
    if (!refreshToken) {
      return NextResponse.redirect(new URL(ROUTES.SIGN_IN, url));
    }

    return NextResponse.next({ headers});
  }

  if ((isAuthRoute || !isProtectedRoute) && refreshToken) {
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD, url));
  }

  if (isAuthRoute) {
    return NextResponse.next({ headers });
  }

  if (!refreshToken && isProtectedRoute) {
    return NextResponse.redirect(new URL(ROUTES.SIGN_IN, url));
  }

  return NextResponse.next({ headers });
}

export const config = { matcher: "/((?!.*\\.).*)" };
