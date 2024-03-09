import { AuthModal } from "@/features/authModal";
import { Button } from "@/shared/ui/button/Button";
import { useState } from "react";

export const AuthBtn = ({ text = "Войти", isLoginForm, variant, color, className }) => {
	const [isAuthModal, setIsAuthModal] = useState(false);

	const onClose = () => {
		setIsAuthModal(false);
	};

	const onShow = () => {
		setIsAuthModal(true);
	};

	return (
		<>
			<Button variant={variant} color={color} onClick={onShow} className={className}>
				{text}
			</Button>
			{isAuthModal && <AuthModal isLoginForm={isLoginForm} isOpen={isAuthModal} onClose={onClose} />}
		</>
	);
};
