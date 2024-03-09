import cls from "classnames";
import styles from "./Slide.module.sass";
import { useRef } from "react";
import { useIntersectionObserver } from "@/shared/lib/hooks/useIntersectionObserver";
import { useAnimateNumber } from "@/shared/lib/hooks/useAnimateNumber";

/**
 *
 * @param {{
 * 	topText: String,
 *	specSymbol: String,
 *	text: String,
 *	variant: "circle" | "square",
 *	topSize: Number,
 *	topTextSize: Number,
 *	isAnimate: Boolean,
 *	speedAnimation: Number,
 *	className: String
 * }} props
 * @returns
 */

export const Slide = ({
	topText,
	specSymbol = "",
	text,
	variant = "circle",
	topSize = 150,
	topSizeText = 64,
	isAnimate,
	speedAnimation,
	className,
}) => {
	const ref = useRef();

	const { inView } = useIntersectionObserver({ triggerRef: ref });

	const currentNumber = useAnimateNumber({
		fromNumber: 0,
		toNumber: Number(topText),
		speedAnimation: speedAnimation,
		isRunning: inView && isAnimate,
	});

	const topTextCurrent = isAnimate ? currentNumber : topText;
	const topFillingBox = isAnimate ? <div className={styles.fillingBlock} style={{ height: `${topTextCurrent}%` }}/> : null;

	return (
		<div ref={ref} className={cls(styles.slide, className)}>
			<div className={cls(styles.topBlock, styles[variant])} style={{ height: topSize, width: topSize, fontSize: topSizeText }}>
				<span className={styles.text}>{topTextCurrent + specSymbol}</span>
				{topFillingBox}
			</div>
			<span className={styles.textBlock}>{text}</span>
		</div>
	);
};
