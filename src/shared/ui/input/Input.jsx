import cls from "classnames";
import styles from "./Input.module.sass";

export const Input = ({ type = "text", label, value = "", onChange, className, placeholder, ...otherProps }) => {
	const additionalClass = label ? "" : className;

	const onChangeHandle = (e) => {
		onChange?.(e.target.value);
	};

	const input = (
		<input
			type={type}
			value={value}
			onChange={onChangeHandle}
			placeholder={placeholder}
			className={cls(styles.input, additionalClass)}
			{...otherProps}
		/>
	);

	if (label) {
		return (
			<div className={cls(styles.inputWrapper, className)}>
				<span className={styles.label}>{label}</span>
				{input}
			</div>
		);
	}

	return input;
};
