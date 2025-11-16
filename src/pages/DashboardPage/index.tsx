import { Layout } from "@/components/Layout";

import { Outlet } from "@tanstack/react-router";

import { Menu } from "@/components/Menu";
import { Header } from "@/components/Header";

export const DashboardPage = () => {
  return (
    <Layout className="flex flex-col md:grid md:grid-cols-5 md:pt-5">
      <Header />
      <Menu />
      <main
        className="
        flex flex-1 w-full
      bg-gray-200 h-full 
        rounded-t-3xl md:col-span-4 
        md:pt-4 pt-6 px-4 md:p-12"
      >
        <Outlet />
      </main>
    </Layout>
  );
};
