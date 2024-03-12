import cls from "classnames";
import styles from "./Textarea.module.sass";

export const Textarea = ({ label, value, placeholder, onChange, className, ...otherProps }) => {
	const additionalClass = label ? "" : className;

	const onChangeHandle = (e) => {
		onChange?.(e.target.value);
	};

	const textarea = (
		<textarea
			value={value}
			placeholder={placeholder}
			spellCheck={false}
			onChange={onChangeHandle}
			className={cls(styles.textarea, additionalClass)}
			{...otherProps}
		/>
	);

	if (label) {
		return (
			<div className={cls(styles.textareaWrapper, className)}>
				<span className={styles.label}>{label}</span>
				{textarea}
			</div>
		);
	}

	return textarea;
};
