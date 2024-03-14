import cls from "classnames";
import styles from "./EditDeleteChartForm.module.sass";
import { useCallback, useEffect, useState } from "react";
import { ValidationError } from "@/entities/validationError";
import { validateFields } from "@/shared/lib/helpers/validateFields";
import { Input } from "@/shared/ui/input/Input";
import { Textarea } from "@/shared/ui/textarea/Textarea";
import { Button } from "@/shared/ui/button/Button";
import { AppIcon } from "@/shared/ui/appIcon/AppIcon";
import ArrowSVG from "@/shared/assets/icons/arrow.svg";
import { useNavigate } from "react-router-dom";
import { getRouteCharts } from "@/shared/const/routes";
import { deleteCharts, putCharts, getCharts } from "@/entities/charts/model/services/charts";
import { useDispatch, useSelector } from "react-redux";
import { getChartDescription, getChartName } from "../../model/selectors/modificationChartSelectors";
import { modificationChartActions } from "../../model/slices/modificationChartSlice";

export const EditDeleteChartForm = ({ id, username, className }) => {
	const name = useSelector(getChartName);
	const description = useSelector(getChartDescription);
	const [isValidationError, setIsValidationError] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onToggleAside = () => {
		setIsOpen((prev) => !prev);
	};

	const onChangeName = (value) => {
		dispatch(modificationChartActions.setChartName(value));
	};

	const onChangeDescription = (value) => {
		dispatch(modificationChartActions.setChartDescription(value));
	};

	const onEditClick = useCallback(async () => {
		const isValidate = validateFields([name, description]);

		setIsValidationError(!isValidate);

		if (!isValidate) return;

		const data = await putCharts({ chartId: id, username: username, value: { name, description } });

		if (!data) return;

		dispatch(modificationChartActions.setChartName(data.name));
		dispatch(modificationChartActions.setChartDescription(data.description));
	}, [name, description, id, username, dispatch]);

	const onDeleteClick = useCallback(async () => {
		const data = await deleteCharts({ chartId: id, username: username });

		if (!data) return;

		navigate(getRouteCharts(username));
	}, [id, username, navigate]);

	useEffect(() => {
		const getChart = async () => {
			const data = await getCharts({ username });

			if (!data) return;
			const selectChart = data.find((chart) => chart.id === Number(id));

			dispatch(modificationChartActions.setChartName(selectChart.name));
			dispatch(modificationChartActions.setChartDescription(selectChart.description));
		};

		getChart();

		return () => {
			dispatch(modificationChartActions.setChartName(""));
			dispatch(modificationChartActions.setChartDescription(""));
		};
	}, [username, id, dispatch]);

	return (
		<div className={cls(styles.editDeleteChartForm, { [styles.opened]: isOpen }, className)}>
			<h2>Проект</h2>
			<ValidationError isValidationError={isValidationError} text="Заполните все поля!" />
			<div className={styles.chart}>
				<Input label="Название проекта" type="text" value={name} placeholder={"Введите название"} onChange={onChangeName} />
				<Textarea label="Описание проекта" value={description} placeholder={"Введите описание"} onChange={onChangeDescription} />
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
