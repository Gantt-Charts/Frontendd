import { useEffect } from "react";
import cls from "classnames";
import styles from "./Page.module.sass";

export const Page = ({ children, isPadding = true, className }) => {
	useEffect(() => {
		window.scroll({ top: 0 });
	}, []);

	return <main className={cls(styles.page, { [styles.isPadding]: isPadding }, className)}>{children}</main>;
};
