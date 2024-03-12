import { $api } from "@/shared/api/api";

const editChart = async ({ chartId, authData, value }) => {
	try {
		const response = await $api.put(`/projects/${authData}/${chartId}`, value);
    
		return response.data;
	} catch (error) {
		console.log(error);

		return null;
	}
};

const deleteChart = async ({ chartId, authData }) => {
	try {
		const response = await $api.delete(`/projects/${authData}/${chartId}`);
    
		return response.data || chartId;
	} catch (error) {
		console.log(error);

		return null;
	}
};

export { editChart, deleteChart };
