import { Layout } from "@/components/Layout";

import { Outlet } from "@tanstack/react-router";

import { Menu } from "@/components/Menu";
import { Header } from "@/components/Header";

export const DashboardPage = () => {
  return (
    <Layout className="flex flex-col md:grid md:grid-cols-5 md:pt-5">
      <Header />
      <Menu />
      <main className="flex h-full w-full flex-1 rounded-t-3xl bg-gray-200 px-4 pt-6 md:col-span-4 md:p-12 md:pt-4">
        <div className="w-full max-h-[700px] overflow-y-scroll">

          <Outlet />
        </div>
      </main>
    </Layout>
  );
};
