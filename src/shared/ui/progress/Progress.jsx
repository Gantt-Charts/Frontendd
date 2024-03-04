import { useCallback, useEffect, useRef, useState } from "react";
import cls from "classnames";
import styles from "./Progress.module.sass";

const minProgress = 0;
const maxProgress = 100;

export const Progress = ({ progress, setProgress, className }) => {
	const [currentPos, setCurrentPos] = useState(0);
	const [isDrag, setisDrag] = useState(false);
	const [startPos, setStartPos] = useState(0);
	const [lastPos, setLastPos] = useState(0);

	const refProgress = useRef(0);
	const widthProgress = refProgress.current?.clientWidth - 40;

	const onMouseMove = useCallback(
		(e) => {
			const movePos = e.clientX - startPos + lastPos;

			if (movePos < minProgress) return setCurrentPos(0);
			if (movePos > widthProgress) return setCurrentPos(widthProgress);

			const progress = (((maxProgress - minProgress) * movePos) / widthProgress + minProgress).toFixed(0);

			setProgress(progress);
			setCurrentPos(movePos);
		},
		[lastPos, setProgress, startPos, widthProgress]
	);

	const onMouseDown = (e) => {
		setStartPos(e.clientX);
		setisDrag(true);
	};

	const onMouseUp = useCallback(() => {
		setLastPos(currentPos);
		setisDrag(false);
	}, [currentPos]);

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

	return (
		<div ref={refProgress} className={cls(styles.progress, className)}>
			<div className={styles.min}>
				<span className={styles.minMaxValue}>{minProgress}</span>
			</div>
			<div className={styles.circle} onMouseDown={onMouseDown} style={{ left: currentPos }}>
				<span className={styles.value}>{progress}</span>
			</div>
			<div className={styles.max}>
				<span className={styles.minMaxValue}>{maxProgress}</span>
			</div>
		</div>
	);
};
