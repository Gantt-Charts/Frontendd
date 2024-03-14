import { useCallback } from "react";
import { deleteTask, postTask, putTask } from "../../model/services/tasks";
import { chartPageActions } from "../../model/slices/chartPageSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllTasks } from "../../model/selectors/chartPageSelectors";

export const useTaskChange = () => {
	const tasks = useSelector(getAllTasks);
	const { id, username } = useParams();
	const dispatch = useDispatch();

	const onAddTask = useCallback(
		async (value, onClose) => {
			const dataValue = {
				...value,
				project: id,
			};

			const data = await postTask({ username, id, value: dataValue });

			if (!data) return;

			dispatch(chartPageActions.addTasks(data));
			onClose();
		},
		[username, id, dispatch]
	);

	const onEditTask = useCallback(
		async (value, onClose) => {
			const dataValue = {
				...value,
				project: id,
			};

			const data = await putTask({ username, id, selectTaskId: dataValue.id, value: dataValue });

			if (!data) return;

			dispatch(chartPageActions.editTasks(data));
			onClose();
		},
		[id, username, dispatch]
	);

	const onDeleteTask = useCallback(
		async (selectTaskId) => {
			if (!selectTaskId) return;
			const data = await deleteTask({ username, id, selectTaskId });

			if (!data) return;

			dispatch(chartPageActions.removeTasks(data));
		},
		[username, id, dispatch]
	);

	return {
		idForParams: id,
		usernameForParams: username,
		tasks,
		onAddTask,
		onEditTask,
		onDeleteTask,
	};
};
