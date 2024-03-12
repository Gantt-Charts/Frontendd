import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/shared/ui/button/Button";
import { ChartDetails } from "@/entities/chartDetails";
import { Page } from "@/widget/page";
import { ModificationTaskModal } from "@/features/modificationTaskModal";
import { AuthDataContext } from "@/app/providers/AuthProvider";
import { addTask, deleteTask, editTask, getTask } from "../model/services/tasks";
import styles from "./ChartPage.module.sass";
import { ModificationChart } from "@/features/modificationChart";

export const ChartPage = () => {
	const { id } = useParams();
	const [data, setData] = useState([]);
	const [isChartDetailsModal, setIsChartDetailsModal] = useState(false);
	const { authData } = useContext(AuthDataContext);
	const [selectTask, setSelectTask] = useState({});
	const [isEdit, setIsEdit] = useState(false);

	const onShow = () => {
		setIsChartDetailsModal(true);
	};

	const onEdit = () => {
		if (!selectTask.id) return;

		setIsEdit(true);
		onShow();
	};

	const onSelect = (value) => {
		setSelectTask(value);
	};

	const onDirectChange = (value) => {
		setSelectTask(value);

		onEditTask(value);
	};

	const onClose = () => {
		setIsChartDetailsModal(false);
		setIsEdit(false);
	};

	const onAddTask = useCallback(
		async (value) => {
			const dataValue = {
				...value,
				project: id,
			};

			const data = await addTask({ authData, id, value: dataValue });

			if (!data) return;

			setData((prevData) => [...prevData, data]);
			onClose();
		},
		[authData, id]
	);

	const onEditTask = useCallback(
		async (value) => {
			const dataValue = {
				...value,
				project: id,
			};

			const data = await editTask({ authData, id, selectTaskId: dataValue.id, value: dataValue });

			if (!data) return;

			setData((prevData) => prevData.map((prev) => (prev.id === data.id ? { ...prev, ...data } : prev)));
			onClose();
		},
		[authData, id]
	);

	const onDeleteTask = useCallback(async () => {
		if (!selectTask.id) return;
		const data = await deleteTask({ authData, id, selectTaskId: selectTask.id });

		if (!data) return;

		setData((prev) => prev.filter((item) => item.id !== data));
	}, [authData, id, selectTask.id]);

	useEffect(() => {
		const getData = async () => {
			const data = await getTask({ authData, id });

			if (!data) return;

			setData(data);
		};

		getData();
	}, [authData, id]);

	const dataIsEmpty = data.length;
	const labelText = isEdit ? "Форма редактирования задачи" : "Форма добавления задачи";
	const btnText = isEdit ? "Редактировать" : "Добавить";

	return (
		<Page className={styles.chartPage}>
			<ModificationChart id={id}/>
			<div className={styles.tasks}>
				<div className={styles.header}>
					<h2 className={styles.username}>{authData}</h2>
					<div className={styles.actionBtn}>
						<Button onClick={onShow}>Добавить</Button>
						<Button onClick={onEdit}>Редактировать</Button>
						<Button onClick={onDeleteTask}>Удалить</Button>
					</div>
				</div>

				{dataIsEmpty ? <ChartDetails data={data} onSelect={onSelect} onChange={onDirectChange} /> : null}
				{isChartDetailsModal && (
					<ModificationTaskModal
						firstTask={!dataIsEmpty}
						tasks={data}
						isOpen={isChartDetailsModal}
						onClose={onClose}
						onChange={isEdit ? onEditTask : onAddTask}
						selectTask={isEdit && selectTask}
						label={labelText}
						btnText={btnText}
					/>
				)}
			</div>
		</Page>
	);
};
