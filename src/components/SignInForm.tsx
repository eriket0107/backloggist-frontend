import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/components/ui/toast";
import { useLogin } from "@/hooks/useSignIn";
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
import { NavigateButton } from "./NavigateButton";
import { Elipses } from "./Elipsis";
import { encodePassword } from "@/utils/encode-password";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido."),
  password: z.string().min(8, "Senha precisa ter mais de 8 digitos."),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const SignInForm = () => {
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

  const { mutateAsync, isPending } = useLogin({
    onSuccess: () => {
      navigate({ to: "/" });
      toast.success("Bem-vindo(a) de volta! Login realizado com sucesso.");
    },
    onError: () => {
      toast.error("Credenciais inválidas. Verifique seu email e senha.");
    },
  });

  const onSubmit = async (formData: LoginFormData) => {
    const encodedPassword = encodePassword(formData.password);
    const data = {
      email: formData.email,
      password: encodedPassword,
    };
    await mutateAsync(data);
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
            <p className="min-h-5 text-sm text-red-500">
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
              <Button
                type="button"
                onClick={() => setIsToSeePassword(!isToSeePassword)}
                variant="ghost"
                size="icon-sm"
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {isToSeePassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </Button>
            </div>
            <p className="min-h-5 text-sm text-red-500">
              {errors.password?.message || " "}
            </p>
          </div>
          <Button
            type="submit"
            size="lg"
            className="w-full cursor-pointer bg-gray-900 py-4! transition-all duration-200 hover:bg-blue-950"
            disabled={isPending}
          >
            {isPending ? <Elipses>Entrando</Elipses> : "Entrar"}
          </Button>
        </form>
        <div className="flex w-full items-center justify-center">
          <NavigateButton to={"/auth/sign-up"} iconEnd={ArrowRight}>
            Criar conta
          </NavigateButton>
        </div>
      </CardContent>
    </Card>
  );
};
