import { Elipses } from "@/components/Elipsis";
import { Button } from "@/components/ui/button";
import { useDashboardPage } from "./hooks/useDashboardPage";
import { Layout } from "@/components/Layout";
import { Image } from "@/components/Image";

import LogoText from "/backloggist-logo-text-256.webp";
import { MenuIcon } from "lucide-react";
import { Outlet } from "@tanstack/react-router";
import { Avatar } from "@/components/Avatar";

export const DashboardPage = () => {
  const { handleLogout, isLoading, session } = useDashboardPage();

  return (
    <Layout className="flex flex-col sm:grid sm:grid-cols-4 sm:pt-5">
      <header className="sm:hidden flex sm:flex-col md:flex-1 w-full h-[92px] sm:h-screen bg-gray-900 rounded-r-sm sm:col-span-1 p-4 justify-center items-center">
        <Button
          size="icon-lg"
          variant="outline"
          className="sm:hidden bg-gray-900 border-gray-850"
        >
          <MenuIcon className="text-slate-50" />
        </Button>

        <Image
          className="w-[192px] mx-auto"
          alt="Backlog Text logo"
          src={LogoText}
        />

        {session && <Avatar session={session} className="sm:hidden flex" />}
      </header>

      <aside className="hidden sm:flex flex-col sm:flex-1 w-full h-full bg-gray-900 rounded-r-sm sm:col-span-1 justify-center items-center">
        <div className="p-4 sm:flex flex-col hidden items-center">
          <Image
            className="md:w-[256px] md:h-[64px] w-[192px] h-[32px] mx-auto"
            alt="Backlog Text logo"
            src={LogoText}
          />
          <Button
            size="icon-lg"
            variant="outline"
            className="hidden sm:flex bg-gray-900 border-gray-850"
          >
            <MenuIcon className="text-slate-50" />
          </Button>
        </div>

        <div className="flex-1 w-full"></div>
        <div className="flex flex-col lg:flex-row w-full border-t border-slate-800 items-center justify-between px-6 p-4 gap-2">
          {session && <Avatar session={session} className="lg:flex hidden" />}
          <div className="flex flex-col gap-0.5">
            <p className="text-gray-50">{session?.user.name}</p>
            <p className="text-gray-400 hidden lg:flex">
              {session?.user.email}
            </p>
          </div>

          <Button onClick={handleLogout} variant="secondary" size="lg">
            {isLoading ? <Elipses>Saindo</Elipses> : "Sair"}
          </Button>
        </div>
      </aside>

      <main
        className="
        flex flex-1 w-full
      bg-gray-200 h-full 
        sm:rounded-t-xl sm:rounded-tr-none 
        rounded-t-3xl sm:col-span-3 
        sm:pt-4 pt-6 px-4 sm:p-12"
      >
        <Outlet />
      </main>
    </Layout>
  );
};
