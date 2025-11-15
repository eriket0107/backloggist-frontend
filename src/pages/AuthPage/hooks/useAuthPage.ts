import { useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export const useAuthPage = () => {
  const search = useSearch({ strict: false });
  const navigate = useNavigate();
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (search.expired && !hasShownToast.current) {
      toast.warning("Sessão expirada. Por favor, faça o login novamente.");
      hasShownToast.current = true;

      navigate({
        to: "/auth/login",
        replace: true,
      });
    }
  }, [search.expired, navigate]);
};

