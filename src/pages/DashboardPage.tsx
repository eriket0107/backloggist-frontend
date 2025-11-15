import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useSignOut } from "@/hooks/useSignOut";

export const DashboardPage = () => {
  const { mutate } = useSignOut({
    onSuccess: () => {
      toast.success("Até logo! Sua sessão foi encerrada.");
    },
  });

  const handleLogout = () => {
    mutate();
  };

  return (
    <div>
      Teste
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};
