import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Elipses } from "@/components/Elipsis";

import { Button } from "@/components/ui/button";

import { LogOutIcon } from "lucide-react";

import { useMenuFooter } from "./hooks/useMenuFooter";
import { MenuFooterSkeleton } from "./skeleton";

export const MenuFooter = () => {
  const { isLoadingSession, session, handleSignOut, isLoadingSignOut } =
    useMenuFooter();

  return (
    <div className="flex w-full border-t border-slate-800 items-center md:justify-center justify-between gap-4 md:mt-auto px-8 py-4 md:pt-6 md:pb-0">
      {isLoadingSession || !session ? (
        <MenuFooterSkeleton />
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
        </>
      )}
      <Tooltip>
        <TooltipTrigger>
          <Button
            onClick={handleSignOut}
            disabled={isLoadingSignOut}
            variant="secondary"
            size="icon-lg"
          >
            {isLoadingSignOut ? <Elipses /> : <LogOutIcon />}
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-theme">Sair </TooltipContent>
      </Tooltip>
    </div>
  );
};
