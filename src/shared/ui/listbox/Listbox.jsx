import { useEffect, useRef, useState } from "react";
import { AppIcon } from "../appIcon/AppIcon";
import cls from "classnames";
import styles from "./Listbox.module.sass";
import ArrowSVG from "../../assets/icons/arrow.svg";

export const Listbox = ({ label, items, className, value, onChange }) => {
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef();

	const onOpen = () => {
		setIsOpen((prev) => !prev);
	};

	const onSelect = (value) => () => {
		onChange(value);
		setIsOpen(false);
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (!event.composedPath().includes(ref.current)) {
				setIsOpen(false);
			}
		};

		document.body.addEventListener("click", handleClickOutside);

		return () => {
			document.body.removeEventListener("click", handleClickOutside);
		};
	}, []);

	const additionalClass = label ? "" : className;

	const listBox = (
		<div ref={ref} className={cls(styles.listbox, { [styles.isOpen]: isOpen }, additionalClass)}>
			<button onClick={onOpen} className={styles.trigger}>
				<span className={styles.title}>{value.content}</span>
				<AppIcon Svg={ArrowSVG} color="secondary" className={styles.icon} />
			</button>

			{isOpen && (
				<div className={styles.items}>
					{items.map((item) => (
						<button key={item.id} className={styles.item} onClick={onSelect(item)}>
							{item.content}
						</button>
					))}
				</div>
			)}
		</div>
	);

	if (label) {
		return (
			<div className={styles.listBoxWrapper}>
				<span className={styles.label}>{label}</span>
				{listBox}
			</div>
		);
	}

	return listBox;
};
