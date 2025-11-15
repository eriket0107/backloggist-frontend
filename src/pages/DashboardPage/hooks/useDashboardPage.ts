import { toast } from "@/components/ui/toast";
import { useSession } from "@/hooks/useSession";
import { useSignOut } from "@/hooks/useSignOut";
import { useNavigate } from "@tanstack/react-router";

export const useDashboardPage = () => {
  const navigate = useNavigate();
  const { mutate } = useSignOut({
    onSuccess: () => {
      toast.success("Até logo! Sua sessão foi encerrada.");
      navigate({
        to: "/auth/sign-in",
        replace: true,
      });
    },
  });

  const { data: session, isLoading } = useSession();

  const handleLogout = () => {
    mutate();
  }

  return {
    session,
    isLoading,
    handleLogout
  }
};