/**
 * This is the array of public routes that are not protected with authentication
 * All people are able to access these routes
 * @type {string[]}
 */
export const publicRoutes: string[] = ["/"];

/**
 * This is the array of routes that belongs to the auth group,
 * And all the people should be able to access them
 * This routes will redirect to callback url or the DEFAULT_LOGIN_URL
 * @type {string[]}
 */
export const authRoutes: string[] = ["/auth/login", "/auth/register"];

/**
 * Those routes that starts with this prefix should NOT be blocked by authentication
 * @type {string}
 */
export const authRoutesPrefix: string = "/api/auth";

/**
 * This is the default redirect path,
 * if the callback url is not provided because of any reason
 * User will be redirect to this path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/settings";