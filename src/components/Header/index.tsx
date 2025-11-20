import { Button } from "../ui/button";
import { Particles } from "../ui/shadcn-io/particles";
import { MenuIcon } from "lucide-react";
import { Image } from "../Image";
import { SkeletonHeader } from "@/pages/DashboardPage/Skeleton";
import { Avatar } from "../Avatar";
import LogoText from "/backloggist-logo-text-256.webp";
import { useHeader } from "./hook/useMenuHeader";
import { cn } from "@/utils";

export const Header = () => {
  const { isLoadingSession, session, handleOpenMenu, isMenuOpen } = useHeader();

  return (
    <header className="relative flex h-[92px] w-full items-center justify-between rounded-r-sm bg-gray-900 p-4 md:col-span-1 md:hidden md:h-screen md:flex-1 md:flex-col">
      <Particles className="absolute inset-0" />
      <Button
        size="icon-lg"
        variant="outline"
        className={cn(
          "border-gray-850 transition-all md:hidden",
          isMenuOpen ? "bg-gray-500" : "bg-gray-900!",
        )}
        onClick={handleOpenMenu}
      >
        <MenuIcon className="text-gray-100" />
      </Button>

      <Image className="w-[192px]" alt="Backlog Text logo" src={LogoText} />

      {isLoadingSession || !session ? (
        <SkeletonHeader />
      ) : (
        <Avatar name={session.user.name} className="flex md:hidden" />
      )}
    </header>
  );
};
