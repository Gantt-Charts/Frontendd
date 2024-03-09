import { useEffect, useState } from "react";

function easeOut(t) {
	return -Math.pow(2, -7 * t) + 1;
}

export const useAnimateNumber = ({ fromNumber, toNumber, speedAnimation = 5000, isRunning }) => {
	const [currentNumber, setCurrentNumber] = useState(fromNumber);
	useEffect(() => {
		let intervalId;

		if (isRunning) {
			const startTime = new Date();
			const intervalId = setInterval(() => {
				const currentTime = new Date();
				const progress = (currentTime - startTime) / speedAnimation;
				if (progress >= 1) {
					setCurrentNumber(toNumber);
					clearInterval(intervalId);
				} else {
					const easedProgress = easeOut(progress);
					setCurrentNumber(Math.floor(fromNumber + (toNumber - fromNumber) * easedProgress));
				}
			}, 0);
		}

		return () => clearInterval(intervalId);
	}, [fromNumber, isRunning, speedAnimation, toNumber]);

	return currentNumber;
};
