import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/shared/ui/button/Button";
import { Input } from "@/shared/ui/input/Input";
import { Modal } from "@/shared/ui/modal/Modal";
import { Textarea } from "@/shared/ui/textarea/Textarea";
import { validateFields } from "@/shared/lib/helpers/validateFields";
import { ValidationError } from "@/entities/validationError";
import { chartsActions } from "@/entities/charts/model/slices/chartsSlice";
import { postCharts } from "@/entities/charts/model/services/charts";
import cls from "classnames";
import styles from "./AddChartModal.module.sass";
import { modificationChartActions } from "../../model/slices/modificationChartSlice";
import { getChartDescription, getChartName } from "../../model/selectors/modificationChartSelectors";

export const AddChartModal = ({ isOpen, onClose, className }) => {
	const [isValidationError, setIsValidationError] = useState(false);
	const { username } = useParams();
	const name = useSelector(getChartName);
	const description = useSelector(getChartDescription);

	const dispatch = useDispatch();

	const onChangeName = (value) => {
		dispatch(modificationChartActions.setChartName(value));
	};

	const onChangeDescription = (value) => {
		dispatch(modificationChartActions.setChartDescription(value));
	};

	const onAddClick = useCallback(async () => {
		const isValidate = validateFields([name, description]);

		setIsValidationError(!isValidate);

		if (!isValidate) return;

		const data = await postCharts({ username, value: { name, description } });

		if (!data) return;

		dispatch(chartsActions.addCharts(data));
		onClose();
	}, [description, dispatch, name, onClose, username]);

	useEffect(() => {
		return () => {
			dispatch(modificationChartActions.setChartName(""));
			dispatch(modificationChartActions.setChartDescription(""));
		};
	}, [dispatch]);

	return (
		<Modal isOpen={isOpen} onClose={onClose} className={cls("", className)}>
			<h2>Форма добавления диаграммы</h2>
			<ValidationError isValidationError={isValidationError} text="Заполните все поля!" />
			<div className={styles.chartForm}>
				<Input type="text" value={name} placeholder={"Введите название"} onChange={onChangeName} />
				<Textarea value={description} placeholder={"Введите описание"} onChange={onChangeDescription} />
				<Button color="primary" className={styles.addBtn} onClick={onAddClick}>
					Добавить
				</Button>
			</div>
		</Modal>
	);
};
