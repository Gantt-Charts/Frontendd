import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/shared/ui/button/Button";
import { ChartDetails } from "@/entities/chartDetails";
import { Page } from "@/widget/page";
import { AddChartDetailsModal } from "@/features/addChartDetailsModal";
import { AuthDataContext } from "@/app/providers/AuthProvider";
import styles from "./ChartPage.module.sass";
import { addTask, deleteTask, editTask, getTask } from "../model/services/chart";

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
		},

		[authData, id]
	);

	const onEditTask = useCallback(
		async (value) => {
			console.log(selectTask?.id);

			const dataValue = {
				...value,
				project: id,
			};

			const data = await editTask({ authData, id, selectTaskId: selectTask.id, value: dataValue });

			if (!data) return;

			setData((prevData) => prevData.map((prev) => (prev.id === data.id ? { ...prev, ...data } : prev)));
		},
		[authData, id, selectTask.id]
	);

	const onDeleteTask = useCallback(async () => {
		if (!selectTask.id) return;
		const data = await deleteTask({ authData, id, selectTaskId: selectTask.id });

		if (!data) return;

		//Заменить на data.id
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

	const dataIsNotEmpty = data.length > 0;

	return (
		<Page className={styles.chartPage}>
			<div className={styles.header}>
				<h2 className={styles.username}>{authData}</h2>
				<div className={styles.actionBtn}>
					<Button onClick={onShow}>Добавить</Button>
					<Button onClick={onEdit}>Редактировать</Button>
					<Button onClick={onDeleteTask}>Удалить</Button>
				</div>
			</div>

			{dataIsNotEmpty ? <ChartDetails data={data} onSelect={onSelect} /> : null}
			{isChartDetailsModal && (
				<AddChartDetailsModal
					firstTask={!dataIsNotEmpty}
					tasks={data}
					isOpen={isChartDetailsModal}
					onClose={onClose}
					onChange={isEdit ? onEditTask : onAddTask}
					selectTask={isEdit && selectTask}
					isEdit={isEdit}
				/>
			)}
		</Page>
	);
};
