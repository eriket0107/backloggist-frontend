import { AxiosError } from "axios";

interface ApiErrorResponse {
  message?: string | string[];
  error?: string;
  statusCode?: number;
}

export const errorHandler = (error: unknown): never => {
  if (error instanceof AxiosError) {
    if (!error.response) {
      throw new Error(
        error.message || "Erro de rede. Por favor, verifique sua conexão.",
      );
    }

    const { response } = error;
    const data = response.data as ApiErrorResponse | undefined;

    let message: string;

    if (data?.message) {
      if (Array.isArray(data.message)) {
        message = data.message.join(", ");
      } else {
        message = data.message;
      }
    } else if (data?.error) {
      message = data.error;
    } else {
      message =
        response.statusText ||
        `Requisição falhou com status ${response.status}`;
    }

    const errorMessage = new Error(message);
    (errorMessage as Error & { statusCode?: number }).statusCode =
      response.status;

    throw errorMessage;
  }

  if (error instanceof Error) {
    throw error;
  }

  throw new Error("Ocorreu um erro desconhecido");
};