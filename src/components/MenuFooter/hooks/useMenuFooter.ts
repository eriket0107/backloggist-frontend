import { toast } from "@/components/ui/toast";
import { useSession } from "@/hooks/useSession";
import { useSignOut } from "@/hooks/useSignOut";
import { useMenuStore } from "@/stores/useMenuStore";
import { useNavigate } from "@tanstack/react-router";

export const useMenuFooter = () => {

  const navigate = useNavigate()
  const { setIsMenuOpen } = useMenuStore()
  const { data: session, isLoading: isLoadingSession } = useSession();

  const { mutateAsync, isPending: isLoadingSignOut } = useSignOut
    ({
      onSuccess: () => {
        setIsMenuOpen(false)
        navigate({
          to: "/auth/sign-in",
          replace: true,
        });
        toast.success("Até logo! Sua sessão foi encerrada.");
      },
    });

  const handleSignOut = async () => {
    await mutateAsync();
  }

  return {
    session,
    isLoadingSession,
    isLoadingSignOut,
    handleSignOut,
  }
}