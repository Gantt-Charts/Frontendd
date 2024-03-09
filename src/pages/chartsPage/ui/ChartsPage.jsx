import { useContext, useEffect, useState } from "react";
import { $api } from "@/shared/api/api";
import { getRouteChartDetails } from "@/shared/const/routes";
import { Button } from "@/shared/ui/button/Button";
import { AppLink } from "@/shared/ui/appLink/AppLink";
import { ChartCard } from "@/entities/chartCard";
import { AddChartModal } from "@/features/addChartModal";
import { Page } from "@/widget/page";
import styles from "./ChartsPage.module.sass";
import { AuthDataContext } from "@/app/providers/AuthProvider";

export const ChartsPage = () => {
	const [data, setData] = useState([]);
	const [isChartModal, setIsChartModal] = useState(false);
	const { authData } = useContext(AuthDataContext);

	useEffect(() => {
		$api
			.get(`/projects/${authData}/`)
			.then((res) => {
				return setData(res.data);
			})
			.catch((e) => {
				console.log(e);
			});
	}, [authData]);

	const onClose = () => {
		setIsChartModal(false);
	};

	const onShow = () => {
		setIsChartModal(true);
	};

	const onChange = (value) => {
		$api.post(`$/projects/${authData}/`, value).then((res) => {
			setData((prevData) => [...prevData, res.data]);
		});
	};

	return (
		<Page className={styles.chartsPage}>
			<div className={styles.header}>
				<h2 className={styles.username}>{authData}</h2>
				<div className={styles.actionBtn}>
					<Button onClick={onShow}>Добавить</Button>
				</div>
			</div>

			<div className={styles.chartsList}>
				{data.map((chartCard) => (
					<AppLink key={chartCard.id} href={getRouteChartDetails(chartCard.id)}>
						<ChartCard title={chartCard.name} description={chartCard.description} />
					</AppLink>
				))}
			</div>

			{isChartModal && <AddChartModal isOpen={isChartModal} onClose={onClose} onChange={onChange} />}
		</Page>
	);
};
