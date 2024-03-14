import { useEffect, useState } from "react";
import { getRouteChartDetails } from "@/shared/const/routes";
import { Button } from "@/shared/ui/button/Button";
import { AppLink } from "@/shared/ui/appLink/AppLink";
import { ChartCard } from "@/entities/chartCard";
import { Page } from "@/widget/page";
import styles from "./ChartsPage.module.sass";
import { useParams } from "react-router-dom";
import { getCharts } from "@/entities/charts/model/services/charts";
import { useDispatch, useSelector } from "react-redux";
import { getAllCharts } from "@/entities/charts/model/selectors/chartsSelector";
import { chartsActions } from "@/entities/charts/model/slices/chartsSlice";
import { AddChartModal } from "@/features/modificationChart";

export const ChartsPage = () => {
	const [isChartModal, setIsChartModal] = useState(false);
	const { username } = useParams();
	const charts = useSelector(getAllCharts);
	const dispatch = useDispatch();

	const onClose = () => {
		setIsChartModal(false);
	};

	const onShow = () => {
		setIsChartModal(true);
	};

	useEffect(() => {
		const getData = async () => {
			const data = await getCharts({ username });

			if (!data) return;

			dispatch(chartsActions.initCharts(data));
		};

		getData();
	}, [dispatch, username]);

	return (
		<Page className={styles.chartsPage}>
			<div className={styles.header}>
				<h2 className={styles.username}>{username}</h2>
				<div className={styles.actionBtn}>
					<Button onClick={onShow}>Добавить</Button>
				</div>
			</div>

			<div className={styles.chartsList}>
				{charts.map((chartCard) => (
					<AppLink key={chartCard.id} href={getRouteChartDetails(username, chartCard.id)}>
						<ChartCard title={chartCard.name} description={chartCard.description} />
					</AppLink>
				))}
			</div>

			{isChartModal && <AddChartModal isOpen={isChartModal} onClose={onClose} />}
		</Page>
	);
};
