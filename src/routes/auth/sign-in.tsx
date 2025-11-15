import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { SignInForm } from "@/components/SignInForm";

const loginSearchSchema = z.object({
  expired: z.boolean().optional(),
});

export const Route = createFileRoute("/auth/sign-in")({
  validateSearch: loginSearchSchema,
  component: SignInForm,
});
