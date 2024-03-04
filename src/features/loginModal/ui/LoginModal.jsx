import { useCallback, useState } from "react";
import { Modal } from "@/shared/ui/modal/Modal";
import { AuthForm } from "@/entities/authForm";
import cls from "classnames";
import styles from "./LoginModal.module.sass";
import { Button } from "@/shared/ui/button/Button";

export const LoginModal = ({ isOpen, onClose, onLogin, onRegister, className }) => {
	const [isLogin, setIsLogin] = useState(true);
	const [userName, setUserName] = useState("");
	const [userPassword, setUserPassword] = useState("");

	const onChangeFormLogin = useCallback(() => {
		setIsLogin(true);
	}, []);

	const onChangeFormRegistr = useCallback(() => {
		setIsLogin(false);
	}, []);

	const onChangeUsername = useCallback((value) => {
		setUserName(value);
	}, []);

	const onChangePassword = useCallback((value) => {
		setUserPassword(value);
	}, []);

	const onAuthClick = useCallback(() => {
		if (isLogin) {
			onLogin({ userName, userPassword });
		} else {
			onRegister({ userName, userPassword });
		}
		onClose();
	}, [isLogin, onClose, onLogin, onRegister, userName, userPassword]);

	const title = isLogin ? "Форма авторизации" : "Форма регистрации";
	const buttonValue = isLogin ? "Войти" : "Зарегистрироваться";

	return (
		<Modal isOpen={isOpen} onClose={onClose} className={cls("", className)}>
			<h1>{title}</h1>
			<div className={styles.buttonWrapper}>
				<Button onClick={onChangeFormLogin}>Вход</Button>
				<Button onClick={onChangeFormRegistr}>Регистрация</Button>
			</div>
			<AuthForm
				buttonValue={buttonValue}
				userName={userName}
				userPassword={userPassword}
				onChangeUsername={onChangeUsername}
				onChangePassword={onChangePassword}
				onAuthClick={onAuthClick}
			/>
		</Modal>
	);
};
