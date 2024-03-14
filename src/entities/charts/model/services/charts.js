import { $api } from "@/shared/api/api";

const getCharts = async ({ username }) => {
	try {
		const response = await $api.get(`/projects/${username}/`);

		return response.data;
	} catch (error) {
		console.log(error);

		return null;
	}
};

const postCharts = async ({ username, value }) => {
	try {
		const response = await $api.post(`/projects/${username}/`, value);

		return response.data;
	} catch (error) {
		console.log(error);

		return null;
	}
};

const putCharts = async ({ chartId, username, value }) => {
	try {
		const response = await $api.put(`/projects/${username}/${chartId}/`, value);

		return response.data;
	} catch (error) {
		console.log(error);

		return null;
	}
};

const deleteCharts = async ({ chartId, username }) => {
	try {
		const response = await $api.delete(`/projects/${username}/${chartId}/`);

		return response.data || chartId;
	} catch (error) {
		console.log(error);

		return null;
	}
};

export { getCharts, postCharts, putCharts, deleteCharts };
