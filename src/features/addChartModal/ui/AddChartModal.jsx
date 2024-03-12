import { useState } from "react";
import { Button } from "@/shared/ui/button/Button";
import { Input } from "@/shared/ui/input/Input";
import { Modal } from "@/shared/ui/modal/Modal";
import cls from "classnames";
import styles from "./AddChartModal.module.sass";
import { Textarea } from "@/shared/ui/textarea/Textarea";
import { validateFields } from "@/shared/lib/helpers/validateFields";
import { ValidationError } from "@/entities/validationError";

export const AddChartModal = ({ isOpen, onClose, className, onChange }) => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [isValidationError, setIsValidationError] = useState(false);

	const onChangeName = (value) => {
		setName(value);
	};

	const onChangeDescription = (value) => {
		setDescription(value);
	};

	const onAddClick = () => {
		const isValidate = validateFields([name, description]);

		setIsValidationError(!isValidate);

		if (!isValidate) return;

		onChange({ name, description });
	};

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
