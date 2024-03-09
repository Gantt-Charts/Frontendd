import { $api } from "@/shared/api/api";

export const auth = async ({ userName, userPassword, isLogin }) => {
	const path = isLogin ? "/login/" : "/register/";

	try {
		const response = await $api.post(path, {
			username: userName,
			password: userPassword,
		});

		return response.data;
	} catch (error) {
		console.log(error);

		return null;
	}
};
