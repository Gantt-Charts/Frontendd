import { useCallback, useContext, useEffect, useState } from "react";
import { getRouteChartDetails } from "@/shared/const/routes";
import { Button } from "@/shared/ui/button/Button";
import { AppLink } from "@/shared/ui/appLink/AppLink";
import { ChartCard } from "@/entities/chartCard";
import { AddChartModal } from "@/features/addChartModal";
import { Page } from "@/widget/page";
import { AuthDataContext } from "@/app/providers/AuthProvider";
import { addCharts, getCharts } from "../model/services/charts";
import styles from "./ChartsPage.module.sass";

export const ChartsPage = () => {
	const [charts, setCharts] = useState([]);
	const [isChartModal, setIsChartModal] = useState(false);
	const { authData } = useContext(AuthDataContext);

	const onClose = () => {
		setIsChartModal(false);
	};

	const onShow = () => {
		setIsChartModal(true);
	};

	const onAddCharts = useCallback(
		async (value) => {
			const data = await addCharts({ authData, value });

			if (!data) return;

			setCharts((prevData) => [...prevData, data]);
			onClose();
		},
		[authData]
	);

	useEffect(() => {
		const getData = async () => {
			const data = await getCharts({ authData });

			if (!data) return;

			setCharts(data);
		};

		getData();
	}, [authData]);

	return (
		<Page className={styles.chartsPage}>
			<div className={styles.header}>
				<h2 className={styles.username}>{authData}</h2>
				<div className={styles.actionBtn}>
					<Button onClick={onShow}>Добавить</Button>
				</div>
			</div>

			<div className={styles.chartsList}>
				{charts.map((chartCard) => (
					<AppLink key={chartCard.id} href={getRouteChartDetails(chartCard.id)}>
						<ChartCard title={chartCard.name} description={chartCard.description} />
					</AppLink>
				))}
			</div>

			{isChartModal && <AddChartModal isOpen={isChartModal} onClose={onClose} onChange={onAddCharts} />}
		</Page>
	);
};
