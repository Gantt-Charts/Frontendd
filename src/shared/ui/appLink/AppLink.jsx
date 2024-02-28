import { Link } from "react-router-dom";
import cls from "classnames";
import styles from "./AppLink.module.sass";

export const AppLink = ({ href, children, className }) => {
	return (
		<Link to={href} className={cls(styles.appLink, className)}>
			{children}
		</Link>
	);
};
