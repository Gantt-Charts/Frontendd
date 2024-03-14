import { useCallback, useEffect, useState } from "react";
import { Button } from "@/shared/ui/button/Button";
import { ChartDetails } from "@/entities/chartDetails";
import { Page } from "@/widget/page";
import { useTaskChange } from "../lib/hooks/useTaskChange";
import { useDispatch } from "react-redux";
import { chartPageActions } from "../model/slices/chartPageSlice";
import { getTask } from "../model/services/tasks";
import styles from "./ChartPage.module.sass";
import { EditDeleteChartForm } from "@/features/modificationChart";
import { ModificationTaskModal } from "@/features/modificationTaskModal";

export const ChartPage = () => {
	const [isChartDetailsModal, setIsChartDetailsModal] = useState(false);
	const [selectTask, setSelectTask] = useState({});
	const [isEdit, setIsEdit] = useState(false);
	const { idForParams, usernameForParams, tasks, onDeleteTask } = useTaskChange();
	const dispatch = useDispatch();

	const onSelect = (value) => {
		setSelectTask(value);
	};
	const onAdd = () => {
		setIsEdit(false);
		setIsChartDetailsModal(true);
	};

	const onEdit = () => {
		if (!selectTask.id) return;

		setIsEdit(true);
		setIsChartDetailsModal(true);
	};

	const onDelete = useCallback(async () => {
		onDeleteTask(selectTask.id);
	}, [onDeleteTask, selectTask.id]);

	const onClose = () => {
		setIsChartDetailsModal(false);
	};

	useEffect(() => {
		const getData = async () => {
			const data = await getTask({ username: usernameForParams, id: idForParams });

			if (!data) return;

			dispatch(chartPageActions.initTasks(data));
		};
		getData();

		return () => {
			dispatch(chartPageActions.initTasks([]));
		};
	}, [dispatch, usernameForParams, idForParams]);

	const dataIsEmpty = !!tasks.length;
	const labelText = isEdit ? "Форма редактирования задачи" : "Форма добавления задачи";
	const btnText = isEdit ? "Редактировать" : "Добавить";

	return (
		<Page className={styles.chartPage}>
			<EditDeleteChartForm id={idForParams} username={usernameForParams} />
			<div className={styles.tasks}>
				<div className={styles.header}>
					<h2 className={styles.username}>{usernameForParams}</h2>
					<div className={styles.actionBtn}>
						<Button onClick={onAdd}>Добавить</Button>
						<Button onClick={onEdit}>Редактировать</Button>
						<Button onClick={onDelete}>Удалить</Button>
					</div>
				</div>

				{dataIsEmpty ? <ChartDetails tasks={tasks} onSelect={onSelect} /> : null}
				{isChartDetailsModal && (
					<ModificationTaskModal
						firstTask={!dataIsEmpty}
						isOpen={isChartDetailsModal}
						isEdit={isEdit}
						onClose={onClose}
						selectTask={isEdit && selectTask}
						label={labelText}
						btnText={btnText}
					/>
				)}
			</div>
		</Page>
	);
};
