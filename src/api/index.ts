import axios, { type AxiosError } from "axios";

const api = axios.create({
	withCredentials: true,
	baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.response.use(
	(response) => response,
	(error: AxiosError) => {
		if (error.response?.status === 401) {
			window.location.href = "/login";
			return Promise.reject(error);
		}
	},
);

export { api };
