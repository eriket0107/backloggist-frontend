import { TanStackDevtools } from "@tanstack/react-devtools";
import {
  createRootRouteWithContext,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import type { QueryClient } from "@tanstack/react-query";
import { authService } from "@/services/auth";
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";
import { Loader } from "@/components/Loader";

interface MyRouterContext {
  queryClient: QueryClient;
}

const PUBLIC_ROUTES = ["/auth/sign-up", "/auth/sign-in"] as const;

const isPublicRoute = (pathname: string): boolean => {
  return PUBLIC_ROUTES.some((route) => pathname === route);
};

export const Route = createRootRouteWithContext<MyRouterContext>()({
  pendingComponent: Loader,
  pendingMs: 0,
  beforeLoad: async ({ location }) => {
    if (isPublicRoute(location.pathname)) return;

    try {
      await authService.session();
    } catch {
      throw redirect({
        to: "/auth/sign-in",
        search: {
          expired: true,
        },
      });
    }
  },
  component: () => (
    <>
      <Outlet />
      <TanStackDevtools
        config={{
          position: "bottom-right",
        }}
        plugins={[
          {
            name: "Tanstack Router",
            render: <TanStackRouterDevtoolsPanel />,
          },
          TanStackQueryDevtools,
        ]}
      />
    </>
  ),
});
