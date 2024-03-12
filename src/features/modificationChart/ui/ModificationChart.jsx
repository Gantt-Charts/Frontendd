import cls from "classnames";
import styles from "./ModificationChart.module.sass";
import { useCallback, useContext, useEffect, useState } from "react";
import { getCharts } from "@/pages/chartsPage/model/services/charts";
import { AuthDataContext } from "@/app/providers/AuthProvider";
import { ValidationError } from "@/entities/validationError";
import { validateFields } from "@/shared/lib/helpers/validateFields";
import { Input } from "@/shared/ui/input/Input";
import { Textarea } from "@/shared/ui/textarea/Textarea";
import { Button } from "@/shared/ui/button/Button";
import { deleteChart, editChart } from "../model/services/chart";
import { AppIcon } from "@/shared/ui/appIcon/AppIcon";
import ArrowSVG from "@/shared/assets/icons/arrow.svg";
import { useNavigate } from "react-router-dom";
import { getRouteCharts } from "@/shared/const/routes";

export const ModificationChart = ({ id, className }) => {
	const [chart, setChart] = useState({ name: "", description: "" });
	const [isValidationError, setIsValidationError] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const { authData } = useContext(AuthDataContext);
	const navigate = useNavigate();

	const onToggleAside = () => {
		setIsOpen((prev) => !prev);
	};

	const onChangeName = (value) => {
		setChart((prev) => ({ ...prev, name: value }));
	};

	const onChangeDescription = (value) => {
		setChart((prev) => ({ ...prev, description: value }));
	};

	const onEditClick = useCallback(async () => {
		const isValidate = validateFields([chart.name, chart.description]);

		setIsValidationError(!isValidate);

		if (!isValidate) return;

		const data = await editChart({ chartId: id, authData: authData, value: chart });
		console.log(chart);
		console.log(data);
		if (!data) return;

		setChart((prevData) => prevData.map((prev) => ({ ...prev, ...data })));
	}, [authData, chart, id]);

	const onDeleteClick = useCallback(async () => {
		const data = await deleteChart({ chartId: id, authData: authData });

		if (!data) return;

		setChart();
		navigate(getRouteCharts);
	}, [authData, id, navigate]);

	useEffect(() => {
		const getChart = async () => {
			const data = await getCharts({ authData });

			if (!data) return;
			const selectChart = data.find((chart) => chart.id === Number(id));
			console.log(selectChart);

			setChart({ name: selectChart.name, description: selectChart.description });
		};

		getChart();
	}, [authData, id]);

	return (
		<div className={cls(styles.modificationChart, { [styles.opened]: isOpen }, className)}>
			<h2>Проект</h2>
			<ValidationError isValidationError={isValidationError} text="Заполните все поля!" />
			<div className={styles.chart}>
				<Input label="Название проекта" type="text" value={chart.name} placeholder={"Введите название"} onChange={onChangeName} />
				<Textarea
					label="Описание проекта"
					value={chart.description}
					placeholder={"Введите описание"}
					onChange={onChangeDescription}
				/>
			</div>
			<div className={styles.btns}>
				<Button color="primary" variant="filled" className={styles.editBtn} onClick={onEditClick}>
					Редактировать
				</Button>
				<Button color="primary" variant="filled" className={styles.deleteBtn} onClick={onDeleteClick}>
					Удалить
				</Button>
			</div>

			<Button variant="filled" color="secondary" onClick={onToggleAside} className={styles.openBtn}>
				Проект
				<AppIcon Svg={ArrowSVG} color="primary" className={cls(styles.icon, { [styles.isOpen]: isOpen })} />
			</Button>
		</div>
	);
};
