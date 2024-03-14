import { $api } from "@/shared/api/api";

const getTask = async ({ username, id }) => {
	try {
		const response = await $api.get(`/projects/${username}/${id}/tasks/`);

		return response.data;
	} catch (error) {
		console.log(error);

		return null;
	}
};

const postTask = async ({ username, id, value }) => {
	try {
		const response = await $api.post(`/projects/${username}/${id}/tasks/`, value);

		return response.data;
	} catch (error) {
		console.log(error);

		return null;
	}
};

const putTask = async ({ username, id, selectTaskId, value }) => {
	try {
		const response = await $api.put(`/projects/${username}/${id}/tasks/${selectTaskId}/`, value);

		return response.data;
	} catch (error) {
		console.log(error);

		return null;
	}
};

const deleteTask = async ({ username, id, selectTaskId }) => {
	try {
		const response = await $api.delete(`/projects/${username}/${id}/tasks/${selectTaskId}`);

		return response.data || selectTaskId;
	} catch (error) {
		console.log(error);

		return null;
	}
};

export { getTask, postTask, putTask, deleteTask };
