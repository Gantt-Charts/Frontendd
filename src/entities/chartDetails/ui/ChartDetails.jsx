import { Gantt } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import styles from "./ChartDetails.module.sass";
import { useEffect, useState } from "react";
import axios from "axios";

const currentDate = new Date();
const tasks = [
	{
		start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
		end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
		name: "Some Project",
		id: "ProjectSample",
		progress: 0,
		type: "project",
		hideChildren: false,
	},
	{
		start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
		end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 2, 12, 28),
		name: "Idea",
		id: "Task 0",
		progress: 45,
		type: "task",
		project: "ProjectSample",
		styles: { progressColor: "#ffbb54", progressSelectedColor: "#ff9e0d" },
	},
	{
		start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 2),
		end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4, 0, 0),
		name: "Research",
		id: "Task 1",
		progress: 25,
		dependencies: ["Task 0"],
		type: "task",
		project: "ProjectSample",
		styles: { progressColor: "#ffbb54", progressSelectedColor: "#ff9e0d" },
	},
	{
		start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4),
		end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8, 0, 0),
		name: "Discussion with team",
		id: "Task 2",
		progress: 10,
		// dependencies: ["Task 1"],
		type: "task",
		project: "ProjectSample",
		styles: { progressColor: "#ffbb54", progressSelectedColor: "#ff9e0d" },
	},
	{
		start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
		end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 9, 0, 0),
		name: "Developing",
		id: "Task 3",
		progress: 2,
		// dependencies: ["Task 2"],
		type: "task",
		project: "ProjectSample",
	},
	{
		start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
		end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10),
		name: "Review",
		id: "Task 4",
		type: "task",
		progress: 70,
		// dependencies: ["Task 2"],
		project: "ProjectSample",
		isDisabled: false,
	},
	{
		start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10),
		end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 12),
		name: "Release",
		id: "Task 6",
		progress: currentDate.getMonth(),
		type: "task",
		// dependencies: ["Task 4"],
		project: "ProjectSample",
	},
	{
		start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 12),
		end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 13),
		name: "Party Time",
		id: "Task 9",
		progress: 20,
		isDisabled: true,
		type: "task",
		project: "ProjectSample",
	},
];
const tasks1 = [
	{
		start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
		end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
		name: "Project",
		id: "ProjectSample",
		progress: 0,
		type: "project",
		hideChildren: false,
	},
	{
		start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
		end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 3, 12, 28),
		name: "Idea",
		id: "Task 0",
		progress: 45,
		type: "task",
		project: "ProjectSample",
		styles: { progressColor: "#ffbb54", progressSelectedColor: "#ff9e0d" },
	},
	{
		start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 2),
		end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 5, 0, 0),
		name: "Research",
		id: "Task 1",
		progress: 25,
		// dependencies: ["Task 0"],
		type: "task",
		project: "ProjectSample",
		styles: { progressColor: "#ffbb54", progressSelectedColor: "#ff9e0d" },
	},
	{
		start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4),
		end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 7, 0, 0),
		name: "Discussion with team",
		id: "Task 2",
		progress: 10,
		dependencies: ["Task 1"],
		type: "task",
		project: "ProjectSample",
		styles: { progressColor: "#ffbb54", progressSelectedColor: "#ff9e0d" },
	},
	{
		start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
		end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 11, 0, 0),
		name: "Developing",
		id: "Task 3",
		progress: 2,
		// dependencies: ["Task 2"],
		type: "task",
		project: "ProjectSample",
	},
	{
		start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
		end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10),
		name: "Review",
		id: "Task 4",
		type: "task",
		progress: 70,
		dependencies: ["Task 2"],
		project: "ProjectSample",
		isDisabled: false,
	},
	{
		start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10),
		end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 13),
		name: "Release",
		id: "Task 6",
		progress: currentDate.getMonth(),
		type: "task",
		dependencies: ["Task 4"],
		project: "ProjectSample",
	},
	{
		start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 14),
		end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
		name: "Party Time",
		id: "Task 9",
		progress: 20,
		isDisabled: true,
		type: "task",
		project: "ProjectSample",
	},
];

const chartCards = [
	{
		id: "1",
		title: "Диаграмма судьбы",
		description: "Описание",
		task: tasks,
	},
	{
		id: "2",
		title: "Диаграмма друзей",
		description: "Описание",
		task: tasks1,
	},
	{
		id: "3",
		title: "Диаграмма учебы",
		description: "Описание",
		task: tasks,
	},
	{
		id: "4",
		title: "Название диаграммы",
		description: "Описание",
		task: tasks1,
	},
	{
		id: "5",
		title: "Диграмма ганта",
		description: "Описание",
		task: tasks,
	},
	{
		id: "6",
		title: "Диграмма Алексея",
		description: "Что то прикольное",
		task: tasks1,
	},
];

export const ChartDetails = ({ id }) => {
	// const [data, setData] = useState([]);

	// useEffect(() => {
	// 	axios.get(`http://26.146.72.207:8000/gantt/projects/${id}/tasks/`).then((res) => {
	// 		const data = res.data.map((data) => {
	// 			const result = {
	// 				...data,
	// 				start: new Date(data.start),
	// 				end: new Date(data.end),
	// 			};
	// 			return result;
	// 		});

	// 		return setData(data);
	// 	});
	// }, [id]);

	const chart = chartCards.find((chart) => {
		return chart.id === id;
	});

	// if (!data.length > 0) return;

	return (
		<div className={styles.chartDetails}>
			<h3 className={styles.title}>{chart.title}</h3>
			<Gantt tasks={tasks} onDateChange={() => {}} onProgressChange={() => {}} />
		</div>
	);
};
