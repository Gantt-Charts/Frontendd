import { useParams } from "react-router-dom";
import styles from "./ChartPage.module.sass";
import { ChartDetails } from "@/entities/chartDetails";
import { Button } from "@/shared/ui/button/Button";
import axios from "axios";
import { USER_LOCALSTORAGE_TOKEN } from "@/shared/const/localstorage";
import { useContext, useEffect, useState } from "react";
import { AddChartDetailsModal } from "@/features/addChartDetailsModal/ui/AddChartDetailsModal";
import { AuthDataContext } from "@/app/App";

export const ChartPage = () => {
	const { id } = useParams();
	const [data, setData] = useState([]);
	const [isChartDetailsModal, setIsChartDetailsModal] = useState(false);
	const authStorageToken = localStorage.getItem(USER_LOCALSTORAGE_TOKEN);
	const { authData } = useContext(AuthDataContext);
	const [selectTask, setSelectTask] = useState({});
	const [isEdit, setIsEdit] = useState(false);

	useEffect(() => {
		axios
			.get(`http://26.146.72.207:8000/projects/${authData}/${id}/tasks/`, {
				headers: {
					Authorization: `Token ${authStorageToken}`,
				},
			})
			.then((res) => {
				console.log(res.data);
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
	}, [authData, authStorageToken, id]);

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

		console.log(dataValue);

		axios
			.post(`http://26.146.72.207:8000/projects/${authData}/${id}/tasks/`, dataValue, {
				headers: {
					Authorization: `Token ${authStorageToken}`,
				},
			})
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

		console.log(dataValue);

		axios
			.put(`http://26.146.72.207:8000/projects/${authData}/${id}/tasks/${selectTask.id}/`, dataValue, {
				headers: {
					Authorization: `Token ${authStorageToken}`,
				},
			})
			.then((res) => {
				console.log(res.data)
				const newData = {
					...res.data,
					start: new Date(res.data.start),
					end: new Date(res.data.end),
				};
				// setData((prevData) => [...prevData, newData]);
			});
	};

	const onSelect = (value) => {
		console.log(value)
		setSelectTask(value);
	};

	const onDelete = () => {
		axios
			.delete(`http://26.146.72.207:8000/projects/${authData}/${id}/tasks/${selectTask.id}`, {
				headers: {
					Authorization: `Token ${authStorageToken}`,
				},
			})
			.then((res) => {
				console.log(res);
				setData(data.filter((item) => item.id !== selectTask.id));
			});
	};

	const dataIsNotEmpty = data.length > 0;

	return (
		<main className={styles.chartPage}>
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
					selectTask = {isEdit && selectTask}
				/>
			)}
		</main>
	);
};
