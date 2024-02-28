import { useCallback, useState } from "react";
import { Modal } from "@/shared/ui/modal/Modal";
import { Input } from "@/shared/ui/input/Input";
import { Button } from "@/shared/ui/button/Button";
import cls from "classnames";
import styles from "./LoginModal.module.sass";

export const LoginModal = ({ isOpen, onClose, className }) => {
	const [userName, setUserName] = useState("");
	const [userPassword, setUserPassword] = useState("");

	const onChangeUsername = useCallback((value) => {
		setUserName(value);
	}, []);

	const onChangePassword = useCallback((value) => {
		setUserPassword(value);
	}, []);

	const onLoginClick = useCallback(() => {
		onClose();
	}, [onClose]);

	return (
		<Modal isOpen={isOpen} onClose={onClose} className={cls("", className)}>
			<h1>Форма авторизации</h1>
			<div className={styles.loginForm}>
				<Input type="text" onChange={onChangeUsername} value={userName} placeholder={"Введите логин"} />
				<Input type="text" onChange={onChangePassword} value={userPassword} placeholder={"Введите пароль"} />
				<Button className={styles.loginBtn} onClick={onLoginClick}>
					Войти
				</Button>
			</div>
		</Modal>
	);
};
