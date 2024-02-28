import cls from "classnames";
import styles from "./Footer.module.sass";

export const Footer = ({ className }) => {
	return <footer className={cls(styles.footer, className)}>Информация</footer>;
};
