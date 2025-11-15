import { SignUpForm } from "@/components/SignUpForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/sign-up")({
  component: SignUpForm,
});
