import { Button } from "../ui/button";
import { Particles } from "../ui/shadcn-io/particles";
import { useMenuStore } from "../Menu";
import { MenuIcon } from "lucide-react";
import { Image } from "../Image";
import { SkeletonHeader } from "@/pages/DashboardPage/Skeleton";
import { Avatar } from "../Avatar";
import LogoText from "/backloggist-logo-text-256.webp";
import { useHeader } from "./hook/useMenuHeader";

export const Header = () => {
  const { toggleOpenMenu } = useMenuStore();
  const handleOpenMenu = () => {
    toggleOpenMenu();
  };
  const { isLoadingSession, session } = useHeader();

  return (
    <header className="relative md:hidden flex md:flex-col md:flex-1 w-full h-[92px] md:h-screen bg-gray-900 rounded-r-sm md:col-span-1 p-4 justify-between items-center">
      <Particles className="absolute inset-0" />
      <Button
        size="icon-lg"
        variant="outline"
        className="md:hidden bg-gray-900 border-gray-850"
        onClick={handleOpenMenu}
      >
        <MenuIcon className="text-slate-50" />
      </Button>

      <Image className="w-[192px]" alt="Backlog Text logo" src={LogoText} />

      {isLoadingSession || !session ? (
        <SkeletonHeader />
      ) : (
        <Avatar name={session.user.name} className="md:hidden flex" />
      )}
    </header>
  );
};
