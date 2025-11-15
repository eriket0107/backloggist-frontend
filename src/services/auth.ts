import { api } from "@/api";
import type { LoginVariables } from "@/types/common";
import type { Session } from "@/types/entities";
import { errorHandler } from "@/utils/error-handler";

const signOut = async () => {
	try {
		const result = await api.post("/auth/logout");

		return result.data;
	} catch (error) {
		throw errorHandler(error);
	}
};

const signIn = async ({
	email,
	password,
}: LoginVariables): Promise<string> => {
	try {
		const result = await api.post<string>("/auth/login", {
			email,
			password,
		});

		return result.data;
	} catch (error) {
		throw errorHandler(error);
	}
};

const session = async () => {
	try {
		const result = await api.get<Session>("/auth/profile");

		return result.data;
	} catch (error) {
		throw errorHandler(error);
	}
};


export const authService = {
	signIn,
	signOut,
	session
}