import { Gantt } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import styles from "./ChartDetails.module.sass";
import { useMemo } from "react";
import { useTaskChange } from "@/pages/chartPage/lib/hooks/useTaskChange";

export const ChartDetails = ({ tasks, onSelect }) => {
	const { onEditTask } = useTaskChange();

	const convertData = (task) => ({
		...task,
		start: new Date(task.start),
		end: new Date(task.end),
	});

	const dataSelected = (value) => {
		const formattedDateStart = value.start.toISOString().split("T")[0];
		const formattedDateEnd = value.end.toISOString().split("T")[0];

		return {
			id: value.id,
			name: value.name,
			type: value.type,
			start: formattedDateStart,
			end: formattedDateEnd,
			progress: value.progress,
			dependencies: value.dependencies,
			isDisabled: value.isDisabled,
		};
	};

	const onSelectChangeTask = (value) => {
		onSelectTask(value);

		onEditTask(dataSelected(value), () => {});
	};

	const onSelectTask = (value) => {
		onSelect(dataSelected(value));
	};

	const tasksFormatedDate = useMemo(() => tasks.map((task) => convertData(task)), [tasks]);

	return (
		<div className={styles.chartDetails}>
			<Gantt
				tasks={tasksFormatedDate}
				onDateChange={onSelectChangeTask}
				onSelect={onSelectTask}
				onProgressChange={onSelectChangeTask}
			/>
		</div>
	);
};
