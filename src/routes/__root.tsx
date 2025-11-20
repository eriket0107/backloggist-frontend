import { TanStackDevtools } from "@tanstack/react-devtools";
import {
  createRootRouteWithContext,
  Outlet,
  useLocation,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import type { QueryClient } from "@tanstack/react-query";

import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";
import { Loader } from "@/components/Loader";
import { useSession } from "@/hooks/useSession";
import { NuqsAdapter } from 'nuqs/adapters/tanstack-router'

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
  component: () => {
    const { pathname } = useLocation();
    useSession({
      queryKey: ["session"],
      enabled: !isPublicRoute(pathname),
    });
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
