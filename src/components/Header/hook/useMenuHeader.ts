import { useSession } from "@/hooks/useSession";
import { useMenuStore } from "@/stores/useMenuStore";


export const useHeader = () => {
  const { data: session, isLoading: isLoadingSession } = useSession();
  const { toggleOpenMenu } = useMenuStore();
  const handleOpenMenu = () => {
    toggleOpenMenu();
  };
  return {
    session,
    isLoadingSession,
    handleOpenMenu
  }
};