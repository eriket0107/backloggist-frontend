import { toast } from "@/components/ui/toast";
import { useSession } from "@/hooks/useSession";
import { useSignOut } from "@/hooks/useSignOut";
import { useNavigate } from "@tanstack/react-router";

export const useMenuFooter = () => {
  const navigate = useNavigate()
  const { data: session, isLoading: isLoadingSession } = useSession();
  const { mutateAsync, isPending: isLoadingSignOut } = useSignOut
    ({
      onSuccess: () => {
        toast.success("Até logo! Sua sessão foi encerrada.");
        navigate({
          to: "/auth/sign-in",
          replace: true,
        });
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