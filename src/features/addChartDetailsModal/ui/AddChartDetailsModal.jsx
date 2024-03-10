import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Modal } from "@/shared/ui/modal/Modal";
import { Input } from "@/shared/ui/input/Input";
import { Button } from "@/shared/ui/button/Button";
import cls from "classnames";
import styles from "./AddChartDetailsModal.module.sass";
import { Listbox } from "@/shared/ui/listbox/Listbox";
import { Progress } from "@/shared/ui/progress/Progress";

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

export const AddChartDetailsModal = ({ firstTask, tasks, selectTask, isOpen, isEdit, onClose, onChange, className }) => {
	const [name, setName] = useState("");
	const [type, setType] = useState(typeItems[0]);
	const [start, setStart] = useState("");
	const [end, setEnd] = useState("");
	const [progress, setProgress] = useState(0);
	const [dependencies, setDependencies] = useState([]);
	const [isDisabled, setisDisabled] = useState(disableItems[0]);

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
		setisDisabled(value);
	}, []);

	const onAddClick = useCallback(() => {
		const typeValue = type.value;
		const isDisabledValue = isDisabled.value;

		onChange({
			name,
			type: typeValue,
			start,
			end,
			progress,
			dependencies: dependencies.id === -1 ? [] : [dependencies.id],
			isDisabled: isDisabledValue,
		});
		onClose();
	}, [type.value, isDisabled.value, onChange, name, start, end, progress, dependencies, onClose]);

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

		if (selectTask) {
			const typeValue = typeItems.find((item) => item.value === selectTask.type);

			onChangeName(selectTask.name);
			onChangeType({
				content: typeValue.content,
			});
			// onChangeStart(selectTask.start);
			// onChangeEnd(selectTask.end);
			onChangeProgress(selectTask.progress);
			// onChangeDependencies(selectTask.dependencies);
			onChangeDisabled(selectTask.isDisabled);
		}

		// console.log(selectTask);
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

	// console.log(dependencies);

	const btnText = isEdit ? "Редактировать" : "Добавить";

	return (
		<Modal isOpen={isOpen} onClose={onClose} className={cls("", className)}>
			<h1 className={styles.title}>Форма добавления задачи</h1>
			<div className={styles.loginForm}>
				<Input label="Введите название" value={name} placeholder={"Введите название"} onChange={onChangeName} />
				<div className={styles.typeWrapper}>
					<span className={styles.labelType}>Выберите тип</span>
					<Listbox items={typeItemsRef} value={type} className={styles.listBox} onChange={onChangeType} />
				</div>

				<div className={styles.typeWrapper}>
					<span className={styles.labelType}>Выберите связь с задачей</span>
					<Listbox
						items={dependenciesItemsRef.current}
						value={dependencies}
						className={styles.listBox}
						onChange={onChangeDependencies}
					/>
				</div>

				<Input label="Введите дату начала" type="date" value={start} placeholder={"Введите начало"} onChange={onChangeStart} />

				<Input label="Введите дату конца" type="date" value={end} placeholder={"Введите конец"} onChange={onChangeEnd} />

				<div className={styles.progressWrapper}>
					<span className={styles.labelProgress}>Укажите прогресс</span>
					<Progress progress={progress} className={styles.progress} setProgress={onChangeProgress} />
				</div>

				<div className={styles.typeWrapper}>
					<span className={styles.labelType}>Разрешено ли изменение</span>
					<Listbox items={disableItems} value={isDisabled} className={styles.listBox} onChange={onChangeDisabled} />
				</div>

				<Button className={styles.loginBtn} onClick={onAddClick}>
					{btnText}
				</Button>
			</div>
		</Modal>
	);
};
