import { NextRequest, NextResponse } from 'next/server'
import { TokensEnum } from './common/enums/tokens-enum'
import { ROUTES } from './common/enums/routes-enum'

export async function middleware(request: NextRequest) {
	const { url, cookies } = request
	const { pathname } = new URL(url)

	const refreshToken = cookies.get(TokensEnum.REFRESH_TOKEN)?.value

	const isAuthRoute = [`${ROUTES.SIGN_IN}`, `${ROUTES.SIGN_UP}`].includes(
		pathname
	)
	const isProtectedRoute = ![`${ROUTES.WELCOME}`].includes(pathname) && pathname.startsWith('/i/')

	if ((isAuthRoute || !isProtectedRoute) && refreshToken) {
		return NextResponse.redirect(new URL(ROUTES.DASHBOARD, url))
	}

	if (isAuthRoute) {
		return NextResponse.next()
	}

	if (!refreshToken && isProtectedRoute) {
		return NextResponse.redirect(new URL(ROUTES.SIGN_IN, url))
	}

	return NextResponse.next()
}

export const config = { matcher: '/((?!.*\\.).*)' }
