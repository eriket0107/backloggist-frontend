import { AxiosError, type AxiosResponse } from "axios";
import { api } from "@/api";
import type { Session } from "@/types/entities";

export const logoutService = async () => {
	try {
		const result = await api.post("/auth/logout");

		return result.data;
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.message);
		}
		throw error;
	}
};

export const loginService = async ({
	email,
	password,
}: {
	email: string;
	password: string;
}): Promise<AxiosResponse> => {
	try {
		const result = await api.post<Promise<string>>("/auth/login", {
			email,
			password,
		});

		return result;
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.message);
		}
		throw error;
	}
};

export const sessionService = async () => {
	try {
		const result = await api.get<Promise<Session>>("/auth/profile");

		return result.data;
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.message);
		}
		throw error;
	}
};
