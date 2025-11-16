import { Button } from "@/components/ui/button";
import { useDashboardPage } from "./hooks/useDashboardPage";
import { Layout } from "@/components/Layout";
import { Image } from "@/components/Image";

import LogoText from "/backloggist-logo-text-256.webp";
import { LogOutIcon, MenuIcon } from "lucide-react";
import { Link, Outlet } from "@tanstack/react-router";
import { Avatar } from "@/components/Avatar";
import { Particles } from "@/components/ui/shadcn-io/particles";
import { SkeletonHeader, SkeletonMenuBottom } from "./Skeleton";
import { menu } from "@/constants/menu";
import { cn } from "@/utils";

export const DashboardPage = () => {
  const { handleLogout, isLoading, session, location } = useDashboardPage();

  return (
    <Layout className="flex flex-col sm:grid sm:grid-cols-4 sm:pt-5">
      <header className="relative sm:hidden flex sm:flex-col md:flex-1 w-full h-[92px] sm:h-screen bg-gray-900 rounded-r-sm sm:col-span-1 p-4 justify-center items-center">
        <Particles className="absolute inset-0" />
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

        {isLoading || !session ? (
          <SkeletonHeader />
        ) : (
          <Avatar session={session} className="sm:hidden flex" />
        )}
      </header>

      <aside className="hidden sm:flex flex-col sm:flex-1 w-full h-full bg-gray-900 rounded-r-sm sm:col-span-1 justify-center items-center">
        <div className="p-4 sm:flex flex-col hidden items-center">
          <Image
            className="md:w-[256px] md:h-[64px] w-[192px] h-[32px] mx-auto"
            alt="Backlog Text logo"
            src={LogoText}
          />
        </div>

        <div className="flex-1 w-full flex flex-col items-center justify-start px-6 py-8 gap-2">
          {menu.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "rounded-sm flex text-xl  text-gray-50 hover:bg-[#e3b561] hover:text-gray-100 items-center p-2 gap-2 min-w-[200px] transition-all",
                location.pathname === item.to && "text-[#e3b561]"
              )}
            >
              <item.Icon height={24} />
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex w-full border-t border-slate-800 items-center justify-center px-6 p-4 gap-4">
          {isLoading || !session ? (
            <SkeletonMenuBottom />
          ) : (
            <>
              <div className="flex flex-col ">
                <p className="text-start text-gray-50 text-sm">
                  {session?.user.name}
                </p>
                <p className="text-gray-400 hidden lg:flex text-xs">
                  {session?.user.email}
                </p>
              </div>
              <Button onClick={handleLogout} variant="secondary" size="icon-lg">
                <LogOutIcon />
              </Button>
            </>
          )}
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
