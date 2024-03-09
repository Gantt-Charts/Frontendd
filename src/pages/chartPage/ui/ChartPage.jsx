import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/shared/ui/button/Button";
import { ChartDetails } from "@/entities/chartDetails";
import { Page } from "@/widget/page";
import styles from "./ChartPage.module.sass";
import { $api } from "@/shared/api/api";
import { AddChartDetailsModal } from "@/features/addChartDetailsModal";
import { AuthDataContext } from "@/app/providers/AuthProvider";

export const ChartPage = () => {
	const { id } = useParams();
	const [data, setData] = useState([]);
	const [isChartDetailsModal, setIsChartDetailsModal] = useState(false);
	const { authData } = useContext(AuthDataContext);
	const [selectTask, setSelectTask] = useState({});
	const [isEdit, setIsEdit] = useState(false);

	useEffect(() => {
		$api
			.get(`/projects/${authData}/${id}/tasks/`)
			.then((res) => {
				const data = res.data.map((data) => {
					const result = {
						...data,
						start: new Date(data.start),
						end: new Date(data.end),
					};
					return result;
				});

				return setData(data);
			});
	}, [authData, id]);

	const onClose = () => {
		setIsChartDetailsModal(false);
		setIsEdit(false);
	};

	const onShow = () => {
		setIsChartDetailsModal(true);
	};

	const onEdit = () => {
		setIsEdit(true);
		onShow();
	};

	const onAddChange = (value) => {
		const dataValue = {
			...value,
			project: id,
		};


		$api
			.post(`/projects/${authData}/${id}/tasks/`, dataValue)
			.then((res) => {
				const newData = {
					...res.data,
					start: new Date(res.data.start),
					end: new Date(res.data.end),
				};
				setData((prevData) => [...prevData, newData]);
			});
	};

	const onEditChange = (value) => {
		const dataValue = {
			...value,
			project: id,
		};


		$api
			.put(`/projects/${authData}/${id}/tasks/${selectTask.id}/`, dataValue)
			.then((res) => {
				console.log(res.data);
				const newData = {
					...res.data,
					start: new Date(res.data.start),
					end: new Date(res.data.end),
				};
				// setData((prevData) => [...prevData, newData]);
			});
	};

	const onSelect = (value) => {
		setSelectTask(value);
	};

	const onDelete = () => {
		$api
			.delete(`/projects/${authData}/${id}/tasks/${selectTask.id}`)
			.then(() => {
				setData(data.filter((item) => item.id !== selectTask.id));
			});
	};

	const dataIsNotEmpty = data.length > 0;

	return (
		<Page className={styles.chartPage}>
			<div className={styles.header}>
				<h2 className={styles.username}>{authData}</h2>
				<div className={styles.actionBtn}>
					<Button onClick={onShow}>Добавить</Button>
					<Button onClick={onEdit}>Редактировать</Button>
					<Button onClick={onDelete}>Удалить</Button>
				</div>
			</div>

			{dataIsNotEmpty ? <ChartDetails data={data} onSelect={onSelect} /> : null}
			{isChartDetailsModal && (
				<AddChartDetailsModal
					firstTask={!dataIsNotEmpty}
					tasks={data}
					isOpen={isChartDetailsModal}
					onClose={onClose}
					onChange={isEdit ? onEditChange : onAddChange}
					selectTask={isEdit && selectTask}
				/>
			)}
		</Page>
	);
};
