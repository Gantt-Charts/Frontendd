import { useParams } from "react-router-dom";
import styles from "./ChartPage.module.sass";
import { ChartDetails } from "@/entities/chartDetails";
import { Button } from "@/shared/ui/button/Button";

export const ChartPage = () => {
	const { id } = useParams();

	return (
		<main className={styles.chartPage}>
			<div className={styles.header}>
				<h2 className={styles.username}>User name</h2>
				<div className={styles.actionBtn}>
					<Button>Редактировать</Button>
					<Button>Удалить</Button>
				</div>
			</div>

			<ChartDetails id={id} />
		</main>
	);
};
