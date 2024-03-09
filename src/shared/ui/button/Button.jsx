import cls from "classnames";
import styles from "./Button.module.sass";

/**
 *
 * @param {{
 * 	variant: "filled" | "clear",
 *  color: "primary" | "secondary" | "transparent",
 * 	isSelected: boolean,
 * 	children: ReactElement,
 *  className: String,
 * }} props
 * @returns
 */

export const Button = ({ variant = "clear", color = "transparent", isSelected = false, onClick, children, className }) => {
	return (
		<button
			onClick={onClick}
			className={cls(styles.button, { [styles.isSelected]: isSelected }, styles[variant], styles[color], className)}
		>
			{children}
		</button>
	);
};
