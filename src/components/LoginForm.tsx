import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/components/ui/toast";
import { useLogin } from "@/hooks/useLogin";
import { Button } from "./ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

const loginSchema = z.object({
	email: z.string().email("E-mail inválido."),
	password: z.string().min(8, "Senha precisa ter mais de 8 digitos."),
});

type LoginForm = z.infer<typeof loginSchema>;

export const LoginForm = () => {
	const [isToSeePassword, setIsToSeePassword] = useState(false);
	const navigate = useNavigate();
	const form = useForm<LoginForm>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const { mutate, isPending } = useLogin({
		onSuccess: () => {
			toast.success("Login successful!");
			navigate({ to: "/" });
		},
		onError: (error) => {
			toast.error(error.message || "Login failed");
		},
	});

	const onSubmit = (data: LoginForm) => {
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
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>E-mail</FormLabel>
									<FormControl>
										<Input
											type="email"
											placeholder="your@email.com"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Senha</FormLabel>
									<FormControl>
										<div className="relative">
											<Input
												type={isToSeePassword ? "text" : "password"}
												placeholder="••••••••"
												{...field}
											/>
											<button
												type="button"
												onClick={() => setIsToSeePassword(!isToSeePassword)}
												className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
											>
												{isToSeePassword ? (
													<EyeOff size={20} />
												) : (
													<Eye size={20} />
												)}
											</button>
										</div>
									</FormControl>
									<FormMessage className="h-4" />
								</FormItem>
							)}
						/>
						<Button
							type="submit"
							className="w-full bg-gray-900 py-4! hover:bg-blue-950 transition-all duration-200 cursor-pointer"
							disabled={isPending}
						>
							{isPending ? "Logging in..." : "Login"}
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};
