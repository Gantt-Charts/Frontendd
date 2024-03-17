import cls from "classnames";
import styles from "./AppImage.module.sass";
import { useLayoutEffect, useState } from "react";

/**
 *
 * @param {{
 * 	src: string,
 * 	maxHeight: boolean,
 *  alt: string,
 * 	signature: string,
 * 	fallback: ReactElement,
 * 	errorFallback: ReactElement,
 * 	className: string
 * }} props
 *
 */

export const AppImage = ({ src, maxHeight, alt = "image", signature, fallback, errorFallback = fallback, className }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);

	useLayoutEffect(() => {
		const img = new Image();

		img.src = src || "";

		img.onload = () => {
			setIsLoading(false);
		};

		img.onerror = () => {
			setIsLoading(false);
			setHasError(true);
		};
	});

	if (isLoading && fallback) {
		return fallback;
	}

	if (hasError && errorFallback) {
		return errorFallback;
	}

	if (signature) {
		return (
			<div className={cls(styles.imgWrapper, className)}>
				<img src={src} alt={alt} className={cls(styles.appImage, { [styles.maxHeight]: maxHeight })} draggable="false" />
				<span className={styles.signature}>{signature}</span>
			</div>
		);
	}

	return (
		<img src={src} alt={alt} className={cls(styles.appImage, { [styles.maxHeight]: maxHeight }, className)} draggable="false" />
	);
};
