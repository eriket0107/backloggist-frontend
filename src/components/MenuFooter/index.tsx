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
    <div className="mt-auto flex w-full items-center justify-between gap-4 border-t border-slate-800 px-8  py-4 md:justify-center md:pt-6 md:pb-0">
      {isLoadingSession || !session ? (
        <MenuFooterSkeleton />
      ) : (
        <div className="flex flex-col">
          <p className="text-start text-sm text-gray-50">
            {session?.user.name}
          </p>
          <p className="hidden text-xs text-gray-400 lg:flex">
            {session?.user.email}
          </p>
        </div>
      )}
      <Tooltip>
        <TooltipTrigger>
          <Button
            onClick={handleSignOut}
            disabled={isLoadingSignOut}
            variant="secondary"
            size="icon-sm"
          >
            {isLoadingSignOut ? <Elipses /> : <LogOutIcon />}
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-theme">Sair </TooltipContent>
      </Tooltip>
    </div>
  );
};
