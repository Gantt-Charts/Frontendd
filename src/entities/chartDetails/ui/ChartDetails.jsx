import { Gantt } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import styles from "./ChartDetails.module.sass";

export const ChartDetails = ({ data, onSelect }) => {
	return (
		<div className={styles.chartDetails}>
			<h3 className={styles.title}>{data[0].project_name}</h3>
			<Gantt tasks={data} onDateChange={() => {}} onSelect={onSelect} onProgressChange={() => {}} />
		</div>
	);
};
