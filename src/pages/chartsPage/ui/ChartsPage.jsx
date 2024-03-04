import { Button } from "@/shared/ui/button/Button";
import styles from "./ChartsPage.module.sass";
import { AppLink } from "@/shared/ui/appLink/AppLink";
import { ChartCard } from "@/entities/chartCard";
import { useContext, useEffect, useState } from "react";
import { AddChartModal } from "@/features/addChartModal";
import axios from "axios";
import { AuthDataContext } from "@/app/App";
import { USER_LOCALSTORAGE_TOKEN } from "@/shared/const/localstorage";

export const ChartsPage = () => {
	const [data, setData] = useState([]);
	const [isChartModal, setIsChartModal] = useState(false);
	const { authData } = useContext(AuthDataContext);
	const authStorageToken = localStorage.getItem(USER_LOCALSTORAGE_TOKEN);

	useEffect(() => {
		axios
			.get(`http://26.146.72.207:8000/projects/${authData}/`, {
				headers: {
					Authorization: `Token ${authStorageToken}`,
				},
			})
			.then((res) => {
				return setData(res.data);
			})
			.catch((e) => {
				console.log(e);
			});
	}, [authData, authStorageToken]);

	const onClose = () => {
		setIsChartModal(false);
	};

	const onShow = () => {
		setIsChartModal(true);
	};

	const onChange = (value) => {
		axios
			.post(`http://26.146.72.207:8000/projects/${authData}/`, value, {
				headers: {
					Authorization: `Token ${authStorageToken}`,
				},
			})
			.then((res) => {
				setData((prevData) => [...prevData, res.data]);
			});
	};

	return (
		<main className={styles.chartsPage}>
			<div className={styles.header}>
				<h2 className={styles.username}>{authData}</h2>
				<div className={styles.actionBtn}>
					<Button onClick={onShow}>Добавить</Button>
				</div>
			</div>

			<div className={styles.chartsList}>
				{data.map((chartCard) => (
					<AppLink key={chartCard.id} href={`/charts/${chartCard.id}`}>
						<ChartCard title={chartCard.name} description={chartCard.description} />
					</AppLink>
				))}
			</div>

			{isChartModal && <AddChartModal isOpen={isChartModal} onClose={onClose} onChange={onChange} />}
		</main>
	);
};
