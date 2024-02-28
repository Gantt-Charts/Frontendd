import { Button } from "@/shared/ui/button/Button";
import styles from "./ChartsPage.module.sass";
import { AppLink } from "@/shared/ui/appLink/AppLink";
import { ChartCard } from "@/entities/chartCard";
import { useEffect, useState } from "react";
import { AddChartModal } from "@/features/addChartModal";
import axios from "axios";

const chartCards = [
	{
		id: "1",
		name: "Диаграмма судьбы",
		description: "Описание",
	},
	{
		id: "2",
		name: "Диаграмма друзей",
		description: "Описание",
	},
	{
		id: "3",
		name: "Диаграмма учебы",
		description: "Описание",
	},
	{
		id: "4",
		name: "Название диаграммы",
		description: "Описание",
	},
	{
		id: "5",
		name: "Название диаграммы",
		description: "Описание",
	},
];

export const ChartsPage = () => {
	// const [data, setData] = useState([]);
	const [isChartModal, setIsChartModal] = useState(false);

	// useEffect(() => {
	// 	axios.get("http://26.146.72.207:8000/gantt/projects/").then((res) => {
	// 		console.log(res.data);
	// 		return setData(res.data);
	// 	});
	// }, []);

	const onClose = () => {
		setIsChartModal(false);
	};

	const onShow = () => {
		setIsChartModal(true);
	};
	return (
		<main className={styles.chartsPage}>
			<div className={styles.header}>
				<h2 className={styles.username}>User name</h2>
				<div className={styles.actionBtn}>
					<Button onClick={onShow}>Добавить</Button>
				</div>
			</div>

			<div className={styles.chartsList}>
				{chartCards.map((chartCard) => (
					<AppLink key={chartCard.id} href={`/charts/${chartCard.id}`}>
						<ChartCard title={chartCard.name} description={chartCard.description} />
					</AppLink>
				))}
			</div>

			{isChartModal && <AddChartModal isOpen={isChartModal} onClose={onClose} charts={chartCards} />}
		</main>
	);
};
