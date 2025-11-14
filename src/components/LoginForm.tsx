import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/components/ui/toast";
import { useLogin } from "@/hooks/useLogin";
import { cn } from "@/utils";
import { Button } from "./ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const loginSchema = z.object({
	email: z.string().email("E-mail inválido."),
	password: z.string().min(8, "Senha precisa ter mais de 8 digitos."),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm = () => {
	const [isToSeePassword, setIsToSeePassword] = useState(false);
	const emailId = useId();
	const passwordId = useId();

	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const { mutate, isPending } = useLogin({
		onSuccess: () => {
			toast.success("Bem-vindo(a) de volta! Login realizado com sucesso.");
			navigate({ to: "/" });
		},
		onError: () => {
			toast.error("Credenciais inválidas. Verifique seu email e senha.");
		},
	});

	const onSubmit = (data: LoginFormData) => {
		mutate(data);
	};

	return (
		<Card className="w-full max-w-md shadow-md">
			<CardHeader>
				<CardTitle>Login</CardTitle>
				<CardDescription>
					Bem-vindo(a) de volta! Acesse sua conta.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor={emailId}>E-mail</Label>
						<Input
							id={emailId}
							type="email"
							placeholder="email@email.com"
							className={cn(errors.email?.message && "border-red-500")}
							{...register("email")}
						/>
						<p className="text-sm text-red-500 min-h-[20px]">
							{errors.email?.message || " "}
						</p>
					</div>
					<div className="space-y-2">
						<Label htmlFor={passwordId}>Senha</Label>
						<div className="relative">
							<Input
								id={passwordId}
								type={isToSeePassword ? "text" : "password"}
								placeholder="••••••••"
								className={cn(errors.password?.message && "border-red-500")}
								{...register("password")}
							/>
							<button
								type="button"
								onClick={() => setIsToSeePassword(!isToSeePassword)}
								className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
							>
								{isToSeePassword ? <EyeOff size={20} /> : <Eye size={20} />}
							</button>
						</div>
						<p className="text-sm text-red-500 min-h-[20px]">
							{errors.password?.message || " "}
						</p>
					</div>
					<Button
						type="submit"
						className="w-full bg-gray-900 py-4! hover:bg-blue-950 transition-all duration-200 cursor-pointer"
						disabled={isPending}
					>
						{isPending ? "Logging in..." : "Login"}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
};
