import { NextRequest, NextResponse } from 'next/server'
import { TokensEnum } from './common/enums/tokens-enum'
import { authService } from './services/auth.service';
import { ROUTES } from './common/enums/routes-enum';

export async function middleware(request: NextRequest, _: NextResponse) {

	const url = request.url as ROUTES;
	const cookies = request.cookies;
	
	const refreshToken = cookies.get(TokensEnum.REFRESH_TOKEN);
	
	const isAuthRoute = [ROUTES.SIGN_IN, ROUTES.SIGN_UP].includes(url);
	const isProtectedRoute = ![ROUTES.WELCOME].includes(url);

	if (isAuthRoute && refreshToken) {
		try {
			await authService.logout();
			NextResponse.next();
		} catch (error) {
			NextResponse.redirect(new URL(ROUTES.WELCOME, request.url));
		}
	}

	if (isProtectedRoute && !refreshToken) {
		NextResponse.redirect(new URL(ROUTES.SIGN_IN, request.url));
	}

	return NextResponse.next();
}
