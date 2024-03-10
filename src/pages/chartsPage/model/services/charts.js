import { $api } from "@/shared/api/api";

const getCharts = async ({ authData }) => {
	try {
		const response = await $api.get(`/projects/${authData}/`);

		return response.data;
	} catch (error) {
		console.log(error);

		return null;
	}
};

const addCharts = async ({ authData, value }) => {
	try {
		const response = await $api.post(`/projects/${authData}/`, value);

		return response.data;
	} catch (error) {
		console.log(error);

		return null;
	}
};

export { getCharts, addCharts };
