import { useState } from "react";
import { Button } from "@/shared/ui/button/Button";
import { Input } from "@/shared/ui/input/Input";
import { Modal } from "@/shared/ui/modal/Modal";
import cls from "classnames";
import styles from "./AddChartModal.module.sass";

export const AddChartModal = ({ isOpen, onClose, className, charts }) => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");

	const onChangeName = (value) => {
		setName(value);
	};

	const onChangeDescription = (value) => {
		setDescription(value);
	};

	const onAddClick = () => {
		charts.push({
			id: charts.length + 1,
			title: name,
			description: description,
		});
		onClose();
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} className={cls("", className)}>
			<h1>Форма добавления диаграммы</h1>
			<div className={styles.chartForm}>
				<Input type="text" onChange={onChangeName} value={name} placeholder={"Введите название"} />
				<Input type="text" onChange={onChangeDescription} value={description} placeholder={"Введите описание"} />
				<Button className={styles.addBtn} onClick={onAddClick}>
					Добавить
				</Button>
			</div>
		</Modal>
	);
};
