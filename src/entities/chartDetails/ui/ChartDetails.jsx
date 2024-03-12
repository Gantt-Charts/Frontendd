import { Gantt } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import styles from "./ChartDetails.module.sass";

export const ChartDetails = ({ data, onSelect, onChange }) => {
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
		onChange(dataSelected(value));
	};

	const onSelectTask = (value) => {
		onSelect(dataSelected(value));
	};

	return (
		<div className={styles.chartDetails}>
			<Gantt tasks={data} onDateChange={onSelectChangeTask} onSelect={onSelectTask} onProgressChange={onSelectChangeTask} />
		</div>
	);
};
