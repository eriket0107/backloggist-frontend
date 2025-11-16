import { useSession } from "@/hooks/useSession";


export const useHeader = () => {
  const { data: session, isLoading: isLoadingSession } = useSession();

  return {
    session,
    isLoadingSession,
  }
};