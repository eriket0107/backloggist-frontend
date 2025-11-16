import axios from "axios";

const axiosInstance = axios.create({
	withCredentials: true,
	baseURL: import.meta.env.VITE_BASE_URL,
});

const DELAY = Number(import.meta.env.VITE_DELAY)

if (!!DELAY && DELAY > 0 && import.meta.env.VITE_NODE_ENV === 'development') {
	axiosInstance.interceptors.request.use(async (config) => {
		await new Promise((resolve) => setTimeout(resolve, Math.floor(DELAY * Math.random())));
		return config;
	});
}

export const api = axiosInstance;
