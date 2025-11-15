import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/components/ui/toast";
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
import { useSignUp } from "@/hooks/useSignUp";
import { NavigateButton } from "./NavigateButton";
import { Elipses } from "./Elipsis";

const signInErrors = {
  "This email address is already in use.": "Este e-mail já está em uso.",
};

type SignErrorsType = keyof typeof signInErrors;

const signSchema = z
  .object({
    name: z
      .string()
      .min(3, "Insira um nome válido.")
      .max(50, "Excede número de caracteres."),
    email: z.string().email("E-mail inválido."),
    password: z.string().min(8, "Senha precisa ter mais de 8 dígitos."),
    confirmPassword: z.string().min(8, "Senha precisa ter mais de 8 dígitos."),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "As senhas precisam ser iguais.",
        path: ["password"],
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "As senhas precisam ser iguais.",
        path: ["confirmPassword"],
      });
    }
  });
type SignInFormData = z.infer<typeof signSchema>;

export const SignUpForm = () => {
  const [isToSeePassword, setIsToSeePassword] = useState(false);
  const nameId = useId();
  const emailId = useId();
  const passwordId = useId();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate, isPending } = useSignUp({
    onSuccess: () => {
      toast.success("Usuário criado com sucesso.");
      navigate({ to: "/auth/sign-in" });
    },
    onError: (data) => {
      toast.error(
        signInErrors[data.message as SignErrorsType] ||
          "Erro ao criar usuário, tente novamente."
      );
    },
  });

  const onSubmit = (data: SignInFormData) => {
    const { email, password, name } = data;
    mutate({ email, password, name });
  };

  const hasPasswordError =
    errors.password?.message || errors.confirmPassword?.message;

  return (
    <Card className="w-full max-w-md shadow-md">
      <CardHeader>
        <CardTitle>Crie Sua Conta no Backloggist</CardTitle>
        <CardDescription>
          Gerencie Seu Tempo de Consumo. Defina o que vem a seguir.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={emailId}>Nome</Label>
            <Input
              id={nameId}
              type="text"
              placeholder="João da Silva"
              className={cn(errors.name?.message && "border-red-500")}
              {...register("name")}
            />
            <p className="text-sm text-red-500 min-h-[20px]">
              {errors.name?.message || " "}
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor={emailId}>E-mail</Label>
            <Input
              id={emailId}
              type="email"
              placeholder="seu.melhor.email@exemplo.com"
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
                placeholder={!isToSeePassword ? "••••••••" : "Senha"}
                className={cn(errors.password?.message && "border-red-500")}
                {...register("password")}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={() => setIsToSeePassword(!isToSeePassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {isToSeePassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </Button>
            </div>
            <p className="text-sm text-red-500 min-h-[20px]">
              {errors.password?.message || " "}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor={passwordId}>Confirmar senha</Label>
            <div className="relative">
              <Input
                id={passwordId}
                type={isToSeePassword ? "text" : "password"}
                placeholder={!isToSeePassword ? "••••••••" : "Senha"}
                className={cn(hasPasswordError && "border-red-500")}
                {...register("confirmPassword")}
              />
              <Button
                type="button"
                onClick={() => setIsToSeePassword(!isToSeePassword)}
                variant="ghost"
                size="icon-sm"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {isToSeePassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </Button>
            </div>
            <p className="text-sm text-red-500 min-h-[20px]">
              {hasPasswordError || " "}
            </p>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full bg-gray-900 py-4! hover:bg-blue-950 transition-all duration-200 cursor-pointer"
            disabled={isPending}
          >
            {isPending ? <Elipses>Criando</Elipses> : "Criar conta"}
          </Button>
        </form>

        <div className="w-full flex items-center justify-center">
          <NavigateButton to={"/auth/sign-in"} iconStart={ArrowLeft}>
            Voltar para login
          </NavigateButton>
        </div>
      </CardContent>
    </Card>
  );
};
