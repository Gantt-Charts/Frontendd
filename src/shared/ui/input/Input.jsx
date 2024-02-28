import cls from "classnames";
import styles from "./Input.module.sass";

export const Input = ({ type = "text", label, value = "", onChange, className, placeholder }) => {
	const onChangeHandle = (e) => {
		onChange?.(e.target.value);
	};

	const input = (
		<input
			type={type}
			value={value}
			onChange={onChangeHandle}
			placeholder={placeholder}
			className={cls(styles.input, className)}
		/>
	);

	if (label) {
		return (
			<div className={cls(styles.inputWrapper, className)}>
				<span>{label}</span>
				{input}
			</div>
		);
	}

	return input;
};
