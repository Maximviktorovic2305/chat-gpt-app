import type { CookieOptions, Request, Response } from 'express';

export const REFRESH_COOKIE_NAME = 'aicontact_refresh_token';

const refreshCookieOptions = (): CookieOptions => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/api/auth',
  maxAge: 30 * 24 * 60 * 60 * 1000,
});

export const setRefreshCookie = (response: Response, token: string) => {
  response.cookie(REFRESH_COOKIE_NAME, token, refreshCookieOptions());
};

export const clearRefreshCookie = (response: Response) => {
	const options = refreshCookieOptions();
	delete options.maxAge;
  response.clearCookie(REFRESH_COOKIE_NAME, options);
};

export const readRefreshCookie = (request: Request) => {
	const cookies = request.cookies as Record<string, string> | undefined;
	return cookies?.[REFRESH_COOKIE_NAME];
};
