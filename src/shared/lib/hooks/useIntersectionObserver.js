import { useEffect, useState } from "react";

export function useIntersectionObserver({ callback, triggerRef, wrapperRef }) {
	const [inView, setInView] = useState(false);
	useEffect(() => {
		let observer = null;

		const wrapperElement = wrapperRef?.current || null;
		const triggerElement = triggerRef.current;

		if (triggerRef) {
			const options = {
				root: wrapperElement,
				rootMargin: "0px",
				threshold: 0.5,
			};

			observer = new IntersectionObserver(([entry]) => {
				if (entry.isIntersecting) {
					if (callback) callback();
					setInView(true);
				}
			}, options);

			observer.observe(triggerElement);
		}

		return () => {
			if (observer && triggerElement) {
				observer.unobserve(triggerElement);
				setInView(false);
			}
		};
	}, [callback, triggerRef, wrapperRef]);

	return {
		inView,
	};
}
