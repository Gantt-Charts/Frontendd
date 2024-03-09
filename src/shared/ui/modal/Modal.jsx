import { Portal } from "../portal/Portal";
import { Overlay } from "../overlay/Overlay";
import { useModal } from "@/shared/lib/hooks/useModal";
import cls from "classnames";
import styles from "./Modal.module.sass";

export const Modal = ({ children, isOpen, onClose,  className }) => {
	const { close, isClosing, isMounted } = useModal({
		animationDelay: 200,
		isOpen,
		onClose,
	});

	const mods = {
		[styles.opened]: isMounted,
		[styles.isClosing]: isClosing,
	};


	return (
		<Portal element={document.getElementById("app") ?? document.body}>
			<div className={cls(styles.modal, mods, className)}>
				<Overlay onClick={close} />
				<div className={styles.content}>{children}</div>
			</div>
		</Portal>
	);
};
