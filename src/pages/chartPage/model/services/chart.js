import { $api } from "@/shared/api/api";

const convertData = (data) => ({
	...data,
	start: new Date(data.start),
	end: new Date(data.end),
});

const getTask = async ({ authData, id }) => {
	try {
		const response = await $api.get(`/projects/${authData}/${id}/tasks/`);

		const data = response.data.map((data) => convertData(data));

		return data;
	} catch (error) {
		console.log(error);

		return null;
	}
};

const addTask = async ({ authData, id, value }) => {
	try {
		const response = await $api.post(`/projects/${authData}/${id}/tasks/`, value);

		const data = convertData(response.data);

		return data;
	} catch (error) {
		console.log(error);

		return null;
	}
};

const editTask = async ({ authData, id, selectTaskId, value }) => {
	try {
		const response = await $api.put(`/projects/${authData}/${id}/tasks/${selectTaskId}/`, value);

		const data = convertData(response.data);

		return data;
	} catch (error) {
		console.log(error);

		return null;
	}
};

const deleteTask = async ({ authData, id, selectTaskId }) => {
	try {
		const response = await $api.delete(`/projects/${authData}/${id}/tasks/${selectTaskId}`);

		return response.data || selectTaskId;
	} catch (error) {
		console.log(error);

		return null;
	}
};

export { getTask, addTask, editTask, deleteTask };
