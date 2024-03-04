import styles from "./AppIcon.module.sass";
import cls from "classnames";

/**
 *
 * @param {{
 *  Svg: ReactNode,
 *  size: 's' | 'm' | 'l',
 * 	color: 'primary'| 'secondary' | 'neutral',
 *  clickable: boolean,
 *  onClick: () => void,
 *  className: string
 * }} props
 *
 */

export const AppIcon = ({ Svg, size = "s", color = "neutral", clickable, onClick, className }) => {
	const sizeIcon = {
		s: "size_s",
		m: "size_m",
		l: "size_l",
	}[size];

	const additionalClass = [styles.appIcon, styles[color], className];
	const svgClass = clickable ?? additionalClass;

	const icon = <Svg className={cls(svgClass, styles[sizeIcon])} />;

	if (clickable) {
		return (
			<button className={cls(styles[sizeIcon], { [styles.clickable]: clickable }, additionalClass)} onClick={onClick}>
				{icon}
			</button>
		);
	}

	return icon;
};
