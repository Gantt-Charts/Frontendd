import { Link } from "react-router-dom";
import cls from "classnames";
import styles from "./AppLink.module.sass";

export const AppLink = ({ href, onClick, children, className }) => {
	return (
		<Link to={href} onClick={onClick} className={cls(styles.appLink, className)}>
			{children}
		</Link>
	);
};
