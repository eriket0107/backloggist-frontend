import type { NavigateOptions } from "@tanstack/react-router";


export const PUBLIC_ROUTES = ["/auth/sign-up", "/auth/sign-in"] as NavigateOptions["to"][];

const isPublicRoute = (pathname: string): boolean => {
  return PUBLIC_ROUTES.some((route) => pathname === route);
};

export { isPublicRoute };