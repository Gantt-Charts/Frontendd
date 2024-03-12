import { useCallback, useEffect, useRef, useState } from "react";
import { Modal } from "@/shared/ui/modal/Modal";
import { Input } from "@/shared/ui/input/Input";
import { Button } from "@/shared/ui/button/Button";
import cls from "classnames";
import styles from "./ModificationTaskModal.module.sass";
import { Listbox } from "@/shared/ui/listbox/Listbox";
import { Progress } from "@/shared/ui/progress/Progress";
import { ValidationError } from "@/entities/validationError";
import { validateFields } from "@/shared/lib/helpers/validateFields";

const typeItems = [
	{
		id: 1,
		value: "project",
		content: "Проект",
	},
	{
		id: 2,
		value: "task",
		content: "Задача",
	},
];

const disableItems = [
	{
		id: 1,
		value: false,
		content: "Да",
	},
	{
		id: 2,
		value: true,
		content: "Нет",
	},
];

export const ModificationTaskModal = ({ label, btnText, firstTask, tasks, selectTask, isOpen, onClose, onChange, className }) => {
	const [id, setId] = useState("");
	const [name, setName] = useState("");
	const [type, setType] = useState(typeItems[0]);
	const [start, setStart] = useState("");
	const [end, setEnd] = useState("");
	const [progress, setProgress] = useState(0);
	const [dependencies, setDependencies] = useState([]);
	const [isDisabled, setIsDisabled] = useState(disableItems[0]);
	const [isValidationError, setIsValidationError] = useState(false);

	const typeItemsRef = firstTask ? [typeItems[0]] : typeItems;
	const dependenciesItemsRef = useRef([]);

	const onChangeName = useCallback((value) => {
		setName(value);
	}, []);

	const onChangeType = useCallback((value) => {
		setType(value);
	}, []);

	const onChangeStart = useCallback((value) => {
		setStart(value);
	}, []);

	const onChangeEnd = useCallback((value) => {
		setEnd(value);
	}, []);

	const onChangeProgress = useCallback((value) => {
		setProgress(value);
	}, []);

	const onChangeDependencies = useCallback((value) => {
		setDependencies(value);
	}, []);

	const onChangeDisabled = useCallback((value) => {
		setIsDisabled(value);
	}, []);

	const onClick = useCallback(() => {
		const typeValue = type.value;
		const isDisabledValue = isDisabled.value;

		const isValidate = validateFields([name, start, end]);

		setIsValidationError(!isValidate);

		if (!isValidate) return;

		onChange({
			id,
			name,
			type: typeValue,
			start,
			end,
			progress,
			dependencies: dependencies.id === -1 ? [] : [dependencies.id],
			isDisabled: isDisabledValue,
		});
	}, [type.value, isDisabled.value, name, start, end, onChange, id, progress, dependencies.id]);

	useEffect(() => {
		const allTasks = tasks.map((task) => ({
			id: task.id,
			content: task.name,
		}));

		dependenciesItemsRef.current = [
			{
				id: -1,
				content: "Нет зависимостей",
			},
			...allTasks,
		];

		setDependencies(dependenciesItemsRef.current[0]);
	}, [tasks]);

	useEffect(() => {
		if (selectTask) {
			dependenciesItemsRef.current = dependenciesItemsRef.current.filter((item) => item.id !== selectTask.id);

			const typeValue = typeItems.find((item) => item.value === selectTask.type);
			const disabledValue = disableItems.find((item) => item.value === selectTask.isDisabled);
			const dependenciesValue =
				dependenciesItemsRef.current.find((item) => item.id === selectTask.dependencies?.[0]) || dependenciesItemsRef.current[0];

			setId(selectTask.id);
			setName(selectTask.name);
			setType(typeValue);
			onChangeStart(selectTask.start);
			onChangeEnd(selectTask.end);
			setProgress(selectTask.progress);
			setDependencies(dependenciesValue);
			setIsDisabled(disabledValue);
		}
	}, [
		dependenciesItemsRef,
		onChangeDependencies,
		onChangeDisabled,
		onChangeEnd,
		onChangeName,
		onChangeProgress,
		onChangeStart,
		onChangeType,
		selectTask,
		tasks,
	]);

	return (
		<Modal isOpen={isOpen} onClose={onClose} className={cls("", className)}>
			<h1 className={styles.title}>{label}</h1>
			<ValidationError isValidationError={isValidationError} text="Название, дата начала и окончания обязательны к заполнению!" />
			<div className={styles.loginForm}>
				<Input label="Введите название" value={name} placeholder={"Введите название"} onChange={onChangeName} />

				<Listbox label="Выберите тип" items={typeItemsRef} value={type} className={styles.listBox} onChange={onChangeType} />

				<Listbox
					label="Выберите связь с задачей"
					items={dependenciesItemsRef.current}
					value={dependencies}
					className={styles.listBox}
					onChange={onChangeDependencies}
				/>

				<Input
					label="Введите дату начала"
					type="date"
					value={start}
					placeholder={"Введите начало"}
					max={end}
					onChange={onChangeStart}
				/>

				<Input
					label="Введите дату окончания"
					type="date"
					value={end}
					placeholder={"Введите конец"}
					min={start}
					onChange={onChangeEnd}
				/>

				<Progress label="Укажите прогресс" progress={progress} className={styles.progress} setProgress={onChangeProgress} />

				<Listbox
					label="Разрешено ли изменение"
					items={disableItems}
					value={isDisabled}
					className={styles.listBox}
					onChange={onChangeDisabled}
				/>

				<Button className={styles.loginBtn} onClick={onClick}>
					{btnText}
				</Button>
			</div>
		</Modal>
	);
};
