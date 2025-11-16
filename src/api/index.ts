import axios from "axios";

const axiosInstance = axios.create({
	withCredentials: true,
	baseURL: import.meta.env.VITE_BASE_URL,
});

const DELAY = Number(import.meta.env.VITE_DELAY) * 3

if (DELAY > 0 && import.meta.env.VITE_NODE_ENV === 'development') {
	axiosInstance.interceptors.request.use(async (config) => {
		const delay = Math.floor(Math.random() * DELAY);
		console.log('PROMISE DELAY:', delay)
		await new Promise((resolve) => setTimeout(resolve, delay));
		return config;
	});
}

export const api = axiosInstance;
