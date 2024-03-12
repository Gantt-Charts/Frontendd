import { useCallback, useContext, useState } from "react";
import { AuthDataContext } from "@/app/providers/AuthProvider";
import { Modal } from "@/shared/ui/modal/Modal";
import { Button } from "@/shared/ui/button/Button";
import { Input } from "@/shared/ui/input/Input";
import { auth } from "../model/services/auth";
import cls from "classnames";
import styles from "./AuthModal.module.sass";
import { USER_LOCALSTORAGE_KEY, USER_LOCALSTORAGE_TOKEN } from "@/shared/const/localstorage";
import { ValidationError } from "@/entities/validationError";
import { validateFields } from "@/shared/lib/helpers/validateFields";

export const AuthModal = ({ isLoginForm = true, isOpen, onClose, className }) => {
	const [isLogin, setIsLogin] = useState(isLoginForm);
	const [userName, setUserName] = useState("");
	const [userPassword, setUserPassword] = useState("");
	const [isValidationError, setIsValidationError] = useState(false);
	const { setAuthData } = useContext(AuthDataContext);

	const onChangeFormLogin = useCallback(() => {
		setIsLogin(true);
	}, []);

	const onChangeFormRegister = useCallback(() => {
		setIsLogin(false);
	}, []);

	const onChangeUsername = useCallback((value) => {
		setUserName(value);
	}, []);

	const onChangePassword = useCallback((value) => {
		setUserPassword(value);
	}, []);

	const onAuthClick = async () => {
		const isValidate = validateFields([userName, userPassword]);

		setIsValidationError(!isValidate);

		if (!isValidate) return;

		const data = await auth({
			userName: userName,
			userPassword: userPassword,
			isLogin: isLogin,
		});

		if (!data) return;

		localStorage.setItem(USER_LOCALSTORAGE_KEY, data.username);
		localStorage.setItem(USER_LOCALSTORAGE_TOKEN, data.token);
		setAuthData(data.username);
		onClose();
	};

	const title = isLogin ? "Форма авторизации" : "Форма регистрации";
	const buttonValue = isLogin ? "Войти" : "Зарегистрироваться";

	return (
		<Modal isOpen={isOpen} onClose={onClose} className={cls("", className)}>
			<h1>{title}</h1>
			<ValidationError isValidationError={isValidationError} text="Заполните все поля!" />
			<div className={styles.buttonWrapper}>
				<Button color="primary" isSelected={isLogin} onClick={onChangeFormLogin} className={styles.btn}>
					Вход
				</Button>
				<Button color="primary" isSelected={!isLogin} onClick={onChangeFormRegister} className={styles.btn}>
					Регистрация
				</Button>
			</div>

			<div className={styles.authForm}>
				<Input type="text" onChange={onChangeUsername} value={userName} placeholder={"Введите логин"} />
				<Input type="password" onChange={onChangePassword} value={userPassword} placeholder={"Введите пароль"} />
				<Button color="primary" className={styles.authBtn} onClick={onAuthClick}>
					{buttonValue}
				</Button>
			</div>
		</Modal>
	);
};
