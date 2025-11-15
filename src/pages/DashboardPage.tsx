import { Elipses } from "@/components/Elipsis";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useSession } from "@/hooks/useSession";
import { useSignOut } from "@/hooks/useSignOut";
import { useNavigate } from "@tanstack/react-router";

export const DashboardPage = () => {
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
  };

  return (
    <div>
      Olá,{session?.user.name}!
      <Button onClick={handleLogout}>
        {isLoading ? <Elipses>Saindo</Elipses> : "Sair"}
      </Button>
    </div>
  );
};
