import { TanStackDevtools } from "@tanstack/react-devtools";
import {
	createRootRouteWithContext,
	Outlet,
	redirect,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

// import Header from '../components/Header'

import type { QueryClient } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toast";
import { sessionService } from "@/services/auth";
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	beforeLoad: async ({ location }) => {
		if (location.pathname === "/login") return;
		try {
			await sessionService();
		} catch {
			throw redirect({ to: "/login", search: { expired: "true" } });
		}
	},
	component: () => (
		<>
			{/* <Header /> */}
			<Outlet />
			<Toaster />
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
