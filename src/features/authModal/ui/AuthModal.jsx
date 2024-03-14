import { useCallback, useState } from "react";
import { Modal } from "@/shared/ui/modal/Modal";
import { Button } from "@/shared/ui/button/Button";
import { Input } from "@/shared/ui/input/Input";
import { auth } from "../model/services/auth";
import cls from "classnames";
import styles from "./AuthModal.module.sass";
import { ValidationError } from "@/entities/validationError";
import { validateFields } from "@/shared/lib/helpers/validateFields";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../model/slice/loginSlice";
import { getLoginUsername, getLoginPassword } from "../model/selectors/authModalSelectors";
import { userActions } from "@/entities/user/model/slice/userSlice";

export const AuthModal = ({ isLoginForm = true, isOpen, onClose, className }) => {
	const [isLogin, setIsLogin] = useState(isLoginForm);
	const [isValidationError, setIsValidationError] = useState(false);
	const username = useSelector(getLoginUsername);
	const password = useSelector(getLoginPassword);

	const dispatch = useDispatch();

	const onChangeFormLogin = useCallback(() => {
		setIsLogin(true);
	}, []);

	const onChangeFormRegister = useCallback(() => {
		setIsLogin(false);
	}, []);

	const onChangeUsername = useCallback(
		(value) => {
			dispatch(loginActions.setUsername(value));
		},
		[dispatch]
	);

	const onChangePassword = useCallback(
		(value) => {
			dispatch(loginActions.setPassword(value));
		},
		[dispatch]
	);

	const onAuthClick = async () => {
		const isValidate = validateFields([username, password]);

		setIsValidationError(!isValidate);

		if (!isValidate) return;

		const data = await auth({
			userName: username,
			userPassword: password,
			isLogin: isLogin,
		});

		if (!data) return;

		dispatch(userActions.setAuthData(data));
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
				<Input type="text" onChange={onChangeUsername} value={username} placeholder={"Введите логин"} />
				<Input type="password" onChange={onChangePassword} value={password} placeholder={"Введите пароль"} />
				<Button color="primary" className={styles.authBtn} onClick={onAuthClick}>
					{buttonValue}
				</Button>
			</div>
		</Modal>
	);
};
