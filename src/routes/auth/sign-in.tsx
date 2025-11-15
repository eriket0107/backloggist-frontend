import { SignInForm } from "@/components/SignForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/sign-in")({
  component: SignInForm,
});
