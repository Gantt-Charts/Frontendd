import cls from "classnames";
import styles from "./Button.module.sass";

export const Button = ({ onClick, children, className }) => {
	return (
		<button onClick={onClick} className={cls(styles.button, className)}>
			{children}
		</button>
	);
};
