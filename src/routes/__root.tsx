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
import { isPublicRoute } from "@/constants/public-routes";

interface MyRouterContext {
  queryClient: QueryClient;
}

const sessionLoader = async () => {
  try {
    if (!isPublicRoute(location.pathname)) {
      return await authService.session();
    }
  } catch {
    return null;
  }
};

export const Route = createRootRouteWithContext<MyRouterContext>()({
  pendingMs: 0,
  loader: sessionLoader,
  pendingComponent: Loader,
  wrapInSuspense: true,
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
