import { useCallback, useEffect, useRef, useState } from "react";
import cls from "classnames";
import styles from "./Progress.module.sass";

const minProgress = 0;
const maxProgress = 100;

export const Progress = ({ label, progress, setProgress, className }) => {
	const [currentPos, setCurrentPos] = useState(10);
	const [isDrag, setisDrag] = useState(false);

	const refProgress = useRef(0);
	const leftPosProgress = refProgress.current.offsetLeft;
	const widthProgress = refProgress.current?.clientWidth - 40;

	const onMouseMove = useCallback(
		(e) => {
			if (!isDrag) return;
			const movePos = e.clientX - leftPosProgress - 20;

			if (movePos < minProgress) return setCurrentPos(0);
			if (movePos > widthProgress) return setCurrentPos(widthProgress);

			const progressValue = (((maxProgress - minProgress) * movePos) / widthProgress + minProgress).toFixed(0);

			setProgress(progressValue);
			setCurrentPos(movePos);
		},
		[isDrag, leftPosProgress, setProgress, widthProgress]
	);

	const onMouseDown = () => {
		setisDrag(true);
	};

	const onMouseUp = useCallback(() => {
		setisDrag(false);
	}, []);

	useEffect(() => {
		if (isDrag) {
			window.addEventListener("mousemove", onMouseMove);
			window.addEventListener("mouseup", onMouseUp);
		}

		return () => {
			window.removeEventListener("mousemove", onMouseMove);
			window.removeEventListener("mouseup", onMouseUp);
		};
	}, [isDrag, onMouseMove, onMouseUp]);

	useEffect(() => {
		if (!widthProgress) return;

		const pos = (progress * widthProgress) / maxProgress;

		setCurrentPos(pos);
	}, [progress, widthProgress]);

	const additionalClass = label ? "" : className;

	const progressElement = (
		<div ref={refProgress} className={cls(styles.progress, additionalClass)}>
			<div className={styles.min}>
				<span className={styles.minMaxValue}>{minProgress}</span>
			</div>
			<span className={styles.value} onMouseDown={onMouseDown} style={{ left: currentPos }}>
				{progress}
			</span>
			<div className={styles.max}>
				<span className={styles.minMaxValue}>{maxProgress}</span>
			</div>
		</div>
	);

	if (label) {
		return (
			<div className={cls(styles.progressWrapper, className)}>
				<span className={styles.label}>{label}</span>
				{progressElement}
			</div>
		);
	}

	return progressElement;
};
