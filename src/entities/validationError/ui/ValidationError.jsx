import cls from "classnames";
import styles from "./ValidationError.module.sass";

export const ValidationError = ({ isValidationError, text, className }) => {

	if (isValidationError) return <span className={cls(styles.validationError, className)}>{text}</span>;

	return null;
};
