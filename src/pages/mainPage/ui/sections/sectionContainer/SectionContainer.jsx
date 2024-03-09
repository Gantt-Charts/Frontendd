import cls from "classnames";
import styles from "./SectionContainer.module.sass";

export const SectionContainer = ({ title,isFirst = false, children, className }) => {
	return (
		<section className={cls(styles.sectionContainer, { [styles.firstSection]: isFirst }, className)}>
			<h1 className={styles.title}>{title}</h1>
			{children}
		</section>
	);
};
