import cls from "classnames";
import styles from "./Overlay.module.sass";

export const Overlay = ({ className, onClick }) => {
	return <div onClick={onClick} className={cls(styles.overlay, {}, [className])} />;
};
