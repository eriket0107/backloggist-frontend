import { TanStackDevtools } from "@tanstack/react-devtools";
import {
  createRootRouteWithContext,
  Outlet,
  redirect,
  useLoaderData,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import type { QueryClient } from "@tanstack/react-query";

import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";
import { Loader } from "@/components/Loader";
import { NuqsAdapter } from 'nuqs/adapters/tanstack-router'
import { authService } from "@/services/auth";

interface MyRouterContext {
  queryClient: QueryClient;
}

const sessionLoader = async () => {
  try {
    // Attempt to fetch the session
    return await authService.session();
  } catch {
    // If authService.session() throws (e.g., 401), return null
    return null;
  }
};

const PUBLIC_ROUTES = ["/auth/sign-up", "/auth/sign-in"] as const;

const isPublicRoute = (pathname: string): boolean => {
  return PUBLIC_ROUTES.some((route) => pathname === route);
};

export const Route = createRootRouteWithContext<MyRouterContext>()({
  pendingMs: 0,
  loader: sessionLoader,
  pendingComponent: Loader,
  component: () => {
    const session = useLoaderData({
      strict: false
    })
    if (!session && !isPublicRoute(location.pathname)) {
      throw redirect({
        to: "/auth/sign-in",
      });
    }

    return (
      <NuqsAdapter>
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
      </NuqsAdapter>
    );
  },
});
