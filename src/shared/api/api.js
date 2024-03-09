import axios from "axios";
import { USER_LOCALSTORAGE_TOKEN } from "../const/localstorage";

export const $api = axios.create({
	baseURL: __API__,
});

$api.interceptors.request.use((config) => {
	const token = localStorage.getItem(USER_LOCALSTORAGE_TOKEN);

	if (config.headers) {
		config.headers.Authorization = token ? `Token ${token}` : "";
	}

	return config;
});
