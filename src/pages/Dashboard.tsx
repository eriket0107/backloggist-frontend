import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useLogout } from "@/hooks/useLogout";

export const Dashboard = () => {
	const { mutate } = useLogout({
		onSuccess: () => {
			toast.success("Logout efetuado com sucesso!");
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
