import { $api } from "@/shared/api/api";
import { USER_LOCALSTORAGE_TOKEN } from "@/shared/const/localstorage";

export const initAuthData = async () => {
	const authStorageToken = localStorage.getItem(USER_LOCALSTORAGE_TOKEN);

	if (!authStorageToken) return;

	try {
		const user = await $api.get(`/login/${authStorageToken}`);

		return user.data;
	} catch (error) {
		console.log(error);

		return null;
	}
};
